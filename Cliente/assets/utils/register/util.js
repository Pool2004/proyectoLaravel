document.addEventListener("DOMContentLoaded", function () {

    // Obtener los campos del formulario

    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const correo = document.getElementById("correo");
    const telefono = document.getElementById("telefono");
    const contrasena = document.getElementById("password");

    // Obtener los botones del formulario

    const btnRegister = document.getElementsByClassName("btn btn-success")[0];

    // Event listener para el botón de registro

    btnRegister.addEventListener("click", function(e){
        e.preventDefault();

        const url = "https://proyectolaravel-production-17a3.up.railway.app/api/create/user";

        const data = {
            nombre: nombre.value,
            apellido: apellido.value,
            correo: correo.value,
            telefono: telefono.value,
            contrasena: contrasena.value
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data => {
            if(data.status === 201){
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: 'Usuario registrado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = "../../index.html";

                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message,
                    showConfirmButton: true,
                    confirmButtonText: 'Aceptar'
                });
            }
        }).catch(error => {
            console.error("Error:", error);
        });



    })



});
