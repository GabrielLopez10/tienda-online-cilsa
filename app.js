document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.querySelector('.nav-item.dropdown .nav-link');
  const offcanvas = document.getElementById('offcanvas');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  function toggleDropdown() {
      if (window.innerWidth >= 768) {
          dropdown.setAttribute('data-bs-toggle', 'dropdown');
          dropdownMenu.classList.remove('d-none');
          dropdown.classList.remove('no-arrow');
      } else {
          dropdown.removeAttribute('data-bs-toggle');
          dropdown.href = '#categorias';
          dropdownMenu.classList.add('d-none');
          dropdown.classList.add('no-arrow');
      }
  }

  toggleDropdown();
  window.addEventListener('resize', toggleDropdown);
  offcanvas.addEventListener('shown.bs.offcanvas', toggleDropdown);
  offcanvas.addEventListener('hidden.bs.offcanvas', toggleDropdown);

  // Event Listener for mouse scroll icon to scroll to slide-3
  document.querySelector('.mouse_scroll').addEventListener('click', () => {
      document.getElementById('slide-3').scrollIntoView({
          behavior: 'smooth'
      });
  });

  // Slide Navigation
  const windowElem = window;
  const documentElem = document;
  const navButtons = document.querySelectorAll("nav a[href^='#']");
  const navGoPrev = document.querySelector(".go-prev");
  const navGoNext = document.querySelector(".go-next");
  const slidesContainer = document.querySelector(".slides-container");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = slides[0];
  let isAnimating = false;
  let pageHeight = windowElem.innerHeight;

  const keyCodes = {
      UP: 38,
      DOWN: 40
  };

  goToSlide(currentSlide);

  windowElem.addEventListener("resize", onResize);
  windowElem.addEventListener("wheel", onMouseWheel);
  documentElem.addEventListener("keydown", onKeyDown);

  navButtons.forEach((button) => {
      button.addEventListener("click", onNavButtonClick);
  });

  if (navGoPrev) {
      navGoPrev.addEventListener("click", goToPrevSlide);
  }

  if (navGoNext) {
      navGoNext.addEventListener("click", goToNextSlide);
  }

  function onNavButtonClick(event) {
      const button = event.currentTarget;
      const slide = document.querySelector(button.getAttribute("href"));

      if (slide) {
          goToSlide(slide);
          event.preventDefault();
      }
  }

  function onKeyDown(event) {
      const PRESSED_KEY = event.keyCode;

      if (PRESSED_KEY === keyCodes.UP) {
          goToPrevSlide();
          event.preventDefault();
      } else if (PRESSED_KEY === keyCodes.DOWN) {
          goToNextSlide();
          event.preventDefault();
      }
  }

  function onMouseWheel(event) {
      const delta = event.deltaY;

      if (delta > 0) {
          goToNextSlide();
      } else if (delta < 0) {
          goToPrevSlide();
      }

      event.preventDefault();
  }

  function goToPrevSlide() {
      const prevSlide = currentSlide.previousElementSibling;
      if (prevSlide) {
          goToSlide(prevSlide);
      }
  }

  function goToNextSlide() {
      const nextSlide = currentSlide.nextElementSibling;
      if (nextSlide) {
          goToSlide(nextSlide);
      }
  }

  function goToSlide(slide) {
      if (!isAnimating && slide) {
          isAnimating = true;
          currentSlide = slide;

          slidesContainer.scrollTo({
              top: pageHeight * [...slides].indexOf(currentSlide),
              behavior: 'smooth'
          });

          navButtons.forEach(button => button.classList.remove("active"));
          const activeButton = document.querySelector(`nav a[href="#${currentSlide.id}"]`);
          if (activeButton) {
              activeButton.classList.add("active");
          }

          setTimeout(onSlideChangeEnd, 1000);
      }
  }

  function onSlideChangeEnd() {
      isAnimating = false;
  }

  function onResize() {
      const newPageHeight = windowElem.innerHeight;

      if (pageHeight !== newPageHeight) {
          pageHeight = newPageHeight;

          slides.forEach(slide => {
              slide.style.height = `${pageHeight}px`;
          });

          slidesContainer.scrollTo({
              top: pageHeight * [...slides].indexOf(currentSlide),
              behavior: 'instant'
          });
      }
  }
});
