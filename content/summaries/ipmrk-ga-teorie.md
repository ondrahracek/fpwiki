---
title: "IpmrK — Genetické algoritmy (teorie)"
course: ipmrk
type: summary
tags: [ipmrk, geneticke-algoritmy, optimalizace, selekce, krizeni, mutace]
sources: [raw/ipmrk/ga-teorie.md]
created: 2026-04-10
updated: 2026-04-10
---

# Genetické algoritmy — teorie

Zdroj: `raw/ipmrk/ga-teorie.md` | Kurz: [[ipmrk|IpmrK]]

## Shrnutí

Přednáška zavádí [[geneticke-algoritmy|genetické algoritmy]] jako evoluční optimalizační metodu. Pokrývá biologickou inspiraci, kódování řešení jako chromozomů, cyklus selekce–křížení–mutace a praktický postup návrhu.

## Hlavní body

1. **Biologická inspirace** — Mendel (dědičnost), Darwin (přirozený výběr), Goldberg. Principy: populace, selekce, křížení, mutace.

2. **Kódování** — řešení = chromozom (často binární řetězec). Gen = jednotlivý bit. Převod: H_D = a₃·2³ + a₂·2² + a₁·2¹ + a₀·2⁰.

3. **Cyklus GA**: inicializace → selekce → křížení → mutace → hodnocení → ukončení? → nová generace.

4. **Selekce** — lepší jedinci mají větší šanci na výběr (simulace přirozeného výběru), ale i horší mohou přežít pro zachování diverzity.

5. **Křížení** — dva rodiče si vymění části chromozomů → noví potomci s kombinovanými vlastnostmi. Hlavní mechanismus tvorby nových řešení.

6. **Mutace** — náhodná změna bitu (0↔1). Vzácná, ale důležitá — zabraňuje zamrznutí populace, umožňuje prohledat nové oblasti prostoru.

7. **Fitness funkce** — účelová funkce hodnotící kvalitu řešení (min náklady, max zisk, min odpad...). Bez ní by GA nevěděl, koho selektovat.

8. **Parametry** — velikost populace (~1000), pravděpodobnost křížení (~0,9), pravděpodobnost mutace (~0,1 nebo méně).

9. **Kritéria ukončení** — max generací, max iterací (~10 000), max čas (~50 min), populace se nemění.

10. **Příklady využití** — obchodní cestující (TSP), řezání materiálu, prostorové uložení (knapsack), výroba, klastrování, predikce.

## Zkouškové shrnutí

> Genetický algoritmus je evoluční optimalizační metoda, která pomocí populace chromozomů, selekce, křížení a mutace postupně hledá co nejlepší řešení podle zadané fitness funkce.

## Souvislosti

- [[geneticke-algoritmy|Genetické algoritmy]] — hlavní téma
- [[ipmrk-ga-vyuziti|Genetické algoritmy — využití]] — navazující přednáška o aplikacích
- [[optimalizace|Optimalizace]] — obecnější kontext
