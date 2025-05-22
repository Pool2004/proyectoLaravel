document.addEventListener("DOMContentLoaded", function () {
  setupDashboardViews();

  const token = localStorage.getItem("token");

  // Obtener los botones

  const btnLogout = document.getElementById("btnLogout");


  function changeName(){
      const user = JSON.parse(sessionStorage.getItem("user"));
      const nombre = document.getElementById("name_user");
      const perfil = document.getElementById("user_perfil");
      if (user) {
        nombre.innerHTML = user.nombre;
        perfil.innerHTML = user.nombre;
      }
  }

  changeName();

  btnLogout.addEventListener("click", function (e) {
    e.preventDefault();

    const url = "https://proyectolaravel-production-ef8b.up.railway.app/api/logout/user";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Logout exitoso",
            text: "Se cerró sesión correctamente",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            localStorage.removeItem("token");
            window.location.href = "../../index.html";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message,
            showConfirmButton: true,
            confirmButtonText: "Aceptar",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});

function setupDashboardViews(idContainer = "dashboardContent") {
  const dashboardContent = document.getElementById(idContainer);
  if (!dashboardContent) return;

  // Vistas HTML para cada opción
  const views = {
    crearProducto: `
            <div class="card mx-auto" style="max-width: 500px;">
                <div class="card-body">
                    <h3 class="card-title mb-3">Crear Producto</h3>
                    <form>
                        <div class="mb-3">
                            <label class="form-label">Nombre del producto</label>
                            <input type="text" class="form-control" required id="nombre">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Descripción</label>
                            <textarea class="form-control" rows="2" required id="descripcion"></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Precio</label>
                            <input type="number" class="form-control" required id="precio">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Stock</label>
                            <input type="number" class="form-control" required id="stock">
                        </div>
                        <button  class="btn btn-success w-100" id="createButton">Guardar</button>
                    </form>
                </div>
            </div>
        `,
    verProductos: `
            <div class="text-center">
                <h3 class="mb-4">Listado de Productos</h3>
                <p>Aquí se mostrarán los productos registrados.</p>
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Stock</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    
                </tbody>
                </table>
            </div>
        `,
    verPorId: `
            <div class="card mx-auto" style="max-width: 400px;">
                <div class="card-body">
                    <h3 class="card-title mb-3">Buscar Producto por ID</h3>
                    <form>
                        <div class="mb-3">
                            <label class="form-label">ID del producto</label>
                            <input type="number" class="form-control" required id="productId">
                        </div>
                        <button class="btn btn-primary w-100" id="findButton">Buscar</button>
                    </form>
                    <div>
                        <h1 id="nombre"></h1>
                        <br>
                        <p id="id"></p>
                        <p id="descripcion"></p>
                        <p id="precio"></p>
                        <p id="stock"></p>
                </div>
                </div>
                
            </div>
        `,
    actualizarProducto: `
            <div class="card mx-auto" style="max-width: 500px;">
                <div class="card-body">
                    <h3 class="card-title mb-3">Actualizar Producto</h3>
                    <form>
                        <div class="mb-3">
                            <label class="form-label">ID del producto</label>
                            <input type="number" class="form-control" required id="productId">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nuevo nombre</label>
                            <input type="text" class="form-control" required id="nombre">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nueva descripción</label>
                            <textarea class="form-control" rows="2" id="descripcion"></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nuevo precio</label>
                            <input type="number" class="form-control" required id="precio"> 
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nuevo stock</label>
                            <input type="number" class="form-control" required id="stock"> 
                        </div>
                        <button  class="btn btn-warning w-100" id="btnUpdate">Actualizar</button>
                    </form>
                </div>
            </div>
        `,
    borrarProducto: `
            <div class="card mx-auto" style="max-width: 400px;">
                <div class="card-body">
                    <h3 class="card-title mb-3">Borrar Producto</h3>
                    <form>
                        <div class="mb-3">
                            <label class="form-label">ID del producto</label>
                            <input type="number" class="form-control" required id="productId">
                        </div>
                        <button  class="btn btn-danger w-100" id="btnDelete">Borrar</button>
                    </form>
                </div>
            </div>
        `,
  };

  [
    "crearProducto",
    "verProductos",
    "verPorId",
    "actualizarProducto",
    "borrarProducto",
  ].forEach((id) => {
    const link = document.getElementById(id);
    if (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        dashboardContent.innerHTML = views[id];

        const token = localStorage.getItem("token");

        if (id == "verPorId") {
          const btnFindProduct = document.getElementById("findButton");

          if (btnFindProduct) {
            // Event listener para los botones

            btnFindProduct.addEventListener("click", function (e) {
              e.preventDefault();
              const productId = parseInt(
                document.getElementById("productId").value
              );

              const url = "https://proyectolaravel-production-ef8b.up.railway.app/api/get/product/" + productId;
              fetch(url, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.status === 200) {
                    Swal.fire({
                      icon: "success",
                      title: "Consulta exitosa",
                      text: data.message,
                      timer: 1500,
                    }).then(() => {
                      document.getElementById("nombre").innerHTML =
                        "Nombre: " + data.data.nombre;
                      document.getElementById("id").innerHTML =
                        "Id: " + data.data.id;
                      document.getElementById("descripcion").innerHTML =
                        "Descripción: " + data.data.descripcion;
                      document.getElementById("precio").innerHTML =
                        "Precio: " + data.data.precio;
                      document.getElementById("stock").innerHTML =
                        "Stock: " + data.data.stock;
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: data.message,
                      showConfirmButton: true,
                      confirmButtonText: "Aceptar",
                    });
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            });
          }
        } else if (id == "verProductos") {
          // Si no existe el elemento, puedes manejarlo aquí

          const url = "https://proyectolaravel-production-ef8b.up.railway.app/api/get/products";
          fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status === 200) {
                Swal.fire({
                  icon: "success",
                  title: "Consulta exitosa",
                  text: data.message,
                  timer: 1500,
                }).then(() => {
                  const tbody = document.getElementById("tbody");

                  data.data.forEach((producto) => {
                    const tr = document.createElement("tr");

                    const tdId = document.createElement("td");
                    const tdNombre = document.createElement("td");
                    const tdDescripcion = document.createElement("td");
                    const tdPrecio = document.createElement("td");
                    const tdStock = document.createElement("td");

                    // Poner valores

                    tdId.innerHTML = producto.id;
                    tdNombre.innerHTML = producto.nombre;
                    tdDescripcion.innerHTML = producto.descripcion;
                    tdPrecio.innerHTML = producto.precio;
                    tdStock.innerHTML = producto.stock;

                    // Agregar los elementos a la fila
                    tr.appendChild(tdId);
                    tr.appendChild(tdNombre);
                    tr.appendChild(tdDescripcion);
                    tr.appendChild(tdPrecio);
                    tr.appendChild(tdStock);
                    // Agregar la fila al tbody
                    tbody.appendChild(tr);
                  });
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: data.message,
                  showConfirmButton: true,
                  confirmButtonText: "Aceptar",
                });
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else if (id == "borrarProducto") {
          const btnDelete = document.getElementById("btnDelete");

          if (btnDelete) {
            // Event listener para los botones

            btnDelete.addEventListener("click", function (e) {
              e.preventDefault();
              const productId = parseInt(
                document.getElementById("productId").value
              );

              const url =
                "https://proyectolaravel-production-ef8b.up.railway.app/api/delete/product/" + productId;
              fetch(url, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.status === 200) {
                    Swal.fire({
                      icon: "success",
                      title: "Eliminación exitosa",
                      text: data.message,
                      timer: 1500,
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: data.message,
                      showConfirmButton: true,
                      confirmButtonText: "Aceptar",
                    });
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            });
          }
        } else if (id == "crearProducto") {
          const btnCreateProduct = document.getElementById("createButton");

          if (btnCreateProduct) {
            // Event listener para los botones

            btnCreateProduct.addEventListener("click", function (e) {
              e.preventDefault();

              const url = "https://proyectolaravel-production-ef8b.up.railway.app/api/create/product";
              fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  nombre: document.getElementById("nombre").value,
                  descripcion: document.getElementById("descripcion").value,
                  precio: document.getElementById("precio").value,
                  stock: document.getElementById("stock").value,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.status === 201) {
                    Swal.fire({
                      icon: "success",
                      title: "Producto Creado",
                      text: data.message,
                      timer: 1500,
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: data.message,
                      showConfirmButton: true,
                      confirmButtonText: "Aceptar",
                    });
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            });
          }
        } else if (id == "actualizarProducto") {
          const btnUpdate = document.getElementById("btnUpdate");

          if (btnUpdate) {
            // Event listener para los botones

            btnUpdate.addEventListener("click", function (e) {
              e.preventDefault();

              const url = "https://proyectolaravel-production-ef8b.up.railway.app/api/update/product";
              fetch(url, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  id: parseInt(document.getElementById("productId").value),
                  nombre: document.getElementById("nombre").value,
                  descripcion: document.getElementById("descripcion").value,
                  precio: document.getElementById("precio").value,
                  stock: document.getElementById("stock").value,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.status === 200) {
                    Swal.fire({
                      icon: "success",
                      title: "Producto Actualizado",
                      text: data.message,
                      timer: 1500,
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: data.message,
                      showConfirmButton: true,
                      confirmButtonText: "Aceptar",
                    });
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            });
          }
        }
      });
    }
  });
}
