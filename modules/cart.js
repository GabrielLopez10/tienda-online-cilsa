let cart = [];

export function setupCart() {
  loadCart();
  updateCartCount();
  renderCartSummary();
}

export function addToCart(product, quantity) {
  if (quantity <= 0) {
    alert("Ingrese una cantidad mayor a 0.");
    return;
  }

  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    product.quantity = quantity;
    cart.push(product);
  }
  saveCart();
  updateCartCount();
}

export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.getElementById("cart-count");

  let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  if (cartCountElement) {
    cartCountElement.textContent = totalQuantity;
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

export function renderCartSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsList = document.getElementById("cart-items-list");
  const cartTotal = document.querySelectorAll(".cart-total");
  const checkoutButton = document.getElementById("confirm-checkout");

  cartItemsList.innerHTML = "";

  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  if (cart.length === 0) {
    cartItemsList.innerHTML =
      '<li class="list-group-item text-center my-3">Tu carrito esta vacio</li>';
    checkoutButton.disabled = true;
    cartTotal.forEach((e) => (e.textContent = formatter.format(0)));
    return;
  }

  checkoutButton.disabled = false;

  let total = 0;

  cart.forEach((item, index) => {
    const listItem = createCartItem(item, index, formatter);
    cartItemsList.appendChild(listItem);
    total += parseFloat(item.price) * item.quantity;
  });

  const formattedTotal = formatter.format(total);
  cartTotal.forEach((e) => {
    e.textContent = formattedTotal;
  });
}

function createCartItem(item, index, formatter) {
  const listItem = document.createElement("li");
  listItem.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "fw-bold",
    "my-3"
  );

  const productImages = [
    { name: "Canon", imageFilename: "1651_4_z_532x399.jpg" },
    {
      name: "Lenovo",
      imageFilename:
        "Notebook-Lenovo-V14-Business-Black-Aslan-Store-1_cropped.webp",
    },
    { name: "Sony", imageFilename: "ps5-product-thumbnail-01-en-14sep21.webp" },
    { name: "Samsung", imageFilename: "samsung2.webp" },
    { name: "Renault Sandero", imageFilename: "renault1.jpg" },
    { name: "Fiat", imageFilename: "fiat1.jpg" },
    { name: "RAM 1500", imageFilename: "ram1.jpg" },
    { name: "Renault Megane", imageFilename: "megane1.jpg" },
  ];

  const productImage = document.createElement("img");
  const matchingImage = productImages.find((img) => img.name === item.name);
  productImage.src = `assets/images/${
    matchingImage ? matchingImage.imageFilename : "default.jpg"
  }`;
  productImage.alt = item.name;
  productImage.style.width = "60px";
  productImage.style.height = "60px";
  productImage.classList.add("me-3");

  const productInfo = document.createElement("span");
  productInfo.textContent = `${item.name} - ${formatter.format(item.price)}`;

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.classList.add("form-control", "cart-quantity-input", "mx-5");
  quantityInput.value = item.quantity;
  quantityInput.min = 1;
  quantityInput.style.width = "60px";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger", "btn-sm", "mx-5");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  quantityInput.addEventListener("change", (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      updateCartItemQuantity(index, newQuantity);
    }
  });

  deleteButton.addEventListener("click", () => {
    removeFromCart(index);
  });

  listItem.appendChild(productImage);
  listItem.appendChild(productInfo);
  listItem.appendChild(quantityInput);
  listItem.appendChild(deleteButton);

  return listItem;
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartSummary();
    updateCartCount();
  }
}

function updateCartItemQuantity(index, newQuantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = newQuantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartSummary();
  updateCartCount();
}
