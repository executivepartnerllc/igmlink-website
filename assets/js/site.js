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
      var wrap = video.closest(".bg-video");
      if (reduce) {
        video.removeAttribute("autoplay");
        video.pause();
        video.removeAttribute("src");
        video.load();
        if (wrap) {
          wrap.classList.remove("is-playing");
        }
        return;
      }
      var next = mobile
        ? video.getAttribute("data-src-mobile") || video.getAttribute("data-src-desktop")
        : video.getAttribute("data-src-desktop");
      if (next && video.getAttribute("src") !== next) {
        video.setAttribute("src", next);
        video.load();
      }
      video.muted = true;
      video.setAttribute("muted", "");
      video.onplaying = function () {
        if (wrap) {
          wrap.classList.add("is-playing");
        }
      };
      var play = video.play();
      if (play && play.catch) {
        play.catch(function () {});
      }
    });
  }

  setupBackgroundVideos();
  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", setupBackgroundVideos);
  window.matchMedia("(max-width: 760px)").addEventListener("change", setupBackgroundVideos);

  function setupQuoteSlider() {
    var root = document.querySelector("[data-quote-slider]");
    if (!root) {
      return;
    }
    var slides = Array.prototype.slice.call(root.querySelectorAll("[data-slide]"));
    var dots = Array.prototype.slice.call(root.querySelectorAll("[data-dot]"));
    var prev = root.querySelector("[data-prev]");
    var next = root.querySelector("[data-next]");
    var reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    var index = 0;
    var timer = null;
    var delay = 7000;

    function show(nextIndex) {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        var on = i === index;
        slide.classList.toggle("is-active", on);
        if (on) {
          slide.removeAttribute("hidden");
        } else {
          slide.setAttribute("hidden", "");
        }
      });
      dots.forEach(function (dot, i) {
        var on = i === index;
        dot.classList.toggle("is-active", on);
        dot.setAttribute("aria-selected", on ? "true" : "false");
      });
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      stop();
      if (reduceQuery.matches || slides.length < 2) {
        return;
      }
      timer = window.setInterval(function () {
        show(index + 1);
      }, delay);
    }

    if (prev) {
      prev.addEventListener("click", function () {
        show(index - 1);
        start();
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        show(index + 1);
        start();
      });
    }
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        show(i);
        start();
      });
    });
    root.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        show(index - 1);
        start();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        show(index + 1);
        start();
      }
    });
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", function (event) {
      if (!root.contains(event.relatedTarget)) {
        start();
      }
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    });
    reduceQuery.addEventListener("change", start);
    show(0);
    start();
  }

  setupQuoteSlider();

  function setupScrollStory() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    var items = document.querySelectorAll("[data-story]");
    var observer = null;

    function supportsViewTimeline() {
      try {
        return Boolean(
          window.CSS &&
            CSS.supports &&
            (CSS.supports("animation-timeline: view()") || CSS.supports("animation-timeline", "view()"))
        );
      } catch (err) {
        return false;
      }
    }

    function revealAll() {
      items.forEach(function (el) {
        el.classList.add("is-in");
      });
      document.documentElement.classList.remove("js-story");
    }

    function disconnect() {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    }

    function apply() {
      disconnect();
      if (reduce.matches || supportsViewTimeline() || !items.length || !("IntersectionObserver" in window)) {
        revealAll();
        return;
      }

      document.documentElement.classList.add("js-story");
      observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.14 }
      );
      items.forEach(function (el) {
        observer.observe(el);
      });
      window.setTimeout(revealAll, 4500);
    }

    apply();
    if (reduce.addEventListener) {
      reduce.addEventListener("change", apply);
    }
  }

  setupScrollStory();

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
