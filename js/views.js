/* ---------------------------------------------------------------
   VISTAS — render de cada pantalla sobre #view-container
--------------------------------------------------------------- */

function el(html) {
  const tpl = document.createElement("template");
  tpl.innerHTML = html.trim();
  return tpl.content.firstElementChild;
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------------- Barra inferior de navegación ---------------- */

function renderNav(activa) {
  const items = [
    { id: "inicio", label: "Inicio", icon: "home" },
    { id: "temas", label: "Temas", icon: "compass" },
    { id: "registro", label: "Mi lectura", icon: "list-checks" },
  ];
  return `
    <nav class="bottom-nav">
      ${items
        .map(
          (it) => `
        <a href="#/${it.id}" class="nav-item ${activa === it.id ? "activo" : ""}">
          ${icon(it.icon)}
          <span>${it.label}</span>
        </a>`
        )
        .join("")}
    </nav>`;
}

/* ---------------- Inicio ---------------- */

function vistaInicio() {
  const prog = progresoGlobal();
  return `
    <div class="pantalla">
      <header class="hero">
        <p class="hero-eyebrow">Salmo 119:105</p>
        <h1>Mi Senda Bíblica</h1>
        <p class="hero-sub">"Lámpara es a mis pies tu palabra, y lumbrera a mi camino."</p>
      </header>

      <section class="card progreso-card">
        <div class="progreso-card-top">
          <span>Tu progreso de lectura</span>
          <strong>${prog.pct}%</strong>
        </div>
        <div class="barra"><div class="barra-fill" style="width:${prog.pct}%"></div></div>
        <p class="muted">${prog.hechos} de ${prog.total} capítulos marcados</p>
      </section>

      <section>
        <h2 class="seccion-titulo">¿Por dónde empezar?</h2>
        <div class="grid-temas">
          ${TEMAS.slice(0, 3)
            .map(
              (t) => `
            <a href="#/tema/${t.id}" class="tema-card">
              ${icon(t.icon, "tema-icon")}
              <span>${t.t}</span>
            </a>`
            )
            .join("")}
        </div>
        <a href="#/temas" class="ver-todos">Ver todos los temas ${icon("chevron-right")}</a>
      </section>

      <section>
        <h2 class="seccion-titulo">Seguimiento</h2>
        <a href="#/registro" class="card link-card">
          ${icon("list-checks")}
          <div>
            <strong>Registro de mi lectura</strong>
            <p class="muted">Marca los capítulos que ya leíste, libro por libro.</p>
          </div>
          ${icon("chevron-right")}
        </a>
      </section>
    </div>
    ${renderNav("inicio")}`;
}

/* ---------------- Temas ---------------- */

function vistaTemas() {
  return `
    <div class="pantalla">
      <header class="pantalla-header">
        <h1>Temas sugeridos</h1>
        <p class="muted">Elige una situación y encuentra pasajes relacionados.</p>
      </header>
      <div class="lista-temas">
        ${TEMAS.map(
          (t) => `
          <a href="#/tema/${t.id}" class="tema-row">
            ${icon(t.icon, "tema-icon")}
            <div>
              <strong>${t.t}</strong>
              <p class="muted">${t.d}</p>
            </div>
            ${icon("chevron-right")}
          </a>`
        ).join("")}
      </div>
    </div>
    ${renderNav("temas")}`;
}

function vistaTemaDetalle(temaId) {
  const tema = TEMAS.find((t) => t.id === temaId);
  if (!tema) return vistaTemas();
  marcarTemaVisitado(temaId);
  return `
    <div class="pantalla">
      <a href="#/temas" class="volver">${icon("chevron-left")} Temas</a>
      <header class="pantalla-header">
        ${icon(tema.icon, "tema-icon-grande")}
        <h1>${tema.t}</h1>
        <p class="muted">${tema.d}</p>
      </header>
      <div class="lista-pasajes">
        ${tema.pasajes
          .map(
            (p) => `
          <a href="#/leer/${encodeURIComponent(p.libro)}/${p.cap}" class="pasaje-row">
            <div>
              <strong>${p.ref}</strong>
              <p class="muted">${p.etiqueta}</p>
            </div>
            ${icon("chevron-right")}
          </a>`
          )
          .join("")}
      </div>
    </div>
    ${renderNav("temas")}`;
}

/* ---------------- Lector de pasajes ---------------- */

async function vistaLector(container, libro, capitulo) {
  capitulo = parseInt(capitulo, 10);
  const capIdx = capitulo - 1;
  const libroInfo = LIBROS.find((l) => l.n === libro);
  const leido = libroInfo ? !!ESTADO.libros[libro][capIdx] : false;
  const nota = obtenerNota(libro, capitulo);

  container.innerHTML = `
    <div class="pantalla">
      <a href="javascript:history.back()" class="volver">${icon("chevron-left")} Volver</a>
      <header class="pantalla-header">
        <h1>${libro} ${capitulo}</h1>
        <p class="muted">Palabra de Dios para Todos (PDT)</p>
      </header>
      <div id="lector-cuerpo" class="lector-cuerpo">
        <p class="muted">Cargando texto…</p>
      </div>
      ${libroInfo ? renderNavCapitulo(libro, capitulo, libroInfo.cap) : ""}

      <section class="card marcar-leido-card">
        <button id="marcar-leido" class="btn ${leido ? "btn-leido" : "btn-outline"}" ${libroInfo ? "" : "disabled"}>
          ${icon(leido ? "check" : "book-open")}
          <span>${leido ? "Marcado como leído" : "Marcar como leído"}</span>
        </button>
      </section>

      <section class="card notas-card">
        <h2 class="notas-titulo">Mis notas de este capítulo</h2>
        <label class="nota-campo">
          <span>Lo más importante de esta lectura</span>
          <textarea data-campo="importante" placeholder="¿Qué te marcó de este capítulo?">${escapeHtml(nota.importante)}</textarea>
        </label>
        <label class="nota-campo">
          <span>Quiero investigar más sobre...</span>
          <textarea data-campo="investigar" placeholder="Preguntas o temas para profundizar">${escapeHtml(nota.investigar)}</textarea>
        </label>
        <label class="nota-campo">
          <span>Lo pondré en práctica</span>
          <textarea data-campo="practica" placeholder="Una acción concreta para esta semana">${escapeHtml(nota.practica)}</textarea>
        </label>
      </section>
    </div>
    ${renderNav("")}`;

  const btnLeido = document.getElementById("marcar-leido");
  if (libroInfo) {
    btnLeido.addEventListener("click", () => {
      alternarCapitulo(libro, capIdx);
      const nuevoLeido = ESTADO.libros[libro][capIdx];
      btnLeido.classList.toggle("btn-leido", nuevoLeido);
      btnLeido.classList.toggle("btn-outline", !nuevoLeido);
      btnLeido.innerHTML = `${icon(nuevoLeido ? "check" : "book-open")} <span>${nuevoLeido ? "Marcado como leído" : "Marcar como leído"}</span>`;
    });
  }

  container.querySelectorAll(".nota-campo textarea").forEach((ta) => {
    ta.addEventListener("input", () => {
      guardarNota(libro, capitulo, ta.dataset.campo, ta.value);
    });
  });

  const resultado = await obtenerCapitulo(libro, capitulo);
  const cuerpo = document.getElementById("lector-cuerpo");
  if (!cuerpo) return; // el usuario ya navegó a otra vista

  if (!resultado.ok) {
    cuerpo.innerHTML = `
      <p class="error">${resultado.error}</p>
      <button class="btn" id="reintentar">Reintentar</button>`;
    document.getElementById("reintentar").addEventListener("click", () => vistaLector(container, libro, capitulo));
    return;
  }

  cuerpo.innerHTML = resultado.versiculos
    .map((v) => `<p><sup>${v.verse}</sup> ${escapeHtml(v.text)}</p>`)
    .join("");
}

function renderNavCapitulo(libro, capitulo, totalCap) {
  const prev = capitulo > 1 ? `#/leer/${encodeURIComponent(libro)}/${capitulo - 1}` : null;
  const next = capitulo < totalCap ? `#/leer/${encodeURIComponent(libro)}/${capitulo + 1}` : null;
  return `
    <div class="nav-capitulo">
      ${prev ? `<a href="${prev}" class="btn-secundario">${icon("chevron-left")} Cap. ${capitulo - 1}</a>` : "<span></span>"}
      ${next ? `<a href="${next}" class="btn-secundario">Cap. ${capitulo + 1} ${icon("chevron-right")}</a>` : "<span></span>"}
    </div>`;
}

/* ---------------- Registro de lectura ---------------- */

function vistaRegistro() {
  const at = progresoTestamento("AT");
  const nt = progresoTestamento("NT");
  return `
    <div class="pantalla">
      <header class="pantalla-header">
        <h1>Registro de mi lectura</h1>
        <p class="muted">Marca cada capítulo que leas. Tu progreso se guarda en este dispositivo.</p>
      </header>

      ${renderBloqueTestamento("Antiguo Testamento", "AT", at)}
      ${renderBloqueTestamento("Nuevo Testamento", "NT", nt)}
    </div>
    ${renderNav("registro")}`;
}

function renderBloqueTestamento(titulo, testamento, prog) {
  const libros = LIBROS.filter((l) => l.testamento === testamento);
  return `
    <section class="bloque-testamento">
      <div class="bloque-header">
        <h2>${titulo}</h2>
        <span class="muted">${prog.hechos}/${prog.total} · ${prog.pct}%</span>
      </div>
      <div class="barra barra-chica"><div class="barra-fill" style="width:${prog.pct}%"></div></div>
      <div class="lista-libros">
        ${libros.map((l) => renderLibroAcordeon(l)).join("")}
      </div>
    </section>`;
}

function renderLibroAcordeon(libro) {
  const p = progresoLibro(libro.n);
  const checks = ESTADO.libros[libro.n];
  return `
    <details class="libro-acordeon">
      <summary>
        <span>${libro.n}</span>
        <span class="muted">${p.hechos}/${p.total}</span>
      </summary>
      <div class="grid-capitulos">
        ${checks
          .map(
            (hecho, i) => `
          <a href="#/leer/${encodeURIComponent(libro.n)}/${i + 1}" class="cap-check ${hecho ? "hecho" : ""}">
            ${hecho ? icon("check") : i + 1}
          </a>`
          )
          .join("")}
      </div>
    </details>`;
}
