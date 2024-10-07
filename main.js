import { favoritesSystem } from "./modules/favorites.js";
import { setupDropdown } from "./modules/dropdown.js";
import { setupScrollToTop } from "./modules/scrollToTop.js";
import { setupMouseScroll } from "./modules/mouseScroll.js";
import { setupModals } from "./modules/modals.js";
import { setupCart } from "./modules/cart.js";
import { setupCheckout } from "./modules/checkout.js";
import { setupFormValidation } from "./modules/formValidation.js";
import { initializeShop } from "./modules/shop.js";
import { displayFeaturedProducts } from "./modules/featuredProducts.js";
import { footer } from "./modules/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  setupDropdown();
  setupScrollToTop();
  setupMouseScroll();
  footer();

  if (document.querySelector(".needs-validation")) {
    setupFormValidation();
  }

  if (document.getElementById("cart-items-list")) {
    setupCart();
  }

  if (document.querySelector("#modals-container")) {
    setupModals();
  }

  if (document.getElementById("checkout-button")) {
    setupCheckout();
  }

  if (document.getElementById("favoritesList")) {
    favoritesSystem();
  }

  if (window.location.pathname.includes("productos.html")) {
    initializeShop();
  }

  if (document.getElementById("featured-products")) {
    displayFeaturedProducts();
  }
});
