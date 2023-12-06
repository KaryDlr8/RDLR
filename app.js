//desde el navegador se registrara la respuesta
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("sw.js") 
    .then(registro => console.log("El service Worker esta registrado", registro))
    .catch(err => console.error("Error al registrar el servicio de trabajo", err))
}else{
    console.warn('este navegador no soporta sw')
}