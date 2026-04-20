/* SAFE STARFIELD */
const canvas = document.getElementById('starfield');

if (canvas) {
  const ctx = canvas.getContext('2d');
  let stars = [], W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random()
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.a})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }

  resize();
  initStars();
  drawStars();
  window.addEventListener('resize', () => {
    resize();
    initStars();
  });
}


/* EYE TOGGLE */
const eyeBtn = document.getElementById('eye1');

if (eyeBtn) {
  eyeBtn.addEventListener('click', function () {
    const inp = document.getElementById('password');
    if (!inp) return;

    const show = inp.type === 'password';
    inp.type = show ? 'text' : 'password';
    this.textContent = show ? '🙈' : '👁';
  });
}


/* EMAIL VALIDATION */
const emailInput = document.getElementById('email');
if (emailInput) {
  emailInput.addEventListener('input', function () {
    const msg = document.getElementById('emailMsg');
    const val = this.value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

    if (!val) {
      this.className = 'form-input';
      msg.textContent = '';
    } else if (ok) {
      this.className = 'form-input is-ok';
      msg.textContent = '✓ Looks good!';
    } else {
      this.className = 'form-input is-error';
      msg.textContent = 'Invalid email';
    }
  });
}


/* PASSWORD VALIDATION */
const passInput = document.getElementById('password');
if (passInput) {
  passInput.addEventListener('input', function () {
    const msg = document.getElementById('passwordMsg');
    const val = this.value;

    if (!val) {
      this.className = 'form-input';
      msg.textContent = '';
    } else if (val.length < 6) {
      this.className = 'form-input is-error';
      msg.textContent = 'Too short';
    } else {
      this.className = 'form-input is-ok';
      msg.textContent = '✓ Looks good!';
    }
  });
}