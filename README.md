# Proyecto Técnico: Next.js con TypeScript, Shadcn, Tailwind CSS, React Query y Recharts

## Descripción
Este proyecto técnico fue desarrollado para demostrar habilidades en el uso de tecnologías modernas en un entorno de desarrollo frontend.

El proyecto implementa:
- **Next.js** como framework principal para la creación de la aplicación web.
- **TypeScript** para tipado estático y mejor mantenimiento del código.
- **Shadcn** para componentes estilizados y personalizables.
- **Tailwind CSS** para diseño responsivo y utilitario.
- **React Query** para la gestión eficiente del estado remoto.
- **Recharts** para la creación de gráficos interactivos y visualizaciones de datos.

## Requisitos previos
1. Tener instalado **Node.js** (versión 16 o superior).
2. Tener instalado **yarn** como gestor de paquetes.
3. Tener configurado **Git** para clonar repositorios.

## Instalación y configuración del proyecto
1. **Clonar el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
   ```

2. **Instalar dependencias**:
   ```bash
   yarn install
   ```

3. **Agregar las dependencias necesarias**:
   ```bash
   yarn add @tanstack/react-query recharts @shadcn/ui tailwindcss postcss autoprefixer typescript @types/react @types/node
   ```

4. **Configurar Tailwind CSS**:
   - Crear un archivo `tailwind.config.js`:
     ```javascript
     module.exports = {
       content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
       theme: {
         extend: {},
       },
       plugins: [],
     };
     ```
   - Agregar el CSS base en `globals.css`:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

5. **Configurar React Query**:
   - Crear un proveedor global en `src/context/QueryProvider.tsx`:
     ```tsx
     import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
     import { ReactNode } from 'react';

     const queryClient = new QueryClient();

     export const QueryProvider = ({ children }: { children: ReactNode }) => (
       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
     );
     ```
   - Envolver la aplicación en `_app.tsx`:
     ```tsx
     import '../styles/globals.css';
     import type { AppProps } from 'next/app';
     import { QueryProvider } from '../context/QueryProvider';

     export default function App({ Component, pageProps }: AppProps) {
       return (
         <QueryProvider>
           <Component {...pageProps} />
         </QueryProvider>
       );
     }
     ```

6. **Usar Recharts para gráficos**:
   - Ejemplo de gráfico simple en un componente:
     ```tsx
     import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

     const data = [
       { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
       { name: 'Page B', uv: 300, pv: 2210, amt: 2290 },
     ];

     export const ExampleChart = () => (
       <LineChart width={600} height={300} data={data}>
         <Line type="monotone" dataKey="uv" stroke="#8884d8" />
         <CartesianGrid stroke="#ccc" />
         <XAxis dataKey="name" />
         <YAxis />
         <Tooltip />
       </LineChart>
     );
     ```

7. **Configurar Shadcn**:
   - Instalar y configurar Shadcn según su documentación oficial.
   - Crear un botón estilizado de ejemplo:
     ```tsx
     import { Button } from '@shadcn/ui';

     export const StyledButton = () => (
       <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
         Click Me
       </Button>
     );
     ```

## Cómo levantar el proyecto
1. **Ejecutar el servidor de desarrollo**:
   ```bash
   yarn dev
   ```
   Esto iniciará el servidor en [http://localhost:3000](http://localhost:3000).

2. **Construir para producción**:
   ```bash
   yarn build
   ```
   Esto generará los archivos estáticos optimizados en la carpeta `out`.

3. **Iniciar el servidor de producción**:
   ```bash
   yarn start
   ```

## Conclusión
En este proyecto, se implementaron soluciones modernas para la gestión de estado, visualización de datos y diseño estilizado. El uso de herramientas como **React Query** y **Recharts** garantiza una experiencia de usuario fluida y eficiente, mientras que **Shadcn** y **Tailwind CSS** aseguran una interfaz atractiva y coherente.
