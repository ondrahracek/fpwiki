---
title: Lagrangeova metoda (vázané extrémy)
courses: [imek, ipmrk]
type: topic
tags: [imek, optimalizace, vazane-extremy, multiplikator]
sources: [raw/imek/KS_prvni_blok.pdf, raw/imek/KS_treti_blok.pdf]
created: 2026-04-20
updated: '2026-04-25'
---

# Lagrangeova metoda (vázané extrémy)

Hledáme extrém funkce $f(x, y)$ (resp. $U(Q_1, Q_2)$ apod.) **podmíněný** rovnicí $g(x, y) = 0$. V [[imek|matematické ekonomii]] se používá pro:

![[imek-lagrange-tecnost.jpeg|Geometrie Lagrangeovy metody — optimum leží v bodě tečnosti vrstevnice f s omezením g(x,y)=0; gradienty jsou rovnoběžné]]

- **Maximalizaci užitečnosti** při rozpočtovém omezení (viz [[uzitecnost]])
- **Minimalizaci výdajů** při dané úrovni užitečnosti (duální úloha)
- Optimalizaci produkce / nákladů za omezení

## Princip

Definujeme **Lagrangeovu funkci**:

$$L(x, y, \lambda) = f(x, y) + \lambda\, g(x, y)$$

kde $\lambda$ je **Lagrangeův multiplikátor**.

## Nutná podmínka

Řešíme soustavu:

$$L'_x = f'_x + \lambda\, g'_x = 0$$
$$L'_y = f'_y + \lambda\, g'_y = 0$$
$$L'_\lambda = g(x, y) = 0$$

## Postačující podmínka

$$D(x, y, \lambda) = (f''_{xx} + \lambda g''_{xx})(g'_y)^2 + (f''_{yy} + \lambda g''_{yy})(g'_x)^2 - 2(f''_{xy} + \lambda g''_{xy})\, g'_x\, g'_y$$

Je-li $[a, b, \lambda_0]$ podezřelý bod:

- $D(a, b, \lambda_0) < 0$ ⇒ **maximum** vázané podmínkou $g(x, y) = 0$
- $D(a, b, \lambda_0) > 0$ ⇒ **minimum** vázané podmínkou $g(x, y) = 0$

## Význam multiplikátoru

$$\lambda = \frac{f'_x}{-g'_x} = \frac{f'_y}{-g'_y}$$

$\lambda$ udává:
- konstantní **poměr mezi mezním prospěchem a mezním nákladem**
- **náklady příležitosti** (opportunity cost) — o kolik vzroste optimální hodnota $f$, uvolní-li se omezení o jednotku

## Alternativní postup

Lze-li z $g(x, y) = 0$ vyjádřit $y = y(x)$ (nebo $x = x(y)$), dosadíme do $f$ a převedeme na **extrém funkce jedné proměnné**.

## Použití v ImeK

### Maximalizace užitečnosti

Rozpočtové omezení: $Y^* = P_1^* Q_1 + P_2^* Q_2$.

$$L(Q_1, Q_2, \lambda) = U(Q_1, Q_2) + \lambda (Y^* - P_1^* Q_1 - P_2^* Q_2)$$

Soustava: $U'_1 = \lambda P_1^*$, $U'_2 = \lambda P_2^*$, $Y^* = P_1^* Q_1 + P_2^* Q_2$. Z prvních dvou: $\tfrac{U'_1}{U'_2} = \tfrac{P_1^*}{P_2^*}$, tj. $MRCS = \tfrac{P_1^*}{P_2^*}$.

### Minimalizace výdajů

Podmínka dané užitečnosti $U^* = U(Q_1, Q_2)$.

$$L(Q_1, Q_2, \lambda) = P_1^* Q_1 + P_2^* Q_2 + \lambda (U^* - U(Q_1, Q_2))$$

Duálně dostaneme Hicksovy poptávkové funkce $Q_i = D_i(P_1, P_2, U)$.

## Navigace

- **Předchozí:** [[funkce-vice-promennych|Funkce více proměnných]]
- **Navazující:** [[poptavka-nabidka|Poptávka a nabídka]]
- **Aplikace v kurzu:** [[uzitecnost|Užitečnost]] (maximalizace užitečnosti při rozpočtovém omezení), minimalizace výdajů (duální úloha), optimalizace produkce
- **Souvislosti:** [[narodni-duchod|Národní důchod]], [[optimalizace|Optimalizace]] (IpmrK)
