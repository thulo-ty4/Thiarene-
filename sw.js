self.addEventListener("install", (e) => {
  console.log("Service Worker installé.");
});

self.addEventListener("fetch", function(event) {
  // Tu peux ajouter ici du cache plus tard
});
