import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import initialData from '../data/usuarios.json';
import '../assets/assets_css/mantenedor.css';

function MantenedorUsuarios() {
    const [usuarios, setUsuarios] = useState(initialData);

    const handleAdd = () => {
        const nuevoUsuario = {
            id: usuarios.length + 1,
            nombre: "Nombre",
            apellido: "Apellido",
            email: "nuevo@correo.com",
            rol: "Cliente"
        };
        setUsuarios([...usuarios, nuevoUsuario]);
        alert('Usuario agregado (simulación)');
    };

    const handleDelete = (id) => {
        if (window.confirm(`¿Seguro que quieres eliminar al usuario ${id}?`)) {
            setUsuarios(usuarios.filter(u => u.id !== id));
            alert('Usuario eliminado (simulación)');
        }
    };

    const handleEdit = (id) => {
        alert(`Editar usuario ${id} (simulación)`);
    };

    return (
        <>
            <Nav />
            <main>
                <div className="espaciado"></div>
                <div className="hero" style={{ alignItems: 'flex-start' }}>
                    <div className="hero-contenido" style={{ width: '80%', maxWidth: '1000px' }}>

                        <div className="hero-contenido-techo">
                            <p className="titulo">Mantenedor de Usuarios</p>
                        </div>

                        <button onClick={handleAdd} className="button-ingresar" style={{ marginBottom: '20px' }}>
                            Agregar Nuevo Usuario
                        </button>

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
                                {usuarios.map(usuario => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.apellido}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.rol}</td>
                                        <td className="acciones">
                                            <button onClick={() => handleEdit(usuario.id)} className="btn-editar">Editar</button>
                                            <button onClick={() => handleDelete(usuario.id)} className="btn-eliminar">Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default MantenedorUsuarios;