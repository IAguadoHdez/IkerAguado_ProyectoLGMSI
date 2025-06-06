document.addEventListener("DOMContentLoaded", function(){
    const BASE_URL = window.location.hostname === "127.0.0.1" ? "" : "/IkerAguado_ProyectoLGMSI";
  const Tiempo_max_inactivo = 2 * 6 * 1000;
  let temporizador;


  function cerrarSesion(){
    localStorage.removeItem("usuarioActual");
    location.href = `${BASE_URL}/paginas/login.html`;
  }

  function reiniciarTemporizador(){
    clearTimeout(temporizador);
    temporizador = setTimeout(cerrarSesion,Tiempo_max_inactivo);
  }

  

  reiniciarTemporizador();



});