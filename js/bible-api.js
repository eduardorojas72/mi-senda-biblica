/* ---------------------------------------------------------------
   TEXTO BÍBLICO — Palabra de Dios para Todos (PDT).
   El texto NO se incluye en el código: se pide en vivo a una API
   pública (bolls.life) que sirve esta traducción, y se cachea en
   localStorage para poder releer el mismo capítulo sin conexión
   después.

   Nota sobre PDT: publicada por el Centro Mundial de Traducción de
   la Biblia (WBTC), que la ofrece libre de regalías para uso
   ministerial. No es dominio público en sentido estricto, pero sí
   de uso libre — a diferencia de RV1960, NVI, NTV o LBLA, que tienen
   copyright activo y restringido. bolls.life confirmado como
   proveedor válido para este código (verificado en vivo).
--------------------------------------------------------------- */

const BIBLE_API = {
  traduccion: "PDT",
  urlCapitulo: (libroIdx, capitulo) =>
    `https://bolls.life/get-text/PDT/${libroIdx}/${capitulo}/`,
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
