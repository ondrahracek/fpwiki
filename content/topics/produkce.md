---
title: Produkce — produkční funkce, Cobb-Douglas, MRTS
course: imek
type: topic
tags: [imek, produkce, produkcni-funkce, mpl-apl, cobb-douglas, izokvanty, mrts, euler]
sources: [raw/imek/kniha_scanned/, raw/imek/KS_druhy_blok.pdf]
created: 2026-04-22
updated: '2026-04-25'
---

# Produkce — produkční funkce, Cobb-Douglas, MRTS

> [!abstract] TL;DR
> **Produkční funkce** popisuje vztah mezi vstupy (práce $L$, kapitál $K$) a výstupem $Q$. V **jednofaktorovém modelu** ($Q = Q(L)$) studujeme *mezní produkt práce* $MP_L = Q'(L)$ a *průměrný produkt* $AP_L = Q/L$; v maximu $AP_L$ platí $MP_L = AP_L$. Ve **dvoufaktorovém modelu** ($Q = Q(L,K)$) dominují **Cobb-Douglasovy** funkce $Q = AL^a K^b$; mezní produkty $MP_L, MP_K$ jsou parciální derivace a jejich podíl dává **mezní míru technické substituce** $MRTS = MP_L/MP_K$ — sklon izokvanty. Součet exponentů $a+b$ určuje typ výnosů z rozsahu.

## Úvod — cílové znalosti kapitoly 5

Po prostudování kapitoly 5 student umí:

- popsat **jednofaktorový model produkce**,
- vypočítat **mezní** a **průměrný produkt práce** a ekonomicky je interpretovat,
- charakterizovat průběh **křivky produkce**,
- formulovat **princip maximalizace průměrného produktu práce**,
- popsat **dvoufaktorový model produkce**,
- uvést tvar **Cobb–Douglasových produkčních funkcí**,
- vyložit, co jsou **konstantní**, **rostoucí**, **klesající výnosy z rozsahu**,
- vypočítat **mezní produkty práce a kapitálu** a ekonomicky je interpretovat,
- najít **izokvanty**,
- vypočítat **mezní míru technické substituce (MRTS)** a ekonomicky ji interpretovat.

Každý proces produkce je určován **faktory** (též **vstupy**) produkce. K hlavním patří **práce** $L$, **kapitál** $K$ a **půda**. Při modelování se půda obvykle považuje za dlouhodobě konstantní, takže endogenními faktory zůstávají práce a kapitál. Je-li kapitál neměnný, hovoříme o **jednofaktorovém modelu** (produkce závisí jen na práci); v opačném případě o **dvoufaktorovém modelu**.

Související matematický aparát: [[derivace|Derivace]], [[funkce-vice-promennych|Funkce více proměnných]] (parciální derivace a totální diferenciál).

## Jednofaktorový model produkce

Uvažujeme proces v krátkém období, kdy kapitál lze považovat za konstantní. Závislost produkce $Q$ na práci $L$ vyjadřuje **produkční funkce**

$$
Q = Q(L), \tag{5.1}
$$

jejíž graf se nazývá **křivka produkce** (*production curve*). Práce $L$ se měří počtem pracovníků, případně počtem pracovních hodin.

## Mezní produkt práce ($MP_L$)

**Mezní produkt práce** (*marginal product of labour*) $MP_L$ je derivace produkce podle práce:

$$
MP_L = \frac{dQ}{dL} = Q'(L). \tag{5.2}
$$

Pro pevnou hodnotu $L^*$ udává $Q'(L^*)$ rychlost změny produkce vzhledem k práci v bodě $L^*$, resp. přibližnou změnu produkce odpovídající jednotkové změně práce (z $L^*$ na $L^*+1$).

> [!info] Intuice
> $MP_L$ odpovídá na otázku „**kolik produkce přibude, když přidám jednoho dalšího pracovníka** (při neměnném kapitálu)?". Je to sklon křivky produkce v bodě $L$.

**Přibližná změna produkce** pro změnu práce o $dL$ (z $L$ na $L+dL$) pomocí diferenciálu:

$$
\Delta Q \approx dQ = Q'(L)\,dL = MP_L\,dL. \tag{5.3}
$$

Skutečná změna je $\Delta Q = Q(L+dL) - Q(L)$.

### Zákon klesajících mezních výnosů

**Zákon klesajících výnosů** (*law of diminishing marginal productivity*):

> Roste-li postupně některý ze vstupů (*ceteris paribus*), budou přírůstky výstupu od jistého bodu klesat.

Typická křivka produkce (Obrázek 5.2) má dvě fáze:

1° **Do bodu $L_0$:** $MP_L$ roste, tj. $(MP_L)' = Q''(L) > 0$ — křivka produkce je **konvexní**.
2° **Od bodu $L_0$:** $MP_L$ klesá, $Q''(L) < 0$ — křivka produkce je **konkávní**. $MP_L$ v kladných hodnotách klesá do bodu $L_1$, kde $MP_L(L_1) = 0$ (maximum produkce), a dále pokračuje v záporných hodnotách. Bod $L_0$ je **inflexním bodem** produkční funkce.

Matematicky: zákon klesajících výnosů znamená, že od určitého $L_0$ platí $Q''(L) < 0$.

**Typický polynom třetího stupně:** $Q(L) = aL^3 + bL^2$ s $a < 0$, $b > 0$. Pak

$$
L_0 = -\tfrac{1}{3}\tfrac{b}{a}, \qquad L_1 = -\tfrac{2}{3}\tfrac{b}{a}.
$$

## Průměrný produkt práce ($AP_L$)

**Průměrný produkt práce** (*average product of labour*) $AP_L$ je podíl produkce a práce:

$$
AP_L = \frac{Q}{L}. \tag{5.4}
$$

Je to nejjednodušší míra produktivity práce. Cílem optimalizace je maximalizace $AP_L$.

## Princip maximalizace průměrného produktu práce

![[imek-q-mpl-apl-tripanel.jpeg|Tři grafy produkční funkce: Q(L) S-křivka, MP_L parabola (max v L_inflex), AP_L parabola (MP=AP v max AP_L)]]

> **Princip:** Má-li $AP_L$ v bodě $L_0$ maximum, pak platí
> $$ MP_L(L_0) = AP_L(L_0). \tag{5.5} $$

Slovně: **v bodě maxima průměrného produktu práce se mezní produkt práce rovná průměrnému produktu práce.** Jde o analogii [[prijem-naklady-zisk|principu minimalizace průměrných nákladů]] $AC$.

> [!tip] Postup — jak najít max $AP_L$
> 1. Napište $AP_L = Q(L)/L$ a zderivujte.
> 2. Položte $(AP_L)' = 0$ a vyřešte. *Zkratka:* můžete rovnou řešit $MP_L(L) = AP_L(L)$.
> 3. Ověřte 2. derivací (či grafem), že jde o maximum.

### Odvození

Z $AP_L = Q(L)/L$ a derivace podílu:

$$
(AP_L)'(L) = \frac{Q'(L)\cdot L - Q(L)\cdot 1}{L^2} = \frac{1}{L}\left(Q'(L) - \frac{Q(L)}{L}\right) = \frac{1}{L}\bigl(MP_L(L) - AP_L(L)\bigr).
$$

Pro $L_0 > 0$ je $(AP_L)'(L_0) = 0 \Leftrightarrow MP_L(L_0) = AP_L(L_0)$, čímž je (5.5) dokázáno.

### Příklad 5.1

Je dána produkce $Q = 6L^2 - 0{,}2L^3$.

**(a)** Pro $L = 2, 5, 8, 10, 14, 18, 20, 21, 25$ určíme $MP_L$.

Podle (5.2): $MP_L = Q'(L) = 12L - 0{,}6L^2 = L(12 - 0{,}6L)$. Dosazením:

| $L$ | 2 | 5 | 8 | 10 | 14 | 18 | 20 | 21 | 25 |
|---|---|---|---|---|---|---|---|---|---|
| $MP_L$ | 21,6 | 45 | 57,6 | 60 | 50,4 | 21,6 | 0 | $-12{,}6$ | $-75$ |

$MP_L$ nabývá maxima pro $L = 10$ (60 jednotek/prac.). Od $L = 10$ přírůstky klesají, v $L = 20$ produkce přestává růst (maximum $Q(20) = 800$), od $L > 20$ produkce klesá (fyzické přeplnění pracoviště při neměnném kapitálu).

*Obrázek 5.1 — graf produkce $Q(L) = 6L^2 - 0{,}2L^3$ s maximem $Q = 800$ v bodě $L = 20$.*

**(b)** Přibližná změna produkce při růstu pracovníků z 6 na 9.

Podle (5.3) s $L = 6$, $dL = 3$:

$$
dQ = MP_L(6)\cdot 3 = (12\cdot 6 - 0{,}6\cdot 36)\cdot 3 = 50{,}4 \cdot 3 = 151{,}2.
$$

Produkce vzroste z $Q(6) = 172{,}8$ přibližně na $324$. Skutečná hodnota: $\Delta Q = Q(9) - Q(6) = 340{,}2 - 172{,}8 = 167{,}4$.

### Příklad 5.2

Ověříme princip (5.5) pro $Q = 6L^2 - 0{,}2L^3$.

$$
AP_L = \frac{Q}{L} = 6L - 0{,}2L^2, \quad AP_L' = 6 - 0{,}4L = 0 \;\Rightarrow\; L_0 = 15.
$$

$AP_L'' = -0{,}4 < 0$, takže v $L = 15$ je maximum, $AP_L(15) = 6\cdot 15 - 0{,}2\cdot 225 = 90 - 45 = 45$.

$MP_L(15) = 12\cdot 15 - 0{,}6\cdot 225 = 180 - 135 = 45$. Tedy $MP_L(15) = AP_L(15) = 45$, jak požaduje (5.5).

**Zkratka bez hledání extrému:** stačí řešit $MP_L = AP_L$, tj. $12L - 0{,}6L^2 = 6L - 0{,}2L^2 \Rightarrow L = 15$.

*Obrázek 5.3 — křivky $MP_L$ (max 60 při $L=10$) a $AP_L$ (max 45 při $L=15$), průsečík v $L = 15$. Nalevo od 15 leží $MP_L$ nad $AP_L$, napravo pod ní.*

## Dvoufaktorový model produkce

V dvoufaktorovém modelu závisí produkce $Q$ na **práci** $L$ i **kapitálu** $K$:

$$
Q = Q(L, K). \tag{5.6}
$$

Půda je nadále standardní exogenní proměnnou. Vztah (5.6) se nazývá **produkční funkce** (v širším smyslu oproti jednofaktorovému modelu).

## Cobb-Douglasova produkční funkce

Široce používané produkční funkce mají tvar

$$
Q = A\,L^a\,K^b, \tag{5.7}
$$

kde $A, a, b$ jsou kladné konstanty. Nazývají se **Cobb-Douglasovy** (poprvé publikovány v roce 1939). V ekonomických analýzách zpravidla $a, b < 1$.

![[imek-vynosy-z-rozsahu-3typy.jpeg|Tři typy výnosů z rozsahu u Cobb-Douglas: konstantní (a+b=1), rostoucí (a+b>1), klesající (a+b<1) — podle rozestupu izokvant]]


Reflektují ekonomickou zákonitost, že **proporcionální změny vstupů mají odezvu v proporcionální změně výstupu**. Změní-li se práce z $L$ na $rL$ a kapitál z $K$ na $rK$:

$$
Q(rL, rK) = A(rL)^a(rK)^b = A\,r^{a+b}\,L^a K^b = r^{a+b}\,Q(L, K). \tag{5.8}
$$

Volně: **změní-li se vstupy $r$-krát, změní se výstup $r^{a+b}$-krát.**

### Výnosy z rozsahu

Součet exponentů $a+b$ určuje typ výnosů z rozsahu:

| Typ | Podmínka | Chování produkce při $r$-násobném zvýšení vstupů | Příklad |
|---|---|---|---|
| 1° **Konstantní** (*constant returns*) | $a+b = 1$ | $Q$ vzroste **přesně** $r$-krát | $Q = 2L^{1/4}K^{3/4}$ |
| 2° **Rostoucí** (*increasing returns*) | $a+b > 1$ | $Q$ vzroste **více** než $r$-krát | $Q = 7LK^2$ ($a+b = 3$) |
| 3° **Klesající** (*decreasing returns*) | $a+b < 1$ | $Q$ vzroste **méně** než $r$-krát | $Q = 10L^{0{,}3}K^{0{,}5}$ ($a+b = 0{,}8$) |

> [!warning] Pozor
> Součet $a+b$ neudává velikost produkce, ale **elasticitu vůči škálování vstupů**. Speciálně **ryzí Cobb-Douglas** $Q = AL^a K^{1-a}$ má $b = 1-a$, tedy vždy **konstantní výnosy z rozsahu**.

### Parametr efektivity $A$

Konstanta $A$ v (5.7) proporcionálně ovlivňuje úroveň produkce $Q$ při pevně zadaných $L, K$, a lze ji proto chápat jako **parametr efektivity** — indikátor stavu technologie.

### Příklad 5.3

Produkční funkce $Q = 2L^{1/4} K^{3/4}$ má **konstantní** výnosy z rozsahu, neboť $\tfrac{1}{4} + \tfrac{3}{4} = 1$.

Změní-li se $L$ i $K$ čtyřnásobně, změní se $Q$ $4^{1/4 + 3/4} = 4^1$-krát:

$$
Q(4L, 4K) = 2(4L)^{1/4}(4K)^{3/4} = 2\cdot 4^{1/4+3/4} L^{1/4} K^{3/4} = 4\cdot 2L^{1/4}K^{3/4} = 4\,Q(L,K).
$$

### Homogenita

Funkce $Q(L, K)$ je **homogenní stupně $n$**, jestliže

$$
Q(rL, rK) = r^n\,Q(L, K), \tag{5.10}
$$

kde $n \geq 0$ je celé číslo a $r > 0$. Homogenní funkce stupně $1$ se nazývají **lineárně homogenní**. Cobb-Douglasovy funkce jsou homogenní stupně $a+b$.

## Ryzí Cobb-Douglas a CES

**Ryzí Cobb-Douglasovy funkce:**

$$
Q = A\,L^a\,K^{1-a}, \quad 0 < a < 1. \tag{5.9}
$$

Mají vždy **konstantní výnosy z rozsahu** a jsou **lineárně homogenní**.

**CES produkční funkce** (*Constant Elasticity of Substitution*, 1961):

$$
Q = A\left[(1-a)\,L^{-b} + a\,K^{-b}\right]^{-\tfrac{1}{b}},
$$

kde $A > 0$, $0 < a < 1$, $-1 < b \neq 0$. Cobb-Douglasovy funkce jsou jejich zvláštním případem.

**Další typy:**

- **Lineární:** $Q(L, K) = aL + bK$ — dokonalé substituty.
- **Leontiefova:** $Q(L, K) = \min(aL, bK)$ — dokonalé komplementy (fixní proporce).

## Mezní produkty $MP_L$, $MP_K$ a totální diferenciál

**Mezní produkt práce:**

$$
MP_L = Q'_L = \frac{\partial Q}{\partial L}.
$$

**Mezní produkt kapitálu:**

$$
MP_K = Q'_K = \frac{\partial Q}{\partial K}.
$$

$MP_L(a, b)$ udává rychlost změny produkce vzhledem k práci v bodě $[a, b]$ (na hladině $K = b$), resp. přibližnou změnu produkce při jednotkové změně $L$. Analogicky $MP_K(a, b)$.

> [!info] Intuice
> - $MP_L$: *„o kolik vzroste $Q$, když přidám jednu jednotku práce (a kapitál držím pevně)?"*
> - $MP_K$: *„o kolik vzroste $Q$, když přidám jednu jednotku kapitálu (a práci držím pevně)?"*

**Totální diferenciál** — přibližná změna produkce při změně práce o $dL$ a kapitálu o $dK$:

$$
\Delta Q \approx dQ = Q'_L\,dL + Q'_K\,dK = MP_L\,dL + MP_K\,dK. \tag{5.11}
$$

Skutečná změna: $\Delta Q = Q(L+dL, K+dK) - Q(L, K)$.

**Zákon klesajících výnosů** platí ve 2F modelu pro oba vstupy: pro pevné $K_0$ se od jistého $L$ stane $MP_L$ klesající ($Q''_{LL} < 0$); analogicky $Q''_{KK} < 0$ pro pevné $L_0$.

## Eulerova věta pro homogenní funkce

**Eulerova věta** (úloha 5.10): pro homogenní funkci $Q(L, K)$ stupně $n$ platí

$$
L\,Q'_L + K\,Q'_K = n\,Q(L, K). \tag{5.12}
$$

**Speciální případ $n = 1$** (konstantní výnosy z rozsahu):

$$
L\cdot MP_L + K\cdot MP_K = Q(L, K).
$$

Slovně — **v případě konstantních výnosů z rozsahu se součet součinů počtu jednotek vstupů (práce a kapitálu) a jejich mezních produktů rovná výstupu** (důchodové pravidlo: celkový produkt je přesně rozdělen mezi vstupy podle jejich mezních produktů).

## Izokvanty

**Izokvanty** (*isoquants*) jsou křivky stejné produkce — množina dvojic $[L, K]$, pro něž produkční funkce nabývá pevně zvolené hodnoty $q$:

$$
Q(L, K) = q. \tag{5.13}
$$

Jsou to **indiferenční křivky** produkční funkce (analogie s indiferenčními křivkami u [[uzitecnost|užitečnosti]]).

**Vlastnosti izokvant Cobb-Douglasových funkcí:**

- **klesající** — pokles kapitálu vyžaduje kompenzující růst práce k udržení produkce;
- **konvexní** (úloha 5.14);
- **neprotínají se**;
- s rostoucím $q$ se **vzdalují od počátku**.

*Obrázek 5.4 — izokvanty Cobb-Douglasovy funkce v rovině $(L, K)$: tři klesající konvexní křivky pro $q_1 < q_0 < q_2$.*

## Mezní míra technické substituce ($MRTS$)

**Mezní míra technické substituce** (*marginal rate of technical substitution*) je podíl mezních produktů:

$$
MRTS = MRTS(L, K) = \frac{MP_L}{MP_K} = \frac{Q'_L}{Q'_K}. \tag{5.14}
$$

**Interpretace:** $MRTS(L, K)$ udává, **o kolik se musí přibližně změnit kapitál $K$, jestliže se práce $L$ změní o jednotku, aby byla zachována produkce** (pohyb po izokvantě).

> [!info] Intuice
> $MRTS$ říká: *„jednu jednotku práce musím nahradit přibližně $MRTS$ jednotkami kapitálu, aby produkce $Q$ zůstala stejná."* Je to **směnný kurz mezi vstupy** při zachování produkce — přesná analogie [[uzitecnost|MRCS z teorie užitečnosti]], kde nahrazujeme spotřební statky při zachování užitku.

![[imek-izokvanty-mrts.jpeg|Izokvanty produkční funkce se sklonem tečny = -MRTS]]

**Geometrická interpretace:** sklon tečny k izokvantě v bodě $[L_0, K_0]$ je $-MRTS$. Z derivace implicitní funkce (při $Q(L,K) = q_0$):

$$
\frac{dK}{dL} = -\frac{Q'_L}{Q'_K} = -MRTS.
$$

Změní-li se práce o $dL$, lze pro odhad změny kapitálu $\Delta K$ k udržení produkce použít diferenciál:

$$
\Delta K \approx dK = -MRTS\,dL, \tag{5.15}
$$

$$
dL = \frac{-1}{MRTS}\,dK. \tag{5.16}
$$

> [!tip] Postup — jak spočítat $MRTS$
> 1. Vypočtěte parciální derivace $Q'_L$ a $Q'_K$.
> 2. Dosaďte do $MRTS = Q'_L / Q'_K$ (zlomek zjednodušte).
> 3. Případně dosaďte konkrétní $[L_0, K_0]$.
> 4. Pro odhad substituce použijte $\Delta K \approx -MRTS \cdot \Delta L$ (znaménko **mínus** — substituce, ne doplnění).

*Obrázek 5.7 — izokvanta $q_0 = Q(L,K)$ s tečnou $t$ v bodě $[L_0, K_0]$; $\Delta K$ odhadnut diferenciálem (záporně vzatý sklon tečny).*

## Příklady (dvoufaktorový model)

### Příklad 5.4

Je dána produkce $Q = 15 L^{1/2} K^{1/3}$, $L = 20$, $K = 100$.

**(a) Rychlost změny produkce vzhledem k práci.**

$$
MP_L = Q'_L = \tfrac{15}{2} L^{-1/2} K^{1/3}, \quad MP_L(20, 100) = \tfrac{15}{2}\cdot \tfrac{1}{\sqrt{20}}\cdot \sqrt[3]{100} \approx 7{,}153.
$$

Přibližná změna při $L: 20 \to 21$ (při $K = 100$): $\Delta Q \approx 7{,}153$. Skutečně $\Delta Q \approx 26{,}888$ (dle knihy; zaokrouhlení v konkrétním výpočtu).

**(b) Pokles kapitálu o 1** (z 100 na 99).

$$
MP_K = Q'_K = 5 L^{1/2} K^{-2/3}, \quad MP_K(20, 100) = 5\sqrt{20}\cdot \tfrac{1}{\sqrt[3]{10000}} \approx 4{,}525.
$$

Produkce poklesne přibližně o 4,525 (z $\approx 905{,}126$ na $\approx 900{,}601$).

**(c) Změna $L: 20 \to 15$ a $K: 100 \to 150$** (tj. $dL = -5$, $dK = 50$).

$$
dQ = MP_L(20,100)\cdot(-5) + MP_K(20,100)\cdot 50 = 7{,}153\cdot(-5) + 4{,}525\cdot 50 \approx 190{,}485.
$$

Produkce vzroste přibližně z 905,126 na 995,611.

### Příklad 5.5

Pro produkci $Q(L, K) = \sqrt[3]{L}\sqrt{K}$ mají izokvanty rovnici $\sqrt[3]{L}\sqrt{K} = q$.

Umocněním na druhou: $K = q^2 / \sqrt[3]{L^2}$.

- $q = 1 \Rightarrow K = 1/\sqrt[3]{L^2}$
- $q = 2 \Rightarrow K = 4/\sqrt[3]{L^2}$
- $q = 3 \Rightarrow K = 9/\sqrt[3]{L^2}$

*Obrázek 5.5 — tři klesající konvexní izokvanty v rovině $(L, K)$ pro $q = 1, 2, 3$.*

### Příklad 5.6

Je dána produkce $Q = 2L + \sqrt{K}$.

$$
MP_L = 2, \qquad MP_K = \frac{1}{2\sqrt{K}}.
$$

$$
MRTS = \frac{MP_L}{MP_K} = \frac{2}{\tfrac{1}{2\sqrt{K}}} = 4\sqrt{K}.
$$

Například $MRTS(4, 7) = 4\sqrt{7} \approx 10{,}58$. Klesne-li práce z 4 na 3, je k udržení produkce $Q(4,7) = 8 + \sqrt{7} \approx 10{,}646$ třeba zvýšit kapitál přibližně o $4\sqrt{7}$.

Pokud se práce naopak zvýší ze 4 na 6 ($dL = 2$), k udržení produkce stačí snížit kapitál o

$$
dK = -MRTS(4,7)\cdot 2 = -8\sqrt{7} \approx -21{,}17.
$$

## Shrnutí kapitoly 5

Hlavními faktory produkce jsou **práce**, **kapitál** a **půda**; půda je standardní exogenní proměnná. Přicházejí proto v úvahu **jednofaktorový** (pouze práce) a **dvoufaktorový** (práce + kapitál) model.

V **1F modelu** se definuje **mezní produkt práce** (derivace produkce podle práce) a **průměrný produkt práce** (podíl produkce a práce). Produkční funkce má typický tvar díky **zákonu klesajících výnosů**: $MP_L$ nejprve roste, od inflexního bodu $L_0$ klesá a v bodě $L_1$ dosahuje nuly (maximum produkce). Platí **princip maximalizace $AP_L$**: v bodě maxima $AP_L$ se $MP_L = AP_L$.

Ve **2F modelu** se obvykle používají **Cobb-Douglasovy funkce** $Q = AL^a K^b$, které reflektují proporcionalitu změn vstupů a výstupu. Podle $a+b$ rozlišujeme **konstantní, rostoucí, klesající výnosy z rozsahu**. Mezní produkty $MP_L, MP_K$ jsou parciální derivace, totální diferenciál dává přibližnou změnu produkce. **Izokvanty** jsou indiferenční křivky produkční funkce. Podíl $MP_L/MP_K$ je **mezní míra technické substituce ($MRTS$)** — udává, o kolik se musí změnit kapitál při jednotkové změně práce pro zachování produkce.

## Otázky k sebehodnocení

1. Jaké jsou faktory produkce?
2. Jak se dospěje k jednofaktorovému a dvoufaktorovému modelu produkce?
3. Jak je zadána produkční funkce u jednofaktorového modelu?
4. Co udává mezní produkt práce?
5. Co musí respektovat průběh křivky produkce?
6. Jak lze matematicky vyjádřit zákon klesajících výnosů?
7. Jaký základní ekonomický požadavek respektují Cobb-Douglasovy funkce?
8. Jak se vypočtou mezní produkty práce a kapitálu?
9. Jak se stanoví přibližná změna produkce v závislosti na změnách práce a kapitálu?
10. Co vyjadřují izokvanty? Jaké jsou jejich typické vlastnosti?
11. Jak se vypočte mezní míra technické substituce a co vyjadřuje?

## Úlohy 5.1–5.17

### Jednofaktorový model

**5.1** Je dána produkce $Q = 10\sqrt{L}$. (a) Vypočtěte $Q(1)$, $Q(4)$, $Q(9)$. (b) Rozhodněte, kdy produkce roste, resp. klesá. (c) Rozhodněte, kdy je křivka produkce konvexní, resp. konkávní. (d) Načrtněte křivku produkce.

**5.2** Je dána produkce $Q = -0{,}1 L^{3} + 9 L^{2}$. (a) Rozhodněte, kdy produkce roste, resp. klesá. (b) Rozhodněte, kdy je křivka produkce konvexní, resp. konkávní. (c) Určete $L$ (počet pracovníků), které maximalizuje produkci a stanovte příslušné maximum produkce. (d) Načrtněte křivku produkce. (e) Najděte mezní produkt práce $MP_L$. (f) Vypočtěte $MP_L(10)$ a ekonomicky interpretujte. (g) Určete přibližnou změnu produkce v důsledku zvýšení počtu pracovníků z $10$ na $13$ a porovnejte se skutečnou změnou produkce.

**5.3** Pro zadanou produkci ověřte platnost zákona klesajících výnosů a charakterizujte vlastnosti mezního produktu práce:
(a) $Q = 500\sqrt{L}$.
(b) $Q = 300\sqrt{L} - 4L$.
(c) $Q = 50L - 0{,}01 L^{2}$.
(d) $Q = -0{,}3 L^{3} + 9 L^{2}$.

**5.4** Dokažte, že má-li průměrný produkt práce $AP_L$ v bodě $L_0$ maximum, pak platí $AP_L(L_0) = MP_L(L_0)$.

**5.5** Je dána produkce $Q = -0{,}2 L^{3} + 12 L^{2}$, kde $L$ je počet pracovníků. (a) Určete počet pracovníků, při kterém je dosaženo nejvyšší produktivity práce (= maximálního průměrného produktu práce $AP_L$) a stanovte, kolik jednotek produkce připadá na jednoho pracovníka. (b) Určete počet pracovníků s využitím principu maximalizace průměrného produktu práce. (c) Ověřte platnost principu maximalizujícího produkci a stanovte příslušné maximum produkce. (d) Porovnejte počet pracovníků v případech (a), (c). (e) Graficky interpretujte získané výsledky.

### Dvoufaktorový model

**5.6** Pro zadanou produkci rozhodněte, jaké výnosy z rozsahu představují:
(a) $Q = 7 L K^{2}$.
(b) $Q = 50 L^{2/3} K^{1/3}$.
(c) $Q = 18 L^{3/5} K^{2/5}$.

**5.7** Je dána produkce $Q = 10 L^{1/2} K^{1/2}$. (a) Vypočtěte produkci pro $L = 400$, $K = 17576$. (b) Rozhodněte o tom, jaké výnosy z rozsahu představuje a vyložte, jak se změní produkce, jestliže se vstupy $L, K$ zdvojnásobí.

**5.8** V jedné empirické studii (40. léta 20. století) ze sektoru manufaktur odhadli Cobb a Douglas produkci ze zjištěných údajů ve tvaru $Q = 1{,}01 L^{0{,}75} K^{0{,}25}$. (a) Vypočtěte produkci pro $L = 250$, $K = 1000$. (b) Vypočtěte $MP_L(250, 1000)$ a výsledek ekonomicky interpretujte. (c) Vypočtěte $MP_K(250, 1000)$ a výsledek ekonomicky interpretujte. (d) Odhadněte změnu produkce v důsledku zvýšení $L$ na $260$ a současném poklesu $K$ na $900$ vzhledem k hladině dle (a) a porovnejte se skutečnou změnou produkce.

**5.9** Ověřte platnost zákona klesajících výnosů pro produkci $Q = 10 L^{0{,}3} K^{0{,}5}$.

**5.10** Dokažte, že pro homogenní funkci $Q(L, K)$ stupně $n$ platí $L Q'_L + K Q'_K = n Q(L, K)$ (*Eulerova věta*).

**5.11** Ověřte platnost Eulerovy věty (úloha 5.10) pro Cobb-Douglasovu produkční funkci.

**5.12** Je dána produkce $Q = L^{1/3} K^{1/4}$. (a) Najděte rovnici izokvant. (b) Najděte rovnici izokvant pro produkci $q_0 = 1$, $q_1 = 2$, $q_2 = 3$. (c) Načrtněte izokvanty.

**5.13** Je dána produkce $Q = L^{1/3} K^{1/2}$. Rozhodněte, které ze zadaných bodů leží na téže izokvantě a v kladném případě stanovte, jaká produkce je na příslušné izokvantě dosažena (užijte kalkulátoru): $A_1[1; 1]$, $A_2[1; 8]$, $A_3[1; 27]$, $A_4[2; 0{,}353]$, $A_5[2; 2{,}828]$, $A_6[2; 9{,}545]$, $A_7[1{,}5; 0{,}544]$, $A_8[1{,}5; 14{,}696]$, $A_9[2; 5]$.

**5.14** Dokažte, že izokvanty Cobb-Douglasovy produkční funkce jsou klesající a konvexní.

**5.15** Produkce firmy je dána vztahem $Q = 2 L^{0{,}5} K^{0{,}25}$. (a) Vypočtěte produkci, mezní produkt práce a mezní produkt kapitálu, zaměstnává-li firma $100$ pracovníků a disponuje-li $81$ jednotkami kapitálu. (b) Určete mezní míru technické substituce $MRTS$. (c) Vypočtěte $MRTS$ na hladině dle (a) a výsledek ekonomicky interpretujte. (d) Odhadněte změnu kapitálu potřebné k udržení produkce na hladině dle (a), jestliže počet pracovníků poklesne na $95$.

**5.16** Je dána produkce $Q = K^{2} + 2 L^{2}$. (a) Určete $MRTS$. (b) Odhadněte změnu práce potřebné k udržení produkce, která je realizována $50$ pracovníky a $90$ jednotkami kapitálu, jestliže se kapitál sníží na $80$ jednotek.

**5.17** Odvoďte, že pro Cobb-Douglasovu produkční funkci $Q = A L^{a} K^{b}$ platí $MRTS = \tfrac{a}{b}\cdot \tfrac{K}{L}$.

## Klíčové pojmy

- **Faktory (vstupy) produkce:** práce $L$, kapitál $K$, půda.
- **Jednofaktorový model** — $Q = Q(L)$.
- **Produkční funkce** (*production function*) a **křivka produkce**.
- **Mezní produkt práce** $MP_L = dQ/dL = Q'(L)$.
- **Průměrný produkt práce** $AP_L = Q/L$.
- **Zákon klesajících mezních výnosů** — od určitého $L_0$ platí $Q''(L) < 0$.
- **Inflexní bod** $L_0$ — přechod z konvexity do konkavity.
- **Bod maxima produkce** $L_1$ — $MP_L(L_1) = 0$.
- **Princip maximalizace $AP_L$** — v bodě maxima $AP_L$ platí $MP_L = AP_L$.
- **Polynomiální produkční funkce** $Q(L) = aL^3 + bL^2$, $a < 0$, $b > 0$.
- **Diferenciál produkce** $\Delta Q \approx dQ = MP_L\,dL$.
- **Dvoufaktorový model** — $Q = Q(L, K)$.
- **Cobb-Douglasova produkční funkce** — $Q = AL^a K^b$.
- **Ryzí Cobb-Douglas** — $Q = AL^a K^{1-a}$ (konstantní výnosy).
- **CES produkční funkce** — $Q = A[(1-a)L^{-b} + aK^{-b}]^{-1/b}$.
- **Lineární** ($aL + bK$) a **Leontiefova** ($\min(aL, bK)$) produkční funkce.
- **Homogenita stupně $n$** — $Q(rL, rK) = r^n Q(L, K)$.
- **Parametr efektivity $A$** — indikátor stavu technologie.
- **Výnosy z rozsahu** — konstantní ($a+b=1$), rostoucí ($a+b>1$), klesající ($a+b<1$).
- **Mezní produkt práce** $MP_L = Q'_L$, **kapitálu** $MP_K = Q'_K$.
- **Totální diferenciál** $dQ = MP_L\,dL + MP_K\,dK$.
- **Eulerova věta** — $L Q'_L + K Q'_K = n\,Q(L,K)$.
- **Izokvanta** — křivka $Q(L, K) = q$.
- **Mezní míra technické substituce** $MRTS = MP_L/MP_K$.
- **Substituční vztah** $\Delta K \approx -MRTS\,dL$.

## Navigace

- **Související témata:** [[funkce-vice-promennych|Funkce více proměnných]] (parciální derivace, totální diferenciál), [[derivace|Derivace]], [[lagrangeova-metoda|Lagrangeova metoda]] (optimalizace produkce s rozpočtovým omezením), [[uzitecnost|Užitečnost]] (paralela: izokvanty ↔ indiferenční křivky, $MRTS$ ↔ $MRCS$), [[prijem-naklady-zisk|Příjem, náklady, zisk]] (analogie principu max $AP_L$ ↔ min $AC$).
- **Předchozí:** [[elasticita|Elasticita]].
- **Přednáška:** [[imek-blok-02|KS 2. blok]].
- **Kurz:** [[imek|Matematická ekonomie]].
