---
title: IS-LM analýza — simultánní rovnováha trhu zboží a peněz
course: imek
type: topic
tags: [imek, is-lm, makroekonomie, trh-zbozi, trh-penez, urokova-mira, investice, narodni-duchod]
sources: [raw/imek/kniha_scanned/, raw/imek/KS_treti_blok.pdf]
created: 2026-04-22
updated: '2026-04-25'
---

# IS-LM analýza — simultánní rovnováha trhu zboží a peněz

## TL;DR

**IS-LM** je makroekonomický model se **dvěma neznámými** ($Y$ — národní důchod a $r$ — úroková míra) a **dvěma trhy**: trhem zboží (křivka **IS**, *Investment = Savings*) a trhem peněz (křivka **LM**, *Liquidity of Money*). Průsečík obou křivek určuje **simultánní rovnováhu** $(Y^E, r^E)$, v níž jsou oba trhy vyvážené zároveň. Model je klíčovým nástrojem pro analýzu **fiskální politiky** (posun IS změnou $G$, $T$) a **monetární politiky** (posun LM změnou nabídky peněz $M^*$).

![[imek-is-lm-model.jpeg|Model IS-LM — klesající IS, rostoucí LM, rovnováha v bodě E(r_E, Y_E)]]

## Motivace — proč přejít od C-I-G-X k IS-LM

V modelech [[narodni-duchod|C-I, C-I-G a C-I-G-X]] byly **investice pokládány za konstantní** ($I = I^*$). To není realistické — investice firem závisejí na **ceně peněz**, tedy na **úrokové míře $r$**: čím vyšší $r$, tím dražší úvěr a tím méně investic. IS-LM analýza proto zavádí:

- **funkci investic** $I = I(r)$ jako klesající funkci úrokové míry,
- **trh peněz**, jehož rovnováha (poptávka = nabídka peněz) doplňuje druhou rovnici potřebnou pro určení obou neznámých.

> [!warning] Pozor — dvě neznámé vyžadují dvě rovnice
> V modelech $C\text{-}I$ až $C\text{-}I\text{-}G\text{-}X$ byla hlavní neznámou jen $Y$. V IS-LM jsou **dvě neznámé $Y$ a $r$**, a proto potřebujeme **dvě rovnice**: jednu z trhu zboží (křivka IS) a jednu z trhu peněz (křivka LM).

## Funkce investic a funkce spotřeby

Lineární závislost investic $I$ na úrokové míře $r$:

$$I = I(r) = cr + d, \qquad c < 0,\ d > 0. \qquad (7.11)$$

- $d > 0$ zřejmé,
- $c < 0$, protože růst úrokové míry tlumí investice — funkce investic je **klesající**.

Spotřeba zůstává lineární funkcí důchodu:

$$C = C(Y) = aY + b, \qquad 0 < a < 1,\ b > 0. \qquad (7.12)$$

Podmínka rovnováhy na trhu zboží:

$$Y = C + I. \qquad (7.13)$$

To dává **tři rovnice o čtyřech neznámých** $Y, C, I, r$. Pro jednoznačné určení rovnováhy potřebujeme čtvrtou rovnici — odvodí se z **rovnováhy na trhu peněz**.

## Křivka IS — rovnováha na trhu zboží

Podmínka (7.13) reprezentuje rovnováhu na trhu zboží, protože s ohledem na $Y = C + S$ plyne $I = S$ (plánované **investice = úspory**). Dosazením (7.11) a (7.12) do (7.13):

![[imek-odvozeni-is-4panelu.jpeg|Odvození křivky IS ze čtyř panelů: funkce investic I(r), S=I (45°), funkce úspor S(Y), a výsledná klesající IS]]


$$Y = (aY + b) + (cr + d),$$

$$(1 - a)Y - cr - b - d = 0,$$

odkud

$$\boxed{\,Y = \frac{c}{1 - a}\,r + \frac{b + d}{1 - a}\,} \qquad (7.14)$$

Tento vztah se nazývá **funkce IS** (*IS schedule*) a její graf **křivka IS**. Křivka je **klesající** přímka v rovině $(r, Y)$, neboť $\frac{c}{1-a} < 0$ (čitatel záporný, jmenovatel kladný). Název vyjadřuje, že křivka popisuje ty kombinace $(r, Y)$, pro které plánované **I**nvestment = **S**avings.

> [!info] Intuice — proč IS klesá
> Nižší úroková míra $r$ → levnější úvěr → **více investic** $I$ → vyšší agregátní poptávka → vyšší rovnovážný důchod $Y$. Vztah mezi $r$ a $Y$ na trhu zboží je proto **nepřímý** (klesající křivka).

## Křivka LM — rovnováha na trhu peněz

Rovnováha na trhu peněz: poptávka po penězích $M^D$ se rovná nabídce peněz $M^S$. **Nabídka** je pod kontrolou národní banky a je pevně zadána:

$$M^S = M^*.$$

**Poptávka** po penězích má tři zdroje:

- **transakční poptávka** (*transactions demand*) — peníze pro nákup zboží,
- **opatrnostní poptávka** (*precautionary demand*) — peníze pro nenadálé výdaje,
- **spekulační poptávka** (*speculative demand*) — peníze pro zhodnocení (akcie, obligace).

Součet transakční a opatrnostní poptávky $L_1$ je úměrný důchodu:

$$L_1 = k_1 Y, \qquad 0 < k_1 < 1.$$

Spekulační poptávka $L_2$ závisí na úrokové míře (roste-li $r$, $L_2$ klesá, protože vyšší výnos obligací snižuje atraktivitu držby peněz):

$$L_2 = k_2 r + k_3, \qquad k_2 < 0,\ k_3 > 0.$$

Celková poptávka po penězích:

$$M^D = L_1 + L_2 = k_1 Y + k_2 r + k_3.$$

Podmínka rovnováhy na trhu peněz $M^D = M^*$:

$$M^* = k_1 Y + k_2 r + k_3, \qquad (7.15)$$

po úpravě (vyjádření $Y$):

$$\boxed{\,Y = -\frac{k_2}{k_1}\,r + \frac{M^* - k_3}{k_1}\,} \qquad (7.16)$$

Tento vztah se nazývá **funkce LM** (*LM schedule*), její graf **křivka LM**. Křivka je **rostoucí** přímka v rovině $(r, Y)$, neboť $-\frac{k_2}{k_1} > 0$ (čitatel kladný, protože $k_2 < 0$, jmenovatel kladný). Název: **L**iquidity of **M**oney.

> [!info] Intuice — proč LM roste
> Vyšší důchod $Y$ → větší transakční poptávka po penězích $L_1 = k_1 Y$ → při pevné nabídce $M^*$ vzniká na trhu peněz přebytek poptávky → úroková míra $r$ musí vzrůst, aby se spekulační poptávka $L_2$ stlačila a trh se vyrovnal. Vztah mezi $Y$ a $r$ na trhu peněz je proto **přímý** (rostoucí křivka).

## Simultánní rovnováha IS-LM

Řešením **soustavy dvou lineárních rovnic** (7.14) a (7.15) určíme **rovnovážný důchod** $Y^E$ a **rovnovážnou úrokovou míru** $r^E$; zpětným dosazením do (7.11) a (7.12) pak rovnovážné investice $I^E$ a rovnovážnou spotřebu $C^E$. Graficky jde o **průsečík $E$** křivek $IS$ a $LM$ v rovině $(r, Y)$.

*Obrázek 7.6 — Schematický graf v rovině $(r, Y)$. Rostoucí přímka $LM$ a klesající přímka $IS$ se protínají v bodě $E$ se souřadnicemi $r^E$ (na ose $r$) a $Y^E$ (na ose $Y$); tečkované čáry z $E$ kolmé k osám vyznačují polohu rovnovážné úrokové míry a rovnovážného národního důchodu.*

> [!tip] Postup — jak najít IS-LM rovnováhu
> 1. **Z trhu zboží (7.13)** dosaď funkce $C(Y)$ a $I(r)$ a vyjádři vztah mezi $Y$ a $r$ — dostaneš rovnici **IS**.
> 2. **Z trhu peněz (7.15)** dosaď $L_1$ a $L_2$ a vztah $M^D = M^*$ — dostaneš rovnici **LM**.
> 3. **Vyřeš soustavu** dvou lineárních rovnic o dvou neznámých $Y$ a $r$ — nejsnáze substituční metodou (vyjádři z IS $Y = f(r)$ a dosaď do LM).
> 4. **Zpětně dopočítej** $C^E = a\,Y^E + b$ a $I^E = c\,r^E + d$.
> 5. **Ověř:** musí platit $Y^E = C^E + I^E$ (rovnováha trhu zboží) i $M^* = k_1 Y^E + k_2 r^E + k_3$ (rovnováha trhu peněz).

## Příklad 7.6 (IS-LM)

Pro trh zboží jsou dány:

- spotřeba $C = 0{,}8Y + 100$,
- investice $I = -20r + 1000$.

Pro trh peněz:

- $L_1 = 0{,}1Y$,
- $L_2 = -25r + 2000$,
- nabídka peněz $M^* = 2375$.

**Funkce IS** — dosazením do (7.13) $Y = C + I$:

$$Y = 0{,}8Y + 100 - 20r + 1000,$$

tj.

$$0{,}2Y + 20r = 1100. \qquad (\text{IS})$$

**Funkce LM** — dosazením do (7.15) $M^* = L_1 + L_2$:

$$2375 = 0{,}1Y - 25r + 2000,$$

tj.

$$0{,}1Y - 25r = 375. \qquad (\text{LM})$$

**Řešení soustavy.** Z (IS) vyjádříme $Y = 5500 - 100r$ a dosadíme do (LM):

$$0{,}1(5500 - 100r) - 25r = 375 \;\Longrightarrow\; 550 - 10r - 25r = 375 \;\Longrightarrow\; 35r = 175 \;\Longrightarrow\; r^E = 5.$$

**Zpětné dosazení:**

- $Y^E = 5500 - 100 \cdot 5 = 5500 - 500 = 5000$,
- $C^E = 0{,}8 \cdot 5000 + 100 = 4100$,
- $I^E = -20 \cdot 5 + 1000 = 900$.

**Ověření:** $C^E + I^E = 4100 + 900 = 5000 = Y^E$. ✓

$$\boxed{\,Y^E = 5000, \quad r^E = 5, \quad C^E = 4100, \quad I^E = 900.\,}$$

*Obrázek 7.7 — Konkrétní numerický příklad IS-LM rovnováhy. Na ose $Y$ jsou vyznačeny hodnoty 3750, 5000, 5500; na ose $r$ hodnoty 5 a 55. Přímka $LM$ stoupá z oblasti nízkých $r$, přímka $IS$ klesá a protíná osu $r$ kolem hodnoty 55. Průsečík $E$ leží v bodě $[r = 5,\ Y = 5000]$.*

## Ekonomická interpretace — fiskální a monetární politika

**Posun křivky IS (fiskální politika).** Expanzivní fiskální politika — zvýšení vládních výdajů $G$ nebo snížení daní $T$ — **posouvá IS doprava**: při dané úrokové míře vzroste rovnovážný důchod trhu zboží. Nová rovnováha $E'$ má vyšší $Y^E$ i vyšší $r^E$ (vyšší $Y$ zvedá poptávku po penězích, což tlačí $r$ nahoru).

![[imek-posun-is-lm-politiky.jpeg|Fiskální expanze (posun IS doprava, Y↑ r↑, crowding-out) vs. monetární expanze (posun LM doprava, Y↑ r↓, podpora investic)]]


**Posun křivky LM (monetární politika).** Expanzivní monetární politika — zvýšení nabídky peněz $M^*$ národní bankou — **posouvá LM doprava/dolů**: při daném důchodu je trh peněz v rovnováze při nižší úrokové míře. Nová rovnováha má nižší $r^E$ a vyšší $Y^E$ (nižší $r$ povzbuzuje investice $I(r)$, ty zvedají $Y$).

IS-LM tak dává jednotný rámec pro diskusi **dopadu obou typů politik** na důchod a úrokovou míru současně.

## Klíčové pojmy

- **Funkce investic $I(r) = cr + d$** — $c < 0$, $d > 0$; **klesající** funkce úrokové míry.
- **Trh zboží** — rovnováha $Y = C + I$, ekvivalentně $I = S$ (investice = úspory).
- **Křivka IS** (*Investment = Savings*) — $Y = \frac{c}{1-a}r + \frac{b+d}{1-a}$ (7.14); **klesající** přímka v rovině $(r, Y)$.
- **Trh peněz** — rovnováha $M^D = M^S$ při pevné nabídce $M^* $.
- **Transakční, opatrnostní, spekulační poptávka** — $M^D = L_1 + L_2 = k_1 Y + k_2 r + k_3$.
- **Křivka LM** (*Liquidity of Money*) — $M^* = k_1 Y + k_2 r + k_3$ (7.15); **rostoucí** přímka.
- **Simultánní rovnováha** — průsečík $E = (r^E, Y^E)$ křivek IS a LM.
- **Fiskální politika** — nástroje $G$, $T$ posouvající křivku IS.
- **Monetární politika** — nástroj $M^*$ posouvající křivku LM.

## Navigace

- **Kurz:** [[imek|Matematická ekonomie]]
- **Přednáška:** [[imek-blok-03]]
- **Nadřazené téma:** [[narodni-duchod]] — makroekonomické modely C-I, C-I-G, C-I-G-X a úvod do IS-LM
- **Související:**
  - [[poptavka-nabidka]] — paralela rovnovážného bodu (průsečík dvou křivek) v mikroekonomii
  - [[derivace]] — matematický základ pro směrnice IS a LM
  - [[funkce-vice-promennych]] — dvě neznámé a řešení lineárních soustav
