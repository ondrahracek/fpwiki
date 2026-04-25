---
title: Přebytek spotřebitele a výrobce
course: imek
type: topic
tags: [imek, prebytek, cs, ps, integral, poptavka-nabidka, spotrebitel, vyrobce]
sources: [raw/imek/kniha_scanned/, raw/imek/KS_prvni_blok.pdf]
created: 2026-04-22
updated: '2026-04-25'
---

# Přebytek spotřebitele a výrobce

> [!abstract] TL;DR
> **Přebytek spotřebitele** ($CS$) je rozdíl mezi tím, co byl spotřebitel ochoten zaplatit, a tím, co skutečně zaplatil. **Přebytek výrobce** ($PS$) je rozdíl mezi tím, co výrobce dostal, a minimální cenou, za kterou by byl ochoten prodávat. Geometricky jsou to plochy mezi křivkou poptávky / nabídky a rovnovážnou cenou; početně určité integrály. Součet $CS + PS$ měří **celkový blahobyt trhu**.

**Přebytek spotřebitele** (*consumer surplus*, $CS$) a **přebytek výrobce** (*producer surplus*, $PS$) kvantifikují čistý prospěch jednotlivých stran trhu. Navazují na pojmy [[poptavka-nabidka|tržní rovnováhy]] a využívají aparát [[integral|integrálního počtu]].

---

## Úvod

Je dána funkce poptávky $P = D(Q)$, resp. funkce nabídky $P = S(Q)$. Pro pevně zadané množství $Q_0$ je odpovídající cena $P_0 = D(Q_0)$ (resp. $P_0 = S(Q_0)$). Součin $P_0 \, Q_0$ reprezentuje buď **výdaje spotřebitele**, nebo **tržby výrobce** a geometricky odpovídá obsahu obdélníka $0\,Q_0\,A\,P_0$ v rovině $(Q, P)$, kde $A = [Q_0, P_0]$.

> [!info] Intuice
> - Za jednotky zboží nakoupené **před** posledním kusem je spotřebitel podle funkce poptávky ochoten platit *více* než $P_0$ — rozdíl si „šetří do kapsy" jako přebytek.
> - Za jednotky zboží prodané **před** posledním kusem by výrobce podle funkce nabídky byl ochoten prodávat i za *nižší* cenu než $P_0$ — rozdíl je jeho přebytek.
>
> Přebytek je tedy rozdíl mezi *ochotou* (platit / prodávat) a *skutečností* (zaplaceno / obdrženo).

![[imek-prebytky-cs-ps.jpeg|přebytek spotřebitele (CS) a přebytek výrobce (PS) kolem rovnovážné ceny]]

---

## Přebytek spotřebitele ($CS$)

### Definice (vzorec 2.14)

Pro poptávku $P = D(Q)$ a pevně zadané $Q_0$ s cenou $P_0 = D(Q_0)$:

$$
CS(Q_0) = \int_0^{Q_0} D(Q)\,dQ - P_0\,Q_0. \tag{2.14}
$$

### Geometrická interpretace

- $\displaystyle \int_0^{Q_0} D(Q)\,dQ$ — plocha pod křivkou poptávky v intervalu $[0, Q_0]$; představuje celkovou **ochotu platit** (maximální částku, kterou by spotřebitel za $Q_0$ jednotek byl ochoten zaplatit).
- $P_0\,Q_0$ — skutečně zaplacená částka (obdélník $0\,Q_0\,A\,P_0$).
- $CS$ je plocha mezi křivkou poptávky a vodorovnou přímkou $P = P_0$ v pásu $[0, Q_0]$ — „křivočarý trojúhelník" $P_0\,B\,A$, kde $B = [0, D(0)]$ a $A = [Q_0, P_0]$.

*Obrázek 2.24: Křivka poptávky $D$, bod $A = [Q_0, P_0]$, vyšrafovaná plocha trojúhelníku $P_0\,B\,A$ představuje $CS$.*

---

## Přebytek výrobce ($PS$)

### Definice (vzorec 2.15)

Analogicky — pro nabídku $P = S(Q)$ a pevně zadané $Q_0$ s cenou $P_0 = S(Q_0)$:

$$
PS(Q_0) = P_0\,Q_0 - \int_0^{Q_0} S(Q)\,dQ. \tag{2.15}
$$

### Geometrická interpretace

- $P_0\,Q_0$ — **tržba** výrobce za prodané množství $Q_0$.
- $\displaystyle \int_0^{Q_0} S(Q)\,dQ$ — plocha pod křivkou nabídky; minimální částka, za kterou by byl výrobce ochoten $Q_0$ jednotek dodat (souvisí s mezními náklady).
- $PS$ je plocha mezi vodorovnou přímkou $P = P_0$ a křivkou nabídky v pásu $[0, Q_0]$.

*Obrázek 2.25: Přebytek výrobce (plocha mezi rovnovážnou cenou a křivkou nabídky) a přebytek spotřebitele (plocha mezi křivkou poptávky a rovnovážnou cenou) v rovnovážném bodě.*

---

> [!tip] Postup výpočtu CS a PS
> 1. Zjisti (nebo si zvol) množství $Q_0$ a odpovídající cenu $P_0 = D(Q_0)$ resp. $P_0 = S(Q_0)$. V rovnováze platí $D(Q^E) = S(Q^E) = P^E$.
> 2. Spočti určitý integrál $\int_0^{Q_0} D(Q)\,dQ$ (pro $CS$) nebo $\int_0^{Q_0} S(Q)\,dQ$ (pro $PS$).
> 3. Sestav obdélník $P_0 \cdot Q_0$.
> 4. Dosaď:
>     - $CS = \int_0^{Q_0} D(Q)\,dQ - P_0 Q_0$ (integrál **mínus** obdélník)
>     - $PS = P_0 Q_0 - \int_0^{Q_0} S(Q)\,dQ$ (obdélník **mínus** integrál)
> 5. Kontrola znaménka: obě hodnoty musí být **kladné**. Pokud vyjde záporná, máš prohozené pořadí.

---

## Příklady

### Příklad 2.11 — komparativní statika pro rovnovážné množství

> [!example] Zadání
> Jsou dány poptávka $P = aQ + b$ a nabídka $P = cQ + d$ s hodnotami $a = -3$, $b = 40$, $c = 0{,}5$, $d = 10$.
> Rovnovážné množství:
> $$Q^E = \frac{b - d}{c - a} = \frac{40 - 10}{0{,}5 - (-3)} = \frac{30}{3{,}5} \doteq 8{,}571.$$
> Zjistěte změnu $Q^E$ (a) při změně samotného parametru $c$, (b) při současné změně všech čtyř parametrů.

**Řešení (a) — změna $c$ z $0{,}5$ na $0{,}6$, ceteris paribus.**

Pomocí vzorce (2.13) pro $\dfrac{\partial Q^E}{\partial c} = -\dfrac{b-d}{(c-a)^2}$, resp. ekvivalentně $-\dfrac{Q^E}{c-a}$:

$$
dQ^E = -\frac{Q^E}{c - a}\,dc = -\frac{8{,}571}{3{,}5}\cdot 0{,}1 \doteq -0{,}245.
$$

Nové rovnovážné množství:

$$
Q_1^E \approx 8{,}571 - 0{,}245 = 8{,}326.
$$

**Řešení (b) — současná změna všech parametrů:** $a: -3 \to -2{,}5$, $b: 40 \to 35$, $c: 0{,}5 \to 0{,}6$, $d: 10 \to 11$, tedy $da = 0{,}5$, $db = -5$, $dc = 0{,}1$, $dd = 1$.

Totální diferenciál $Q^E(a, b, c, d) = \dfrac{b - d}{c - a}$ podle (2.11) a (2.12):

$$
dQ^E = \frac{b-d}{(c-a)^2}\,da + \frac{1}{c-a}\,db - \frac{b-d}{(c-a)^2}\,dc - \frac{1}{c-a}\,dd.
$$

Dosazením číselných hodnot ($c - a = 3{,}5$, $(c-a)^2 = 12{,}25$, $b - d = 30$):

$$
dQ^E \approx \tfrac{30}{12{,}25}(0{,}5) + \tfrac{1}{3{,}5}(-5) - \tfrac{30}{12{,}25}(0{,}1) - \tfrac{1}{3{,}5}(1) \doteq 1{,}224 - 1{,}429 - 0{,}245 - 0{,}286 \doteq -0{,}735.
$$

Tedy $Q_1^E \approx 8{,}571 - 0{,}735 \doteq 7{,}836$.

> [!warning] Pozn. k přepisu učebnice
> V původním skenu přednášky byla u části (b) uvedena hodnota $\Delta Q \approx -2{,}69$, což neodpovídá součtu dílčích derivací při daných přírůstcích. Podle vlastního přepočtu vychází $dQ^E \doteq -0{,}735$. Totální diferenciál je navíc pouze **lineární aproximací**; přesná změna zjištěná ze změněného vzorce
> $$Q_1^E = \frac{b' - d'}{c' - a'} = \frac{35 - 11}{0{,}6 - (-2{,}5)} = \frac{24}{3{,}1} \doteq 7{,}742$$
> dává skutečnou změnu $\Delta Q \doteq -0{,}829$ — dobře konzistentní s diferenciálem. Hodnota $-2{,}69$ je tedy pravděpodobně chyba v zápisu.

*Příklad 2.11 je primárně o multiplikátorech pro $Q$, ale kniha ho zařazuje před výklad přebytků jako přechod ke komparativní statice před aplikací na CS/PS. Princip redukovaného tvaru lze uplatnit na libovolné ekonomické proměnné — v kap. 7 např. pro makroekonomii.*

### Příklad 2.13 — numerický výpočet $PS$

> [!example] Zadání
> Pro nabídku $P = S(Q) = 10 + 2Q$ a množství $Q_0 = 10$ vypočítejte přebytek výrobce.

**Řešení.**

Odpovídající cena:

$$
P_0 = S(10) = 10 + 2\cdot 10 = 30.
$$

Dle vzorce (2.15):

$$
PS(10) = P_0 Q_0 - \int_0^{10}(10 + 2Q)\,dQ = 10 \cdot 30 - \Big[10Q + Q^2\Big]_0^{10} = 300 - (100 + 100) = 100.
$$

Přebytek výrobce při množství $Q_0 = 10$ je tedy $PS = 100$ (peněžních jednotek).

---

## Cheat sheet

| Veličina | Vzorec | Geometrie |
|---|---|---|
| $CS(Q_0)$ | $\displaystyle \int_0^{Q_0} D(Q)\,dQ - P_0 Q_0$ | plocha **pod** křivkou poptávky, **nad** čárou $P = P_0$ |
| $PS(Q_0)$ | $\displaystyle P_0 Q_0 - \int_0^{Q_0} S(Q)\,dQ$ | plocha **nad** křivkou nabídky, **pod** čárou $P = P_0$ |
| Výdaje / tržby | $P_0 \cdot Q_0$ | obdélník $0\,Q_0\,A\,P_0$ |
| Celkový přebytek | $CS + PS$ | součet obou ploch v rovnováze |

---

## Klíčové pojmy

- **Přebytek spotřebitele** ($CS$, *consumer surplus*) — rozdíl mezi ochotou platit a skutečnou platbou, vzorec (2.14).
- **Přebytek výrobce** ($PS$, *producer surplus*) — rozdíl mezi tržbou a minimální cenou dle nabídky, vzorec (2.15).
- **Ochota platit** — $\displaystyle \int_0^{Q_0} D(Q)\,dQ$.
- **Minimální cena výrobce** — $\displaystyle \int_0^{Q_0} S(Q)\,dQ$.
- **Výdaje spotřebitele / tržby výrobce** — $P_0\,Q_0$ (obdélník $0\,Q_0\,A\,P_0$).
- **Celkový přebytek trhu** — součet $CS + PS$ v rovnovážném bodě.
- **Geometrická interpretace** — plochy ohraničené křivkami $D$, $S$ a přímkou $P = P_0$.

---

## Dopad daně na přebytky a mrtvá ztráta

Uvalení jednotkové daně $T$ na trh posouvá rovnovážné množství pod $Q^E$ a rozkládá původní plochu přebytků na nové části.

![[imek-prebytky-s-dani-deadweight.jpeg|Dopad daně na přebytky: zmenšené CS a PS, daňový příjem (obdélník), mrtvá ztráta (DWL trojúhelník)]]

Přebytek spotřebitele $CS$ se zmenší (spotřebitelé platí víc a nakupují méně), přebytek výrobce $PS$ se rovněž zmenší (výrobci obdrží po odvodu méně). Stát získává **daňový příjem** (obdélník $T \cdot Q_1^E$). Zbývající část původních přebytků — **mrtvá ztráta** (*deadweight loss*, DWL) — je čistým úbytkem blahobytu, který nikdo neinkasuje, a je důsledkem transakcí, které se kvůli dani vůbec neuskuteční. Detailní rozbor viz [[zdaneni-trhu|Zdanění trhu]].

---

## Navigace

- **Nadřazené téma:** [[poptavka-nabidka|Poptávka, nabídka a tržní rovnováha]]
- **Matematický aparát:** [[integral|Integrál]] (určitý integrál, plocha pod křivkou), [[derivace|Derivace]] (monotonie křivek)
- **Související:** [[prijem-naklady-zisk|Příjem, náklady, zisk]]
- **Shrnutí přednášek:** [[imek-blok-01|KS — 1. blok]]
- **Kurz:** [[imek|Matematická ekonomie]]
