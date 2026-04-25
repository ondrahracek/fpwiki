---
title: "Datamining — techniky a nástroje"
course: ipmrk
type: summary
tags: [ipmrk, datamining, crisp-dm, link-analyza, klastrovani, kmeans, rozhodovaci-stromy, apriori, witness-miner, matlab]
sources: [raw/ipmrk/datamining-online.md]
created: 2026-04-16
updated: 2026-04-16
---

# Datamining — techniky a nástroje

Zdroj: `raw/ipmrk/datamining-online.md` (539 řádků, 14+ zdrojů: Wikipedia, GeeksforGeeks, IBM, MathWorks, Lanner, systemonline.cz).

## Hlavní přínos zdroje

Podrobné vysvětlení všech technik ze zkouškových otázek. Doplňuje [[ipmrk-kniha|knihu]] — ta měla jen shrnutí a pojmy, zde jsou vzorce, algoritmy, MATLAB kód a historické pozadí.

## Obsah

### Definice a historie
- Termín KDD (1989, Piatetsky-Shapiro), rozšíření v 90. letech (bankovnictví → pojišťovnictví → retail)
- Datamining = analytický krok KDD procesu
- Průnik: strojové učení + statistika + správa databází

### CRISP-DM (6 fází)
1. Business Understanding — definice cílů
2. Data Understanding — průzkum dat
3. **Data Preparation** — nejnáročnější, 50–80 % úsilí (čištění, klasifikace, vzorkování, sumarizace, transformace)
4. Modeling — aplikace technik
5. Evaluation — ověření vůči obchodním cílům
6. Deployment — nasazení do praxe

Iterativní — nutné se vracet zpět.

### Link analýza
- Reprezentace jako **graf** (uzly = entity, hrany = vztahy)
- Typy: heuristické, šablonové, podobnostní, statistické přístupy
- Příklady: FBI ViCAP, fraud detection (fraud rings), Google PageRank, sociální sítě
- Historický vývoj: ruční maticové grafy (1975) → IBM i2 Analyst's Notebook → automatická vizualizace

### Klastrování
- **K-means**: inicializace → přiřazení (min. eukl. vzdálenost) → aktualizace centroidů → opakování. Výběr k: Elbow method, Silhouette, Gap statistic.
- **Hierarchické**: dendrogram, Ward metoda (nejlepší pro rovnoměrné clustery). Počet clusterů = řez dendrogramem u nejdelší svislé části bez horizontálního přerušení.

### Rozhodovací stromy — vzorce
- **Entropie**: `H(S) = −Σ pᵢ·log₂(pᵢ)` — H=0 čistý uzel, H=1 max. smíšený
- **Informační zisk**: `Gain(S,A) = H(S) − Σ (|Sᵥ|/|S|)·H(Sᵥ)` — volíme atribut s max. ziskem
- **Gini impurity**: `Gini(S) = 1 − Σ pᵢ²` — Gini=0 čistý, max 0,5 (binární)
- Algoritmy: ID3 (entropie), C4.5 (gain ratio, spojité proměnné), CART (Gini, binární strom)

### Apriori algoritmus
- **Support**: `count(A)/celkem` — jak často se A vyskytuje
- **Confidence**: `Support(A∪B)/Support(A)` — P(B|A)
- **Lift**: `Confidence(A→B)/Support(B)` — Lift>1 = pozitivní asociace
- Anti-monotone property: pokud A není frekventovaná, žádná nadmnožina není → efektivní prořezávání

### Witness Miner / Lanner Group
- **Lanner Group Ltd** — Birmingham UK, 1996, specializace na simulační software
- **WITNESS** — diskrétní simulační software (od 1986), integrovaný v Oracle, SAP, IBM
- **Witness Miner** = integrace process mining (Disco/Fluxicon) + simulace WITNESS
- Funkce: závislosti vstupů/výstupů, extrakce pravidel, shluky scénářů, KPI statistiky
- **WITNESS Optimizer** využívá Simulated Annealing a Tabu Search pro optimalizaci parametrů

### MATLAB pro datamining
- `kmeans(data, k)` — k-means (vrací idx + centroidy C)
- `linkage(data, 'ward')` — hierarchická struktura Z
- `dendrogram(Z)` + `cluster(Z, 'maxclust', k)` — vizualizace a řez
- `fitctree(X, Y)` — trénování klasifikačního stromu
- `predict(Mdl, X_test)` — predikce třídy
- `resubLoss(Mdl)` — přesnost na trénovacích datech
