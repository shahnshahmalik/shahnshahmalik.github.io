(function () {
  "use strict";

  var SPAN = 104;
  var CHAPTERS = [
    { name: "Estater", start: 0, end: 27 },
    { name: "Prospecta", start: 32, end: 55 },
    { name: "Appcarry", start: 27, end: 80 },
    { name: "InnerSpace", start: 55, end: 104 }
  ];
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function dateFromIndex(index) {
    var abs = 2018 * 12 + 1 + index;
    return { year: Math.floor(abs / 12), month: abs % 12 };
  }

  function bindTabs(root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var vertical = root.getAttribute("data-orientation") === "vertical";
    if (!tabs.length) return;

    function activate(tab, focus) {
      tabs.forEach(function (item) {
        var on = item === tab;
        item.setAttribute("aria-selected", on ? "true" : "false");
        item.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(item.getAttribute("aria-controls"));
        if (!panel) return;
        panel.classList.toggle("is-active", on);
        panel.hidden = !on;
      });
      if (focus) tab.focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activate(tab, false);
      });
      tab.addEventListener("keydown", function (event) {
        var key = event.key;
        var next = null;
        if (vertical && (key === "ArrowDown" || key === "ArrowUp")) {
          next = key === "ArrowDown" ? tabs[(index + 1) % tabs.length] : tabs[(index - 1 + tabs.length) % tabs.length];
        }
        if (!vertical && (key === "ArrowRight" || key === "ArrowLeft")) {
          next = key === "ArrowRight" ? tabs[(index + 1) % tabs.length] : tabs[(index - 1 + tabs.length) % tabs.length];
        }
        if (key === "Home") next = tabs[0];
        if (key === "End") next = tabs[tabs.length - 1];
        if (!next) return;
        event.preventDefault();
        activate(next, true);
      });
    });

    var current = tabs.find(function (tab) {
      return tab.getAttribute("aria-selected") === "true";
    }) || tabs[0];
    activate(current, false);
  }

  document.querySelectorAll("[data-tabs]").forEach(bindTabs);

  var register = document.querySelector("[data-register]");
  var trackHost = register && register.querySelector("[data-track]");
  var scrub = register && register.querySelector("[data-scrub]");
  var scrubLabel = register && register.querySelector("[data-scrub-label]");
  function placeScrub(event) {
    if (!trackHost || !scrub) return;
    if (event.pointerType === "touch") return;
    var track = trackHost.querySelector(".lane-track");
    if (!track) return;
    var trackRect = track.getBoundingClientRect();
    var hostRect = trackHost.getBoundingClientRect();
    if (event.clientX < trackRect.left || event.clientX > trackRect.right) {
      scrub.hidden = true;
      register.classList.remove("is-scrubbing");
      return;
    }
    var ratio = (event.clientX - trackRect.left) / trackRect.width;
    ratio = Math.min(1, Math.max(0, ratio));
    var month = Math.round(ratio * SPAN);
    var when = dateFromIndex(month);
    var active = CHAPTERS.filter(function (chapter) {
      return month >= chapter.start && month <= chapter.end;
    }).map(function (chapter) {
      return chapter.name;
    });
    var x = trackRect.left - hostRect.left + ratio * trackRect.width;
    scrub.style.setProperty("--x", x + "px");
    scrubLabel.textContent = MONTHS[when.month] + " " + when.year + " · " + (active.join(" · ") || "—");
    scrub.classList.toggle("is-left", ratio < 0.18);
    scrub.classList.toggle("is-right", ratio > 0.72);
    scrub.hidden = false;
    register.classList.add("is-scrubbing");
  }

  if (trackHost) {
    trackHost.addEventListener("pointermove", placeScrub);
    trackHost.addEventListener("pointerleave", function () {
      scrub.hidden = true;
      register.classList.remove("is-scrubbing");
    });
  }

  var motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var lanes = document.querySelector(".lanes");
  if (lanes && !motion.matches && "IntersectionObserver" in window) {
    lanes.classList.add("will-draw");
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        lanes.classList.add("is-in");
        observer.disconnect();
      });
    }, { threshold: 0.35 });
    observer.observe(lanes);
  }

  var toggle = document.querySelector(".nav-toggle");
  var rail = document.querySelector(".rail");
  var panel = document.getElementById("rail-panel");
  var desktop = window.matchMedia("(min-width: 981px)");

  function closeNav(returnFocus) {
    if (!rail || !toggle) return;
    rail.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
    if (returnFocus) toggle.focus();
  }

  function openNav() {
    rail.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
    var first = panel.querySelector("a");
    if (first) first.focus();
  }

  if (toggle && rail && panel) {
    toggle.addEventListener("click", function () {
      if (rail.classList.contains("is-open")) closeNav(false);
      else openNav();
    });
    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && rail.classList.contains("is-open")) closeNav(true);
    });
    desktop.addEventListener("change", function () {
      if (desktop.matches) closeNav(false);
    });
  }

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".rail-nav a"));
  var sections = navLinks.map(function (link) {
    return document.querySelector(link.getAttribute("href"));
  }).filter(Boolean);

  function spy() {
    if (!sections.length) return;
    var mark = window.scrollY + 140;
    var current = sections[0];
    sections.forEach(function (section) {
      var top = section.getBoundingClientRect().top + window.scrollY;
      if (top <= mark) current = section;
    });
    navLinks.forEach(function (link) {
      var on = link.getAttribute("href") === "#" + current.id;
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  spy();
  window.addEventListener("scroll", spy, { passive: true });

  var copyButton = document.querySelector("[data-copy]");
  var copyStatus = document.querySelector(".copy-status");
  if (copyButton && copyStatus) {
    copyButton.addEventListener("click", function () {
      var value = copyButton.getAttribute("data-copy");
      function done(ok) {
        copyStatus.textContent = ok ? "Email copied." : "Copy failed — the address is selected.";
        copyButton.textContent = ok ? "Copied" : "Copy address";
        window.setTimeout(function () {
          copyButton.textContent = "Copy address";
        }, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    });
  }
})();
