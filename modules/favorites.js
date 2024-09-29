let favoritesList;
let favoritesCount;

export function favoritesSystem() {
  favoritesList = document.getElementById("favoritesList");
  favoritesCount = document.getElementById("favoritesCount");
  initFavorites();
  addEventListeners();
}

function addEventListeners() {
  document.body.addEventListener("click", (event) => {
    if (event.target.closest(".favorite-btn")) {
      const btn = event.target.closest(".favorite-btn");
      const productId = btn.getAttribute("data-product-id");
      const productName = btn.getAttribute("data-product-name");
      toggleFavorite(productId, productName, btn);
    }

    if (event.target.closest(".remove-favorite")) {
      const btn = event.target.closest(".remove-favorite");
      const productId = btn.getAttribute("data-product-id");
      removeFavorite(productId);
      event.preventDefault();
      event.stopPropagation();
    }
  });
}

function toggleFavorite(productId, productName, button) {
  let favorites = getFavorites();
  const index = favorites.findIndex((f) => f.id === productId);

  if (index > -1) {
    // si el producto esta en favorito, se elimina. (Index > -1) por lo tanto es un número válido
    favorites.splice(index, 1);
    button.classList.remove("active");
  } else {
    // se agrega producto si no esta en favorito. (Index === -1) por lo tanto no es válido
    favorites.push({ id: productId, name: productName });
    button.classList.add("active");
  }

  saveFavorites(favorites);
  updateFavoritesUI();
}

function removeFavorite(productId) {
  let favorites = getFavorites();
  favorites = favorites.filter((f) => f.id !== productId);
  saveFavorites(favorites);

  const btn = document.querySelector(
    `.favorite-btn[data-product-id="${productId}"]`
  );
  if (btn) btn.classList.remove("active");

  updateFavoritesUI();
}

function updateFavoritesUI() {
  const favorites = getFavorites();
  favoritesCount.textContent = favorites.length;

  favoritesList.innerHTML = "";
  if (favorites.length === 0) {
    favoritesList.innerHTML =
      '<li><span class="dropdown-item">No hay favoritos</span></li>';
  } else {
    favorites.forEach((fav) => {
      const li = document.createElement("li");
      li.innerHTML = `
                    <a class="dropdown-item d-flex align-items-center fw-bold" href="#">
                        ${fav.name}
                        <button class="btn btn-lg float-end remove-favorite mx-4" data-product-id="${fav.id}">
                            <i class="far fa-window-close"></i>
                        </button>
                    </a>
                `;
      favoritesList.appendChild(li);
    });
  }
}

function initFavorites() {
  const favorites = getFavorites();
  document.querySelectorAll(".favorite-btn").forEach((btn) => {
    const productId = btn.getAttribute("data-product-id");
    if (favorites.some((f) => f.id === productId)) {
      btn.classList.add("active");
    }
  });
  updateFavoritesUI();
}

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
