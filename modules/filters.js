export function setupFilters(filterData, applyFiltersCallback) {
  const filterContainer = document.getElementById("filter-container");
  filterContainer.innerHTML = "";

  filterData.forEach((category) => {
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
      input.addEventListener("change", () => {
        const selectedFilters = getSelectedFilters();
        applyFiltersCallback(selectedFilters);
      });

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
}

function getSelectedFilters() {
  const checkboxes = document.querySelectorAll("#filter-container input[type='checkbox']:checked");
  return Array.from(checkboxes).reduce((acc, cb) => {
    const category = cb.dataset.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(cb.value.toLowerCase());
    return acc;
  }, {});
}

export function toggleSidebar() {
  const sidebar = document.getElementById("sidebar-filter");
  const mainContent = document.getElementById("main-content");
  sidebar.classList.toggle("show");
  mainContent.classList.toggle("active");
}