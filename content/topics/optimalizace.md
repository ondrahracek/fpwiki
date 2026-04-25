---
title: "Optimalizace"
course: ipmrk
type: topic
tags: [ipmrk, optimalizace, ucelova-funkce, minimum, maximum, matlab, fmincon, fminsearch, linprog, intlinprog, ga, omezeni]
sources: [raw/ipmrk/kniha.md, raw/ipmrk/optimalizace-online.md]
created: 2026-04-16
updated: 2026-04-16
---

# Optimalizace

Optimalizace je matematická disciplína, ve které hledáme minimum (resp. maximum) dané funkce f(x) na dané množině M. Tato funkce se nazývá **účelová** či **cílová**. Množina přípustných řešení bývá typicky popsána omezeními — soustavou rovnic nebo nerovnic.

Souvisí s: [[geneticke-algoritmy|genetické algoritmy]], [[evolucni-algoritmy|evoluční algoritmy]], [[datamining]].

## Základní pojmy

Každá optimalizační úloha obsahuje tři složky:

- **Stavové (rozhodovací) proměnné** (x₁, x₂, ..., xₙ) — hodnoty, které měníme
- **Účelová (cílová) funkce** f(x) — výraz, který minimalizujeme nebo maximalizujeme
- **Omezující podmínky** — definují přípustnou množinu M

**Obecná formulace minimalizační úlohy:**
```
minimalizovat f(x)
za podmínek:
  g(x) ≤ 0      (nerovnostní omezení)
  h(x) = 0      (rovnostní omezení)
  lb ≤ x ≤ ub   (meze proměnných)
```

**Maximalizace = negace:** `max f(x)` je ekvivalentní `min(−f(x))`.

## Typy omezujících podmínek (v MATLABu)

| Typ omezení | Zápis v MATLABu | Popis |
|---|---|---|
| Lineární nerovnostní | `A·x ≤ b` | Matice A, vektor b |
| Lineární rovnostní | `Aeq·x = beq` | Matice Aeq, vektor beq |
| Nelineární nerovnostní | `c(x) ≤ 0` | Funkce vracející vektor c |
| Nelineární rovnostní | `ceq(x) = 0` | Funkce vracející vektor ceq |
| Meze proměnných | `lb ≤ x ≤ ub` | Dolní a horní meze |

Nepotřebná omezení zadáváme jako `[]`.

## Typy optimalizačních úloh

| Typ | Popis | MATLAB solver |
|---|---|---|
| Lineární programování (LP) | f(x) i omezení jsou lineární | `linprog` |
| Nelineární programování (NLP) | f(x) nebo omezení jsou nelineární | `fmincon`, `fminsearch` |
| Celočíselné lineární (MILP) | LP, kde proměnné jsou celá čísla | `intlinprog` |
| Kombinatorická | Diskrétní množina řešení | `ga` |

## Lokální vs. globální optimum

- **Globální minimum** — absolutně nejnižší hodnota f(x) v celém definičním oboru
- **Lokální minimum** — nejnižší hodnota v okolí, ale ne nutně nejnižší ze všech
- `fmincon`, `fminsearch` nacházejí **lokální** minima — výsledek závisí na počátečním bodu x0
- Pro **globální** optimalizaci: `ga`, `GlobalSearch`, `MultiStart`

---

## MATLAB Optimization Toolbox — příkazy

### `fmincon` — nelineární optimalizace s omezeními

Nejuniverzálnější solver. Hledá minimum nelineární funkce s lineárními i nelineárními omezeními a mezemi.

**Plná syntaxe:**
```matlab
[x, fval, exitflag, output] = fmincon(fun, x0, A, b, Aeq, beq, lb, ub, nonlcon, options)
```

**Parametry:**

| Parametr | Popis |
|---|---|
| `fun` | Účelová funkce (function handle `@`) |
| `x0` | Počáteční bod (vektor) |
| `A`, `b` | Lineární nerovnostní omezení: A·x ≤ b |
| `Aeq`, `beq` | Lineární rovnostní omezení: Aeq·x = beq |
| `lb`, `ub` | Dolní a horní meze proměnných |
| `nonlcon` | Nelineární omezení — function handle vracející [c, ceq] |
| `options` | Nastavení z `optimoptions` |

**Výstupy:**

| Výstup | Popis |
|---|---|
| `x` | Optimální řešení |
| `fval` | Hodnota f(x) v optimu |
| `exitflag` | Důvod ukončení (1 = konvergence, záporné = selhání) |

**Algoritmy `fmincon`:**

| Algoritmus | Kdy použít |
|---|---|
| `'interior-point'` | Výchozí; velké problémy s mnoha proměnnými |
| `'sqp'` | Dobrá volba pro většinu problémů |
| `'active-set'` | Nehladká omezení |
| `'trust-region-reflective'` | Pouze meze nebo lineární rovnosti |

**Příklad — minimalizace výrobních nákladů:**
```matlab
% f(x) = 3*x1 + 5*x2
fun = @(x) 3*x(1) + 5*x(2);
x0 = [5, 5];

% Omezení: x1 + x2 <= 20, x1 >= 4, x2 >= 3
A = [1, 1; -1, 0; 0, -1];
b = [20; -4; -3];
lb = [0, 0];
ub = [20, 20];

options = optimoptions('fmincon', 'Display', 'final', 'Algorithm', 'sqp');
[x, fval] = fmincon(fun, x0, A, b, [], [], lb, ub, [], options);
```

**Nelineární omezení (syntax nonlcon):**
```matlab
% Musí vracet [c, ceq] — c(x)<=0 a ceq(x)=0
nonlcon = @(x) deal(25 - x(1)*x(2)*x(3)*x(4), sum(x.^2) - 40);
```

---

### `fminsearch` — optimalizace bez omezení (Nelder-Mead)

Nepotřebuje gradient (derivative-free). Vhodné pro funkce s obtížně spočitatelným gradientem. Pracuje se simplexem n+1 bodů.

**Syntaxe:**
```matlab
[x, fval] = fminsearch(fun, x0, options)
```

Používá `optimset` (ne `optimoptions`):
```matlab
options = optimset('MaxIter', 1000, 'TolFun', 1e-8, 'TolX', 1e-8, 'Display', 'iter');
```

**Příklady:**
```matlab
% Kvadratická funkce
fun = @(x) (x - 3)^2 + 2;
[x, fval] = fminsearch(fun, 0)     % → x≈3, fval≈2

% Rosenbrock (2 proměnné)
rosenbrock = @(x) (1-x(1))^2 + 100*(x(2)-x(1)^2)^2;
[x, fval] = fminsearch(rosenbrock, [-1, -1])    % → x≈[1,1]
```

---

### `linprog` — lineární programování

**Syntaxe:**
```matlab
[x, fval] = linprog(f, A, b, Aeq, beq, lb, ub)
```

`f` je vektor koeficientů účelové funkce — minimalizuje `f' · x`.

**Minimalizace nákladů:**
```matlab
f = [2; 3];                  % minimalizuje 2*x1 + 3*x2
A = [1, 1; 2, 1]; b = [10; 14];
lb = [0; 0];
[x, fval] = linprog(f, A, b, [], [], lb)
```

**Maximalizace zisku (negace f):**
```matlab
% max z(x) = 12*x1 + 7*x2 → min -z(x)
f = [-12; -7];
[x, neg_zisk] = linprog(f, A, b, [], [], lb);
max_zisk = -neg_zisk;
```

---

### `intlinprog` — celočíselné lineární programování (MILP)

**Syntaxe:**
```matlab
[x, fval] = intlinprog(f, intcon, A, b, Aeq, beq, lb, ub)
```

`intcon` = vektor indexů celočíselných proměnných (např. `[1, 3]` = x1 a x3 jsou celá čísla).

**Binární proměnné (lb=0, ub=1):**
```matlab
f = [5; 8; 3; 6];
intcon = [1, 2, 3, 4];    % všechny proměnné binární
lb = zeros(4,1); ub = ones(4,1);
[x, fval] = intlinprog(f, intcon, A, b, [], [], lb, ub)
```

---

### `ga` — genetický algoritmus (Global Optimization Toolbox)

Hledá globální minimum. Vhodný pro nekonvexní, nehladké nebo diskrétní problémy.

**Syntaxe:**
```matlab
[x, fval] = ga(fun, nvars, A, b, Aeq, beq, lb, ub, nonlcon, intcon, options)
```

**Klíčové parametry `optimoptions('ga', ...)`:**
```matlab
options = optimoptions('ga', ...
    'PopulationSize',      100, ...    % velikost populace
    'MaxGenerations',      300, ...    % max počet generací
    'CrossoverFraction',   0.8, ...    % podíl křížení
    'EliteCount',          5, ...      % elitní jedinci (přecházejí přímo)
    'MaxStallGenerations', 50, ...     % zastavení po N generacích bez zlepšení
    'Display',             'iter', ...
    'PlotFcn',             @gaplotbestfun);
```

**Příklad — globální optimum multimodální funkce:**
```matlab
% Rastriginova funkce má mnoho lokálních minim
rastrigin = @(x) 10*numel(x) + sum(x.^2 - 10*cos(2*pi*x));
[x, fval] = ga(rastrigin, 2)    % ga najde globální minimum
```

---

### `optimoptions` — nastavení parametrů solverů

**Syntaxe:**
```matlab
options = optimoptions('SolverName', 'ParamName', value, ...)
```

**Klíčové parametry zastavení:**

| Parametr | API | Popis |
|---|---|---|
| `MaxIterations` | `optimoptions` | Max počet iterací |
| `MaxFunctionEvaluations` | `optimoptions` | Max počet vyhodnocení funkce |
| `OptimalityTolerance` | `optimoptions` | Tolerance normy gradientu (dříve TolFun) |
| `StepTolerance` | `optimoptions` | Tolerance kroku/změny x (dříve TolX) |
| `ConstraintTolerance` | `optimoptions` | Max přípustné porušení omezení |
| `TolFun`, `TolX` | `optimset` | Starší API pro fminsearch/fminbnd |

**Typické nastavení:**
```matlab
options = optimoptions('fmincon', ...
    'Algorithm',              'sqp', ...
    'Display',                'iter', ...
    'MaxIterations',          1000, ...
    'MaxFunctionEvaluations', 3000, ...
    'OptimalityTolerance',    1e-8, ...
    'StepTolerance',          1e-8);
```

---

## Klíčové principy pro zkoušku

1. **Maximalizace = negace** — `max f(x)` → `min −f(x)`
2. **Nepotřebná omezení** → zadat jako `[]`
3. **x0 ovlivňuje** které lokální minimum fmincon/fminsearch najde
4. **`optimoptions`** slouží pro fine-tuning (tolerance, iterace, algoritmus)
5. **`ga`** je pomalejší, ale nepotřebuje gradient a hledá globální optimum
6. **Nelineární omezení** musí vracet `[c, ceq]` — nerovnosti (c≤0) a rovnosti (ceq=0)

## Kontrolní otázky ke zkoušce

1. Čím se zabývá optimalizace?
2. K čemu nám slouží optimalizace?
3. Jaké jsou příkazy MATLABu pro optimalizaci?
4. Jaká jsou možná nastavení parametrů optimalizace?

## Pojmy k zapamatování

Optimalizace, hledání minima, hledání maxima, příkazy optimalizace, parametry optimalizace.

## Zdroje v kurzu [[ipmrk|IpmrK]]

- [[ipmrk-kniha|Kniha]] — definice, kontrolní otázky, pojmy
- [[ipmrk-optimalizace|MATLAB Optimization Toolbox]] — kompletní MATLAB syntaxe, příklady (MathWorks docs, VUT FEEC)
