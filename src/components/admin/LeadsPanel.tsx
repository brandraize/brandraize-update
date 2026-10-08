'use client';

import { useState } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Bell, Download, Mail, Phone, Trash2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { db } from '@/lib/firebase/client';
import { cardClass, dangerButton, errorMessage, ghostButton } from './ui';

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  locale: string;
  source: string;
  page: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: Date | null;
};

const statuses: Array<{ value: Lead['status']; label: string; className: string }> = [
  { value: 'new', label: 'New', className: 'bg-gold-500 text-ink-950' },
  { value: 'contacted', label: 'Contacted', className: 'bg-sky-100 text-sky-800' },
  { value: 'closed', label: 'Closed', className: 'bg-slate-200 text-slate-700' },
];

const digits = (phone: string) => phone.replace(/\D/g, '');

function exportCsv(leads: Lead[]) {
  const columns = ['createdAt', 'name', 'phone', 'email', 'service', 'message', 'status', 'source', 'locale', 'page'] as const;
  const cell = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const rows = leads.map((lead) =>
    columns.map((c) => cell(c === 'createdAt' ? lead.createdAt?.toISOString() : lead[c])).join(','),
  );
  // The BOM makes Excel read Arabic text correctly.
  const blob = new Blob(['﻿' + [columns.join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `brandraize-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

type LeadsPanelProps = {
  leads: Lead[];
  error: string | null;
  alertsEnabled: boolean;
  onEnableAlerts: () => void;
};

export default function LeadsPanel({ leads, error, alertsEnabled, onEnableAlerts }: LeadsPanelProps) {
  const [filter, setFilter] = useState<Lead['status'] | 'all'>('all');
  const [actionError, setActionError] = useState<string | null>(null);

  const shown = filter === 'all' ? leads : leads.filter((lead) => lead.status === filter);

  const setStatus = (lead: Lead, status: Lead['status']) =>
    updateDoc(doc(db, 'leads', lead.id), { status }).catch((e) => setActionError(errorMessage(e)));

  const remove = (lead: Lead) => {
    if (!window.confirm(`Delete the request from ${lead.name}? This cannot be undone.`)) return;
    deleteDoc(doc(db, 'leads', lead.id)).catch((e) => setActionError(errorMessage(e)));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(['all', 'new', 'contacted', 'closed'] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full px-4 py-2 text-sm font-bold capitalize transition-colors ${
                filter === value ? 'bg-ink-900 text-gold-400' : 'bg-white text-slate-600 hover:text-ink-900'
              }`}
            >
              {value} ({value === 'all' ? leads.length : leads.filter((l) => l.status === value).length})
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {!alertsEnabled && (
            <button type="button" onClick={onEnableAlerts} className={ghostButton}>
              <Bell className="h-4 w-4" aria-hidden="true" />
              Turn on new-request alerts
            </button>
          )}
          <button type="button" onClick={() => exportCsv(leads)} disabled={leads.length === 0} className={ghostButton}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Export CSV
          </button>
        </div>
      </div>

      {(error || actionError) && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
          {error ?? actionError}
        </p>
      )}

      {!error && shown.length === 0 && (
        <p className={`${cardClass} mt-5 text-slate-600`}>
          No requests here yet. When someone sends the &ldquo;Get a free consultation&rdquo; form, it appears on this
          page straight away.
        </p>
      )}

      <ul className="mt-5 space-y-4">
        {shown.map((lead) => (
          <li key={lead.id} className={`${cardClass} ${lead.status === 'new' ? 'border-gold-500' : ''}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-lg font-extrabold text-ink-900">{lead.name}</p>
                <p className="text-sm text-slate-500">
                  {lead.createdAt?.toLocaleString() ?? ''} · {lead.service || 'No service selected'} ·{' '}
                  {lead.source} ({lead.locale})
                </p>
              </div>
              <select
                value={lead.status}
                onChange={(e) => setStatus(lead, e.target.value as Lead['status'])}
                aria-label="Status"
                className={`rounded-full border-0 px-3 py-1.5 text-sm font-bold ${statuses.find((s) => s.value === lead.status)?.className}`}
              >
                {statuses.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            {lead.message && (
              <p className="mt-3 whitespace-pre-wrap rounded-xl bg-sand-50 p-3 text-[15px] text-ink-800" dir="auto">
                {lead.message}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href={`https://wa.me/${digits(lead.phone)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-2 text-sm font-bold text-white"
              >
                <FaWhatsapp size={16} aria-hidden="true" />
                WhatsApp
              </a>
              <a href={`tel:${lead.phone}`} className={ghostButton}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span dir="ltr">{lead.phone}</span>
              </a>
              {lead.email && (
                <a href={`mailto:${lead.email}`} className={ghostButton}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {lead.email}
                </a>
              )}
              <button type="button" onClick={() => remove(lead)} className={`${dangerButton} ms-auto`}>
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
