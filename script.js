document.addEventListener('DOMContentLoaded', function() {
            // SYSTEM 1: CINEMATIC HERO ENTRANCE
            document.querySelectorAll('.hero-name').forEach(function(el) {
                var originalText = el.textContent.trim();
                if (!originalText) return;
                var words = originalText.split(' ');
                el.innerHTML = words.map(function(word) {
                    var spans = word.split('').map(function(letter, i) {
                        return '<span class="char" style="animation-delay:' + (i * 0.04 + 0.2) + 's;">' + (letter === ' ' ? '&nbsp;' : letter) + '</span>';
                    }).join('');
                    return '<span style="display:inline-block;margin-right:0.3em;white-space:nowrap;">' + spans + '</span>';
                }).join('');
            });
            setTimeout(function() {
                document.querySelectorAll('.char').forEach(function(c) {
                    c.style.opacity = '1'; c.style.transform = 'none';
                    var col = window.getComputedStyle(c).color;
                    if (!col || col === 'transparent' || col === 'rgba(0, 0, 0, 0)') {
                        c.style.setProperty('color', 'var(--text, #ffffff)', 'important');
                        c.style.setProperty('-webkit-text-fill-color', 'var(--text, #ffffff)', 'important');
                    }
                });
            }, 3000);

            // SIGNATURE ANIMATION: Conic Hue Shift
            let hue = 255;
            const bgLayer = document.querySelector('.bg-conic-hue');
            function conicSpin() {
                if (bgLayer) {
                    hue = (hue + 0.1) % 360;
                    bgLayer.style.setProperty('--hue', String(hue));
                }
                requestAnimationFrame(conicSpin);
            }
            conicSpin();
            
            // SYSTEM 2: SCROLL-TRIGGERED REVEALS
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.transitionDelay = entry.target.dataset.delay || '0s';
                        entry.target.classList.add('revealed');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate').forEach(el => revealObserver.observe(el));

            // SYSTEM 4: MOUSE PARALLAX
            let mouseX = 0, mouseY = 0;
            document.addEventListener('mousemove', e => {
                mouseX = (e.clientX / window.innerWidth - 0.5);
                mouseY = (e.clientY / window.innerHeight - 0.5);
                document.querySelectorAll('[data-speed]').forEach(el => {
                    const s = parseFloat(el.dataset.speed) || 0.5;
                    el.style.transform = 'translate(' + (mouseX * s * -30) + 'px, ' + (mouseY * s * -30) + 'px)';
                });
            });

            // SYSTEM 5: STAT COUNTER ANIMATION
            function animateCounter(el) {
                var rawTarget = el.dataset.target;
                var target = rawTarget !== undefined && rawTarget !== '' ? parseFloat(rawTarget) : NaN;
                if (isNaN(target)) {
                    var nums = (el.dataset.originalText || el.textContent).match(/[0-9.]+/);
                    target = nums ? parseFloat(nums[0]) : 0;
                }
                if (isNaN(target)) target = 0;
                var suffix = el.dataset.suffix || '';
                var prefix = el.dataset.prefix || '';
                var dur = 1600;
                var startTime = performance.now();
                var easeOut = function(t) { return 1 - Math.pow(1 - t, 3); };
                function tick(now) {
                    var t = Math.min((now - startTime) / dur, 1);
                    var val = Math.round(target * easeOut(t));
                    el.textContent = prefix + val + suffix;
                    if (t < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            }
            const counterObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(e) {
                    if (e.isIntersecting) {
                        animateCounter(e.target);
                        counterObserver.unobserve(e.target);
                    }
                });
            }, { threshold: 0.4 });
            document.querySelectorAll('.stat-number').forEach(function(el) {
                el.dataset.originalText = el.textContent.trim();
                var numMatch = el.dataset.originalText.match(/^([0-9.]+)/);
                el.dataset.target = numMatch ? numMatch[1] : '0';
                counterObserver.observe(el);
            });

            // SYSTEM 6: GLASSMORPHISM NAV + CARD HOVER
            const nav = document.querySelector('nav');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 60) {
                    nav.style.cssText = 'background:rgba(var(--bgRgb),0.75);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 1px 30px rgba(0,0,0,0.15);padding: 1rem 0;';
                } else {
                    nav.style.cssText = 'background:transparent;backdrop-filter:none;box-shadow:none;padding: 1.5rem 0;';
                }
            });

            document.querySelectorAll('.tilt-card').forEach(card => {
                card.addEventListener('mousemove', e => {
                    const r = card.getBoundingClientRect();
                    const rx = ((e.clientX - r.left) / r.width - 0.5) * 8;
                    const ry = ((e.clientY - r.top) / r.height - 0.5) * 8;
                    card.style.transform = 'perspective(1000px) rotateX(' + (-ry) + 'deg) rotateY(' + rx + 'deg) scale(1.02)';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                });
            });

            // ADVANCED EFFECT: PAGE PROGRESS BAR
            const progressBar = document.querySelector('.progress-bar');
            window.addEventListener('scroll', () => {
                const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
                progressBar.style.width = scrollPercent + '%';
            });
        });
    
(function(){
  var nav=document.querySelector('nav,[class*="nav"],[class*="header"]');
  if(nav){
    window.addEventListener('scroll',function(){
      if(window.scrollY>60){nav.style.background='rgba(var(--bgRgb),0.75)';nav.style.backdropFilter='blur(16px)';nav.style.boxShadow='0 1px 30px rgba(0,0,0,0.15)';}
      else{nav.style.background='transparent';nav.style.backdropFilter='none';nav.style.boxShadow='none';}
    });
  }
})();

(function(){
  var nav=document.querySelector('nav,[class*="nav"],[class*="header"]');
  if(nav){
    window.addEventListener('scroll',function(){
      if(window.scrollY>60){nav.style.background='rgba(0,0,0,0.85)';nav.style.backdropFilter='blur(20px)';nav.style.boxShadow='0 4px 30px rgba(0,0,0,0.15)';}
      else{nav.style.background='transparent';nav.style.backdropFilter='none';nav.style.boxShadow='none';}
    });
  }
})();