---
title: Fuzzy logika — základní princip a implementace v Excelu
course: ipmrk
type: summary
tags: [ipmrk, fuzzy, excel, funkce-clenstvi, pravidla]
sources: [raw/ipmrk/fuzzy-excel.md]
created: 2026-04-10
updated: '2026-04-25'
---

# Fuzzy logika — základní princip a implementace v Excelu

Zdroj: `raw/ipmrk/fuzzy-excel.md` | Kurz: [[ipmrk|IpmrK]]

## Shrnutí

Přednáška pokrývá úplný základ [[fuzzy-logika|fuzzy logiky]]: od motivace (proč nestačí klasická binární logika) přes funkce členství, jazykové proměnné a pravidla KDYŽ–POTOM až po konkrétní výpočet v Excelu s normalizací a defuzzifikací.

## Hlavní body

1. **Klasická vs. fuzzy logika** — klasická logika je binární (0/1), fuzzy logika pracuje s mírou členství μ ∈ ⟨0, 1⟩. Prvek může patřit do více množin současně.

2. **Funkce členství** — základní tvary: L-funkce, trojúhelníková (Λ), trapezoidní (Π), S-funkce, Z-funkce. Určují plynulý přechod mezi kategoriemi.

3. **Jazykové proměnné** — vágní pojmy (nízké riziko, vysoký plat) se formalizují jako termy jazykové proměnné. Např. riziko: {VNR, NR, SR, VR, UVR}.

4. **Pravidla KDYŽ–POTOM** — jádro fuzzy inferenčního systému. AND = minimum/součin, OR = maximum.

5. **Výpočet v Excelu** — matice stupňů příslušnosti → aplikace pravidel → normalizace (min-max na 0–100 %) → defuzzifikace pomocí hranic (RN: 0–30 %, RS: 30–60 %, RV: 60–100 %) a funkce KDYŽ.

## Zkouškové shrnutí

> Fuzzy logika je metoda modelování rozhodování s vágními pojmy, kde prvky patří do množin jen částečně, pomocí funkcí členství, pravidel KDYŽ–POTOM a následného výpočtu a převodu na praktické rozhodnutí.

## Souvislosti

- [[fuzzy-logika|Fuzzy logika]] — hlavní téma
- [[ipmrk-fuzzy-matlab|Fuzzy logika — MATLAB]] — navazující přednáška o architektuře fuzzy systému
- Defuzzifikace — převod fuzzy výsledku na konečné rozhodnutí
