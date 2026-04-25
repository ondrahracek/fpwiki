---
title: "IpmrK — Neuronové sítě (aplikace)"
course: ipmrk
type: summary
tags: [ipmrk, neuronove-site, anfis, scoring, predikce, deep-learning]
sources: [raw/ipmrk/nn-aplikace.md]
created: 2026-04-10
updated: 2026-04-10
---

# Umělé neuronové sítě — aplikace a ANFIS

Zdroj: `raw/ipmrk/nn-aplikace.md` | Kurz: [[ipmrk|IpmrK]]

## Shrnutí

Přednáška o praktickém využití [[umele-neuronove-site|neuronových sítí]] a propojení s [[fuzzy-logika|fuzzy logikou]] přes [[anfis|ANFIS]]. Pokrývá širokou škálu aplikací od scoringu přes predikci až po deep learning.

## Hlavní body

1. **[[anfis|ANFIS]]** (Adaptive Neuro-Fuzzy Inference System) — hybridní přístup: fuzzy struktura (pravidla, jazykové proměnné) + učicí schopnost neuronové sítě. Výhoda: srozumitelný model, který se umí učit z dat.

2. **Hodnocení bonity klienta** — klasifikace na základě příjmu, věku, majetku, zadlužení → schválit/neschválit, rizikové třídy.

3. **Oceňování** — odhad ceny aut, nemovitostí, produktů na základě parametrů. Regresní problém.

4. **Vyhodnocení investic a rizika** — vhodnost investice, pravděpodobnost ztráty, volatilita, kreditní/tržní riziko.

5. **Detekce podvodů** — podezřelé finanční transakce (praní peněz), anomálie v daňových přiznáních.

6. **Rozpoznávání** — obraz, písmo, zvuk, řeč, strojový překlad.

7. **[[predikce|Predikce]]** — vývoj indexů, měnových kurzů (CZK/USD, USD/EUR), kryptoměn, akcií, komodit (zlato, ropa). Model pracuje s nejistou budoucností.

8. **Deep learning** — neuronové sítě s mnoha vrstvami a parametry, pro složité úlohy s velkým množstvím dat.

9. **Diagnostika a autonomní systémy** — zdravotnictví, samořiditelná auta.

## Zkouškové shrnutí

> Neuronové sítě se využívají především pro klasifikaci, scoring, detekci rizika, odhad hodnoty a predikci, přičemž hybridní systém ANFIS propojuje jejich učicí schopnost s interpretovatelností fuzzy logiky.

## Souvislosti

- [[umele-neuronove-site|Umělé neuronové sítě]] — hlavní téma
- [[anfis|ANFIS]] — klíčový hybridní systém propojující témata kurzu
- [[fuzzy-logika|Fuzzy logika]] — partner v ANFIS
- [[predikce|Predikce]] — hlavní aplikační oblast
