---
title: "Derivace, diferenciál a extrémy 1D"
course: imek
type: topic
tags: [derivace, diferencial, extremy, tangenta, mezni-naklady]
sources: [raw/imek/KS_prvni_blok.pdf]
created: 2026-04-20
updated: 2026-04-20
---

# Derivace, diferenciál a extrémy funkcí jedné proměnné

Matematický aparát kurzu [[imek|ImeK]]. Bez derivace se neobejdou **mezní veličiny** (mezní náklady, mezní příjem, mezní užitečnost), bez extrémů se neobejde **maximalizace zisku** ani **minimalizace nákladů**.

## Funkce a polynomy

Funkce jedné proměnné $y = f(x)$ — předpis závislosti $x$ (nezávislá) → $y$ (závislá). Hodnota v bodě: $f(a)$.

Polynomy:
- 1. stupně: $y = ax + b$
- 2. stupně: $y = ax^2 + bx + c$
- 3. stupně: $y = ax^3 + bx^2 + cx + d$

**Příklad rozkladu:** $y = x^2 - 5x + 6 = (x-2)(x-3)$, kořeny $x_1 = 2,\ x_2 = 3$. Vrcholový tvar $y = (x - \tfrac{5}{2})^2 - \tfrac{1}{4}$.

## Derivace

Označení $f'(x)$ nebo $\dfrac{dy}{dx}$. Hodnota v bodě: $f'(a)$.

### Geometrická interpretace

$f'(a)$ = **sklon tečny** ke grafu funkce v bodě $[a, f(a)]$. Rovnice tečny:

$$y - f(a) = f'(a)(x - a)$$

![[imek-derivace-tecna.jpeg|Geometrická interpretace derivace — sklon tečny v bodě A]]

### Inženýrská interpretace

$f'(a)$ = **rychlost změny** $y$ vzhledem k $x$ v bodě $x = a$; přibližná změna $y$ při změně $x$ z $a$ na $a+1$:

$$f(a+1) \approx f(a) + f'(a)$$

### Příklad — mezní náklady

Celkové náklady $TC = 1000 + 2Q + 0{,}1 Q^2$.

Mezní náklady: $MC = TC' = 2 + 0{,}2 Q$, takže $MC(10) = 4$.

**Skutečný přírůstek:** $\Delta TC = TC(11) - TC(10) = 4{,}2$. **Přibližný (lineární):** $4$.

(Viz aplikace v [[prijem-naklady-zisk]].)

## Diferenciál

$$df = f'(x)\, dx$$

Pro malá $dx$ platí: $\Delta f = f(x + dx) - f(x) \approx df$. Diferenciál je **lineární odhad přírůstku**.

### Příklad

$TC = 100 + 0{,}1 Q^2$, odhad změny při $Q: 50 \to 60$ (tj. $dQ = 10$):

$$dTC = 0{,}2 Q \cdot dQ = 0{,}2 \cdot 50 \cdot 10 = 100$$

Přesná změna: $\Delta TC = 110$. Lineární odhad mírně podstřeluje, protože $TC$ je konvexní.

## Extrémy funkce jedné proměnné

### Nutná podmínka

Má-li $f(x)$ v bodě $a$ extrém, pak $f'(a) = 0$. Body splňující tuto podmínku se nazývají **stacionární** (podezřelé) body.

### Postačující podmínka

Pro stacionární bod $a$, je-li $f''(a) \neq 0$:

- $f''(a) > 0$ ⇒ **lokální minimum**
- $f''(a) < 0$ ⇒ **lokální maximum**

![[imek-extremy-1d.jpeg|Lokální maximum a minimum kubické funkce — vodorovné tečny v podezřelých bodech, znaménko f'' určuje typ]]

### Příklad

$f(x) = 2x^3 - 3x^2 - 12x + 3$

- $f'(x) = 6x^2 - 6x - 12 = 6(x+1)(x-2) = 0$ ⇒ S.B. $x_1 = -1, x_2 = 2$
- $f''(x) = 12x - 6$
- $f''(-1) = -18 < 0$ ⇒ **maximum** v $-1$
- $f''(2) = 18 > 0$ ⇒ **minimum** v $2$

## Navigace

- **Předchozí:** [[zaklady-matematicke-ekonomie|Základy matematické ekonomie]]
- **Navazující:** [[integral|Integrál]]
- **Souvislosti:** [[funkce-vice-promennych|Funkce více proměnných]] (rozšíření na 2D), [[prijem-naklady-zisk|Příjem, náklady, zisk]] (aplikace mezních veličin), [[elasticita|Elasticita]] (procentní citlivost přes derivaci)
