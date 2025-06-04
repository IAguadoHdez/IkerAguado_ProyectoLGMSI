document.addEventListener("DOMContentLoaded", () => {
  const corazon = document.getElementById("CLike");
  const cuentaLikes = document.getElementById("cuantosLikes");
  const usuario = localStorage.getItem("usuarioActual");
  const articulo = document.title;

  const clave = `like-${usuario}-${articulo}`;
  let liked = localStorage.getItem(clave) === "true";

  corazon.src = liked ? "../assets/img/corazon.png" : "../assets/img/corazonC.png";

  actualizarContadorLikes();
  corazon.addEventListener("click", () => {
    if (!usuario){
      console.log("Usuario no logueado")
      alert("Debes iniciar sesión");
      location.href = "login.html";
      return;
    }

    liked = !liked;
    corazon.src = liked ? "../assets/img/corazon.png" : "../assets/img/corazonC.png";
    localStorage.setItem(clave,liked); 
    console.log("Estado like cambiado a:", liked);

    actualizarContadorLikes();
  })

  function actualizarContadorLikes(clave,liked){
    let likestotales = 0;

    for(let i = 0; i < localStorage.length; i++){
      const llave = localStorage.key(i);

      if(llave.startsWith("like-") && llave.endsWith(`-${articulo}`)){
        const valor = localStorage.getItem(llave);
        if(valor === "true"){
          likestotales++;
        }
      }
    }
    cuentaLikes.textContent = likestotales;
  }

  
});
