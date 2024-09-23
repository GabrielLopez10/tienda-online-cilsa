import { addToCart } from "./cart.js";

export function setupModals() {
  fetch("productosModal.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("#modals-container").innerHTML = data;
      console.log("Modals loaded successfully.");
      setupModalEventListeners();
    })
    .catch((error) => console.error("Error loading modals:", error));

  window.changeImage = (imgElement, imageId) => {
    var mainImage = document.getElementById(imageId);
    mainImage.src = imgElement.src;
  };
}

function setupModalEventListeners() {
  document.querySelectorAll(".shop-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      const productName = button.getAttribute("data-name");
      const productPrice = button.getAttribute("data-price");

      const targetModalSelector = button.getAttribute("data-bs-target");
      const modal = document.querySelector(targetModalSelector);

      if (!modal) {
        console.error(`Modal not found for selector: ${targetModalSelector}`);
        return;
      }

      const quantityInput = modal.querySelector(".input-quantity-selector");
      if (!quantityInput) {
        console.error(
          `Quantity input not found inside modal: ${targetModalSelector}`
        );
        return;
      }
      const quantity = parseInt(quantityInput.value, 10);

      const product = {
        id: productId,
        name: productName,
        price: productPrice,
      };

      addToCart(product, quantity);

      if (quantity > 0) {
        alert(`${productName} (${quantity}) ha sido añadido al carrito!`);
        return;
      }
    });
  });
}
