/* ---------------------------------------------------------------
   TEXTO BÍBLICO — Reina-Valera Antigua (1909), dominio público.
   El texto NO se incluye en el código: se pide en vivo a una API
   pública que sirve esa traducción, y se cachea en localStorage
   para poder releer el mismo capítulo sin conexión después.

   IMPORTANTE: este entorno de desarrollo no tiene salida a internet
   general, así que este endpoint no se pudo probar en vivo durante
   la construcción. Verificar una vez desplegado; si el proveedor
   cambia de forma o de URL, solo hay que ajustar BIBLE_API de abajo.
--------------------------------------------------------------- */

const BIBLE_API = {
  // bolls.life: API pública, sin API key, usada por varias apps bíblicas
  // de código abierto. "RVA" = Reina-Valera Antigua (1909).
  traduccion: "RVA",
  urlCapitulo: (libroIdx, capitulo) =>
    `https://bolls.life/get-text/RVA/${libroIdx}/${capitulo}/`,
};

const BIBLE_CACHE_KEY = "mi-senda-biblica-textos-v1";

function leerCacheTexto() {
  try {
    return JSON.parse(localStorage.getItem(BIBLE_CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}

function guardarCacheTexto(cache) {
  try {
    localStorage.setItem(BIBLE_CACHE_KEY, JSON.stringify(cache));
  } catch {
    /* localStorage lleno o no disponible: seguimos sin cache */
  }
}

/* Normaliza distintas formas de respuesta JSON a [{verse, text}] */
function normalizarVersiculos(data) {
  if (!Array.isArray(data)) return null;
  return data
    .map((v) => ({
      verse: v.verse ?? v.v ?? v.verseNumber ?? null,
      text: (v.text ?? v.t ?? "").toString().trim(),
    }))
    .filter((v) => v.verse && v.text);
}

/**
 * Obtiene el texto de un capítulo. Devuelve:
 *   { ok: true, versiculos: [{verse, text}], cache: boolean }
 *   { ok: false, error: string }
 */
async function obtenerCapitulo(nombreLibro, capitulo) {
  const key = `${nombreLibro}|${capitulo}`;
  const cache = leerCacheTexto();

  if (cache[key]) {
    return { ok: true, versiculos: cache[key], cache: true };
  }

  const libroIdx = indiceLibro(nombreLibro);
  if (!libroIdx) {
    return { ok: false, error: "Libro no reconocido." };
  }

  try {
    const resp = await fetch(BIBLE_API.urlCapitulo(libroIdx, capitulo));
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    const versiculos = normalizarVersiculos(data);
    if (!versiculos || versiculos.length === 0) {
      throw new Error("Respuesta vacía o con formato inesperado.");
    }
    cache[key] = versiculos;
    guardarCacheTexto(cache);
    return { ok: true, versiculos, cache: false };
  } catch (err) {
    return {
      ok: false,
      error:
        "No se pudo cargar el texto. Revisa tu conexión e inténtalo de nuevo.",
    };
  }
}
