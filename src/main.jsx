import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Producto_detalle from './pages/Producto_detalle';
import Ingreso from './pages/Ingreso';
import Registro from './pages/Registro';
import MantenedorUsuarios from './pages/MantenedorUsuarios';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/Producto/:id" element={<Producto_detalle />} />
        <Route path="/Ingreso" element={<Ingreso />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/admin/usuarios" element={<MantenedorUsuarios />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
