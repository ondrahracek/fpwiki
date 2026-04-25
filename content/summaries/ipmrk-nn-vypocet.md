---
title: Umělé neuronové sítě — ruční výpočet a praxe trénování
course: ipmrk
type: summary
tags: [ipmrk, neuronove-site, uceni, vicevrstve-site, trenovani]
sources: [raw/ipmrk/nn-vypocet.md]
created: 2026-04-10
updated: '2026-04-25'
---

# Umělé neuronové sítě — ruční výpočet a praxe trénování

Zdroj: `raw/ipmrk/nn-vypocet.md` | Kurz: [[ipmrk|IpmrK]]

## Shrnutí

Navazuje na [[ipmrk-nn-teorie|teorii neuronových sítí]]. Ukazuje konkrétní ruční výpočet učení neuronu krok za krokem, poté rozšiřuje na vícevrstvé sítě a praktický postup návrhu, trénování a testování.

## Hlavní body

1. **Ruční výpočet** — pro každý trénovací případ: skalární součin vstupů a vah (a = x·w) → aktivační funkce (hardlim/threshold) → výstup → chyba (e = y − m) → korekce vah (w_new = w_old + e·x).

2. **Vícevrstvá síť** — vstupní vrstva → skrytá vrstva I → skrytá vrstva II → výstupní vrstva. Skryté vrstvy vytvářejí vnitřní reprezentace, umožňují modelovat nelineární vztahy.

3. **Kompromis (bias-variance)** — příliš jednoduchý model = podučený (vysoká chyba), příliš složitý = přeučený (nefunguje na nových datech).

4. **Praktický postup**:
   - Připravit data (vstupní matice, výstupy)
   - Zvolit počet vrstev a neuronů
   - Zvolit aktivační funkci
   - Rozdělit data na trénovací/testovací (např. 75/25 %)
   - Trénovat a sledovat chybu

5. **Kritéria ukončení** — chyba pod mezí (např. 1 %), max iterací (např. 10 000), max čas (např. 60 min).

6. **Graf chyby** — sledování průběhu chyby přes iterace: ideální klesá a stabilizuje se, může být pomalý, nestabilní, nebo divergovat.

## Zkouškové shrnutí

> Neuronová síť se učí iterativní úpravou vah podle chyby, přičemž v praxi je nutné správně zvolit architekturu, rozdělit data na trénovací a testovací část a sledovat průběh chyby, aby model dobře generalizoval.

## Souvislosti

- [[umele-neuronove-site|Umělé neuronové sítě]] — hlavní téma
- [[ipmrk-nn-teorie|Neuronové sítě — teorie]] — předchozí přednáška
- [[backpropagation|Backpropagation]] — algoritmus učení
