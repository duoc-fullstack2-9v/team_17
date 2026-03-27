import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Producto_detalle from './pages/Producto_detalle';
import Ingreso from './pages/Ingreso';
import Registro from './pages/Registro';
import Mantenedor from './pages/Mantenedor';
import Carrito from './pages/Carrito';
import Historial from './pages/Historial';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import Contacto from './pages/Contacto';

import './assets/assets_css/main.css';

const RutaProtegida = ({ children, requireAdmin = false }) => {
  const { currentUser, userRole, loading } = useAuth();

  // Mientras carga la info del usuario, se muestra algo simple o nada
  if (loading) return <div className="cargando">Cargando...</div>;

  //  Si no hay usuario logueado -> Mandar al Login
  if (!currentUser) {
    return <Navigate to="/Ingreso" replace />;
  }

  //  Si la ruta requiere Admin y el usuario NO es admin -> Mandar al Home
  if (requireAdmin && userRole?.toLowerCase() !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Si pasa las validaciones -> Mostrar la página solicitada (children)
  return children;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* RUTAS PÚBLICAS */}
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Productos" element={<Productos />} />
          <Route path="/Producto/:id" element={<Producto_detalle />} />
          <Route path="/Nosotros" element={<Nosotros />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/Ingreso" element={<Ingreso />} />
          <Route path="/Registro" element={<Registro />} />

          {/*  RUTAS DE CLIENTE  */}
          {/* Si intentan entrar sin sesión, van al Login */}
          <Route
            path="/Carrito"
            element={
              <RutaProtegida>
                <Carrito />
              </RutaProtegida>
            }
          />
          <Route
            path="/Historial"
            element={
              <RutaProtegida>
                <Historial />
              </RutaProtegida>
            }
          />

          {/*  RUTAS DE ADMIN  */}
          {/* Si un cliente normal intenta entrar, lo manda al Home */}
          <Route
            path="/Mantenedor"
            element={
              <RutaProtegida requireAdmin={true}>
                <Mantenedor />
              </RutaProtegida>
            }
          />

          {/* Ruta para cualquier URL no existente -> Home */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);