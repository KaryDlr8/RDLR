const nombreCache = "TrabjosRDLR";
// archivos se guarda en el cache guardar todo lo que este dentro de la raiz
const archivos = [
  "./",
  "./index.html",
  "./app.js",
  "./css/style.css",
  "./css/bootsrap.min.css",
  "./images/portfolio/Circ.jpg",
  "./images/portfolio/Coti.jpg",
  "./images/portfolio/Ins.jpg",
  "./images/portfolio/mant.jpg",
  "./images/portfolio/plc.jpg",
  "./images/portfolio/Soli.jpg",
  "./images/testimonial/ATV.jpg",
  "./images/testimonial/H.jpg",
  "./images/testimonial/Nis.jpg",
  "./images/testimonial/Ped.jpg",
  "./images/1.1.png",
  "./js/bootstrap.min.js",
  "./js/jquery.min.js",
  "./js/main.js",
  "./js/popper.min.js",
  "./js/scrollit.min.js",
  "./C..V.pdf"
];

self.addEventListener("install", (e) => {
  console.log("Instalando.....");
  e.waitUntil(
    caches.open(nombreCache).then((cache) => {
      console.log("Agregando al caché");
      return cache
        .addAll(archivos)
        .then(() => console.log("Archivos almacenados en caché correctamente"))
        .catch((error) =>
          console.error("Error al almacenar archivos en caché:", error)
        );
    })
  );
});

self.addEventListener("activate", (e) => {
  console.log("activando", e);
});

//compara y actualiza el cache
self.addEventListener("fetch", (e) => {
  console.log("Fetch...", e);
  e.respondWith(
    caches.match(e.request).then((respuestaCache) => {
      return (
        respuestaCache ||
        fetch(e.request)
          .then((respuestaRed) => {
            // Si la respuesta de la red es válida, la almacenamos en la caché
            if (respuestaRed.ok) {
              return caches.open(nombreCache).then((cache) => {
                cache.put(e.request, respuestaRed.clone());
                return respuestaRed;
              });
            }
            return respuestaRed;
          })
          .catch((error) => {
            console.error("Error al recuperar recurso:", error);
            // Puedes retornar una respuesta de fallback aquí si es necesario
          })
      );
    })
  );
});
