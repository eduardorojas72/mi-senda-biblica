/* ---------------------------------------------------------------
   APP — enrutador por hash, muy simple, sin dependencias
--------------------------------------------------------------- */

function render() {
  const container = document.getElementById("view-container");
  const hash = location.hash.replace(/^#\//, "");
  const [ruta, ...partes] = hash.split("/");

  if (ruta === "" || ruta === "inicio") {
    container.innerHTML = vistaInicio();
  } else if (ruta === "temas") {
    container.innerHTML = vistaTemas();
  } else if (ruta === "tema") {
    container.innerHTML = vistaTemaDetalle(partes[0]);
  } else if (ruta === "registro") {
    container.innerHTML = vistaRegistro();
  } else if (ruta === "leer") {
    const libro = decodeURIComponent(partes[0]);
    const capitulo = partes[1];
    vistaLector(container, libro, capitulo);
    window.scrollTo(0, 0);
    return;
  } else {
    container.innerHTML = vistaInicio();
  }
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", () => {
  render();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
});
