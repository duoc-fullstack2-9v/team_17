import React, { useState, useEffect } from 'react';
import * as productoService from '../../services/ProductoService';

function TablaProductos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [formData, setFormData] = useState({
        id: null, nombre: '', descripcion: '', precio: 0, stock: 0, img: '', categoria: 'Otros'
    });

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const data = await productoService.listarProductos();
            setProductos(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar este producto?")) return;
        try {
            await productoService.eliminarProducto(id);
            setProductos(productos.filter(p => p.id !== id));
        } catch (error) {
            alert("Error al eliminar");
        }
    };

    const openAdd = () => {
        setModalMode('add');
        setFormData({ id: null, nombre: '', descripcion: '', precio: 0, stock: 0, img: '', categoria: 'Otros' });
        setIsModalOpen(true);
    };

    const openEdit = (prod) => {
        setModalMode('edit');
        setFormData({ ...prod });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Nota: Aquí asumo que tu backend crea o actualiza según si mandas ID o no.
            // Si tienes un endpoint distinto para actualizar, usa productoService.actualizarProducto(formData)
            await productoService.guardarProducto(formData);
            alert("Producto guardado exitosamente");
            setIsModalOpen(false);
            cargarProductos();
        } catch (error) {
            console.error(error);
            alert("Error al guardar producto");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const filteredProductos = productos.filter(p =>
        p.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* CONTROLES SUPERIORES */}
            <div className="mantenedor-controles">
                <div className="mantenedor-search-bar">
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="mantenedor-botones">
                    <button onClick={openAdd} className="button-ingresar">
                        Agregar Producto
                    </button>
                </div>
            </div>

            {/* TABLA */}
            {loading ? <p>Cargando productos...</p> : (
                <div style={{ overflowX: 'auto' }}>
                    <table className="tabla-mantenedor">
                        <thead>
                            <tr>
                                <th>Img</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Categoría</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProductos.map(p => (
                                <tr key={p.id}>
                                    <td>
                                        <img src={p.img} alt="ico" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                    </td>
                                    <td>{p.nombre}</td>
                                    <td>${p.precio?.toLocaleString('es-CL')}</td>
                                    <td style={{ color: p.stock < 5 ? '#f44336' : '#256d43', fontWeight: 'bold' }}>
                                        {p.stock}
                                    </td>
                                    <td>{p.categoria}</td>
                                    <td className="acciones">
                                        <button onClick={() => openEdit(p)} className="btn-editar">Editar</button>
                                        <button onClick={() => handleDelete(p.id)} className="btn-eliminar">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* MODAL */}
            {isModalOpen && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h2>{modalMode === 'add' ? 'Nuevo Producto' : 'Editar Producto'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="campo">
                                <label>Nombre</label>
                                <input name="nombre" value={formData.nombre} onChange={handleChange} required />
                            </div>
                            <div className="campo">
                                <label>URL Imagen</label>
                                <input name="img" value={formData.img} onChange={handleChange} placeholder="https://..." />
                            </div>

                            <div className="campo-fila">
                                <div className="campo">
                                    <label>Precio</label>
                                    <input type="number" name="precio" value={formData.precio} onChange={handleChange} />
                                </div>
                                <div className="campo">
                                    <label>Stock</label>
                                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="campo">
                                <label>Categoría</label>
                                <select name="categoria" value={formData.categoria} onChange={handleChange}>
                                    <option value="Verduras">Verduras</option>
                                    <option value="Frutas">Frutas</option>
                                    <option value="Especias">Especias</option>
                                    <option value="Snacks">Snacks</option>
                                    <option value="Otros">Otros</option>
                                </select>
                            </div>
                            <div className="campo">
                                <label>Descripción</label>
                                <textarea
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    rows="3"
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                />
                            </div>

                            <div className="modal-botones">
                                <button type="submit" className="button-ingresar">Guardar</button>
                                <button type="button" className="btn-eliminar" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TablaProductos;