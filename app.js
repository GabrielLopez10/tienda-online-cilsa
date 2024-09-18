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
    updateCartCount();
    saveCart();
  }

  function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      // Cantidad total de items en el carrito
      const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      cartCountElement.textContent = totalQuantity;
    }
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function loadCart() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();
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
    const cartItemsList = document.getElementById("cart-items-list");
    const cartTotal = document.getElementById("cart-total");

    cartItemsList.innerHTML = "";

    // Formato de Moneda (Peso Argentino)
    const formatter = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS", 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Añade items a la lista
    let total = 0;
    cart.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.name} - ${item.quantity} x ${formatter.format(item.price)}`;
      cartItemsList.appendChild(listItem);
      total += parseFloat(item.price) * item.quantity;
    });

    cartTotal.textContent = `Total: ${formatter.format(total)}`;
  }

  function handleCheckout() {
    renderCartSummary();
    const checkoutModal = new bootstrap.Modal(
      document.getElementById("checkoutModal")
    );
    checkoutModal.show();
  }

  // modal de checkout cuando se hace click en el icono de carrito
  document
    .getElementById("checkout-button")
    .addEventListener("click", handleCheckout);

  document.getElementById("confirm-checkout").addEventListener("click", () => {

    alert("Gracias por tu compra!");

    // limpia el carrito despues de la compra
    localStorage.removeItem("cart");
    cart = []; // Limpia el array en cada compra realizada
    updateCartCount();


    const checkoutModal = bootstrap.Modal.getInstance(
      document.getElementById("checkoutModal")
    );
    checkoutModal.hide();
  });


  loadCart();
});
