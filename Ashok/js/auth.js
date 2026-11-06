/**
 * ASHOK COURIER SERVICES - Simulated Authentication System
 * Uses localStorage to demonstrate registration, login, and session persistence
 */

const DEMO_USER = {
  name: "Ashok Verma",
  email: "ashok.client@courier.com",
  phone: "+91 98765 43210",
  password: "password123",
  role: "Corporate Shipper"
};

// Seed demo user if no users exist
function initUserDatabase() {
  const users = localStorage.getItem('acs_users');
  if (!users) {
    localStorage.setItem('acs_users', JSON.stringify([DEMO_USER]));
  }
}

document.addEventListener('DOMContentLoaded', function () {
  initUserDatabase();
  initLoginForm();
  initRegisterForm();
  initDemoLoginBtn();
});

// Login Form Handling
function initLoginForm() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const submitBtn = loginForm.querySelector('button[type="submit"]');

    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i> Signing in...`;

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('acs_users') || '[]');
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

      submitBtn.disabled = false;
      submitBtn.innerHTML = `Sign In <i class="fas fa-arrow-right ms-2"></i>`;

      if (user) {
        // Save current session
        const sessionData = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role || 'Individual Shipper',
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('acs_current_user', JSON.stringify(sessionData));

        showToast(`Welcome back, ${user.name}!`, 'success');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      } else {
        showToast('Invalid email or password. Try the Quick Demo account!', 'error');
      }
    }, 800);
  });
}

// Quick Demo Login Helper
function initDemoLoginBtn() {
  const demoBtn = document.getElementById('quickDemoLoginBtn');
  if (!demoBtn) return;

  demoBtn.addEventListener('click', function () {
    const emailField = document.getElementById('loginEmail');
    const passField = document.getElementById('loginPassword');

    if (emailField && passField) {
      emailField.value = DEMO_USER.email;
      passField.value = DEMO_USER.password;
      showToast('Demo credentials autofilled. Click "Sign In"!', 'info');
    }
  });
}

// Registration Form Handling
function initRegisterForm() {
  const registerForm = document.getElementById('registerForm');
  if (!registerForm) return;

  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const role = document.getElementById('regAccountType') ? document.getElementById('regAccountType').value : 'Individual Shipper';
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const terms = document.getElementById('regTerms');
    const submitBtn = registerForm.querySelector('button[type="submit"]');

    if (!terms || !terms.checked) {
      showToast('Please agree to the Terms of Service to proceed', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match. Please re-enter', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i> Creating Account...`;

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('acs_users') || '[]');
      const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (existing) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Register Account <i class="fas fa-arrow-right ms-2"></i>`;
        showToast('An account with this email already exists. Please log in.', 'error');
        return;
      }

      const newUser = {
        name: name,
        email: email,
        phone: phone,
        password: password,
        role: role
      };

      users.push(newUser);
      localStorage.setItem('acs_users', JSON.stringify(users));

      // Auto sign in new user
      const sessionData = {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('acs_current_user', JSON.stringify(sessionData));

      submitBtn.disabled = false;
      submitBtn.innerHTML = `Account Created!`;

      showToast('Registration successful! Welcome to Ashok Courier.', 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    }, 900);
  });
}

