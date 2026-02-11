// Preloader Removal
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// Side Menu Toggle
const hamburger = document.getElementById('hamburger');
const closeMenu = document.getElementById('closeMenu');
const sideMenu = document.getElementById('sideMenu');

if (hamburger && closeMenu && sideMenu) {
  hamburger.addEventListener('click', () => {
    sideMenu.classList.add('open');
  });

  closeMenu.addEventListener('click', () => {
    sideMenu.classList.remove('open');
  });
}

// Filter News Function
window.filterNews = function(category, button) {
  const cards = document.querySelectorAll('.news-card');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  if (button) button.classList.add('active');

  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block';
      card.setAttribute('data-aos', 'fade-up');
      AOS.refresh();
    } else {
      card.style.display = 'none';
    }
  });
};

// Toggle Read More Function
window.toggleReadMore = function(button) {
  const newsContent = button.closest('.news-content');
  if (!newsContent) return;

  const newsText = newsContent.querySelector('.news-text');
  if (!newsText) return;

  newsText.classList.toggle('expanded');
  button.innerHTML = newsText.classList.contains('expanded')
    ? '<i class="fas fa-book-open"></i> Lire moins'
    : '<i class="fas fa-book-open"></i> Lire plus';
};

// Toggle Like Function
window.toggleLike = function(button) {
  const icon = button.querySelector('i');
  const count = button.querySelector('.like-count');

  if (button.classList.contains('liked')) {
    button.classList.remove('liked');
    icon.classList.replace('fas', 'far');
    count.textContent = parseInt(count.textContent) - 1;
  } else {
    button.classList.add('liked');
    icon.classList.replace('far', 'fas');
    count.textContent = parseInt(count.textContent) + 1;

    // Add heart beat animation
    icon.classList.add('animate__animated', 'animate__heartBeat');
    setTimeout(() => {
      icon.classList.remove('animate__animated', 'animate__heartBeat');
    }, 1000);
  }
};

// Animated Counter for Stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target') ||
      (counter.id === 'population-count' ? 4627 :
       counter.id === 'area-count' ? 15 :
       counter.id === 'chiefs-count' ? 17 : 2));

    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(animateCounters, 1);
    } else {
      counter.innerText = target;
    }
  });
}

// Run counters when stats section is in view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  observer.observe(statsSection);
}

// Sticky Navigation
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.main-nav');
  if (nav) {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });

      // Close side menu if open
      if (sideMenu) sideMenu.classList.remove('open');
    }
  });
});

// Check for new content since last visit
document.addEventListener('DOMContentLoaded', () => {
  const lastVisit = localStorage.getItem('lastVisit');
  const now = new Date().toISOString();
  let hasNewContent = false;

  document.querySelectorAll('.news-card').forEach(card => {
    const date = card.getAttribute('data-news-date');
    if (!lastVisit || date > lastVisit) {
      hasNewContent = true;
      card.classList.add('new-content');
    }
  });

  if (hasNewContent) {
    const filterBar = document.querySelector('.filter-bar');
    if (filterBar) {
      const alert = document.createElement('div');
      alert.className = 'news-alert animate__animated animate__pulse';
      alert.innerHTML = '🆕 Nouveau contenu disponible depuis votre dernière visite !';
      filterBar.after(alert);
    }
  }

  localStorage.setItem('lastVisit', now);
});
