// Firebase web configuration. These values identify the project and are safe to ship to
// browsers; access is controlled by the security rules in /firestore.rules, not by hiding them.
export const firebaseConfig = {
  apiKey: 'AIzaSyCnyeIL3MsHM7Kp1gcSY0FSpvG25Edp9SM',
  authDomain: 'brandraize-cd022.firebaseapp.com',
  projectId: 'brandraize-cd022',
  storageBucket: 'brandraize-cd022.firebasestorage.app',
  messagingSenderId: '538325778118',
  appId: '1:538325778118:web:825ef2f764c2158858e1c7',
  measurementId: 'G-1CCQSK588Z',
};

// Firestore REST endpoint, used by the server so public pages never load the Firebase SDK.
export const firestoreRest = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`;
