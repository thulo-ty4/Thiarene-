import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyAfaaMyk4_CjF9SwJ4D0o-r0A5jENFJxOc",
  authDomain: "blossomverse-lgajk.firebaseapp.com",
  projectId: "blossomverse-lgajk",
  storageBucket: "blossomverse-lgajk.appspot.com",
  messagingSenderId: "588813220309",
  appId: "1:588813220309:web:ea1934d655e1d2397ce55c"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service worker enregistré ✅');

      getToken(messaging, {
        vapidKey: "BLOAjTgMrPXBk5gaC6Fx-nKBkhFMYiOrXRpnxh7c3o9W139lNrw_hMyhb5Uca5WGjrYxgiGvIrBPOcB8EHrszwY",
        serviceWorkerRegistration: registration
      }).then((token) => {
        console.log("Token Firebase utilisateur 🔑", token);
      }).catch((err) => {
        console.log("Erreur de permission ou token ❌", err);
      });
    });
}

// Notification visible directement
onMessage(messaging, (payload) => {
  alert("🔔 Nouvelle annonce : " + payload.notification.title);
});
