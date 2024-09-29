function setupFilters() {
  fetch("data/filters.json")
    .then((response) => response.json())
    .then((data) => {
      const filterContainer = document.getElementById("filter-container");
      filterContainer.innerHTML = "";

      data.categories.forEach((category) => {
        const filterSection = document.createElement("div");
        filterSection.classList.add("filter-section");

        const filterTitle = document.createElement("h6");
        filterTitle.textContent = category.title;
        filterSection.appendChild(filterTitle);

        category.options.forEach((option) => {
          const filterOption = document.createElement("div");
          filterOption.classList.add("form-check");

          const input = document.createElement("input");
          input.classList.add("form-check-input");
          input.type = "checkbox";
          input.id = `${category.title}-${option}`;
          input.value = option;
          input.dataset.category = category.title.toLowerCase();
          input.addEventListener("change", applyFilters);

          const label = document.createElement("label");
          label.classList.add("form-check-label");
          label.setAttribute("for", input.id);
          label.textContent = option;

          filterOption.appendChild(input);
          filterOption.appendChild(label);
          filterSection.appendChild(filterOption);
        });

        filterContainer.appendChild(filterSection);
      });
    })
    .catch((error) => console.error("Error loading filters:", error));
}

function applyFilters() {
  const checkboxes = document.querySelectorAll("#filter-container input[type='checkbox']:checked");
  const selectedFilters = Array.from(checkboxes).reduce((acc, cb) => {
    const category = cb.dataset.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(cb.value.toLowerCase());
    return acc;
  }, {});
  
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    const cardCategories = JSON.parse(card.dataset.categories);
    const shouldShow = Object.entries(selectedFilters).every(([category, values]) => {
      return values.length === 0 || values.some(value => cardCategories[category]?.toLowerCase() === value);
    });

    card.style.display = shouldShow ? 'block' : 'none';
  });
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar-filter");
  const mainContent = document.getElementById("main-content");
  sidebar.classList.toggle("show");
  mainContent.classList.toggle("active");
}

export function sidebarToggle() {
  setupFilters(); // This loads the filters
  const sidebarToggle = document.getElementById("sidebarToggle");

  // Check if the sidebar toggle button exists and add the event listener
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      console.log("Toggle button clicked!"); // Debugging log
      toggleSidebar(); // Toggle the sidebar visibility
    });
  } else {
    console.error("Sidebar toggle button not found!");
  }
}
