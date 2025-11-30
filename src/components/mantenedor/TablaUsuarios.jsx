import React, { useState, useEffect } from 'react';
import * as usuarioService from '../../services/UsuarioService';

function TablaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('edit');
    const [formData, setFormData] = useState({
        uid: '', nombre: '', apellido: '', email: '', rol: 'usuario'
    });

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const data = await usuarioService.listarUsuarios();
            setUsuarios(data);
        } catch (error) {
            console.error("Error cargando usuarios", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (uid) => {
        if (window.confirm('¿Eliminar este usuario permanentemente?')) {
            try {
                await usuarioService.eliminarUsuario(uid);
                setUsuarios(usuarios.filter(u => u.uid !== uid));
            } catch (error) {
                alert('Error al eliminar usuario.');
            }
        }
    };

    const openEditModal = (usuario) => {
        setModalMode('edit');
        setFormData({ ...usuario });
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        try {
            // Actualizamos en BD
            await usuarioService.actualizarUsuario(formData.uid, formData);
            alert('Usuario actualizado.');
            setIsModalOpen(false);
            cargarUsuarios();
        } catch (error) {
            alert('Error al guardar.');
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const filteredUsuarios = usuarios.filter(u =>
        u.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* BARRA DE BÚSQUEDA */}
            <div className="mantenedor-controles">
                <div className="mantenedor-search-bar">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* TABLA */}
            {loading ? <p>Cargando usuarios...</p> : (
                <div style={{ overflowX: 'auto' }}>
                    <table className="tabla-mantenedor">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsuarios.map(u => (
                                <tr key={u.uid || u.id}>
                                    <td>{u.nombre}</td>
                                    <td>{u.apellido}</td>
                                    <td>{u.email}</td>
                                    <td>{u.rol}</td>
                                    <td className="acciones">
                                        <button onClick={() => openEditModal(u)} className="btn-editar">Editar</button>
                                        <button onClick={() => handleDelete(u.uid)} className="btn-eliminar">Eliminar</button>
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
                        <h2>Editar Usuario</h2>
                        <form onSubmit={handleModalSubmit}>
                            <div className="campo">
                                <label>Nombre</label>
                                <input name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                            </div>
                            <div className="campo">
                                <label>Apellido</label>
                                <input name="apellido" value={formData.apellido} onChange={handleInputChange} />
                            </div>
                            <div className="campo">
                                <label>Email</label>
                                <input name="email" value={formData.email} readOnly style={{ backgroundColor: '#f0f0f0' }} />
                            </div>
                            <div className="campo">
                                <label>Rol</label>
                                <select name="rol" value={formData.rol} onChange={handleInputChange}>
                                    <option value="usuario">Usuario</option>
                                    <option value="admin">Admin</option>
                                </select>
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

export default TablaUsuarios;