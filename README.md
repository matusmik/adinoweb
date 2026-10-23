# Web – Adam Somora (čisté HTML)

Žiadna inštalácia, žiadny Node.js. Tri súbory:

| Súbor | Čo v ňom je |
|---|---|
| `index.html` | Celý obsah webu: texty, sekcie, placeholdery |
| `styles.css` | Vzhľad: farby, písmo, medzery (premenné úplne hore v `:root`) |
| `script.js` | Správanie: formulár v krokoch, detail projektu, tmavý režim |
| `consent.js` | Cookie lišta a nastavenia cookies. Sem doplníš ID pre Google Analytics a Clarity. |
| `firemne-video-bratislava.html`, `naborove-video.html`, `produktove-video.html` | Stránky jednotlivých služieb (pre vyhľadávanie a reklamu) |
| `404.html` | Stránka pre neexistujúcu adresu. Vercel aj Cloudflare ju zobrazia automaticky. |
| `ochrana-osobnych-udajov.html` | Ochrana osobných údajov (GDPR). Doplň údaje v `[ ]`. |
| `robots.txt`, `sitemap.xml` | Pre vyhľadávače. Po kúpe domény v nich nahraď `adamsomora.sk`. |
| `vercel.json`, `_headers` | Ukladanie súborov v prehliadači a bezpečnostné hlavičky (Vercel / Cloudflare) |
| `site.webmanifest`, `img/icons/` | Ikony pre mobil a záložky |
| `fonts/` | Písma uložené priamo na webe (bez Google Fonts) |
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

## Stránky služieb

- Každá služba má vlastnú stránku s nadpisom, videom, „pre koho", „čo dostanete", cenou a otázkami. Texty uprav priamo v HTML.
- Tlačidlá „Zistiť cenu" vedú na formulár s už vybraným typom videa (`index.html?typ=naborove#kontakt`). Funguje aj z reklamy alebo e-mailu.
- Odkazy na ne sú v pätičke a pod cenníkom. Novú službu pridáš skopírovaním jednej stránky a doplnením do `sitemap.xml` a pätičky.

## Orientačná cena vo formulári

- Ceny sú v `script.js` v objekte `CENNIK` (od–do podľa typu videa, doplnky, doprava za km). Uprav ich podľa seba, kým web spustíš.
- Ak rozpočet klienta nestačí, formulár mu to slušne povie a aj tak ho povzbudí napísať.
- Orientačná cena sa ti pošle spolu s dopytom (pole `orientacna_cena`).

## Projekty

- Výsledok v čísle (napr. „+40 %“) je pri každom projekte v zozname aj v detaile. Kým nemáš skutočné číslo, radšej tam daj krátky citát klienta než vymyslenú hodnotu.
- Náhľad pri prejdení myšou používa krátke klipy `video/nahlad2–5.mp4` (4 s, bez zvuku). Pri novom projekte vyrob podobný klip a nastav ho v atribúte `data-preview` riadku projektu.

## Cookies a meranie návštevnosti

- Pri prvej návšteve sa zobrazí lišta: Povoliť všetky / Odmietnuť všetky / Upraviť predvoľby. Odkaz „Nastavenia cookies“ v pätičke ju kedykoľvek otvorí znova.
- Analytika (Google Analytics 4, Microsoft Clarity) sa spustí až po súhlase. ID doplň v `consent.js` (`GA_ID`, `CLARITY_ID`). Kým sú tam `XXXX`, nenačíta sa nič.
- Ak meranie nechceš vôbec, lišta nie je potrebná. Stačí zo všetkých troch HTML stránok zmazať riadok s `consent.js` a odkaz „Nastavenia cookies“ a upraviť sekciu Cookies v ochrane osobných údajov.

## SEO: čo urobiť po spustení

1. **Doména:** v `index.html`, `ochrana-osobnych-udajov.html`, `sitemap.xml` a `robots.txt` nahraď `https://adamsomora.sk` svojou adresou (Ctrl/Cmd + Shift + H vo VS Code nahradí všade naraz).
2. **Google Search Console:** pridaj web a odošli `sitemap.xml`.
3. **Firemný profil na Google (Google Business Profile):** pre hľadanie typu „kameraman Bratislava" je to najsilnejší krok. Zbieraj na ňom recenzie od klientov.
4. **Obrázok na zdieľanie:** `img/og.jpg` sa zobrazí pri zdieľaní odkazu. Pri zmene showreelu ho vymeň (1200 × 630 px).
5. **Nové obrázky** ukladaj ako `.webp` a do `<img>` doplň `width` a `height`, aby stránka pri načítaní neposkakovala.

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
- [ ] V `ochrana-osobnych-udajov.html` doplnená adresa, dátum platnosti, poskytovatelia a overený spôsob prenosu dát do USA pri Formspree a hostingu
- [ ] Odkaz „Stránka 404" v pätičke je len na ukážku. Pred spustením ho zmaž z pätičky na všetkých troch stránkach.

## Poznámka k 404.html

Stránka 404 používa cesty od koreňa webu (`/styles.css`), lebo hosting ju zobrazí na akejkoľvek adrese, napr. `/neco/neexistuje`. Preto sa pri otvorení dvojklikom zobrazí bez štýlov. Cez Live Server (Go Live) a po nasadení funguje správne.
