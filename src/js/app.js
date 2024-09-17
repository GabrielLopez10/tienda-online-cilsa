document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".nav-item.dropdown .nav-link");
  const offcanvas = document.getElementById("offcanvas");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const mouseScroll = document.querySelector(".mouse_scroll");

  function toggleDropdown() {
    if (window.innerWidth >= 768) {
      dropdown.setAttribute("data-bs-toggle", "dropdown");
      dropdownMenu.classList.remove("d-none");
      dropdown.classList.remove("no-arrow");
    } else {
      dropdown.removeAttribute("data-bs-toggle");
      dropdown.href = "../pages/productos.html";
      dropdownMenu.classList.add("d-none");
      dropdown.classList.add("no-arrow");
    }
  }

  toggleDropdown();
  window.addEventListener("resize", toggleDropdown);
  offcanvas.addEventListener("shown.bs.offcanvas", toggleDropdown);
  offcanvas.addEventListener("hidden.bs.offcanvas", toggleDropdown);

  if (mouseScroll) {
    console.log("Mouse scroll found, adding click event.");
    mouseScroll.addEventListener("click", () => {
      document.getElementById("slide-2").scrollIntoView({
        behavior: "smooth",
      });
    });
  } else {
    console.log("Mouse scroll element not found, skipping mouse scroll setup.");
  }

  // Validacion del formulario
  var form = document.querySelector(".needs-validation");

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault(); // Impide el envio del formulario por defecto

      if (!form.checkValidity()) {
        event.stopPropagation(); // Detiene el envio del formulario si es invalido
      } else {
        // Si el formulario es valido, muestra el modal de confirmacion
        var modal = new bootstrap.Modal(
          document.getElementById("confirmationModal")
        );
        modal.show();
        console.log("Modal found:", modal);

        // Limpiar los campos del formulario despues de mostrar el modal
        form.reset();

        // Elimina las clases de feedback de bootstrap despues del reinicio
        form.classList.remove("was-validated");
      }

      // Añade las clases de feedback de bootstrap por defecto
      form.classList.add("was-validated");
    },
    false
  );

  fetch("../pages/productosModal.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("#modals-container").innerHTML = data;
      console.log("Modals loaded successfully.");
    })
    .catch((error) => console.error("Error loading modals:", error));

  window.changeImage = (imgElement, imageId) => {
    var mainImage = document.getElementById(imageId);
    mainImage.src = imgElement.src;
  };
});
