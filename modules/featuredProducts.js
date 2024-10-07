async function displayFeaturedProducts() {
  try {
    const response = await fetch("data/products.json");
    const data = await response.json();
    const products = data.products;

    // filtrado por productos destacados
    const featuredProducts = products.filter(product => product.featured);

    // limitado a 4 productos
    const limitedFeaturedProducts = featuredProducts.slice(0, 4);

    const featuredProductsContainer =
      document.getElementById("featured-products");

    featuredProductsContainer.innerHTML = "";

    limitedFeaturedProducts.forEach((product) => {
      const productCard = createProductCard(product);
      featuredProductsContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error("No se pueden mostrar los productos destacados", error);
  }
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "col";
  card.innerHTML = `
      <div class="card h-100">
      <a href="productos.html#tecnologia">
        <img src="${product.image}" class="card-img-top img-thumbnail object-fit-scale" alt="${product.name}">
      </a>
      <div class="card-body row align-items-end align-items-end">
        <h5 class="card-title">${product.name}</h5>
        <div class="mb-2">
          <span class="font-bold text-decoration-line-through"><strong>$${product.oldPrice.toLocaleString()}</strong></span>
          <span class="text-body-secondary">$${product.newPrice.toLocaleString()}</span>
        </div>
        <div class="card-footer">
          <div class="row text-center">
            <div class="col mb-2">
              ${createStarRating(product.rating)}
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
        .fill(
          '<span class="align-middle fa fa-star" aria-hidden="true"></span>'
        )
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

export { displayFeaturedProducts };
