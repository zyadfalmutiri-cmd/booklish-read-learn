/**
 * Anti-FOUC theme + language initialization.
 * Runs as an inline script BEFORE React hydration so the user never sees
 * a flash of the wrong theme or wrong text direction on route changes
 * or hard refreshes.
 */
export const THEME_INIT_SCRIPT = `(function(){try{
  var raw = localStorage.getItem('booklish.settings');
  var s = raw ? JSON.parse(raw) : null;
  var theme = (s && s.theme) || 'light';
  var lang = (s && s.uiLanguage) || 'ar';
  var root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
  root.lang = lang;
  root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  root.style.colorScheme = theme;
}catch(e){}})();`;
