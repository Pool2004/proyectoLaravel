# proyectoLaravel
Repositorio proyecto laravel - Curso 2025


Autor: Dev Jean
Fecha: 16/05/2025


--- 

Proyecto API REST Con operaciones CRUD para usuarios y productos. Manejo de sesiones, middleware y seguridad.

Arq. Por capas y Cliente - Servidor.

---

Resources

Función mapear views dentro del dashboard de forma dinámica:

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
                            <input type="text" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Descripción</label>
                            <textarea class="form-control" rows="2" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Precio</label>
                            <input type="number" class="form-control" required>
                        </div>
                        <button type="submit" class="btn btn-success w-100">Guardar</button>
                    </form>
                </div>
            </div>
        `,
        verProductos: `
            <div class="text-center">
                <h3 class="mb-4">Listado de Productos</h3>
                <p>Aquí se mostrarán los productos registrados.</p>
                <!-- Aquí puedes renderizar una tabla dinámica -->
            </div>
        `,
        verPorId: `
            <div class="card mx-auto" style="max-width: 400px;">
                <div class="card-body">
                    <h3 class="card-title mb-3">Buscar Producto por ID</h3>
                    <form>
                        <div class="mb-3">
                            <label class="form-label">ID del producto</label>
                            <input type="number" class="form-control" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Buscar</button>
                    </form>
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
                            <input type="number" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nuevo nombre</label>
                            <input type="text" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nueva descripción</label>
                            <textarea class="form-control" rows="2"></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nuevo precio</label>
                            <input type="number" class="form-control">
                        </div>
                        <button type="submit" class="btn btn-warning w-100">Actualizar</button>
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
                            <input type="number" class="form-control" required>
                        </div>
                        <button type="submit" class="btn btn-danger w-100">Borrar</button>
                    </form>
                </div>
            </div>
        `
    };

    ["crearProducto", "verProductos", "verPorId", "actualizarProducto", "borrarProducto"].forEach(id => {
        const link = document.getElementById(id);
        if(link) {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                dashboardContent.innerHTML = views[id];
            });
        }
    });
}
