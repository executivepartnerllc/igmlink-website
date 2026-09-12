/**
 * IGM storefront — login destinations
 * ===================================
 * Juan / Admin: change the three URLs below when real Entra SSO / portal
 * addresses are ready. login.html and client-login.html read this file at
 * page load. No redesign required.
 *
 * TEAM_URL      IGM / Executive Partner staff → Cuevas Hub / internal M365
 * EMPLOYEE_URL  Employee Portal + handbook / mandatory materials
 * CLIENT_URL    Client portal (Microsoft sign-in). The public door is
 *               client-login.html; this URL is the “continue” button there.
 *
 * Interim default for all three is Cuevas Hub until dedicated portals exist.
 * After you paste a new URL, commit and push — GitHub Pages picks it up.
 */
(function () {
  var DESTINATIONS = {
    TEAM_URL: "https://executiveptr.sharepoint.com/sites/CuevasHub/",
    EMPLOYEE_URL: "https://executiveptr.sharepoint.com/sites/CuevasHub/",
    CLIENT_URL: "https://executiveptr.sharepoint.com/sites/CuevasHub/"
  };

  window.IGM_LOGIN = DESTINATIONS;

  function apply() {
    document.querySelectorAll("[data-login-dest]").forEach(function (el) {
      var key = el.getAttribute("data-login-dest");
      var url = DESTINATIONS[key];
      if (url) {
        el.setAttribute("href", url);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
