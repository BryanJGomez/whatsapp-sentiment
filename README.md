# 📊 WhatsApp Sentiment Dashboard

Dashboard interactivo en tiempo real para análisis de sentimientos de mensajes de WhatsApp, construido con React + Vite + shadcn/ui.

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
# URL del servidor WebSocket/Backend
VITE_SOCKET_URL=http://localhost:3001

# URL del API Backend (si es diferente)
VITE_API_URL=http://localhost:5000
```

---

## 💻 Desarrollo

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173` (o el puerto que Vite asigne)

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

## 🧩 Componentes Principales

### SentimentDashboard

Componente principal que orquesta todo el dashboard.

**Características:**

- Header con título y toggle de tema
- Indicador de estado de conexión WebSocket
- Grid responsive con todos los componentes

### SocketContext

Context Provider que maneja la conexión WebSocket.

**Funcionalidades:**

- Conexión automática al backend
- Reconexión automática
- Manejo de eventos del socket
- Estado de conexión global

### SentimentChart

Gráfico de torta (pie chart) mostrando distribución de sentimientos.

**Datos visualizados:**

- Positivo (verde)
- Neutral (amarillo/azul)
- Negativo (rojo)

### TopicsChart

Gráfico de barras horizontales con los temas más frecuentes.

**Características:**

- Top 10 temas
- Colores diferenciados
- Tooltips interactivos

### StatsCards

Tarjetas de estadísticas en tiempo real.

**Métricas mostradas:**

- Total de mensajes analizados
- Promedio de sentimiento
- Mensajes del día
- Tasa de respuesta

### MessagesList

Lista en tiempo real de los últimos mensajes.

**Características:**

- Auto-scroll a nuevos mensajes
- Límite de 50 mensajes
- Orden cronológico inverso

### MessageCard

Card individual de mensaje con toda su información.

**Información mostrada:**

- Remitente
- Contenido del mensaje
- Sentimiento (badge con color)
- Score de sentimiento
- Temas detectados
- Timestamp

---

## 🎨 Tecnologías y Librerías

### Core

- **React 18.3.1** - Biblioteca UI
- **Vite** - Build tool y dev server
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

## 📡 Eventos WebSocket

### Eventos que escucha el frontend:

```javascript
// Conexión establecida
socket.on("connect", () => {});

// Nuevo mensaje analizado
socket.on("new_message", (data) => {
  // data.message - objeto mensaje completo
  // data.sentiment - análisis de sentimiento
});

// Actualización de estadísticas
socket.on("stats_update", (data) => {
  // data.total_messages
  // data.sentiment_distribution
  // data.topics
});

// Dashboard data inicial
socket.on("dashboard_data", (data) => {
  // data.messages - lista de mensajes
  // data.stats - estadísticas
});

// Desconexión
socket.on("disconnect", (reason) => {});
```

### Eventos que emite el frontend:

```javascript
// Unirse al room del dashboard
socket.emit("join_dashboard");

// Solicitar data inicial
socket.emit("get_dashboard_data");
```

---

## 🎨 Sistema de Temas

El proyecto incluye soporte completo para tema claro y oscuro:

### Características:

- Toggle manual entre claro/oscuro
- Persistencia en localStorage
- Detección de preferencia del sistema
- Transiciones suaves

### Uso:

```jsx
import { useTheme } from "@/components/theme-provider";

function Component() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Cambiar tema
    </button>
  );
}
```

---

## 🔧 Configuración de Tailwind

El proyecto usa una configuración personalizada de Tailwind CSS:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... más variables CSS
      },
    },
  },
};
```

---

## 📊 Estructura de Datos

### Mensaje

```typescript
interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  sentiment: {
    label: "Positivo" | "Neutral" | "Negativo";
    score: number; // -1 a 1
    confidence: number; // 0 a 1
  };
  topics: string[];
  metadata?: {
    phone_number?: string;
    message_type?: string;
  };
}
```

### Estadísticas

```typescript
interface Stats {
  total_messages: number;
  sentiment_distribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  top_topics: Array<{
    topic: string;
    count: number;
  }>;
  average_sentiment: number;
  messages_today: number;
}
```

---

## 🚀 Optimizaciones

### Performance

- Lazy loading de componentes
- Memoización de cálculos costosos
- Virtual scrolling en listas grandes
- Debounce en búsquedas/filtros

### Build

- Code splitting automático
- Minificación de JS/CSS
- Tree shaking
- Optimización de assets

---

## 🐛 Debugging

### Logs de Socket.IO

El proyecto incluye logs detallados en consola:

```javascript
✅ Socket conectado - ID: abc123
✅ Unido al room: dashboard
📨 Nuevo mensaje recibido: {...}
❌ Socket desconectado - Razón: transport close
```

### React DevTools

Recomendado instalar:

- React Developer Tools
- Redux DevTools (si se usa Redux)

---

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia dev server

# Build
npm run build            # Build para producción
npm run preview          # Preview del build

# Linting
npm run lint             # Ejecuta ESLint

# Formato
npm run format           # Formatea código con Prettier (si está configurado)
```

---

## 🔗 Integración con Backend

Este frontend se conecta al backend Python/Flask del proyecto `maic`.

### Endpoints esperados:

```
WebSocket: http://localhost:3001
API REST: http://localhost:5000
```

### Configuración del backend:

Ver el README del proyecto `maic` para:

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

## 🔐 Seguridad

### Consideraciones:

- No exponer API keys en el código
- Usar variables de entorno para configuración
- Validar datos del socket antes de renderizar
- Sanitizar contenido de mensajes

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

## 🙏 Agradecimientos

- [shadcn/ui](https://ui.shadcn.com/) por los componentes UI
- [Radix UI](https://www.radix-ui.com/) por los primitivos accesibles
- [Recharts](https://recharts.org/) por los gráficos
- [Tailwind CSS](https://tailwindcss.com/) por el framework CSS
- [Vite](https://vitejs.dev/) por el build tool

---

**🎯 ¡Happy Coding!** 🚀

│ ├── lib/ # Utilidades
│ ├── App.jsx # Componente principal
│ ├── main.jsx # Entry point
│ └── index.css # Estilos globales
├── server/
│ └── index.js # Servidor WebSocket
├── public/ # Archivos estáticos
├── index.html # HTML template
└── vite.config.js # Configuración Vite

````

## 🔧 Tecnologías

- **React 18** - UI Library
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **Recharts** - Gráficos
- **Socket.io** - WebSockets en tiempo real
- **Radix UI** - Componentes UI accesibles
- **Express** - Servidor WebSocket

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Preview del build de producción
- `npm run server` - Inicia el servidor WebSocket
- `npm run lint` - Ejecuta el linter

## 🌐 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_SOCKET_URL=http://localhost:3001
````

## 📄 Licencia

MIT
