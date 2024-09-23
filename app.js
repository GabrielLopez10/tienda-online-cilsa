document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".nav-item.dropdown .nav-link");
  const offcanvas = document.getElementById("offcanvas");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const mouseScroll = document.querySelector(".mouse_scroll");
  let mybutton = document.getElementById("btn-back-to-top");

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

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  window.onscroll = function () {
    scrollFunction();
  };

  mybutton.addEventListener("click", backToTop);

  toggleDropdown();
  window.addEventListener("resize", toggleDropdown);
  offcanvas.addEventListener("shown.bs.offcanvas", toggleDropdown);
  offcanvas.addEventListener("hidden.bs.offcanvas", toggleDropdown);

  if (mouseScroll) {
    console.log("Mouse scroll found, adding click event.");
    mouseScroll.addEventListener("click", () => {
      document.getElementById("slide-2").scrollIntoView({
        behavior: "smooth",
      });
    });
  } else {
    console.log("Mouse scroll element not found, skipping mouse scroll setup.");
  }

  // Validacion del formulario
  var form = document.querySelector(".needs-validation");

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault(); // Impide el envio del formulario por defecto

      if (!form.checkValidity()) {
        event.stopPropagation(); // Detiene el envio del formulario si es invalido
      } else {
        // Si el formulario es valido, muestra el modal de confirmacion
        var modal = new bootstrap.Modal(
          document.getElementById("confirmationModal")
        );
        modal.show();
        console.log("Modal found:", modal);

        // Limpiar los campos del formulario despues de mostrar el modal
        form.reset();

        // Elimina las clases de feedback de bootstrap despues del reinicio
        form.classList.remove("was-validated");
      }

      // Añade las clases de feedback de bootstrap por defecto
      form.classList.add("was-validated");
    },
    false
  );

  fetch("productosModal.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("#modals-container").innerHTML = data;
      console.log("Modals loaded successfully.");
      setupModalEventListeners();
    })
    .catch((error) => console.error("Error loading modals:", error));

  window.changeImage = (imgElement, imageId) => {
    var mainImage = document.getElementById(imageId);
    mainImage.src = imgElement.src;
  };
  /* ----------------------------Añadir al carrito funcionalidad------------------------------- */
  let cart = [];

  function addToCart(product, quantity) {
    if (quantity <= 0) {
      alert("Ingrese una cantidad mayor a 0.");
      return;
    }

    // Verifica que el producto ya existe en el carrito
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      // Si el producto existe se actualiza la cantidad
      existingProduct.quantity += quantity;
    } else {
      // Añade productos de acuerdo a la cantidad elegida
      product.quantity = quantity;
      cart.push(product);
    }
    saveCart();
    updateCartCount();
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountElement = document.getElementById("cart-count");

    let totalQuantity = 0;

    // Suma las cantidades de todos los artículos del carrito
    cart.forEach((item) => {
      totalQuantity += item.quantity;
    });

    // Cantidad total de items en el carrito
    if (cartCountElement) {
      cartCountElement.textContent = totalQuantity;
    }
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function setupModalEventListeners() {
    document.querySelectorAll(".shop-button").forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-id");
        const productName = button.getAttribute("data-name");
        const productPrice = button.getAttribute("data-price");

        const targetModalSelector = button.getAttribute("data-bs-target");
        const modal = document.querySelector(targetModalSelector);

        if (!modal) {
          console.error(`Modal not found for selector: ${targetModalSelector}`);
          return;
        }

        const quantityInput = modal.querySelector(".input-quantity-selector");
        if (!quantityInput) {
          console.error(
            `Quantity input not found inside modal: ${targetModalSelector}`
          );
          return;
        }
        const quantity = parseInt(quantityInput.value, 10);

        const product = {
          id: productId,
          name: productName,
          price: productPrice,
        };

        addToCart(product, quantity);

        if (quantity > 0) {
          alert(`${productName} (${quantity}) ha sido añadido al carrito!`);
          return;
        }
      });
    });
  }

  function renderCartSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsList = document.getElementById("cart-items-list");
    const cartTotal = document.querySelectorAll(".cart-total");
    const checkoutButton = document.getElementById("confirm-checkout");

    cartItemsList.innerHTML = "";

    // Formato de Moneda (Peso Argentino)
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

    // Añade items a la lista
    let total = 0;

    cart.forEach((item, index) => {
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
        {
          name: "Canon",
          imageFilename: "1651_4_z_532x399.jpg",
        },
        {
          name: "Lenovo",
          imageFilename:
            "Notebook-Lenovo-V14-Business-Black-Aslan-Store-1_cropped.webp",
        },
        {
          name: "Sony",
          imageFilename: "ps5-product-thumbnail-01-en-14sep21.webp",
        },
        { name: "Samsung", imageFilename: "samsung2.webp" },
        { name: "Renault Sandero", imageFilename: "renault1.jpg" },
        { name: "Fiat", imageFilename: "fiat1.jpg" },
        { name: "RAM 1500", imageFilename: "ram1.jpg" },
        { name: "Renault Megane", imageFilename: "megane1.jpg" },
      ];

      // Añade las miniaturas de cada producto
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
      productInfo.textContent = `${item.name} - ${formatter.format(
        item.price
      )}`;

      const quantityInput = document.createElement("input");

      quantityInput.type = "number";
      quantityInput.classList.add(
        "form-control",
        "cart-quantity-input",
        "mx-5"
      );
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

      listItem.appendChild(productImage);
      listItem.appendChild(productInfo);
      listItem.appendChild(quantityInput);
      listItem.appendChild(deleteButton);

      cartItemsList.appendChild(listItem);

      total += parseFloat(item.price) * item.quantity;

      deleteButton.addEventListener("click", () => {
        removeFromCart(index);
      });
    });

    const formattedTotal = formatter.format(total);
    cartTotal.forEach((e) => {
      e.textContent = formattedTotal;
    });
  }

  // Funcion para remover items del carrito
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartSummary();
      updateCartCount();
    }
  }

  // Funcion para actualizar la cantidad de items en el carrito
  function updateCartItemQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartSummary();
    updateCartCount();
  }

  function handleCheckout() {
    renderCartSummary();
    const checkoutModal = new bootstrap.Modal(
      document.getElementById("checkoutModal")
    );
    checkoutModal.show();
  }

  // Modal de checkout cuando se hace click en el icono de carrito
  document
    .getElementById("checkout-button")
    .addEventListener("click", handleCheckout);

  function formatCreditCardNumber(input) {
    let value = input.value.replace(/\D/g, "");

    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");

    value = value.slice(0, 19);

    input.value = value;
  }

  function formatExpirationDate(input) {
    let value = input.value.replace(/\D/g, "");

    if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,4})/, "$1/$2"); // Insertar a barra después del los primeros 2 digitos (MM)
    }

    value = value.slice(0, 7); // Limitarlo a MM/YYYY

    input.value = value;
  }

  document.getElementById("typeText").addEventListener("input", (e) => {
    formatCreditCardNumber(e.target);
  });

  document.getElementById("typeExp").addEventListener("input", (e) => {
    formatExpirationDate(e.target);
  });

  function validateForm() {
    const name = document.getElementById("typeName").value;
    const cardNumber = document.getElementById("typeText").value;
    const expDate = document.getElementById("typeExp").value;
    const cvv = document.getElementById("typeCvv").value;
    let isValid = true;

    clearErrorMessage();

    if (!name || !cardNumber || !expDate || !cvv) {
      displayErrorMessage(
        "general-error",
        "Por favor, complete todos los campos de pago."
      );
      isValid = false;
    }

    if(!/^[a-zA-Z\u00C0-\u017F\s]+$/.test(name)) {
      displayErrorMessage("name-error", "El nombre solo puede contener letras y espacios.");
      isValid = false;
    }

    if (
      cardNumber.length !== 19 ||
      !/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber)
    ) {
      displayErrorMessage(
        "card-error",
        "Número de tarjeta inválido. Debe tener formato XXXX XXXX XXXX XXXX"
      );
      isValid = false;
    }

    if (!/^\d{2}\/\d{4}$/.test(expDate)) {
      displayErrorMessage("exp-error", "Fecha de vencimiento inválida. Debe tener formato MM/YYYY");
      isValid = false;
    }

    if (cvv.length !== 3 || !/^\d{3}$/.test(cvv)) {
      displayErrorMessage("cvv-error", "CVV inválido. Debe ser un número de 3 digitos");
      isValid = false;
    }

    isValid = true;
  }

  function displayErrorMessage(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  function clearErrorMessage()  {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
      element.textContent = '';
      element.style.display = 'none';
    })
  }

  document.getElementById("confirm-checkout").addEventListener("click", () => {
    if (validateForm()) {
      alert("Gracias por tu compra");

      localStorage.removeItem("cart");
      cart = [];
      updateCartCount();
      renderCartSummary();

      const checkoutModal = bootstrap.Modal.getInstance(
        document.getElementById("checkoutModal")
      );
      checkoutModal.hide();
    }
  });

  document.getElementById("cerrar-modal").addEventListener("click", () => {
    const checkoutModal = bootstrap.Modal.getInstance(
      document.getElementById("checkoutModal")
    );
    checkoutModal.hide();
    renderCartSummary();
  });

  function loadCart() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();
    renderCartSummary();
  }

  loadCart();
});
