
document.addEventListener("DOMContentLoaded", function () {
  

  const BASE_URL = window.location.hostname === "127.0.0.1" ? "" : "/IkerAguado_ProyectoLGMSI";
  
  // Obtiene referencias a los elementos del formulario
  const form = document.getElementById("form-register");
  const usuario = document.getElementById("usuario");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  const terminos = document.getElementById("terminos");
  const btnSubmit = form.querySelector('button[type="submit"]');
  const modal = document.getElementById('modalRegistro');
  const btnCerrarModal = document.getElementById('cerrarModal');
  const strengthContainer = document.getElementById("password-strength");

  // Carga los usuarios guardados en localStorage o crea un array si esta vacio
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Array de los errores
  const errores = {
    usuario: usuario?.parentElement.querySelector(".error-message"),
    email: email?.parentElement.querySelector(".error-message"),
    password: password?.parentElement.querySelector(".error-message"),
    confirm: confirmPassword?.parentElement.querySelector(".error-message"),
  };

  // Crea la barra de fuerza de contraseña y la añade al contenedor
  const strengthBar = document.createElement("div");
  strengthBar.style.height = "100%";
  strengthBar.style.width = "0%";
  strengthBar.style.borderRadius = "5px";
  if (strengthContainer) strengthContainer.appendChild(strengthBar);

  // Oculta el modal al cargar la página
  if (modal) modal.classList.add('oculto');

  // Cierra el modal y redirige al login cuando se hace clic en el botón de cerrar
  if (btnCerrarModal) {
    btnCerrarModal.addEventListener('click', function () {
      modal.classList.add('oculto');
      location.href = `${BASE_URL}login.html`;
    });
  }

  // Muestra el modal de registro exitoso
  function mostrarModalRegistro() {
    modal.classList.remove('oculto');
  }

  // Comprueba si un email tiene formato válido
  function validarEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // Calcula la fuerza de la contraseña (de 0 a 4)
  function fuerzaPassword(pass) {
    let fuerza = 0;
    if (pass.length >= 8) fuerza++;
    if (/[A-Z]/.test(pass)) fuerza++;
    if (/[0-9]/.test(pass)) fuerza++;
    if (/[\W]/.test(pass)) fuerza++;
    return fuerza;
  }

  // Actualiza el color y el tamaño de la barra de fuerza según la contraseña
  function actualizarFuerzaPassword() {
    const fuerza = fuerzaPassword(password.value);
    const porcentaje = (fuerza / 4) * 100;
    strengthBar.style.width = porcentaje + "%";

    if (fuerza <= 1) strengthBar.style.backgroundColor = "red";
    else if (fuerza === 2) strengthBar.style.backgroundColor = "orange";
    else if (fuerza === 3) strengthBar.style.backgroundColor = "yellowgreen";
    else strengthBar.style.backgroundColor = "green";
  }

  // Actualiza la barra y valida campos al escribir contraseña
  password.addEventListener("input", function () {  
    actualizarFuerzaPassword();
    validarCamposYActualizarBoton();
  });

  // Evita que se pueda pegar la contraseña
  password.addEventListener("paste", function (e) {
    e.preventDefault();
  });

  // Alternar visibilidad de la contraseña al hacer clic en el icono
  document.querySelectorAll(".toggle-password").forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      const input = toggle.previousElementSibling;
      if (input.type === "password") {
        input.type = "text";
        toggle.textContent = "🙈";
        toggle.title = "Ocultar contraseña";
      } else {
        input.type = "password";
        toggle.textContent = "👀";
        toggle.title = "Mostrar contraseña";
      }
    });
  });

  // Valida todos los campos del formulario y muestra mensajes de error
  function validarCampos() {
    let valido = true;

    // Limpia mensajes de error
    errores.usuario.textContent = "";
    errores.email.textContent = "";
    errores.password.textContent = "";
    errores.confirm.textContent = "";

    if (usuario.value.trim().length <= 4) {
      errores.usuario.textContent = "El usuario debe tener al menos 4 caracteres.";
      valido = false;
    }

    if (!validarEmail(email.value)) {
      errores.email.textContent = "Introduce un correo electrónico válido.";
      valido = false;
    }

    if (password.value.length < 8) {
      errores.password.textContent = "La contraseña debe tener al menos 8 caracteres.";
      valido = false;
    }

    if (confirmPassword.value !== password.value) {
      errores.confirm.textContent = "Las contraseñas no coinciden.";
      valido = false;
    }

    if (!terminos.checked) {
      valido = false;
    }

    return valido;
  }

  // Habilita o deshabilita el botón de enviar según si los campos son válidos
  function validarCamposYActualizarBoton() {
    btnSubmit.disabled = !validarCampos();
  }

  // Añade eventos de validación a los inputs
  function añadirEventos(elem) {
    elem.addEventListener("input", validarCamposYActualizarBoton);
    elem.addEventListener("change", validarCamposYActualizarBoton);
  }

  // Aplica los eventos a los campos del formulario
  [usuario, email, password, confirmPassword, terminos].forEach(añadirEventos);

  // Desactiva el botón de enviar al inicio
  btnSubmit.disabled = true;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validarCampos()) return;

    // Comprueba si el usuario ya está registrado
    if (usuarios.some(u => u.usuario === usuario.value.trim())) {
      errores.usuario.textContent = "Este nombre de usuario ya está registrado.";
      return;
    }

    // Guarda el nuevo usuario en localStorage
    usuarios.push({
      usuario: usuario.value.trim(),
      email: email.value.trim(),
      password: password.value
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Muestra el modal
    mostrarModalRegistro();
  });
});
