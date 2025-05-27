document.addEventListener('DOMContentLoaded', () => {
  const BASE_URL = window.location.hostname === "127.0.0.1" ? "" :"/IkerAguado_ProyectoLGMSI";

  const btnMenu = document.querySelector("#btn-menu");
  const navHeader = document.querySelector("#nav-header");
  const btnClose = document.querySelector("#btn-close");
  const btnLogin = document.querySelector("#Login");
  const btnSignup = document.querySelector("#Signup");
  const inicio = document.querySelector("#inicio");
  const logoInicio = document.querySelector('img[alt="Logo"]');
  const aboutUsLink = document.querySelector("#about-us-link");
  const currentPage = window.location.pathname.split("/").pop(); // Página actual

  // Menú hamburguesa
  btnMenu.addEventListener("click", () => {
    navHeader.classList.add("nav-visible");
    navHeader.classList.remove("btn-menu");
  });

  btnClose.addEventListener("click", () => {
    navHeader.classList.remove("nav-visible");
    navHeader.classList.add("btn-menu");
  });

  if (logoInicio) {
    logoInicio.addEventListener("click", () => {
      if (currentPage === "index.html" || currentPage === "") {
        location.reload();
      } else {
        location.href = `${BASE_URL}/index.html`;
      }
    });
  }

  if (inicio) {
    inicio.addEventListener("click", () => {
      location.href = `${BASE_URL}/index.html`;
    });
  }

  if (aboutUsLink) {
    aboutUsLink.addEventListener("click", () => {
      location.href = `${BASE_URL}/paginas/aboutme.html`;
    });
  }

  if (btnLogin) {
    btnLogin.addEventListener("click", () => {
      location.href = `${BASE_URL}/paginas/login.html`;
    });
  }

  if (btnSignup) {
    btnSignup.addEventListener("click", () => {
      location.href = `${BASE_URL}/paginas/signup.html`;
    });
  }

  // Ocultar botones según la página
  if (currentPage === "login.html") {
    if (btnLogin) btnLogin.style.display = "none";
    if (btnSignup) btnSignup.onclick = () => location.href = `${BASE_URL}/paginas/signup.html`;
  }

  if (currentPage === "signup.html") {
    if (btnSignup) btnSignup.style.display = "none";
  }

  // -- Parte del usuario logueado --
  const usuarioActual = localStorage.getItem("usuarioActual");

  if (usuarioActual) {
    if (btnLogin) btnLogin.style.display = "none";
    if (btnSignup) btnSignup.style.display = "none";

    if (!document.getElementById("user-menu")) {
      const userDiv = document.createElement("div");
      userDiv.id = "user-menu";
      userDiv.style.display = "flex";
      userDiv.style.alignItems = "center";
      userDiv.style.justifyContent = "center";
      userDiv.style.gap = "5px";
      userDiv.style.marginTop = "10px";
      userDiv.style.padding = "5px";

      const userNameSpan = document.createElement("span");
      userNameSpan.textContent = usuarioActual;
      userNameSpan.style.color = "var(--accent)";
      userNameSpan.style.fontWeight = "bold";

      const logoutImg = document.createElement("img");
      logoutImg.src = `${BASE_URL}/assets/img/cerrar-sesion.png`;
      logoutImg.alt = "Cerrar sesión";
      logoutImg.title = "Cerrar sesión";
      logoutImg.style.cursor = "pointer";
      logoutImg.style.width = "24px";
      logoutImg.style.height = "24px";

      logoutImg.addEventListener("click", function () {
        localStorage.removeItem("usuarioActual");
        location.reload();
      });

      userDiv.appendChild(userNameSpan);
      userDiv.appendChild(logoutImg);

      if (navHeader) {
        navHeader.appendChild(userDiv);
      }
    }
  }
});
