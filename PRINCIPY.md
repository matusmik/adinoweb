# Princípy použité na webe

Prehľad, prečo je web postavený tak, ako je. Rovnaké vysvetlenia vidíš priamo na webe v žltých poznámkach (vypneš ich zmazaním class="notes-on" z tagu <html> v index.html).

## Alex Hormozi – ponuka a predaj ($100M Offers)

| Princíp | Kde na webe |
|---|---|
| **Value Equation**: hodnota = (vysnený výsledok × pravdepodobnosť úspechu) / (čas × námaha) | Hero: „TV kvalita" (výsledok), Markíza (pravdepodobnosť), „10 dní" (čas), „vy si vyhradíte jeden deň" (námaha) |
| **Pomenuj problém** skôr než riešenie | Sekcia „Väčšina firemných videí skončí…" |
| **Grand Slam Offer**: pridaj bonusy namiesto zľavy | Balík Firemné video: bonus 3 vertikálne zostrihy |
| **Cenová kotva** | Prečiarknutá hodnota 1 690 € pri balíku za 1 190 € |
| **Risk reversal (záruka)** | Sekcia Záruka: vrátenie zálohy |
| **Vzácnosť a naliehavosť** | Max. 4 projekty mesačne + najbližší voľný termín. **Len ak je to pravda.** |
| **Odstráň námietky** | FAQ: cena, scenár, licencia, čas, doprava, platba |

## Jon Yablonski – Laws of UX (lawsofux.com)

| Zákon | Kde na webe |
|---|---|
| **Jakobov zákon**: ľudia čakajú, že web funguje ako iné weby | Klasická hlavička, navigácia hore, kontakt na konci |
| **Fittsov zákon**: veľké a blízke ciele sa trafia ľahšie | Tlačidlá min. 48 px, CTA v hlavičke stále viditeľné |
| **Hickov zákon**: viac možností = pomalšie rozhodnutie | 3 balíky, 3 fakty v hero |
| **Millerov zákon / chunking** | Fakty, problémy, kroky v skupinách po 3–4 |
| **Von Restorffov efekt**: odlišný prvok si zapamätáš | Tmavý stredný balík, červené čísla výsledkov |
| **Serial position effect**: pamätáme si prvé a posledné | Najsilnejší projekt prvý, CTA na začiatku aj na konci |
| **Peak-end rule** | Silná referencia tesne pred formulárom |
| **Goal-gradient efekt** | Formulár v krokoch s ukazovateľom postupu |
| **Zeigarnikov efekt**: nedokončené úlohy ťahajú | „Krok 1 z 3" motivuje dokončiť |
| **Teslerov zákon**: zložitosť niekto musí niesť | Klient vidí 4 jednoduché kroky, technika je na tebe |
| **Aesthetic-usability effect** | Čistý dizajn zvyšuje dôveru aj toleranciu chýb |
| **Doherty threshold** (< 400 ms) | Statický web, lazy-loading videí, minimum JS |

## Apple – Human Interface Guidelines

| Princíp | Kde na webe |
|---|---|
| **Clarity**: čitateľnosť a jasná hierarchia | Veľké nadpisy, jedna hlavná myšlienka na sekciu |
| **Deference**: rozhranie ustúpi obsahu | Tichý podklad, jedna akcentová farba, videá sú hrdina |
| **Depth / vrstvenie** | Priesvitná sticky hlavička, tmavá sekcia záruky |
| **Systémové písmo** | Text v SF Pro / Segoe / Roboto podľa zariadenia |
| **Dotykové ciele ≥ 44 pt** | Všetky tlačidlá, čipy vo formulári, FAQ |
| **Tmavý režim** | Automaticky podľa nastavenia zariadenia |
| **Prístupnosť** | Kontrast, viditeľný fokus, „Preskočiť na obsah", rešpektuje „obmedziť pohyb" |

## Anti-AI vzhľad

- Žiadne gradienty, glassmorphism efekty ani svietiace karty.
- Jedno výrazné písmo (Instrument Serif) namiesto defaultného Inter.
- Detaily z remesla: REC bodka, timecode, rámik hľadáčika.
- Konkrétne čísla, mená a odvetvia namiesto všeobecných fráz.
- Skutočné fotky zo setu a text v prvej osobe.

## Inšpirácia: dotoonystudio.sk

| Prvok | Ako je prenesený na video |
|---|---|
| Provokatívna otázka v hero („Zoberte preč logo…") | „Vypnite zvuk. Pochopí divák aj tak, čo predávate?" |
| Čísla: roky praxe a počet projektov | Fakty v hero: roky, projekty, 10 dní |
| Problémové karty s kurzívovými štítkami | 4 problémy so štítkom (strata pozornosti, bez cieľa…) |
| Projekty otvárané v detaile so šípkami | Modálne okno: celé video, príbeh zo zákulisia, galéria záberov, ← → a Esc |
| Ľudský príbeh v projekte („produkt som ochutnal") | Pole `story` pri každom projekte |
| Prepínač svetlý / tmavý režim | Tlačidlo v hlavičke, voľba sa pamätá |

Čo zámerne **nepreberám**: ich web nemá ceny ani referencie klientov. Pre B2B službu s pevnými balíkmi je to slabšie. Ceny a referencie skracujú rozhodovanie.
