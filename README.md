# Prueba Técnica Frontend - Posts App

Aplicación de gestión de posts construida con React, TypeScript y Vite.

## Descripción

Aplicación frontend para gestionar posts utilizando la API REST de JSONPlaceholder. Permite listar, crear, editar, eliminar y visualizar posts con sus respectivos comentarios y autores.

## Tecnologías

- **React** 19.2.6 - Framework UI
- **TypeScript** 6.0.2 - Lenguaje tipado
- **Vite** 8.0.12 - Herramienta de build y desarrollo
- **TailwindCSS** 4.3.0 - Framework de estilos
- **React Router** 7.17.0 - Navegación
- **React Hook Form** 7.78.0 - Gestión de formularios
- **Yup** 1.7.1 - Validación de esquemas
- **Axios** 1.17.0 - Cliente HTTP
- **React Toastify** 11.1.0 - Notificaciones
- **Vitest** 4.1.8 - Testing unitario

## Requisitos Previos

- Node.js 18+ (recomendado 20+)
- npm, pnpm o yarn como gestor de paquetes

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd prueba-tecnica-frontend

# Instalar dependencias con pnpm (recomendado)
pnpm install

# O con npm
npm install

# O con yarn
yarn install
```

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia el servidor de desarrollo en `http://localhost:5173` |
| `pnpm build` | Compila el proyecto para producción |
| `pnpm preview` | Previsualiza el build de producción |
| `pnpm lint` | Ejecuta ESLint para verificar código |
| `pnpm test` | Ejecuta los tests en modo watch |
| `pnpm test:run` | Ejecuta los tests una sola vez |
| `pnpm test:ui` | Abre la interfaz gráfica de Vitest |

## Estructura del Proyecto

```
src/
├── api/                    # Configuración de Axios
├── assets/                 # Recursos estáticos
├── context/
│   └── posts/              # Context y Provider para posts
├── layouts/
│   └── DashboardLayout.tsx  # Layout principal con sidebar
├── pages/
│   ├── Post/               # Página de detalle de post
│   └── Posts/              # Páginas de lista de posts
│       ├── components/     # Componentes de posts
│       ├── hooks/          # Hooks personalizados
│       └── schemas/       # Esquemas de validación Yup
├── router/
│   └── AppRouter.tsx       # Configuración de rutas
├── services/
│   ├── dtos/               # Data Transfer Objects
│   └── mappers/            # Mapeadores de datos
├── shared/
│   ├── components/         # Componentes reutilizables
│   │   ├── Buttons/       # Button, FAB
│   │   └── Sidebar/       # Sidebar
│   ├── hooks/              # Hooks compartidos
│   └── interfaces/         # Interfaces TypeScript
└── test/                   # Configuración de tests
```

## Tests Unitarios

El proyecto incluye tests unitarios con Vitest y Testing Library para los siguientes componentes:

- `Button` - Botón con variantes y estados
- `FAB` - Floating Action Button
- `Modal` - Modal reutilizable
- `TextField` - Campo de texto/textarea
- `SpinnerLoading` - Spinner de carga
- `PostError` - Componente de error
- `CreatePostModal` - Modal para crear posts
- `EditPostModal` - Modal para editar posts
- `DeletePostModal` - Modal para eliminar posts
- `ListPosts` - Lista de posts

### Ejecutar Tests

```bash
# Modo watch (recomendado durante desarrollo)
pnpm test

# Ejecutar una sola vez
pnpm test:run

# Abrir interfaz gráfica
pnpm test:ui
```

### Estructura de Tests

Los archivos de test siguen la convención `*.test.tsx` y están ubicados en `src/test/` manteniendo la misma estructura que los componentes originales:

```
src/test/
├── shared/components/
│   ├── Buttons/
│   │   ├── Button.test.tsx
│   │   └── FAB.test.tsx
│   ├── Modal.test.tsx
│   ├── TextField.test.tsx
│   └── SpinnerLoading.test.tsx
└── pages/Posts/components/
    ├── PostError.test.tsx
    ├── CreatePostModal.test.tsx
    ├── EditPostModal.test.tsx
    ├── DeletePostModal.test.tsx
    └── ListPosts.test.tsx
```

## API Externa

El proyecto utiliza [JSONPlaceholder Typicode](https://jsonplaceholder.typicode.com) como API REST fake:

- `GET /posts` - Listar posts
- `GET /posts/:id` - Detalle de post
- `GET /posts/:id/comments` - Comentarios de un post
- `GET /users/:id` - Datos del autor
- `POST /posts` - Crear post
- `PATCH /posts/:id` - Actualizar post
- `DELETE /posts/:id` - Eliminar post

## Variables de Entorno

No requiere variables de entorno. La API está configurada directamente en `src/api/apiConfig.ts`.

## Licencia

Privado - Uso técnico
