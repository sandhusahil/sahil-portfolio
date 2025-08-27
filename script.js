/* script.js — clean, modern JS for the portfolio */
(() => {
  const root = document.documentElement;
  const body = document.body;

  // theme persistence
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') root.setAttribute('data-theme','dark');

  function toggleTheme() {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme','light');
      themeToggle.setAttribute('aria-pressed','false');
    } else {
      root.setAttribute('data-theme','dark');
      localStorage.setItem('theme','dark');
      themeToggle.setAttribute('aria-pressed','true');
    }
  }
  themeToggle.addEventListener('click', toggleTheme);

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navMenu.setAttribute('aria-hidden','true');
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    const show = String(expanded ? 'true' : 'false') === 'true' ? false : true;
    // toggle via aria-hidden attribute to match CSS
    const hidden = navMenu.getAttribute('aria-hidden') === 'true';
    navMenu.setAttribute('aria-hidden', String(!hidden));
  });

  // Update copyright year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Accordion logic (skills)
  document.querySelectorAll('.accordion__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const panel = document.getElementById(targetId);
      const isOpen = panel.getAttribute('aria-hidden') === 'false';
      // close any open panels
      document.querySelectorAll('.accordion__panel').forEach(p => {
        p.style.display = 'none';
        p.setAttribute('aria-hidden','true');
      });
      // toggle current
      if (!isOpen) {
        panel.style.display = 'block';
        panel.setAttribute('aria-hidden','false');
      } else {
        panel.style.display = 'none';
        panel.setAttribute('aria-hidden','true');
      }
    });
  });

  // Modals
  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(modal) {
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  // attach modal openers
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-modal');
      openModal(id);
    });
  });
  // attach closers and overlay clicks
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
    modal.querySelectorAll('[data-close]').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => closeModal(modal));
    });
  });

  // Simple contact form handling (no backend) — client validation + friendly status
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill name, email and message.';
      return;
    }
    // Basic email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailPattern.test(email)) {
      formStatus.textContent = 'Please enter a valid email.';
      return;
    }

    // Simulate sending
    formStatus.textContent = 'Sending...';
    setTimeout(() => {
      formStatus.textContent = 'Thanks! Your message has been prepared (demo).';
      form.reset();
    }, 900);
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.getAttribute('aria-hidden') === 'false') {
        navMenu.setAttribute('aria-hidden','true');
        navToggle.setAttribute('aria-expanded','false');
      }
    });
  });

  // Smooth focus-visible for keyboard users
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') body.classList.add('user-is-tabbing');
  });

})();
