export function setupDropdown() {
  const dropdown = document.querySelector(".nav-item.dropdown .nav-link");
  const offcanvas = document.getElementById("offcanvas");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  function toggleDropdown() {
    if (window.innerWidth >= 768) {
      dropdown.setAttribute("data-bs-toggle", "dropdown");
      dropdownMenu.classList.remove("d-none");
      dropdown.classList.remove("no-arrow");
    } else {
      dropdown.removeAttribute("data-bs-toggle");
      dropdown.href = "productos.html";
      dropdownMenu.classList.add("d-none");
      dropdown.classList.add("no-arrow");
    }
  }

  toggleDropdown();
  window.addEventListener("resize", toggleDropdown);
  offcanvas.addEventListener("shown.bs.offcanvas", toggleDropdown);
  offcanvas.addEventListener("hidden.bs.offcanvas", toggleDropdown);
}
