/* ==========================================================================
   MAIN JS – VoxIA Agency
   Funciones: animaciones por scroll, contador numérico y navegación suave
   ========================================================================= */

/* --- Scroll Reveal --- */
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) el.classList.add('visible');
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* --- Contador de estadísticas --- */
const counters = document.querySelectorAll('.kpi');
let countersActivated = false;

function animateCounters() {
  if (countersActivated) return;
  const section = document.querySelector('#resultados');
  const sectionTop = section.getBoundingClientRect().top;
  if (sectionTop < window.innerHeight * 0.8) {
    countersActivated = true;
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let current = 0;
      const increment = target / 100;
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.round(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      updateCounter();
    });
  }
}
window.addEventListener('scroll', animateCounters);

/* --- Navegación suave (solo anclas internas) --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

/* --- Modo accesible: reducir animaciones si el usuario lo solicita --- */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('*').forEach(el => el.style.transition = 'none');
}

/* --- Seguridad: evitar salto de página al cargar --- */
window.addEventListener('load', () => window.scrollTo(0, 0));
// === Hamburger Menu ===
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});
// === Cerrar menú al hacer clic en un enlace ===
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

