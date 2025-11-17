//hacemos la funcion que va a cargar el producto
async function cargarProducto(id) {
    //hacemos la peticion a la API
    const res = await fetch(`http://localhost:3000/productos/${id}`);
    //guardamos el resultado
    const producto = await res.json();
    //Ponemos los datos en el formulario en el formulario
    document.getElementById("Id").value = producto.id;
    document.getElementById("Nombre").value = producto.name;
    document.getElementById("Precio").value = producto.price;
    document.getElementById("Cantidad").value = producto.quantity;
    document.getElementById("Descripcion").value = producto.description;
}
//obtenemos la variable de sesion donde pasamos el id
let Id = sessionStorage.getItem("Id");
//llamamos la funcion y le pasamos ese id
cargarProducto(Id);