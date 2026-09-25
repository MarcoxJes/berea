# CONTEXT.md — Study Berea

Este documento es el contrato del proyecto. Léelo completo antes de tocar
una sola línea. Si una instrucción del usuario contradice algo aquí,
pregúntale antes de proceder.

---

## 1. QUÉ ES STUDY BEREA

Una biblioteca bíblica personal. No es "otra app de Biblia". No es una web
disfrazada. Es una herramienta que el usuario abre todos los días para leer,
subrayar, escribir y conectar ideas a lo largo de años.

Concepto central:
  BIBLIA ↔ PALABRAS ↔ DOCTRINAS ↔ NOTAS ↔ ESTUDIOS ↔ REFERENCIAS

La Biblia es el centro, pero alrededor de ella el usuario construye su
propio conocimiento. Todo debe sentirse como un único ecosistema.

Nombre: Study Berea
Bundle ID: com.berea.app
Repositorio: github.com/MarcoxJes/berea (privado)
Autor: usuario único (Marco). No es producto comercial.

---

## 2. REGLA ABSOLUTA: NO PUEDE SENTIRSE COMO WEB

Esto es lo más importante del proyecto. Cualquier cambio que rompa la
sensación de app nativa es un fallo grave, aunque mejore otra cosa.

### 2.1 Lo que NUNCA se debe hacer

- Usar `<a href>` para navegar. Siempre `location.hash` con `go()`.
- Abrir ventanas con `window.open`. En Android abre Chrome externo y rompe
  el flujo (el botón atrás queda atrapado).
- Usar `alert()`, `confirm()` o `prompt()` nativos del navegador.
  Ya existe `confirmDialog()` y `askText()` que usan el sheet nativo.
- Añadir `hover` sin envolverlo en `@media (hover: hover)`.
- Meter `target="_blank"` en cualquier enlace.
- Recargar la página con `location.reload()` salvo en el wipe de datos.
- Usar `scrollIntoView` sin `{ behavior: 'smooth', block: 'center' }`.
- Escribir CSS con `!important` salvo en los overrides táctiles ya
  existentes en `@media (hover: none)`.
- Meter imágenes externas (http://...). Todo debe ser local o data URI.
- Usar fuentes de Google Fonts. Solo fuentes del sistema.
- Introducir dependencias JS (React, Vue, jQuery, Lodash, Moment, etc).
  El proyecto es vanilla JS puro.
- Añadir frameworks CSS (Tailwind, Bootstrap, Bulma). El CSS es propio.
- Cambiar la estructura de archivos sin pedir permiso.
- Dividir en más archivos. Solo son 3: index.html, styles.css, app.js.

### 2.2 Lo que SIEMPRE se debe respetar

- Botón atrás del sistema: funciona en capas. Primero cierra sheets,
  luego retrocede en el historial, y solo al final cierra la app.
  Ya está implementado con `Cap.App.addListener('backButton', ...)`.
  No tocar esa lógica sin entenderla completa.
- Háptica en cada acción importante. `haptic('light' | 'medium' | 'heavy' |
  'success' | 'error')`. Nunca dejarla en silencio si la acción cambia algo.
- Status bar de Android se sincroniza con el tema (claro/oscuro) mediante
  `applyTheme()`. No romper eso.
- Navegación con transición direccional. Al avanzar la vista entra desde
  la derecha (`forward`), al retroceder desde la izquierda (`back`).
  Se controla con `_lastDepth` en `render()`.
- Sin zoom, sin pinch, sin doble tap zoom, sin selección accidental.
  Ya está en CSS con `touch-action: manipulation` y
  `user-select: none` global, con excepciones para inputs y
  contenteditable.
- Todo funciona offline. Cualquier función nueva debe funcionar sin red.
- Persistencia vía `NativeStore` (usa `Cap.Preferences` en Android y
  `localStorage` como fallback en web). Nunca `localStorage` directo.

---

## 3. STACK

- HTML + CSS + JavaScript vanilla (sin transpilación, sin bundler).
- Capacitor 6 para empaquetar como app Android.
- GitHub Actions para compilar el APK en la nube (el PC del usuario tiene
  solo 4 GB de RAM, no puede correr Android Studio).
- Sin backend. Sin servidor. Sin base de datos remota. Todo local.

### Plugins de Capacitor usados

- @capacitor/app — botón atrás, ciclo de vida
- @capacitor/core — base
- @capacitor/dialog — confirmaciones nativas
- @capacitor/filesystem — guardar PDFs y archivos
- @capacitor/haptics — vibración real
- @capacitor/keyboard — resize del viewport
- @capacitor/local-notifications — versículo del día
- @capacitor/preferences — almacenamiento persistente
- @capacitor/share — compartir nativo
- @capacitor/splash-screen — pantalla de carga
- @capacitor/status-bar — barra del sistema

NO añadir plugins sin consultar. Cada plugin suma peso y permisos.

---

## 4. ESTRUCTURA DE ARCHIVOS

berea/
├── www/                      ← lo que empaqueta la app
│   ├── index.html            ← solo estructura HTML (~60 líneas)
│   ├── styles.css            ← todo el CSS (~320 líneas)
│   ├── app.js                ← toda la lógica (~3.610 líneas)
│   └── data/                 ← textos bíblicos embebidos: datos, no código
│       ├── rvr1960.js        ← window.BereaBible["rvr1960"]=… (4 MB)
│       ├── ntv.js            ← window.BereaBible["ntv"]=… (4,3 MB)
│       └── tla.js            ← window.BereaBible["tla"]=… (4 MB)
├── resources/
│   ├── icon.svg              ← logo de la app
│   └── splash.svg            ← pantalla de carga
├── .github/
│   └── workflows/
│       └── build.yml         ← GitHub Actions: crea android/, añade el
│                               permiso SCHEDULE_EXACT_ALARM y sube el APK
├── convertir_biblia.py       ← JSON fuente → JSON en formato Berea
│                               (versículo = string, título = {"h":"…"})
├── bible-data-es-spa-main/   ← 334 MB de textos fuente y *_berea.json.
│                               No entra en el APK y no está en git.
├── capacitor.config.json
├── package.json
├── CONTEXT.md                ← este archivo
└── README.md

Notas sobre la estructura:

- La lógica vive solo en los 3 archivos de siempre: index.html, styles.css
  y app.js (§2.1). `www/data/*.js` son textos generados: se cargan con un
  `<script>` diferido (`loadBundled`) y nunca se editan a mano.
- No hay carpeta `android/` en el repositorio: la crea `build.yml` en la
  nube (`npx cap add android` + `npx cap sync android`).
- Flujo de un texto: `bible-data-es-spa-main/*.json` → `convertir_biblia.py`
  → `*_berea.json` → envolver en `window.BereaBible["id"]=…` →
  `www/data/id.js`. El último paso hoy es manual: no hay script que lo haga.
- No hay `.gitignore` en la raíz: un `git add -A` metería los 334 MB de
  `bible-data-es-spa-main/`.