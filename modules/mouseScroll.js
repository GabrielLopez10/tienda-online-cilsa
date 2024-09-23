export function setupMouseScroll() {
  const mouseScroll = document.querySelector(".mouse_scroll");
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
}
