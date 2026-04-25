---
title: "Optimalizace — MATLAB Optimization Toolbox"
course: ipmrk
type: summary
tags: [ipmrk, optimalizace, matlab, fmincon, fminsearch, linprog, intlinprog, ga, optimoptions, ucelova-funkce]
sources: [raw/ipmrk/optimalizace-online.md]
created: 2026-04-16
updated: 2026-04-16
---

# Optimalizace — MATLAB Optimization Toolbox

Zdroj: `raw/ipmrk/optimalizace-online.md` (ověřeno z MathWorks docs, cs.wikipedia.org, VUT FEEC, APMonitor).

## Hlavní přínos zdroje

Kompletní syntaxe všech klíčových MATLAB solverů s příklady. Doplňuje [[ipmrk-kniha|knihu]], která zmiňovala MATLAB příkazy, ale bez detailů. Podloženo přímou dokumentací MathWorks.

## Základy optimalizace

Tři složky každé úlohy:
- **Stavové proměnné** — co měníme (x₁, x₂, ..., xₙ)
- **Účelová funkce** f(x) — co minimalizujeme/maximalizujeme
- **Omezující podmínky** — rovnice/nerovnice definující přípustnou množinu M

Typy omezení v MATLABu:
- `A·x ≤ b` — lineární nerovnostní
- `Aeq·x = beq` — lineární rovnostní
- `c(x) ≤ 0` — nelineární nerovnostní
- `ceq(x) = 0` — nelineární rovnostní
- `lb ≤ x ≤ ub` — meze proměnných

## MATLAB solvery — přehled

| Solver | Typ problému | Klíčová syntaxe |
|---|---|---|
| `fmincon` | NLP s omezeními | `fmincon(fun, x0, A, b, Aeq, beq, lb, ub, nonlcon, options)` |
| `fminsearch` | NLP bez omezení (Nelder-Mead) | `fminsearch(fun, x0, options)` |
| `linprog` | LP | `linprog(f, A, b, Aeq, beq, lb, ub)` |
| `intlinprog` | MILP | `intlinprog(f, intcon, A, b, Aeq, beq, lb, ub)` |
| `ga` | Globální, diskrétní | `ga(fun, nvars, A, b, Aeq, beq, lb, ub, nonlcon, intcon, options)` |

## Klíčové poznatky

- **Maximalizace = negace**: `max f(x)` → `min −f(x)`, pro linprog negovat vektor `f`
- **Nepotřebná omezení** zadávat jako `[]`
- **x0 ovlivňuje** které lokální minimum fmincon/fminsearch najde
- **Nelineární omezení** musí vracet `[c, ceq]` — nerovnosti (c≤0) a rovnosti (ceq=0)
- **`ga`** je pomalejší, ale nepotřebuje gradient a hledá globální optimum

## Algoritmy fmincon

| Algoritmus | Kdy použít |
|---|---|
| `'interior-point'` | Výchozí, velké problémy |
| `'sqp'` | Dobrá volba pro většinu problémů |
| `'active-set'` | Nehladká omezení |
| `'trust-region-reflective'` | Pouze meze nebo lineární rovnosti |

## optimoptions — klíčové parametry

```matlab
options = optimoptions('fmincon', ...
    'Algorithm',              'sqp', ...
    'MaxIterations',          1000, ...
    'MaxFunctionEvaluations', 3000, ...
    'OptimalityTolerance',    1e-8, ...   % (dříve TolFun)
    'StepTolerance',          1e-8);      % (dříve TolX)
```

Poznámka: `fminsearch` používá `optimset` (starší API), ostatní `optimoptions`.

## Praktické příklady

Zdrojový soubor obsahuje kompletní MATLAB kód pro:
- Minimalizaci výrobních nákladů (fmincon s lin. omezeními)
- Maximalizaci zisku přes linprog (negace)
- Benchmark úlohu s nelineárními omezeními (4 proměnné)
- ga pro multimodální funkci (Rastriginova)
- MultiStart pro systematické prohledávání více startovních bodů
