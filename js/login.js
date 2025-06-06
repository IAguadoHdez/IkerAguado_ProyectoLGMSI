document.addEventListener("DOMContentLoaded", function () {
  const BASE_URL = window.location.hostname === "127.0.0.1" ? "" : "/IkerAguado_ProyectoLGMSI";
  const loginRegister = document.getElementById("login-register")

if (loginRegister) {
    loginRegister.addEventListener("click", () => {
      location.href = `${BASE_URL}/paginas/signup.html`;
    });
  };

  if (!localStorage.getItem("usuarios")) {
    const usuariosIniciales = [];
    localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
  };


  const formLogin = document.getElementById("form-login");
  const usuarioInput = document.getElementById("usuario-login");
  const passwordInput = document.getElementById("password-login");
  const errorMensaje = document.getElementById("error-login");

  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioBuscado = usuarios.find(
      (u) => u.usuario === usuarioInput.value.trim()
    );

    if (!usuarioBuscado) {
      errorMensaje.textContent = "Usuario no encontrado.";
      return;
    };

    if (usuarioBuscado.password !== passwordInput.value) {
      errorMensaje.textContent = "Contraseña incorrecta.";

      return;
    };

    errorMensaje.textContent = "";

    localStorage.setItem("usuarioActual", usuarioBuscado.usuario);

    location.href = `${BASE_URL}/index.html`;
  });
});
