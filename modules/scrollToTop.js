export function setupScrollToTop() {
  let mybutton = document.getElementById("btn-back-to-top");

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

  window.onscroll = scrollFunction;
  mybutton.addEventListener("click", backToTop);
}
