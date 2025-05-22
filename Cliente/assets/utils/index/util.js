document.addEventListener("DOMContentLoaded", function () {

    // Obtener los campos del formulario

    const correo = document.getElementById("email");
    const contrasena = document.getElementById("password");

    // Obtener los botones del formulario

    const btnLogin = document.getElementsByClassName("btn btn-primary")[0];

    // Event listener para el botón de registro

    btnLogin.addEventListener("click", function(e){
        e.preventDefault();

        const url = "https://proyectolaravel-production-2e47.up.railway.app/api/login/user";

        const data = {
            correo: correo.value,
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
            if(data.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Login exitoso',
                    text: 'Usuario logueado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    localStorage.setItem("token", data.token);
                    sessionStorage.setItem("user", JSON.stringify(data.user));
                    sessionStorage.setItem("id", data.user_id);
                    window.location.href = "./views/dashboard/dashboard.html";
                    
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
