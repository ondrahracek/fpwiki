---
title: Evoluční algoritmy
course: ipmrk
type: topic
tags: [ipmrk, evolucni-algoritmy, metaheuristiky, simulated-annealing, tabu-search, aco, pso, soma]
sources: [raw/ipmrk/kniha.md, raw/ipmrk/evolucni-algoritmy-online.md]
created: 2026-04-16
updated: '2026-04-25'
---

# Evoluční algoritmy

Evoluční algoritmy jsou rodina optimalizačních metod inspirovaných přírodními procesy — evolucí, chováním rojů, imunitním systémem aj. Umožňují řešit složité optimalizační úlohy, kde klasické gradientní metody selhávají. Každý algoritmus má své klady a zápory — je nutné prozkoumat, který bude aplikaci nejlépe vyhovovat.

Souvisí s: [[geneticke-algoritmy|genetické algoritmy]] (podmnožina EA), [[optimalizace]], [[datamining]].

## Základní princip

- Hledáme optimum **účelové funkce** za daných **omezujících podmínek**
- Algoritmy pracují iterativně s kandidátními řešeními
- Parametry výpočtu: velikost populace, počet iterací, specifické parametry algoritmu

## GA vs. EA — hierarchie

**Evoluční algoritmy (EA)** jsou zastřešující pojem. Zahrnují:
- **Genetické algoritmy (GA)** — binární kódování, selekce, crossover, mutace ([[geneticke-algoritmy|viz téma]])
- **Evoluční strategie (ES)** — reálné vektory, důraz na mutaci
- **Diferenciální evoluce (DE)** — mutace jako rozdíl vektorů
- **Genetické programování (GP)** — jedinci jsou programy/stromy

**Klíčový rozdíl:** GA je podmnožinou EA. GA je definován specifickými operátory (zejména crossover) a typicky binárním kódováním.

---

## Trajektoriové metaheuristiky

### Hill Climbing (Výstup na kopec)

Jednoduché lokální prohledávání — iterativně přechází do lepšího sousedního řešení.

**Varianty:**
- **Steepest Ascent** — vyhodnotí všechny sousedy, vybere nejlepšího
- **First-Choice** — přijme prvního lepšího souseda (rychlejší)
- **Stochastic** — náhodně vybírá z lepších sousedů
- **Random Restart** — opakovaně spouští HC z náhodných startů → překonává lokální optima

**Problém:** Uvízne v lokálním optimu — nemá mechanismus pro přijetí horšího řešení.

---

### Simulated Annealing (Simulované žíhání)

Pravděpodobnostní metaheuristika inspirovaná metalurgickým žíháním kovů.

**Klíčové pojmy:**
- **Teplota T** — řídí míru ochoty přijmout horší řešení. Vysoká T ≈ velká pravděpodobnost; T → 0 ≈ přijímáme jen lepší.
- **Cooling schedule** — geometrické chlazení: `T := α · T`, kde α ∈ (0,8; 0,995). Příliš rychlé → lokální optimum; příliš pomalé → algoritmus běží velmi dlouho.
- **Metropolisovo kritérium** — horší řešení (ΔE > 0) přijmeme s pravděpodobností:

```
P = exp(-ΔE / T)
```

**Pseudokód:**
```
s ← náhodné počáteční řešení
T ← T_max

opakuj dokud T > T_min:
    s_new ← náhodný soused(s)
    ΔE ← E(s_new) - E(s)

    pokud ΔE < 0:
        s ← s_new               // lepší řešení vždy přijmeme
    jinak:
        pokud random(0,1) < exp(-ΔE / T):
            s ← s_new           // horší řešení přijmeme s pravděp. P

    T ← α · T                   // geometrické ochlazování

vrať s
```

**Příklady použití:** PCB optimalizace, TSP, rozvrhování.

---

### Tabu Search (Prohledávání se zákazem)

Metaheuristika pro kombinatorickou optimalizaci (Fred Glover, 1986/1989). Používá paměť pro systematický průzkum stavového prostoru.

**Klíčové pojmy:**
- **Tabu list** — seznam nedávno provedených tahů. Tahy na seznamu jsou zakázány → brání cyklení. Pevná velikost, nejstarší záznamy se odstraňují.
- **Aspirační kritérium** — výjimka ze zákazu: pokud tabu tah vede k řešení lepšímu než dosud nejlepší, zákaz se ignoruje.
- **Dlouhodobá paměť** — sleduje frekventovaně navštívené oblasti; přesměruje prohledávání do neprozkoumaných oblastí (diverzifikace).

**Pseudokód:**
```
s ← počáteční řešení
s_best ← s
tabu_list ← prázdný

opakuj dokud podmínka ukončení:
    N ← vygeneruj sousední řešení
    admissible ← { s' ∈ N | s' není tabu NEBO splňuje aspirační kritérium }
    s ← nejlepší z admissible

    pokud E(s) < E(s_best):
        s_best ← s

    aktualizuj tabu_list

vrať s_best
```

**Příklady použití:** Rozvrhování (job scheduling), TSP, optimalizace sítí.

---

## Rojové metody (Swarm Intelligence)

### Ant Colony Optimization (ACO)

Inspirováno mravenci hledajícími cestu k potravě. Kratší cesty jsou více frekventovány → více feromonu → pozitivní zpětná vazba.

**Klíčové pojmy:**
- **Feromonová stopa τ_xy** — míra atraktivity hrany. Vyšší = větší pravděpodobnost výběru.
- **Evaporace** — `τ_xy := (1 − ρ) · τ_xy + Σ Δτ_xy^k`. Bez evaporace by algoritmus rychle konvergoval k první nalezené (suboptimální) cestě.
- **Heuristická informace η_xy** — typicky `η = 1/d_xy` (inverze vzdálenosti).

**Pravděpodobnostní vzorec výběru uzlu:**
```
p_xy^k = (τ_xy^α · η_xy^β) / Σ_z (τ_xz^α · η_xz^β)
```
kde α = váha feromonu, β = váha heuristiky.

**Příklady použití:** TSP, optimalizace sítí, logistika.

---

### Particle Swarm Optimization (PSO)

Simuluje chování ptačího hejna nebo rybí líhně (Kennedy a Eberhart, 1995).

**Klíčové pojmy:**
- **pbest** — nejlepší pozice, kterou daná částice dosud navštívila
- **gbest** — nejlepší pozice celého hejna
- **w** (inertia weight) — setrvačnost: vysoké w = explorace, nízké w = exploatace
- **c1** (kognitivní koeficient) — přitažlivost k vlastnímu pbest
- **c2** (sociální koeficient) — přitažlivost ke gbest

**Vzorec pro aktualizaci rychlosti a polohy:**
```
v_i,d ← w · v_i,d + c1 · r1 · (pbest_i,d - x_i,d) + c2 · r2 · (gbest_d - x_i,d)
x_i,d ← x_i,d + v_i,d
```
kde r1, r2 jsou náhodná čísla z [0, 1].

**Příklady použití:** Spojitá optimalizace, trénování [[umele-neuronove-site|neuronových sítí]], optimalizace parametrů.

---

### SOMA — Self-Organizing Migrating Algorithm

Česká metaheuristika (Ivan Zelinka, VŠB Ostrava). Jedinci migrují k nejlepšímu jedinci (Leaderovi), místo reprodukce.

**Klíčové pojmy:**
- **Leader** — jedinec s nejlepší hodnotou účelové funkce v populaci (přehodnocuje se každou migraci)
- **PathLength** — jak daleko za Leadera jedinec „přestřelí" (typicky 3,0)
- **Step** — velikost kroku; menší = jemnější prohledávání trasy, více vyhodnocení funkce
- **PRT vektor** — perturbační vektor: každá dimenze pohybu je s pravděpodobností (1−PRT) „zmrazena" → diverzita

**Strategie AllToOne — pseudokód:**
```
urči Leader ← nejlepší f(x) v populaci

pro každého jedince x_i ≠ Leader:
    t ← 0
    x_i_best ← x_i

    opakuj dokud t < PathLength:
        vygeneruj PRT vektor (dim = 1 s pravděp. PRT, jinak 0)
        x_trial = x_i + t · (Leader - x_i) · PRT_vektor

        pokud f(x_trial) < f(x_i_best):
            x_i_best ← x_trial

        t ← t + Step

    x_i ← x_i_best    // přesuň jedince na nejlepší pozici na trase

aktualizuj Leader pro příští migraci
```

---

### Artificial Bee Colony (ABC)

Inspirováno chováním včelího roje (Derviş Karaboğa, 2005).

**Tři typy včel:**
- **Employed bees** (zaměstnané) — přiřazeny ke zdroji, prohledávají okolí, sdílejí informace
- **Onlooker bees** (čekající) — vybírají zdroj pravděpodobnostně podle kvality (waggle dance), ruletová selekce
- **Scout bees** (průzkumné) — po vyčerpání zdroje hledají náhodně nový → udržují diverzitu

---

### Glowworm Swarm Optimization (GSO)

Inspirováno světluškami (Krishnanand a Ghose, 2005).

**Princip:** Luciferin odpovídá kvalitě řešení. Světluška se pohybuje k jasnějšímu (lepšímu) sousedovi. Přirozeně nachází více optim naráz — vhodné pro **multimodální optimalizaci**.

**Aktualizace luceferinu:** `l_i ← (1 − ρ) · l_i + γ · J(x_i)`

---

## Evoluční algoritmy (detailní)

### Differential Evolution (DE)

Evoluční algoritmus pro spojitou optimalizaci (Storn a Price, 1997). Mutace jako rozdíl vektorů — nevyžaduje gradient.

**Klíčové parametry:**
- **F** (scaling factor) — váha diferenčního vektoru, typicky F ≈ 0,8; F ∈ [0, 2]
- **CR** (crossover rate) — pravděpodobnost přijetí hodnoty z mutantu, typicky CR ≈ 0,9; CR ∈ [0, 1]

**Vzorec mutace (strategie DE/rand/1):**
```
y_i = x_a + F · (x_b - x_c)
```
kde a, b, c jsou tři náhodně vybraní jedinci (a ≠ b ≠ c ≠ i).

**Jedna generace (pseudokód):**
```
pro každého jedince x_i:
    // Mutace
    y_i = x_a + F · (x_b - x_c)

    // Křížení (binomiální)
    pro každou dimenzi d:
        pokud random(0,1) < CR nebo d = d_rand:
            trial_i,d = y_i,d      // z mutantu
        jinak:
            trial_i,d = x_i,d     // z originálu

    // Selekce (greedy)
    pokud f(trial_i) ≤ f(x_i):
        x_i ← trial_i
```

---

### Artificial Immune System (AIS) — CLONALG

Inspirováno biologickým imunitním systémem (De Castro a Von Zuben, 2000).

**Klíčové pojmy:**
- **Antigen** — optimalizační problém
- **Protilátka** — kandidátní řešení
- **Afinita** — míra kvality řešení
- **Klonální selekce** — jedinci s vyšší afinitou vytvářejí více klonů
- **Hypermutace** — intenzita mutace ∝ 1/afinita (slabší jedinci mutují silněji)
- **Paměťové buňky** — uchovávají nejlepší nalezená řešení

**Pseudokód (CLONALG):**
```
inicializuj populaci P náhodně; inicializuj paměť M

opakuj dokud podmínka ukončení:
    vypočti afinitu f(p_i) pro každého jedince
    vyber n nejlepších protilátek
    klonuj je (počet klonů ∝ afinita)
    aplikuj hypermutaci (intenzita ∝ 1/afinita)
    vyber nejlepší klony → aktualizuj M
    nahraď nejhorší jedince náhodnými novými

vrať nejlepší z M
```

---

## Základní prohledávací metody

| Metoda | Princip | Kdy použít |
|---|---|---|
| **Exhaustive Search** | Prohledá úplně všechna řešení; garantuje optimum | Malé prostory (do ~10⁶ kombinací) |
| **Random Search** | Náhodné vzorkování; vrací nejlepší nalezené | Baseline, extrémně nespojité prostory |
| **Blind Search** | Bez heuristické informace (BFS, DFS, random) | Neinformované prohledávání |
| **Scatter Search** | Kombinace referenčních řešení z různých oblastí | Kombinatorická optimalizace |
| **Backtracking** | Zpětné vracení při neúspěchu | Constraint satisfaction problémy |
| **Greedy** | V každém kroku lokálně nejlepší volba | Funguje pro MST (Kruskal, Prim); selhává pro knapsack, mince |

---

## Přehledová tabulka všech algoritmů

| Algoritmus | Typ | Inspirace | Klíčový mechanismus | Vhodné pro |
|---|---|---|---|---|
| Hill Climbing | Lokální | — | Iterativní zlepšování | Jednoduché problémy |
| Simulated Annealing | Trajektoriová | Metalurgie | Metropolisovo kritérium, chlazení | Kombinatorická i spojitá |
| Tabu Search | Trajektoriová | Lidská paměť | Tabu list, aspirace | Kombinatorická |
| Genetic Algorithm | Evoluční | Biologie | Selekce, crossover, mutace | Diskrétní i spojité |
| Differential Evolution | Evoluční | Evoluce | Mutace rozdílem vektorů | Spojitá optimalizace |
| PSO | Swarm | Ptačí hejna | pbest + gbest + inertia | Spojitá optimalizace |
| ACO | Swarm | Mravenci | Feromony, evaporace | Kombinatorická (grafy) |
| SOMA | Swarm | Sociální chování | Migrace k Leaderovi, PRT | Spojitá i diskrétní |
| AIS (CLONALG) | Imuno | Imunitní systém | Klonální selekce, hypermutace | Optimalizace, pattern rec. |
| Artificial Bee Colony | Swarm | Včely | Employed/Onlooker/Scout | Spojitá i kombinatorická |
| Glowworm Swarm | Swarm | Světlušky | Luciferin, pohyb k jasnějšímu | Multimodální optimalizace |

## Praktické aplikace

- Rozvrhování výroby a výuky
- [[optimalizace|Optimalizace]] ekonomických problémů (min. nákladů, min. rizik)
- Optimalizace technických systémů
- Trénování [[umele-neuronove-site|neuronových sítí]] a ladění parametrů modelů
- [[datamining|Datamining]] — klastrování dat (PSO, ABC)

## Kontrolní otázky ke zkoušce

1. Popište metodu a vysvětlete princip evolučních algoritmů.
2. Popište realizaci a výpočet evolučních algoritmů na počítači.
3. Jak lze využít evolučních algoritmů v praxi?

## Pojmy k zapamatování

Evoluční algoritmy, optimalizace, účelová funkce, omezující podmínky, parametry výpočtu, Exhaustive Search, Random Search, Blind Search, Scatter Search, Backtracking, Greedy, Hill Climbing, Tabu Search, Simulated Annealing, Ant Colony, Particle Swarms, Artificial Bee Colony, Glowworm Swarm, Genetic Search, DNA Based Genetic Algorithm, Parallel Genetic Search, Diploid and Haploid Genetic Search, Differential Evolution, Artificial Immune System, SOMA Evolution Strategy, Psychoclonal Search.

## Zdroje v kurzu [[ipmrk|IpmrK]]

- [[ipmrk-kniha|Kniha]] — přehled algoritmů, kontrolní otázky, pojmy k zapamatování
- [[ipmrk-evolucni-algoritmy|Principy a přehled]] — pseudokódy, vzorce, detailní principy (Wikipedia, Cornell, Springer)
