/* Virtual Moments Agency — site interactions (no dependencies) */
(function () {
  "use strict";

  var BOOK = "https://calendar.app.google/Ckj8rndVta2pJSDK7";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Icon sprite (stroke icons, 24px grid) ---------- */
  var P = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/>',
    tick: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4M8.5 14l2 2 4-4"/>',
    heart: '<path d="M12 20s-7.5-4.6-9.2-9.3C1.6 7.4 3.8 4 7.3 4c2 0 3.6 1.1 4.7 2.7C13.1 5.1 14.7 4 16.7 4c3.5 0 5.7 3.4 4.5 6.7C19.5 15.4 12 20 12 20Z"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.8-4M4 4v4h4M4 13a8 8 0 0 0 14.8 4M20 20v-4h-4"/>',
    inbox: '<path d="M3 13h5l1.5 3h5L16 13h5"/><path d="M5.5 5h13L21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5l2.5-8Z"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>',
    phone: '<path d="M5 3h3.5l1.8 4.6-2.3 1.6a12 12 0 0 0 6.8 6.8l1.6-2.3L21 15.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z"/><path d="m9 12 2 2 4-4"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.3-6 6.5-6s5.9 2.4 6.5 6"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.3c1.9.8 3.2 2.9 3.5 5.7"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    home: '<path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
    brief: '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8.5 7V5.5A2 2 0 0 1 10.5 3.5h3a2 2 0 0 1 2 2V7M3 12.5h18"/>',
    laptop: '<rect x="4" y="5" width="16" height="11" rx="2"/><path d="M2 19h20"/>',
    sparkle: '<path d="M12 3c.7 4.6 2.4 6.3 7 7-4.6.7-6.3 2.4-7 7-.7-4.6-2.4-6.3-7-7 4.6-.7 6.3-2.4 7-7Z"/><path d="M19 15.5c.3 1.8 1 2.5 2.8 2.8-1.8.3-2.5 1-2.8 2.8-.3-1.8-1-2.5-2.8-2.8 1.8-.3 2.5-1 2.8-2.8Z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    left: '<path d="M15 6l-6 6 6 6"/>',
    right: '<path d="M9 6l6 6-6 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    hand: '<path d="M7 11V6.5a1.5 1.5 0 0 1 3 0V11m0-1.5v-5a1.5 1.5 0 0 1 3 0V11m0-4a1.5 1.5 0 0 1 3 0V12m0-2.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-4.6-2.2L4.3 16a1.6 1.6 0 0 1 2.3-2.2L8 15"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 10.5V16M8 7.5v.01M11.5 16v-5.5M11.5 13c0-1.5 1-2.5 2.3-2.5S16 11.3 16 13v3"/>',
    facebook: '<path d="M14 21v-7.5h2.5l.5-3H14V8.8c0-.9.4-1.5 1.6-1.5H17V4.6c-.3 0-1.2-.1-2.3-.1-2.4 0-3.7 1.4-3.7 3.8v2.2H8.5v3H11V21"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.3 6.7h.01"/>',
    whatsapp: '<path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 20.5 11.8Z"/><path d="M9 8.5c.2-.5.5-.6.8-.6h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.5.9 1.3 1.7 2.3 2.2.2.1.4.1.5 0l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.3.1.3.3.3.5 0 .5-.2 1.1-.7 1.4-.5.4-1.4.5-2.5.1-2.2-.8-3.9-2.5-4.7-4.6-.4-1-.2-2 .2-2.6Z"/>',
    quote: '<path d="M9.5 6C6.2 7.2 4 10 4 13.5V18h6v-6H7c0-2.4 1.3-4.1 3.3-4.9L9.5 6Zm10 0C16.2 7.2 14 10 14 13.5V18h6v-6h-3c0-2.4 1.3-4.1 3.3-4.9L19.5 6Z" fill="currentColor" stroke="none"/>',
    helmet: '<path d="M2.5 18h19"/><path d="M4.5 18v-2.5a7.5 7.5 0 0 1 15 0V18"/><path d="M10 8.4V5.5h4v2.9"/><path d="M9 18v-4M15 18v-4"/>',
    tri: '<path d="M12 3 22 20H2L12 3Z"/>'
  };
  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">';
  Object.keys(P).forEach(function (k) {
    sprite += '<symbol id="i-' + k + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + P[k] + "</symbol>";
  });
  sprite += "</svg>";
  document.body.insertAdjacentHTML("afterbegin", sprite);

  /* ---------- Booking links ---------- */
  $$("[data-book]").forEach(function (a) { a.href = BOOK; a.target = "_blank"; a.rel = "noopener"; });

  /* ---------- Year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Curtain: brief logo intro once per visit, fade between pages ---------- */
  var curtain = $(".curtain");
  var seen = false;
  try { seen = sessionStorage.getItem("vma-intro") === "1"; sessionStorage.setItem("vma-intro", "1"); } catch (e) { seen = true; }
  if (curtain && !seen && !reduce) {
    curtain.classList.add("is-on");
    requestAnimationFrame(function () { curtain.classList.add("is-intro"); });
    setTimeout(function () { curtain.classList.remove("is-on"); }, 1100);
    setTimeout(function () { curtain.classList.remove("is-intro"); }, 1500);
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    var href = a.getAttribute("href");
    if (!href || a.target === "_blank" || /^(https?:|mailto:|tel:|#)/.test(href) || href.indexOf(".html") === -1) return;
    if (reduce) return;
    e.preventDefault();
    document.documentElement.classList.add("leaving");
    setTimeout(function () { window.location.href = href; }, 320);
  });
  window.addEventListener("pageshow", function (e) { if (e.persisted) document.documentElement.classList.remove("leaving"); });

  /* ---------- Nav: solid on scroll, hide on scroll down, progress bar ---------- */
  var nav = $(".nav"), progress = $(".progress"), mbar = $(".mbar"), hero = $(".hero, .page-hero");
  var lastY = window.scrollY, ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (nav) {
      nav.classList.toggle("is-scrolled", y > 24);
      var menuOpen = document.body.classList.contains("menu-open");
      nav.classList.toggle("is-hidden", !menuOpen && y > 420 && y > lastY + 4);
      if (y < lastY - 4) nav.classList.remove("is-hidden");
    }
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = "scaleX(" + (h > 0 ? y / h : 0) + ")";
    }
    if (mbar && hero) mbar.classList.toggle("is-on", y > hero.offsetHeight * 0.6);
    stepsProgress();
    lastY = y; ticking = false;
  }
  window.addEventListener("scroll", function () { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });

  /* ---------- Mobile menu ---------- */
  var burger = $(".burger");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    document.documentElement.classList.toggle("menu-open", open);
    if (burger) { burger.setAttribute("aria-expanded", open ? "true" : "false"); burger.setAttribute("aria-label", open ? "Close menu" : "Open menu"); }
    if (open && nav) nav.classList.remove("is-hidden");
  }
  if (burger) burger.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 960) setMenu(false); });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else revealEls.forEach(function (el) { el.classList.add("is-in"); });

  /* ---------- Hero word rotator ---------- */
  $$(".rotator").forEach(function (r) {
    var words = $$("span", r); if (words.length < 2) return;
    var i = 0; words[0].classList.add("is-in");
    if (reduce) return;
    setInterval(function () {
      var cur = words[i]; i = (i + 1) % words.length; var nxt = words[i];
      cur.classList.remove("is-in"); cur.classList.add("is-out");
      nxt.classList.remove("is-out"); nxt.classList.add("is-in");
      setTimeout(function () { cur.classList.remove("is-out"); }, 750);
    }, 2600);
  });

  /* ---------- Hero toasts: appear one by one ---------- */
  $$(".toast").forEach(function (t, k) { setTimeout(function () { t.classList.add("is-on"); }, reduce ? 0 : 900 + k * 900); });

  /* ---------- Tabs with sliding indicator ---------- */
  $$("[data-tabs]").forEach(function (root) {
    var list = $(".tabs__list", root), btns = $$(".tabs__btn", root), panels = $$(".tabs__panel", root), ind = $(".tabs__ind", root);
    function move(btn) {
      if (!ind || !btn) return;
      ind.style.width = btn.offsetWidth + "px";
      ind.style.transform = "translateX(" + btn.offsetLeft + "px)";
    }
    function select(btn, focus, fromHash) {
      btns.forEach(function (b) { var on = b === btn; b.setAttribute("aria-selected", on ? "true" : "false"); b.tabIndex = on ? 0 : -1; });
      panels.forEach(function (p) { p.classList.toggle("is-active", p.id === btn.getAttribute("aria-controls")); });
      move(btn);
      if (focus) btn.focus();
      if (list && list.scrollWidth > list.clientWidth) list.scrollTo({ left: btn.offsetLeft - (list.clientWidth - btn.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
      if (!fromHash && root.hasAttribute("data-hash")) { try { history.replaceState(null, "", "#" + btn.dataset.key); } catch (e) {} }
    }
    btns.forEach(function (b, i) {
      b.addEventListener("click", function () { select(b); });
      b.addEventListener("keydown", function (e) {
        var n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (n) { e.preventDefault(); select(btns[(i + n + btns.length) % btns.length], true); }
      });
    });
    function fromHash() {
      var key = (location.hash || "").slice(1);
      var b = btns.filter(function (x) { return x.dataset.key === key; })[0];
      if (b) { select(b, false, true); return true; }
      return false;
    }
    if (!(root.hasAttribute("data-hash") && fromHash())) select(btns.filter(function (b) { return b.getAttribute("aria-selected") === "true"; })[0] || btns[0], false, true);
    window.addEventListener("hashchange", function () { if (root.hasAttribute("data-hash")) fromHash(); });
    window.addEventListener("resize", function () { move(btns.filter(function (b) { return b.getAttribute("aria-selected") === "true"; })[0]); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { move(btns.filter(function (b) { return b.getAttribute("aria-selected") === "true"; })[0]); });
    // swipe between panels on touch
    var sx = null;
    panels.forEach(function (p) {
      p.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
      p.addEventListener("touchend", function (e) {
        if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; sx = null;
        if (Math.abs(dx) < 60) return;
        var cur = btns.findIndex(function (b) { return b.getAttribute("aria-selected") === "true"; });
        select(btns[(cur + (dx < 0 ? 1 : -1) + btns.length) % btns.length]);
      });
    });
  });

  /* ---------- Steps progress line ---------- */
  var stepsWrap = $$(".steps");
  function stepsProgress() {
    stepsWrap.forEach(function (w) {
      var r = w.getBoundingClientRect(), vh = window.innerHeight;
      var p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (r.height + vh * 0.2)));
      var line = $(".steps__line", w); if (line) line.style.setProperty("--p", p.toFixed(3));
      var items = $$(".step", w);
      items.forEach(function (s, i) { s.classList.toggle("is-lit", p >= (i + 0.35) / items.length || p >= 0.98); });
    });
  }

  /* ---------- Testimonial slider ---------- */
  $$("[data-slider]").forEach(function (root) {
    var slides = $$(".slide", root), dotsWrap = $(".dots", root), i = 0, timer = null;
    if (!slides.length) return;
    var dots = slides.map(function (_, k) {
      var b = document.createElement("button"); b.className = "dot-hit"; b.setAttribute("aria-label", "Show review " + (k + 1));
      b.innerHTML = '<span class="dot"></span>'; b.addEventListener("click", function () { go(k); restart(); });
      dotsWrap && dotsWrap.appendChild(b); return b;
    });
    function go(k) {
      i = (k + slides.length) % slides.length;
      slides.forEach(function (s, n) { s.classList.toggle("is-active", n === i); s.setAttribute("aria-hidden", n === i ? "false" : "true"); });
      dots.forEach(function (d, n) { $(".dot", d).classList.toggle("is-active", n === i); });
    }
    function restart() { clearInterval(timer); if (!reduce) timer = setInterval(function () { go(i + 1); }, 7000); }
    var prev = $("[data-prev]", root), next = $("[data-next]", root);
    prev && prev.addEventListener("click", function () { go(i - 1); restart(); });
    next && next.addEventListener("click", function () { go(i + 1); restart(); });
    root.addEventListener("mouseenter", function () { clearInterval(timer); });
    root.addEventListener("mouseleave", restart);
    var sx = null;
    root.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; clearInterval(timer); }, { passive: true });
    root.addEventListener("touchend", function (e) {
      if (sx !== null) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1)); }
      sx = null; restart();
    });
    go(0); restart();
  });

  /* ---------- Spotlight follow on cards ---------- */
  if (finePointer) {
    document.addEventListener("pointermove", function (e) {
      var el = e.target.closest && e.target.closest(".spot"); if (!el) return;
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (e.clientX - r.left) + "px");
      el.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  /* ---------- Buttons: magnetic pull (mouse) + ripple (touch & mouse) ---------- */
  $$(".btn").forEach(function (b) {
    b.addEventListener("pointerdown", function (e) {
      var r = b.getBoundingClientRect(), s = document.createElement("span");
      s.className = "ripple"; s.style.left = (e.clientX - r.left) + "px"; s.style.top = (e.clientY - r.top) + "px";
      b.appendChild(s); setTimeout(function () { s.remove(); }, 700);
      if (navigator.vibrate && e.pointerType === "touch") { try { navigator.vibrate(8); } catch (x) {} }
    });
    if (!finePointer || reduce || b.hasAttribute("data-no-magnet")) return;
    b.addEventListener("pointermove", function (e) {
      var r = b.getBoundingClientRect();
      var dx = (e.clientX - r.left - r.width / 2) / r.width, dy = (e.clientY - r.top - r.height / 2) / r.height;
      b.style.transform = "translate(" + (dx * 8).toFixed(1) + "px," + (dy * 6).toFixed(1) + "px)";
    });
    b.addEventListener("pointerleave", function () { b.style.transform = ""; });
  });

  /* ---------- Accordion ---------- */
  $$(".acc").forEach(function (acc) {
    var q = $(".acc__q", acc);
    q.addEventListener("click", function () {
      var open = !acc.classList.contains("is-open");
      var group = acc.closest("[data-acc-single]");
      if (group && open) $$(".acc.is-open", group).forEach(function (o) { o.classList.remove("is-open"); $(".acc__q", o).setAttribute("aria-expanded", "false"); });
      acc.classList.toggle("is-open", open); q.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ---------- FAQ search + categories ---------- */
  var faq = $("[data-faq]");
  if (faq) {
    var input = $(".search input", faq), chips = $$(".chip", faq), items = $$(".acc", faq), empty = $(".faq-empty", faq), cat = "all";
    function filter() {
      var q = (input.value || "").trim().toLowerCase(), shown = 0;
      items.forEach(function (it) {
        var ok = (cat === "all" || it.dataset.cat === cat) && (!q || it.textContent.toLowerCase().indexOf(q) > -1);
        it.style.display = ok ? "" : "none"; if (ok) shown++;
      });
      empty.style.display = shown ? "none" : "block";
    }
    input.addEventListener("input", filter);
    chips.forEach(function (c) { c.addEventListener("click", function () { cat = c.dataset.cat; chips.forEach(function (x) { x.setAttribute("aria-pressed", x === c ? "true" : "false"); }); filter(); }); });
  }

  /* ---------- Contact form: opens an email to VMA, with copy fallback ---------- */
  var form = $("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = new FormData(form), msg = $(".form-msg", form);
      var body = "Name: " + (f.get("name") || "") + "\nClinic / business: " + (f.get("biz") || "") + "\nIndustry: " + (f.get("industry") || "") + "\nEmail: " + (f.get("email") || "") + "\n\n" + (f.get("message") || "");
      var href = "mailto:info@virtualmomentsagency.com?subject=" + encodeURIComponent("Website inquiry from " + (f.get("name") || "a visitor")) + "&body=" + encodeURIComponent(body);
      msg.classList.add("is-on");
      window.location.href = href;
    });
  }
  $$("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var t = b.getAttribute("data-copy"), label = $("span", b), old = label ? label.textContent : "";
      var done = function () { if (label) { label.textContent = "Copied"; setTimeout(function () { label.textContent = old; }, 1600); } };
      try { navigator.clipboard.writeText(t).then(done, function () { if (label) label.textContent = t; }); } catch (x) { if (label) label.textContent = t; }
    });
  });


  /* ---------- Interactive journey ---------- */
  $$("[data-journey]").forEach(function (root) {
    var modeBtns = $$(".jr__modes button", root), ind = $(".jr__modeind", root), modes = $$(".jr__mode", root);
    function moveInd(b) { if (!ind || !b) return; ind.style.width = b.offsetWidth + "px"; ind.style.transform = "translateX(" + (b.offsetLeft - 6) + "px)"; }
    function setMode(key) {
      modeBtns.forEach(function (b) { b.setAttribute("aria-selected", b.dataset.mode === key ? "true" : "false"); if (b.dataset.mode === key) moveInd(b); });
      modes.forEach(function (m) { m.classList.toggle("is-active", m.dataset.mode === key); if (m.dataset.mode === key) m._go(0, true); });
    }
    modes.forEach(function (m) {
      var steps = $$(".jr__step", m), details = $$(".jr__detail", m), cur = 0;
      var rail = $(".jr__rail", m), bar = $(".jr__bar", m), count = $(".jr__count b", m), list = $(".jr__steps", m);
      m._go = function (i, silent) {
        i = Math.max(0, Math.min(steps.length - 1, i));
        var back = i < cur; cur = i;
        steps.forEach(function (s, k) { s.classList.toggle("is-active", k === i); s.classList.toggle("is-done", k < i); s.setAttribute("aria-current", k === i ? "step" : "false"); });
        details.forEach(function (d, k) { d.classList.remove("from-left"); if (k === i && back) d.classList.add("from-left"); d.classList.toggle("is-active", k === i); });
        var p = steps.length > 1 ? i / (steps.length - 1) : 1;
        if (rail) rail.style.setProperty("--p", p.toFixed(3));
        if (bar) bar.style.setProperty("--p", ((i + 1) / steps.length).toFixed(3));
        if (count) count.textContent = i + 1;
        var s = steps[i];
        if (!silent && list && list.scrollWidth > list.clientWidth) list.scrollTo({ left: s.parentNode.offsetLeft - (list.clientWidth - s.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
      };
      steps.forEach(function (s, k) { s.addEventListener("click", function () { m._go(k); }); });
      var prev = $("[data-jr-prev]", m), next = $("[data-jr-next]", m);
      prev && prev.addEventListener("click", function () { m._go(cur - 1); });
      next && next.addEventListener("click", function () { m._go(cur + 1 >= steps.length ? 0 : cur + 1); });
      var panel = $(".jr__panel", m), sx = null;
      panel.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
      panel.addEventListener("touchend", function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 50) m._go(cur + (dx < 0 ? 1 : -1)); });
      m.addEventListener("keydown", function (e) { if (e.key === "ArrowRight") m._go(cur + 1); if (e.key === "ArrowLeft") m._go(cur - 1); });
      m._go(0, true);
    });
    modeBtns.forEach(function (b) { b.addEventListener("click", function () { setMode(b.dataset.mode); }); });
    $$("[data-goto]", root).forEach(function (b) { b.addEventListener("click", function () { setMode(b.dataset.goto); root.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); }); });
    moveInd(modeBtns[0]);
    window.addEventListener("resize", function () { moveInd(modeBtns.filter(function (b) { return b.getAttribute("aria-selected") === "true"; })[0]); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { moveInd(modeBtns.filter(function (b) { return b.getAttribute("aria-selected") === "true"; })[0]); });
  });

  onScroll();
})();
