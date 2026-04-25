---
title: Genetické algoritmy
courses: [ipmrk]
type: topic
tags: [ipmrk, geneticke-algoritmy, optimalizace, selekce, krizeni, mutace]
sources: [raw/ipmrk/ga-teorie.md, raw/ipmrk/ga-vyuziti.md, raw/ipmrk/kniha.md]
created: 2026-04-10
updated: '2026-04-25'
---

# Genetické algoritmy

![[ga-cyklus.jpeg|Cyklus genetického algoritmu — populace → fitness → selekce → křížení → mutace → nová generace]]

Evoluční optimalizační metoda inspirovaná biologickou dědičností a přirozeným výběrem (Mendel, Darwin). Místo přímého hledání řešení pracuje s **populací kandidátních řešení**, která se postupně zlepšuje.

## Základní pojmy

- **Chromozom** — kódované řešení (často binární řetězec, např. 1100)
- **Gen** — jednotlivý bit chromozomu
- **Fitness funkce** — účelová funkce hodnotící kvalitu řešení
- **Populace** — soubor chromozomů v jedné generaci

## Cyklus algoritmu

![[ga-krizeni-mutace.jpeg|Křížení (crossover) a mutace — základní genetické operátory]]

1. **Inicializace** — vytvoření počáteční (náhodné) populace
2. **Hodnocení** — ohodnocení každého chromozomu fitness funkcí
3. **Selekce** — výběr lepších jedinců (lepší = větší šance přežít, ale i horší mohou zůstat pro diverzitu)
4. **Křížení** — kombinace dvou rodičů → potomci s vlastnostmi obou (pravděpodobnost ~0,9)
5. **Mutace** — náhodná změna bitu (0↔1), vzácná (~0,1), zabraňuje zamrznutí populace
6. **Ukončení?** — pokud ne, zpět na krok 2 (nová generace)

## Parametry

- Velikost populace (~1000)
- Pravděpodobnost křížení (~0,9)
- Pravděpodobnost mutace (~0,1 nebo méně)
- Kritéria ukončení: max generací, max čas, populace se nemění

## Binární kódování

Chromozom jako binární řetězec → převod na reálnou hodnotu:
H_D = a₃·2³ + a₂·2² + a₁·2¹ + a₀·2⁰

Mapování na interval [x_min, x_max] umožňuje optimalizovat reálné parametry.

## Dva typy úloh

- **Přímá optimalizace** — min nákladů, max zisku, min času, min odpadu
- **Parametrická optimalizace modelu** — nejlepší parametry funkce, nejlepší nastavení predikčního systému

## Aplikace

| Oblast | Příklad |
|---|---|
| Ekonomika | Minimalizace nákladů, maximalizace zisku |
| Výroba | Minimalizace výrobního času, rozvrhování strojů |
| Logistika | Obchodní cestující (TSP), nejkratší trasa |
| Materiál | Cutting plan — řezání s minimálním odpadem |
| Investice | Knapsack — výběr projektů při omezeném rozpočtu |
| Data | Aproximace měřených dat, klastrování, segmentace |
| Finance | [[predikce|Predikce]] — optimalizace parametrů modelu/strategie |

## Výhody a nevýhody

**Výhody**: nepotřebují derivace, pracují s diskrétními i spojitými problémy, zvládají mnoho lokálních extrémů, univerzálně použitelné.

**Nevýhody**: negarantují globální optimum, výpočetně náročné, výsledek závisí na nastavení parametrů.

## Propojení s dalšími tématy

- [[umele-neuronove-site|Neuronové sítě]] — GA mohou optimalizovat architekturu sítě
- [[predikce|Predikce]] — optimalizace predikčních modelů
- [[fuzzy-logika|Fuzzy logika]] — GA mohou ladit parametry fuzzy systému

## Kontrolní otázky ke zkoušce

1. Popište metodu a vysvětlete princip genetických algoritmů.
2. Popište realizaci a výpočet genetických algoritmů na počítači.
3. Jak lze využít genetických algoritmů v praxi?
4. Jaké jsou prvky reprodukce?
5. Co znamená proces selekce?
6. Co znamená proces mutace?
7. Jaká se volí velikost populace?

## Pojmy k zapamatování

Genetické algoritmy, optimalizace, reprodukce, selekce, křížení, mutace, účelová funkce, omezující podmínky, parametry výpočtu.

## Zdroje v kurzu [[ipmrk|IpmrK]]

- [[ipmrk-ga-teorie|Genetické algoritmy — teorie]]
- [[ipmrk-ga-vyuziti|Genetické algoritmy — využití]]
- [[ipmrk-kniha|Kniha]] — shrnutí kapitoly, kontrolní otázky, pojmy
