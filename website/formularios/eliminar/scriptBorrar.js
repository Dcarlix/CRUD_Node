// obtenemos el elemento del formulario
const form = document.getElementById("formProducto");
//realizamos la siguiente funcion para cargar un producto
async function cargarProducto(id) {
    //hacemos la peticion a la API, pasandole el id para usar esa ruta
    const res = await fetch(`http://localhost:3000/productos/${id}`);
    //guardamos la respuesta como un JSON
    const producto = await res.json();
    // Ponemos los valores en el formulario
    document.getElementById("Id").value = producto.id;
    document.getElementById("Nombre").value = producto.name;
    document.getElementById("Precio").value = producto.price;
    document.getElementById("Cantidad").value = producto.quantity;
    document.getElementById("Descripcion").value = producto.description;
};
// Cuando el usuario le de click al boton de borrar, hara esto
form.addEventListener("submit", async (e) => {
    //detiene que la pagina se recargue ella sola
    e.preventDefault();
    //obtenemos el id nuevamente
    const id = document.getElementById("Id").value;
    //hacemos la peticion a la API con el metodo DELETE
    await fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE"
    });
    // Le mostramos al usuario un mensaje de que se borro 
    alert("Su producto a sido elminado");
    // lo redirigimos hacia index
    window.location.href = "../../Index.html"
});
//obtenemos la variable de sesion que se nos paso
let Id = sessionStorage.getItem("Id");
// llamamos al metodo de cargar el producto
cargarProducto(Id);