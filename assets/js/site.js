(function () {
  var toggle = document.querySelector("[data-nav-toggle]");
  var panel = document.querySelector("[data-nav-panel]");
  var header = document.querySelector(".site-header");

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var open = panel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        panel.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function setupBackgroundVideos() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var mobile = window.matchMedia("(max-width: 760px)").matches;
    document.querySelectorAll("[data-bg-video]").forEach(function (video) {
      if (reduce) {
        video.removeAttribute("autoplay");
        video.pause();
        video.removeAttribute("src");
        video.load();
        return;
      }
      var next = mobile
        ? video.getAttribute("data-src-mobile") || video.getAttribute("data-src-desktop")
        : video.getAttribute("data-src-desktop");
      if (!next || video.getAttribute("src") === next) {
        return;
      }
      video.muted = true;
      video.setAttribute("muted", "");
      video.setAttribute("src", next);
      video.load();
      var play = video.play();
      if (play && play.catch) {
        play.catch(function () {});
      }
    });
  }

  setupBackgroundVideos();
  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", setupBackgroundVideos);
  window.matchMedia("(max-width: 760px)").addEventListener("change", setupBackgroundVideos);

  document.querySelectorAll("[data-quote-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var email = String(data.get("email") || "").trim();
      var phone = String(data.get("phone") || "").trim();
      var message = String(data.get("message") || "").trim();
      var subject = "Free quote request from " + (name || "IGM website");
      var body = [
        "Name: " + name,
        "Email: " + email,
        "Phone: " + phone,
        "",
        message
      ].join("\n");
      var mailto =
        "mailto:nislas@igmlink.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
      window.location.href = mailto;
    });
  });
})();
