import { favoritesSystem } from "./modules/favorites.js";
import { setupDropdown } from "./modules/dropdown.js";
import { setupScrollToTop } from "./modules/scrollToTop.js";
import { setupMouseScroll } from "./modules/mouseScroll.js";
import { setupModals } from "./modules/modals.js";
import { setupCart } from "./modules/cart.js";
import { setupCheckout } from "./modules/checkout.js";

document.addEventListener("DOMContentLoaded", () => {
  setupDropdown();
  setupScrollToTop();
  setupMouseScroll();
  setupModals();
  setupCart();
  setupCheckout();
  favoritesSystem();
});
