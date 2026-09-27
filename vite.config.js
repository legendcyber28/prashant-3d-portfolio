import { defineConfig } from 'vite';
export default defineConfig({base:'./',build:{rollupOptions:{external:['three','react','react-dom/client'],output:{paths:{three:'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js',react:'https://esm.sh/react@18.3.1', 'react-dom/client':'https://esm.sh/react-dom@18.3.1/client'}}}}});
