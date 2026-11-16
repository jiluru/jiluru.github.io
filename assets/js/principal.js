/* JILURU - JavaScript mínimo. La web funciona igual sin él (salvo el botón de tema). */
(function () {
  "use strict";
  var raiz = document.documentElement;

  // 1) Botón de modo claro / oscuro.
  //    La preferencia se guarda solo en este navegador (localStorage); no es una cookie
  //    y nunca sale del dispositivo.
  function temaActual() {
    var elegido = raiz.getAttribute("data-tema");
    if (elegido) return elegido;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "oscuro" : "claro";
  }
  var boton = document.querySelector(".boton-tema");
  if (boton) {
    var actualizar = function () {
      var t = temaActual();
      boton.setAttribute("aria-pressed", t === "oscuro" ? "true" : "false");
      boton.setAttribute("title", t === "oscuro" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    };
    boton.addEventListener("click", function () {
      var nuevo = temaActual() === "oscuro" ? "claro" : "oscuro";
      raiz.setAttribute("data-tema", nuevo);
      try { localStorage.setItem("jiluru-tema", nuevo); } catch (e) {}
      actualizar();
    });
    actualizar();
  }

  // 2) Año actual en el pie.
  var anio = document.querySelectorAll("[data-anio]");
  for (var i = 0; i < anio.length; i++) anio[i].textContent = new Date().getFullYear();

  // 3) Al abrir la web desde el disco (doble clic en index.html), los enlaces del tipo
  //    "privacidad/" abrirían una carpeta. Aquí se completan con "index.html".
  //    En GitHub Pages no hace nada y las direcciones quedan limpias (/privacidad/).
  if (location.protocol === "file:") {
    var enlaces = document.querySelectorAll("a[href]");
    for (var j = 0; j < enlaces.length; j++) {
      var h = enlaces[j].getAttribute("href");
      if (/^(https?:|mailto:|tel:|#)/.test(h)) continue;
      var partes = h.split("#");
      if (partes[0] === "" ) continue;
      if (/\/$/.test(partes[0]) || partes[0] === "." || partes[0] === "..") {
        partes[0] = partes[0].replace(/\/?$/, "/") + "index.html";
        enlaces[j].setAttribute("href", partes.join("#"));
      }
    }
  }
})();
