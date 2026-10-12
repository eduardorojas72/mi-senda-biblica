/* ---------------------------------------------------------------
   ESTADO Y PERSISTENCIA — 100% local (localStorage), sin backend
--------------------------------------------------------------- */

const STORAGE_KEY = "mi-senda-biblica-progreso-v1";

function estadoVacio() {
  const libros = {};
  LIBROS.forEach((l) => {
    libros[l.n] = Array(l.cap).fill(false);
  });
  return { libros, temasVisitados: [] };
}

function cargarEstado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!guardado || !guardado.libros) return estadoVacio();
    // Asegura compatibilidad si LIBROS cambia de tamaño entre versiones
    const base = estadoVacio();
    LIBROS.forEach((l) => {
      const prev = guardado.libros[l.n];
      if (Array.isArray(prev)) {
        base.libros[l.n] = base.libros[l.n].map((_, i) => !!prev[i]);
      }
    });
    base.temasVisitados = Array.isArray(guardado.temasVisitados)
      ? guardado.temasVisitados
      : [];
    return base;
  } catch {
    return estadoVacio();
  }
}

let ESTADO = cargarEstado();

function guardarEstado() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ESTADO));
  } catch {
    /* localStorage no disponible: el progreso no persiste esta sesión */
  }
}

function alternarCapitulo(libro, capituloIdx) {
  ESTADO.libros[libro][capituloIdx] = !ESTADO.libros[libro][capituloIdx];
  guardarEstado();
}

function marcarTemaVisitado(temaId) {
  if (!ESTADO.temasVisitados.includes(temaId)) {
    ESTADO.temasVisitados.push(temaId);
    guardarEstado();
  }
}

function progresoLibro(libro) {
  const checks = ESTADO.libros[libro];
  const hechos = checks.filter(Boolean).length;
  return { hechos, total: checks.length, pct: Math.round((hechos / checks.length) * 100) };
}

function progresoTestamento(testamento) {
  const libros = LIBROS.filter((l) => l.testamento === testamento);
  let hechos = 0;
  let total = 0;
  libros.forEach((l) => {
    const p = progresoLibro(l.n);
    hechos += p.hechos;
    total += p.total;
  });
  return { hechos, total, pct: total ? Math.round((hechos / total) * 100) : 0 };
}

function progresoGlobal() {
  let hechos = 0;
  let total = 0;
  LIBROS.forEach((l) => {
    const p = progresoLibro(l.n);
    hechos += p.hechos;
    total += p.total;
  });
  return { hechos, total, pct: total ? Math.round((hechos / total) * 100) : 0 };
}
