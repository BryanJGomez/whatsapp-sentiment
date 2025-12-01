# 📊 WhatsApp Sentiment Dashboard

Dashboard interactivo en tiempo real para análisis de sentimientos de mensajes de WhatsApp, construido con React + Vite + shadcn/ui.

🌐 **URL Producción**: [https://whatsapp-sentiment.vercel.app/](https://whatsapp-sentiment.vercel.app/)

---

## 🎯 Descripción del Proyecto

Este es el frontend del sistema de análisis de sentimientos para WhatsApp. Proporciona una interfaz moderna y responsive que:

- ✅ Visualiza mensajes de WhatsApp en tiempo real
- 📊 Muestra gráficos de distribución de sentimientos (Positivo, Neutral, Negativo)
- 🏷️ Analiza y presenta los temas más comunes
- 📈 Presenta estadísticas en tiempo real (total mensajes, promedio sentimiento)
- 🔄 Se conecta vía WebSockets para actualizaciones instantáneas
- 🎨 Incluye tema claro/oscuro con persistencia
- 📱 Diseño completamente responsive

---

## 🏗️ Arquitectura Frontend

```
┌─────────────────────────────────────────────────┐
│           Frontend (React + Vite)                │
│                                                  │
│  ┌──────────────┐      ┌──────────────┐        │
│  │   Socket.IO  │◄────►│    Backend   │        │
│  │    Client    │      │   (Python)   │        │
│  └──────┬───────┘      └──────────────┘        │
│         │                                        │
│         ▼                                        │
│  ┌──────────────┐                               │
│  │Socket Context│                               │
│  └──────┬───────┘                               │
│         │                                        │
│    ┌────┴────┐                                  │
│    ▼         ▼                                   │
│ ┌──────┐ ┌──────┐                              │
│ │Charts│ │Stats │                              │
│ └──────┘ └──────┘                              │
│                                                  │
│ ┌──────────────┐                               │
│ │Messages List │                               │
│ └──────────────┘                               │
└─────────────────────────────────────────────────┘
```

---

## 🚀 Instalación

### Prerequisitos

- Node.js >= 18.0.0
- npm >= 9.0.0

### Pasos de instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Navegar al directorio
cd whatsapp-sentiment-dashboard

# Instalar dependencias
npm install
```

---

## ⚙️ Configuración

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
cp .env.example .env
```

---

## 💻 Desarrollo

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:3000` (o el puerto que Vite asigne)

### Modo de desarrollo con hot reload

El proyecto usa Vite que proporciona:

- ⚡ Hot Module Replacement (HMR) ultra-rápido
- 🔥 Recarga instantánea de componentes
- 🎯 Errores claros en el navegador

---

## 📦 Producción

### Build del proyecto

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

### Preview del build

```bash
npm run preview
```

Esto iniciará un servidor local para previsualizar el build de producción.

---

## 🏗️ Estructura del Proyecto

```
whatsapp-sentiment-dashboard/
├── public/                  # Archivos estáticos
├── src/
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Entry point
│   ├── index.css           # Estilos globales
│   │
│   ├── components/         # Componentes React
│   │   ├── sentiment-dashboard.jsx    # Dashboard principal
│   │   ├── sentiment-chart.jsx        # Gráfico de torta
│   │   ├── topics-chart.jsx           # Gráfico de barras
│   │   ├── messages-list.jsx          # Lista de mensajes
│   │   ├── message-card.jsx           # Card individual
│   │   ├── stats-cards.jsx            # Tarjetas de estadísticas
│   │   ├── theme-provider.jsx         # Proveedor de tema
│   │   ├── theme-toggle.jsx           # Toggle claro/oscuro
│   │   │
│   │   └── ui/             # Componentes UI de shadcn
│   │       ├── card.tsx
│   │       ├── button.tsx
│   │       ├── badge.tsx
│   │       ├── chart.tsx
│   │       └── ...
│   │
│   ├── contexts/           # React Contexts
│   │   └── socket-context.jsx         # Manejo de Socket.IO
│   │
│   ├── hooks/              # Custom Hooks
│   │   ├── use-socket.js              # Hook de Socket
│   │   ├── use-toast.ts               # Hook de toast
│   │   └── use-mobile.ts              # Detección mobile
│   │
│   └── lib/
│       └── utils.ts        # Utilidades (cn, etc)
│
├── components.json         # Config de shadcn/ui
├── tailwind.config.js      # Config de Tailwind CSS
├── vite.config.js          # Config de Vite
├── tsconfig.json           # Config de TypeScript
└── package.json            # Dependencias
```

---

## 🎨 Tecnologías y Librerías

### Core

- **React 18.3.1** - Biblioteca UI
- **Vite** - Build tool
- **TypeScript** - Type safety

### UI/Styling

- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI primitivos
- **Radix UI** - Componentes accesibles headless
- **class-variance-authority** - Variantes de estilos
- **Lucide React** - Iconos

### Charts

- **Recharts** - Librería de gráficos React

### WebSockets

- **Socket.IO Client** - Cliente WebSocket

### Utilidades

- **date-fns** - Manejo de fechas
- **clsx** - Utilidad de classNames
- **embla-carousel** - Carruseles

---

## 🔗 Integración con Backend

Este frontend se conecta al backend Python/Flask del proyecto `maic`.

### Endpoints esperados:

```
WebSocket: http://localhost:8080
API REST: http://localhost:8080
```

### Configuración del backend:

Ver el README del proyecto `maic` para:

- URL: https://github.com/BryanJGomez/whatsapp-sentiment-api
- Instalación y configuración
- Variables de entorno
- Docker setup
- API endpoints

---

## 📱 Responsive Design

El dashboard es completamente responsive:

- **Desktop (>= 1024px)**: Grid de 3 columnas
- **Tablet (768px - 1023px)**: Grid de 2 columnas
- **Mobile (< 768px)**: Columna única

### Breakpoints de Tailwind:

```javascript
sm: '640px'
md: '768px'
lg: '1024px'
xl: '1280px'
2xl: '1536px'
```

---

## 🐳 Docker (Futuro)

Próximamente se agregará soporte para Docker:

```dockerfile
# dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

---

## 📈 Roadmap / Mejoras Futuras

- [ ] Filtros de mensajes por sentimiento
- [ ] Búsqueda de mensajes
- [ ] Exportar datos a CSV/Excel
- [ ] Gráficos de tendencias temporales
- [ ] Notificaciones push
- [ ] Modo offline con cache
- [ ] Autenticación de usuarios
- [ ] Panel de configuración
- [ ] Análisis de múltiples chats
- [ ] Comparación entre periodos

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es privado y de uso interno.

---

## 👨‍💻 Autor

**Bryan J. Gomez**

- GitHub: [@BryanJGomez](https://github.com/BryanJGomez)

---

## 📞 Soporte

Para preguntas o problemas:

- Abrir un issue en el repositorio
- Contactar al equipo de desarrollo

---

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Preview del build de producción
- `npm run lint` - Ejecuta el linter

## 📄 Licencia

MIT
