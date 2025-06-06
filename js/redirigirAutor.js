document.addEventListener("DOMContentLoaded", function () {
  const BASE_URL = window.location.hostname === "127.0.0.1" ? "" : "/IkerAguado_ProyectoLGMSI";


  const contacto = document.querySelector(".contacto");

  contacto.addEventListener("click", function(){
    const numeroAutor = this.dataset.articulo;
    location.href = `${BASE_URL}/paginas/autores/autor${numeroAutor}.html`;
});
});