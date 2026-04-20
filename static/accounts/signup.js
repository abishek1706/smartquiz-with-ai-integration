/* ============================================================
   SmartQuiz AI — signup.js  |  Theme: Nebula Purple
   ============================================================ */

/* ── STARFIELD ── */
const canvas = document.getElementById('starfield');
const ctx    = canvas.getContext('2d');
let stars = [], W, H;

function resize()    { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
function initStars() {
  stars = [];
  const hues = ['220,160,255','200,140,255','240,200,255'];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.3 + .2,
      a: Math.random(), spd: Math.random() * .25 + .04,
      td: Math.random() > .5 ? 1 : -1,
      ts: Math.random() * .016 + .004,
      hue: hues[Math.floor(Math.random() * 3)]
    });
  }
}
function drawStars() {
  ctx.clearRect(0, 0, W, H);
  stars.forEach(s => {
    s.a += s.ts * s.td;
    if (s.a >= 1)    { s.a = 1;    s.td = -1; }
    if (s.a <= .05)  { s.a = .05;  s.td =  1; }
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


/* ── EYE TOGGLE ── */
function setupEye(inputId, btnId) {
  document.getElementById(btnId).addEventListener('click', () => {
    const inp = document.getElementById(inputId);
    const btn = document.getElementById(btnId);
    const show = inp.type === 'password';
    inp.type  = show ? 'text' : 'password';
    btn.textContent = show ? '🙈' : '👁';
  });
}
setupEye('password', 'eye1');
setupEye('confirm',  'eye2');


/* ── VALIDATE EMAIL ── */
function validateEmail() {
  const el  = document.getElementById('email');
  const msg = document.getElementById('emailMsg');
  const v   = el.value.trim();
  if (!v) { el.className = 'form-input'; msg.className = 'field-msg'; msg.textContent = ''; return false; }
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  el.className  = 'form-input ' + (ok ? 'is-ok' : 'is-error');
  msg.className = 'field-msg '  + (ok ? 'is-ok' : 'is-err');
  msg.textContent = ok ? '✓ Looks good!' : 'Enter a valid email address';
  return ok;
}
document.getElementById('email').addEventListener('input', validateEmail);


/* ── PASSWORD STRENGTH ── */
const segs   = ['seg1','seg2','seg3','seg4'].map(id => document.getElementById(id));
const lvlCls = ['lv1','lv2','lv3','lv4'];
const lvlLbl = ['Weak','Fair','Good','Strong'];

function getScore(pw) {
  let s = 0;
  if (pw.length >= 8)        s++;
  if (/[A-Z]/.test(pw))      s++;
  if (/[0-9]/.test(pw))      s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

function validatePassword() {
  const el    = document.getElementById('password');
  const msg   = document.getElementById('passwordMsg');
  const lbl   = document.getElementById('strengthLabel');
  const v     = el.value;

  segs.forEach(s => s.className = 'strength-seg');
  lbl.textContent = '';

  if (!v) { el.className = 'form-input'; msg.className = 'field-msg'; msg.textContent = ''; return false; }

  const score = getScore(v);
  for (let i = 0; i < score; i++) segs[i].className = 'strength-seg ' + lvlCls[score - 1];
  lbl.textContent = lvlLbl[score - 1] || '';

  if (v.length < 8) {
    el.className  = 'form-input is-error';
    msg.className = 'field-msg is-err';
    msg.textContent = 'Password must be at least 8 characters';
    return false;
  }
  el.className  = 'form-input ' + (score >= 3 ? 'is-ok' : '');
  msg.className = 'field-msg ' + (score >= 3 ? 'is-ok' : '');
  msg.textContent = score >= 3 ? '✓ Strong password' : '';

  if (document.getElementById('confirm').value) validateConfirm();
  return v.length >= 8;
}
document.getElementById('password').addEventListener('input', validatePassword);


/* ── VALIDATE CONFIRM ── */
function validateConfirm() {
  const pw  = document.getElementById('password').value;
  const el  = document.getElementById('confirm');
  const msg = document.getElementById('confirmMsg');
  const v   = el.value;
  if (!v) { el.className = 'form-input'; msg.className = 'field-msg'; msg.textContent = ''; return false; }
  const match = pw === v;
  el.className  = 'form-input ' + (match ? 'is-ok'  : 'is-error');
  msg.className = 'field-msg '  + (match ? 'is-ok'  : 'is-err');
  msg.textContent = match ? '✓ Passwords match' : 'Passwords do not match';
  return match;
}
document.getElementById('confirm').addEventListener('input', validateConfirm);


/* ── SUBMIT ── */

document.addEventListener('keydown', e => { if (e.key === 'Enter') handleSubmit(); });

function handleSubmit() {
  const eOk = validateEmail();
  const pOk = validatePassword();
  const cOk = validateConfirm();
  if (!eOk || !pOk || !cOk) return;

  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Creating account…';
  btn.disabled    = true;

  setTimeout(() => {
    document.getElementById('formState').style.display  = 'none';
    const ss = document.getElementById('successState');
    ss.style.display = 'block';
    setTimeout(() => {
      document.getElementById('progressBar').style.width = '100%';
    }, 100);
  }, 1400);
}


/* ── GOOGLE ── */
document.getElementById('googleBtn').addEventListener('click', function () {
  this.textContent = 'Redirecting…';
  this.style.opacity = '.7';
  setTimeout(() => {
    this.innerHTML = `<svg width="17" height="17" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg> Continue with Google`;
    this.style.opacity = '1';
  }, 1200);
});