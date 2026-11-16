(function() {
  'use strict';

  // Theme management
  const ThemeManager = {
    init() {
      this.setupTheme();
      this.bindEvents();
    },

    setupTheme() {
      const savedTheme = localStorage.getItem('theme');
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const theme = savedTheme || systemTheme;
      
      this.setTheme(theme);
      
      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    },

    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      this.updateToggleIcon(theme);
    },

    updateToggleIcon(theme) {
      const toggle = document.getElementById('themeToggle');
      const icon = toggle?.querySelector('.theme-icon');
      if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      }
    },

    toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    },

    bindEvents() {
      const toggle = document.getElementById('themeToggle');
      if (toggle) {
        toggle.addEventListener('click', () => this.toggleTheme());
      }
    }
  };

  // Tab management
  const TabManager = {
    init() {
      this.setupTabs();
      this.bindEvents();
      this.updateIndicator();
    },

    setupTabs() {
      const urlHash = window.location.hash.slice(1);
      const validTabs = ['about', 'skills', 'experience', 'portfolio'];
      const activeTab = validTabs.includes(urlHash) ? urlHash : 'about';
      this.showTab(activeTab);
    },

    showTab(tabId) {
      // Hide all tabs
      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
      });
      
      // Remove active from all buttons
      document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Show selected tab
      const targetTab = document.getElementById(tabId);
      const targetButton = document.querySelector(`[data-tab="${tabId}"]`);
      
      if (targetTab && targetButton) {
        targetTab.classList.add('active');
        targetButton.classList.add('active');
        this.updateIndicator();
        
        // Update URL hash
        history.replaceState(null, null, `#${tabId}`);
      }
    },

    updateIndicator() {
      const activeButton = document.querySelector('.tab-button.active');
      const indicator = document.querySelector('.tab-indicator');
      
      if (activeButton && indicator) {
        const rect = activeButton.getBoundingClientRect();
        const containerRect = activeButton.parentElement.getBoundingClientRect();
        
        indicator.style.left = `${activeButton.offsetLeft}px`;
        indicator.style.width = `${activeButton.offsetWidth}px`;
      }
    },

    bindEvents() {
      document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
          const tabId = button.getAttribute('data-tab');
          this.showTab(tabId);
        });
      });

      // Handle window resize
      window.addEventListener('resize', () => {
        this.updateIndicator();
      });
    }
  };

  // Navigation and smooth scrolling
  const NavigationManager = {
    init() {
      this.bindNavigationEvents();
      this.bindScrollEvents();
      this.setupIntersectionObserver();
    },

    bindNavigationEvents() {
      // Handle navigation link clicks
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          this.scrollToSection(targetId);
        });
      });
    },

    bindScrollEvents() {
      // Smooth scroll for CTA button
      window.scrollToSection = (sectionId) => {
        this.scrollToSection(sectionId);
      };
    },

    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        const navHeight = document.querySelector('.nav-modern').offsetHeight;
        const elementPosition = element.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    },

    setupIntersectionObserver() {
      if (!('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Observe elements for animation
      const animateElements = document.querySelectorAll(
        '.about-card, .skill-category, .timeline-item, .portfolio-item, .link-card'
      );
      
      animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      });

      // Add animation styles
      const style = document.createElement('style');
      style.textContent = `
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Navigation scroll effect
  const NavigationEffects = {
    init() {
      this.bindScrollEffects();
    },

    bindScrollEffects() {
      let lastScrollY = window.scrollY;
      
      window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav-modern');
        const currentScrollY = window.scrollY;
        
        if (nav) {
          if (currentScrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.1)';
            nav.style.backdropFilter = 'blur(20px)';
          } else {
            nav.style.background = 'rgba(255, 255, 255, 0.08)';
            nav.style.backdropFilter = 'blur(20px)';
          }
        }
        
        lastScrollY = currentScrollY;
      });
    }
  };

  // Portfolio interactions
  const PortfolioManager = {
    init() {
      this.bindPortfolioEvents();
    },

    bindPortfolioEvents() {
      document.querySelectorAll('.portfolio-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const portfolioItem = btn.closest('.portfolio-item');
          const title = portfolioItem.querySelector('.portfolio-info h3')?.textContent;
          
          // Simple modal or alert for now - can be enhanced
          alert(`${title} 프로젝트의 상세 정보를 준비 중입니다.`);
        });
      });
    }
  };

  // Initialize everything when DOM is ready
  function initialize() {
    ThemeManager.init();
    NavigationManager.init();
    NavigationEffects.init();
    PortfolioManager.init();
    
    // Initialize progress bars animation
    setTimeout(() => {
      document.querySelectorAll('.stat-fill, .progress-fill').forEach(fill => {
        const width = fill.getAttribute('data-width');
        if (width) {
          fill.style.setProperty('--width', width);
          fill.style.width = width;
        }
      });
    }, 1000);
    
    // Add loading complete class
    document.body.classList.add('loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  // Add initial loading styles
  const loadingStyle = document.createElement('style');
  loadingStyle.textContent = `
    body:not(.loaded) * {
      animation-play-state: paused !important;
    }
    
    .loaded {
      animation: fadeIn 0.5s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(loadingStyle);

})();
