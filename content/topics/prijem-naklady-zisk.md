---
title: Příjem, náklady, zisk a nabídka firmy
course: imek
type: topic
tags: [imek, prijem, naklady, zisk, body-zvratu, maximalizace-zisku, nabidka-firmy]
sources: [raw/imek/kniha_scanned/, raw/imek/KS_prvni_blok.pdf]
created: 2026-04-22
updated: '2026-04-25'
---

# Příjem, náklady, zisk a nabídka firmy

> [!abstract] TL;DR
> **Příjem** $TR$ je to, co firma inkasuje (cena krát množství), **náklady** $TC$ to, co vynaloží (fixní plus variabilní), a **zisk** $PR = TR - TC$ jejich rozdíl. Kapitola pro každou ze tří veličin zavádí celkovou, průměrnou a mezní podobu, ukáže jejich grafický průběh (pro lineární poptávku a kubické náklady) a odvodí tři klíčové optimalizační principy: $AC = MC$ v minimu průměrných nákladů, $AVC = MC$ v minimu průměrných variabilních nákladů a $MR = MC$ v maximu zisku. Na závěr se sestaví **funkce nabídky firmy** jako rostoucí část křivky $MC$ nad bodem minima $AVC$.

## Úvod

Kapitola 3 se zabývá dvěma základními veličinami popisujícími ekonomickou aktivitu firmy — **příjmem** (revenue) a **náklady** (cost) — v jejich třech standardních podobách: celkové, průměrné a mezní. Navazuje analýzou **zisku**, **bodů zvratu**, **maximalizace zisku** a konstrukcí **nabídkové křivky firmy**. Klíčovými matematickými nástroji jsou [[derivace|derivace]] (pro mezní veličiny) a diferenciál (pro odhad přírůstků); v několika úlohách se využívá také [[integral|integrál]] (pro zpětnou rekonstrukci $TR$ z $MR$ nebo $TC$ z $MC$).

**Cílové znalosti:**

- odvodit a interpretovat funkce $TR$, $AR$, $MR$ a $TC$, $FC$, $TVC$, $AFC$, $AVC$, $AC$, $MC$;
- porozumět vzájemným vztahům mezi průměrnou a mezní veličinou, zvláště pro lineární poptávku;
- pomocí diferenciálu odhadovat změny celkových veličin;
- osvojit si **princip minimalizace průměrných (variabilních) nákladů** — podmínku $AC(Q_0)=MC(Q_0)$, resp. $AVC(Q_0)=MC(Q_0)$;
- osvojit si **princip maximalizace zisku** — podmínku $MR(Q_0)=MC(Q_0)$;
- stanovit **body zvratu** a interval zisku;
- zkonstruovat **funkci nabídky firmy** na základě nákladových charakteristik.

## Příjem firmy

![[imek-ar-mr-dvojnasobny-sklon.jpeg|Pro lineární poptávku má MR dvojnásobný sklon oproti AR = D(Q); v Q, kde MR=0, dosahuje TR maxima]]

### Celkový příjem

Celkový příjem $TR$ (**total revenue**) je součin ceny a prodaného množství. Při poptávce $P = D(Q)$ platí

$$
TR = TR(Q) = P \cdot Q = D(Q) \cdot Q.
\tag{3.1}
$$

Graf funkce se nazývá **křivka celkového příjmu** (total revenue curve). Za předpokladu linearity poptávky, tj. $P = aQ + b$, je celkový příjem kvadratickou funkcí, neboť

$$
TR = Q(aQ + b) = aQ^2 + bQ,
$$

a křivka celkového příjmu je parabola tvaru obráceného $U$ (jelikož $a < 0$) procházející počátkem.

#### Příklad 3.1

**Zadání.** Pro poptávku $P = D(Q) = -2Q + 100$ určete $TR$ a charakterizujte jeho křivku.

**Řešení.** Celkový příjem je

$$
TR = TR(Q) = Q(-2Q + 100) = -2Q^2 + 100Q.
$$

Křivkou je parabola (obrázek 3.1) s nulami v $Q_1 = 0$ a $Q_2 = 50$. Maxima dosahuje při $Q = 25$ ve výši $TR_{\max} = -2 \cdot 625 + 100 \cdot 25 = 1\,250$.

*Obrázek 3.1: Parabola $TR = -2Q^2 + 100Q$ s nulami v $0$ a $50$ a maximem $1\,250$ v bodě $Q = 25$.*

### Průměrný příjem

**Průměrný příjem** $AR$ (**average revenue**) je podíl celkového příjmu a množství. Z (3.1) plyne

$$
AR = AR(Q) = \frac{TR(Q)}{Q} = \frac{Q \, D(Q)}{Q} = D(Q).
$$

> [!note] Klíčové pozorování
> **Průměrný příjem se vždy rovná poptávkové funkci**, $AR(Q) = D(Q)$.

### Mezní příjem

Pro zkoumání dynamiky změn celkového příjmu zavádíme **mezní příjem** $MR$ (**marginal revenue**), definovaný jako [[derivace|derivace]] celkového příjmu podle množství:

$$
MR = \frac{\mathrm{d}TR}{\mathrm{d}Q} = TR'(Q).
\tag{3.2}
$$

Mezní příjem udává **rychlost změny** celkového příjmu vzhledem k množství.

> [!info] Intuice — „kolik vyděláš za další kus"
> Hodnota $MR(Q^*)$ je přibližně to, o kolik se zvýší celkový příjem, prodá-li firma jednu další jednotku nad aktuální úroveň $Q^*$. Jinak řečeno: $MR(Q^*) \approx TR(Q^* + 1) - TR(Q^*)$.

#### Příklad 3.2

**Zadání.** Pro poptávku $P = D(Q) = 100 - 2Q$ určete $MR$ a interpretujte jeho hodnoty pro $Q = 15, 16, 20$.

**Řešení.** $TR = 100Q - 2Q^2$, tedy

$$
MR = (100Q - 2Q^2)' = 100 - 4Q.
$$

Pro $Q = 15$ je $MR(15) = 40$: při množství $15$ se $TR$ mění asi $40$-krát rychleji než množství; s růstem $Q$ o $1$ se $TR$ zvýší přibližně o $40$, tj. ze skutečné hodnoty $TR(15) = 1\,050$ na přibližně $1\,090$. Skutečná změna je

$$
\Delta TR = TR(16) - TR(15) = 1\,088 - 1\,050 = 38.
$$

Podobně $MR(16) = 36$, $MR(20) = 20$. $MR$ je klesající funkce — rychlost změny $TR$ s růstem množství klesá.

### Odhad změny TR pomocí diferenciálu

Užitím mezního příjmu lze odhadnout změnu celkového příjmu jako odezvu na změnu množství:

$$
\Delta TR \;\approx\; \mathrm{d}TR = (TR)' \, \mathrm{d}Q = MR \, \mathrm{d}Q,
\tag{3.3}
$$

schematicky:

$$
\text{změna celkového příjmu} \;\approx\; \text{mezní příjem} \times \text{změna množství}.
$$

Pro porovnání skutečná změna $TR$ je

$$
\Delta TR = TR(Q + \mathrm{d}Q) - TR(Q).
\tag{3.4}
$$

#### Příklad 3.3

**Zadání.** Pro $TR = 100Q - Q^2$ odhadněte změnu $TR$ při změně $Q$ z $60$ na $63$ a porovnejte se skutečnou změnou.

**Řešení.** $MR = 100 - 2Q$, tedy při $Q = 60$, $\mathrm{d}Q = 3$:

$$
\mathrm{d}TR = (100 - 120) \cdot 3 = -60.
$$

Celkový příjem klesne z $TR(60) = 2\,400$ přibližně na $2\,340$. Skutečná změna dle (3.4):

$$
\Delta TR = TR(63) - TR(60) = 2\,331 - 2\,400 = -69,
$$

tj. $TR$ klesne na $2\,331$.

### Vztah AR a MR pro lineární poptávku

Obecně pro lineární poptávku $P = aQ + b$ platí $TR = aQ^2 + bQ$, odtud

$$
MR = 2aQ + b.
$$

Křivky $MR$ a poptávky (resp. $AR$) jsou přímky protínající svislou osu v témže bodě $b$, přičemž **přímka mezního příjmu má sklon rovný dvojnásobku sklonu přímky poptávky** ($2a$ vs. $a$, obrázek 3.2). $MR$ nabývá jak kladných, tak záporných hodnot; křivka $TR$ nejprve roste, v bodě maxima protíná $MR$ osu $Q$ v bodě $Q = -\tfrac{b}{2a}$ hodnotou $MR = 0$, a dále $TR$ klesá.

V případě **[[poptavka-nabidka|dokonalé konkurence]]**, kdy poptávka $P = D(Q) = P^*$ je pevná tržní cena, platí $TR = Q \cdot P^*$ a tedy

$$
MR = AR = P^* \quad (\text{obrázek 3.4}).
$$

*Obrázek 3.2: Přímky $AR = aQ + b$ a $MR = 2aQ + b$ v jednom grafu; společný průsečík $b$ se svislou osou, $MR$ protíná osu $Q$ v $-\tfrac{b}{2a}$, $AR$ v $-\tfrac{b}{a}$.*

*Obrázek 3.3: Parabola $TR = aQ^2 + bQ$ s maximem v $Q = -\tfrac{b}{2a}$ a nulou v $Q = -\tfrac{b}{a}$.*

*Obrázek 3.4: Dokonalá konkurence — vodorovná přímka $AR = MR = P^*$.*

## Náklady firmy

### Celkové náklady

**Celkové náklady** $TC$ (**total cost**) jsou veškeré náklady na realizaci $Q$ jednotek produkce:

$$
TC = TC(Q) = FC + TVC(Q),
\tag{3.5}
$$

kde $FC$ jsou **fixní náklady** (**fixed cost**) a $TVC(Q)$ jsou **celkové variabilní náklady** (**total variable cost**). Celkové náklady jsou rostoucí, neboť růst množství objektivně vynutí jejich růst.

### Průměrné náklady

**Průměrné náklady** $AC$ (**average cost**) jsou podíl celkových nákladů a množství. Z (3.5):

$$
AC = AC(Q) = \frac{TC}{Q} = \frac{FC}{Q} + \frac{TVC(Q)}{Q},
\tag{3.6}
$$

kde $\tfrac{FC}{Q}$ jsou **průměrné fixní náklady** $AFC$ (**average fixed cost**) a $\tfrac{TVC(Q)}{Q}$ jsou **průměrné variabilní náklady** $AVC$ (**average variable cost**):

$$
AVC = AVC(Q) = \frac{TVC(Q)}{Q}.
\tag{3.7}
$$

#### Příklad 3.4

**Zadání.** Pro $FC = 1\,000$ a $TVC = 4Q$ určete $TC$ a $AC$ a jejich chování s rostoucím $Q$.

**Řešení.** $TC = 1\,000 + 4Q$ a $AC = \tfrac{1\,000}{Q} + 4$. S rostoucím $Q$ se $AC$ blíží $4$:

$$
\lim_{Q \to \infty} \left( \frac{1\,000}{Q} + 4 \right) = 4.
$$

$AFC = \tfrac{1\,000}{Q} \to 0$ s rostoucím $Q$.

*Obrázek 3.5: Přímka $TC = 1\,000 + 4Q$ protínající svislou osu ve výši $FC = 1\,000$.*

*Obrázek 3.6: Hyperbola $AC = \tfrac{1\,000}{Q} + 4$ s vodorovnou asymptotou $AC = 4$.*

Celkové variabilní náklady lze často vyjádřit ve tvaru

$$
TVC = Q \cdot VC(Q),
$$

kde $VC = VC(Q)$ jsou **variabilní náklady na jednotku množství**. Jsou-li konstantní, $TVC(Q) = aQ$ a nejjednodušší model nákladů má tvar

$$
TC = FC + aQ.
$$

Křivkou $TC$ je přímka se svislým průsečíkem $FC$ a sklonem $\tan\alpha = a$ (obrázek 3.7). Průměrné náklady tvoří hyperbolu $AC = \tfrac{FC}{Q} + a$ tvaru $L$ s vodorovnou asymptotou $a$ (obrázek 3.8). Limity $\lim_{Q \to 0^+} \tfrac{FC}{Q} = \infty$ a $\lim_{Q \to \infty} \tfrac{FC}{Q} = 0$ vysvětlují, proč s rostoucí produkcí fixní náklady stále méně ovlivňují $AC$.

*Obrázek 3.7: Přímka $TC$ s osovým průsečíkem ve výši $FC$ a se sklonem $\tan\alpha = a$.*

*Obrázek 3.8: Klesající hyperbola $AC$ s vodorovnou asymptotou ve výši $a$.*

### Mezní náklady

**Mezní náklady** $MC$ (**marginal cost**) jsou [[derivace|derivace]] celkových nákladů podle množství:

$$
MC = MC(Q) = \frac{\mathrm{d}TC}{\mathrm{d}Q} = TC'(Q).
\tag{3.8}
$$

> [!info] Intuice — „kolik stojí další kus"
> $MC(Q^*)$ udává přibližné náklady na výrobu jedné další jednotky, když firma aktuálně produkuje $Q^*$. Formálně $MC(Q^*) \approx TC(Q^* + 1) - TC(Q^*)$.

Analogicky ke vztahu (3.3) platí pro odhad změny $\Delta TC$:

$$
\Delta TC \;\approx\; \mathrm{d}TC = (TC)' \, \mathrm{d}Q = MC \, \mathrm{d}Q,
\tag{3.9}
$$

schematicky:

$$
\text{změna celkových nákladů} \;\approx\; \text{mezní náklady} \times \text{změna množství}.
$$

#### Příklad 3.5

**Zadání.** Pro $TC = 200 + 6Q + 2Q^2$ určete $MC$ a odhadněte změny $TC$ při změnách $Q$ z $15$ na $16$ a z $15$ na $12$.

**Řešení.** $MC = 6 + 4Q$. $MC(15) = 66$, $MC(20) = 86$: s růstem množství se rychlost změny $TC$ zvyšuje ($MC$ je rostoucí). Z $TC(15) = 740$ se po přírůstku $\mathrm{d}Q = 1$ předpokládá $TC \approx 806$. Skutečná změna $\Delta TC = TC(16) - TC(15) = 808 - 740 = 68$. Při poklesu $Q$ z $15$ na $12$ je $\Delta TC \approx 66 \cdot (-3) = -198$.

### Kubická nákladová funkce

V ekonomicky reálných situacích mají křivky nákladů charakteristické vazby a tvary.

#### Příklad 3.6

**Zadání.** Pro $TC = 100 + 25Q - 5Q^2 + Q^3$ odvoďte všechny nákladové charakteristiky.

**Řešení.**

$$
\begin{aligned}
FC &= 100, \\
TVC &= 25Q - 5Q^2 + Q^3, \\
AFC &= \tfrac{100}{Q}, \\
AVC &= 25 - 5Q + Q^2, \\
AC  &= \tfrac{100}{Q} + 25 - 5Q + Q^2, \\
MC  &= 25 - 10Q + 3Q^2.
\end{aligned}
$$

Význačné body $1{,}67$; $2{,}50$; $4{,}73$ odpovídají: $MC$ minimum v $Q \doteq 1{,}67$, $AVC$ minimum v $Q = 2{,}50$, $AC$ minimum v $Q \doteq 4{,}73$ (téma úlohy 3.11).

![[imek-ac-avc-mc.jpeg|AC, AVC, MC a jejich vzájemné vztahy]]

*Obrázek 3.9: Kubické křivky $TC$ a $TVC$ rostoucí od bodu $FC = 100$; $FC$ je vodorovná přímka.*

*Obrázek 3.10: Křivky $AC$, $AVC$, $MC$ ve tvaru $U$ a klesající hyperbola $AFC$. $MC$ protíná $AVC$ i $AC$ zdola v jejich minimech; význačné hodnoty na ose $Q$: $1{,}67$, $2{,}50$, $4{,}73$.*

**Standardní vlastnosti:**

- $TC$ a $TVC$ jsou kubické funkce;
- $AC$, $AVC$, $MC$ jsou křivky tvaru $U$ (nejprve klesají, po minimu rostou);
- $MC$ nabývá minima před $AVC$, $AVC$ před $AC$;
- $MC$ protíná $AC$ a $AVC$ zdola právě v jejich minimech;
- $AFC$ je hyperbola, stále klesající;
- $AC = AFC + AVC$; vzdálenost mezi $AC$ a $AVC$ klesá s rostoucím $Q$ (protože $AFC \to 0$).

## Princip minimalizace průměrných nákladů

Častou optimalizační úlohou je **minimalizace průměrných nákladů** — stanovení produkce, pro niž je $AC$ minimální.

### Princip

Mají-li průměrné náklady minimum v bodě $Q_0$, pak platí

$$
AC(Q_0) = MC(Q_0).
\tag{3.10}
$$

> [!note] Princip
> **V bodě minima průměrných nákladů se průměrné náklady rovnají mezním nákladům.**

**Odvození.** Z $AC(Q) = \tfrac{TC(Q)}{Q}$ derivací podílu plyne

$$
AC'(Q) = \frac{TC'(Q) \cdot Q - TC(Q)}{Q^2} = \frac{MC(Q) \cdot Q - AC(Q) \cdot Q}{Q^2} = \frac{MC(Q) - AC(Q)}{Q}.
$$

Nutnou podmínkou minima $AC$ v bodě $Q_0 > 0$ je $AC'(Q_0) = 0$, tedy

$$
\frac{MC(Q_0) - AC(Q_0)}{Q_0} = 0 \quad\Longleftrightarrow\quad MC(Q_0) = AC(Q_0).
$$

**Geometrická interpretace.** $MC$ protíná $AC$ právě v bodě minima $AC$ (obrázek 3.10); nalevo od $Q_0$ je $MC < AC$ (průměrné náklady klesají), napravo $MC > AC$ (průměrné náklady rostou).

Za obvyklých ekonomických podmínek platí i obrácené tvrzení — jestliže $AC(Q_0) = MC(Q_0)$, pak $Q_0$ je bod minima. V praktických úlohách tedy postačí řešit rovnici $AC(Q) = MC(Q)$.

> [!warning] Pozor — neplést s principem maxima zisku
> Pro **minimum $AC$** platí $AC = MC$, pro **maximum zisku** platí $MR = MC$. Obě podmínky využívají $MC$, ale rovnají ho rozdílným veličinám ($AC$ vs. $MR$).

#### Příklad 3.7

**Zadání.** Pro $TC = Q^2 + 3Q + 36$ najděte $Q$ minimalizující $AC$ a ověřte princip (3.10).

**Řešení.** Přímý výpočet:

$$
AC = \frac{Q^2 + 3Q + 36}{Q} = Q + 3 + \frac{36}{Q}, \qquad (AC)' = 1 - \frac{36}{Q^2} = \frac{Q^2 - 36}{Q^2}.
$$

$(AC)' = 0 \Rightarrow Q_1 = 6$ (smysluplné), $Q_2 = -6$ (vyloučeno). $(AC)''(6) = \tfrac{1}{3} > 0 \Rightarrow$ minimum. $AC(6) = 15$.

Pomocí principu: $MC = 2Q + 3$, rovnice $AC = MC$:

$$
\frac{Q^2 + 3Q + 36}{Q} = 2Q + 3 \;\Rightarrow\; Q^2 + 3Q + 36 = 2Q^2 + 3Q \;\Rightarrow\; Q^2 = 36 \;\Rightarrow\; Q = 6,
$$

a $AC(6) = MC(6) = 15$. Oba postupy dávají stejný výsledek.

### Princip minimalizace průměrných variabilních nákladů

Analogicky pro $AVC$:

$$
AVC(Q_0) = MC(Q_0).
\tag{3.11}
$$

> [!note] Princip
> **V bodě minima průměrných variabilních nákladů se $AVC$ rovnají mezním nákladům.**

Odvození je analogické (úloha 3.14). V obrázku 3.10 odpovídá $Q_0 = 2{,}5$. Za obvyklých podmínek platí i obrácené tvrzení — postačí řešit rovnici $AVC(Q) = MC(Q)$.

## Zisk a body zvratu

**Zisk** $PR$ (profit) je rozdíl celkového příjmu a celkových nákladů:

$$
PR = PR(Q) = TR(Q) - TC(Q).
\tag{3.12}
$$

Body rovnosti $TR$ a $TC$ se nazývají **body zvratu** (též vyrovnání, *break-even points*). V nejjednodušším modelu (lineární poptávka, konstantní $VC$) je $TR$ kvadratická a $TC$ lineární (obrázek 3.11). Křivky se protínají v bodech $A$, $B$ odpovídajících množstvím $Q_A$, $Q_B$ — firma je na **prahu rentability** (*break even*). Pro $Q < Q_A$ nebo $Q > Q_B$ je $TC > TR$ (ztráta); pro $Q_A < Q < Q_B$ je $TR > TC$ (zisk).

> [!info] Intuice — body zvratu
> Body zvratu jsou hranice „prodělečné" a „ziskové" zóny. Mezi nimi firma vydělává, za nimi prodělává. Maximum zisku leží uvnitř tohoto intervalu — typicky v jeho středu, je-li zisk kvadratický.

Body zvratu jsou řešení rovnice $PR(Q) = 0$. Pro vyšší stupně polynomu může být nutné použít software či numerický odhad. Maximum zisku se stanoví jako extrém funkce zisku.

![[imek-tr-tc-body-zvratu.jpeg|TR, TC a body zvratu Q_A, Q_B, max zisku MR=MC]]

*Obrázek 3.11: Body zvratu — křivky $TR$ (obrácená parabola) a $TC$ (přímka) se protínají v bodech $A$ a $B$ na ose $Q$ v hodnotách $Q_A$ a $Q_B$; maximum zisku leží mezi nimi v bodě $Q_{\max}$; svislá vzdálenost mezi $TR$ a $TC$ pro $Q_A < Q < Q_B$ vyznačuje zisk.*

#### Příklad 3.8

**Zadání.** Dáno $FC = 4$, $TVC = Q^2$, $P = -2Q + 9$. Určete zisk, body zvratu a bod maxima zisku.

**Řešení.** Celkové náklady a příjem:

$$
TC = 4 + Q^2, \qquad TR = Q \cdot (-2Q + 9) = -2Q^2 + 9Q.
$$

Zisk dle (3.12):

$$
PR = TR - TC = (-2Q^2 + 9Q) - (4 + Q^2) = -3Q^2 + 9Q - 4.
$$

**Body zvratu** jsou kořeny rovnice $-3Q^2 + 9Q - 4 = 0$, tj. $3Q^2 - 9Q + 4 = 0$:

$$
Q_{1,2} = \frac{9 \pm \sqrt{81 - 48}}{6} = \frac{9 \pm \sqrt{33}}{6},
$$

numericky $Q_1 \doteq 0{,}543$ a $Q_2 \doteq 2{,}457$.

**Maximum zisku.** $PR' = -6Q + 9 = 0 \Rightarrow Q = 1{,}5$. Dále $PR'' = -6 < 0$, tj. $Q = 1{,}5$ je bod maxima s hodnotou

$$
PR(1{,}5) = -3 \cdot (1{,}5)^2 + 9 \cdot 1{,}5 - 4 = -6{,}75 + 13{,}5 - 4 = 2{,}75.
$$

Pro srovnání maximum celkového příjmu (bez ohledu na náklady): $TR' = -4Q + 9 = 0 \Rightarrow Q = 2{,}25$, $TR_{\max} = -2 \cdot (2{,}25)^2 + 9 \cdot 2{,}25 = 10{,}125$. Leží vpravo od bodu maxima zisku, protože při $Q = 2{,}25$ rostou už náklady rychleji než příjem.

> [!warning] Nekonzistence v původním zdroji
> Skenovaný knižní text obsahoval v tomto příkladu dvě nesourodé hodnoty: uváděl body zvratu $Q_1 = 0{,}5$, $Q_2 = 4$ (odpovídající starší verzi zadání) a zároveň maximum v $Q = 2{,}25$, $PR = 6{,}125$ (odpovídající derivaci $PR' = -4Q + 9$, tj. zisku $PR = -2Q^2 + 9Q - 4$ bez odčtení kvadratického členu $Q^2$ z $TVC$). Zde je uvedena matematicky konzistentní verze: zadané $TC = 4 + Q^2$ a $TR = -2Q^2 + 9Q$ vedou na $PR = -3Q^2 + 9Q - 4$, odkud $Q_{\max} = 1{,}5$ a $PR_{\max} = 2{,}75$.

*Obrázek 3.12: Graf $TC = 4 + Q^2$ (parabola) a $TR = -2Q^2 + 9Q$ (parabola); průsečíky vyznačují body zvratu $Q_1 \doteq 0{,}54$, $Q_2 \doteq 2{,}46$.*

*Obrázek 3.13: Graf zisku $PR = -3Q^2 + 9Q - 4$ s maximem v $Q = 1{,}5$ a nulami $Q_1 \doteq 0{,}54$, $Q_2 \doteq 2{,}46$.*

## Princip maximalizace zisku

Kromě standardního hledání extrému lze využít následující princip.

![[imek-max-zisku-dva-pohledy.jpeg|Maximalizace zisku dvěma pohledy — max vzdálenost TR−TC ⟺ MR=MC; ekvivalentní kritéria]]


### Princip

Má-li zisk $PR$ v bodě $Q_0$ maximum, pak platí

$$
MR(Q_0) = MC(Q_0).
\tag{3.13}
$$

> [!note] Princip
> **V bodě maxima zisku se mezní příjem rovná mezním nákladům.**

**Odvození** (úloha 3.21): nutnou podmínkou maxima $PR = TR - TC$ je $PR'(Q_0) = TR'(Q_0) - TC'(Q_0) = 0$, tj. $MR(Q_0) = MC(Q_0)$.

> [!tip] Postup — jak najít maximum zisku
> 1. Sestavte $TR$ a $TC$ ze zadání (typicky $TR = P(Q) \cdot Q$).
> 2. Vypočtěte $MR = TR'$ a $MC = TC'$.
> 3. Řešte rovnici $MR(Q) = MC(Q)$.
> 4. Ověřte druhou derivaci $PR''$ (nebo že má rovnice jediný ekonomicky smysluplný kořen).
> 5. Dosaďte do $PR = TR - TC$ pro hodnotu maxima.

#### Příklad 3.9

**Zadání.** Pro poptávku $P = 30 - Q$ a $TC = 0{,}5Q^2 + 6Q + 7$ stanovte produkci maximalizující zisk.

**Řešení.** $TR = 30Q - Q^2$, $PR = -1{,}5Q^2 + 24Q - 7$. Extrém: $PR' = -3Q + 24 = 0 \Rightarrow Q = 8$; $PR'' = -3 < 0$ (maximum); $PR(8) = 89$.

Ověření principu: $MR = 30 - 2Q$, $MC = Q + 6$; $MR(8) = 14 = MC(8)$, tj. platí (3.13).

V řadě případů — má-li rovnice $MR(Q) = MC(Q)$ jediné ekonomicky smysluplné řešení $Q_0$ — není třeba provádět test druhé derivace.

#### Příklad 3.10

**Zadání.** Firma vyrábí minipočítače v [[poptavka-nabidka|dokonalé konkurenci]], produkuje 30 výrobků denně za $900$ EUR/ks. $TC = 50 + 28Q^2$. Určete optimální denní produkci a zisk.

**Řešení.** $TR = 900Q$, $MR = 900$, $MC = 56Q$. Z principu:

$$
900 = 56Q \;\Rightarrow\; Q = \tfrac{900}{56} \doteq 16{,}07 \;\approx\; 16.
$$

Zisk při $Q = 16$:

$$
PR(16) = 900 \cdot 16 - (50 + 28 \cdot 16^2) = 14\,400 - 7\,218 = 7\,182 \text{ EUR}.
$$

Pro srovnání při původních 30 ks:

$$
PR(30) = 900 \cdot 30 - (50 + 28 \cdot 900) = 27\,000 - 25\,250 = 1\,750 \text{ EUR}.
$$

**Doporučení:** vyrábět 16 ks/den se ziskem $7\,182$ EUR namísto původních $1\,750$ EUR.

### Speciální tvar pro pevnou cenu

Předpokládáme-li, že výrobce prodává za pevnou cenu $P$, pak $TR = P \cdot Q$ a z (3.13) speciálně:

$$
P = MC(Q).
\tag{3.14}
$$

Výrobce musí nastavit nabízené množství tak, aby se mezní náklady rovnaly ceně. Má-li rovnice (3.14) více řešení, rozhoduje znaménko $PR''$.

#### Příklad 3.11

**Zadání.** Pro $TC = 0{,}04Q^3 - 0{,}9Q^2 + 10Q + 5$ a pevnou cenu $P = 4$ stanovte optimální produkci.

**Řešení.** Z (3.14): $MC = 0{,}12Q^2 - 1{,}8Q + 10 = 4$, tj. $0{,}12Q^2 - 1{,}8Q + 6 = 0$, po vydělení $0{,}12$:

$$
Q^2 - 15Q + 50 = 0 \;\Rightarrow\; Q_1 = 5, \; Q_2 = 10.
$$

Dále $PR'' = -MC' = -0{,}24Q + 1{,}8$:

- $PR''(5) = 0{,}6 > 0 \;\Rightarrow\;$ lokální **minimum** zisku (minimalizace ztráty);
- $PR''(10) = -0{,}6 < 0 \;\Rightarrow\;$ lokální **maximum** zisku, avšak

$$
PR(10) = 4 \cdot 10 - (0{,}04 \cdot 1\,000 - 0{,}9 \cdot 100 + 100 + 5) = 40 - 55 = -15,
$$

tj. ztráta větší než $FC = 5$.

**Závěr:** firma by měla **zastavit výrobu** — i vypnutí provozu způsobí menší ztrátu, a to pouze ve výši $FC = 5$.

## Konstrukce křivky nabídky firmy

Důležitým završením analýzy je konstrukce **funkce nabídky firmy**. S nabízeným množstvím rostou mezní náklady $MC$ a tyto určují cenu $P$, za kterou je firma ochotna toto množství realizovat. Proto platí $P = MC(Q)$ (obrázek 3.14). Cena $P$ však nemůže být nižší než $P^*$ odpovídající množství $Q^*$ v bodě **minima průměrných variabilních nákladů** (fixní náklady nelze při optimalizaci zahrnout — jsou konstantní součástí nákladů i zisku). Křivka nabídky se tedy skládá z úsečky $0Q^*$ (kde firma nenabízí nic) a rostoucí části $MC$ nad bodem $A$:

$$
P = S(Q) = \begin{cases} MC(Q) & \text{pro } Q \geq Q^*, \\ 0 & \text{pro } Q < Q^*, \end{cases}
\tag{3.15}
$$

kde $Q^*$ je bod minima $AVC$. Bod $(Q^*, P^*)$ se nazývá **shutdown point** — pod ním se firmě nevyplatí produkovat.

> [!tip] Postup — jak odvodit nabídku firmy
> 1. Ze zadaných nákladů určete $MC(Q)$ a $AVC(Q)$.
> 2. Najděte $Q^*$ jako bod minima $AVC$ (řešením $AVC'(Q) = 0$, případně rovnice $AVC = MC$).
> 3. Vypočtěte $P^* = MC(Q^*) = AVC(Q^*)$ — minimální cenu nabídky.
> 4. Zapište nabídku: $S(Q) = MC(Q)$ pro $Q \geq Q^*$, jinak $0$.
> 5. V případě potřeby vyjádřete inverzi $Q = S^{-1}(P)$ doplněním na čtverec.

*Obrázek 3.14: Křivky $AC$, $AVC$ a $MC$ ve tvaru $U$; křivka nabídky $P = MC(Q)$ začíná v bodě $A$ odpovídajícím minimu $AVC$ při ceně $P^*$ (minimální cena nabídky); pod $Q^*$ je nabídka nulová.*

#### Příklad 3.12

**Zadání.** Pro $TC = 0{,}1Q^3 - 2Q^2 + 15Q + 10$ odvoďte funkci nabídky firmy.

**Řešení.** $MC = 0{,}3Q^2 - 4Q + 15$, takže z $P = MC$:

$$
P = 0{,}3Q^2 - 4Q + 15.
$$

Vyjádření $Q$ jako funkce $P$ doplněním na čtverec:

$$
P = 0{,}3\left(\left(Q - \tfrac{20}{3}\right)^2 + \tfrac{50}{9}\right), \qquad \left(Q - \tfrac{20}{3}\right)^2 = \frac{30P - 50}{9},
$$

$$
Q = \frac{20}{3} + \frac{\sqrt{30P - 50}}{3}.
$$

Dále $AVC = 0{,}1Q^2 - 2Q + 15$, $AVC' = 0{,}2Q - 2 = 0 \Rightarrow Q^* = 10$, $AVC'' = 0{,}2 > 0$ (minimum). Minimální cena nabídky $P^* = MC(10) = 30 - 40 + 15 = 5$.

**Závěr.**

$$
P = S(Q) = \begin{cases} 0{,}3Q^2 - 4Q + 15 & \text{pro } Q \geq 10, \\ 0 & \text{pro } Q < 10. \end{cases}
$$

*Obrázek 3.15: Grafická ilustrace nabídky firmy odvozené z části křivky $MC$ ležící nad minimem $AVC$.*

## Shrnutí kapitoly 3

Celkový příjem je součin ceny a množství, kde cena je dána funkcí [[poptavka-nabidka|poptávky]]. Pro lineární poptávku je $TR$ kvadratická. Průměrný příjem je podíl $TR/Q$ a rovná se poptávkové funkci. Celkové náklady se skládají z **fixních** a **celkových variabilních** nákladů. Průměrné veličiny jsou jejich podíly s množstvím. **Body zvratu** identifikují, kdy se firma nachází na prahu rentability. Rozdíl $TR - TC$ udává **zisk**; klíčový je výpočet produkce, která zisk maximalizuje. **Mezní příjem** a **mezní náklady** jsou [[derivace|derivace]] $TR$, resp. $TC$ podle produkce; udávají rychlosti změn, resp. přibližné změny odpovídající jednotkové změně produkce.

- **Princip minimalizace průměrných nákladů:** v bodě minima $AC$ platí $AC(Q_0) = MC(Q_0)$.
- **Princip minimalizace průměrných variabilních nákladů:** v bodě minima $AVC$ platí $AVC(Q_0) = MC(Q_0)$.
- **Princip maximalizace zisku:** v bodě maxima $PR$ platí $MR(Q_0) = MC(Q_0)$.
- **Funkce nabídky firmy:** $P = S(Q) = MC(Q)$ pro $Q \geq Q^*$, jinak $0$, kde $Q^*$ je bod minima $AVC$.

## Otázky k sebehodnocení

1. Jaký je vztah pro celkový příjem v podmínkách dokonalé konkurence?
2. Jaký tvar má křivka celkového příjmu pro lineární poptávku?
3. Jak se vypočte mezní příjem a co udává?
4. Z jakých složek se skládají celkové náklady?
5. Jak se stanoví celkové náklady, známe-li náklady mezní?
6. Jaký je trend průměrných fixních nákladů a průměrných nákladů, roste-li produkce?
7. Jak se stanoví přibližně změna celkových nákladů?
8. Jak se vypočte zisk?
9. Jaká vlastnost platí v bodě maxima zisku?
10. Co jsou body zvratu? Jak se najdou?
11. Z jakých nákladových charakteristik se vychází při konstrukci nabídky?

## Úlohy 3.1–3.28

### Příjem (3.1–3.5)

**3.1** Je dána poptávka $P = D(Q) = 100$. (a) Rozhodněte, v jakých podmínkách konkurence zadaná poptávka platí. (b) Najděte celkový příjem $TR$, průměrný příjem $AR$ a mezní příjem $MR$. (c) Vypočtěte $TR$, $AR$, $MR$ při množství 20. (d) Načrtněte křivky poptávky, celkového příjmu, průměrného příjmu a mezního příjmu a charakterizujte je geometricky.

**3.2** Je dána poptávka $P = D(Q) = -0{,}5Q + 20$. (a) Rozhodněte, v jakých podmínkách konkurence zadaná poptávka platí. (b) Najděte celkový příjem $TR$, průměrný příjem $AR$ a mezní příjem $MR$. (c) Vypočtěte $TR$, $AR$, $MR$ při množství 10. (d) Načrtněte křivky poptávky, celkového příjmu, průměrného příjmu a mezního příjmu a charakterizujte je geometricky.

**3.3** Je dána poptávka $P = D(Q) = 1200 - Q^2$. (a) Najděte celkový příjem $TR$, průměrný příjem $AR$ a mezní příjem $MR$. (b) Vypočtěte $TR$ pro $Q = 10, 20, 30$ a rozhodněte, kdy $TR$ roste, resp. klesá. (c) Vypočtěte $AR$, $MR$ pro $Q = 10, 20, 30$ a rozhodněte, kdy $MR$ roste, resp. klesá. (d) Vypočtěte $Q$, které maximalizuje $TR$ a stanovte příslušnou hodnotu maxima $TR$. (e) Určete (je užitečné vyšetřit i jejich průběhy). (f) Charakterizujte geometricky křivky $D$, $TR$, $AR$, $MR$.

**3.4** Je dán celkový příjem $TR = 1200Q - Q^3$. (a) Určete, jak rychle se (přibližně) mění $TR$ vzhledem ke $Q$ při $Q = 5$, $Q = 8$, $Q = 12$ a charakterizujte dynamiku změn. (b) Vypočtěte a ekonomicky interpretujte $MR(10)$. (c) Odhadněte, o kolik se přibližně změní $TR$, jestliže se $Q$ změní z 10 na 12 a porovnejte se skutečnou změnou $TR$.

**3.5** Je dán mezní příjem $MR = -Q + 20$. (a) Určete celkový příjem $TR$. (b) Vypočtěte změnu $TR$, jestliže se $Q$ změní z 8 na 12.

### Náklady (3.6–3.16)

**3.6** Jsou dány celkové náklady $TC = 100 + 2Q + \tfrac{Q^2}{10}$. (a) Určete fixní náklady $FC$, celkové variabilní náklady $TVC$, průměrné variabilní náklady $AVC$, variabilní náklady na jednotku $VC$, průměrné náklady $AC$ a mezní náklady $MC$. (b) Vypočtěte $TC$, $TVC$, $AVC$, $VC$, $AC$, $MC$ pro $Q = 50$. (c) Rozhodněte, kdy $TC$, $AC$, $MC$ rostou, resp. klesají.

**3.7** Jsou dány průměrné náklady $AC = \tfrac{100}{Q} + 20$ a mezní náklady $MC$. (a) Určete celkové náklady $TC$. (b) Načrtněte a geometricky charakterizujte křivky $AC$, $TC$, $MC$.

**3.8** Jsou dány celkové náklady $TC = 80 + 30Q - 6Q^2 + Q^3$. Určete $TVC$, $FC$, $AVC$, $AC$, $AFC$, $MC$.

**3.9** Jsou dány celkové náklady $TC = 500 + 0{,}6Q^2$. (a) Určete, jak rychle se přibližně mění $TC$ vzhledem ke $Q$ pro $Q = 10$, $Q = 20$, $Q = 30$ a charakterizujte dynamiku změn. (b) Vypočtěte a ekonomicky interpretujte $MC(15)$. (c) Odhadněte, o kolik se přibližně změní $TC$ v důsledku změny $Q$ z 15 na 20 a porovnejte se skutečnou změnou $TC$.

**3.10** Jsou dány mezní náklady $MC = 60 - 16Q + 1{,}5Q^2$. (a) Určete celkové náklady $TC$, jestliže fixní náklady $FC = 100$. (b) Vypočtěte změnu $TC$ v důsledku změny $Q$ z 15 na 20.

**3.11** Jsou dány celkové náklady $TC = 100 + 25Q - 5Q^2 + Q^3$. (a) Určete $Q$, které minimalizuje $MC$ a stanovte příslušnou hodnotu minima $MC$. (b) Určete $Q$, které minimalizuje $AVC$ a stanovte příslušnou hodnotu minima $AVC$. (c) Určete $Q$, které minimalizuje $AC$ a stanovte příslušnou hodnotu minima $AC$ (rada: hledaný kořen $AC'$ určete přibližně, patří do $(4{,}7; 4{,}8)$, zpřesněte).

**3.12** Dokažte, že mají-li průměrné náklady $AC = AC(Q)$ v bodě $Q_0$ minimum, pak platí $AC(Q_0) = MC(Q_0)$, kde $MC(Q)$ jsou mezní náklady.

**3.13** Jsou dány celkové náklady $TC = Q^2 + 2Q + 25$. Určete $Q$, které minimalizuje $AC$ a stanovte příslušnou hodnotu minima $AC$.

**3.14** Dokažte, že mají-li průměrné variabilní náklady $AVC = AVC(Q)$ v bodě $Q_0$ minimum, pak platí $AVC(Q_0) = MC(Q_0)$, kde $MC(Q)$ jsou mezní náklady.

**3.15** Jsou dány celkové náklady $TC = 50 + 15Q - 2Q^2 + 0{,}2Q^3$. Určete $Q$, které minimalizuje $AVC$ a stanovte příslušnou hodnotu minima $AVC$.

**3.16** Celkové náklady na výstavbu domu o $x$ podlažích se skládají ze tří komponent (1), (2), (3): (1) 10 milionů Kč za pozemek, (2) 0,25 milionu Kč za každé podlaží, (3) zvláštní náklady $10\,000 x$ Kč za podlaží. Určete počet podlaží, které minimalizuje průměrné náklady na jedno podlaží a stanovte příslušnou hodnotu minima průměrných nákladů.

### Zisk, body zvratu (3.17–3.25)

**3.17** Jsou dány $TR = 10Q$ a $TC = 100 + 5Q$. Určete body zvratu a geometricky výsledek interpretujte.

**3.18** Odvoďte, že jestliže $TR$ i $TC$ jsou lineární tvaru $TR = pQ$, $TC = m + nQ$, kde $m, n, p$ jsou pevně zadány, pak existuje jediný bod zvratu $Q^* = \tfrac{m}{p - n}$ a proveďte diskusi podmínek. Načrtněte obrázek.

**3.19** Jsou dány $TR = -2Q^2 + 14Q$ a $TC = 2Q + 10$. (a) Určete $Q$, které maximalizuje zisk $PR$ a stanovte příslušnou hodnotu maxima $PR$. (b) Určete body zvratu a interval, ve kterém je firma v zisku. (c) Určete $Q$, které maximalizuje $TR$ a stanovte příslušnou hodnotu maxima $TR$. (d) Graficky interpretujte.

**3.20** Jsou dány poptávka $P = 400 - Q^2$, $FC = 100$, $MC = 20$. (a) Určete $Q$, které maximalizuje zisk $PR$ a stanovte příslušnou hodnotu maxima $PR$. (b) Určete body zvratu a interval, ve kterém je firma v zisku (rada: jeden z bodů zvratu patří do $(0, 1)$, druhý do $(19, 20)$, zpřesněte).

**3.21** Dokažte, že má-li zisk $PR = PR(Q)$ v bodě $Q_0$ maximum, pak platí $MR(Q_0) = MC(Q_0)$.

**3.22** Pro zadané $MR$ a $MC$ určete $Q$, které maximalizuje zisk $PR$. (a) $MR = 236 - 16Q$, $MC = 3Q^2 - 32Q + 96$. (b) $MR = 280 - 20Q$, $MC = 1{,}6Q^2 - 15Q + 60$.

**3.23** Pro zadané $TR$ a $TC$ určete $Q$, které maximalizuje $PR$ a stanovte příslušnou hodnotu maxima $PR$. (a) $TR = 125Q - Q^2$, $TC = 500 + 5Q + 0{,}5Q^2$. (b) $TR = 20Q - 2Q^2$, $TC = 2 + 20Q - 8Q^2 + Q^3$. (c) $TR = 4Q - 0{,}25Q^2$, $TC = 4 + 2Q - \tfrac{3Q^2}{10} + \tfrac{Q^3}{20}$.

**3.24** Firma řeší problém stanovení cen pro malé a velké odběratele za účelem maximalizace zisku. Poptávka pro maloodběratele je $P_1 = 500 - Q_1$, pro velkoodběratele $P_2 = 300 - 1{,}5Q_2$. Celkové náklady firmy jsou $TC = 50\,000 + 20Q$, kde $Q = Q_1 + Q_2$. Stanovte ceny, při kterých firma maximalizuje zisk: (a) s cenovou diskriminací, (b) bez cenové diskriminace. Porovnejte zisk v obou případech.

**3.25** Firma řeší problém stanovení cen pro domácí a zahraniční trh za účelem maximalizace zisku. Poptávka pro domácí trh je $P_1 = 300 - Q_1$, pro zahraniční trh $P_2 = 200 - 0{,}5Q_2$. Celkové náklady firmy jsou $TC = 5\,000 + 100Q$, kde $Q = Q_1 + Q_2$. Stanovte ceny, při kterých firma maximalizuje zisk: (a) s cenovou diskriminací, (b) bez cenové diskriminace. Porovnejte zisk firmy v obou případech.

### Konstrukce nabídky (3.26–3.28)

**3.26** Jsou dány celkové variabilní náklady $TVC = 0{,}85Q^3 - 11{,}9Q^2 + 102Q$. Určete minimální cenu $P^*$ nabídky a konstruujte nabídku. Graficky interpretujte.

**3.27** Jsou dány mezní náklady $MC = 4{,}2Q^2 - 48Q + 250$. Konstruujte nabídku.

**3.28** Jsou dány celkové náklady $TC = 0{,}5Q^3 - 7Q^2 + 60Q + 500$. Konstruujte nabídku.

## Klíčové pojmy

- **Celkový příjem** $TR = P \cdot Q$ — křivka celkového příjmu (total revenue curve).
- **Průměrný příjem** $AR = \tfrac{TR}{Q} = D(Q)$ — shoduje se s poptávkovou funkcí.
- **Mezní příjem** $MR = \tfrac{\mathrm{d}TR}{\mathrm{d}Q}$ — rychlost změny $TR$; pro lineární poptávku má sklon dvojnásobný vůči $AR$.
- **Diferenciál příjmu/nákladů** $\Delta TR \approx MR \, \mathrm{d}Q$, $\Delta TC \approx MC \, \mathrm{d}Q$.
- **Celkové náklady** $TC = FC + TVC(Q)$.
- **Fixní náklady** $FC$, **celkové variabilní náklady** $TVC(Q)$, **variabilní náklady na jednotku** $VC(Q) = \tfrac{TVC(Q)}{Q}$.
- **Průměrné náklady** $AC = \tfrac{TC}{Q}$, **průměrné fixní** $AFC = \tfrac{FC}{Q}$, **průměrné variabilní** $AVC = \tfrac{TVC}{Q}$.
- **Mezní náklady** $MC = \tfrac{\mathrm{d}TC}{\mathrm{d}Q}$.
- **Kubická nákladová funkce** $TC = FC + aQ + bQ^2 + cQ^3$ — „standardní" tvar s $U$-průběhem $AC$, $AVC$, $MC$.
- **Princip minimalizace průměrných nákladů**: v bodě minima $AC$ platí $AC(Q_0) = MC(Q_0)$; geometricky $MC$ protíná $AC$ v jejím minimu.
- **Princip minimalizace průměrných variabilních nákladů**: v bodě minima $AVC$ platí $AVC(Q_0) = MC(Q_0)$.
- **Zisk** $PR = TR - TC$ — rozdíl mezi celkovým příjmem a celkovými náklady.
- **Body zvratu** (*break-even points*) — hodnoty $Q_A, Q_B$ splňující $PR(Q) = 0$; oddělují pásma ztráty a zisku.
- **Práh rentability** — stav firmy v bodě zvratu.
- **Princip maximalizace zisku** — v bodě maxima zisku $Q_0$ platí $MR(Q_0) = MC(Q_0)$ (3.13).
- **Speciální tvar pro pevnou cenu** — při $P = \text{konst}$ platí $P = MC(Q)$ (3.14).
- **Shutdown point** — bod $(Q^*, P^*)$ v minimu $AVC$; pod ním se firmě nevyplatí produkovat.
- **Funkce nabídky firmy** $P = S(Q) = MC(Q)$ pro $Q \geq Q^*$, jinak $0$ (3.15); vychází z rostoucí části $MC$ nad minimem $AVC$.
- **Dokonalá konkurence** — $P = P^*$ konstantní ⇒ $AR = MR = P^*$.
- **Cenová diskriminace** — stanovení odlišných cen pro různé segmenty trhu za účelem maximalizace zisku (úlohy 3.24–3.25).

## Navigace

- **Související témata:** [[poptavka-nabidka|Poptávka a nabídka]], [[elasticita|Elasticita]], [[derivace|Derivace]], [[integral|Integrál]], [[produkce|Produkční funkce]]
- **Přednášky:** [[imek-blok-01|KS 1. blok — souhrn]], [[imek-blok-02|KS 2. blok — souhrn]]
- **Kurz:** [[imek|Matematická ekonomie]]
