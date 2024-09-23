import { renderCartSummary } from "./cart.js";
import { updateCartCount } from "./cart.js";

export function setupCheckout() {
    document.getElementById("checkout-button").addEventListener("click", handleCheckout);
    document.getElementById("typeText").addEventListener("input", (e) => formatCreditCardNumber(e.target));
    document.getElementById("typeExp").addEventListener("input", (e) => formatExpirationDate(e.target));
    document.getElementById("confirm-checkout").addEventListener("click", confirmCheckout);
    document.getElementById("cerrar-modal").addEventListener("click", closeCheckoutModal);
  }
  
  function handleCheckout() {
    renderCartSummary();
    const checkoutModal = new bootstrap.Modal(document.getElementById("checkoutModal"));
    checkoutModal.show();
  }
  
  function formatCreditCardNumber(input) {
    let value = input.value.replace(/\D/g, "");
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    value = value.slice(0, 19);
    input.value = value;
  }
  
  function formatExpirationDate(input) {
    let value = input.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,4})/, "$1/$2");
    }
    value = value.slice(0, 7);
    input.value = value;
  }
  
  function validateForm() {
    const name = document.getElementById("typeName").value;
    const cardNumber = document.getElementById("typeText").value;
    const expDate = document.getElementById("typeExp").value;
    const cvv = document.getElementById("typeCvv").value;
    let isValid = true;
  
    clearErrorMessage();
  
    if (!name || !cardNumber || !expDate || !cvv) {
      displayErrorMessage("general-error", "Por favor, complete todos los campos de pago.");
      isValid = false;
    }
  
    if (!/^[a-zA-Z\u00C0-\u017F\s]+$/.test(name)) {
      displayErrorMessage("name-error", "El nombre solo puede contener letras y espacios.");
      isValid = false;
    }
  
    if (cardNumber.length !== 19 || !/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber)) {
      displayErrorMessage("card-error", "Número de tarjeta inválido. Debe tener formato XXXX XXXX XXXX XXXX");
      isValid = false;
    }
  
    if (!/^\d{2}\/\d{4}$/.test(expDate)) {
      displayErrorMessage("exp-error", "Fecha de vencimiento inválida. Debe tener formato MM/YYYY");
      isValid = false;
    }
  
    if (cvv.length !== 3 || !/^\d{3}$/.test(cvv)) {
      displayErrorMessage("cvv-error", "CVV inválido. Debe ser un número de 3 digitos");
      isValid = false;
    }
  
    return isValid;
  }
  
  function displayErrorMessage(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
  }
  
  function clearErrorMessage() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element) => {
      element.textContent = "";
      element.style.display = "none";
    });
  }
  
  function confirmCheckout() {
    if (validateForm()) {
      alert("Gracias por tu compra");
      localStorage.removeItem("cart");
      updateCartCount();
      renderCartSummary();
      closeCheckoutModal();
    }
  }
  
  function closeCheckoutModal() {
    const checkoutModal = bootstrap.Modal.getInstance(document.getElementById("checkoutModal"));
    checkoutModal.hide();
    renderCartSummary();
  }