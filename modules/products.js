export function loadProducts() {
  return fetch("data/products.json")
    .then((response) => response.json())
    .then((data) => {
      displayProducts(data.products);
      return data.products;
    })
    .catch((error) => {
      console.error("Error loading products:", error);
      return [];
    });
}

export function displayProducts(products) {
  const vehicleContainer = document.getElementById("vehicle-product-container");
  const technologyContainer = document.getElementById(
    "technology-product-container"
  );

  vehicleContainer.innerHTML = "";
  technologyContainer.innerHTML = "";

  products.forEach((product) => {
    const productCard = createProductCard(product);

    if (product.categories.tipo === "vehiculo") {
      vehicleContainer.appendChild(productCard);
    } else if (product.categories.tipo === "tech") {
        technologyContainer.appendChild(productCard);
    }
  });
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "col product-card";
  card.dataset.categories = JSON.stringify(product.categories);

  card.innerHTML = `
    <div class="card h-100 container-fluid">
      <img src="${product.image}" class="card-img-top object-fit-scale" alt="${product.name}">
      <div class="card-body row justify-content-end align-items-end">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.description}</p>
        <div class="mb-2">
          <span class="font-bold text-decoration-line-through"><strong>$${product.oldPrice.toLocaleString()}</strong></span>
          <span class="text-body-secondary">$${product.newPrice.toLocaleString()}</span>
        </div>
        <div class="card-footer py-3">
          <div class="row text-center">
            <div class="col-md-6 mb-2">
              ${createStarRating(product.rating)}
            </div>
            <div class="col-md-6">
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal${
                product.id
              }">
                <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return card;
}

function createStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return `
    ${Array(fullStars)
      .fill('<span class="align-middle fa fa-star" aria-hidden="true"></span>')
      .join("")}
    ${
      halfStar
        ? '<span class="align-middle fa-solid fa-star-half-stroke" aria-hidden="true"></span>'
        : ""
    }
    ${Array(emptyStars)
      .fill(
        '<span class="align-middle fa-regular fa-star" aria-hidden="true"></span>'
      )
      .join("")}
  `;
}

export function generateFilterData(products) {
  const filters = {};

  products.forEach((product) => {
    Object.entries(product.categories).forEach(([category, value]) => {
      if (!filters[category]) {
        filters[category] = new Set();
      }
      filters[category].add(value);
    });
  });

  return Object.entries(filters).map(([category, values]) => ({
    title: category.charAt(0).toUpperCase() + category.slice(1),
    options: Array.from(values),
  }));
}
