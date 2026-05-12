// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.course-card, .feature-card, .testimonial-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  
  // Here you would typically send the data to a server
  // For now, we'll just show a success message
  alert('Thank you for your interest! Our team will contact you soon via WhatsApp or email.');
  
  // Reset form
  contactForm.reset();
});

// ===== COURSE CARD HOVER EFFECT =====
document.querySelectorAll('.course-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-6px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// ===== STATS COUNTER ANIMATION =====
const stats = document.querySelectorAll('.stat-num');
let hasAnimated = false;

const animateStats = () => {
  if (hasAnimated) return;
  
  stats.forEach(stat => {
    const target = stat.textContent;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
    
    let current = 0;
    const increment = numericValue / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }
      
      let displayValue = Math.floor(current).toLocaleString();
      if (isPercentage) displayValue += '%';
      if (isPlus) displayValue += '+';
      
      stat.textContent = displayValue;
    }, 30);
  });
  
  hasAnimated = true;
};

// Trigger stats animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
    }
  });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  heroObserver.observe(heroStats);
}

// ===== INITIALIZE =====
console.log('Madverse MDCAT Platform loaded successfully! 🚀');
