const ICONS = { success:'✓', error:'✕', warning:'!', info:'i', debug:'?' };
const LABELS = { success:'Success', error:'Error', warning:'Warning', info:'Info', debug:'Debug' };
const DURATION = 5000;

function showToast(tag, message, level) {
  const lvl = ['success','error','warning','info','debug'].includes(level) ? level : 'info';
  const container = document.getElementById('sqToastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'sq-toast sq-' + lvl;
  toast.innerHTML =
    `<div class="sq-toast-icon">${ICONS[lvl]}</div>
     <div class="sq-toast-body">
       <div class="sq-toast-tag">${tag || LABELS[lvl]}</div>
       <div class="sq-toast-msg">${message}</div>
     </div>
     <button class="sq-toast-dismiss" aria-label="Dismiss">&times;</button>
     <div class="sq-toast-progress" style="animation-duration:${DURATION}ms"></div>`;

  container.appendChild(toast);

  const dismiss = () => {
    toast.classList.add('sq-hiding');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };

  toast.querySelector('.sq-toast-dismiss').addEventListener('click', dismiss);
  const timer = setTimeout(dismiss, DURATION);

  toast.addEventListener('mouseenter', () => {
    clearTimeout(timer);
    toast.querySelector('.sq-toast-progress').style.animationPlayState = 'paused';
  });
  toast.addEventListener('mouseleave', () => {
    setTimeout(dismiss, 1200);
    toast.querySelector('.sq-toast-progress').style.animationPlayState = 'running';
  });
}

// Auto-fire Django messages on page load
document.getElementById('sqToastContainer')
document.addEventListener('DOMContentLoaded', () => {
  if (typeof _djangoMessages !== 'undefined') {
    _djangoMessages.forEach((m, i) =>
      setTimeout(() => showToast(m.tag, m.text, m.level), i * 180)
    );
  }
});