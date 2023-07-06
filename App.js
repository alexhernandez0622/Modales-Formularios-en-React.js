import React, { useState } from 'react';
import Swal from 'sweetalert2';

const App = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Simulación de una llamada asincrona para enviar los datos del formulario
            await sendData(formData);

            // Inicializar la alerta de SweetAlert2 para mostrar los datos enviados
            Swal.fire({
                title: 'Datos enviados',
                html: `
                <p><strong>Digita tu nombre:</strong>${formData.name}</p>
                <p><strong>Digita tu correo:</strong>${formData.email}</p>
                <p><strong>Ingrese el mensaje:</strong>${formData.message}</p>
                `,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            // Restablecer el formulario
            setFormData({
                name: '',
                email: '',
                message: ''
            });

            //Cerrar el modal
            setShowModal(false);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al enviar los datos',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    //Inicializar la función
    const sendData = (data) => {
        //Simulación de una llamada asíncrona para enviar los datos del formulario
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                //Simulación de un error aleatorio
                const randomError = Math.random() < 0.5;
                if(randomError){
                    reject();
                } else {
                    resolve();
                }
            }, 2000);
        });
    };

    return(
        <div>
            <button onClick={() => setShowModal(true)}>Abrir Modal</button>
            {
                showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setShowModal(false)}>
                                &times;
                            </span>
                            <h2>Formulario de Contacto</h2>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="name">Ingrese nombre:</label>
                                <input type="text" id="name" name="name" value={formData.name}
                                onChange={handleInputChange}/>

                                <label htmlFor="email">Ingrese email:</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange}/>

                                <label htmlFor="message">Ingrese mensaje:</label>
                                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange}></textarea>

                                <button type="submit">Enviar Datos</button>
                            </form>
                        </div>
                    </div>
                )}
        </div>
    );
};


export default App;

