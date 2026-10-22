/* ─────────────────────────────────────────────────────────────
   Skripty webu. Bežné úpravy tu robiť netreba.
   Jediné, čo prípadne zmeníš, je FORM_ENDPOINT nižšie.
   ───────────────────────────────────────────────────────────── */

// Formspree (free): vytvor formulár na formspree.io a vlož sem jeho URL.
// Rovnakú URL vlož aj do <form action="..."> v index.html.
const FORM_ENDPOINT = "https://formspree.io/f/TVOJE_ID";

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
  const go = (n) => {
    cur = (n + slides.length) % slides.length;
    slides.forEach((sl, k) => (sl.hidden = k !== cur));
    count.textContent = `${cur + 1} / ${slides.length}`;
    modal.scrollTop = 0;
    pauseAll();
  };
  document.querySelectorAll("[data-case-open]").forEach((b) =>
    b.addEventListener("click", () => {
      go(Number(b.dataset.caseOpen));
      modal.showModal();
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

/* ── 3. Formulár v 3 krokoch ── */
const form = document.querySelector("[data-form]");
if (form) {
  const steps = [...form.querySelectorAll("[data-step]")];
  const back = form.querySelector("[data-back]");
  const next = form.querySelector("[data-next]");
  const submit = form.querySelector("[data-submit]");
  const bar = form.querySelector("[data-progress]");
  const stepCount = form.querySelector("[data-step-count]");
  const msg = form.querySelector("[data-msg]");
  let i = 0;
  form.classList.add("js-steps");

  const show = () => {
    steps.forEach((s, n) => (s.hidden = n !== i));
    back.hidden = i === 0;
    next.hidden = i === steps.length - 1;
    submit.hidden = i !== steps.length - 1;
    bar.style.width = `${((i + 1) / steps.length) * 100}%`;
    stepCount.textContent = `Krok ${i + 1} z ${steps.length}`;
    msg.textContent = "";
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
    soundBtn.textContent = reel.muted ? 'Zapnúť zvuk' : 'Vypnúť zvuk';
    soundBtn.setAttribute('aria-pressed', String(!reel.muted));
  });
}
