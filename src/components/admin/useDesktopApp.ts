'use client';

import { useCallback, useEffect, useState } from 'react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

// Chrome and Edge fire this before offering to install the dashboard as an app.
type InstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

function base64UrlToBytes(value: string) {
  const base64 = (value + '='.repeat((4 - (value.length % 4)) % 4)).replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

// One Firestore document per device, named after its push address so re-enabling never duplicates it.
async function deviceId(endpoint: string) {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(endpoint));
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, '0')).join('');
}

// Alerts reach a closed dashboard only through push, which needs the VAPID key (see .env.example).
const canPush = () => 'PushManager' in window && !!vapidKey;

const registerWorker = () =>
  'serviceWorker' in navigator
    ? navigator.serviceWorker.register('/admin-sw.js', { scope: '/admin', updateViaCache: 'none' })
    : Promise.resolve(undefined);

export type AlertsState = 'unsupported' | 'blocked' | 'off' | 'on';

// Installing the dashboard as a desktop app, and new-request alerts that arrive even when it is closed.
export function useDesktopApp(email: string | null) {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);
  // The dashboard only renders in the browser (AdminLoader), so window is available here.
  const [installed, setInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches);
  const [alerts, setAlerts] = useState<AlertsState>(() =>
    !('serviceWorker' in navigator) || !('Notification' in window)
      ? 'unsupported'
      : Notification.permission === 'denied'
        ? 'blocked'
        : 'off',
  );

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as InstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);

    registerWorker()
      .then((registration) => (canPush() ? registration?.pushManager.getSubscription() : null))
      .then((subscription) => {
        // Without push, alerts only come while the dashboard is open, which needs nothing but permission.
        if (Notification.permission === 'granted' && (subscription || !canPush())) setAlerts('on');
      })
      .catch(() => {});

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = useCallback(async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
  }, [installEvent]);

  const enableAlerts = useCallback(async () => {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      setAlerts(permission === 'denied' ? 'blocked' : 'off');
      return;
    }

    await registerWorker();
    const registration = await navigator.serviceWorker.ready;
    if (canPush()) await saveSubscription(registration, email);
    setAlerts('on');
    registration.showNotification('Alerts are on', {
      body: canPush()
        ? 'You will get a notification on this device for every new consultation request.'
        : 'You will get a notification for every new consultation request while this dashboard is open.',
      icon: '/admin-app/icon-192.png',
      badge: '/admin-app/badge.png',
    });
  }, [email]);

  return {
    // The browser offers a one-click install (Chrome, Edge); other browsers get instructions.
    canInstall: !installed && !!installEvent,
    installed,
    install,
    alerts,
    enableAlerts,
  };
}

// Subscribes this device to push messages and records it, so the website can alert it (lib/push.ts).
async function saveSubscription(registration: ServiceWorkerRegistration, email: string | null) {
  const subscription =
    (await registration.pushManager.getSubscription()) ??
    (await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: base64UrlToBytes(vapidKey!) }));
  const { endpoint, keys } = subscription.toJSON();
  if (!endpoint || !keys) throw new Error('This browser did not return a push address.');

  await setDoc(doc(db, 'pushSubscriptions', await deviceId(endpoint)), {
    endpoint,
    p256dh: keys.p256dh,
    auth: keys.auth,
    email,
    device: navigator.userAgent.slice(0, 200),
    createdAt: serverTimestamp(),
  });
}

// Shows a new-request alert from the open dashboard. The tag is the request's id, the same one
// the server's push uses, so a device that gets both shows it once.
export async function showLeadAlert(id: string, title: string, body: string) {
  const registration = await navigator.serviceWorker?.getRegistration('/admin');
  if (registration) {
    await registration.showNotification(title, {
      body,
      tag: id,
      icon: '/admin-app/icon-192.png',
      badge: '/admin-app/badge.png',
      data: { url: '/admin' },
    });
  } else {
    new Notification(title, { body, tag: id });
  }
}
