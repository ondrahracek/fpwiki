---
title: "Umělé neuronové sítě"
courses: [ipmrk]
type: topic
tags: [neuronove-site, perceptron, backpropagation, deep-learning, klasifikace, predikce]
sources: [raw/ipmrk/nn-teorie.md, raw/ipmrk/nn-vypocet.md, raw/ipmrk/nn-aplikace.md, raw/ipmrk/kniha.md]
created: 2026-04-10
updated: 2026-04-16
---

# Umělé neuronové sítě

![[nn-vicevrstva-sit.jpeg|Vícevrstvá neuronová síť — vstupní, skryté a výstupní vrstvy]]

Výpočetní model inspirovaný biologickým nervovým systémem. Soustava propojených neuronů, které se z dat učí rozpoznávat vzory, klasifikovat a predikovat.

## Stavební kameny

### Perceptron (umělý neuron)

![[nn-perceptron.jpeg|Perceptron — vstupy, váhy, vážený součet, aktivační funkce, výstup]]

- Vstupy i₁..iₙ × váhy w₁..wₙ → vážený součet + bias → aktivační funkce → výstup
- Matematicky: a = Σ(iⱼ·wⱼ) + b, výstup m = f(a)
- **Váhy** nesou naučenou znalost (kladné posilují, záporné tlumí)
- **Bias** posouvá rozhodovací hranici

### Aktivační funkce

| Funkce | Vzorec | Výstup | Použití |
|---|---|---|---|
| Lineární | m = a | ℝ | Jednoduchý, bez nelinearity |
| Logistický sigmoid | m = 1/(1+e⁻ᵃ) | (0, 1) | Pravděpodobnost, binární klasifikace |
| Hyperbolický tangens | m = tanh(a) | (−1, 1) | Kladné i záporné aktivace |

### Vícevrstvá síť

- **Vstupní vrstva** — přijímá data
- **Skryté vrstvy** — vytvářejí vnitřní reprezentace, zachycují nelinearitu
- **Výstupní vrstva** — konečné rozhodnutí nebo predikce
- **Deep learning** — mnoho vrstev a parametrů, pro složité úlohy s velkým objemem dat

## Učení

### [[backpropagation|Backpropagation]]

![[nn-backpropagation.jpeg|Backpropagation — dopředný průchod a zpětné šíření chyby s úpravou vah]]

1. Dopředný průchod — výpočet výstupu
2. Výpočet chyby (e = cíl − výstup)
3. Zpětné šíření chyby přes vrstvy
4. Úprava vah ve směru snížení chyby
5. Opakování (iterativní proces)

### Praktický postup

1. Připravit data (matice vstupů a výstupů)
2. Zvolit architekturu (počet vrstev, neuronů, aktivační funkce)
3. Rozdělit data na trénovací/testovací (např. 75/25 %)
4. Trénovat a sledovat průběh chyby
5. Kritéria ukončení: min chyba, max iterací, max čas

### Kompromis jednoduchost vs. složitost

- **Podučený model** — příliš jednoduchý, vysoká chyba
- **Přeučený model** — naučí se i šum, nefunguje na nových datech

## Aplikace

- Hodnocení bonity klienta (scoring)
- Oceňování (nemovitosti, auta, produkty)
- Vyhodnocení investic a rizika
- Detekce podvodů (praní peněz, daňové anomálie)
- Rozpoznávání obrazu, písma, zvuku, překlad
- [[predikce|Predikce]] časových řad (akcie, měny, komodity)
- Diagnostika nemocí, autonomní systémy

## Propojení s dalšími tématy

- [[anfis|ANFIS]] — hybridní systém: fuzzy struktura + učení neuronové sítě
- [[fuzzy-logika|Fuzzy logika]] — partner v ANFIS
- [[geneticke-algoritmy|Genetické algoritmy]] — mohou optimalizovat architekturu sítě

## Kontrolní otázky ke zkoušce

1. Popište metodu a vysvětlete princip neuronových sítí.
2. Popište realizaci a výpočet neuronových sítí na počítači.
3. Jak lze využít neuronových sítí v praxi?
4. Kdy je vhodné použít neuronových sítí?
5. Jaký je správný postup kroků při výpočtu pomocí neuronových sítí?
6. Jaké vrstvy mají neuronové sítě?
7. Jaké jsou typy přenosových funkcí?

## Pojmy k zapamatování

Neuronová síť, učení, testování, vstupní matice, přenosová funkce.

## Zdroje v kurzu [[ipmrk|IpmrK]]

- [[ipmrk-nn-teorie|Neuronové sítě — teorie]]
- [[ipmrk-nn-vypocet|Neuronové sítě — výpočet]]
- [[ipmrk-nn-aplikace|Neuronové sítě — aplikace]]
- [[ipmrk-kniha|Kniha]] — shrnutí kapitoly, kontrolní otázky, pojmy
