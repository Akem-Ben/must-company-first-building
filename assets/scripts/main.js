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




//============================= SCROLL TO TOP FUNCTIONALITY ======================== //
// const scrollToTopBtn = document.querySelector(".scroll-to-top");
// const scrollToTop = () => {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });
// };
// scrollToTopBtn.addEventListener("click", scrollToTop);
// // Show button when scrolled down
// window.addEventListener("scroll", () => {
//   if (document.documentElement.scrollTop > 200) {
//     scrollToTopBtn.style.display = "block";
//   } else {
//     scrollToTopBtn.style.display = "none";
//   }
// });


// =============================AVENUE SECTION FUNCTIONALITIES ======================== //
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.avenue-track');
  const items = document.querySelectorAll('.avenue-item');
  const container = document.querySelector('.avenue-container');
  
  let currentPosition = 0;
  let animationId;
  let isScrolling = true;
  const itemWidth = items[0].offsetWidth + 
                   parseInt(getComputedStyle(items[0]).marginLeft) + 
                   parseInt(getComputedStyle(items[0]).marginRight);
  const centerOffset = container.offsetWidth / 2;
  
  // Clone items for seamless looping
  function cloneItems() {
    const itemsToClone = Array.from(items).slice(0, items.length / 2);
    itemsToClone.forEach(item => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });
  }
  
  // Initialize the avenue
  function initializeAvenue() {
    // Clear any existing animation
    cancelAnimationFrame(animationId);
    
    // Reset track position
    currentPosition = 0;
    track.style.transition = 'none';
    track.style.transform = `translateX(0px)`;
    
    // Calculate the initial position to center the first item
    const firstItemCenter = itemWidth / 2;
    currentPosition = centerOffset - firstItemCenter;
    track.style.transform = `translateX(${currentPosition}px)`;
    
    // Force reflow
    void track.offsetWidth;
    
    // Start scrolling
    if (isScrolling) {
      startScrolling();
    }
  }
  
  // Update which item is in the center
  function updateCenterItem() {
    const allItems = document.querySelectorAll('.avenue-item');
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    allItems.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const distanceFromCenter = Math.abs(itemCenter - containerCenter);
      
      // Remove center class from all items
      item.classList.remove('center');
      
      // If the item is close to the center of the container
      if (distanceFromCenter < itemRect.width / 2) {
        item.classList.add('center');
      }
    });
  }
  
  // Smooth scrolling function
  function scrollAvenue() {
    currentPosition -= 1;
    track.style.transform = `translateX(${currentPosition}px)`;
    updateCenterItem();
    
    // Check if we need to loop back
    const totalWidth = itemWidth * (items.length / 2);
    if (Math.abs(currentPosition) >= totalWidth) {
      // Jump back to the start position without animation
      track.style.transition = 'none';
      currentPosition += totalWidth;
      track.style.transform = `translateX(${currentPosition}px)`;
      
      // Force reflow
      void track.offsetWidth;
      
      // Re-enable transitions
      track.style.transition = 'transform 0.5s ease';
    }
    
    animationId = requestAnimationFrame(scrollAvenue);
  }
  
  function startScrolling() {
    isScrolling = true;
    scrollAvenue();
  }
  
  function stopScrolling() {
    isScrolling = false;
    cancelAnimationFrame(animationId);
  }
  
  // Initialize and start the animation
  cloneItems();
  initializeAvenue();
  
  // Handle window resize
  window.addEventListener('resize', function() {
    initializeAvenue();
  });
  
  // Pause on hover for better UX
  container.addEventListener('mouseenter', stopScrolling);
  container.addEventListener('mouseleave', startScrolling);
});