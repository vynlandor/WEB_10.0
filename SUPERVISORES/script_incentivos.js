// Función para guardar una imagen en el almacenamiento local
function guardarImagen(event) {
  var input = event.target;
  var files = input.files;
  var currentPage = obtenerNombrePagina(); // Función para obtener el nombre de la página actual

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var reader = new FileReader();
    reader.onload = function (e) {
      var imagen = document.createElement("img");
      imagen.src = e.target.result;
      document.getElementById("contenedorImagenes").appendChild(imagen);
      // Guardar la imagen en el almacenamiento local con una clave única para esta página
      var clave = currentPage + "-imagen-" + Date.now();
      localStorage.setItem(clave, e.target.result);
      // Agregar botón de eliminar para esta imagen
      var botonEliminar = document.createElement("button");
      botonEliminar.innerText = "Eliminar";
      botonEliminar.onclick = (function (imagen, clave) {
        return function () {
          // Eliminar la imagen del contenedor y del almacenamiento local
          document.getElementById("contenedorImagenes").removeChild(imagen);
          localStorage.removeItem(clave);
          // Eliminar el botón de eliminar
          document.getElementById("contenedorImagenes").removeChild(this);
        };
      })(imagen, clave);
      document.getElementById("contenedorImagenes").appendChild(botonEliminar);
    };
    reader.readAsDataURL(file);
  }
}

// Función para obtener el nombre de la página actual
function obtenerNombrePagina() {
  // Obtener la URL de la página actual
  var url = window.location.href;
  // Obtener el nombre de la página a partir de la URL
  var nombrePagina = url.substring(url.lastIndexOf("/") + 1);
  return nombrePagina;
}

// Función para cargar y mostrar las imágenes guardadas en el almacenamiento local al cargar la página
window.onload = function () {
  var contenedorImagenes = document.getElementById("contenedorImagenes");
  var currentPage = obtenerNombrePagina(); // Obtener el nombre de la página actual

  // Iterar sobre las claves del almacenamiento local
  for (var clave in localStorage) {
    if (
      localStorage.hasOwnProperty(clave) &&
      clave.startsWith(currentPage + "-imagen-")
    ) {
      var imagen = document.createElement("img");
      imagen.src = localStorage.getItem(clave);
      contenedorImagenes.appendChild(imagen);
      // Agregar botón de eliminar para cada imagen
      var botonEliminar = document.createElement("button");
      botonEliminar.innerText = "Eliminar";
      botonEliminar.onclick = (function (imagen, clave) {
        return function () {
          // Eliminar la imagen del contenedor y del almacenamiento local
          contenedorImagenes.removeChild(imagen);
          localStorage.removeItem(clave);
          // Eliminar el botón de eliminar
          contenedorImagenes.removeChild(this);
        };
      })(imagen, clave);
      contenedorImagenes.appendChild(botonEliminar);
    }
  }
};
