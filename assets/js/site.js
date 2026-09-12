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

  function setupQuoteForms() {
    function quoteCfg() {
      return window.IGM_QUOTE || {};
    }

    document.querySelectorAll("[data-quote-form]").forEach(function (form) {
      var status = form.querySelector("[data-quote-status]");
      var submit = form.querySelector('button[type="submit"]');

      function setStatus(text, kind) {
        if (!status) {
          return;
        }
        status.hidden = !text;
        status.textContent = text || "";
        status.classList.toggle("is-error", kind === "error");
      }

      function mailtoHref(payload) {
        var subject = "Website Quote from " + (payload.name || "IGM website");
        var body = [
          "leadSource: " + payload.leadSource,
          "stage: " + payload.stage + " (do not auto-advance to Prospect)",
          "Name: " + payload.name,
          "Phone: " + payload.phone,
          "Email: " + payload.email,
          "Company / property: " + payload.company,
          "",
          payload.message
        ].join("\n");
        return (
          "mailto:" +
          notifyTo +
          "?cc=" +
          encodeURIComponent(notifyCc) +
          "&subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(body)
        );
      }

      function showSuccess() {
        var box = document.createElement("div");
        box.className = "quote-success";
        box.setAttribute("tabindex", "-1");
        box.setAttribute("role", "status");
        box.innerHTML =
          "<p class=\"kicker\"><span class=\"kicker-dot\" aria-hidden=\"true\"></span>Request received</p>" +
          "<h2>Thanks — we have your quote request.</h2>" +
          "<p>It is filed as a Sales Lead at <strong>Stage: Suspect</strong>. Juan is notified, with Nicolas copied. A person at IGM confirms a real prospect before anyone moves it to Prospect.</p>" +
          "<p><a class=\"btn btn-ghost\" href=\"tel:+18584054830\">Call (858) 405-4830</a></p>";
        form.hidden = true;
        form.insertAdjacentElement("afterend", box);
        box.focus();
      }

      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var cfg = quoteCfg();
        var webhook = String(cfg.QUOTE_WEBHOOK_URL || "").trim();
        var leadSource = cfg.LEAD_SOURCE || "Website Quote";
        var stage = cfg.STAGE || "Suspect";
        var notifyTo = cfg.NOTIFY_TO || "jcuevas@igmlink.com";
        var notifyCc = cfg.NOTIFY_CC || "nislas@igmlink.com";
        var data = new FormData(form);
        var company = String(data.get("company") || "").trim();
        var payload = {
          name: String(data.get("name") || "").trim(),
          phone: String(data.get("phone") || "").trim(),
          email: String(data.get("email") || "").trim(),
          company: company,
          property: company,
          message: String(data.get("message") || "").trim(),
          leadSource: leadSource,
          stage: stage,
          notifyTo: notifyTo,
          notifyCc: notifyCc,
          submittedAt: new Date().toISOString(),
          page: window.location.href
        };

        if (!webhook) {
          var missing = form.querySelector("[data-quote-mailto]");
          if (missing) {
            missing.setAttribute("href", mailtoHref(payload));
          }
          setStatus(
            "The quote desk is being connected. Call (858) 405-4830 or use the email backup below so Juan and Nicolas get this today.",
            "error"
          );
          return;
        }

        if (submit) {
          submit.disabled = true;
        }
        setStatus("Sending your request…");

        fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
          .then(function (response) {
            if (!response.ok) {
              throw new Error("Request failed");
            }
            showSuccess();
          })
          .catch(function () {
            setStatus(
              "We could not reach the quote desk just now. Call (858) 405-4830 or use the email backup — the message already includes Juan and Nicolas.",
              "error"
            );
            var backup = form.querySelector("[data-quote-mailto]");
            if (backup) {
              backup.setAttribute("href", mailtoHref(payload));
            }
          })
          .then(function () {
            if (submit) {
              submit.disabled = false;
            }
          });
      });
    });
  }

  setupQuoteForms();
})();
