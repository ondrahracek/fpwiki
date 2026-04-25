---
title: IpmrK — Co studovat ke zkoušce
course: ipmrk
type: output
tags: [ipmrk, zkouska, mezery]
sources: [raw/ipmrk/kniha.md]
created: 2026-04-16
updated: '2026-04-25'
---

# IpmrK — Co studovat ke zkoušce

Přehled 7 zkouškových témat, stav pokrytí ve wiki a co je třeba ještě dohledat.

## Stav pokrytí

| # | Téma | Pokrytí | Co chybí |
|---|---|---|---|
| 1 | [[fuzzy-logika|Fuzzy logika]] | ✅ Dobré | Máme teorii, Excel i MATLAB. Kontrolní otázky doplněny. |
| 2 | [[umele-neuronove-site|Neuronové sítě]] | ✅ Dobré | Máme teorii, výpočet i aplikace. Kontrolní otázky doplněny. |
| 3 | [[geneticke-algoritmy|Genetické algoritmy]] | ✅ Dobré | Máme teorii i využití. Kontrolní otázky doplněny. |
| 4 | [[evolucni-algoritmy|Evoluční algoritmy]] | ⚠️ Základ | Máme jen přehled z knihy. Chybí detailní popisy algoritmů. |
| 5 | [[teorie-chaosu|Teorie chaosu]] | ✅ Dobré | Máme podrobnou přednášku. Kontrolní otázky doplněny. |
| 6 | [[optimalizace|Optimalizace]] | ❌ Mezera | Jen shrnutí z knihy. Chybí MATLAB příkazy, příklady úloh. |
| 7 | [[datamining|Datamining]] | ❌ Mezera | Jen shrnutí z knihy. Chybí Witness Miner, příklady, techniky. |

## Co dohledat online / ze zdrojů

### Priorita 1 — Největší mezery

1. **[[optimalizace|Optimalizace]] — MATLAB příkazy a příklady**
   - MATLAB příkazy: `fmincon`, `fminsearch`, `linprog`, `intlinprog`, `ga`, `optimoptions`
   - Nastavení parametrů optimalizace
   - Ukázkové úlohy s řešením
   - Hledat: *MATLAB Optimization Toolbox tutorial*, *optimalizace MATLAB příklady*

2. **[[datamining|Datamining]] — techniky a nástroje**
   - Link analýza — jak funguje, příklady
   - Klastrování — k-means, hierarchické, příklady
   - Rozhodovací stromy — princip, informační zisk, příklady
   - Witness Miner — jak se používá, screenshoty, workflow
   - Hledat: *datamining tutorial*, *Witness Miner Lanner*, *rozhodovací stromy příklady*

3. **[[evolucni-algoritmy|Evoluční algoritmy]] — detaily algoritmů**
   - Simulated Annealing — princip, teplota, cooling schedule
   - Ant Colony Optimization — feromony, jak funguje
   - Particle Swarm Optimization — osobní/globální best, rychlost
   - Tabu Search — paměť, tabu list
   - Differential Evolution — mutace jako rozdíl vektorů
   - SOMA — princip migrace
   - Hledat: *evoluční algoritmy principy*, *metaheuristiky přehled*, *swarm intelligence*

### Priorita 2 — Doplnění existujících témat

4. **Ladění (tuning) neuronových sítí** — praktické rady, jak volit topologii, přenosovou funkci, počet vstupů
5. **Box-Jenkinsova metodologie** — zmíněna v knize u NN, ale nemáme detaily
6. **Aplikace fuzzy logiky** — konkrétní případové studie z knihy (bonita klienta, výběr zaměstnance)

### Priorita 3 — Doplňky

7. **Přenosové funkce** — kompletní přehled (lineární, sigmoid, tanh, ReLU, softmax)
8. **MATLAB příkazy pro GA** — `ga()`, `gaoptimset`, nastavení parametrů
9. **Fraktály v ekonomii** — konkrétní příklady, fraktální analýza trhů

## Celkový počet kontrolních otázek ke zkoušce

| Téma | Počet otázek |
|---|---|
| [[fuzzy-logika|Fuzzy logika]] | 7 |
| [[umele-neuronove-site|Neuronové sítě]] | 7 |
| [[geneticke-algoritmy|Genetické algoritmy]] | 7 |
| [[evolucni-algoritmy|Evoluční algoritmy]] | 3 |
| [[teorie-chaosu|Teorie chaosu]] | 6 |
| [[optimalizace|Optimalizace]] | 4 |
| [[datamining|Datamining]] | 9 |
| **Celkem** | **43** |

## Celkový počet pojmů k zapamatování

| Téma | Počet pojmů |
|---|---|
| [[fuzzy-logika|Fuzzy logika]] | 8 |
| [[umele-neuronove-site|Neuronové sítě]] | 5 |
| [[geneticke-algoritmy|Genetické algoritmy]] | 9 |
| [[evolucni-algoritmy|Evoluční algoritmy]] | 27 |
| [[teorie-chaosu|Teorie chaosu]] | 7 |
| [[optimalizace|Optimalizace]] | 5 |
| [[datamining|Datamining]] | 8 |
| **Celkem** | **69** |

## Doporučený postup studia

1. ✅ Projít témata, která máme dobře pokryta (fuzzy, NN, GA, chaos) — opakování
2. ⚠️ Dohledat online materiály k evolučním algoritmům, optimalizaci a dataminingu
3. 📝 Procvičit kontrolní otázky — umět odpovědět vlastními slovy
4. 🧠 Zapamatovat pojmy — 69 klíčových termínů
5. 🔗 Pochopit propojení metod — fuzzy/NN/GA se používají v dataminingu
