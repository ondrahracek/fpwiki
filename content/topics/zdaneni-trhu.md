---
title: Zdanění trhu — dopady daně na rovnováhu
course: imek
type: topic
tags: [imek, zdaneni, dane, danove-bremeno, posun-krivek, poptavka-nabidka]
sources: [raw/imek/kniha_scanned/, raw/imek/KS_prvni_blok.pdf]
created: 2026-04-22
updated: '2026-04-25'
---

# Zdanění trhu — dopady daně na rovnováhu

> [!info] TL;DR
> Jednotková daň $T$ uložená na každou prodanou jednotku zboží posouvá jednu z křivek — **nabídku** (je-li daň uložena výrobci) nebo **poptávku** (je-li uložena spotřebiteli). Výsledné **daňové břemeno** se dělí mezi obě strany trhu na $T_{sp}$ (spotřebitel) a $T_{vyr}$ (výrobce). Klíčovým zjištěním je **ekvivalence obou přístupů**: rovnovážné množství i čistá cena pro výrobce jsou v obou režimech totožné; liší se pouze nominální cena na trhu o $T$.

## Dvě formy zdanění

Uvažujme jednotkovou daň $T > 0$ (Kč na kus), kterou stát ukládá na každou prodanou jednotku zboží. Daň může být uložena buď:

- **(a) výrobci** — výrobce ji musí odvést státu z každé prodané jednotky,
- **(b) spotřebiteli** — spotřebitel ji platí navíc k ceně, kterou si účtuje prodejce.

V obou případech dochází k posunu jedné z křivek o $T$ svisle (buď nabídky nahoru, nebo poptávky dolů) a k rozdělení **daňového břemene** mezi spotřebitele a výrobce. Výchozí rovnovážný bod bez daně označujeme $E[Q^E, P^E]$.

---

## Daň uložená výrobci

Je-li daň $T$ uložena výrobci, pak z podmínky, že výrobce za každou prodanou jednotku obdrží $P - T$ (hrubá cena mínus odvod), plyne z rovnice $P - T = S(Q)$ nová funkce nabídky:

$$
P = S_1(Q) = S(Q) + T.
$$

Nabídka se tedy posouvá o $T$ **svisle nahoru** (ekvivalentně doleva). Poptávka se nemění.

Nový rovnovážný bod $E_1[Q_1^E, P_1^E]$ splňuje $Q_1^E < Q^E$ a $P_1^E > P^E$. Spotřebitel platí $P_1^E$, výrobci ale zůstává pouze čistá cena $P_1^E - T$ (ta je nižší než původní rovnovážná $P^E$).

*Obrázek 2.17 (resp. 2.18): Posun $S \to S_1 = S + T$; svislá vzdálenost mezi křivkami je přesně $T$. Průsečík $S_1$ s $D$ je nový rovnovážný bod $E_1$.*

### Příklad 2.9

**Zadání:** Poptávka $P = 12 - 2Q$, nabídka $P = 4Q$. Na výrobce je uložena jednotková daň $T = 6$ Kč.

**Řešení:**

*Bez daně.* Z rovnosti $12 - 2Q = 4Q$ plyne $6Q = 12$, tedy $Q^E = 2$, $P^E = 4 \cdot 2 = 8$. Rovnovážný bod $E[2, 8]$.

*S daní uloženou výrobci.* Nová nabídka je $S_1: P = 4Q + 6$. Z rovnice

$$
12 - 2Q = 4Q + 6
$$

plyne $6Q = 6$, tedy $Q_1^E = 1$, $P_1^E = 4 \cdot 1 + 6 = 10$. Nový rovnovážný bod $E_1[1, 10]$.

*Rozklad daňového břemene.* Spotřebitel platí $P_1^E = 10$ Kč namísto původních $8$, navýšení je

$$
T_{sp} = P_1^E - P^E = 10 - 8 = 2\ \text{Kč}.
$$

Výrobci zůstává čistá cena $P_1^E - T = 10 - 6 = 4$ Kč namísto původních $8$, pokles je

$$
T_{vyr} = P^E - (P_1^E - T) = 8 - 4 = 4\ \text{Kč}.
$$

Kontrola: $T_{sp} + T_{vyr} = 2 + 4 = 6 = T$. Spotřebitel nese třetinu daně, výrobce dvě třetiny.

---

## Daň uložená spotřebiteli

Je-li daň $T$ uložena spotřebiteli, pak spotřebitel platí celkem $P + T$ (cena prodejce plus daň). Z podmínky $P + T = D(Q)$ plyne nová funkce poptávky:

$$
P = D_2(Q) = D(Q) - T.
$$

Poptávka se tedy posouvá o $T$ **svisle dolů**. Nabídka se nemění.

Nový rovnovážný bod $E_2[Q_2^E, P_2^E]$ splňuje $Q_2^E < Q^E$ a $P_2^E < P^E$. Výrobce obdrží $P_2^E$, spotřebitel platí celkem $P_2^E + T$ (tato částka je vyšší než původní $P^E$).

Daňové břemeno:

$$
T_{sp} = (P_2^E + T) - P^E, \qquad T_{vyr} = P^E - P_2^E.
$$

*Obrázek 2.19: Posun $D \to D_2 = D - T$; svislá vzdálenost mezi poptávkovými křivkami je $T$. Průsečík $D_2$ s $S$ je nový rovnovážný bod $E_2$.*

### Příklad 2.10

**Zadání:** Pokračuje z Příkladu 2.9 — stejný trh, poptávka $P = 12 - 2Q$, nabídka $P = 4Q$. Daň $T = 6$ Kč je tentokrát uložena na spotřebitele.

**Řešení:**

Nová poptávka je $D_2: P = 12 - 2Q - 6 = 6 - 2Q$. Z rovnice

$$
6 - 2Q = 4Q
$$

plyne $6Q = 6$, tedy $Q_2^E = 1$, $P_2^E = 4 \cdot 1 = 4$. Nový rovnovážný bod $E_2[1, 4]$.

Spotřebitel platí celkem $P_2^E + T = 4 + 6 = 10$ Kč; výrobce obdrží $P_2^E = 4$ Kč.

*Rozklad daňového břemene:*

$$
T_{sp} = (4 + 6) - 8 = 2\ \text{Kč}, \qquad T_{vyr} = 8 - 4 = 4\ \text{Kč}.
$$

Opět $T_{sp} + T_{vyr} = 6 = T$.

---

## Daňové břemeno

**Daňové břemeno** (*tax burden*) je rozdělení zaplacené daně $T$ mezi spotřebitele a výrobce:

$$
T = T_{sp} + T_{vyr}.
$$

![[imek-dan-rozklad-bremene-sklony.jpeg|Rozklad daňového břemene T_sp/T_výr podle sklonů D a S — kdo je méně elastický, platí víc]]


> [!info] Intuice — proč se daňové břemeno dělí
> Kdyby byla poptávka dokonale elastická (vodorovná), spotřebitelé by při jakémkoliv navýšení ceny úplně přestali nakupovat — celou daň by musel zaplatit výrobce. Naopak při dokonale neelastické poptávce (svislá křivka) spotřebitelé nakupují stále stejné množství a celou daň přenesou na ně. V realitě jsou obě křivky nějak skloněné a daňové břemeno se dělí v poměru, který je dán relativními sklony $D$ a $S$.

### Geometrická interpretace

V grafu $(Q, P)$ je svislá vzdálenost mezi původní a posunutou křivkou právě $T$. Vedeme-li v novém rovnovážném bodě vodorovnou přímku na úrovni původní rovnovážné ceny $P^E$, rozdělí se úsečka $T$ na dvě části:

- horní část odpovídá $T_{sp}$ (o kolik vzrostla cena placená spotřebitelem),
- dolní část odpovídá $T_{vyr}$ (o kolik klesla cena přijímaná výrobcem).

*Obrázky 2.20 a 2.21: Ilustrace rozkladu svislé vzdálenosti $T$ na $T_{sp}$ (nahoře) a $T_{vyr}$ (dole). Obrázek 2.21 porovnává obě varianty — daň výrobci vs. daň spotřebiteli — a ukazuje, že velikost $T_{sp}$ a $T_{vyr}$ je v obou případech stejná.*

### Sklony křivek a rozklad

Platí obecně: **čím strmější křivka (menší elasticita), tím větší část daně nese daná strana trhu.** Pro lineární poptávku $P = aQ + b$ ($a < 0$) a lineární nabídku $P = cQ + d$ ($c > 0$) lze rozklad odvodit pomocí multiplikátorů a platí

$$
\frac{T_{sp}}{T_{vyr}} = \frac{c}{-a} = \frac{|\text{sklon } S|}{|\text{sklon } D|}.
$$

> [!tip] Postup výpočtu rozkladu
> 1. Spočti rovnovážný bod $E[Q^E, P^E]$ bez daně.
> 2. Urči posunutou křivku ($S_1 = S + T$ nebo $D_2 = D - T$).
> 3. Vyřeš novou rovnovážnou rovnici — získáš $Q_1^E$ (resp. $Q_2^E$) a $P_1^E$ (resp. $P_2^E$).
> 4. Dopočítej $T_{sp}$ a $T_{vyr}$ z definice, vždy ověř $T_{sp} + T_{vyr} = T$.

> [!warning] Pozor — zákonný vs. ekonomický nositel daně
> I když zákon ukládá daň formálně pouze jedné straně (výrobci nebo spotřebiteli), **ekonomicky ji vždy nesou obě strany**. Skutečné rozdělení určují sklony $D$ a $S$, nikoli paragrafové znění zákona. Kupující a prodávající tak fakticky platí daň bez ohledu na to, na koho je uvalena.

---

## Ekvivalence obou přístupů

Porovnáním Příkladu 2.9 (daň výrobci) a Příkladu 2.10 (daň spotřebiteli) zjistíme:

![[imek-dan-ekvivalence-vyrobce-spotrebitel.jpeg|Ekvivalence zdanění výrobce vs. spotřebitele — stejné Q^E, nominální adresát nerozhoduje]]


| Veličina | (a) daň výrobci | (b) daň spotřebiteli |
| --- | --- | --- |
| Rovnovážné množství | $Q_1^E = 1$ | $Q_2^E = 1$ |
| Cena placená spotřebitelem | $P_1^E = 10$ | $P_2^E + T = 4 + 6 = 10$ |
| Cena přijímaná výrobcem | $P_1^E - T = 4$ | $P_2^E = 4$ |
| Rozklad břemene | $T_{sp} = 2$, $T_{vyr} = 4$ | $T_{sp} = 2$, $T_{vyr} = 4$ |

Výsledek je v obou režimech reálně totožný — liší se pouze to, kterou cenu nazveme "tržní":

$$
Q_1^E = Q_2^E, \qquad P_1^E - T = P_2^E.
$$

> [!tip] Věta o ekvivalenci zdanění
> Nezávisle na tom, zda je jednotková daň $T$ uložena výrobci, nebo spotřebiteli, se po jejím uložení rovnají:
>
> - rovnovážná množství obou režimů, $Q_1^E = Q_2^E$,
> - čistá cena přijímaná výrobcem, $P_1^E - T = P_2^E$,
> - celková cena placená spotřebitelem, $P_1^E = P_2^E + T$,
> - rozklad daňového břemene $T_{sp}$ a $T_{vyr}$.
>
> Z hlediska reálných dopadů na trh (objem transakcí, reálné platby stran) jsou tedy obě formy zdanění **ekvivalentní**.

Ekvivalence má zásadní politickou implikaci: otázka, "kdo má platit daň", je z hlediska trhu formální — skutečné rozdělení určuje struktura trhu (sklony $D$ a $S$).

---

## Úlohy

Z kapitoly 2 se zdanění týkají zejména následující úlohy (zadání v hub-page [[poptavka-nabidka]]):

- **Úloha 2.4** — Poptávka $P = 12 - 2Q$; najděte novou poptávku po uložení daně 6 Kč na kupujícího.
- **Úloha 2.9** — Nabídka $P = 0{,}5Q + 15$; najděte novou nabídku po uložení daně 5 Kč na výrobce.
- **Úloha 2.13** — Komplexní úloha se zadáním $P = -4Q + 80$ a $P = 3Q + 10$: rovnováha, daň $T = 7$ Kč uložená postupně výrobci i spotřebiteli, rozklad daňového břemene a analýza ekvivalence.

Související úvodní příklady posunu křivek při zdanění: **Příklad 2.3** (posun poptávky při zdanění kupujícího) a **Příklad 2.6** (posun nabídky při zdanění výrobce).

---

## Klíčové pojmy

- **Jednotková daň** $T$ — fixní částka na každou prodanou jednotku zboží
- **Daň uložená výrobci** — posun nabídky $S_1(Q) = S(Q) + T$ (o $T$ svisle nahoru)
- **Daň uložená spotřebiteli** — posun poptávky $D_2(Q) = D(Q) - T$ (o $T$ svisle dolů)
- **Rovnovážný bod s daní** — $E_1[Q_1^E, P_1^E]$, resp. $E_2[Q_2^E, P_2^E]$
- **Daňové břemeno** (*tax burden*) — rozklad $T = T_{sp} + T_{vyr}$
- **$T_{sp}$** — část daně nesená spotřebitelem (navýšení ceny nad $P^E$)
- **$T_{vyr}$** — část daně nesená výrobcem (pokles čisté přijímané ceny pod $P^E$)
- **Ekvivalence zdanění** — $Q_1^E = Q_2^E$, $P_1^E - T = P_2^E$
- **Zákonný vs. ekonomický nositel daně** — rozdíl mezi formálním ustanovením zákona a skutečným rozdělením břemene

---

## Navigace

- **Kontext (hub):** [[poptavka-nabidka|Poptávka, nabídka a tržní rovnováha]]
- **Související témata:** [[prebytek-spotrebitele-vyrobce|Přebytek spotřebitele a výrobce]] (daň vyvolává ztrátu blahobytu — *deadweight loss*), [[derivace|Derivace]] (sklony křivek, rovnovážný bod jako řešení soustavy), [[elasticita|Elasticita]] (kvantifikace, jak se daňové břemeno dělí podle citlivosti stran trhu)
- **Shrnutí přednášek:** [[imek-blok-01|KS — 1. blok]]
- **Kurz:** [[imek|Matematická ekonomie]]
