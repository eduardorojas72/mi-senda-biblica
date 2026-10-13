/* ---------------------------------------------------------------
   CONTENIDO ORIGINAL — Mi Senda Bíblica
   Todo el texto editorial (temas, descripciones, nombres de secciones)
   es redacción propia. El texto bíblico NO se incluye aquí: se obtiene
   en vivo desde una API que sirve la Reina-Valera Antigua (1909),
   traducción de dominio público. Ver js/bible-api.js.
--------------------------------------------------------------- */

/* Libros de la Biblia con su número de capítulos.
   Es información estructural estándar (igual en cualquier edición),
   no contenido con derechos de autor. El orden/índice (1-66) se usa
   como identificador de libro al consultar la API de texto. */
const LIBROS = [
  // Antiguo Testamento
  { n: "Génesis", cap: 50, testamento: "AT" },
  { n: "Éxodo", cap: 40, testamento: "AT" },
  { n: "Levítico", cap: 27, testamento: "AT" },
  { n: "Números", cap: 36, testamento: "AT" },
  { n: "Deuteronomio", cap: 34, testamento: "AT" },
  { n: "Josué", cap: 24, testamento: "AT" },
  { n: "Jueces", cap: 21, testamento: "AT" },
  { n: "Rut", cap: 4, testamento: "AT" },
  { n: "1 Samuel", cap: 31, testamento: "AT" },
  { n: "2 Samuel", cap: 24, testamento: "AT" },
  { n: "1 Reyes", cap: 22, testamento: "AT" },
  { n: "2 Reyes", cap: 25, testamento: "AT" },
  { n: "1 Crónicas", cap: 29, testamento: "AT" },
  { n: "2 Crónicas", cap: 36, testamento: "AT" },
  { n: "Esdras", cap: 10, testamento: "AT" },
  { n: "Nehemías", cap: 13, testamento: "AT" },
  { n: "Ester", cap: 10, testamento: "AT" },
  { n: "Job", cap: 42, testamento: "AT" },
  { n: "Salmos", cap: 150, testamento: "AT" },
  { n: "Proverbios", cap: 31, testamento: "AT" },
  { n: "Eclesiastés", cap: 12, testamento: "AT" },
  { n: "Cantares", cap: 8, testamento: "AT" },
  { n: "Isaías", cap: 66, testamento: "AT" },
  { n: "Jeremías", cap: 52, testamento: "AT" },
  { n: "Lamentaciones", cap: 5, testamento: "AT" },
  { n: "Ezequiel", cap: 48, testamento: "AT" },
  { n: "Daniel", cap: 12, testamento: "AT" },
  { n: "Oseas", cap: 14, testamento: "AT" },
  { n: "Joel", cap: 3, testamento: "AT" },
  { n: "Amós", cap: 9, testamento: "AT" },
  { n: "Abdías", cap: 1, testamento: "AT" },
  { n: "Jonás", cap: 4, testamento: "AT" },
  { n: "Miqueas", cap: 7, testamento: "AT" },
  { n: "Nahúm", cap: 3, testamento: "AT" },
  { n: "Habacuc", cap: 3, testamento: "AT" },
  { n: "Sofonías", cap: 3, testamento: "AT" },
  { n: "Hageo", cap: 2, testamento: "AT" },
  { n: "Zacarías", cap: 14, testamento: "AT" },
  { n: "Malaquías", cap: 4, testamento: "AT" },
  // Nuevo Testamento
  { n: "Mateo", cap: 28, testamento: "NT" },
  { n: "Marcos", cap: 16, testamento: "NT" },
  { n: "Lucas", cap: 24, testamento: "NT" },
  { n: "Juan", cap: 21, testamento: "NT" },
  { n: "Hechos", cap: 28, testamento: "NT" },
  { n: "Romanos", cap: 16, testamento: "NT" },
  { n: "1 Corintios", cap: 16, testamento: "NT" },
  { n: "2 Corintios", cap: 13, testamento: "NT" },
  { n: "Gálatas", cap: 6, testamento: "NT" },
  { n: "Efesios", cap: 6, testamento: "NT" },
  { n: "Filipenses", cap: 4, testamento: "NT" },
  { n: "Colosenses", cap: 4, testamento: "NT" },
  { n: "1 Tesalonicenses", cap: 5, testamento: "NT" },
  { n: "2 Tesalonicenses", cap: 3, testamento: "NT" },
  { n: "1 Timoteo", cap: 6, testamento: "NT" },
  { n: "2 Timoteo", cap: 4, testamento: "NT" },
  { n: "Tito", cap: 3, testamento: "NT" },
  { n: "Filemón", cap: 1, testamento: "NT" },
  { n: "Hebreos", cap: 13, testamento: "NT" },
  { n: "Santiago", cap: 5, testamento: "NT" },
  { n: "1 Pedro", cap: 5, testamento: "NT" },
  { n: "2 Pedro", cap: 3, testamento: "NT" },
  { n: "1 Juan", cap: 5, testamento: "NT" },
  { n: "2 Juan", cap: 1, testamento: "NT" },
  { n: "3 Juan", cap: 1, testamento: "NT" },
  { n: "Judas", cap: 1, testamento: "NT" },
  { n: "Apocalipsis", cap: 22, testamento: "NT" },
];

/* Índice de libro (1-66) usado para pedir texto a la API */
function indiceLibro(nombre) {
  return LIBROS.findIndex((l) => l.n === nombre) + 1;
}

/* Temas sugeridos — curaduría y redacción propias, pensada para quien
   no sabe por dónde empezar. Cada tema agrupa pasajes relacionados con
   una situación de la vida diaria. */
const TEMAS = [
  {
    id: "primeros-pasos",
    icon: "compass",
    t: "Primeros pasos",
    d: "Si nunca has leído la Biblia, estos pasajes dan un buen punto de partida.",
    pasajes: [
      { ref: "Juan 3:16", libro: "Juan", cap: 3, etiqueta: "El amor de Dios en una frase" },
      { ref: "Salmos 23", libro: "Salmos", cap: 23, etiqueta: "Un salmo de confianza, de los más leídos" },
      { ref: "Génesis 1-2", libro: "Génesis", cap: 1, etiqueta: "El relato de la creación" },
      { ref: "Mateo 5-6", libro: "Mateo", cap: 5, etiqueta: "El Sermón del Monte, enseñanzas de Jesús" },
    ],
  },
  {
    id: "relaciones",
    icon: "users",
    t: "Relaciones y familia",
    d: "Para cuidar los vínculos con las personas que más te importan.",
    pasajes: [
      { ref: "1 Corintios 13", libro: "1 Corintios", cap: 13, etiqueta: "Qué es el amor, en profundidad" },
      { ref: "Efesios 4", libro: "Efesios", cap: 4, etiqueta: "Cómo tratarnos unos a otros" },
      { ref: "Proverbios 17", libro: "Proverbios", cap: 17, etiqueta: "Sabiduría sobre la amistad" },
      { ref: "Colosenses 3", libro: "Colosenses", cap: 3, etiqueta: "Vida en familia y en comunidad" },
    ],
  },
  {
    id: "ansiedad",
    icon: "wind",
    t: "Momentos de ansiedad o temor",
    d: "Pasajes a los que volver cuando la preocupación se siente grande.",
    pasajes: [
      { ref: "Filipenses 4", libro: "Filipenses", cap: 4, etiqueta: "\"No estén afanosos por nada\"" },
      { ref: "Salmos 34", libro: "Salmos", cap: 34, etiqueta: "Dios cerca del que sufre" },
      { ref: "Mateo 6", libro: "Mateo", cap: 6, etiqueta: "No te angusties por el mañana" },
      { ref: "Isaías 41", libro: "Isaías", cap: 41, etiqueta: "\"No temas, yo te ayudo\"" },
    ],
  },
  {
    id: "decisiones",
    icon: "signpost",
    t: "Decisiones y propósito",
    d: "Cuando necesitas claridad para elegir un camino.",
    pasajes: [
      { ref: "Proverbios 3", libro: "Proverbios", cap: 3, etiqueta: "Confía de todo corazón" },
      { ref: "Santiago 1", libro: "Santiago", cap: 1, etiqueta: "Pedir sabiduría" },
      { ref: "Romanos 12", libro: "Romanos", cap: 12, etiqueta: "Transformación y propósito" },
      { ref: "Jeremías 29", libro: "Jeremías", cap: 29, etiqueta: "\"Planes de bienestar, no de calamidad\"" },
    ],
  },
  {
    id: "consuelo",
    icon: "heart-handshake",
    t: "Pérdida y consuelo",
    d: "Para los días difíciles, de duelo o de dolor.",
    pasajes: [
      { ref: "Salmos 34", libro: "Salmos", cap: 34, etiqueta: "Cercano a los quebrantados de corazón" },
      { ref: "Mateo 5", libro: "Mateo", cap: 5, etiqueta: "\"Bienaventurados los que lloran\"" },
      { ref: "2 Corintios 1", libro: "2 Corintios", cap: 1, etiqueta: "El Dios de toda consolación" },
      { ref: "Apocalipsis 21", libro: "Apocalipsis", cap: 21, etiqueta: "Una esperanza sin lágrimas" },
    ],
  },
  {
    id: "esperanza",
    icon: "sunrise",
    t: "Esperanza para el futuro",
    d: "Pasajes que miran hacia adelante con confianza.",
    pasajes: [
      { ref: "Romanos 15", libro: "Romanos", cap: 15, etiqueta: "El Dios de esperanza" },
      { ref: "Hebreos 11", libro: "Hebreos", cap: 11, etiqueta: "Qué es la fe" },
      { ref: "Isaías 40", libro: "Isaías", cap: 40, etiqueta: "\"Los que esperan a Jehová...\"" },
      { ref: "1 Pedro 1", libro: "1 Pedro", cap: 1, etiqueta: "Una esperanza viva" },
    ],
  },
];
