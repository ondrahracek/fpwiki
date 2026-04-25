---
title: Backpropagation (zpětné šíření chyby)
courses: [ipmrk]
type: topic
tags: [ipmrk, backpropagation, neuronove-site, uceni]
sources: [raw/ipmrk/nn-teorie.md, raw/ipmrk/nn-vypocet.md]
created: 2026-04-10
updated: '2026-04-25'
---

# Backpropagation (zpětné šíření chyby)

Základní a nejdůležitější algoritmus učení vícevrstvých [[umele-neuronove-site|neuronových sítí]].

## Postup

1. **Dopředný průchod** — síť spočítá výstup z aktuálních vah
2. **Výpočet chyby** — porovnání skutečného výstupu s cílem (e = y − m)
3. **Zpětné šíření** — chyba se šíří zpět přes vrstvy, určuje příspěvek každé váhy k chybě
4. **Úprava vah** — w_new = w_old + η · e · x (η = učicí koeficient)
5. **Opakování** — celý cyklus se opakuje přes trénovací data, dokud chyba neklesne pod mez

## Klíčové vlastnosti

- Iterativní proces — jedna iterace nestačí
- Učicí koeficient (learning rate) řídí velikost kroků
- Příliš velký → nestabilita, příliš malý → pomalé učení
- Může uváznout v lokálním minimu

## Souvislosti

- [[umele-neuronove-site|Umělé neuronové sítě]] — backpropagation je jejich hlavní učicí mechanismus
- [[ipmrk-nn-teorie|Neuronové sítě — teorie]] — zde je backpropagation zaveden
- [[ipmrk-nn-vypocet|Neuronové sítě — výpočet]] — ruční demonstrace principu
