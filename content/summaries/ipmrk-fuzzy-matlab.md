---
title: Fuzzy logika — architektura systému a MATLAB
course: ipmrk
type: summary
tags: [ipmrk, fuzzy, matlab, fuzzy-system, inference]
sources: [raw/ipmrk/fuzzy-matlab.md]
created: 2026-04-10
updated: '2026-04-25'
---

# Fuzzy logika — architektura systému a MATLAB

Zdroj: `raw/ipmrk/fuzzy-matlab.md` | Kurz: [[ipmrk|IpmrK]]

## Shrnutí

Navazuje na [[ipmrk-fuzzy-excel|základy fuzzy logiky]] a ukazuje, jak se [[fuzzy-logika|fuzzy systém]] staví jako kompletní model: více vstupů → fuzzifikace → blok pravidel → inference → výstupy. Praktická architektura pro manažerské rozhodování.

## Hlavní body

1. **Schéma fuzzy systému** — vstupy (číselné veličiny) → fuzzifikace → pravidla KDYŽ–POTOM → inference → výstup (fuzzy nebo interpretované rozhodnutí).

2. **Funkce členství pro vstupy i výstupy** — každý atribut (vstup i výstup) má vlastní fuzzy množiny. Např. výška: {velmi malá, malá, střední, velká, velmi velká}, riziko: {VNR, NR, SR, VR, UVR}.

3. **Vícepodmínková pravidla** — KDYŽ vstup₁ je A ∧ vstup₂ je B ∧ vstup₃ je C → výstup R je D ∧ výstup I je E. Modelují expertní znalost.

4. **Překryv funkcí členství** — záměrný, umožňuje aktivaci více pravidel současně → stabilnější a realističtější model.

5. **Více výstupů** — systém může mít více výstupních proměnných, např. celkové riziko R a typ investora (averzní / risk-seeking).

6. **MATLAB Fuzzy Logic Toolbox** — definice vstupů/výstupů, přiřazení funkcí členství, zápis pravidel, spuštění inference, vizualizace.

## Zkouškové shrnutí

> Fuzzy systém převádí více neostrých vstupních proměnných přes funkce členství a soubor expertních pravidel na jeden nebo více výstupů, které reprezentují výsledné rozhodnutí nebo hodnocení.

## Souvislosti

- [[fuzzy-logika|Fuzzy logika]] — hlavní téma
- [[ipmrk-fuzzy-excel|Fuzzy logika — Excel]] — předchozí přednáška o základech
- [[anfis|ANFIS]] — hybridní propojení fuzzy logiky a neuronových sítí
