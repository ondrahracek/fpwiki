---
title: "Integrál (neurčitý a určitý)"
course: imek
type: topic
tags: [integral, neurcity, urcity, primitivni-funkce, tr-z-mr, tc-z-mc]
sources: [raw/imek/KS_prvni_blok.pdf]
created: 2026-04-20
updated: 2026-04-20
---

# Integrál

Druhá polovina kalkulu jedné proměnné. Slouží k **rekonstrukci totální veličiny z mezní** (TR z MR, TC z MC) a k výpočtu **přebytků** (consumer/producer surplus).

## Neurčitý integrál

$$F(x) = \int f(x)\, dx + C$$

kde $F'(x) = f(x)$. $F$ je **primitivní funkce** k $f$, $C$ konstanta.

## Určitý integrál

$$\int_a^b f(x)\, dx = [F(x)]_a^b = F(b) - F(a)$$

Geometricky **plocha pod grafem** $f$ na intervalu $[a, b]$ (orientovaná).

![[imek-integral-plocha.jpeg|Určitý integrál jako plocha pod křivkou — typická aplikace: TR jako integrál z MR]]

## Aplikace v ekonomii

### Příklad — TR z MR

Mezní příjem $MR = 100 - 2Q$.

$$TR = \int (100 - 2Q)\, dQ = 100Q - Q^2 + c$$

Okrajová podmínka $TR(0) = 0$ ⇒ $c = 0$:

$$TR(Q) = 100Q - Q^2$$

### Příklad — TC z MC

Mezní náklady $MC = 2 + 0{,}2 Q$, fixní náklady $FC = 100$.

$$TC = \int MC\, dQ = 2Q + 0{,}1 Q^2 + c$$

Okrajová podmínka $TC(0) = FC = 100$ ⇒ $c = 100$:

$$TC(Q) = 100 + 2Q + 0{,}1 Q^2$$

### Přebytek spotřebitele a výrobce

Přebytek spotřebitele:

$$CS(Q_0) = \int_0^{Q_0} D(Q)\, dQ - P_0\, Q_0$$

Přebytek výrobce:

$$PS(Q_0) = P_0\, Q_0 - \int_0^{Q_0} S(Q)\, dQ$$

Detailně viz [[poptavka-nabidka|Poptávka a nabídka]].

## Navigace

- **Předchozí:** [[derivace|Derivace, diferenciál a extrémy 1D]]
- **Navazující:** [[funkce-vice-promennych|Funkce více proměnných]]
- **Souvislosti:** [[prijem-naklady-zisk|Příjem, náklady, zisk]] (TR/TC), [[poptavka-nabidka|Poptávka a nabídka]] (přebytky CS/PS)
