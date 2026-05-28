// Smooth scrolling for internal navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: 'smooth'
              });
          }
      }
  });
});

// Simple project carousel
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const slides = document.querySelectorAll('.carousel-slide');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - index) * 100}%)`;
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    showSlide(currentIndex);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    showSlide(currentIndex);
  });
}

// Initialize carousel
if (slides.length > 0) showSlide(currentIndex);

// Sticky Navigation Bar
const header = document.querySelector('header');
if (header) {
  const sticky = header.offsetTop;

  function handleScroll() {
    if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
  }

  window.addEventListener('scroll', handleScroll);
}

// Back-to-top button
const backToTopBtn = document.createElement('button');
backToTopBtn.textContent = '⬆️';
backToTopBtn.className = 'back-to-top';
document.body.appendChild(backToTopBtn);

function toggleBackToTopButton() {
  if (window.scrollY > 300) {
      backToTopBtn.style.display = 'block';
  } else {
      backToTopBtn.style.display = 'none';
  }
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', toggleBackToTopButton);

// Highlight active section in the navigation bar
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

function highlightNavLink() {
  let index = sections.length;

  while(--index && window.scrollY + 50 < sections[index].offsetTop) {}

  navLinks.forEach((link) => link.classList.remove('active'));
  navLinks[index].classList.add('active');
}

window.addEventListener('scroll', highlightNavLink);

/* ============================================================
   CUSTOM CURSOR — dot + lagging ring
   ============================================================ */
(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  // Only run on devices with a true pointer (not touch-only)
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let rafId;
  let visible = false;

  // Snap dot instantly; ring lerps behind
  function tick() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    dot.style.left  = mouseX + 'px';
    dot.style.top   = mouseY + 'px';
    ring.style.left = ringX  + 'px';
    ring.style.top  = ringY  + 'px';

    rafId = requestAnimationFrame(tick);
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!visible) {
      // Teleport ring to current position so it doesn't sweep from 0,0
      ringX = mouseX;
      ringY = mouseY;
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
      visible = true;
      tick();
    }
  }, { passive: true });

  // Hide when pointer leaves the window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });

  // Hover state — expand ring & shift dot colour on interactive elements
  const interactives = document.querySelectorAll(
    'a, button, input, textarea, select, label, [role="button"], .projectCard, .myCard, .nav-icon'
  );
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('is-hovered');
      ring.classList.add('is-hovered');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('is-hovered');
      ring.classList.remove('is-hovered');
    });
  });

  // Click state — quick squish
  document.addEventListener('mousedown', () => ring.classList.add('is-clicking'));
  document.addEventListener('mouseup',   () => ring.classList.remove('is-clicking'));
})();
