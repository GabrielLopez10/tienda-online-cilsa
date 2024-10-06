import {
  loadProducts,
  displayProducts,
  generateFilterData,
} from "./products.js";
import { setupFilters, toggleSidebar } from "./filters.js";

class Shop {
  constructor() {
    this.products = [];
    this.filters = [];
  }

  async initialize() {
    try {
      this.products = await loadProducts();

      this.filters = generateFilterData(this.products);
      setupFilters(this.filters, this.applyFilters.bind(this));

      this.setupSidebarToggle();

      console.log("Shop initialized successfully");
    } catch (error) {
      console.error("Error initializing shop:", error);
    }
  }

  applyFilters(selectedFilters) {
    const filteredProducts = this.products.filter((product) =>
      Object.entries(selectedFilters).every(
        ([category, values]) =>
          values.length === 0 ||
          values.includes(product.categories[category].toLowerCase())
      )
    );

    displayProducts(filteredProducts);
  }

  setupSidebarToggle() {
    const sidebarToggle = document.getElementById("sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
        console.log("Toggle button clicked!");
        toggleSidebar();
      });
    } else {
      console.error("Sidebar toggle button not found!");
    }
  }

  getProducts() {
    return this.products;
  }

  getFilters() {
    return this.filters;
  }
}

export const shop = new Shop();

export function initializeShop() {
  return shop.initialize();
}
