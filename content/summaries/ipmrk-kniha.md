---
title: "IpmrK Kniha — Pokročilé metody analýz a modelování"
course: ipmrk
type: summary
tags: [ipmrk, kniha, fuzzy, neuronove-site, geneticke-algoritmy, evolucni-algoritmy, chaos, optimalizace, datamining, zkouska]
sources: [raw/ipmrk/kniha.md]
created: 2026-04-16
updated: 2026-04-16
---

# IpmrK Kniha — Pokročilé metody analýz a modelování

Shrnutí učebnice prof. Dostála pokrývající všech 7 kapitol kurzu [[ipmrk|IpmrK]]. Zdroj obsahuje pro každou kapitolu: shrnutí, kontrolní otázky a pojmy k zapamatování. Oproti dosud zpracovaným zdrojům přidává **3 zcela nová témata**: [[evolucni-algoritmy|evoluční algoritmy]], [[optimalizace|optimalizaci]] a [[datamining]].

## Pokryté kapitoly

### 1. [[fuzzy-logika|Fuzzy logika]] (kap. 2)
- Teorie L. Zadeha — funkce členství μ(x) ∈ [0, 1]
- Pipeline: fuzzifikace → fuzzy inference → defuzzifikace
- Jazykové proměnné, atributy, transformační/retransformační matice
- Aplikace: výběr banky, bonita klienta, výběr pojišťovny, nemovitosti, zaměstnance aj.

### 2. [[umele-neuronove-site|Neuronové sítě]] (kap. 3)
- Princip myšlení lidského mozku → učení, testování, realizace
- Vstupní matice, přenosová funkce, topologie sítě
- Ladění (tuning) — nejsložitější a nejdůležitější část
- Nevýhoda: „černá skříňka"
- Box-Jenkinsova metodologie

### 3. [[geneticke-algoritmy|Genetické algoritmy]] (kap. 4)
- Reprodukce: selekce → křížení → mutace
- Účelová funkce, omezující podmínky, velikost populace, délka chromozomu
- Parametry křížení, selekce, přechod do další generace

### 4. [[evolucni-algoritmy|Evoluční algoritmy]] (kap. 5) ⭐ NOVÉ
- Přehled algoritmů: Exhaustive/Random/Blind/Scatter Search, Backtracking, Greedy, Hill Climbing, Tabu Search, Simulated Annealing
- Rojové metody: Ant Colony, Particle Swarms, Artificial Bee Colony, Glowworm Swarm
- Genetické varianty: DNA Based GA, Parallel Genetic Search, Diploid/Haploid GA
- Další: Differential Evolution, Artificial Immune System, SOMA, Psychoclonal Search
- Aplikace: rozvrhování výroby, tvorba výuky, optimalizace ekonomických/technických systémů

### 5. [[teorie-chaosu|Teorie chaosu]] (kap. 6)
- Chaos, atraktory (bodový, cyklický, chaotický), fraktály
- Soběpodobnost a soběpříbuznost
- Elliottovy vlny, zakladatel teorie fraktálů
- Ekonomické systémy → chaotický atraktor, omezená predikce

### 6. [[optimalizace|Optimalizace]] (kap. 7) ⭐ NOVÉ
- Hledání minima/maxima funkce f(x) na množině M
- Účelová (cílová) funkce, množina přípustných řešení
- Omezení: soustavy rovnic/nerovnic
- MATLAB příkazy pro optimalizaci, nastavení parametrů

### 7. [[datamining|Datamining]] (kap. 8) ⭐ NOVÉ
- „Dolování z dat" — rozvoj od 90. let (kreditní karty bank)
- Cíl: zvýšení zisku, snížení nákladů a rizika
- Techniky: Link analýza, klastrování, rozhodovací stromy
- Nástroje: MATLAB, Witness Miner
- Získávání → příprava → klasifikace → vzorkování → čištění → sumarizace → vyhodnocení

## Klíčový přínos zdroje

Kniha poskytuje ucelený pohled na **všech 7 metod** kurzu a explicitně definuje zkouškové otázky a pojmy k zapamatování. Tři kapitoly (evoluční algoritmy, optimalizace, datamining) dosud nebyly ve wiki pokryty žádným zdrojem.
