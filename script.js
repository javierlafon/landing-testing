// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileNav = document.querySelector(".mobile-nav");
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".close-icon");

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", function () {
      mobileNav.classList.toggle("hidden");
      menuIcon.classList.toggle("hidden");
      closeIcon.classList.toggle("hidden");
    });
  }

  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  const formSuccessMessage = document.getElementById("form-success-message");
  const submitButton = document.getElementById("submit-button");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Disable submit button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";

      // Simulate form submission with a delay
      setTimeout(function () {
        // Reset form
        contactForm.reset();

        // Show success message
        formSuccessMessage.classList.remove("hidden");

        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = "Enviar mensaje";

        // Hide success message after 5 seconds
        setTimeout(function () {
          formSuccessMessage.classList.add("hidden");
        }, 5000);
      }, 1000);
    });
  }

  // Set current year in footer
  const currentYearElements = document.querySelectorAll("#current-year");
  const currentYear = new Date().getFullYear();

  currentYearElements.forEach(function (element) {
    element.textContent = currentYear;
  });
});

//google app script

function sendForm(event) {
  event.preventDefault(); // Evita el envío tradicional del formulario

  var form = document.getElementById("contact-form");
  var formData = new FormData(form);

  // URL de tu Web App en Google Apps Script
  var url =
    "https://script.google.com/macros/s/AKfycbw12hSajd-imLVijEu-l1fLK8mypumHxOsEANsJrNAvJ2dv1wogmB8joEcoNsBNuuhcnA/exec"; // Reemplaza con tu URL real

  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "SUCCESS") {
        alert("¡Mensaje enviado correctamente!");
        form.reset(); // Limpia el formulario después del envío
      } else {
        alert("Hubo un error al enviar el mensaje.");
        console.error(data.message);
      }
    })
    .catch((error) => {
      alert("Error al conectar con el servidor.");
      console.error("Error:", error);
    });
}

// File upload preview
document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("document-file");
  const fileNameDisplay = document.getElementById("file-name");

  if (fileInput && fileNameDisplay) {
    fileInput.addEventListener("change", function () {
      if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        const fileSize = (fileInput.files[0].size / 1024 / 1024).toFixed(2); // Convert to MB
        fileNameDisplay.textContent = `${fileName} (${fileSize} MB)`;
      } else {
        fileNameDisplay.textContent = "Ningún archivo seleccionado";
      }
    });
  }

  // Document upload form
  const uploadDocumentForm = document.getElementById("upload-document-form");
  if (uploadDocumentForm) {
    uploadDocumentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulate form submission
      const submitButton = uploadDocumentForm.querySelector(
        'button[type="submit"]'
      );
      submitButton.disabled = true;
      submitButton.textContent = "Subiendo...";

      setTimeout(function () {
        // Reset form
        uploadDocumentForm.reset();
        fileNameDisplay.textContent = "Ningún archivo seleccionado";

        // Show success message
        alert("Documento subido correctamente");

        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = "Subir documento";
      }, 2000);
    });
  }

  // Add dashboard form
  const addDashboardForm = document.getElementById("add-dashboard-form");
  if (addDashboardForm) {
    addDashboardForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulate form submission
      const submitButton = addDashboardForm.querySelector(
        'button[type="submit"]'
      );
      submitButton.disabled = true;
      submitButton.textContent = "Agregando...";

      setTimeout(function () {
        // Reset form
        addDashboardForm.reset();

        // Show success message
        alert("Tablero agregado correctamente");

        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = "Agregar tablero";
      }, 2000);
    });
  }

  // Dashboard view buttons
  const dashboardViewButtons = document.querySelectorAll(".dashboard-view-btn");
  dashboardViewButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      alert(
        "Esta funcionalidad abriría el tablero de Power BI en una nueva ventana o en pantalla completa."
      );
    });
  });
});
