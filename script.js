
// Theme Toggle with persistence
(function(){
  const btn = document.querySelector('.theme-toggle');
  const KEY = 'theme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const getTheme = () => document.documentElement.getAttribute('data-theme') || (prefersDark.matches ? 'dark' : 'light');
  const apply = (t) => {
    document.documentElement.setAttribute('data-theme', t);
    const icon = btn && btn.querySelector('.icon');
    if(icon){
      icon.textContent = t === 'dark' ? '🌙' : '☀️';
    }
    if(btn){
      btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      btn.title = t === 'dark' ? 'Switch to light' : 'Switch to dark';
    }
  };
  try {
    const saved = localStorage.getItem(KEY);
    apply(saved || getTheme());
  } catch(e){ /* ignore */ }

  if(btn){
    btn.addEventListener('click', () => {
      const next = getTheme() === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(KEY, next); } catch(e){ /* ignore */ }
      apply(next);
    });
  }

  // Keep in sync if user changes OS theme while page is open
  try {
    prefersDark.addEventListener('change', (e) => {
      const saved = localStorage.getItem(KEY);
      if(!saved){ apply(e.matches ? 'dark' : 'light'); }
    });
  } catch(e){ /* Safari <14 fallback not required */ }
})();

// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});
