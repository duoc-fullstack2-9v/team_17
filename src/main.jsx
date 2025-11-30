import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. IMPORTANTE: Importamos el AuthProvider
import { AuthProvider } from './context/AuthContext.jsx';

import Home from './pages/Home';
import Productos from './pages/Productos';
import Producto_detalle from './pages/Producto_detalle';
import Ingreso from './pages/Ingreso';
import Registro from './pages/Registro';
import Mantenedor from './pages/Mantenedor';
import Carrito from './pages/Carrito';
import Historial from './pages/Historial';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* 2. IMPORTANTE: Envolvemos todas las rutas con el AuthProvider */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Productos" element={<Productos />} />
          <Route path="/Producto/:id" element={<Producto_detalle />} />
          <Route path="/Ingreso" element={<Ingreso />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/Carrito" element={<Carrito />} />
          <Route path="/Historial" element={<Historial />} />
          <Route path="/Mantenedor" element={<Mantenedor />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)