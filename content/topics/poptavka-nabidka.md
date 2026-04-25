---
title: Poptávka, nabídka a tržní rovnováha
course: imek
type: topic
tags: [imek, poptavka, nabidka, rovnovaha, multiplikator, zdaneni, prebytek]
sources: [raw/imek/kniha_scanned/, raw/imek/KS_prvni_blok.pdf]
created: 2026-04-22
updated: '2026-04-25'
---

<!-- updated: 2026-04-22 — sekce „Zdanění trhu" vyčleněna do [[zdaneni-trhu]] -->

# Poptávka, nabídka a tržní rovnováha

> [!info] TL;DR
> Kapitola buduje základní mikroekonomický model trhu: chování spotřebitele (**poptávka**) a výrobce (**nabídka**), jejich interakci v **tržní rovnováze** a kvantitativní analýzu reakce modelu na změnu exogenních proměnných (posuny, zdanění, **multiplikátory**). Uzavírá ji pojem **přebytku spotřebitele a výrobce** jako míry čistého prospěchu obou stran trhu.

## Úvod — model a proměnné

Cílem je popsat chování spotřebitele a výrobce za předpokladu racionality jedince (*homo economicus*). Mezi hlavní proměnné patří:

- cena $P$ zkoumaného zboží,
- ceny alternativních zboží $P_1, P_2, \dots, P_n$,
- důchod $Y$,
- preference, očekávání, populace, výrobní faktory (práce $L$, kapitál $K$, půda $E$), technologie, počet výrobců $O$, počasí $W$ atd.

Vybereme-li právě jeden z faktorů jako endogenní (*ceteris paribus*), hovoříme o **jednofaktorovém modelu**; jinak jde o model **vícefaktorový**.

---

## Poptávka

> [!info] TL;DR
> Poptávka vyjadřuje závislost nakupovaného množství $Q$ na ceně $P$ (případně dalších proměnných). Základní vlastností je **zákon klesající poptávky**: při růstu ceny množství klesá. Z důvodu přehlednosti se pracuje s jednofaktorovým modelem $Q = D(P)$ a jeho lineární verzí $P = aQ + b$.

### Obecný vícefaktorový model

Ve vícefaktorovém modelu uvažujeme, že poptávané množství $Q$ závisí na ceně $P$, na cenách alternativních zboží a důchodu. Závislost vyjadřuje **funkce poptávky** (*demand function*):

$$
Q = D(P, P_1, P_2, \dots, P_n, Y). \tag{2.1}
$$

Důležitou vlastností je **homogenita**: změní-li se všechny nezávisle proměnné $r$-krát, poptávané množství se nezmění,

$$
Q = D(rP, rP_1, rP_2, \dots, rP_n, rY) = D(P, P_1, P_2, \dots, P_n, Y). \tag{2.2}
$$

> [!warning] Pozor
> Homogenita platí pouze v zidealizovaném vícefaktorovém modelu; **v jednofaktorových modelech neplatí**.

Rozlišuje se poptávka **individuální**, **tržní** a **agregátní** (není-li specifikováno, rozumí se tržní).

### Jednofaktorové modely

#### Funkce poptávky v užším slova smyslu

Poptávané množství $Q$ závisí pouze na ceně $P$:

$$
Q = D(P), \qquad \text{resp.} \qquad P = D(Q). \tag{2.3}
$$

Graf této funkce se nazývá **křivka poptávky** (*demand curve*).

#### Zákon klesající poptávky

> **Roste-li cena $P$, pak množství $Q$ klesá; klesá-li cena $P$, pak množství $Q$ roste.**

Spotřebitelé jsou ochotni nakoupit větší množství za nižší cenu (mezní užitečnost — viz kap. 6). Zákon platí za **normálních podmínek**; první kvantitativní formulaci podal Marshall (1890).

> [!info] Intuice — proč zákon platí
> - **Substituční efekt** — růst ceny vede ke snaze nahradit zboží jiným.
> - **Důchodový efekt** — růst ceny způsobí nevítaný úbytek reálného důchodu.

Každá funkce poptávky je tedy klesající. Cena $P$ se vynáší na svislou osu, množství $Q$ na vodorovnou. Hypotetická křivka prochází body $[0, P_0]$ (cena, při níž je zboží neprodejné) a $[Q_0, 0]$ (teoretický objem při nulové ceně). Interval $(0, P_0)$ je **reálné cenové rozpětí**. Za teoretických předpokladů je křivka **konvexní**.

*Obrázek 2.1: Hypotetická křivka poptávky v rovině $(Q, P)$ — klesající, konvexní, procházející body $[0, P_0]$ a $[Q_0, 0]$.*

#### Lineární model poptávky

Nejjednodušší závislostí je

$$
P = aQ + b, \qquad a < 0,\ b > 0. \tag{2.4}
$$

Křivka poptávky je přímka se záporným sklonem. Alternativně $Q = \tfrac{1}{a}P - \tfrac{b}{a}$, kde $\tfrac{1}{a} < 0$ a $-\tfrac{b}{a} > 0$. Reálné cenové rozpětí je $(0, b)$. Tento model odpovídá **nedokonalé konkurenci**.

##### Příklad 2.1

**Zadání:** Lineární poptávka $P = -2Q + 60$.

**Řešení:** Reálné cenové rozpětí je $(0, 60)$; alternativní tvar je $Q = -\tfrac{1}{2}P + 30$.

| $P$ | 40 | 20 |
| --- | --- | --- |
| $Q$ | 10 | 20 |

*Obrázek 2.2 / 2.3: Lineární poptávka — přímka s průsečíky $[0, b]$ a $[-b/a, 0]$.*

#### Poptávka při dokonalé konkurenci

Přebírá-li každý účastník trhu pevnou tržní cenu $P^*$, je funkce poptávky konstantní:

$$
P = P^*.
$$

*Obrázek 2.4: Vodorovná přímka v rovině $(Q, P)$ na úrovni $P = P^*$.*

#### Giffenův statek

Existují zboží, u nichž je křivka poptávky **rostoucí** — tzv. **Giffenův statek**. Jde o případy, kdy důchodový efekt převáží substituční (klasický příklad: rýže u chudých asijských spotřebitelů). Giffenův statek patří k **podřadnému zboží**.

##### Příklad 2.2

**Zadání a popis:** Křivka $D_1$ reprezentuje poptávku rodiny po cukru s reálným cenovým rozpětím $(0, 15)$ pencí za libru; je nejprve konvexní, od inflexního bodu $Q_0$ konkávní, se saturací kolem 17 liber. Křivka $D_2$ na širším trhu je konvexní klesající z bodu $[0, 21]$ centů.

### Engelova funkce (závislost na důchodu)

Druhý jednofaktorový model předpokládá závislost množství pouze na důchodu $Y$:

$$
Q = E(Y). \tag{2.5}
$$

Funkce se nazývá **Engelova**, její graf **Engelova křivka**. Tvar závisí na typu zboží:

- **Normální (superior) zboží** — $Q$ roste s $Y$, nepřesáhne hodnotu $Q_0$:
  - **Nezbytné zboží** (potraviny, léky) — malá citlivost, **konkávní** křivka, autonomní spotřeba $Q_1 > 0$.
  - **Luxusní zboží** — velká citlivost až od hladiny $Y_1$, křivka je nejprve **konvexní** a od $Y_1$ **konkávní**.
- **Podřadné (inferior) zboží** — od hladiny $Y_0$ množství s růstem důchodu klesá.

Mírou citlivosti je *důchodová elasticita* (viz [[elasticita]]).

*Obrázek 2.6: Tři panely Engelových křivek — (a) nezbytné, (b) luxusní, (c) podřadné zboží.*

#### Intuice — co vlastně znamená „podřadné"?

> [!warning] Pozor — nezbytné ≠ podřadné
> **Nezbytné zboží:** $Q$ **roste** s $Y$, ale **pomaleji** než důchod (2× plat → třeba 1,3× spotřeba). $E_Y \in (0, 1)$.
>
> **Podřadné zboží:** $Q$ **klesá** v absolutních číslech (2× plat → třeba 0,7× spotřeba). $E_Y < 0$.
>
> Klíčový rozdíl: u podřadného zboží si při vyšším důchodu kupuješ **méně kusů, ne jen proporčně méně**.

**Mechanismus — substituce „nahoru".** Samotné zboží se nezhoršilo, jen si teď můžeš dovolit **kvalitnější alternativu**. Růst důchodu → přesun k prémiovému substitutu → absolutní pokles nákupu „levnější verze".

![[imek-engelovy-krivky-3typy.jpeg|Tři Engelovy křivky v jednom grafu — luxus stoupá prudce, nezbytné saturuje, podřadné klesá po bodu Y_0]]

##### České příklady

| Podřadné | Nahradí se za |
|---|---|
| Instantní polévky, ramen | Čerstvé jídlo, restaurace |
| MHD (autobus, tramvaj) | Vlastní auto, Uber, taxi |
| Mražené polotovary, pizza z mrazáku | Čerstvé suroviny, hotovky |
| Privátní značky supermarketů (K-Classic, Clever) | Značkové produkty |
| Paštika Májka, obyčejný měkký salám | Kvalitní uzeniny, šunka od kosti |
| Second hand oblečení | Nové oblečení, značky |
| Krabicové víno, nejlevnější pivo | Lahvové víno, řemeslná piva |
| Ojetá auta nižších tříd | Nová auta, prémiové značky |

> [!tip] Test 50 milionů
> Představ si, že vyhraješ 50 milionů. **Čeho si najednou koupíš méně** (nebo vůbec)? To je tvoje podřadné zboží.

**Pozor — podřadné je relativní k osobě.** Stejný produkt může být pro různé lidi v různých kategoriích. McDonald's je pro studenta s 15k platem možná **luxus** ($E_Y > 1$), pro manažera s 200k platem **podřadné** ($E_Y < 0$). Proto je $E_Y$ vždy **lokální veličina** — platí pro danou úroveň důchodu, ne absolutně.

Extrémním případem podřadného zboží, kde substituční efekt převáží už na straně ceny, je **Giffenův statek** (viz níže) — tam poptávková křivka dokonce roste.

### Posun poptávky (*shift of demand*)

Při změně exogenní proměnné (např. důchodu) se celá křivka poptávky posouvá. Uvažujme normální zboží. Ceně $P_0$ odpovídá množství $Q_0$ na křivce $D$; vzroste-li důchod z $Y$ na $Y_1 > Y$, pak stejné ceně $P_0$ odpovídá vyšší $Q_1 > Q_0$ — křivka se **posouvá doprava**. Pokles důchodu vede k posunu doleva.

![[imek-posun-vs-pohyb-po-krivce.jpeg|Pohyb po křivce poptávky (změna ceny) vs. posun celé křivky (změna důchodu, preferencí)]]


Posun může být způsoben i jinými faktory (např. zdaněním spotřebitele — viz dále).

*Obrázek 2.7: Posun poptávky — tři křivky $D_2, D, D_1$ v rovině $(Q, P)$, šipky naznačují posuny.*

##### Příklad 2.3 — zdanění kupujícího

**Zadání:** Poptávce $P = D(Q)$ odpovídá ceně $P_0$ množství $Q_0$. Na kupujícího je uložena jednotková daň $T$.

**Řešení:** Kupující nakupuje množství $Q_1$, které odpovídá ceně $P_0 + T$ na původní křivce. Nová poptávka je

$$
P = D_1(Q) = D(Q) - T,
$$

tj. dojde k **posunu poptávky doleva**.

*Obrázek 2.8: Dvě klesající poptávkové přímky v $(Q, P)$; na svislé ose jsou vyznačeny $P_0$, $T$, $P_0 + T$; na vodorovné $Q_1$ a $Q_0$.*

### Vícekomoditní (dvoukomoditní) trh

Uvažujme dvě tržně závislá zboží s lineárními funkcemi poptávky:

$$
\begin{aligned}
Q_1 &= D_1(P_1, P_2) = a_1 + b_1 P_1 + c_1 P_2, \\
Q_2 &= D_2(P_1, P_2) = a_2 + b_2 P_1 + c_2 P_2.
\end{aligned}
\tag{2.6}
$$

#### Znaménková analýza parametrů

- $a_1 > 0$, $a_2 > 0$ (při nulových cenách je poptávané množství kladné),
- $b_1 < 0$, $c_2 < 0$ (vlastní koeficienty — zákon klesající poptávky),
- zkřížené koeficienty $c_1$, $b_2$ určují povahu vztahu:
  - **substituty** (máslo vs. margarín): $c_1 > 0$, $b_2 > 0$,
  - **komplementy** (auto vs. benzín): $c_1 < 0$, $b_2 < 0$.

Schematicky:

**Substituty**
$$Q_1 = \underset{+}{a_1} + \underset{-}{b_1 P_1} + \underset{+}{c_1 P_2}, \qquad Q_2 = \underset{+}{a_2} + \underset{+}{b_2 P_1} + \underset{-}{c_2 P_2}$$

**Komplementy**
$$Q_1 = \underset{+}{a_1} + \underset{-}{b_1 P_1} + \underset{-}{c_1 P_2}, \qquad Q_2 = \underset{+}{a_2} + \underset{-}{b_2 P_1} + \underset{-}{c_2 P_2}$$

---

## Nabídka

> [!info] TL;DR
> Nabídka vyjadřuje závislost nabízeného množství $Q$ na ceně $P$ (případně dalších proměnných). Základní vlastností je **zákon rostoucí nabídky**: při vyšší ceně je výrobce ochoten nabídnout více. Lineární model $P = cQ + d$ s $c > 0$ je standardní aproximací.

### Obecný vícefaktorový model

**Nabízené množství** (*quantity supplied*) závisí na ceně $P$, cenách výrobních faktorů (práce $L$, kapitál $K$, půda $E$), očekávání $V$, počtu výrobců $O$, počasí $W$ a dalších:

$$
Q = S(P, L, K, E, V, O, W, \ldots). \tag{2.7}
$$

Funkce se nazývá **funkce nabídky** (*supply function*) v širším slova smyslu.

### Jednofaktorový model

V nejpřirozenějším jednofaktorovém modelu

$$
Q = S(P), \qquad \text{resp.} \qquad P = S(Q). \tag{2.8}
$$

Graf je **křivka nabídky** (*supply curve*).

#### Zákon rostoucí nabídky

> **Roste-li cena $P$, pak nabízené množství $Q$ roste.**

Výrobce je ochoten zvýšit produkci jen za vyšší cenu, neboť rostou mezní náklady (kap. 3). Funkce nabídky je proto rostoucí. Křivka nabídky vychází z bodu $[0, P_0]$ na svislé ose (případně z $[Q_1, P_1]$), kde $P_0$ je minimální cena, při které je výrobce ochoten vyrábět.

*Obrázek 2.9: Typická rostoucí křivka nabídky $S$ v $(Q, P)$.*

#### Lineární model nabídky

$$
P = cQ + d, \qquad c > 0. \tag{2.9}
$$

Alternativně $Q = \tfrac{1}{c}P - \tfrac{d}{c}$; znaménko koeficientu u $P$ zůstává, znaménko absolutního členu se mění.

##### Příklad 2.5

**Zadání:** Lineární nabídka $P = 0{,}5Q + 25$.

**Řešení:** Alternativní tvar $Q = 2P - 50$.

| $P$ | 30 | 35 | 40 |
| --- | --- | --- | --- |
| $Q$ | 10 | 20 | 30 |

### Posun nabídky (*shift of supply*)

Posun nastává při změně exogenních proměnných — nová technologie snižuje náklady (posun **doprava**: při stejné ceně $P_0$ vyrobí výrobce větší $Q_1 > Q_0$); zdražení vstupů posune křivku **doleva**.

*Obrázek 2.11: Původní $S$, posunuté $S_1$ (doprava) a $S_2$ (doleva) v $(Q, P)$.*

##### Příklad 2.6 — zdanění výrobce

**Zadání:** Nabídka $P = S(Q)$; na výrobce je uložena jednotková daň $T$.

**Řešení:** Spotřebitel zaplatí $P$, výrobce obdrží $P - T$. Z podmínky $P - T = S(Q)$ plyne

$$
P = S_1(Q) = S(Q) + T.
$$

Křivka $S$ se tedy posune o $T$ **svisle nahoru** (tj. doleva). Např. pro $P = 2Q$ a $T = 6$ je $S_1: P = 2Q + 6$.

*Obrázek 2.12: Posun nabídky o $T$ svisle nahoru.*

---

## Tržní rovnováha

> [!info] TL;DR
> V **rovnovážném bodě** $E[Q^E, P^E]$ se poptávané a nabízené množství rovnají. Najde se jako řešení soustavy $P = D(Q)$, $P = S(Q)$. Čtyři **pravidla komparativní statiky** popisují, jak se $E$ posune při změně poptávky nebo nabídky.

### Definice

**Tržní rovnováha** (*market equilibrium*) je stav, kdy poptávané množství = nabízené množství. Při **rovnovážné ceně** $P^E$ není přebytek ani nedostatek zboží. Bod $E[Q^E, P^E]$ se nazývá **rovnovážný bod** (*equilibrium point*).

Rovnovážný bod je průsečíkem křivek poptávky a nabídky; nalézá se jako řešení soustavy $P = D(Q)$, $P = S(Q)$.

![[imek-poptavka-nabidka-rovnovaha.jpeg|D, S a rovnovážný bod E]]

*Obrázek 2.13: Klesající $D$ a rostoucí $S$ v rovině $(Q, P)$ protínající se v $E[Q^E, P^E]$.*

### Příklad 2.7 (kvadratický model)

**Zadání:** Poptávka $P = -Q^2 - 10Q + 150$, nabídka $P = Q^2 + 14Q + 22$.

**Řešení:** Z rovnosti

$$
-Q^2 - 10Q + 150 = Q^2 + 14Q + 22
$$

dostaneme $2Q^2 + 24Q - 128 = 0$, resp. $Q^2 + 12Q - 64 = 0$. Kořeny jsou $-16$ (nevyhovuje) a $4$. Tedy $Q^E = 4$, $P^E = -16 - 40 + 150 = 94$, rovnovážný bod $E[4, 94]$.

### Příklad 2.8 (dvoukomoditní trh)

**Zadání:** Poptávky a nabídky dvou zboží

$$
\begin{aligned}
Q_1 &= 40 - 5P_1 - P_2, & Q_2 &= 50 - 2P_1 - 4P_2, \\
Q_1 &= -3 + 4P_1, & Q_2 &= -7 + 3P_2.
\end{aligned}
$$

**Řešení:** Z rovností poptávek a nabídek dostaneme

$$
9P_1 + P_2 = 43, \qquad 2P_1 + 7P_2 = 57.
$$

Řešením je $P_1^E = 4$, $P_2^E = 7$; zpětným dosazením $Q_1^E = 13$, $Q_2^E = 14$. Zboží jsou **komplementy** (zkřížené koeficienty v poptávce jsou záporné).

### Dynamický model — pavučinový teorém

Rovnovážná cena se obecně liší od tržní ceny, která vzniká působením tržních sil v čase. Za podmínky stability se tržní cena přibližuje k $P^E$; mechanismus popisuje **teorém pavučiny** (*cobweb model*).

### Pravidla komparativní statiky (1–4)

![[imek-komparativni-statika-4pripady.jpeg|2×2 matice 4 případů komparativní statiky: D ↑/↓ × S ↑/↓ a výsledné změny Q^E, P^E]]

> **Pravidlo 1:** Růst poptávky ⟹ růst $P^E$ i $Q^E$.
>
> **Pravidlo 2:** Pokles poptávky ⟹ pokles $P^E$ i $Q^E$.
>
> **Pravidlo 3:** Růst nabídky ⟹ pokles $P^E$, růst $Q^E$.
>
> **Pravidlo 4:** Pokles nabídky ⟹ růst $P^E$, pokles $Q^E$.

| Změna | $P^E$ | $Q^E$ |
| --- | --- | --- |
| Růst poptávky | ↑ | ↑ |
| Pokles poptávky | ↓ | ↓ |
| Růst nabídky | ↓ | ↑ |
| Pokles nabídky | ↑ | ↓ |

*Obrázky 2.15–2.18 ilustrují všechny čtyři situace pomocí posunu jedné z křivek.*

---

## Zdanění trhu

> [!info] TL;DR
> Jednotková daň $T$ uložená na každou prodanou jednotku způsobí posun jedné z křivek o $T$. **Daňové břemeno** se dělí mezi spotřebitele ($T_{sp}$) a výrobce ($T_{vyr}$). Klíčová vlastnost — **ekvivalence zdanění**: výsledné rovnovážné množství i čistá cena pro výrobce jsou stejné bez ohledu na to, zda je daň uložena výrobci, či spotřebiteli.
>
> *Pro detail, úplné odvození, Příklady 2.9 a 2.10 a geometrickou interpretaci viz [[zdaneni-trhu]].*

Existují dvě formy zdanění — daň uložená **výrobci** (posun nabídky $S_1 = S + T$ svisle nahoru) a daň uložená **spotřebiteli** (posun poptávky $D_2 = D - T$ svisle dolů). V obou případech nové rovnovážné množství $Q^E$ klesá a vzniká rozklad daně $T = T_{sp} + T_{vyr}$ mezi obě strany trhu, určený relativními sklony křivek $D$ a $S$.

Zásadním výsledkem kapitoly je **věta o ekvivalenci zdanění**: ať je daň uvalena formálně na kohokoli, rovnovážné množství i reálné rozdělení břemene jsou identické — $Q_1^E = Q_2^E$ a $P_1^E - T = P_2^E$. Otázka, "kdo má platit daň", je tedy z hlediska trhu formální; skutečné rozdělení určuje struktura trhu, nikoli znění zákona.

Podrobný výklad, Příklady **2.9** (daň výrobci, $T_{sp} = 2$ Kč, $T_{vyr} = 4$ Kč) a **2.10** (táž daň, ale na spotřebitele), postup výpočtu rozkladu břemene a **Obrázky 2.17–2.21** jsou na samostatné stránce [[zdaneni-trhu]].

---

## Multiplikátory pro mikroekonomické proměnné

> [!info] TL;DR
> Multiplikátory jsou **parciální derivace redukovaného tvaru** endogenní proměnné podle exogenních parametrů. Udávají přibližnou odezvu rovnovážného bodu na jednotkovou změnu parametru (*ceteris paribus*). Kvalitativní smysl (znaménko) je invariantní, kvantitativní závisí na konkrétních hodnotách.

### Redukovaný tvar

Pro lineární model $P = aQ + b$ ($a < 0$, $b > 0$) a $P = cQ + d$ ($c > 0$) dává podmínka rovnováhy $aQ + b = cQ + d$, odkud

$$
Q^E = \frac{b - d}{c - a}. \tag{2.10}
$$

Vztah (2.10) je **redukovaný tvar** (*reduced form*) pro $Q^E$: endogenní proměnná je vyjádřena pomocí exogenních **parametrů** $a, b, c, d$. Aby $E$ ležel v 1. kvadrantu, musí platit $b > d$ (neboť $c - a > 0$).

*Obrázek 2.22: Lineární poptávka (úsek $b$ na ose $P$) a nabídka (úsek $d$), $b > d$, rovnovážný bod $E$ v 1. kvadrantu.*

### Definice multiplikátorů

V komparativní statice jsou $a, b, c, d$ exogenní proměnné a $Q$ endogenní. Přibližná změna $Q$ se rovná totálnímu diferenciálu:

$$
\Delta Q \approx dQ = Q'_a\,da + Q'_b\,db + Q'_c\,dc + Q'_d\,dd. \tag{2.11}
$$

Parciální derivace $Q'_a, Q'_b, Q'_c, Q'_d$ se nazývají **multiplikátory** (*multipliers*):

$$
Q'_a = \frac{b - d}{(c - a)^2}, \quad Q'_b = \frac{1}{c - a}, \quad Q'_c = -\frac{b - d}{(c - a)^2}, \quad Q'_d = -\frac{1}{c - a}. \tag{2.12}
$$

### Znaménka a interpretace

Za podmínek $a < 0$, $b > 0$, $c > 0$, $b > d$ platí (znaménka se **nemění**):

$$
Q'_a > 0, \qquad Q'_b > 0, \qquad Q'_c < 0, \qquad Q'_d < 0.
$$

- **Kvantitativní smysl:** $Q'_x$ udává, o kolik přibližně vzroste $Q^E$ při jednotkové změně parametru $x$, *ceteris paribus*.
- **Kvalitativní smysl:** znaménko určuje směr reakce $Q^E$ na růst $x$.

Např. růst $c$ (strmější nabídka) ⟹ pokles $Q^E$ (neboť $Q'_c < 0$).

*Obrázek 2.23: Pootočení přímky nabídky z $cQ + d$ na strmější $c_1 Q + d$ (při $c_1 > c$) — rovnovážný bod se posouvá vlevo, $Q^E \downarrow$.*

Při změně jediné proměnné se (2.11) redukuje např. na $\Delta Q \approx Q'_b\,db$. Analogicky lze odvodit multiplikátory pro $P^E$.

### Příklad 2.11 — komparativní statika pro $Q^E$

**Zadání:** Poptávka $P = -3Q + 40$, nabídka $P = 0{,}5Q + 10$.

**Řešení:** Rovnovážné množství

$$
Q^E = \frac{b - d}{c - a} = \frac{40 - 10}{0{,}5 - (-3)} = \frac{30}{3{,}5} \approx 8{,}571.
$$

**(a) Změna $c$ z $0{,}5$ na $0{,}6$ (ceteris paribus).** Dle (2.12):

$$
Q'_c\,dc = -\frac{b - d}{(c - a)^2}\,dc = -\frac{30}{3{,}5^2}\cdot 0{,}1 \approx -0{,}245.
$$

Nové rovnovážné množství $Q_1^E \approx 8{,}571 - 0{,}245 = 8{,}326$.

**(b) Současné změny $da = 0{,}5$, $db = -5$, $dc = 0{,}1$, $dd = 1$.** Dosazením do (2.11):

$$
\begin{aligned}
\Delta Q &\approx \frac{30}{3{,}5^2}\cdot 0{,}5 + \frac{1}{3{,}5}\cdot(-5) - \frac{30}{3{,}5^2}\cdot 0{,}1 - \frac{1}{3{,}5}\cdot 1 \\
&= 1{,}2245 - 1{,}4286 - 0{,}2449 - 0{,}2857 \\
&\approx -0{,}735.
\end{aligned}
$$

Tedy $Q_1^E \approx 8{,}571 - 0{,}735 = 7{,}836$.

> [!warning] Pozn. — oprava
> V knize je u této dílčí úlohy uvedena hodnota $\Delta Q \approx -2{,}69$, ta však neodpovídá přepočtu parciálních derivací podle (2.11) a (2.12). Správná hodnota při uvedených změnách je $\Delta Q \approx -0{,}735$. Výsledek byl v této wiki opraven.

Princip multiplikátorů lze uplatnit na libovolné ekonomické proměnné — analogicky v makroekonomii (kap. 7).

---

## Přebytek spotřebitele a výrobce

> [!info] TL;DR
> **Přebytek spotřebitele** ($CS$) a **přebytek výrobce** ($PS$) jsou míry čistého prospěchu stran trhu, definované pomocí určitého integrálu a geometricky odpovídající plochám mezi rovnovážnou cenou a příslušnou křivkou. Podrobný výklad je na samostatné stránce [[prebytek-spotrebitele-vyrobce]].

![[imek-prebytky-cs-ps.jpeg|přebytek spotřebitele a výrobce]]

**Přebytek spotřebitele** (*consumer surplus*) — rozdíl mezi ochotou platit a skutečnou platbou:

$$
CS(Q_0) = \int_0^{Q_0} D(Q)\,dQ - P_0\,Q_0. \tag{2.14}
$$

**Přebytek výrobce** (*producer surplus*) — rozdíl mezi tržbou a minimální cenou:

$$
PS(Q_0) = P_0\,Q_0 - \int_0^{Q_0} S(Q)\,dQ. \tag{2.15}
$$

Geometricky jde o plochy mezi rovnovážnou cenou a příslušnou křivkou; výpočet využívá aparát [[integral|určitého integrálu]].

---

## Příklady z knihy — přehled

- **Příklad 2.1** — lineární poptávka $P = -2Q + 60$, alternativní tvar, cenové rozpětí.
- **Příklad 2.2** — empirické křivky poptávky po cukru (rodina vs. trh).
- **Příklad 2.3** — posun poptávky při zdanění kupujícího.
- **Příklad 2.5** — lineární nabídka $P = 0{,}5Q + 25$.
- **Příklad 2.6** — posun nabídky při zdanění výrobce.
- **Příklad 2.7** — kvadratická rovnováha, $E[4, 94]$.
- **Příklad 2.8** — dvoukomoditní trh, soustava rovnic, komplementy.
- **Příklad 2.9** — daň $T = 6$ na výrobce; rozklad $T_{sp} = 2$, $T_{vyr} = 4$. (Viz [[zdaneni-trhu]].)
- **Příklad 2.10** — daň $T = 6$ na spotřebitele; stejné čisté ceny i množství. (Viz [[zdaneni-trhu]].)
- **Příklad 2.11** — komparativní statika, multiplikátory, změny parametrů.

---

## Úlohy k samostatnému řešení

### Základní analýza poptávky

**2.1** Je dána poptávka $Q = D(P) = 75 - 5P$. (a) Načrtněte křivku poptávky. (b) Stanovte reálné cenové rozpětí. (c) Vypočtěte množství při cenách $0, 5, 10, 15$ a výsledky vyznačte na křivku poptávky.

**2.2** Ověřte, že uvedené funkce vyjadřují (s případným omezením pro $P, Q$) poptávku (využijte testu na zápornost derivace), charakterizujte tvar křivky poptávky a vyjádřete ve tvaru poptávky v alternativním tvaru ($a, b, c > 0$):

- (a) $Q = \dfrac{a}{P + c}$
- (b) $Q = \sqrt{a - bQ}$
- (c) $Q = \dfrac{a - \sqrt{P}}{b}$
- (d) $P = a - bQ^2$
- (e) $Q = bP^{-a} + c$
- (f) $Q = a \cdot e^{-bP}$

**2.3** Rozhodněte, jak se změní křivka poptávky, jestliže se zvýší (ceteris paribus):

- (a) Cena substitutu.
- (b) Cena komplementu.
- (c) Výdaje na reklamu.

**2.4** Je dána poptávka $P = D(Q) = 12 - 2Q$. Najděte novou poptávku $P = D^*(Q)$, na kterou se změní původní poptávka v důsledku uložení daně 6 Kč na kupujícího na každou jednotku zboží. Graficky interpretujte.

**2.5** Pro zadané dvojice funkcí rozhodněte, zda vyjadřují funkce poptávky ve dvoukomoditním trhu dvou závislých zboží. V kladném případě určete, zda jde o substituty, resp. komplementy a specifikujte zadané proměnné:

- (a) $B_1 = 20 - 4A_1 + A_2$, $B_2 = 10 + 2A_1 - 4A_2$.
- (b) $B_1 = 50 - 10A_1 - 6A_2$, $B_2 = 15 - 10A_2$.
- (c) $B_1 = 30 - 2A_1 - 4A_2$, $B_2 = 15 + 2A_1 - 2A_2$.
- (d) $B_1 = -20 - 2A_1 + 3A_2$, $B_2 = 10 + 2A_1 - 2A_2$.
- (e) $B_1 = 20 + 2A_1 + 4A_2$, $B_2 = 40 - 3A_1 + 5A_2$.

### Základní analýza nabídky

**2.6** Je dána nabídka $P = S(Q) = 20 + 0{,}2Q$. (a) Načrtněte křivku nabídky. (b) Vypočtěte množství při cenách $25, 30, 35$ a vyznačte výsledky na křivku nabídky.

**2.7** Ověřte, že zadané funkce vyjadřují (s případným omezením na $P, Q$) nabídku (využijte testu na kladnost derivace), charakterizujte tvar křivky nabídky a vyjádřete nabídku v alternativním tvaru:

- (a) $P = 30 + 2Q$
- (b) $Q = -3 + 12P$
- (c) $P = Q^2 + 14Q + 22$
- (d) $P = Q^2 + 2Q + 12$
- (e) $Q = 150 + 5P + 0{,}1P^2$
- (f) $Q = 7 + 0{,}1P + 0{,}004P^2$

**2.8** Rozhodněte, jak se změní křivka nabídky, jestliže se (ceteris paribus):

- (a) Sníží ceny surovin — vstupů.
- (b) Zavede nová ekologičtější technologie zvyšující výrobní náklady.
- (c) Zvýší ceny všech energií.
- (d) Sníží daňové odvody státu.

**2.9** Je dána nabídka $P = S(Q) = 0{,}5Q + 15$. Najděte novou nabídku $P = S^*(Q)$, na kterou se změní původní nabídka v důsledku uložení daně 5 Kč na výrobce na každou jednotku zboží. Graficky interpretujte.

### Tržní rovnováha

**2.10** Pro zadanou poptávku a nabídku najděte rovnovážné množství $Q^E$ a rovnovážnou cenu $P^E$:

- (a) $P = -5Q + 80$, $P = 2Q + 10$.
- (b) $Q = -0{,}5P + 25$, $Q = 2P - 50$.
- (c) $P = -4Q + 120$, $P = \tfrac{1}{3}Q + 29$.
- (d) $P = -Q^2 + 52$, $P = 2Q^2 + 10$.

**2.11** Pro zadanou poptávku a nabídku dvou závislých zboží najděte rovnovážná množství $Q_1^E, Q_2^E$ a rovnovážné ceny $P_1^E, P_2^E$ (index 1 přísluší prvnímu, index 2 druhému zboží):

- (a) $Q_1 = 10 - 2P_1 + P_2$, $Q_2 = 5 + 2P_1 - 2P_2$, $Q_1 = -3 + 2P_1$, $Q_2 = -2 + 3P_2$.
- (b) $Q_1 = 100 - 2P_1 + P_2$, $Q_2 = 5 + 2P_1 - 3P_2$, $Q_1 = -10 + P_1$, $Q_2 = 5 + 6P_2$.

**2.12** Pro tři závislá zboží jsou dány poptávky rovnicemi $Q_1 = 15 - P_1 + 2P_2 + P_3$, $Q_2 = 9 + P_1 - P_2 - P_3$, $Q_3 = 8 + 2P_1 - P_2 - 4P_3$ a nabídky rovnicemi $Q_1 = -7 + P_1$, $Q_2 = -4 + 4P_2$, $Q_3 = -5 + 2P_3$, kde $Q_i$ a $P_i$ značí příslušné množství a ceny $i$-tého zboží, $i = 1, 2, 3$. Najděte rovnovážná množství $Q_1^E, Q_2^E, Q_3^E$ a rovnovážné ceny $P_1^E, P_2^E, P_3^E$.

**2.13** Jsou dány poptávka $P = D(Q) = -4Q + 80$ a nabídka $P = S(Q) = 3Q + 10$.

- (a) Určete rovnovážné množství $Q^E$ a rovnovážnou cenu $P^E$.
- (b) Stanovte, jak se změní poptávka a nabídka, jestliže vláda uloží výrobci daň $T = 7$ Kč na každou jednotku zboží, vypočtěte nové rovnovážné množství $Q_1^E$ a novou rovnovážnou cenu $P_1^E$ a určete, kolik z daňového zatížení zaplatí výrobce a kolik spotřebitel.
- (c) Stanovte, jak se změní poptávka a nabídka, jestliže vláda uloží spotřebiteli daň $T = 7$ Kč na každou jednotku zboží, vypočtěte nové rovnovážné množství $Q_2^E$ a novou rovnovážnou cenu $P_2^E$ a určete, kolik z daňového zatížení zaplatí výrobce a kolik spotřebitel.
- (d) Proveďte analýzu dopadu daňového zatížení na spotřebitele a výrobce vyplývající z výsledků (b) a (c).

Viz též [[zdaneni-trhu]].

### Multiplikátory pro mikroekonomické proměnné

**2.14** Jsou dány poptávka $P = aQ + b = -2Q + 50$ a nabídka $P = cQ + d = 0{,}6Q + 20$.

- (a) Určete rovnovážné množství $Q^E$ a rovnovážnou cenu $P^E$.
- (b) Určete hodnoty multiplikátorů pro zadané parametry.
- (c) Určete přibližnou změnu rovnovážného množství $Q^E$ odpovídající změně $a$ z $-2$ na $-3$ (ceteris paribus) a stanovte nové rovnovážné množství $Q_1^E$.
- (d) Určete přibližnou změnu rovnovážného množství $Q^E$ odpovídající změně $b$ z 50 na 60 (ceteris paribus) a stanovte nové rovnovážné množství $Q_2^E$.
- (e) Určete přibližnou změnu rovnovážného množství $Q^E$ odpovídající změně $c$ z $0{,}6$ na $0{,}8$ (ceteris paribus) a stanovte nové rovnovážné množství $Q_3^E$.
- (f) Určete přibližnou změnu rovnovážného množství $Q^E$ odpovídající změně $d$ z 20 na 10 (ceteris paribus) a stanovte nové rovnovážné množství $Q_4^E$.
- (g) Určete přibližnou změnu rovnovážného množství $Q^E$ odpovídající změnám $a$ o 1, $b$ o $-10$, $c$ o $0{,}1$ a $d$ o $-10$ vzhledem k zadaným hodnotám a stanovte nové rovnovážné množství $Q_5^E$.

**2.15** Jsou dány poptávka $P = aQ + b$ a nabídka $P = cQ + d$.

- (a) Odvoďte redukovaný tvar pro $P$. Stanovte podmínky pro $a, b, c, d$ tak, aby rovnovážný bod $E[Q^E, P^E]$ patřil do 1. kvadrantu (využijte obrázku 2.22).
- (b) Vypočtěte multiplikátory pro $P$ a určete jejich znaménka (ověřte geometricky užitím obrázků 2.22, 2.23).
- (c) Pro hodnoty parametrů $a = -2$, $b = 40$, $c = 0{,}5$, $d = 10$ určete rovnovážnou cenu $P^E$ a hodnoty multiplikátorů pro $P$.
- (d) Určete přibližnou změnu rovnovážné ceny $P^E$ odpovídající změně $a$ o 5 (ceteris paribus) a stanovte novou rovnovážnou cenu $P_1^E$.
- (e) Určete přibližnou změnu rovnovážné ceny $P^E$ odpovídající poklesu $a$ o 1 a stanovte novou rovnovážnou cenu $P_2^E$.
- (f) Určete přibližnou změnu rovnovážné ceny $P^E$ odpovídající změnám $a$ na 35, $c$ na $0{,}7$ a $d$ na 12 vzhledem k hodnotám dle (d) a stanovte novou rovnovážnou cenu $P_3^E$.

**2.16** Jsou dány poptávka $P = a + bQ^2$ a nabídka $P = c + dQ^2$, kde $a, c, d > 0$ a $b < 0$.

- (a) Odvoďte redukovaný tvar pro $Q$. Načrtněte křivky poptávky a nabídky a stanovte podmínky, aby rovnovážný bod $E[Q^E, P^E]$ patřil do 1. kvadrantu.
- (b) Vypočtěte multiplikátory pro $Q$ a určete jejich znaménka (ověřte geometricky užitím obrázků v (b)).
- (c) Pro hodnoty parametrů $a = 100$, $b = -1$, $c = 20$, $d = 1$ určete rovnovážné množství $Q^E$ a hodnoty multiplikátorů pro $Q$.
- (d) Určete přibližnou změnu rovnovážného množství $Q^E$ odpovídající změně $a$ na 110 (ceteris paribus) a stanovte nové rovnovážné množství $Q_1^E$.
- (e) Určete přibližnou změnu rovnovážného množství $Q^E$ odpovídající změně $c$ na 25 (ceteris paribus) a stanovte nové rovnovážné množství $Q_2^E$.
- (f) Určete přibližnou změnu rovnovážného množství $Q^E$ odpovídající změnám $a$ na 110, poklesu $b$ na $-2$, růstu $c$ na 25 a růstu $d$ na 2 vzhledem k hladině dle (d) a stanovte nové rovnovážné množství $Q_3^E$.
- (i) Vypočtěte multiplikátory pro $P$ a určete jejich znaménka (ověřte geometricky užitím obrázků v (b)).
- (j) Pro hodnoty parametrů dle (b) určete rovnovážnou cenu $P^E$ a hodnoty multiplikátorů pro $P$, přibližnou změnu rovnovážné ceny $P^E$ odpovídající změně $a$ na $-3$ (ceteris paribus) vzhledem k hladině dle (d) a stanovte novou rovnovážnou cenu $P_1^E$.
- (k) Určete přibližnou změnu rovnovážné ceny $P^E$ odpovídající změně $a$ na 2 (ceteris paribus) vzhledem k hladině dle (d) a stanovte novou rovnovážnou cenu $P_2^E$.
- (l) Určete přibližnou změnu rovnovážné ceny $P^E$ odpovídající poklesu $a$ na 90, poklesu $b$ na $-3$, růstu $c$ na 30 a růstu $d$ na 2 vzhledem k hladině dle (d) a stanovte novou rovnovážnou cenu $P_3^E$.

### Přebytek spotřebitele a výrobce

**2.17** Jsou dány poptávka $P = D(Q) = 35 - Q^2$ a nabídka $P = S(Q) = 3 + Q^2$.

- (a) Vypočtěte přebytek spotřebitele při množství 4.
- (b) Vypočtěte přebytek výrobce při množství 4.

**2.18** Jsou dány poptávka $P = D(Q) = 18 - 2Q$ a nabídka $P = S(Q) = 3 + Q^2$.

- (a) Vypočtěte rovnovážné množství $Q^E$.
- (b) Vypočtěte přebytek spotřebitele při rovnovážném množství.
- (b) Vypočtěte přebytek výrobce při rovnovážném množství.
- (c) Graficky interpretujte.

---

## Otázky k sebehodnocení

1. Jaký je rozdíl mezi jednofaktorovým a vícefaktorovým modelem poptávky?
2. Vyjádřete (vícefaktorovou) funkci poptávky. Jakou má vlastnost?
3. Definujte funkci poptávky (jednofaktorovou). Jaká je její základní vlastnost? Zdůvodněte.
4. Definujte Engelovu funkci. Na čem závisí tvar příslušné Engelovy křivky?
5. Jaký charakter má odezva poptávky na změnu některé z exogenních proměnných?
6. Definujte funkci nabídky. Jaká je její základní vlastnost? Zdůvodněte.
7. Co znamená tržní rovnováha? Čím je reprezentována?
8. Jak se určí rovnovážné množství a rovnovážná cena?
9. Jaká jsou pravidla pro změnu rovnovážného bodu jako odezvy na posun poptávky, resp. nabídky?
10. K čemu slouží multiplikátory?
11. Jak se najde redukovaný tvar pro vybranou rovnovážnou veličinu?
12. Jak se vypočtou multiplikátory? Mění se jejich znaménka?
13. Co se rozumí přebytkem spotřebitele? Jak se vypočte?
14. Co se rozumí přebytkem výrobce? Jak se vypočte?

---

## Klíčové pojmy

**Poptávka**
- **Poptávané množství** (*quantity demanded*), **funkce poptávky** $Q = D(P)$, **křivka poptávky**
- **Zákon klesající poptávky** — substituční + důchodový efekt
- **Reálné cenové rozpětí** $(0, P_0)$
- **Homogenita poptávky** (vícefaktorový model)
- **Lineární poptávka** $P = aQ + b$, $a < 0$, $b > 0$ — nedokonalá konkurence
- **Dokonalá konkurence** — $P = P^*$
- **Giffenův statek** — rostoucí křivka poptávky (důchodový efekt > substituční)
- **Engelova funkce** $Q = E(Y)$, **Engelova křivka**
- **Normální** (nezbytné / luxusní) vs. **podřadné** zboží
- **Substituty** a **komplementy** — znaménka zkřížených koeficientů
- **Dvoukomoditní trh** (2.6)
- **Posun poptávky** (*shift of demand*)

**Nabídka**
- **Nabízené množství** (*quantity supplied*), **funkce nabídky** $Q = S(P)$, **křivka nabídky**
- **Zákon rostoucí nabídky**
- **Lineární nabídka** $P = cQ + d$, $c > 0$
- **Posun nabídky** (*shift of supply*)

**Rovnováha a komparativní statika**
- **Tržní rovnováha** (*market equilibrium*), **rovnovážná cena** $P^E$, **rovnovážné množství** $Q^E$, **rovnovážný bod** $E[Q^E, P^E]$
- **Pravidla 1–4** komparativní statiky
- **Teorém pavučiny** (*cobweb model*)

**Zdanění**
- **Zdanění** — daň výrobci ($S_1 = S + T$) vs. daň spotřebiteli ($D_2 = D - T$)
- **Daňové břemeno** $T_{sp}$, $T_{vyr}$
- **Ekvivalence zdanění** $Q_1^E = Q_2^E$, $P_1^E - T = P_2^E$

**Multiplikátory**
- **Redukovaný tvar** $Q^E = (b - d)/(c - a)$
- **Parametry** $a, b, c, d$ — exogenní proměnné
- **Endogenní / exogenní proměnná**
- **Multiplikátor** — parciální derivace redukovaného tvaru
- **Komparativní statika**, **ceteris paribus**
- **Diferenciál** $dQ$ (2.11)

**Přebytky a ostatní**
- **Přebytek spotřebitele** $CS$ (2.14), **přebytek výrobce** $PS$ (2.15)
- **Homo economicus**, **Marshallova formulace** (1890)

---

## Navigace

- **Související témata:** [[zdaneni-trhu|Zdanění trhu]] (dopady daně, daňové břemeno, ekvivalence), [[prebytek-spotrebitele-vyrobce|Přebytek spotřebitele a výrobce]], [[derivace|Derivace]] (zákon klesající/rostoucí, monotonie), [[integral|Integrál]] (CS a PS), [[funkce-vice-promennych|Funkce více proměnných]] (vícefaktorové modely, multiplikátory), [[lagrangeova-metoda|Lagrangeova metoda]] (optimalizace spotřebitele), [[elasticita|Elasticita]] (důchodová a cenová citlivost), [[prijem-naklady-zisk|Příjem, náklady, zisk]]
- **Shrnutí přednášek:** [[imek-blok-01|KS — 1. blok]]
- **Kurz:** [[imek|Matematická ekonomie]]
