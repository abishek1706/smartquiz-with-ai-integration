/* ============================================================
   SmartQuiz AI — login.js  |  Theme: Dashboard Light
   ============================================================ */

/* Starfield hidden in light theme — canvas is display:none in CSS */

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
    const ok  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    if (!val) {
      this.className = 'form-input';
      if (msg) { msg.className = 'field-msg'; msg.textContent = ''; }
    } else if (ok) {
      this.className = 'form-input is-ok';
      if (msg) { msg.className = 'field-msg is-ok'; msg.textContent = '✓ Looks good!'; }
    } else {
      this.className = 'form-input is-error';
      if (msg) { msg.className = 'field-msg is-err'; msg.textContent = 'Invalid email'; }
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
      if (msg) { msg.className = 'field-msg'; msg.textContent = ''; }
    } else if (val.length < 6) {
      this.className = 'form-input is-error';
      if (msg) { msg.className = 'field-msg is-err'; msg.textContent = 'Too short'; }
    } else {
      this.className = 'form-input is-ok';
      if (msg) { msg.className = 'field-msg is-ok'; msg.textContent = '✓ Looks good!'; }
    }
  });
}