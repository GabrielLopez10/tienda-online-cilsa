export function setupFormValidation() {
  // Validacion del formulario
  var form = document.querySelector(".needs-validation");

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault(); // Impide el envio del formulario por defecto

      const submitButton = event.submitter;
      if (
        submitButton.classList.contains("btn-primary") &&
        submitButton.textContent.trim() === "Enviar"
      ) {
        if (!form.checkValidity()) {
          event.stopPropagation(); // Detiene el envio del formulario si es invalido
        } else {
          // Si el formulario es valido, muestra el modal de confirmacion
          var modal = new bootstrap.Modal(
            document.getElementById("confirmationModal")
          );
          modal.show();

          document.getElementById("confirmSubmit").addEventListener("click", () => {
            form.submit();
          });

          modal._element.addEventListener('hidden.bs.modal', () => {
              // Limpiar los campos del formulario despues de mostrar el modal
        form.reset();

        // Elimina las clases de feedback de bootstrap despues del reinicio
        form.classList.remove("was-validated");
          })
        }

      
      }

      // Añade las clases de feedback de bootstrap por defecto
      form.classList.add("was-validated");
    },
    false
  );
}
