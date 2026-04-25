---
title: Teorie chaosu
courses: [ipmrk]
type: topic
tags: [ipmrk, chaos, atraktory, fraktaly, hurst, motyli-efekt, logisticka-funkce, lorenz]
sources: [raw/ipmrk/chaos.md, raw/ipmrk/kniha.md]
created: 2026-04-10
updated: '2026-04-25'
---

# Teorie chaosu

![[chaos-lorenz-atraktor.jpeg|Lorenzův podivný atraktor — motýlí tvar chaotické trajektorie v 3D prostoru]]

Zkoumá deterministické nelineární systémy, které se chovají nepravidelně a jsou extrémně citlivé na počáteční podmínky. Chaos ≠ náhoda — leží na spektru mezi řádem a náhodností.

## Klíčové pojmy

### Chaos

- Systém je **deterministický** (má pravidla), ale dlouhodobě **těžko předvídatelný**
- Spektrum: řád → **chaos** → náhodnost
- Vzniká v dynamických systémech se **zpětnou vazbou** a **nelinearitou**

### Motýlí efekt

- Extrémní citlivost na počáteční podmínky (Lorenz)
- Malá změna na začátku → obrovský rozdíl v čase
- Důsledek: dlouhodobá přesná předpověď je prakticky nemožná

### Atraktory

Množina stavů, ke kterým systém směřuje nebo v nichž se pohybuje:

| Typ | Chování | Příklad |
|---|---|---|
| **Bodový** | Ustálení v rovnováze | Kyvadlo s tlumením |
| **Cyklický** | Periodické opakování | Sezónní cykly |
| **Chaotický (podivný)** | Složitý pohyb bez přesného opakování | Strange attractor |

### Logistická funkce

![[chaos-bifurkace.jpeg|Bifurkační diagram logistické funkce — přechod od stability přes zdvojování period k chaosu]]

x_{n+1} = r · xₙ · (1 − xₙ)

Jednoduchá rovnice, která podle parametru r generuje: stabilitu → oscilace → chaos. Klasická demonstrace teorie chaosu.

### Fraktály

- **Soběpodobné obrazce** — podobný tvar v různých měřítkách (Mandelbrot)
- Příklady: stromy, mraky, cenové grafy
- **Fraktální dimenze** D = 2 − H — měří složitost/nepravidelnost útvaru

### Hurstův exponent (H)

Analýza časových řad:

| Hodnota | Interpretace |
|---|---|
| H = 0,5 | Náhodný proces |
| H > 0,5 | Persistence / trendovost |
| H < 0,5 | Antipersistence |

### Elliottovy vlny

Teorie tržních pohybů ve vlnách (impulsy + korekce). Ilustrace vnitřní struktury zdánlivě nepravidelného vývoje.

## Zpětná vazba

Klíčový mechanismus chaosu: výstup systému zpětně ovlivňuje vstup → malé změny se zesilují.

V ekonomii: očekávání investorů → ceny → chování investorů → ceny.

## Výskyt chaosu

Matematika, fyzika, chemie, biologie, psychologie, ekonomie, finance, politika. Počasí, turbulence, finanční trhy, ekonomické cykly, sociální procesy.

## Propojení s dalšími tématy

- [[predikce|Predikce]] — chaos omezuje dlouhodobou předpověditelnost
- [[fuzzy-logika|Fuzzy logika]] — oba řeší nejistotu, ale jinak (neostrost vs. dynamická nepředvídatelnost)
- [[umele-neuronove-site|Neuronové sítě]] — mohou se učit vzory v chaotických datech

## Kontrolní otázky ke zkoušce

1. Co je to chaos?
2. Co je to atraktor?
3. Jaké jsou typy atraktoru?
4. Co je to fraktál?
5. Co jsou to Elliottovy vlny?
6. Kdo je zakladatelem teorie fraktálů?

## Pojmy k zapamatování

Chaos, nahodilost a řád, rovnováha, atraktor, fraktál, soběpodobnost, soběpříbuznost.

## Zdroje v kurzu [[ipmrk|IpmrK]]

- [[ipmrk-chaos|Teorie chaosu — shrnutí přednášky]]
- [[ipmrk-kniha|Kniha]] — shrnutí kapitoly, kontrolní otázky, pojmy
