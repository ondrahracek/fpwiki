---
title: "Fuzzy logika"
courses: [ipmrk]
type: topic
tags: [fuzzy, funkce-clenstvi, pravidla, inference, defuzzifikace]
sources: [raw/ipmrk/fuzzy-excel.md, raw/ipmrk/fuzzy-matlab.md, raw/ipmrk/kniha.md]
created: 2026-04-10
updated: 2026-04-16
---

# Fuzzy logika

![[fuzzy-logika.jpeg|Diagram fuzzy logiky — funkce členství a inferenční pipeline]]

Metoda modelování rozhodování s vágními (neostrými) pojmy. Na rozdíl od klasické binární logiky (0/1) pracuje fuzzy logika s **mírou členství** μ ∈ ⟨0, 1⟩ — prvek může patřit do více množin současně s různou intenzitou.

## Základní principy

- **Funkce členství** — přiřazuje každému prvku stupeň příslušnosti k fuzzy množině. Základní tvary: L-funkce, trojúhelníková (Λ), trapezoidní (Π), S-funkce, Z-funkce.
- **Jazykové proměnné** — vágní pojmy (nízké riziko, vysoký plat) formalizované jako termy. Např. riziko: {velmi nízké, nízké, střední, vysoké, velmi vysoké}.
- **Pravidla KDYŽ–POTOM** — jádro fuzzy inferenčního systému. Modelují expertní znalost. AND = minimum/součin, OR = maximum.
- **Defuzzifikace** — převod fuzzy výsledku na konečné rozhodnutí (např. normalizace na 0–100 % a rozdělení do kategorií).

## Architektura fuzzy systému

1. **Vstupy** — číselné veličiny
2. **Fuzzifikace** — převod na stupně členství
3. **Blok pravidel** — KDYŽ–POTOM pravidla
4. **Inference** — vyhodnocení pravidel
5. **Výstup** — fuzzy nebo defuzzifikovaný výsledek

Systém může mít více vstupů i více výstupů (např. celkové riziko + typ investora).

## Nástroje

- **Excel** — jednoduché modely, matice příslušnosti, funkce KDYŽ pro defuzzifikaci
- **MATLAB Fuzzy Logic Toolbox** — pokročilejší modely, vizualizace, ladění pravidel

## Typické aplikace

- Hodnocení investičního rizika
- Úvěrové skórování
- Výběr projektu, hodnocení dodavatele
- Rozhodování o výrobě
- Profilace investora (averze vs. vyhledávání rizika)

## Propojení s dalšími tématy

- [[anfis|ANFIS]] — hybridní systém propojující fuzzy logiku s [[umele-neuronove-site|neuronovými sítěmi]]
- [[teorie-chaosu|Teorie chaosu]] — oba přístupy řeší nejistotu, ale jiným způsobem
- [[predikce|Predikce]] — fuzzy systémy mohou sloužit jako základ predikčních modelů

## Kontrolní otázky ke zkoušce

1. Popište metodu a vysvětlete princip fuzzy logiky.
2. Popište realizaci a výpočet fuzzy logiky na počítači.
3. Jak lze využít fuzzy logiky v praxi?
4. Kdo byl zakladatelem fuzzy logiky?
5. Jaká je posloupnost kroků při zpracování případů fuzzy logikou?
6. Co znamená proces fuzzifikace?
7. Co je to defuzzifikace?

## Pojmy k zapamatování

Fuzzy logika, fuzzifikace, fuzzy inference, defuzzifikace, transformační a retransformační matice, vstup, rozhodovací blok, výstup.

## Zdroje v kurzu [[ipmrk|IpmrK]]

- [[ipmrk-fuzzy-excel|Fuzzy logika — Excel]] — základní princip, funkce členství, implementace
- [[ipmrk-fuzzy-matlab|Fuzzy logika — MATLAB]] — architektura systému, návrh modelu
- [[ipmrk-kniha|Kniha]] — shrnutí kapitoly, kontrolní otázky, pojmy
