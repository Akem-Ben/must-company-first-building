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


//============================= CHRISTMAS ADVERT SECTION FUNCTIONALITIES ======================== //
document.addEventListener('DOMContentLoaded', function() {
  // Carousel functionality
  const cards = document.querySelectorAll('.advert-card');
  const prevButtons = document.querySelectorAll('.prev-btn');
  const nextButtons = document.querySelectorAll('.next-btn');
  
  // Set initial active card to the first one
  let currentCardIndex = 0;
  
  // Add event listeners to all previous buttons
  prevButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Hide current card
      cards[currentCardIndex].classList.remove('active');
      
      // Calculate the previous card index (with wrapping)
      currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
      
      // Show the previous card
      cards[currentCardIndex].classList.add('active');
    });
  });
  
  // Add event listeners to all next buttons
  nextButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Hide current card
      cards[currentCardIndex].classList.remove('active');
      
      // Calculate the next card index (with wrapping)
      currentCardIndex = (currentCardIndex + 1) % cards.length;
      
      // Show the next card
      cards[currentCardIndex].classList.add('active');
    });
  });
  
  // Updated scroll to top functionality - now scrolls to the top of the container
  const scrollToTopButton = document.getElementById('scroll-to-top');
  if (scrollToTopButton) {
    scrollToTopButton.addEventListener('click', function() {
      // Get the container element
      const container = document.querySelector('.hero-section-container');
      if (container) {
        // Scroll the container into view
        container.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
});



// =============================AVENUE SECTION FUNCTIONALITIES ======================== //
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.avenue-track');
  const items = document.querySelectorAll('.avenue-item');
  const container = document.querySelector('.avenue-container');
  
  // Calculate the total width for smooth scrolling
  const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginLeft) + 
                    parseInt(getComputedStyle(items[0]).marginRight);
  const totalItems = items.length;
  const animationDuration = 40; // seconds
  
  // Set initial position (starting from the middle of the first set)
  track.style.transform = 'translateX(0)';
  
  // Animation function
  function startAnimation() {
    const totalScrollWidth = (itemWidth * (totalItems / 2)); // Scroll only through half (original set)
    
    // Create keyframes for the animation
    track.animate([
      { transform: 'translateX(0)' },
      { transform: `translateX(-${totalScrollWidth}px)` }
    ], {
      duration: animationDuration * 1000,
      iterations: Infinity,
      easing: 'linear'
    });
    
    // Update center class based on position
    setInterval(updateCenterItems, 100);
  }
  
  // Function to determine which items are in center and apply the center class
  function updateCenterItems() {
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      
      // Calculate how close the item is to the center
      const distanceFromCenter = Math.abs(itemCenter - containerCenter);
      
      // If item is close to center, add center class, otherwise remove it
      if (distanceFromCenter < itemRect.width * 0.5) {
        item.classList.add('center');
      } else {
        item.classList.remove('center');
      }
    });
  }
  
  // Start the animation
  startAnimation();
});