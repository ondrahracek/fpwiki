---
title: Kalkul funkcí více proměnných
course: imek
type: topic
tags: [imek, parcialni-derivace, diferencial, implicitni-funkce, volne-extremy, indiferencni-krivky]
sources: [raw/imek/KS_prvni_blok.pdf]
created: 2026-04-20
updated: '2026-04-25'
---

# Kalkul funkcí více proměnných

Většina ekonomických veličin závisí na **více faktorech** — produkce na práci a kapitálu, užitečnost na množství různých statků, poptávka na cenách více zboží i důchodu. Kalkul jedné proměnné se proto rozšiřuje na $z = f(x, y)$, $w = f(x, y, z), \ldots$.

![[imek-funkce-2d-vrstevnice.jpeg|3D plocha z = f(x,y) a její vrstevnice v rovině xy — základ pro indiferenční křivky a izokvanty]]

## Indiferenční / izokvantové křivky

Pro $z = f(x, y)$ se křivkou s předpisem $f(x, y) = c$ (konstanta) rozumí **vrstevnice** funkce. V ekonomii:

- **Indiferenční křivky** užitečnosti $U(Q_1, Q_2) = c$ — viz [[uzitecnost]].
- **Izokvanty** produkce $Q(L, K) = c$ — viz [[produkce]].

## Parciální derivace

Pro $f(x, y)$ derivujeme jako kdyby druhá proměnná byla konstanta:

$$f'_x = \frac{\partial f}{\partial x}, \qquad f'_y = \frac{\partial f}{\partial y}$$

Hodnoty v bodě: $f'_x(a, b),\ f'_y(a, b)$.

### Ekonomické značení

Pro produkční funkci $Q(L, K)$:
- $Q'_L$ = **mezní produkt práce** ($MP_L$)
- $Q'_K$ = **mezní produkt kapitálu** ($MP_K$)

### Inženýrská interpretace

$f'_x(a, b)$:
- rychlost změny $f$ vůči $x$ při $x = a, y = b$ (kapitál fixní),
- přibližná změna $f$ při změně $x$ o 1 (a pevném $y = b$): $f(a+1, b) \approx f(a, b) + f'_x(a, b)$.

## Diferenciál funkce dvou proměnných

$$df = f'_x(x, y)\, dx + f'_y(x, y)\, dy$$

Pro malá $dx, dy$ platí $\Delta f \approx df$. Linearizace přírůstku ve dvou směrech současně.

## Implicitní funkce

Je-li vztah dán rovnicí $F(x, y) = 0$ a chceme derivaci $y$ podle $x$ (nebo naopak):

$$y' = \frac{dy}{dx} = -\frac{F'_x}{F'_y}, \qquad x' = \frac{dx}{dy} = -\frac{F'_y}{F'_x}$$

Tato vzorec dává **sklon vrstevnice** — používá se mj. pro výpočet [[produkce|MRTS]] a [[uzitecnost|MRCS]].

## Volné extrémy funkce dvou proměnných

### Nutná podmínka

V bodě extrému $A[a, b]$ musí platit současně:

$$f'_x(a, b) = 0 \;\wedge\; f'_y(a, b) = 0$$

### Postačující podmínka

Definujeme **diskriminant** (Hessián zjednodušeně):

$$D(x, y) = f''_{xx} \cdot f''_{yy} - (f''_{xy})^2$$

V podezřelém bodě $[a, b]$:

1. **$D(a, b) > 0$:** je to extrém.
   - $f''_{xx}(a, b) > 0$ ⇒ **minimum**
   - $f''_{xx}(a, b) < 0$ ⇒ **maximum**
2. **$D(a, b) < 0$:** **sedlo** (v daném bodě extrém není).
3. **$D(a, b) = 0$:** podmínka nerozhoduje.

## Vázané extrémy

Pro extrémy s omezující podmínkou $g(x, y) = 0$ se používá [[lagrangeova-metoda|Lagrangeova metoda]].

## Navigace

- **Předchozí:** [[integral|Integrál]]
- **Navazující:** [[lagrangeova-metoda|Lagrangeova metoda]]
- **Souvislosti:** [[produkce|Produkce]] (parciální derivace = mezní produkty), [[uzitecnost|Užitečnost]] (parciální derivace = mezní užitečnost), [[elasticita|Elasticita]] (vícefaktorový model)
