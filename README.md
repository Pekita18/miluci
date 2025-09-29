# Página Especial para Luci 💕

Una página web interactiva creada con amor para mi Luci por Valen.

## Características

- 🎮 Juego interactivo con preguntas de validación
- 💕 Diseño hermoso y responsive
- ⏰ Contador regresivo hasta el 6 de enero de 2026
- 📝 Carta virtual personalizable
- 🎬 Sistema de screamer con video
- 📱 Completamente responsive

## Instalación y Uso

1. Instala las dependencias:
```bash
npm install
```

2. Ejecuta en modo desarrollo:
```bash
npm run dev
```

3. Para construir para producción:
```bash
npm run build
```

## Despliegue en Vercel

1. Sube el proyecto a GitHub
2. Conecta tu repositorio con Vercel
3. Vercel detectará automáticamente que es un proyecto Vite
4. ¡Listo! Tu página estará disponible en línea

## Configuración del Video Screamer

**IMPORTANTE**: Debes reemplazar el archivo `public/screamer.mp4` con tu video real. El archivo debe:
- Estar en formato MP4
- Llamarse exactamente "screamer.mp4"
- Estar ubicado en la carpeta `public/`

## Personalización

### Cambiar la fecha del contador
Edita la variable `targetDate` en `src/App.jsx`:
```javascript
const targetDate = '2026-01-06T00:00:00'
```

### Modificar el contenido de la carta
Edita el contenido en el componente `VirtualLetter` dentro de `src/App.jsx`.

### Cambiar las preguntas
Modifica las preguntas y respuestas en el componente principal de `src/App.jsx`.

## Tecnologías Utilizadas

- React 19
- Vite
- CSS3 con gradientes y animaciones
- Google Fonts (Poppins)

## Estructura del Proyecto

```
luci-special/
├── public/
│   ├── screamer.mp4 (REEMPLAZAR CON TU VIDEO)
│   └── vite.svg
├── src/
│   ├── App.jsx (Componente principal)
│   ├── main.jsx (Punto de entrada)
│   └── index.css (Estilos globales)
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

¡Disfruta de tu página especial! 💕
