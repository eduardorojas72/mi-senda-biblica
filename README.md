# Mi Senda Bíblica

PWA sencilla, instalable y sin backend, para animar a leer la Biblia por temas
y llevar el registro del progreso de lectura. Inspirada en la idea de
recursos como JW Library, pero con **contenido y estructura propios** —
ver "Notas legales" abajo.

## Funciones (MVP)

- **Temas sugeridos**: categorías de situaciones de la vida (relaciones,
  ansiedad, decisiones, duelo, esperanza...) con pasajes relacionados.
  Redacción y curaduría 100% originales.
- **Lector de pasajes**: muestra el texto del capítulo, obtenido en vivo
  desde una API pública (ver abajo).
- **Registro de lectura**: checklist por libro/capítulo, con progreso por
  Antiguo/Nuevo Testamento y global. Se guarda en `localStorage`, sin cuenta.
- PWA instalable (`manifest.webmanifest` + `sw.js`), cachea el cascarón de
  la app para uso offline; el texto leído se cachea capítulo a capítulo.

## Notas legales

- **Texto bíblico**: Reina-Valera Antigua (1909), traducción de **dominio
  público**, obtenida en vivo vía `js/bible-api.js` (no se incluye el texto
  en el repositorio). El proveedor está centralizado en una sola constante
  (`BIBLE_API` en ese archivo) para poder cambiarlo fácilmente.
  - **Pendiente de verificar en un entorno con salida a internet**: el
    endpoint usado (bolls.life) no se pudo probar en vivo durante el
    desarrollo porque este entorno no tenía acceso general a internet.
    Confirmar que responde y ajustar el parseo si el formato difiere.
  - Se evaluó usar una traducción más moderna (ej. Reina-Valera Gómez), pero
    su estatus de dominio público no está verificado — no usar sin
    confirmar la licencia primero.
- **Contenido editorial** (nombres de temas, descripciones, agrupación de
  libros en "Antiguo/Nuevo Testamento"): redacción original, no tomada de
  JW Library ni de jw.org.
- **Sin branding de terceros**: no se usan logos, nombres ni marca de
  Watch Tower / JW Library / jw.org.

## Desarrollo local

Sin build step. Basta con servir la carpeta como estática, por ejemplo:

```
python3 -m http.server 8080
```

y abrir `http://localhost:8080`.

## Despliegue

Pensado para desplegarse como sitio estático (Vercel, Netlify, GitHub
Pages, etc.), igual que el resto de proyectos del mismo autor.
