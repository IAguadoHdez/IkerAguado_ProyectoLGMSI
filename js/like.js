document.addEventListener("DOMContentLoaded", () => {
  const corazon = document.getElementById("CLike");
  let liked = false;

  corazon.addEventListener("click", () => {
    if (!liked) {
      corazon.src = "../assets/img/corazon.png"; // ruta del corazón rojo
      liked = true;
    } else {
      corazon.src = "../assets/img/corazonC.png"; // ruta del corazón gris
      liked = false;
    }
  });
});
