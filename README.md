
NO separar en más archivos. NO fusionar en menos. Tres archivos web es el
equilibrio correcto: cada uno cabe en la cabeza, y los cambios son localizables.

---

## 5. DISEÑO — SISTEMA VISUAL

### 5.1 Paleta

Todo pasa por variables CSS en `:root`. Nunca hardcodear colores.

Claro:
  --bg:#f4f6f9       --bg-elev:#ffffff    --bg-sunken:#eaeef4
  --text:#0d1526     --text-2:#4a5668     --text-3:#8b95a6
  --border:#e0e6ef   --border-soft:#edf1f6
  --accent:#1d4ed8   --accent-soft:#e7eeff

Oscuro (data-theme="dark"):
  --bg:#0a0e15       --bg-elev:#121924    --bg-sunken:#0e141d
  --text:#e8edf5     --text-2:#a3b0c2     --text-3:#6b7889
  --border:#202b3a   --border-soft:#1a2432
  --accent:#5b8cff   --accent-soft:#16233c

Semánticos:
  --ok:#0f7a52   --warn:#a35a06   --danger:#c02a2a

### 5.2 Tipografía

- UI: fuente del sistema (`-apple-system, BlinkMacSystemFont, "Segoe UI",
  Roboto, ...`). Nunca fuentes externas.
- Lectura bíblica: serif clásica (`"Iowan Old Style", "Palatino Linotype",
  Georgia, serif`).
- Tamaño de lectura y interlineado configurables por el usuario. Se aplican
  como `--read-size` y `--read-lh` en `:root`.

### 5.3 Espaciado y radios

Radios: --r-sm:10px, --r-md:14px, --r-lg:20px, --r-xl:28px.
Sombras: --sh-1 (sutil), --sh-2 (hover), --sh-3 (elevado/sheets).
Motion: --ease, --ease-out, --spring, --dur:.22s.

### 5.4 Reglas de diseño

- Nada de cruces gigantes, cielos, palomas, dorados excesivos ni clichés
  religiosos. La identidad cristiana es sutil.
- Nada de dashboards empresariales llenos de tarjetas.
- Las listas respiran. Jerarquía tipográfica clara.
- Iconos: SVG inline con stroke. Nunca emojis.
- Estados vacíos elegantes (con `ic()`, texto y acción sugerida).
- Microinteracciones con función, nunca decorativas.

---

## 6. ARQUITECTURA DE LA APLICACIÓN

### 6.1 Router

Hash-based. `location.hash = '#/ruta/param'`.
`currentRoute()` devuelve un array: `['biblia', 'jhn', '3']`.
`render()` mapea `seg0` a una vista. Todas las vistas están en `View.*`.

Rutas activas:
  #/                  → Home
  #/biblia            → Índice de libros
  #/leer/<bk>/<ch>[/<v>] → Lector
  #/comparar/<bk>/<ch>   → Comparar versiones
  #/explorar          → Explorar
  #/palabra/<id>      → Ficha de palabra
  #/entrada/<id>      → Entrada de explorar
  #/doctrina          → Lista de doctrinas
  #/doctrina/<id>     → Detalle de doctrina
  #/estudios          → Lista de estudios
  #/estudio/<id>      → Editor de estudio
  #/notas             → Lista de notas
  #/nota/<id>         → Editor de nota
  #/inbox             → Para estudiar después
  #/favoritos         → Favoritos y marcadores
  #/buscar            → Búsqueda global
  #/panel             → Panel admin
  #/admin/<seccion>   → Subsecciones del panel
  #/ajustes           → Ajustes
  #/mas               → Más
  #/compartido/<b64>  → Estudio compartido (solo lectura)

### 6.2 Estado

Todo el estado vive en el objeto global `S`:
  S.settings, S.notes, S.studies, S.highlights, S.bookmarks, S.favorites,
  S.inbox, S.relations, S.folders, S.words, S.doctrines, S.explore,
  S.vod, S.bible, S.history, S.versions, S.stats

Persistencia con `save(clave)` que llama a `NativeStore.set(clave, S[clave])`.
Carga inicial en `loadPersisted()` al arrancar.

### 6.3 Capa de datos

`Data.*` agrupa operaciones sobre el estado (crear nota, toggle highlight,
relacionar entidades, etc). Cada operación guarda automáticamente.
Nunca modificar `S.*` directamente desde una vista. Siempre vía `Data.*` o
`save()`.

### 6.4 Capa de UI

`Layers` gestiona sheets, panels y scrim:
  Layers.openSheet(build)  → abre bottom sheet con función constructora
  Layers.closeSheet()
  Layers.closeAll()

`toast(msg, icon)` para confirmaciones efímeras.
`askText({ title, label, ... })` para pedir input (Promise).
`confirmDialog(title, message, confirmText)` para confirmaciones (Promise).

### 6.5 Iconos

Todos los iconos viven en el objeto `IC` en app.js. `ic(name, cls)` los
renderiza. NO añadir imágenes para iconos. NO usar emojis como iconos.

---

## 7. FUNCIONES CLAVE YA IMPLEMENTADAS

Referencia rápida para no duplicar trabajo:

- Lector con swipe entre capítulos, ignorando toolbar y chips.
- Selección de versículo con long-press en palabras (480 ms) y doble tap
  para ciclar colores de resaltado.
- Modo lectura sin distracciones (body.zen).
- Comparar dos versiones lado a lado.
- Exportar PDF con motor propio (PDFGen). No usa Chrome.
- Versículo como imagen PNG (canvas con gradiente y marca Study Berea).
- Notificaciones locales programadas 30 días hacia adelante con el
  versículo correcto por fecha.
- Búsqueda fuzzy (ignora tildes, mayúsculas, distancia de Levenshtein ≤1).
- Panel admin para palabras, doctrinas, explorar y versículo del día.
- Importar versiones bíblicas desde JSON en formato
  `{ "jhn": { "3": ["texto v1", "texto v2"] } }`.
- Compartir estudio por enlace base64 (solo lectura).
- Copia de seguridad completa en JSON.
- Modo nocturno automático por hora.
- Sincronización de status bar con tema.
- Háptica real con `Cap.Haptics` (fallback a `navigator.vibrate` en web).

---

## 8. REGLAS PARA CUALQUIER CAMBIO NUEVO

Antes de escribir código, pregúntate:

1. ¿Rompe alguna de las reglas del punto 2?
2. ¿Añade una dependencia? Si sí, justifícala o evítala.
3. ¿Funciona offline?
4. ¿Sobrevive al botón atrás del sistema?
5. ¿Respeta el sistema de diseño (variables, radios, sombras)?
6. ¿Usa `Data.*` para modificar estado, o está tocando `S.*` directo?
7. ¿Usa `Layers`, `toast`, `askText`, `confirmDialog` en vez de sus
   equivalentes nativos del navegador?
8. ¿Se siente como una app nativa, no como una web?

Si la respuesta a alguna es "no" o "no estoy seguro", pregunta antes de
implementar.

---

## 9. ERRORES QUE YA HEMOS COMETIDO (y cómo evitarlos)

Cada uno de estos causó una regresión. No repetirlos.

### 9.1 String sin cerrar en objeto IC
Añadir una entrada con un `\n` dentro de comillas simples rompe TODO el JS
y la app queda en blanco. Siempre strings en una sola línea o template
literals.

### 9.2 `window.open` para PDF
Abría Chrome externo y el botón atrás quedaba atrapado. Solución actual:
motor de PDF propio con `PDFGen.build()`.

### 9.3 Swipe del toolbar del editor
Un listener viejo del lector se disparaba cuando el usuario deslizaba el
toolbar del editor en una nota. Solución: un único listener global que
verifica la ruta activa y filtra por `e.target.closest(...)`.

### 9.4 Botón atrás que cerraba la app
Sin la lógica de capas, el botón atrás siempre cerraba. Solución actual
en el listener de `Cap.App.addListener('backButton', ...)`:
  1. Si modo zen activo → salir de zen.
  2. Si hay sheet o panel abierto → cerrarlos.
  3. Si hash no es `#/` → history.back().
  4. Si no → exitApp().

### 9.5 Viewport con zoom
Sin `maximum-scale=1, user-scalable=no` el pinch zoom delataba que era web.
Ya está en el `<meta viewport>`.

### 9.6 `hover` pegado en táctil
Un `:hover` sin `@media (hover: hover)` deja el estado pegado al tocar.
Todos los `:hover` del proyecto deben estar envueltos en
`@media (hover: hover)` o anulados en `@media (hover: none)`.

### 9.7 Indentación rota en el workflow de GitHub Actions
El YAML es sensible. Un heredoc (`<<'EOF'`) mal indentado rompe el archivo
completo. Preferir archivos `.py` externos o comandos simples.

---

## 10. CÓMO COMPILAR

GitHub Actions compila en la nube. Cada push a `main` dispara un build.

- Tiempo: 5-8 minutos
- Artifact: `berea-apk` en la pestaña Actions del run
- El APK se instala encima del anterior (mismo `appId`), los datos se
  conservan porque viven en `Preferences` del dispositivo, no en el APK.

No hay compilación local. No hay emulador. No hay debug con Android Studio.
Para ver errores de runtime en el teléfono: `chrome://inspect` desde
Chrome del PC con el teléfono conectado por USB y depuración activada.

---

## 11. FILOSOFÍA DE PRODUCTO

- El usuario decide. La app no gamifica, no recompensa, no insiste.
- No hay rachas con celebración, no hay puntos, no hay logros ruidosos.
- Todo está optimizado para lectura prolongada y escritura reflexiva.
- El silencio y el espacio son parte del diseño.
- El conocimiento del usuario es sagrado. No se envía a ningún servidor.
  No hay telemetría. No hay analytics.
- No hay IA generativa. Las conexiones entre contenido son explícitas y
  las hace el usuario.

---

## 12. CÓMO RESPONDER AL USUARIO

- El usuario habla español. Responde en español, sin excepción.
- No uses emojis decorativos en tus respuestas.
- Sé directo. Si algo no se puede o no se debe, dilo claro y explica por qué.
- No inventes APIs ni plugins. Si no sabes algo, pregunta o consulta.
- No asumas que el usuario sabe programar a nivel avanzado. Explica los
  pasos de forma concreta.
- Prefiere mostrar código completo antes que fragmentos, salvo que el
  fragmento sea claramente la única parte relevante.

---

## 13. PRIORIDADES CUANDO HAY CONFLICTO

1. Experiencia de usuario
2. Sensación nativa (no sentirse web)
3. Calidad visual
4. Lectura bíblica
5. Sistema de notas y estudios
6. Conexiones entre conocimiento
7. Offline + persistencia
8. Búsqueda
9. Contenido IPUC
10. Exploración bíblica
11. Funciones secundarias

Cuando dudes entre añadir una función y mejorar la experiencia, elige
mejorar la experiencia.

---

## 14. CHECKLIST ANTES DE CADA COMMIT

Antes de subir cualquier cambio, verifica:

- [ ] Los 3 archivos (index.html, styles.css, app.js) están sincronizados.
- [ ] No hay `console.log` de debug olvidados.
- [ ] No hay `TODO` ni `FIXME`.
- [ ] No hay texto de relleno (lorem ipsum).
- [ ] No hay botones que no hacen nada.
- [ ] No hay dependencias nuevas sin justificar.
- [ ] El cambio funciona offline.
- [ ] El botón atrás sigue funcionando.
- [ ] La háptica sigue disparando en las acciones correctas.
- [ ] El cambio se probó primero en Chrome del PC (F12 → Console limpia).
- [ ] El cambio no rompe ninguna de las reglas del punto 2.

---

## 15. FIN

Este documento es la fuente de verdad. Si alguna instrucción posterior del
usuario contradice algo aquí, pide aclaración antes de actuar. Es mejor
preguntar una vez que romper la sensación nativa que costó once iteraciones
conseguir.

Fin del contexto.