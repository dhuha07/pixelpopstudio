// base.js – Persistent dark / light theme handler for Pixel Pop Studio site
// Include this script in every HTML page (preferably right before the closing </body> tag):
// <script src="base.js"></script>

(function () {
  const root = document.documentElement;
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // Helper: apply the requested theme to <html>
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  // 1️⃣  Initial load – pick stored theme, otherwise fall back to system preference
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    applyTheme(storedTheme);
  } else {
    applyTheme(mediaQuery.matches ? 'dark' : 'light');
  }

  // 2️⃣  Attach toggle logic after DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleDark');
    if (!toggleBtn) return; // no button found on this page

    toggleBtn.addEventListener('click', () => {
      const isDark = root.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  });

  // 3️⃣  Keep in sync with system theme changes (only if user never set manual preference)
  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
