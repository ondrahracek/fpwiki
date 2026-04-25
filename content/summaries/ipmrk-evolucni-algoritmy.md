---
title: "Evoluční algoritmy — principy a přehled"
course: ipmrk
type: summary
tags: [ipmrk, evolucni-algoritmy, metaheuristiky, simulated-annealing, tabu-search, aco, pso, differential-evolution, soma, ais, abc, gso]
sources: [raw/ipmrk/evolucni-algoritmy-online.md]
created: 2026-04-16
updated: 2026-04-16
---

# Evoluční algoritmy — principy a přehled

Zdroj: `raw/ipmrk/evolucni-algoritmy-online.md` (418 řádků, 13 algoritmů, ověřeno z Wikipedia, Cornell, Springer).

## Hlavní přínos zdroje

Podrobné principy, pseudokódy a vzorce pro 7 klíčových algoritmů + přehled 4 dalších. Doplňuje [[ipmrk-kniha|knihu]], která měla jen jmenný výčet bez vysvětlení. Vše podloženo URL zdrojů.

## Pokryté algoritmy a klíčové poznatky

### Trajektoriové metaheuristiky

**Simulated Annealing** — Metropolisovo kritérium `P = exp(-ΔE/T)`, geometrické chlazení `T := α·T` (α ∈ 0,8–0,995). Přijímá i horší řešení → únik z lokálních optim.

**Tabu Search** — Tabu list (krátká paměť zakázaných tahů), aspirační kritérium (override tabu pokud vede k novému best). Dlouhodobá paměť pro diverzifikaci.

### Swarm intelligence

**ACO** — Feromonová stopa τ, evaporace `τ := (1−ρ)·τ + Σ Δτ`. Pravděpodobnostní výběr uzlu váhou α (feromony) a β (heuristika). Vhodné pro grafové problémy (TSP).

**PSO** — Vzorec rychlosti: `v := w·v + c1·r1·(pbest−x) + c2·r2·(gbest−x)`. Inertia weight w, kognitivní c1 a sociální c2 koeficienty.

**SOMA** — Leader (nejlepší jedinec), migrace ostatních po cestě k Leaderovi. PathLength (jak daleko přestřelí), Step (jemnost prohledávání), PRT (perturbační vektor — zamrazení dimenzí).

**Glowworm Swarm** — Luciferin odpovídá kvalitě řešení. Pohyb k jasnějšímu sousedovi. Přirozeně nachází více optim naráz (multimodální problémy).

**Artificial Bee Colony** — 3 typy: Employed (přiřazeny ke zdroji), Onlooker (vybírají zdroj ruletou), Scout (náhodná nová místa po vyčerpání zdroje).

### Evoluční algoritmy

**Differential Evolution** — Mutace: `y = x_a + F·(x_b − x_c)`. Škálovací faktor F ∈ [0,2], crossover rate CR ∈ [0,1]. Greedy selekce trial vs. původní. Pro spojitou optimalizaci.

**SOMA** — Česká metaheuristika (Ivan Zelinka, VŠB Ostrava). Strategie AllToOne.

**Artificial Immune System (CLONALG)** — Klonální selekce: více klonů pro vyšší afinitu. Hypermutace: intenzita mutace ∝ 1/afinita. Paměťové buňky uchovávají nejlepší řešení.

### Základní metody

**Hill Climbing** — Varianta steepest ascent, first-choice, stochastic, random restart. Uvízne v lokálním optimu.

**Greedy** — Selhává u problémů se vzájemně závislými rozhodnutími (mince, knapsack). Funguje pro Kruskalův/Primův MST.

**Exhaustive/Random/Blind Search** — Exhaustive garantuje optimum, ale neúnosné pro velké prostory.

### GA vs. EA (hierarchie)
GA je podmnožinou EA. EA = zastřešující pojem (GA, ES, EP, GP, DE...). GA definován specifickými operátory: crossover + binární kódování.

## Přehledová tabulka

| Algoritmus | Typ | Inspirace | Klíčový mechanismus |
|---|---|---|---|
| Hill Climbing | Lokální | — | Iterativní zlepšování |
| Simulated Annealing | Trajektoriová | Metalurgie | Metropolisovo kritérium, chlazení |
| Tabu Search | Trajektoriová | Lidská paměť | Tabu list, aspirace |
| GA | Evoluční | Biologie | Selekce, crossover, mutace |
| DE | Evoluční | Evoluce | Mutace rozdílem vektorů |
| PSO | Swarm | Ptačí hejna | Osobní + globální best |
| ACO | Swarm | Mravenci | Feromony, evaporace |
| SOMA | Swarm | Sociální chování | Migrace k Leaderovi, PRT |
| AIS | Imuno | Imunitní systém | Klonální selekce, hypermutace |
| ABC | Swarm | Včely | Employed/Onlooker/Scout |
| GSO | Swarm | Světlušky | Luciferin, pohyb k jasnějšímu |
