(function () {
  var script = document.currentScript;
  var gaId = "";

  if (script && script.src) {
    try {
      gaId = new URL(script.src, window.location.href).searchParams.get("gaId") || "";
    } catch {
      gaId = "";
    }
  }

  if (!gaId) {
    return;
  }

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = window.gtag || gtag;
  gtag("js", new Date());
  gtag("config", gaId, { anonymize_ip: true });
})();
