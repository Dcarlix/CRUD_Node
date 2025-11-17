// Obtener lista de productos
    async function cargarProductos() {
      try {
        //hacemos una peticion a la API
        let respuesta = await fetch("http://localhost:3000/productos");
        //guardamos la respuesta convertida en un json
        let datos = await respuesta.json();
        //obtenemos el elemento lista de la pagina
        let lista = document.getElementById("lista");
        lista.innerHTML = "";
        //hacemos que por cada objeto en la respuesta realize todo eso
        datos.forEach(producto => {
          let fila = document.createElement("tr");
          //ordenamos todos los datos en una fila para la tabla, agregando los controles a cada uno
          fila.innerHTML = `
          <td>${producto.id}</td>
          <td>${producto.name}</td>
          <td>${producto.description}</td>
          <td>$${producto.price}</td>
          <td>${producto.quantity}</td>
          <td>
            <button class="btn btn-secondary" value="${producto.id}" data-nombre="edit">Editar</button>
            <button class="btn btn-info" value="${producto.id}" data-nombre="info">Ver</button>
            <button class="btn btn-danger" value="${producto.id}" data-nombre="delete">Borrar</button>
          </td>`;
          //agregamos cada registro a la tabla
          lista.appendChild(fila);
        });
        //en caso de error, hacemos que la pagina se este recargando
      } catch (error) {
        console.error("Error cargando productos:", error);
        alert("Error de carga...Refrescando");
        window.location.reload();
      }
    }
//hacemos el llamado a la funcion
cargarProductos();
//por cada boton que haya en la pagina agregamos este evento
document.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
      //hacemos una variable de sesion para compartir el id entre paginas
      sessionStorage.setItem("Id", event.target.value)
      //si el boton es de info, lo lleva al formulario info
      if (event.target.dataset.nombre == "info") {
        window.location.href = "formularios/informacion/Detalles.html"
      }
      //si el boton es de editar, lo lleva al formulario de editar
      else if (event.target.dataset.nombre == "edit") {
        window.location.href = "formularios/modificar/Modificar.html"
      }
      //si el boton es de borrar, lo lleva al formulario de borrar
      else if (event.target.dataset.nombre == "delete") {
        window.location.href = "formularios/eliminar/Borrar.html"
      }
    }
  });

