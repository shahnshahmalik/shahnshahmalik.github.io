(function () {
  "use strict";

  var root = document.documentElement;
  var reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var wideQuery = window.matchMedia("(min-width: 1040px)");
  var fineQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  var SPAN = 104;
  var CHAPTERS = [
    { name: "Estater", start: 0, end: 27 },
    { name: "Prospecta", start: 32, end: 55 },
    { name: "Appcarry", start: 27, end: 80 },
    { name: "Upwork", start: 55, end: 104 }
  ];
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var ADDRESS = "shahenshah.malik@hotmail.com";
  var SKILL_HOLD = 0.06;

  var lenis = null;
  var ticker = null;
  var journeyDistance = 0;
  var chapterOffsets = [];
  var progressBar = document.querySelector("[data-progress]");
  var thesis = document.getElementById("thesis");
  var thesisCopy = document.querySelector("[data-thesis]");
  var practice = document.getElementById("practice");
  var journey = document.getElementById("journey");
  var skillLinks = Array.prototype.slice.call(document.querySelectorAll(".practice-index a"));
  var skillArticles = Array.prototype.slice.call(document.querySelectorAll(".skill-article"));
  var skillNow = document.querySelector("[data-skill-now]");
  var lanes = Array.prototype.slice.call(document.querySelectorAll(".lane"));
  var chapters = Array.prototype.slice.call(document.querySelectorAll(".chapter"));
  var chapterTrack = document.querySelector("[data-chapter-track]");
  var chapterWindow = document.querySelector("[data-chapter-window]");
  var nav = document.getElementById("nav");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  var sections = ["practice", "journey", "craft", "contact"].map(function (id) {
    return document.getElementById(id);
  });

  function wantsMotion() {
    return !reduceQuery.matches && wideQuery.matches && fineQuery.matches && window.gsap && window.ScrollTrigger && window.Lenis;
  }

  function dateFromIndex(index) {
    var abs = 2018 * 12 + 1 + index;
    return { year: Math.floor(abs / 12), month: abs % 12 };
  }

  function sectionRange(section) {
    var top = section.getBoundingClientRect().top + window.scrollY;
    var travel = Math.max(1, section.offsetHeight - window.innerHeight);
    return { top: top, travel: travel };
  }

  function scrollToY(y) {
    if (lenis) lenis.scrollTo(y, { force: true, lock: true, duration: 1.05 });
    else window.scrollTo({ top: y, behavior: reduceQuery.matches ? "auto" : "smooth" });
  }

  function scrollToProgress(section, progress) {
    var range = sectionRange(section);
    scrollToY(range.top + range.travel * Math.min(1, Math.max(0, progress)));
  }

  function setCurrent(nodes, index, attr) {
    nodes.forEach(function (node, i) {
      if (i === index) node.setAttribute(attr, "true");
      else node.removeAttribute(attr);
    });
  }

  function paintThesis(progress) {
    if (!thesisCopy) return;
    var words = thesisCopy.querySelectorAll(".word");
    if (!words.length) return;
    var revealUntil = 1 - SKILL_HOLD - 0.12;
    var f = Math.min(1, progress / revealUntil);
    var exact = f * words.length;
    var current = f >= 1 ? words.length : Math.floor(exact);
    words.forEach(function (word, i) {
      word.classList.toggle("is-on", i < current);
      word.classList.toggle("is-now", i === current && f < 1);
    });
  }

  function splitThesis() {
    if (!thesisCopy || thesisCopy.dataset.split === "true") return;
    var text = thesisCopy.textContent.replace(/\s+/g, " ").trim();
    thesisCopy.textContent = "";
    text.split(" ").forEach(function (part, index) {
      if (index) thesisCopy.appendChild(document.createTextNode(" "));
      var word = document.createElement("span");
      word.className = "word";
      word.textContent = part;
      thesisCopy.appendChild(word);
    });
    thesisCopy.dataset.split = "true";
  }

  function paintSkill(progress) {
    var span = 1 - SKILL_HOLD;
    var scaled = Math.min(span, progress) / span;
    var exact = scaled * skillArticles.length;
    var index = Math.min(skillArticles.length - 1, Math.floor(exact));
    var local = Math.min(1, Math.max(0, exact - index));
    skillArticles.forEach(function (article, i) {
      article.classList.toggle("is-active", i === index);
    });
    skillLinks.forEach(function (link, i) {
      if (i === index) {
        link.setAttribute("aria-current", "true");
        link.style.setProperty("--p", local.toFixed(3));
      } else {
        link.removeAttribute("aria-current");
        link.style.removeProperty("--p");
      }
    });
    if (skillNow) skillNow.textContent = String(index + 1).padStart(2, "0");
  }

  function layoutJourney() {
    if (!journey || !chapterTrack || !chapterWindow) return;
    chapterTrack.style.transform = "none";
    if (root.classList.contains("motion")) {
      var slide = chapterWindow.clientWidth;
      chapters.forEach(function (chapter) {
        chapter.style.flexBasis = slide + "px";
        chapter.style.maxWidth = slide + "px";
      });
    } else {
      chapters.forEach(function (chapter) {
        chapter.style.flexBasis = "";
        chapter.style.maxWidth = "";
      });
    }
    var distance = Math.max(0, chapterTrack.scrollWidth - chapterWindow.clientWidth);
    journeyDistance = distance;
    chapterOffsets = chapters.map(function (chapter) { return chapter.offsetLeft; });
    if (root.classList.contains("motion")) {
      journey.style.height = (window.innerHeight + distance * 1.2) + "px";
    }
    syncOverflow(chapters.concat(skillArticles));
  }

  function syncOverflow(nodes) {
    nodes.forEach(function (node) {
      if (node.scrollHeight > node.clientHeight + 8) node.setAttribute("data-lenis-prevent", "");
      else node.removeAttribute("data-lenis-prevent");
    });
  }

  function paintJourney(progress) {
    if (!chapterTrack || !chapters.length) return;
    var count = chapters.length;
    var span = 0.95;
    var scaled = Math.min(1, Math.max(0, progress / span));
    var exact = scaled * Math.max(1, count - 1);
    var index = Math.min(count - 1, Math.floor(exact + 0.0001));
    var local = exact - index;
    var travel = 0;
    if (index < count - 1) {
      var hold = 0.58;
      travel = local <= hold ? 0 : (local - hold) / (1 - hold);
      travel = travel * travel * (3 - 2 * travel);
    }
    var origin = chapterOffsets[0] || 0;
    var from = (chapterOffsets[index] || 0) - origin;
    var next = Math.min(count - 1, index + 1);
    var to = (chapterOffsets[next] || 0) - origin;
    var tx = -(from + (to - from) * travel);
    chapterTrack.style.transform = "translate3d(" + tx.toFixed(2) + "px,0,0)";
    var shown = travel > 0.55 ? next : index;
    chapters.forEach(function (chapter, i) {
      chapter.classList.toggle("is-active", i === shown);
    });
    setCurrent(lanes, shown, "aria-current");
  }

  function paintProgress() {
    if (!progressBar) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var value = max > 0 ? window.scrollY / max : 0;
    progressBar.style.transform = "scaleX(" + Math.min(1, Math.max(0, value)) + ")";
  }

  function spy() {
    var mark = window.scrollY + window.innerHeight * 0.35;
    var current = sections[0];
    sections.forEach(function (section) {
      if (!section) return;
      var top = section.getBoundingClientRect().top + window.scrollY;
      if (top <= mark) current = section;
    });
    navLinks.forEach(function (link) {
      var on = current && link.getAttribute("href") === "#" + current.id;
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    if (nav) nav.classList.toggle("is-paper", !!(current && current.id === "journey"));
    if (!root.classList.contains("motion")) {
      var skillMark = window.scrollY + window.innerHeight * 0.45;
      var skillIndex = 0;
      skillArticles.forEach(function (article, i) {
        var top = article.getBoundingClientRect().top + window.scrollY;
        if (top <= skillMark) skillIndex = i;
      });
      setCurrent(skillLinks, skillIndex, "aria-current");
      var chapterMark = skillMark;
      var chapterIndex = 0;
      chapters.forEach(function (chapter, i) {
        var top = chapter.getBoundingClientRect().top + window.scrollY;
        if (top <= chapterMark) chapterIndex = i;
      });
      setCurrent(lanes, chapterIndex, "aria-current");
    }
  }

  function destroyMotion() {
    if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(function (trigger) { trigger.kill(); });
    if (ticker && window.gsap) window.gsap.ticker.remove(ticker);
    ticker = null;
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }
    if (chapterTrack) chapterTrack.style.transform = "";
    if (journey) journey.style.height = "";
    root.classList.remove("armed");
  }

  function setupMotion() {
    window.gsap.registerPlugin(window.ScrollTrigger);
    root.classList.add("motion");
    root.classList.remove("soft");
    splitThesis();
    layoutJourney();

    lenis = new window.Lenis({
      autoRaf: false,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92
    });
    lenis.on("scroll", function () {
      window.ScrollTrigger.update();
      paintProgress();
      spy();
    });
    ticker = function (time) { lenis.raf(time * 1000); };
    window.gsap.ticker.add(ticker);
    window.gsap.ticker.lagSmoothing(0);

    window.ScrollTrigger.create({
      trigger: thesis,
      start: "top top",
      end: "bottom bottom",
      onUpdate: function (self) { paintThesis(self.progress); }
    });
    window.ScrollTrigger.create({
      trigger: practice,
      start: "top top",
      end: "bottom bottom",
      onUpdate: function (self) { paintSkill(self.progress); }
    });
    window.ScrollTrigger.create({
      trigger: journey,
      start: "top top",
      end: "bottom bottom",
      onUpdate: function (self) { paintJourney(self.progress); }
    });

    window.gsap.to(".hero-parallax", {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: "#top",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    root.classList.add("armed");
    paintThesis(0);
    paintSkill(0);
    paintJourney(0);
    window.ScrollTrigger.refresh();
    bindLifts();
    bindCursor();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        fitHero();
        layoutJourney();
        window.ScrollTrigger.refresh();
      });
    }
  }

  function bindLifts() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".lift").forEach(function (node) { node.classList.add("is-in"); });
      return;
    }
    var lifts = document.querySelectorAll(".lift");
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.35 });
    lifts.forEach(function (node) { observer.observe(node); });
  }

  function bindSoft() {
    if (!root.classList.contains("soft") || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (node) { node.classList.add("is-in"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (node) { observer.observe(node); });
  }

  function bindCursor() {
    var ring = document.querySelector(".cursor");
    if (!ring || !fineQuery.matches || reduceQuery.matches) return;
    var x = window.innerWidth / 2;
    var y = window.innerHeight / 2;
    var cx = x;
    var cy = y;
    var hot = false;
    var running = true;
    window.addEventListener("pointermove", function (event) {
      x = event.clientX;
      y = event.clientY;
      var target = event.target.closest("a, button");
      hot = !!target;
    }, { passive: true });
    document.addEventListener("pointerleave", function () { hot = false; });
    function loop() {
      if (!running) return;
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      var scale = hot ? 1.65 : 1;
      ring.style.transform = "translate3d(" + cx.toFixed(2) + "px," + cy.toFixed(2) + "px,0) scale(" + scale + ")";
      window.requestAnimationFrame(loop);
    }
    loop();
    document.querySelectorAll(".btn, .email").forEach(function (node) {
      node.addEventListener("pointermove", function (event) {
        var rect = node.getBoundingClientRect();
        var dx = (event.clientX - rect.left - rect.width / 2) * 0.28;
        var dy = (event.clientY - rect.top - rect.height / 2) * 0.4;
        node.style.transform = "translate3d(" + dx.toFixed(2) + "px," + dy.toFixed(2) + "px,0)";
      });
      node.addEventListener("pointerleave", function () {
        node.style.transform = "";
      });
    });
  }

  function fitHero() {
    var wide = wideQuery.matches;
    document.querySelectorAll("[data-fit]").forEach(function (el) {
      if (!wide) {
        el.style.fontSize = "";
        return;
      }
      var parent = el.parentElement;
      var available = parent ? parent.clientWidth : 0;
      if (!available) return;
      el.style.fontSize = "100px";
      var width = el.scrollWidth;
      if (!width) return;
      el.style.fontSize = ((available / width) * 100) + "px";
    });
  }

  function bindHeroLight() {
    var hero = document.getElementById("top");
    var word = document.querySelector(".hero-discipline");
    if (!hero || !word) return;
    hero.addEventListener("pointermove", function (event) {
      if (!root.classList.contains("motion")) return;
      if (event.pointerType === "touch") return;
      var rect = word.getBoundingClientRect();
      if (!rect.width) return;
      var x = ((event.clientX - rect.left) / rect.width) * 100;
      word.style.setProperty("--gx", (x - 14) + "%");
    });
    hero.addEventListener("pointerleave", function () {
      word.style.setProperty("--gx", "-45%");
    });
  }

  function bindScrub() {
    var register = document.querySelector("[data-register]");
    var trackHost = register && register.querySelector("[data-track]");
    var scrub = register && register.querySelector("[data-scrub]");
    var scrubLabel = register && register.querySelector("[data-scrub-label]");
    if (!trackHost || !scrub || !fineQuery.matches) return;

    function placeScrub(event) {
      if (event.pointerType === "touch") return;
      var track = trackHost.querySelector(".lane-track");
      if (!track) return;
      var trackRect = track.getBoundingClientRect();
      var hostRect = trackHost.getBoundingClientRect();
      if (event.clientX < trackRect.left || event.clientX > trackRect.right) {
        scrub.hidden = true;
        return;
      }
      var ratio = (event.clientX - trackRect.left) / trackRect.width;
      ratio = Math.min(1, Math.max(0, ratio));
      var month = Math.round(ratio * SPAN);
      var when = dateFromIndex(month);
      var active = CHAPTERS.filter(function (chapter) {
        return month >= chapter.start && month <= chapter.end;
      }).map(function (chapter) { return chapter.name; });
      var x = trackRect.left - hostRect.left + ratio * trackRect.width;
      scrub.style.setProperty("--x", x + "px");
      scrubLabel.textContent = MONTHS[when.month] + " " + when.year + " · " + (active.join(" · ") || "—");
      scrub.classList.toggle("is-left", ratio < 0.18);
      scrub.classList.toggle("is-right", ratio > 0.72);
      scrub.hidden = false;
    }

    trackHost.addEventListener("pointermove", placeScrub);
    trackHost.addEventListener("pointerleave", function () { scrub.hidden = true; });
  }

  function bindNav() {
    var toggle = document.querySelector(".nav-toggle");
    var panel = document.getElementById("nav-panel");
    if (!toggle || !nav || !panel) return;

    function closeNav(returnFocus) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
      if (returnFocus) toggle.focus();
    }

    function openNav() {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");
      var first = panel.querySelector("a");
      if (first) first.focus();
    }

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) closeNav(false);
      else openNav();
    });
    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) closeNav(true);
    });
    wideQuery.addEventListener("change", function () {
      if (wideQuery.matches) closeNav(false);
    });
  }

  function bindAnchorKeys() {
    var index = document.querySelector(".practice-index");
    if (!index) return;
    index.addEventListener("keydown", function (event) {
      var links = skillLinks;
      var current = links.indexOf(document.activeElement);
      if (current < 0) return;
      var next = null;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") next = links[(current + 1) % links.length];
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = links[(current - 1 + links.length) % links.length];
      if (event.key === "Home") next = links[0];
      if (event.key === "End") next = links[links.length - 1];
      if (!next) return;
      event.preventDefault();
      next.focus();
    });
  }

  function bindClicks() {
    document.addEventListener("click", function (event) {
      var link = event.target.closest("a[href^='#']");
      if (!link) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      var id = link.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (!el) return;
      if (!root.classList.contains("motion")) return;
      event.preventDefault();
      if (link.closest(".practice-index") && link.hasAttribute("data-index")) {
        var skillCount = skillArticles.length || 1;
        scrollToProgress(practice, (Number(link.getAttribute("data-index")) + 0.04) / skillCount);
        return;
      }
      if (link.classList.contains("lane")) {
        var count = chapters.length || 1;
        var laneIndex = Number(link.getAttribute("data-index")) || 0;
        var scaled = count > 1 ? laneIndex / (count - 1) : 0;
        scrollToProgress(journey, scaled * 0.95);
        var heading = el.querySelector("h3");
        if (heading) {
          heading.setAttribute("tabindex", "-1");
          heading.focus({ preventScroll: true });
        }
        return;
      }
      if (lenis) lenis.scrollTo(el, { offset: 0, force: true, lock: true, duration: 1.05 });
      else el.scrollIntoView();
    });
  }

  function copyWithCommand(value) {
    var active = document.activeElement;
    var area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.left = "0";
    area.style.width = "1px";
    area.style.height = "1px";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.focus();
    area.select();
    area.setSelectionRange(0, value.length);
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
    document.body.removeChild(area);
    if (active && active !== area && typeof active.focus === "function") active.focus();
    return ok;
  }

  function selectVisibleAddress(group) {
    var node = (group && group.querySelector(".email")) || document.querySelector(".email");
    if (!node) return;
    var range = document.createRange();
    range.selectNodeContents(node);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function showEmailResult(group, trigger, ok) {
    var note = group && group.querySelector("[data-email-status]");
    if (note) {
      note.textContent = ok
        ? "Copied " + ADDRESS
        : "Could not copy automatically. The address is selected. Press Ctrl+C, or Command+C on a Mac.";
    }
    if (!ok) selectVisibleAddress(group);
    if (!trigger) return;
    trigger.classList.toggle("is-copied", ok);
    if (trigger.hasAttribute("data-copy")) trigger.textContent = ok ? "Copied" : "Copy address";
    else if (!trigger.classList.contains("email")) {
      if (!trigger.dataset.label) trigger.dataset.label = trigger.textContent;
      trigger.textContent = ok ? "Copied" : trigger.dataset.label;
    }
    window.clearTimeout(trigger._emailTimer);
    if (trigger.hasAttribute("data-copy")) return;
    trigger._emailTimer = window.setTimeout(function () {
      trigger.classList.remove("is-copied");
      if (trigger.dataset.label && !trigger.classList.contains("email")) trigger.textContent = trigger.dataset.label;
    }, 6000);
  }

  function bindEmail() {
    document.querySelectorAll("[data-email], [data-copy]").forEach(function (control) {
      control.addEventListener("click", function () {
        var value = control.getAttribute("data-email") || control.getAttribute("data-copy");
        var group = control.closest("[data-email-group]");
        var legacyOk = copyWithCommand(value);
        if (legacyOk) showEmailResult(group, control, true);
        if (navigator.clipboard && window.isSecureContext && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(value).then(function () {
            showEmailResult(group, control, true);
          }, function () {
            if (!legacyOk) showEmailResult(group, control, false);
          });
          return;
        }
        if (!legacyOk) showEmailResult(group, control, false);
      });
    });
  }

  function onScroll() {
    paintProgress();
    spy();
  }

  function boot() {
    bindNav();
    bindAnchorKeys();
    bindClicks();
    bindEmail();
    bindScrub();
    fitHero();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitHero);
    bindHeroLight();
    if (wantsMotion()) setupMotion();
    else {
      root.classList.remove("motion");
      if (!reduceQuery.matches) root.classList.add("soft");
      destroyMotion();
      bindSoft();
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    var resizeTimer = 0;
    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        var has = root.classList.contains("motion");
        var want = wantsMotion();
        if (has !== want) {
          window.location.reload();
          return;
        }
        fitHero();
        if (has) {
          layoutJourney();
          window.ScrollTrigger.refresh();
        }
      }, 160);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
