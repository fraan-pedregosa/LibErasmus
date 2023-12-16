import { defineConfig } from 'vite';
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // eslint-disable-next-line no-undef
        main: resolve(__dirname, 'index.html'),
        // eslint-disable-next-line no-undef
        experiencia: resolve(__dirname, 'experiencia.html'),
      },
      external: [],
    },
  },
  // Configuración para incluir múltiples archivos HTML
  html: {
    minify: false, // Opciones de minificación para los archivos HTML
    inject: {
      injectData: {
        title: 'LibEramus',
      },
    },
    pages: [
      {
        // Página principal
        entry: 'src/main.jsx',
        filename: 'index.html',
        title: 'Home Page',
      },
      {
        // Experiencias HTML
        entry: 'src/experiencia.jsx',
        filename: 'experiencia.html',
        title: 'Experiencia',
      },
      // Puedes agregar más objetos para más páginas
    ],
  },
});
