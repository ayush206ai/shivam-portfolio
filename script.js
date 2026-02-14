// ========================================
// SHIVAM AGARWAL - PORTFOLIO JAVASCRIPT
// Futuristic Sci-Fi Interactive Features
// ========================================

// === PRELOADER (OPTIMIZED) ===
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const bar = document.getElementById("loadingBar");
  const percent = document.getElementById("loadingPercent");

  if (!preloader || !bar || !percent) return;

  let progress = 0;
  const speed = 90;

  const loader = setInterval(() => {
    progress += Math.random() * 8;

    if (progress >= 100) {
      progress = 100;
      clearInterval(loader);

      setTimeout(() => {
        preloader.classList.add("hidden");
      }, 600);
    }

    bar.style.width = progress + "%";
    percent.innerText = Math.floor(progress) + "%";
  }, speed);
});

// === NAVIGATION ACTIVE STATE ===
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section, .hero-section');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Allow normal page navigation
    if (!href || !href.startsWith('#')) {
      return;
    }

    e.preventDefault();

    const targetSection = document.querySelector(href);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// Update active nav on scroll (throttled for performance)
let isScrolling = false;

window.addEventListener('scroll', function() {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });

      isScrolling = false;
    });

    isScrolling = true;
  }
});

// === ANIMATED STARS WITH PARALLAX ===
const canvas = document.getElementById('starsCanvas');

if (canvas) {
  const ctx = canvas.getContext('2d');

  // Set canvas size
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);

  // Create stars
  const stars = [];
  const starCount = window.innerWidth < 768 ? 100 : 200; // Less stars on mobile

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.01
    });
  }

  // Animate stars
  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
      // Twinkle effect
      star.opacity += star.twinkleSpeed;
      if (star.opacity >= 1 || star.opacity <= 0.3) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }
      
      // Draw star
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();
      
      // Slow drift
      star.y += star.speed * 0.1;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });
    
    requestAnimationFrame(animateStars);
  }

  animateStars();
}

// === SOFTWARE ICONS HOVER ===
const softwareIcons = document.querySelectorAll('.software-icon');
softwareIcons.forEach(icon => {
  const color = icon.getAttribute('data-color');

  icon.style.setProperty('--icon-color', color);

  icon.addEventListener('mouseenter', function() {
    this.style.boxShadow = `0 0 20px ${color}`;
  });

  icon.addEventListener('mouseleave', function() {
    this.style.boxShadow = 'none';
  });
});


// === PROJECT MODAL (IMPROVED) ===
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".work-card");
  const modal = document.getElementById("projectModal");
  const closeModal = document.querySelector(".close-modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");

  if (!modal || !closeModal || !modalTitle || !modalImage) return;

  // Open modal
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const imgElement = card.querySelector("img");
      if (!imgElement) return;

      const imgSrc = imgElement.getAttribute("src");
      const title = card.getAttribute("data-title") || card.querySelector("h4")?.innerText || "Project";

      modalTitle.innerText = title;
      modalImage.src = imgSrc;
      modalImage.alt = title;

      // Use class instead of inline style for consistency
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scroll
    });
  });

  // Close modal function
  function closeModalFunc() {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Restore scroll
  }

  // Close on X button
  closeModal.addEventListener("click", closeModalFunc);

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModalFunc();
    }
  });
});

// === SCROLL FADE ANIMATION ===
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px"
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Apply fade effect to all sections
const allSections = document.querySelectorAll(".section");
allSections.forEach(section => {
  fadeObserver.observe(section);
});

// === SKILL CAPSULES HOVER EFFECT ===
const skillCapsules = document.querySelectorAll('.skill-capsule');

skillCapsules.forEach(capsule => {
  capsule.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.05)';
  });
  
  capsule.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// === SMOOTH SCROLL FOR ANGULAR BUTTONS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href && href.length > 1) { // Not just "#"
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// === PERFORMANCE: Reduce animations on mobile ===
if (window.innerWidth < 768) {
  // Disable some heavy animations on mobile for better performance
  const nebulas = document.querySelectorAll('.nebula-glow');
  nebulas.forEach(nebula => {
    nebula.style.filter = 'blur(80px)'; // Reduce blur intensity
  });
}

// === LOG WHEN SITE IS READY ===
console.log("%c🚀 Shivam Agarwal Portfolio Loaded", "color: #00d2ff; font-size: 16px; font-weight: bold;");
console.log("%cDesigned with futuristic cyberpunk aesthetics 💜", "color: #bd00ff; font-size: 12px;");
