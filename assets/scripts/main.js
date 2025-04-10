//============================= NAVBAR HAMBURGER FUNCTIONALITIES ======================== //
// Mobile menu functionality
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileNav = document.querySelector(".mobile-nav");
const overlay = document.querySelector(".overlay");

mobileMenuBtn.addEventListener("click", function () {
  this.classList.toggle("active");
  mobileNav.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.style.overflow = mobileNav.classList.contains("active")
    ? "hidden"
    : "auto";
});

overlay.addEventListener("click", function () {
  mobileMenuBtn.classList.remove("active");
  mobileNav.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Close mobile menu when resizing to desktop size
window.addEventListener("resize", function () {
  if (window.innerWidth > 768 && mobileNav.classList.contains("active")) {
    mobileMenuBtn.classList.remove("active");
    mobileNav.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

//=================================== CAROUSEL SECTION FUNCTIONALITIES ======================//

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelector(".carousel-slides");
  const indicators = document.querySelectorAll(".indicator");
  const viewMoreBtns = document.querySelectorAll(".view-more-btn");
  let currentSlide = 0;
  let slideCount = document.querySelectorAll(".carousel-slide").length;
  let slideInterval;

  function initCarousel() {
    updateIndicators();
    startAutoSlide();
  }

  function goToSlide(index) {
    currentSlide = (index + slideCount) % slideCount;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateIndicators();
  }

  function updateIndicators() {
    indicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  function startAutoSlide() {
    slideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      const slideIndex = parseInt(indicator.getAttribute("data-slide"));
      goToSlide(slideIndex);
      resetAutoSlide();
    });
  });

  viewMoreBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      goToSlide(currentSlide + 1);
      resetAutoSlide();
    });
  });

  initCarousel();
});
