/* ─────────────────────────────────────────────────────────────
   Súhlas s cookies (lišta + nastavenia)

   1) Ak chceš merať návštevnosť, doplň ID nižšie.
      Kým je tam „XXXX", nič sa nenačíta a analytika je vypnutá.
   2) Analytické nástroje sa spustia AŽ po súhlase návštevníka.
   3) Voľba sa pamätá 6 mesiacov (localStorage, kľúč „as_consent“).
   4) Odkaz s atribútom data-cookie-settings otvorí nastavenia
      (je v pätičke na všetkých stránkach).
   ───────────────────────────────────────────────────────────── */
(function () {
  var GA_ID = "G-XXXXXXXXXX"; // Google Analytics 4 – Measurement ID
  var CLARITY_ID = "XXXXXXXXXX"; // Microsoft Clarity – Project ID
  var KEY = "as_consent";
  var MAX_AGE = 1000 * 60 * 60 * 24 * 182; // ~6 mesiacov
  var PRIVACY_URL = document.documentElement.dataset.privacy || "ochrana-osobnych-udajov.html";

  var gaReady = GA_ID.indexOf("XXXX") === -1;
  var clarityReady = CLARITY_ID.indexOf("XXXX") === -1;

  /* ── úložisko voľby ── */
  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      if (v && Date.now() - v.at < MAX_AGE) return v;
    } catch (e) {}
    return null;
  }
  function write(analytics) {
    var v = { analytics: !!analytics, at: Date.now(), v: 1 };
    try {
      localStorage.setItem(KEY, JSON.stringify(v));
    } catch (e) {}
    return v;
  }

  /* ── Google Consent Mode v2: všetko zamietnuté, kým návštevník nepovie áno ── */
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });

  var loaded = false;
  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    gtag("consent", "update", { analytics_storage: "granted" });
    if (gaReady) {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
      document.head.appendChild(s);
      gtag("js", new Date());
      gtag("config", GA_ID);
    }
    if (clarityReady) {
      (function (c, l, a, r, i, t, y) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", CLARITY_ID);
      window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
    }
  }
  function clearAnalyticsCookies() {
    var names = document.cookie.split(";").map(function (c) {
      return c.split("=")[0].trim();
    });
    var host = location.hostname,
      parts = host.split(".");
    var domains = ["", host, "." + host];
    if (parts.length > 2) domains.push("." + parts.slice(-2).join("."));
    names.forEach(function (n) {
      if (/^_ga|^_gid|^_gat|^_clck|^_clsk/.test(n)) {
        domains.forEach(function (d) {
          document.cookie = n + "=; Max-Age=0; path=/" + (d ? "; domain=" + d : "");
        });
      }
    });
  }

  /* ── rozhranie ── */
  var banner, dialog, toggle;
  function el(html) {
    var d = document.createElement("div");
    d.innerHTML = html.trim();
    return d.firstChild;
  }

  function build() {
    banner = el(
      '<section class="ck-bar" role="region" aria-label="Súhlas s cookies" hidden>' +
        '<p class="ck-bar__title">Cookies</p>' +
        '<p class="ck-bar__text">Nevyhnutné cookies potrebuje web, aby fungoval. S vaším súhlasom zapnem aj analytické, vďaka ktorým vidím, koľko ľudí si pozrie projekty a cenník. Neukladajú vaše meno ani e-mail. <a href="' +
        PRIVACY_URL +
        '#cookies">Viac info</a></p>' +
        '<div class="ck-bar__actions">' +
        '<button type="button" class="btn btn-primary" data-c="all">Povoliť všetky</button>' +
        '<button type="button" class="btn btn-line" data-c="none">Odmietnuť všetky</button>' +
        '<button type="button" class="ck-link" data-c="edit">Upraviť predvoľby</button>' +
        "</div>" +
        "</section>",
    );

    dialog = el(
      '<dialog class="ck-dialog" aria-labelledby="ck-h">' +
        '<form method="dialog" class="ck-dialog__in">' +
        '<div class="ck-dialog__head">' +
        '<h2 id="ck-h" class="display">Nastavenia cookies</h2>' +
        '<button type="submit" class="ck-close" value="close" aria-label="Zavrieť">✕</button>' +
        "</div>" +
        '<p class="ck-dialog__lead">Výber môžete kedykoľvek zmeniť cez „Nastavenia cookies“ v pätičke webu.</p>' +
        '<div class="ck-cat">' +
        '<div class="ck-cat__row"><h3>Nevyhnutné</h3><span class="ck-always">Vždy zapnuté</span></div>' +
        "<p>Potrebné na to, aby web fungoval. Pamätajú si vašu voľbu v tomto okne a svetlý alebo tmavý režim. Nikam sa neodosielajú.</p>" +
        "</div>" +
        '<div class="ck-cat">' +
        '<div class="ck-cat__row"><h3>Analytické</h3>' +
        '<label class="ck-switch"><input type="checkbox" id="ck-analytics"><span class="ck-switch__ui" aria-hidden="true"></span><span class="ck-sr">Povoliť analytické cookies</span></label></div>' +
        "<p>Spustia Google Analytics a Microsoft Clarity. Ukazujú mi, koľko ľudí web navštívi a ktoré časti si pozrú. Neukladajú vaše meno ani e-mail.</p>" +
        "</div>" +
        '<div class="ck-dialog__actions">' +
        '<button type="submit" class="btn btn-primary" value="save">Uložiť výber</button>' +
        '<button type="submit" class="btn btn-line" value="all">Povoliť všetky</button>' +
        "</div>" +
        "</form>" +
        "</dialog>",
    );

    document.body.appendChild(banner);
    document.body.appendChild(dialog);
    toggle = dialog.querySelector("#ck-analytics");

    banner.addEventListener("click", function (e) {
      var b = e.target.closest("[data-c]");
      if (!b) return;
      var c = b.getAttribute("data-c");
      if (c === "all") decide(true);
      else if (c === "none") decide(false);
      else openSettings();
    });
    dialog.addEventListener("close", function () {
      var r = dialog.returnValue;
      if (r === "all") decide(true);
      else if (r === "save") decide(toggle.checked);
    });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
  }

  function showBanner(show) {
    banner.hidden = !show;
  }
  function openSettings() {
    var cur = read();
    toggle.checked = cur ? cur.analytics : false;
    dialog.returnValue = "";
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }
  function decide(analytics) {
    var prev = read();
    write(analytics);
    showBanner(false);
    if (analytics) loadAnalytics();
    else if (prev && prev.analytics) {
      if (window.clarity) window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });
      gtag("consent", "update", { analytics_storage: "denied" });
      clearAnalyticsCookies();
      location.reload();
    }
  }

  function init() {
    build();
    var cur = read();
    if (cur) {
      if (cur.analytics) loadAnalytics();
    } else showBanner(true);
    document.addEventListener("click", function (e) {
      var a = e.target.closest("[data-cookie-settings]");
      if (a) {
        e.preventDefault();
        openSettings();
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
