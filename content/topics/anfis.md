---
title: "ANFIS"
courses: [ipmrk]
type: topic
tags: [anfis, fuzzy, neuronove-site, hybridni-system]
sources: [raw/ipmrk/nn-aplikace.md]
created: 2026-04-10
updated: 2026-04-11
---

# ANFIS — Adaptive Neuro-Fuzzy Inference System

![[anfis-architektura.jpeg|Architektura ANFIS — 5 vrstev: funkce členství, pravidla, normalizace, konsekvent, sumace]]

Hybridní přístup propojující [[fuzzy-logika|fuzzy logiku]] a [[umele-neuronove-site|umělé neuronové sítě]]. Spojuje výhody obou světů.

## Princip

- **Od fuzzy logiky** přebírá: pravidla KDYŽ–POTOM, jazykové proměnné, funkce členství → **interpretovatelnost** (model dává lidský smysl)
- **Od neuronových sítí** přebírá: schopnost učit se z dat, automatická úprava parametrů → **adaptivnost**

## Kdy je ANFIS vhodný

- Chceme model srozumitelný člověku (na rozdíl od čisté neuronové sítě)
- Nechceme vše nastavovat ručně (na rozdíl od čistého fuzzy systému)
- Máme data i expertní znalost

## Význam v kurzu [[ipmrk|IpmrK]]

ANFIS je klíčový styčný bod kurzu — propojuje dva hlavní bloky (fuzzy logika a neuronové sítě) do jednoho systému. Zkouškově důležité.

## Zdroje

- [[ipmrk-nn-aplikace|Neuronové sítě — aplikace]] — ANFIS je zde představen
