document.addEventListener('DOMContentLoaded', () => {
const BASE_URL = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost" ? "" : "/IkerAguado_ProyectoLGMSI";

const btn1 = document.querySelector("#art1 button");
const btn2 = document.querySelector("#art2 button");
const btn3 = document.querySelector("#art3 button");
const btn4 = document.querySelector("#art4 button");
const btn5 = document.querySelector("#art5 button");
const btn6 = document.querySelector("#art6 button");

// Botón del artículo 1
if (btn1) {
  btn1.onclick = function() {
    location.href = `${BASE_URL}/paginas/articulo1.html`;
  };
};

// Botón del artículo 2
if (btn2) {
  btn2.onclick = function() {
    location.href = `${BASE_URL}/paginas/articulo2.html`;
  };
};

// Botón del artículo 3
if (btn3) {
  btn3.onclick = function() {
    location.href = `${BASE_URL}/paginas/articulo3.html`;
  };
};

// Botón del artículo 4
if (btn4) {
  btn4.onclick = function() {
    location.href = `${BASE_URL}/paginas/articulo4.html`;
  };
};

// Botón del artículo 5
if (btn5) {
  btn5.onclick = function() {
    location.href = `${BASE_URL}/paginas/articulo5.html`;
  };
};

// Botón del artículo 6
if (btn6) {
  btn6.onclick = function() {
    location.href = `${BASE_URL}/paginas/articulo6.html`;
  };
};

});
