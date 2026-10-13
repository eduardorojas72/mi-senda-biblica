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

- **Texto bíblico**: Palabra de Dios para Todos (PDT), publicada por el
  Centro Mundial de Traducción de la Biblia (WBTC), que la ofrece libre de
  regalías para uso ministerial. No es dominio público en sentido estricto,
  pero sí de uso libre — a diferencia de RV1960, NVI, NTV o LBLA, que tienen
  copyright activo y restringido. Se obtiene en vivo vía `js/bible-api.js`
  desde bolls.life (API pública sin key), no se incluye el texto en el
  repositorio. El proveedor está centralizado en una sola constante
  (`BIBLE_API` en ese archivo) para poder cambiarlo fácilmente.
  - Se intentó primero con Reina-Valera Antigua (1909), dominio público
    verdadero, pero bolls.life no la tiene en su catálogo. Si aparece en
    otro proveedor más adelante, vale la pena migrar a esa por ser legalmente
    más sólida.
  - Se descartó Reina Valera Gómez (2004): su editor la distribuye libre de
    reclamar derechos, pero ese estatus no está verificado con la misma
    solidez que PDT.
  - Se descartó explícitamente la Traducción del Nuevo Mundo (jw.org/JW
    Library): es gratuita para lectura personal, pero sus Términos de Uso
    prohíben reproducirla dentro de otra app/sitio y redistribuirla —
    tiene copyright activo de Watch Tower.
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
