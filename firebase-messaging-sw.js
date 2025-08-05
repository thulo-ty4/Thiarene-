importScripts("https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAfaaMyk4_CjF9SwJ4D0o-r0A5jENFJxOc",
  authDomain: "blossomverse-lgajk.firebaseapp.com",
  projectId: "blossomverse-lgajk",
  storageBucket: "blossomverse-lgajk.appspot.com",
  messagingSenderId: "588813220309",
  appId: "1:588813220309:web:ea1934d655e1d2397ce55c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/logo192.png'
  });
});
