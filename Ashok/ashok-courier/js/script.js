/**
 * ASHOK COURIER SERVICES - Main Interactive JavaScript
 * Global utilities, Navigation, Toasts, Session Status, Counters
 */

document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  initBackToTop();
  initCounters();
  initQuickTracking();
  initAuthUI();
  initNewsletter();
});

/* ==========================================================================
   Navbar & Sticky Header
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.main-navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Active link highlighters
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link-custom');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ==========================================================================
   Back To Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   Animated Statistics Counters
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  let hasAnimated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000;
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.innerText = formatCounterNumber(target);
              clearInterval(timer);
            } else {
              counter.innerText = formatCounterNumber(Math.floor(current));
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

function formatCounterNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M+';
  } else if (num >= 1000) {
    return num.toLocaleString() + '+';
  }
  return num;
}

/* ==========================================================================
   Quick Tracking Redirect from Any Page / Hero
   ========================================================================== */
function initQuickTracking() {
  const quickTrackForm = document.getElementById('quickTrackForm');
  if (quickTrackForm) {
    quickTrackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = document.getElementById('quickTrackInput');
      if (input && input.value.trim()) {
        const trackId = encodeURIComponent(input.value.trim().toUpperCase());
        window.location.href = `tracking.html?id=${trackId}`;
      } else {
        showToast('Please enter a valid Tracking ID', 'error');
      }
    });
  }

  // Sample ID chip click helper
  const chips = document.querySelectorAll('.sample-id-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', function () {
      const id = this.getAttribute('data-id') || this.innerText.trim();
      const input = document.getElementById('quickTrackInput') || document.getElementById('trackIdInput');
      if (input) {
        input.value = id;
      }
      if (window.location.pathname.includes('tracking.html')) {
        if (typeof performTrackingSearch === 'function') {
          performTrackingSearch(id);
        }
      } else {
        window.location.href = `tracking.html?id=${encodeURIComponent(id)}`;
      }
    });
  });
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message, type = 'info', duration = 4000) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container-custom';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `custom-toast toast-${type}`;

  let icon = 'fa-info-circle text-primary';
  if (type === 'success') icon = 'fa-check-circle text-success';
  if (type === 'error') icon = 'fa-exclamation-triangle text-danger';

  toast.innerHTML = `
    <i class="fas ${icon} fa-lg"></i>
    <div style="flex-grow: 1;">
      <div style="font-weight: 600; font-size: 0.95rem; color: #0F172A;">${escapeHTML(message)}</div>
    </div>
    <button type="button" style="background:none; border:none; color:#94A3B8; cursor:pointer;" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function escapeHTML(str) {
  return String(str).replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ==========================================================================
   User Session / Auth UI in Header
   ========================================================================== */
function initAuthUI() {
  const authContainer = document.getElementById('navAuthContainer');
  if (!authContainer) return;

  const currentUserJson = localStorage.getItem('acs_current_user');
  if (currentUserJson) {
    try {
      const user = JSON.parse(currentUserJson);
      authContainer.innerHTML = `
        <div class="dropdown">
          <button class="user-menu-btn dropdown-toggle" type="button" id="userMenuDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="user-avatar-sm">${user.name.charAt(0).toUpperCase()}</span>
            <span>${escapeHTML(user.name.split(' ')[0])}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="userMenuDropdown" style="border-radius: 12px; padding: 10px;">
            <li class="px-3 py-2 text-muted" style="font-size: 0.8rem; border-bottom: 1px solid #E2E8F0;">
              Signed in as<br><strong class="text-dark">${escapeHTML(user.email)}</strong>
            </li>
            <li><a class="dropdown-item py-2 mt-1" href="booking.html"><i class="fas fa-box me-2 text-primary"></i> Book Courier</a></li>
            <li><a class="dropdown-item py-2" href="tracking.html"><i class="fas fa-search-location me-2 text-primary"></i> Track Parcels</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item py-2 text-danger" href="javascript:void(0)" onclick="logoutUser()"><i class="fas fa-sign-out-alt me-2"></i> Sign Out</a></li>
          </ul>
        </div>
      `;
    } catch (e) {
      console.error(e);
    }
  } else {
    authContainer.innerHTML = `
      <a href="login.html" class="btn btn-sm btn-outline-navy me-2">
        <i class="fas fa-user me-1"></i> Login
      </a>
      <a href="register.html" class="btn btn-sm btn-orange">
        Register
      </a>
    `;
  }
}

function logoutUser() {
  localStorage.removeItem('acs_current_user');
  showToast('You have been logged out successfully.', 'info');
  setTimeout(() => {
    window.location.reload();
  }, 800);
}

/* ==========================================================================
   Newsletter Subscription
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        showToast('Thank you for subscribing to Ashok Courier alerts & offers!', 'success');
        emailInput.value = '';
      }
    });
  }
}

