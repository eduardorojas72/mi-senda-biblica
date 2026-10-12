/* ---------------------------------------------------------------
   ICONOS — trazos propios en SVG (sin dependencias externas)
--------------------------------------------------------------- */

const ICON_PATHS = {
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15 9l-2 6-6 2 2-6 6-2z"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.2c2.3.4 4 2.3 4 5.8"/>',
  wind: '<path d="M3 8h10a2.5 2.5 0 1 0-2.4-3.2"/><path d="M3 13h14a2.5 2.5 0 1 1-2.4 3.2"/><path d="M3 18h7"/>',
  signpost: '<path d="M12 3v18"/><path d="M12 7h7l-2 2.5L19 12h-7"/><path d="M12 13H6l2-2.2L6 9h6"/>',
  "heart-handshake": '<path d="M12 7c-1.5-2-5-2.2-6.3.2-1.3 2.3.3 4.3 2 5.8l4.3 3.8 4.3-3.8"/><path d="M8 12l2 2 2-2 2 2 2-2"/>',
  sunrise: '<path d="M4 18h16"/><path d="M6 14a6 6 0 0 1 12 0"/><path d="M12 3v4"/><path d="M4.5 9.5l2 1.5"/><path d="M19.5 9.5l-2 1.5"/>',
  "book-open": '<path d="M4 5c3 0 6 1 8 2.5V20c-2-1.5-5-2.5-8-2.5V5z"/><path d="M20 5c-3 0-6 1-8 2.5V20c2-1.5 5-2.5 8-2.5V5z"/>',
  "list-checks": '<path d="M9 6h11"/><path d="M9 12h11"/><path d="M9 18h11"/><path d="M4 6l1 1 2-2"/><path d="M4 12l1 1 2-2"/><path d="M4 18l1 1 2-2"/>',
  "chevron-left": '<path d="M15 5l-7 7 7 7"/>',
  "chevron-right": '<path d="M9 5l7 7-7 7"/>',
  check: '<path d="M4 12l5 5 11-11"/>',
};

function icon(name, cls) {
  const path = ICON_PATHS[name] || "";
  return `<svg class="icon ${cls || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}
