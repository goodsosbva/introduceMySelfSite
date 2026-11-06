(function () {
  const docEl = document.documentElement;
  const storageKey = 'theme';
  const manualKey = 'theme:manual';
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

  const savedTheme = localStorage.getItem(storageKey);
  const manual = localStorage.getItem(manualKey) === '1';

  function currentSystemTheme() {
    return prefersDark && prefersDark.matches ? 'dark' : 'light';
  }

  function setTheme(theme, { persist = false } = {}) {
    docEl.setAttribute('data-theme', theme);
    updateToggleIcon(theme);
    if (persist) {
      localStorage.setItem(storageKey, theme);
      localStorage.setItem(manualKey, '1');
    }
  }

  function updateToggleIcon(theme) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    // Show the opposite icon as an affordance for switching
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // Initialize theme
  const initial = savedTheme || currentSystemTheme();
  setTheme(initial);

  // React to system changes only if user hasn't chosen manually
  if (prefersDark && typeof prefersDark.addEventListener === 'function') {
    prefersDark.addEventListener('change', (e) => {
      if (localStorage.getItem(manualKey) === '1') return;
      setTheme(e.matches ? 'dark' : 'light');
    });
  } else if (prefersDark && typeof prefersDark.addListener === 'function') {
    // Safari/older
    prefersDark.addListener((e) => {
      if (localStorage.getItem(manualKey) === '1') return;
      setTheme(e.matches ? 'dark' : 'light');
    });
  }

  // Toggle handler
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const now = docEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(now, { persist: true });
    });
  }

  // Reveal on scroll
  function addRevealClasses() {
    const candidates = document.querySelectorAll(
      '.box, .gallery .image, .banner .inner, section.wrapper .inner, .image.fit'
    );
    candidates.forEach((el) => el.classList.add('reveal'));
  }

  function setupObserver() {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    elements.forEach((el) => io.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      addRevealClasses();
      setupObserver();
    });
  } else {
    addRevealClasses();
    setupObserver();
  }
})();
