import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import initialData from '../data/usuarios.json';
import '../assets/assets_css/mantenedor.css';
import '../assets/assets_css/autenticacion.css';

function MantenedorUsuarios() {
    const [usuarios, setUsuarios] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        rol: 'Cliente'
    });
    const [modalMode, setModalMode] = useState('add');
    const [editingUserId, setEditingUserId] = useState(null);

    const handleAddPredefined = () => {
        const nuevoUsuario = {
            id: usuarios.length + 1,
            nombre: "Nombre",
            apellido: "Apellido",
            email: "nuevo@correo.com",
            rol: "Cliente"
        };
        setUsuarios([...usuarios, nuevoUsuario]);
    };

    const handleDelete = (id) => {
        if (window.confirm(`¿Seguro que quieres eliminar al usuario ${id}?`)) {
            setUsuarios(usuarios.filter(u => u.id !== id));
            alert('Usuario eliminado');
        }
    };

    const openAddModal = () => {
        setModalMode('add');
        setFormData({ nombre: '', apellido: '', email: '', rol: 'Cliente' });
        setEditingUserId(null);
        setIsModalOpen(true);
    };

    const openEditModal = (id) => {
        const userToEdit = usuarios.find(u => u.id === id);
        if (userToEdit) {
            setModalMode('edit');
            setFormData({ ...userToEdit });
            setEditingUserId(id);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUserId(null);
        setFormData({ nombre: '', apellido: '', email: '', rol: 'Cliente' });
    };

    const handleModalInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleModalSubmit = (e) => {
        e.preventDefault();

        if (modalMode === 'add') {
            const finalUser = {
                ...formData,
                id: usuarios.length + 1
            };
            setUsuarios([...usuarios, finalUser]);
            alert('Nuevo usuario agregado');

        } else if (modalMode === 'edit') {
            setUsuarios(usuarios.map(user =>
                user.id === editingUserId
                    ? { ...user, ...formData }
                    : user
            ));
            alert('Usuario actualizado');
        }

        closeModal();
    };


    const filteredUsuarios = usuarios.filter(u =>
        u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.apellido.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Nav />
            <main>
                <div className="espaciado"></div>
                <div className="hero-auth">
                    <div className="hero-auth-contenido" style={{ width: '80%', maxWidth: '1000px' }}>
                        <div className="hero-auth-contenido-techo">
                            <p className="titulo">Mantenedor de Usuarios</p>
                        </div>

                        <div className="mantenedor-controles">
                            <div className="mantenedor-search-bar">
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre, apellido o email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="mantenedor-botones">
                                <button onClick={handleAddPredefined} className="button-ingresar" >
                                    Agregar Predefinido
                                </button>
                                <button onClick={openAddModal} className="button-ingresar">
                                    Agregar Nuevo Usuario
                                </button>
                            </div>
                        </div>

                        <table className="tabla-mantenedor">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsuarios.map(usuario => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.apellido}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.rol}</td>
                                        <td className="acciones">
                                            <button onClick={() => openEditModal(usuario.id)} className="btn-editar">Editar</button>
                                            <button onClick={() => handleDelete(usuario.id)} className="btn-eliminar">Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h2>{modalMode === 'add' ? 'Agregar Nuevo Usuario' : 'Editar Usuario'}</h2>

                        <form onSubmit={handleModalSubmit}>
                            <div className="campo">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleModalInputChange}
                                    required
                                />
                            </div>
                            <div className="campo">
                                <label htmlFor="apellido">Apellido</label>
                                <input
                                    type="text"
                                    id="apellido"
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleModalInputChange}
                                    required
                                />
                            </div>
                            <div className="campo">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleModalInputChange}
                                    required
                                />
                            </div>
                            <div className="campo">
                                <label htmlFor="rol">Rol</label>
                                <select
                                    id="rol"
                                    name="rol"
                                    value={formData.rol}
                                    onChange={handleModalInputChange}
                                >
                                    <option value="Cliente">Cliente</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            <div className="modal-botones">
                                <button type="submit" className="button-ingresar">Guardar</button>
                                <button type="button" className="btn-eliminar" onClick={closeModal}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}

export default MantenedorUsuarios;