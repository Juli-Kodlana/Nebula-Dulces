// ==========================================================================
// Menú hamburguesa
// ==========================================================================
const burger = document.getElementById('burger');
const nav = document.getElementById('header-nav');

burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('header__nav--open');
  burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  burger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

// Cierra el menú al hacer clic en un enlace (mobile)
nav.querySelectorAll('.header__nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('header__nav--open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú');
  });
});

// ==========================================================================
// Carrusel de reseñas
// ==========================================================================
const track = document.getElementById('track');
const slides = Array.from(track.children);
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dots');

let currentIndex = 0;
let autoplayId = null;

// Crea los puntos de navegación dinámicamente
slides.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.classList.add('testimonials__dot');
  dot.setAttribute('aria-label', `Ir a la reseña ${index + 1}`);
  if (index === 0) dot.classList.add('testimonials__dot--active');
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.children);

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle('testimonials__dot--active', index === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = (index + slides.length) % slides.length;
  updateCarousel();
  restartAutoplay();
}

function nextSlide() { goToSlide(currentIndex + 1); }
function prevSlide() { goToSlide(currentIndex - 1); }

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

function startAutoplay() {
  autoplayId = setInterval(nextSlide, 6000);
}

function restartAutoplay() {
  clearInterval(autoplayId);
  startAutoplay();
}

startAutoplay();

// Pausa el autoplay cuando el usuario interactúa con el carrusel
const carousel = document.querySelector('.testimonials__carousel');
carousel.addEventListener('mouseenter', () => clearInterval(autoplayId));
carousel.addEventListener('mouseleave', startAutoplay);

// ==========================================================================
// Formulario de contacto (validación simple + mensaje de éxito)
// ==========================================================================
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('formSuccess');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (form.checkValidity()) {
    successMessage.hidden = false;
    form.reset();
    setTimeout(() => { successMessage.hidden = true; }, 5000);
  }
});
