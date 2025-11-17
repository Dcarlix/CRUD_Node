//Cuando le demos click al boton crear, relizara la siguiente funcion
document.getElementById("formProducto").addEventListener("submit", async (e) => {
    //cancelamos que se recargue la pagina 
    e.preventDefault();
    //obtenemos el formulario y los valores del formulario
    const formData = new FormData(e.target);
    //obtenemos los datos de los inputs
    const data = Object.fromEntries(formData.entries());
    //hacemos la peticion a la API, con el metodo de POST
    const res = await fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    //le mostramos una alerta y lo regresamos a la pagina principal
    alert("Su producto a sido Creado");
    window.location.href = "../../Index.html"
});