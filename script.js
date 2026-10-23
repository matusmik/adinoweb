/* ─────────────────────────────────────────────────────────────
   Skripty webu. Bežne tu meníš len dve veci:
   1) FORM_ENDPOINT – adresa formulára z formspree.io
   2) CENNIK – ceny pre orientačný odhad vo formulári
   ───────────────────────────────────────────────────────────── */

// Formspree (free): vytvor formulár na formspree.io a vlož sem jeho URL.
// Rovnakú URL vlož aj do <form action="..."> v index.html.
const FORM_ENDPOINT = "https://formspree.io/f/TVOJE_ID";

// Orientačné ceny v €, ktoré formulár ukáže návštevníkovi.
// [od, do] podľa typu videa. null = „ocením individuálne".
// Názvy musia presne sedieť s hodnotami (value) v index.html.
const CENNIK = {
  typy: {
    "Firemné / prezentačné": [1190, 1900],
    "Náborové": [1190, 1900],
    "Produktové": [690, 1500],
    "Sociálne siete": [490, 900],
    "Reklamný spot": [2500, 5000],
    "Iné": null,
  },
  doplnky: {
    "Dron": 150,
    "Ďalšia lokácia": 150,
    "Anglická verzia": 90,
    "Viac zostrihov na výšku": 120,
  },
  dopravaZaKm: 0.4,
};

/* ── 1. Svetlý / tmavý režim (voľba sa pamätá v prehliadači) ── */
document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
  const root = document.documentElement;
  const dark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
  try {
    localStorage.setItem("theme", root.dataset.theme);
  } catch {}
});

/* ── 2. Detail projektu: klik otvorí, ← → prepínajú, Esc zatvorí ── */
const modal = document.querySelector("[data-case-modal]");
if (modal) {
  const slides = [...modal.querySelectorAll("[data-cm-slide]")];
  const count = modal.querySelector("[data-cm-count]");
  let cur = 0;
  const pauseAll = () => modal.querySelectorAll("video").forEach((v) => v.pause());
  // Každý projekt sa otvorí navrchu na videu a video sa spustí (aj so zvukom,
  // lebo ho spustil klik návštevníka).
  const go = (n) => {
    cur = (n + slides.length) % slides.length;
    slides.forEach((sl, k) => (sl.hidden = k !== cur));
    count.textContent = `${cur + 1} / ${slides.length}`;
    pauseAll();
    modal.scrollTop = 0;
    requestAnimationFrame(() => (modal.scrollTop = 0));
    const video = slides[cur].querySelector("video");
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };
  document.querySelectorAll("[data-case-open]").forEach((b) =>
    b.addEventListener("click", () => {
      modal.showModal(); // najprv otvoriť, až potom posunúť navrch (zatvorené okno sa posunúť nedá)
      go(Number(b.dataset.caseOpen));
    }),
  );
  modal.querySelector("[data-cm-prev]").addEventListener("click", () => go(cur - 1));
  modal.querySelector("[data-cm-next]").addEventListener("click", () => go(cur + 1));
  modal.querySelector("[data-cm-close]").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });
  modal.addEventListener("close", pauseAll);
  modal.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") go(cur - 1);
    if (e.key === "ArrowRight") go(cur + 1);
  });
}

/* ── 3. Formulár v 3 krokoch + orientačná cena ── */
const form = document.querySelector("[data-form]");
if (form) {
  const steps = [...form.querySelectorAll("[data-step]")];
  const back = form.querySelector("[data-back]");
  const next = form.querySelector("[data-next]");
  const submit = form.querySelector("[data-submit]");
  const bar = form.querySelector("[data-progress]");
  const stepCount = form.querySelector("[data-step-count]");
  const msg = form.querySelector("[data-msg]");
  const est = form.querySelector("[data-estimate]");
  const estHidden = form.querySelector('input[name="orientacna_cena"]');
  let i = 0;
  form.classList.add("js-steps");

  const eur = (n) => new Intl.NumberFormat("sk-SK").format(n) + " €";
  const budgetMax = { "do 600 €": 600, "600 – 1 500 €": 1500, "1 500 – 3 000 €": 3000, "nad 3 000 €": Infinity };

  const estimate = () => {
    if (!est) return;
    const data = new FormData(form);
    const typ = data.get("typ_videa");
    const range = CENNIK.typy[typ];
    const extras = data.getAll("doplnky");
    const extraSum = extras.reduce((sum, x) => sum + (CENNIK.doplnky[x] || 0), 0);
    const miesto = data.get("miesto");
    const budget = budgetMax[data.get("rozpocet")];
    let price, note = [];

    if (!range) {
      price = "Ocením individuálne";
      est.dataset.state = "custom";
    } else {
      const from = range[0] + extraSum, to = range[1] + extraSum;
      price = `${eur(from)} – ${eur(to)}`;
      est.dataset.state = "ok";
      if (extraSum) note.push(`Vrátane doplnkov za ${eur(extraSum)}.`);
      if (budget !== undefined && budget < from) {
        note.push("Váš rozpočet je pod bežnou cenou. Napíšte mi aj tak, navrhnem, čo sa dá urobiť v rámci neho.");
        est.dataset.state = "low";
      }
    }
    if (miesto && miesto !== "Bratislava a okolie") note.push(`Doprava mimo Bratislavy: ${CENNIK.dopravaZaKm.toFixed(2).replace(".", ",")} €/km.`);

    est.querySelector("[data-estimate-price]").textContent = price;
    const noteEl = est.querySelector("[data-estimate-note]");
    noteEl.replaceChildren(...note.map((t) => Object.assign(document.createElement("span"), { textContent: t, className: t.startsWith("Váš rozpočet") ? "warn" : "" })));
    if (estHidden) estHidden.value = price + (extras.length ? ` (doplnky: ${extras.join(", ")})` : "");
  };

  const show = () => {
    steps.forEach((s, n) => (s.hidden = n !== i));
    back.hidden = i === 0;
    next.hidden = i === steps.length - 1;
    submit.hidden = i !== steps.length - 1;
    bar.style.width = `${((i + 1) / steps.length) * 100}%`;
    stepCount.textContent = `Krok ${i + 1} z ${steps.length}`;
    msg.textContent = "";
    if (est) est.hidden = i === 0;
    estimate();
  };

  const valid = () => {
    const fields = [...steps[i].querySelectorAll("input, select, textarea")];
    const bad = fields.find((f) => !f.checkValidity());
    if (bad) {
      msg.textContent = bad.type === "radio" ? "Vyberte jednu možnosť." : "Vyplňte prosím povinné polia.";
      if (bad.type !== "radio") bad.focus();
      return false;
    }
    return true;
  };

  // Výber typu videa posunie ďalej automaticky (menej klikov).
  steps[0].addEventListener("change", () => {
    if (valid()) {
      i = 1;
      show();
    }
  });
  form.addEventListener("change", estimate);
  next.addEventListener("click", () => {
    if (valid()) {
      i++;
      show();
    }
  });
  back.addEventListener("click", () => {
    i--;
    show();
  });

  // Predvyplnenie typu videa z odkazu, napr. index.html?typ=naborove#kontakt
  const slugy = {
    firemne: "Firemné / prezentačné",
    naborove: "Náborové",
    produktove: "Produktové",
    socialne: "Sociálne siete",
    spot: "Reklamný spot",
  };
  const typZOdkazu = slugy[new URLSearchParams(location.search).get("typ")];
  if (typZOdkazu) {
    const radio = [...form.querySelectorAll('input[name="typ_videa"]')].find((r) => r.value === typZOdkazu);
    if (radio) {
      radio.checked = true;
      i = 1;
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!valid()) return;
    if (FORM_ENDPOINT.includes("TVOJE_ID")) {
      msg.textContent = "Formulár ešte nie je napojený. Doplň FORM_ENDPOINT v script.js.";
      return;
    }
    submit.disabled = true;
    msg.textContent = "Odosielam…";
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      form.innerHTML = '<p class="display form-done">Ďakujem. Ozvem sa do 24 hodín.</p>';
    } catch {
      submit.disabled = false;
      msg.textContent = "Nepodarilo sa odoslať. Napíšte mi prosím priamo na e-mail.";
    }
  });

  show();
}

/* ── 4. Zvuk showreelu ──
   Prehliadače dovolia automaticky spustiť video len bez zvuku,
   preto ide zvuk zapnúť tlačidlom. */
const reel = document.querySelector('[data-reel]');
const soundBtn = document.querySelector('[data-sound]');
if (reel && soundBtn) {
  soundBtn.addEventListener('click', () => {
    reel.muted = !reel.muted;
    if (!reel.muted) { reel.currentTime = 0; reel.play().catch(() => {}); }
    if (reel.muted && reduceMotion) reel.pause();
    soundBtn.textContent = reel.muted ? 'Zapnúť zvuk' : 'Vypnúť zvuk';
    soundBtn.setAttribute('aria-pressed', String(!reel.muted));
  });
}

/* ── 5. Videá v slučke hrajú len keď sú na obrazovke ──
   Šetrí batériu a výkon na mobile. Pri nastavení „obmedziť pohyb"
   sa automaticky nespustia (ostane náhľadový obrázok). */
const loopVideos = document.querySelectorAll("video[data-inview]");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (loopVideos.length && "IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) {
          if (v.preload === "none") v.preload = "auto";
          v.play().catch(() => {});
        } else if (v.muted) {
          v.pause();
        }
      });
    },
    { threshold: 0.25 },
  );
  loopVideos.forEach((v) => io.observe(v));
}

/* ── 6. Náhľad videa pri prejdení myšou nad projektom ──
   Len na počítači s myšou. Klipy sú v video/nahlad2–5.mp4
   (riadok projektu má atribút data-preview). */
const previewRows = document.querySelectorAll("[data-preview]");
if (previewRows.length && matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion) {
  const box = document.createElement("div");
  box.className = "hover-preview";
  box.setAttribute("aria-hidden", "true");
  box.innerHTML = '<video muted loop playsinline preload="none"></video>';
  document.body.appendChild(box);
  const pv = box.querySelector("video");
  let x = 0, y = 0, raf = 0;

  const place = () => {
    raf = 0;
    const w = box.offsetWidth, h = box.offsetHeight, pad = 24;
    let left = x + pad, top = y - h / 2;
    if (left + w > innerWidth - 12) left = x - w - pad; // pri pravom okraji ukáž vľavo od kurzora
    top = Math.max(12, Math.min(top, innerHeight - h - 12));
    box.style.transform = `translate(${left}px, ${top}px)`;
  };
  const move = (e) => {
    x = e.clientX; y = e.clientY;
    if (!raf) raf = requestAnimationFrame(place);
  };
  const hide = () => {
    box.classList.remove("is-on");
    pv.pause();
  };

  previewRows.forEach((row) => {
    row.addEventListener("mouseenter", (e) => {
      const src = row.dataset.preview;
      if (!pv.src.endsWith(src)) {
        pv.poster = row.querySelector("img")?.src || ""; // kým sa klip načíta, ukáž náhľad
        pv.src = src;
      }
      pv.currentTime = 0;
      pv.play().catch(() => {});
      move(e);
      box.classList.add("is-on");
    });
    row.addEventListener("mousemove", move);
    row.addEventListener("mouseleave", hide);
    row.addEventListener("click", hide);
  });
  addEventListener("scroll", hide, { passive: true });
}
