//hacemos la funcion de cargar el usuario
async function cargarProducto(id) {
    //hacemos la peticion a la API
    const res = await fetch(`http://localhost:3000/productos/${id}`);
    //guardamos la respuesta de la peticion
    const producto = await res.json();
    //Ponemos los datos en el formulario
    document.getElementById("Id").value = producto.id;
    document.getElementById("Nombre").value = producto.name;
    document.getElementById("Precio").value = producto.price;
    document.getElementById("Cantidad").value = producto.quantity;
    document.getElementById("Descripcion").value = producto.description;
}
//obtenemos el formulario de la pagina
const form = document.getElementById("formProducto");
//añadimos el evento de submit (darle click a actualizar) al formulario
form.addEventListener("submit", async (e) => {
    //evitamos que se recargue la pagina
    e.preventDefault();
    //obtenemos el id del registro
    const id = document.getElementById("Id").value;
    //pasamos todos los datos actualizados a esta variable
    const data = {
        name: document.getElementById("Nombre").value,
        price: document.getElementById("Precio").value,
        quantity: document.getElementById("Cantidad").value,
        description: document.getElementById("Descripcion").value
    };
    //hacemos la peticion con el metodo PUT y le pasamos los datos en el body
    await fetch(`http://localhost:3000/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    //le mostramos una alerta de actualizacion
    alert("Su producto a sido actualizado");
    //lo redirigimos hacia index
    window.location.href = "../../Index.html"
});
//obtenemos la variable de sesion que posee el id
let Id = sessionStorage.getItem("Id");
//llamamos a la funcion para cargar el registro
cargarProducto(Id);