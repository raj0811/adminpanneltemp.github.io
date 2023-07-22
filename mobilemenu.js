function toggleMobileMenu() {
  var mobileMenu = document.getElementById("mobileMenu");
  var overlay = document.getElementById("overlay");
  mobileMenu.classList.toggle("active");
  overlay.classList.toggle("active");
}
document.addEventListener("click", function (event) {
  var mobileMenu = document.getElementById("mobileMenu");
  var overlay = document.querySelector(".overlay");
  var targetElement = event.target;

  if (
    mobileMenu.classList.contains("active") &&
    !targetElement.closest(".navbar") &&
    !targetElement.closest(".mobile-menu")
  ) {
    mobileMenu.style.transition = "left 0.4s ease-out";
    overlay.style.transition = "opacity 0.4s ease-out";

    // Delay to allow smooth closing transition
    setTimeout(function () {
      mobileMenu.classList.remove("active");
      overlay.classList.remove("active");
    }, 400);
  }
});
