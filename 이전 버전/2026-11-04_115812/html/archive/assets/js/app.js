// Additional app functionality and enhancements

(function() {
  'use strict';

  // Typing animation for hero title
  const TypingAnimation = {
    init() {
      const heroTitle = document.querySelector('.hero-title');
      if (!heroTitle) return;

      const originalText = heroTitle.innerHTML;
      const lines = originalText.split('<br />');
      
      // Only animate the first line
      if (lines.length > 0) {
        const firstLine = lines[0];
        const restOfTitle = lines.slice(1).join('<br />');
        
        heroTitle.innerHTML = `<span class="typing-text"></span><br />${restOfTitle}`;
        
        this.typeText(heroTitle.querySelector('.typing-text'), firstLine, 100);
      }
    },

    typeText(element, text, speed) {
      let i = 0;
      element.innerHTML = '';
      
      function type() {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(type, speed);
        } else {
          element.classList.add('typing-complete');
        }
      }
      
      setTimeout(type, 1000); // Start after 1 second
    }
  };

  // Particle background effect
  const ParticleBackground = {
    init() {
      this.createParticles();
    },

    createParticles() {
      const hero = document.querySelector('.hero');
      if (!hero) return;

      const particleContainer = document.createElement('div');
      particleContainer.className = 'particles';
      particleContainer.innerHTML = `
        <style>
          .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
          }
          
          .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
          }
          
          .particle:nth-child(odd) {
            animation-delay: -2s;
          }
          
          .particle:nth-child(3n) {
            animation-delay: -4s;
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            50% {
              transform: translateY(-100px) rotate(180deg);
            }
          }
          
          @media (prefers-reduced-motion: reduce) {
            .particle {
              animation: none;
              opacity: 0.3;
            }
          }
        </style>
      `;

      // Create particles
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particleContainer.appendChild(particle);
      }

      hero.appendChild(particleContainer);
    }
  };

  // Enhanced scroll effects
  const ScrollEffects = {
    init() {
      this.bindParallaxEffects();
      this.setupProgressIndicator();
    },

    bindParallaxEffects() {
      const heroImage = document.querySelector('.hero-image');
      if (!heroImage) return;

      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled < window.innerHeight) {
          heroImage.style.transform = `translateY(${rate}px)`;
        }
      });
    },

    setupProgressIndicator() {
      const progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      progressBar.innerHTML = `
        <style>
          .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4);
            z-index: 9999;
            transition: width 0.1s ease;
          }
        </style>
      `;
      
      document.body.appendChild(progressBar);

      window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
      });
    }
  };

  // Skill tag interactions
  const SkillInteractions = {
    init() {
      this.bindSkillHovers();
    },

    bindSkillHovers() {
      document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
          tag.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', () => {
          tag.style.transform = 'scale(1) rotate(0deg)';
        });
      });
    }
  };

  // Easter eggs and fun interactions
  const EasterEggs = {
    init() {
      this.setupKonamiCode();
      this.setupClickEffects();
    },

    setupKonamiCode() {
      const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
      ];
      let konamiIndex = 0;

      document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
          konamiIndex++;
          if (konamiIndex === konamiCode.length) {
            this.activatePartyMode();
            konamiIndex = 0;
          }
        } else {
          konamiIndex = 0;
        }
      });
    },

    activatePartyMode() {
      document.body.style.animation = 'rainbow 2s linear infinite';
      
      const style = document.createElement('style');
      style.textContent = `
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `;
      document.head.appendChild(style);

      setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
      }, 5000);

      // Show celebration message
      const message = document.createElement('div');
      message.textContent = '🎉 파티 모드 활성화! 🎉';
      message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        animation: bounce 0.5s ease;
      `;
      
      document.body.appendChild(message);
      
      setTimeout(() => {
        message.remove();
      }, 3000);
    },

    setupClickEffects() {
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('gradient-text')) {
          this.createClickEffect(e.clientX, e.clientY);
        }
      });
    },

    createClickEffect(x, y) {
      const effect = document.createElement('div');
      effect.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #6366f1, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: clickRipple 0.6s ease-out forwards;
      `;
      
      const style = document.createElement('style');
      style.textContent = `
        @keyframes clickRipple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `;
      
      if (!document.querySelector('#click-effect-styles')) {
        style.id = 'click-effect-styles';
        document.head.appendChild(style);
      }
      
      document.body.appendChild(effect);
      
      setTimeout(() => {
        effect.remove();
      }, 600);
    }
  };

  // Performance monitoring
  const PerformanceMonitor = {
    init() {
      this.logLoadTime();
      this.setupLazyLoading();
    },

    logLoadTime() {
      window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`🚀 사이트 로딩 완료: ${Math.round(loadTime)}ms`);
        
        if (loadTime > 3000) {
          console.warn('⚠️ 로딩 시간이 3초를 초과했습니다. 최적화를 고려해보세요.');
        }
      });
    },

    setupLazyLoading() {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
    }
  };

  // Initialize all modules
  function initializeApp() {
    TypingAnimation.init();
    ParticleBackground.init();
    ScrollEffects.init();
    SkillInteractions.init();
    EasterEggs.init();
    PerformanceMonitor.init();
    
    console.log('🎯 MZ 자기소개 사이트 로딩 완료!');
    console.log('💡 팁: 코나미 코드를 입력해보세요! (↑↑↓↓←→←→BA)');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    initializeApp();
  }

})();
