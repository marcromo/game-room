# 🎮 Game Room Frontend

Frontend moderno para la API de Game Room, construido con Next.js 14, TypeScript y Tailwind CSS.

## 🚀 Características

- ⚡ Next.js 14 con App Router
- 🎨 Tailwind CSS para estilos modernos
- 📱 Diseño responsive
- 🔄 Integración completa con API REST
- 💾 Gestión de estado con React Hooks
- 🎯 TypeScript para type safety

## 📋 Requisitos Previos

- Node.js 18+ y npm
- API de Game Room ejecutándose (por defecto en `http://localhost:3001/api`)

## 🛠️ Instalación

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**

   El archivo `.env.local` ya está configurado con valores por defecto:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

   Modifica la URL si tu API está en otro puerto o servidor.

3. **Iniciar servidor de desarrollo:**

   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**

   Navega a [http://localhost:3000](http://localhost:3000)

## 📂 Estructura del Proyecto

```
game-room/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── games/             # Página de juegos
│   │   └── page.tsx
│   └── globals.css        # Estilos globales
├── lib/                   # Utilidades y servicios
│   ├── api.ts            # Cliente API con Axios
│   └── config.ts         # Configuración de la API
├── components/           # Componentes reutilizables (a expandir)
├── public/               # Archivos estáticos
├── .env.local           # Variables de entorno
├── tailwind.config.ts   # Configuración de Tailwind
├── tsconfig.json        # Configuración de TypeScript
└── next.config.js       # Configuración de Next.js
```

## 🎯 Funcionalidades Disponibles

### Página Principal

- Dashboard con acceso rápido a todas las secciones
- Diseño moderno con efectos glassmorphism
- Cards interactivas para cada módulo

### Gestión de Juegos

- ✅ Listar todos los juegos
- ✅ Agregar nuevos juegos
- ✅ Eliminar juegos
- ✅ Visualizar detalles (nombre, descripción, género, jugadores)

### Próximas Funcionalidades

- 🏠 Gestión de salas
- 👥 Gestión de jugadores
- 🏆 Sistema de torneos
- 📊 Estadísticas y rankings
- ⚙️ Configuración de usuario

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo en puerto 3000

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia servidor de producción

# Linting
npm run lint         # Ejecuta ESLint
```

## 🌐 Configuración de la API

El frontend se conecta a la API a través del servicio en `lib/api.ts`. Puedes modificar la URL base en `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://tu-api-url/api
```

## 🎨 Personalización

### Colores y Tema

Los colores principales se pueden modificar en `tailwind.config.ts` y `app/globals.css`.

### Endpoints de API

Los endpoints están definidos en `lib/config.ts`:

```typescript
export const API_ENDPOINTS = {
  games: "/games",
  rooms: "/rooms",
  players: "/players",
  tournaments: "/tournaments",
};
```

## 🐛 Solución de Problemas

### Error de conexión con la API

Si ves errores de conexión:

1. Verifica que la API esté corriendo
2. Confirma la URL en `.env.local`
3. Revisa que no haya problemas de CORS

### Errores de compilación de TypeScript

Los errores de compilación son normales antes de instalar las dependencias. Ejecuta:

```bash
npm install
```

## 📝 Próximos Pasos

1. Implementar las páginas faltantes (rooms, players, tournaments, stats, settings)
2. Agregar autenticación de usuarios
3. Implementar sistema de notificaciones
4. Agregar tests unitarios y de integración
5. Optimizar rendimiento con React Server Components
6. Implementar caché de datos con SWR o React Query

## 🤝 Contribución

Para contribuir al proyecto:

1. Crea una nueva rama para tu feature
2. Realiza tus cambios
3. Asegúrate de que el código pase el linter
4. Crea un pull request

## 📄 Licencia

Este proyecto es parte del ecosistema Game Room API.

## 👨‍💻 Desarrollo

Desarrollado con ❤️ usando Next.js y TypeScript.

---

**Nota:** Asegúrate de tener la API de Game Room ejecutándose antes de iniciar el frontend.
