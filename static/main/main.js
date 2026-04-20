/* ============================================================
   SmartQuiz AI — script.js  |  Theme: Nebula Purple
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. STARFIELD (purple-tinted stars) ── */
  const canvas = document.getElementById('starfield');
  const ctx    = canvas.getContext('2d');
  let stars = [], W, H;

  function resize()    { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function initStars() {
    stars = [];
    for (let i = 0; i < 240; i++) {
      stars.push({
        x:    Math.random() * W,
        y:    Math.random() * H,
        r:    Math.random() * 1.4 + 0.2,
        a:    Math.random(),
        spd:  Math.random() * 0.3 + 0.04,
        td:   Math.random() > 0.5 ? 1 : -1,
        ts:   Math.random() * 0.018 + 0.004,
        // mix of lavender, violet, and white hues
        hue:  ['220,160,255','200,140,255','240,200,255'][Math.floor(Math.random()*3)]
      });
    }
  }
  function drawStars() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.a += s.ts * s.td;
      if (s.a >= 1)    { s.a = 1;    s.td = -1; }
      if (s.a <= 0.05) { s.a = 0.05; s.td =  1; }
      s.y -= s.spd;
      if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W; }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.hue},${s.a})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }
  resize(); initStars(); drawStars();
  window.addEventListener('resize', () => { resize(); initStars(); });


  /* ── 2. NAVBAR ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20
      ? '0 0 40px rgba(168,85,247,0.1)' : '';
  }, { passive: true });


  /* ── 3. HAMBURGER ── */
  const hbg = document.getElementById('hamburger');
  const mm  = document.getElementById('mobileMenu');
  hbg.addEventListener('click', () => {
    const o = mm.classList.toggle('open');
    const b = hbg.querySelectorAll('span');
    b[0].style.transform = o ? 'translateY(7px) rotate(45deg)'  : '';
    b[1].style.opacity   = o ? '0' : '';
    b[2].style.transform = o ? 'translateY(-7px) rotate(-45deg)': '';
  });
  mm.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
    mm.classList.remove('open');
    hbg.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }));


  /* ── 4. SCROLL REVEAL ── */
  document.querySelectorAll('.reveal').forEach(el => {
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const d = parseInt(e.target.dataset.d) || 0;
        setTimeout(() => {
          e.target.classList.add('vis');
          e.target.style.transition = `opacity .55s ${d}ms ease, transform .55s ${d}ms ease`;
        }, d);
      });
    }, { threshold: 0.12 }).observe(el);
  });


  /* ── 5. SCORE COUNTER ANIMATION ── */
  let sv = 55;
  const sEl = document.getElementById('scoreNum');
  if (sEl) {
    const t = setInterval(() => {
      sv += 2;
      if (sv >= 92) { sv = 92; clearInterval(t); }
      sEl.textContent = sv;
    }, 45);
  }


  /* ── 6. UPLOAD DRAG & DROP ── */
  const ub = document.getElementById('uploadBox');
  const fi = document.getElementById('fileInput');
  const us = document.getElementById('uploadStatus');

  if (ub && fi && us) {
    ub.addEventListener('dragover',  e  => { e.preventDefault(); ub.classList.add('drag-over'); });
    ub.addEventListener('dragleave', () => ub.classList.remove('drag-over'));
    ub.addEventListener('drop',      e  => {
      e.preventDefault(); ub.classList.remove('drag-over');
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });
    fi.addEventListener('change', () => { if (fi.files[0]) handleFile(fi.files[0]); });

    function handleFile(file) {
      const ext = '.' + file.name.split('.').pop().toLowerCase();
      if (!['.pdf', '.doc', '.docx', '.txt'].includes(ext)) {
        us.style.color   = '#e07070';
        us.textContent   = '⚠ Unsupported file. Please use PDF, DOCX, or TXT.';
        return;
      }
      us.style.color = '#a855f7';
      us.textContent = `⏳ Processing "${file.name}"...`;
      setTimeout(() => {
        us.textContent = `✓ "${file.name}" ready! Generating quiz...`;
        setTimeout(() => { us.textContent = `🎉 Quiz generated! 15 questions ready.`; }, 1800);
      }, 1400);
    }
  }


  /* ── 7. CTA BUTTON ── */
  const ctaBtn = document.getElementById('ctaBtn');
  const ctaInp = document.getElementById('ctaInp');
  if (ctaBtn && ctaInp) {
    ctaBtn.addEventListener('click', () => {
      const v = ctaInp.value.trim();
      if (!v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        ctaInp.style.borderColor = '#e07070';
        ctaInp.style.boxShadow   = '0 0 0 3px rgba(224,112,112,.15)';
        ctaInp.focus();
        setTimeout(() => { ctaInp.style.borderColor = ''; ctaInp.style.boxShadow = ''; }, 1800);
        return;
      }
      const orig = ctaBtn.textContent;
      ctaBtn.textContent = 'Creating...'; ctaBtn.disabled = true; ctaBtn.style.opacity = '.75';
      setTimeout(() => {
        ctaBtn.textContent = '🎉 Welcome!'; ctaBtn.style.opacity = '1'; ctaInp.value = '';
        setTimeout(() => { ctaBtn.textContent = orig; ctaBtn.disabled = false; }, 3000);
      }, 1500);
    });
  }


  /* ── 8. MOUSE PARALLAX ON ROBOT ── */
  const robotEl = document.getElementById('robot');
  let rafId = null;
  document.addEventListener('mousemove', e => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      if (!robotEl) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) *  9;
      robotEl.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
  });


  /* ── 9. ACTIVE NAV LINK ── */
  document.querySelectorAll('section[id]').forEach(sec => {
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          document.querySelectorAll('.nav-links a').forEach(l => {
            l.style.color = l.getAttribute('href') === '#' + e.target.id
              ? 'var(--violet)' : '';
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' }).observe(sec);
  });

});
