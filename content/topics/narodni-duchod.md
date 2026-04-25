---
title: "Národní důchod — makroekonomické modely C-I, C-I-G, C-I-G-X, IS-LM"
course: imek
type: topic
tags: [narodni-duchod, makroekonomie, gnp, spotreba, uspory, mpc, mps, ci-model, cig-model, cigx-model, is-lm, multiplikator]
sources: [raw/imek/kniha_scanned/, raw/imek/KS_treti_blok.pdf]
created: 2026-04-22
updated: 2026-04-22
---

# Národní důchod

## TL;DR

Kapitola 7 [[imek|Matematické ekonomie]] **přechází z mikroekonomie do makroekonomie**: předmětem zkoumání už není jedna firma, ale celá národní ekonomika popsaná **národním důchodem** $Y$. Budují se postupně bohatší modely — **C-I** (jen spotřeba a investice) → **C-I-G** (přidá vládu a zdanění) → **C-I-G-X** (otevře ekonomiku o čistý export) → **IS-LM** (propojí trh zboží s trhem peněz přes úrokovou míru). V každém modelu hledáme **rovnovážný důchod** $Y^E$ jako řešení soustavy lineárních rovnic; citlivost $Y^E$ na exogenní veličiny popisují **multiplikátory** (zejména Keynesův multiplikátor investic $1/(1-a) = 1/MPS$).

> [!info] Intuice
> **Makroekonomie je zrcadlovým obrazem mikroekonomie** na úrovni celé ekonomiky. Mezní sklon ke spotřebě $MPC$ je „ta část dodatečné korunky důchodu, kterou domácnost utratí“; zbytek $MPS = 1 - MPC$ jde na úspory. Keynesův multiplikátor vyjadřuje, že jedna koruna navíc v investicích zvedne důchod o víc než korunu — utracená koruna se stane něčím důchodem, ten z ní část utratí, atd. (geometrická řada $1 + a + a^2 + \dots = 1/(1-a)$). **IS-LM** popisuje dva trhy zároveň: IS je rovnováha na trhu zboží (investice = úspory), LM je rovnováha na trhu peněz (poptávka = nabídka); společný bod určuje, při jakém páru $(Y, r)$ jsou oba trhy v rovnováze současně.

## Úvod — cílové znalosti kapitoly 7

Po prostudování kapitoly by čtenář měl umět:

- popsat zjednodušený model národní ekonomiky,
- formulovat pojmy funkcí spotřeby a úspor spolu s jejich základními vlastnostmi,
- popsat lineární model spotřeby a úspor,
- stanovit mezní sklony ke spotřebě a úsporám,
- vymezit pojem makroekonomické rovnováhy ve vztahu k agregátní poptávce a nabídce,
- vyložit pojmy křivek agregátní poptávky, agregátní nabídky a rovnovážného bodu,
- popsat modely $C\text{-}I$, $C\text{-}I\text{-}G$, $C\text{-}I\text{-}G\text{-}X$ a $IS\text{-}LM$ národních ekonomik a vypočítat rovnovážné veličiny,
- formulovat a stanovit základní makroekonomické multiplikátory.

## GNP a národní důchod

**Hrubý národní produkt** $GNP$ (*gross national product*) vyjadřuje hodnotu (v peněžních jednotkách) finálních statků a služeb vytvořených ekonomikou během daného období (obvykle jednoho roku). Je základním ukazatelem výkonnosti národní ekonomiky:

$$GNP = C + I + G + X, \qquad (7.1)$$

kde

- $C$ — výdaje domácností na spotřebu,
- $I$ — hrubé domácí investice,
- $G$ — vládní výdaje,
- $X$ — čistý export.

K měření $GNP$ se užívá **důchodová metoda**. Jejím hlavním konstrukčním prvkem je **národní důchod** $Y$ (*national income*) — součet důchodů všech vrstev domácností, tj. tok důchodů od firem k domácnostem jako platba za pronájem výrobních faktorů.

Pro tvorbu základních makroekonomických modelů se zjednodušeně ztotožňuje hrubý národní produkt s národním důchodem (rovněž s agregátní poptávkou):

$$GNP \approx Y,$$

a užívá se společného názvu **důchod** (*income*) s označením $Y$. Domácnosti důchod použijí ke **spotřebě** zboží a služeb nebo ke tvorbě **úspor**.

## Spotřeba a úspory

### Funkce spotřeby a úspor

Jak spotřeba $C$, tak úspory $S$ závisejí na důchodu $Y$:

$$C = C(Y), \qquad S = S(Y).$$

$C(Y)$ je **funkce spotřeby** (*consumption function*), $S(Y)$ je **funkce úspor** (*savings function*); jejich grafy se nazývají **křivka spotřeby** a **křivka úspor**. Platí základní identita

$$Y = C + S = C(Y) + S(Y). \qquad (7.2)$$

Známe-li jednu z funkcí, je tím určena i druhá. Obě funkce jsou rostoucí (s růstem důchodu roste spotřeba i úspory).

### Lineární model spotřeby a úspor

Nejjednodušší model předpokládá lineární tvar

$$C = C(Y) = aY + b, \qquad (7.3)$$

kde $b > 0$ a $0 < a < 1$. Směrnice $a = \mathrm{tg}\,\alpha = \Delta C / \Delta Y$: vzroste-li důchod o jednotku, spotřeba vzroste o méně než 1 (část „dodatečné jednotky“ jde na úspory). Domácnost v tomto modelu nevydává na spotřebu víc, než kolik dostala navíc — pokud by čerpala víc, musela by sáhnout do úspor; toto je reálné zejména pro malé $Y$.

*Obrázek 7.1 — Přímka spotřeby $C = aY + b$ se směrnicí $a = \mathrm{tg}\,\alpha = \Delta C/\Delta Y$; znázornění $\Delta C$ při jednotkovém přírůstku $\Delta Y = 1$.*

Dosazením do (7.2) plyne **lineární model úspor**:

$$S = Y - C(Y) = Y - (aY + b) = (1 - a)Y - b. \qquad (7.4)$$

Úspory jsou také lineární a „pomalu rostoucí“ (protože $0 < 1 - a < 1$).

*Obrázek 7.2 — Přímky $C = aY + b$ a $S = (1-a)Y - b$. Přímka úspor protíná osu $Y$ v bodě $Y = b/(1-a)$ a osu $C, S$ v bodě $-b$.*

### Příklad 7.1

Pro spotřebu $C = 0{,}4Y + 10$ jsou úspory

$$S = Y - C = Y - 0{,}4Y - 10 = 0{,}6Y - 10.$$

*Obrázek 7.3 — Přímky $C = 0{,}4Y + 10$ a $S = 0{,}6Y - 10$; průsečík přímky úspor s osou $Y$ je $\approx 16{,}\bar{6}$, s osou $C, S$ je $-10$; přímka spotřeby prochází bodem $(0, 10)$.*

Funkce úspor může nabývat záporných hodnot — pro $Y = 0$ je $S(0) = -b < 0$; hovoří se o **autonomních úsporách** (*autonomous savings*). Analogicky $C(0) = b$ je **autonomní spotřeba** (*autonomous consumption*) — spotřeba při nulovém důchodu krytá dřívějšími úsporami.

## Mezní sklon ke spotřebě (MPC) a k úsporám (MPS)

**Mezní sklon ke spotřebě** $MPC$ (*marginal propensity to consume*) je derivace spotřeby podle důchodu:

$$MPC = \frac{\mathrm{d}C}{\mathrm{d}Y}.$$

**Mezní sklon k úsporám** $MPS$ (*marginal propensity to save*) je derivace úspor podle důchodu:

$$MPS = \frac{\mathrm{d}S}{\mathrm{d}Y}.$$

Z (7.2) plyne $\frac{\mathrm{d}Y}{\mathrm{d}Y} = \frac{\mathrm{d}C}{\mathrm{d}Y} + \frac{\mathrm{d}S}{\mathrm{d}Y}$, a tedy

$$\boxed{MPC + MPS = 1, \qquad MPS = 1 - MPC.} \qquad (7.5)$$

**Pro lineární model** $C = aY + b$ vychází $MPC = a$ a $MPS = 1 - a$ — tedy směrnice přímek spotřeby a úspor.

**Interpretace diferenciálem.** Pro pevné $Y = Y^*$ udává $MPC(Y^*)$ přibližnou změnu spotřeby při jednotkovém přírůstku důchodu:

$$\Delta C \approx \mathrm{d}C = C'(Y)\,\mathrm{d}Y = MPC(Y)\,\mathrm{d}Y.$$

Analogicky $\Delta S \approx MPS(Y)\,\mathrm{d}Y$. Viz [[derivace|derivace]] a její ekonomická interpretace.

### Příklad 7.2

Pro spotřebu $C = 0{,}001Y^2 + 0{,}2Y + 50$ (pro $Y < 400$) platí

$$MPC = \frac{\mathrm{d}C}{\mathrm{d}Y} = 0{,}002Y + 0{,}2,$$

$$MPS = 1 - MPC = -0{,}002Y + 0{,}8.$$

- $MPC(100) = 0{,}4$, $MPS(100) = 0{,}6$ — při $Y = 100$ je **větší sklon k úsporám**.
- $MPC(200) = 0{,}6$, $MPS(200) = 0{,}4$ — při $Y = 200$ je **větší sklon ke spotřebě**.
- Přesně při $Y = 150$ se oba sklony rovnají ($MPC = MPS = 0{,}5$).

Interpretace: při $Y = 100$ se spotřeba mění $0{,}4$-krát rychleji než důchod; změní-li se důchod ze $100$ na $101$, změní se spotřeba přibližně o $0{,}4$. Skutečná změna $\Delta C = C(101) - C(100) = 0{,}401$ — aproximace diferenciálem je přesná na setiny.

Obecný trend: **s růstem důchodu se sklon ke spotřebě zvětšuje.**

## Makroekonomická rovnováha

Při modelování národní ekonomiky hraje klíčovou roli **makroekonomická rovnováha** (*macroeconomic equilibrium*) — stav, kdy se všechny trhy nacházejí v rovnováze: trh zboží a služeb, trh práce a ostatních výrobních faktorů, trh kapitálu a peněz. Významnou součástí je rovnost **agregátní poptávky** (*aggregate demand*) a **agregátní nabídky** (*aggregate supply*) — obě popisují závislost mezi cenovou hladinou a množstvím, které jsou spotřebitelé ochotni koupit (agregátními výdaji).

## Model C-I — uzavřená ekonomika bez vlády

![[imek-keynesian-kriz.jpeg|Keynesův kříž: 45° přímka Y=AE a přímka AE = aY+(b+I), rovnovážný důchod Y^E v průsečíku]]

### Zadání modelu

Nejjednodušší model uzavřené ekonomiky bez vlády obsahuje jen spotřebu $C$ a investice $I$. Podmínka rovnováhy:

$$Y = C + I. \qquad (7.6)$$

### Soustava rovnic

Pro pevně zadané (plánované) investice $I = I^*$ a funkci spotřeby $C = C(Y)$ dostáváme soustavu

$$\begin{aligned} Y &= C + I^*, \\ C &= C(Y), \end{aligned} \qquad (7.7)$$

jejímž řešením jsou **rovnovážný důchod** $Y^E$ a **rovnovážná spotřeba** $C^E$.

### Výpočet $Y^E$

Pro lineární spotřebu $C = aY + b$ plyne z (7.7) rovnice $Y = aY + b + I^*$, odkud **redukovaný tvar**

$$\boxed{\,Y^E = \frac{b + I^*}{1 - a}.\,}$$

### Příklad 7.3

V modelu $C\text{-}I$ je $C = 0{,}6Y + 10$ a $I = 12 = I^*$. Soustava

$$\begin{aligned} Y &= C + 12, \\ C &= 0{,}6Y + 10, \end{aligned}$$

má řešení $Y^E = 55$, $C^E = 43$ (a $S^E = 12$).

*Obrázek 7.5 — Přímky $C = Y - 12$ (rovnováha $Y = C + I$) a $C = 0{,}6Y + 10$ (funkce spotřeby) se protínají v bodě $[Y^E, C^E] = [55, 43]$.*

**Komentář k přechodu.** Model $C\text{-}I$ ignoruje stát. V praxi však stát vybírá daně a provádí vlastní výdaje, což ovlivňuje jak disponibilní důchod domácností, tak celkovou poptávku — přidáním vládního sektoru dostaneme **model $C\text{-}I\text{-}G$**.

## Model C-I-G — s vládním sektorem

### Zadání modelu

Rozšíření modelu $C\text{-}I$ o **vládní výdaje** $G$ (*government expenditure*). Podmínka rovnováhy:

$$Y = C + I + G. \qquad (7.8)$$

Stát se stává spotřebitelem, jehož „důchod“ získává **zdaněním domácností** $T$ (*taxation*). Zdanění bývá:

- úměrné důchodu: $T = T(Y) = tY$,
- fixní: $T = T^*$,
- kombinované: $T = T^* + tY$, kde $0 \le t < 1$.

> [!warning] Pozor na disponibilní důchod
> V modelu $C\text{-}I\text{-}G$ je nutné **důsledně rozlišovat dva důchody**: celkový národní důchod $Y$ (vstupuje do podmínky rovnováhy $Y = C + I + G$) a **disponibilní důchod** $Y_D = Y - T$ (na něm závisí spotřeba domácností, $C = C(Y_D)$). Záměna $Y$ a $Y_D$ ve funkci spotřeby je nejčastější zdroj chyb.

**Disponibilní důchod** (*disposable income*)

$$Y_D = Y - T$$

je to, co zbývá domácnostem po zdanění. Spotřeba je pak funkcí disponibilního důchodu: $C = C(Y_D)$.

### Soustava rovnic

Pro pevně zadané $I = I^*$, $G = G^*$ dostáváme soustavu 4 rovnic o 4 neznámých $Y, C, Y_D, T$:

$$\begin{aligned} Y &= C + I^* + G^*, \\ T &= T(Y), \\ C &= C(Y_D), \\ Y_D &= Y - T, \end{aligned} \qquad (7.9)$$

s řešeními $Y^E, C^E, T^E, Y_D^E$, případně rovnovážnými úsporami domácností $S^E = Y_D^E - C^E$.

> [!tip] Postup — jak sestavit a vyřešit soustavu C-I-G
> 1. **Zapiš všechny 4 rovnice** ze zadání: podmínku rovnováhy, daňovou funkci, funkci spotřeby, definici $Y_D$.
> 2. **Dosaď $T(Y)$ do $Y_D = Y - T$** — dostaneš $Y_D$ jako lineární funkci $Y$.
> 3. **Dosaď $Y_D(Y)$ do funkce spotřeby** — dostaneš $C$ jako lineární funkci $Y$.
> 4. **Dosaď $C(Y)$ do podmínky rovnováhy** $Y = C + I^* + G^*$ — zbývá jediná rovnice o jedné neznámé $Y$, odtud $Y^E$.
> 5. **Zpětným dosazením** dopočítej $T^E$, $Y_D^E$, $C^E$, $S^E$.

### Příklad 7.4

V modelu $C\text{-}I\text{-}G$ jsou dány $C = 0{,}9\,Y_D + 70$, $T = 0{,}2Y + 25$, $I^* = 35$, $G^* = 20$. Soustava (7.9):

$$\begin{aligned} Y &= C + 35 + 20, \\ T &= 0{,}2Y + 25, \\ C &= 0{,}9\,Y_D + 70, \\ Y_D &= Y - T. \end{aligned}$$

**Řešení.** Z definice $Y_D = Y - T = Y - (0{,}2Y + 25) = 0{,}8Y - 25$. Dosazením do spotřeby: $C = 0{,}9(0{,}8Y - 25) + 70 = 0{,}72Y + 47{,}5$. Dosazením do rovnovážné rovnice $Y = 0{,}72Y + 47{,}5 + 55$:

$$0{,}28Y = 102{,}5 \;\Longrightarrow\; Y^E = \tfrac{5125}{14} \doteq 366{,}071.$$

Rovnovážné veličiny:

- $Y^E = \tfrac{5125}{14} \doteq 366{,}071$,
- $T^E = 0{,}2\,Y^E + 25 = \tfrac{1375}{14} \doteq 98{,}214$,
- $Y_D^E = Y^E - T^E = \tfrac{3750}{14} \doteq 267{,}857$,
- $C^E = Y^E - 55 = \tfrac{4355}{14} \doteq 311{,}071$,
- $S^E = Y_D^E - C^E = -\tfrac{605}{14} \doteq -43{,}214$ (záporné — domácnosti při této kalibraci čerpají úspory).

**Komentář k přechodu.** Model $C\text{-}I\text{-}G$ stále uvažuje **uzavřenou** ekonomiku. Reálné ekonomiky dovážejí a vyvážejí zboží — otevření ekonomiky o čistý export $X = B - M$ dává **model $C\text{-}I\text{-}G\text{-}X$**.

## Model C-I-G-X — otevřená ekonomika

### Zadání modelu

Rozšíření o **čistý export** $X = B - M$, kde $B$ je hrubý export (*brutto export*) a $M$ import. Obvyklá konstrukce: import závisí (nejčastěji je úměrný) disponibilnímu důchodu:

$$M = M(Y_D).$$

Podmínka rovnováhy:

$$Y = C + I + G + B - M. \qquad (7.10\text{a})$$

### Soustava rovnic

Pro pevně zadané $I^*, G^*, B^*$ dostáváme soustavu 5 rovnic o 5 neznámých $Y, C, T, Y_D, M$:

$$\begin{aligned} C &= C(Y_D), \\ Y_D &= Y - T, \\ T &= T(Y), \\ M &= M(Y_D), \\ Y &= C + I^* + G^* + B^* - M. \end{aligned} \qquad (7.10)$$

### Příklad 7.5

Dáno: $C = 0{,}75\,Y_D + 750$, $M = 0{,}15\,Y_D$, $T = 0{,}25Y$, $I^* = 500$, $G^* = 150$, $B^* = 800$. Soustava:

$$\begin{aligned} (r1)\ & C = 0{,}75\,Y_D + 750, \\ (r2)\ & Y_D = Y - T, \\ (r3)\ & T = 0{,}25Y, \\ (r4)\ & M = 0{,}15\,Y_D, \\ (r5)\ & Y = C + 500 + 150 + 800 - M. \end{aligned}$$

Postupná substituce — z (r3) do (r2): $Y_D = Y - 0{,}25Y = 0{,}75Y$. Dosazením do (r1) a (r4):

$$(r6)\ C = 0{,}75 \cdot 0{,}75Y + 750 = 0{,}5625Y + 750,$$

$$(r7)\ M = 0{,}15 \cdot 0{,}75Y = 0{,}1125Y.$$

Dosazením do (r5):

$$Y = 0{,}5625Y + 750 + 500 + 150 + 800 - 0{,}1125Y = 0{,}45Y + 2200.$$

Odtud $0{,}55Y = 2200$, tedy $Y^E = 4000$. Rovnovážné veličiny:

- $Y^E = 4000$,
- $T^E = 0{,}25 \cdot 4000 = 1000$,
- $Y_D^E = 0{,}75 \cdot 4000 = 3000$,
- $M^E = 0{,}15 \cdot 3000 = 450$,
- $C^E = 0{,}75 \cdot 3000 + 750 = 3000$,
- $S^E = Y_D^E - C^E = 0$ (při této kalibraci domácnosti celý disponibilní důchod spotřebují).

**Komentář k přechodu.** Modely $C\text{-}I$, $C\text{-}I\text{-}G$ a $C\text{-}I\text{-}G\text{-}X$ pokládají investice za **konstantní**. To není realistické — investice závisejí na úrokové míře $r$. Přidáním trhu peněz a úrokové míry vzniká **model IS-LM**.

## 7.4 Multiplikátory pro makroekonomické proměnné

V článku [[prijem-naklady-zisk|2.4]] (mikroekonomie) byly zavedeny multiplikátory pro mikroekonomické proměnné. **Analogické úvahy dovedou k multiplikátorům pro modely makroekonomického typu**; role multiplikátorů jako nástrojů pro postižení kvalitativních a kvantitativních charakteristik chování modelů je v makroekonomických analýzách ještě **výraznější** než v mikroekonomických modelech.

![[imek-multiplikatorovy-efekt-chain.jpeg|Multiplikátorový efekt jako řetěz kol výdajů: ΔG=100 → c·100 → c²·100 → ... = 100/(1−c) = 500 (pro c=0.8)]]


V modelech $C\text{-}I$, $C\text{-}I\text{-}G$, $C\text{-}I\text{-}G\text{-}X$ se vyšetřuje vliv změn **exogenních** veličin (plánovaných investic $I^*$, vládních výdajů $G^*$, exportu $B^*$) na změny **endogenních** rovnovážných veličin ($Y^E$, $C^E$ atd.). Tyto citlivosti se vyjadřují **multiplikátory** — parciálními derivacemi rovnovážných veličin podle exogenních veličin.

### Multiplikátory v modelu C-I

Pro lineární spotřebu $C = aY + b$ dává (7.7) redukovaný tvar $Y^E = \dfrac{b + I^*}{1 - a}$. Parciální derivace:

$$\frac{\partial Y^E}{\partial a} = \frac{b + I^*}{(1 - a)^2} \qquad \text{(multiplikátor MPC)}$$

$$\frac{\partial Y^E}{\partial b} = \frac{1}{1 - a} \qquad \text{(multiplikátor autonomní spotřeby)}$$

$$\frac{\partial Y^E}{\partial I^*} = \frac{1}{1 - a} = \frac{1}{MPS} \qquad \text{(multiplikátor investic)}$$

> [!info] Intuice — proč Keynesův multiplikátor funguje
> Investice o 1 Kč se stanou něčím **důchodem**; z něj se utratí $a$ Kč (= $MPC$), to je zase něčí důchod, z něj $a^2$ Kč… Součet geometrické řady $1 + a + a^2 + \dots = \frac{1}{1-a}$. Proto jedna koruna investic navíc zvedne $Y^E$ o **více** než korunu — čím vyšší $MPC$, tím silnější multiplikační efekt.

**Multiplikátor autonomní spotřeby se rovná multiplikátoru investic** — oba činí $\tfrac{1}{1-a}$, což je standardní **Keynesův multiplikátor**. Analogicky se v modelech $C\text{-}I\text{-}G$ a $C\text{-}I\text{-}G\text{-}X$ zavádějí multiplikátory vládních výdajů, zdanění a exportu. Paralela k mikroekonomickým multiplikátorům viz [[poptavka-nabidka|poptávka a nabídka]].

## IS-LM analýza (stručný přehled)

V modelech $C\text{-}I$, $C\text{-}I\text{-}G$ a $C\text{-}I\text{-}G\text{-}X$ byly **investice konstantní** ($I = I^*$). Reálnější je předpoklad, že **investice závisejí na úrokové míře** $r$ — klesající funkce $I(r) = cr + d$ s $c < 0$. Přidáním **trhu peněz** k trhu zboží vzniká model **IS-LM** se dvěma neznámými $(Y, r)$ a dvěma rovnicemi:

- **Křivka IS** (*Investment = Savings*) — klesající přímka v rovině $(r, Y)$, odvozená z rovnováhy trhu zboží $Y = C + I$.
- **Křivka LM** (*Liquidity of Money*) — rostoucí přímka, odvozená z rovnováhy trhu peněz $M^D = M^*$, kde $M^D = k_1 Y + k_2 r + k_3$ (transakční, opatrnostní a spekulační poptávka).

**Simultánní rovnovážný bod** $E = (r^E, Y^E)$ je průsečík křivek IS a LM; určuje současně rovnovážný důchod a rovnovážnou úrokovou míru. Model slouží jako rámec pro analýzu **fiskální politiky** (posun IS) a **monetární politiky** (posun LM).

**Pro detailní odvození obou křivek, řešení Příkladu 7.6 ($Y^E = 5000$, $r^E = 5$, $C^E = 4100$, $I^E = 900$) a ekonomickou interpretaci posunů viz [[is-lm|IS-LM analýza]].**

## Shrnutí kapitoly 7

1. **Zjednodušený makroekonomický model** ztotožňuje $GNP \approx Y$ (národní důchod). Základ: $GNP = C + I + G + X$ (7.1).
2. **Spotřeba a úspory** splňují $Y = C + S$ (7.2); lineární model $C = aY + b$, $S = (1-a)Y - b$ s autonomní spotřebou $b$ a autonomními úsporami $-b$.
3. **Mezní sklony** $MPC = \mathrm{d}C/\mathrm{d}Y$, $MPS = \mathrm{d}S/\mathrm{d}Y$, vazba $MPC + MPS = 1$ (7.5). V lineárním modelu $MPC = a$, $MPS = 1 - a$.
4. **Modely národní ekonomiky** postupně bohatnou:
   - $C\text{-}I$: $Y = C + I$ (uzavřená ekonomika bez vlády), $Y^E = (b + I^*)/(1-a)$,
   - $C\text{-}I\text{-}G$: přidává vládu, zdanění $T(Y)$ a disponibilní důchod $Y_D = Y - T$,
   - $C\text{-}I\text{-}G\text{-}X$: otevírá ekonomiku čistým exportem $X = B - M$, kde $M = M(Y_D)$.
5. **Multiplikátory** (parciální derivace rovnovážných veličin podle exogenních) — klíčový **multiplikátor investic** $\partial Y^E/\partial I^* = 1/(1-a) = 1/MPS$ (Keynesův multiplikátor).
6. **IS-LM analýza** doplňuje obraz o trh peněz: investice závisejí na úrokové míře, $IS$ popisuje rovnováhu trhu zboží ($I = S$), $LM$ rovnováhu trhu peněz ($M^D = M^*$); průsečík dává $(Y^E, r^E)$.

## Klíčové pojmy

- **Hrubý národní produkt (GNP)** — $GNP = C + I + G + X$ (7.1).
- **Národní důchod $Y$** — součet důchodů domácností; v modelech $GNP \approx Y$.
- **Funkce spotřeby $C = C(Y)$** — lineární model $C = aY + b$, $0 < a < 1$, $b > 0$.
- **Funkce úspor $S = S(Y)$** — $Y = C + S$; lineární $S = (1-a)Y - b$.
- **Autonomní spotřeba/úspory** — $C(0) = b$, $S(0) = -b$.
- **Mezní sklon ke spotřebě $MPC = \mathrm{d}C/\mathrm{d}Y$** (v lineárním modelu $MPC = a$).
- **Mezní sklon k úsporám $MPS = \mathrm{d}S/\mathrm{d}Y$** (v lineárním modelu $MPS = 1 - a$).
- **Vztah** $MPC + MPS = 1$ (7.5).
- **Makroekonomická rovnováha** — rovnováha agregátní poptávky a nabídky.
- **Model C-I** — uzavřená ekonomika bez vlády; $Y = C + I$; $Y^E = (b + I^*)/(1-a)$.
- **Model C-I-G** — ekonomika s vládou, zdaněním $T(Y)$, $Y_D = Y - T$; $Y = C + I + G$.
- **Model C-I-G-X** — otevřená ekonomika s čistým exportem $X = B - M$, importem $M(Y_D)$; $Y = C + I + G + B - M$.
- **Multiplikátor investic** — $\partial Y^E/\partial I^* = 1/(1-a) = 1/MPS$ (Keynesův multiplikátor).
- **Funkce investic $I(r) = cr + d$** — $c < 0$, $d > 0$; klesající.
- **Křivka IS** — rovnováha na trhu zboží (*Investment = Savings*); $Y = \frac{c}{1-a}r + \frac{b+d}{1-a}$ (7.14); klesající.
- **Křivka LM** — rovnováha na trhu peněz (*Liquidity of Money*); $M^* = k_1 Y + k_2 r + k_3$ (7.15); rostoucí.
- **Transakční, opatrnostní a spekulační poptávka po penězích** — $M^D = L_1 + L_2$.
- **IS-LM analýza** — průsečík $E$ křivek $IS$ a $LM$ určuje $(Y^E, r^E)$.

## Navigace

- **Kurz:** [[imek|Matematická ekonomie]]
- **Přednáška:** [[imek-blok-03]]
- **Související:**
  - [[is-lm]] — detailní IS-LM analýza (odvození křivek, Příklad 7.6, fiskální vs monetární politika)
  - [[poptavka-nabidka]] — paralela mikroekonomických multiplikátorů (multiplikátory rovnovážné ceny a množství)
  - [[prijem-naklady-zisk]] — mikroekonomické analogie, článek 2.4 o multiplikátorech
  - [[derivace]] — matematický základ pro $MPC$, $MPS$ a interpretaci změn diferenciálem
