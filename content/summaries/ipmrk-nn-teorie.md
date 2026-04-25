---
title: Umělé neuronové sítě — teorie
course: ipmrk
type: summary
tags: [ipmrk, neuronove-site, perceptron, backpropagation, aktivacni-funkce]
sources: [raw/ipmrk/nn-teorie.md]
created: 2026-04-10
updated: '2026-04-25'
---

# Umělé neuronové sítě — teorie

Zdroj: `raw/ipmrk/nn-teorie.md` | Kurz: [[ipmrk|IpmrK]]

## Shrnutí

Přednáška pokrývá kompletní teoretický základ [[umele-neuronove-site|umělých neuronových sítí]]: od biologické inspirace přes model perceptronu, váhy, bias, aktivační funkce až po algoritmus [[backpropagation|backpropagation]].

## Hlavní body

1. **Biologická inspirace** — neuron přijímá signály dendrity, zpracovává v somě, vysílá axonem. Umělý neuron je zjednodušená matematická verze.

2. **Perceptron** — vstupy i₁..iₙ × váhy w₁..wₙ → součet Σ + bias → aktivační funkce → výstup. Matematicky: a = Σ(iⱼ·wⱼ) + b, m = f(a).

3. **Váhy** — w < 1 zeslabení, w = 1 zachování, w > 1 zesílení. Záporné váhy tlumí aktivaci. Váhy nesou naučenou znalost modelu.

4. **Aktivační funkce**:
   - **Lineární (pure line)**: m = a — nedává nelinearitu
   - **Logistická sigmoid (logsig)**: m = 1/(1+e⁻ᵃ) — výstup (0,1)
   - **Hyperbolický tangens (tansig)**: m = (eᵃ−e⁻ᵃ)/(eᵃ+e⁻ᵃ) — výstup (−1,1)

5. **Klasifikace** — neuron jako binární klasifikátor, rozhodovací hranice v prostoru vstupů.

6. **Backpropagation** — dopředný průchod → výpočet chyby → zpětné šíření chyby → úprava vah. Iterativní proces.

## Zkouškové shrnutí

> Umělá neuronová síť je soustava neuronů, které převádějí vážené vstupy přes aktivační funkce na výstupy a pomocí backpropagation se z dat učí takové váhy, aby minimalizovaly chybu predikce nebo klasifikace.

## Souvislosti

- [[umele-neuronove-site|Umělé neuronové sítě]] — hlavní téma
- [[ipmrk-nn-vypocet|Neuronové sítě — výpočet]] — ruční výpočet učení
- [[ipmrk-nn-aplikace|Neuronové sítě — aplikace]] — praktické využití a ANFIS
- [[backpropagation|Backpropagation]] — algoritmus učení
