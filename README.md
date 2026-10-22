# Web – Adam Somora (čisté HTML)

Žiadna inštalácia, žiadny Node.js. Tri súbory:

| Súbor | Čo v ňom je |
|---|---|
| `index.html` | Celý obsah webu: texty, sekcie, placeholdery |
| `styles.css` | Vzhľad: farby, písmo, medzery (premenné úplne hore v `:root`) |
| `script.js` | Správanie: formulár v krokoch, detail projektu, tmavý režim |
| `img/` | Sem dávaj fotky |
| `video/` | Sem len krátky hero loop do ~5 MB (návod v `video/README.md`) |

## Ako to otvoriť

- **Najjednoduchšie:** dvojklik na `index.html`.
- **Vo VS Code:** File → Open Folder → vyber tento priečinok. Nainštaluj rozšírenie **Live Server**, potom pravý klik na `index.html` → **Open with Live Server**. Pri ukladaní sa stránka sama obnoví.

## Ako upravovať

Návod je aj priamo na začiatku `index.html` v komentári. V skratke:

- **Texty** prepisuj priamo v `index.html`. Sekcie sú označené komentármi `<!-- 1. HERO -->`, `<!-- 5. CENNÍK -->` atď. Vo VS Code ich nájdeš cez Ctrl/Cmd + F.
- **Hranaté zátvorky `[ ]`** = doplň skutočný údaj. Fakty v úvode (X rokov, 50+ projektov) tiež prepíš na skutočné čísla.
- **Princípy a poznámky** k sekciám máš v samostatnom súbore `PRINCIPY.md`. Nedávaj ho do tohto priečinka, inak by bol po nasadení verejne dostupný na adrese /PRINCIPY.md.
- **Placeholdery** (šrafované rámiky) sú bloky `<div class="ph ...">…</div>`. Celý blok nahraď `<video>` alebo `<img>`, príklady sú v komentári hore v `index.html`.
- **Detail projektu** (okno po kliknutí) je v `<dialog class="case-modal">`. Texty projektu sú tam druhýkrát, uprav ich na oboch miestach.
- **Farby** zmeníš v `styles.css` hore, napr. `--accent` je červená akcentová farba.

## Videá

- `video/showreel.mp4` hrá v úvode stlmene v slučke. Zvuk sa zapína tlačidlom „Zapnúť zvuk", lebo prehliadače automatické prehrávanie so zvukom blokujú.
- Videá projektov (`video/projekt1–5.mp4`) sa načítajú až po otvorení detailu projektu a hrajú so zvukom.
- Každé video musí mať pod 25 MB (limit Cloudflare Pages) a pod 100 MB (limit GitHubu). Originálne `.mov` súbory sa necommitujú, rieši to `.gitignore`.

## Formulár

1. Zaregistruj sa na [formspree.io](https://formspree.io) (free plán stačí).
2. Vytvor formulár a skopíruj jeho URL (`https://formspree.io/f/xxxx`).
3. Vlož ju do `script.js` (riadok `FORM_ENDPOINT`) aj do `<form action="...">` v `index.html`.

## Pracovná verzia na Vercel

1. Nahraj tento priečinok do repozitára na GitHube.
2. vercel.com → **Add New → Project** → vyber repozitár.
3. Framework Preset: **Other**. Build command nechaj prázdny. → **Deploy**.

Každý `git push` = nová verzia.

> **Pozor:** Vercel Hobby (free) je podľa podmienok len na nekomerčné použitie. Na pracovnú verziu OK, ostrý web presuň na Cloudflare Pages.

## Ostrá verzia na Cloudflare Pages (neskôr)

Workers & Pages → Create → Pages → Connect to Git → ten istý repozitár. Build command prázdny, output directory `/`.

## Pred spustením (checklist)

- [ ] Všetky `[ ]` nahradené skutočnými údajmi
- [ ] Logo Markízy len so súhlasom, inak iba text
- [ ] Záruka a kapacita nastavené tak, aby si ich vedel dodržať
- [ ] Formspree napojený a otestovaný
- [ ] `img/og.jpg` (1200 × 630) na zdieľanie odkazu
- [ ] Zásady ochrany osobných údajov (GDPR) – formulár zbiera e-maily
