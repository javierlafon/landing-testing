/* ==========================================================================
   DGGEI — Interacciones del sitio
   ========================================================================== */

(function () {
  "use strict";

  // Pegá acá la URL de tu aplicación web de Apps Script (termina en /exec).
  var CONTACT_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbzVoPxhJqw1M3M0BSczTmgvHRUOXs83H2VxJu-PoXhLSgHqfHEurNIGlQpSdEPrXXHH/exec";

  /* Menú móvil ------------------------------------------------------------ */
  function initMobileMenu() {
    var button = document.querySelector(".mobile-menu-button");
    var panel = document.getElementById("mobile-nav");

    if (!button || !panel) {
      return;
    }

    var menuIcon = button.querySelector(".menu-icon");
    var closeIcon = button.querySelector(".close-icon");
    var desktopQuery = window.matchMedia("(min-width: 768px)");

    function isOpen() {
      return !panel.classList.contains("hidden");
    }

    function setOpen(open, restoreFocus) {
      panel.classList.toggle("hidden", !open);

      if (menuIcon) {
        menuIcon.classList.toggle("hidden", open);
      }
      if (closeIcon) {
        closeIcon.classList.toggle("hidden", !open);
      }

      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");

      if (open) {
        var firstLink = panel.querySelector("a");
        if (firstLink) {
          firstLink.focus({ preventScroll: true });
        }
      } else if (restoreFocus) {
        button.focus();
      }
    }

    // Sincroniza el estado inicial con el marcado.
    setOpen(isOpen(), false);

    button.addEventListener("click", function () {
      setOpen(!isOpen(), false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false, true);
      }
    });

    panel.addEventListener("click", function (event) {
      if (event.target instanceof Element && event.target.closest("a")) {
        setOpen(false, false);
      }
    });

    desktopQuery.addEventListener("change", function (event) {
      if (event.matches) {
        setOpen(false, false);
      }
    });
  }

  /* Formulario de contacto ------------------------------------------------- */
  var SUCCESS_TEXT =
    "¡Gracias por tu mensaje! Te responderemos a la brevedad.";
  var ERROR_TEXT =
    "No pudimos enviar el mensaje. Intenta nuevamente o escríbenos a ";
  var FALLBACK_EMAIL = "gestiondelainformacion.msp@gmail.com";

  function showSuccess(element) {
    element.textContent = SUCCESS_TEXT;
    element.classList.remove("hidden");
    element.scrollIntoView({ block: "nearest" });
  }

  function showError(element) {
    element.textContent = ERROR_TEXT;
    var link = document.createElement("a");
    link.href = "mailto:" + FALLBACK_EMAIL;
    link.textContent = FALLBACK_EMAIL;
    element.appendChild(link);
    element.appendChild(document.createTextNode("."));
    element.classList.remove("hidden");
    element.scrollIntoView({ block: "nearest" });
  }

  function initContactForm() {
    var form = document.getElementById("contact-form");
    var successMessage = document.getElementById("form-success-message");
    var errorMessage = document.getElementById("form-error-message");
    var submitButton = document.getElementById("submit-button");

    if (!form || !successMessage || !errorMessage || !submitButton) {
      return;
    }

    if (CONTACT_ENDPOINT.indexOf("PEGAR_TU_URL_AQUI") !== -1) {
      console.warn(
        "Configurá CONTACT_ENDPOINT en script.js con la URL /exec de Apps Script."
      );
    }

    var idleLabel = submitButton.textContent.trim();

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      successMessage.classList.add("hidden");
      errorMessage.classList.add("hidden");

      if (!form.reportValidity()) {
        return;
      }

      submitButton.disabled = true;
      submitButton.setAttribute("aria-busy", "true");
      submitButton.textContent = "Enviando…";

      try {
        // Apps Script no expone cabeceras CORS, así que el envío va en modo
        // "no-cors": el navegador no puede leer la respuesta, pero el POST
        // llega igual y la fila se guarda en el Sheet.
        await fetch(CONTACT_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          body: new FormData(form),
        });

        form.reset();
        showSuccess(successMessage);
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        showError(errorMessage);
      } finally {
        submitButton.disabled = false;
        submitButton.removeAttribute("aria-busy");
        submitButton.textContent = idleLabel;
      }
    });

    form.addEventListener("input", function () {
      errorMessage.classList.add("hidden");
    });
  }

  /* Año actual en el pie --------------------------------------------------- */
  function initCurrentYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll("#current-year").forEach(function (element) {
      element.textContent = year;
    });
  }

  function init() {
    initMobileMenu();
    initContactForm();
    initCurrentYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
