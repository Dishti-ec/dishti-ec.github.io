(function () {
  function postToGiscus(theme) {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe || !iframe.contentWindow) return false;
    try {
      iframe.contentWindow.postMessage(
        {
          giscus: {
            setConfig: {
              theme: theme === 'light' ? 'light' : 'dark_dimmed'
            }
          }
        },
        'https://giscus.app'
      );
      return true;
    } catch (_) {
      return false;
    }
  }

  var giscusRetryTimer;
  var pendingGiscusTheme;

  function updateGiscusTheme(theme) {
    pendingGiscusTheme = theme === 'light' ? 'light' : 'dark';
    if (giscusRetryTimer) {
      clearInterval(giscusRetryTimer);
      giscusRetryTimer = null;
    }
    function sendPending() {
      return postToGiscus(pendingGiscusTheme === 'light' ? 'light' : 'dark');
    }
    if (sendPending()) return;
    var n = 0;
    giscusRetryTimer = setInterval(function () {
      n += 1;
      if (sendPending() || n > 48) {
        clearInterval(giscusRetryTimer);
        giscusRetryTimer = null;
      }
    }, 250);
  }

  function applyHtmlTheme(theme) {
    const t = theme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = t;
    const toggle = document.getElementById('theme-switch');
    if (toggle) toggle.checked = t === 'light';
    updateGiscusTheme(t);
  }

  const toggle = document.getElementById('theme-switch');
  if (toggle) {
    toggle.addEventListener('change', function () {
      applyHtmlTheme(toggle.checked ? 'light' : 'dark');
    });
  }

  window.updateGiscusTheme = updateGiscusTheme;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      updateGiscusTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
    });
  } else {
    updateGiscusTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  }
})();
