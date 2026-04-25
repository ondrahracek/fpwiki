---
title: Elasticita poptávky a nabídky
course: imek
type: topic
tags: [imek, elasticita, cenova-elasticita, krizova-elasticita, duchodova-elasticita, mr-tr]
sources: [raw/imek/kniha_scanned/, raw/imek/KS_druhy_blok.pdf]
created: 2026-04-22
updated: '2026-04-25'
---

# Elasticita poptávky a nabídky

> [!abstract] TL;DR
> **Elasticita** je bezrozměrná míra toho, o kolik procent přibližně zareaguje jedna veličina na jednoprocentní změnu veličiny jiné. Studujeme ji proto, abychom mohli kvantitativně rozhodovat o cenové politice (kdy cenu snížit, kdy zvýšit) a charakterizovat povahu zboží. V kapitole rozlišujeme tři typy: **cenovou elasticitu poptávky** (a nabídky), **křížově-cenovou elasticitu** a **důchodovou elasticitu**.

## Úvod — motivace

Termín *elasticita* (alternativně *pružnost*) patří ke klíčovým pojmům ekonomické teorie. Slouží ke **kvantifikaci citlivosti (míry) odezvy** jisté veličiny na změnu veličiny jiné. Bezprostředně nás zajímá citlivost množství (poptávaného či nabízeného) na změnu ceny zboží, což vede k pojmům *cenové elasticity poptávky* (resp. *nabídky*). Matematickým modelem míry citlivosti je elasticita funkce (viz [[derivace|Derivace]]).

### Srovnání Trh 1 vs Trh 2

Uvažujme dvě různá tržní prostředí. Zboží má na obou trzích stejnou cenu $P=10$ a při této ceně se prodá $Q=100$ jednotek. Prodejce sníží cenu z 10 na 9:

- **Trh 1** zareaguje zvýšením množství na 110 $\;\Rightarrow\; TR = 9\cdot 110 = 990$ (pokles z 1000).
- **Trh 2** zareaguje zvýšením množství na 120 $\;\Rightarrow\; TR = 9\cdot 120 = 1080$ (růst z 1000).

Závěr: snížení ceny bylo na Trhu 1 **nerozumné**, na Trhu 2 **rozumné**. Trh 2 je **relativně citlivý** na změnu ceny — říkáme, že poptávka je *elastická* a snížení ceny je „překompenzováno" zvýšením poptávaného množství. Na Trhu 1 je poptávka *neelastická* a vyššího $TR$ lze naopak dosáhnout *zvýšením* ceny.

### Hypotéza 4.1

> Aby nedošlo k poklesu celkového příjmu, musí být procentní růst poptávaného množství alespoň takový, jaký je procentní pokles jeho ceny. $(4.1)$

Rozhodující nejsou nominální změny (jsou měřeny v různých jednotkách), nýbrž **procentní změny** obou faktorů.

## Pojem elasticity

Obecně **elasticita** jedné veličiny vzhledem k druhé kvantifikuje, o kolik procent se první veličina přibližně změní, když se druhá veličina změní o 1 %. Jde o **bezrozměrnou veličinu** — nezávislou na jednotkách, ve kterých jsou proměnné měřeny (viz čl. 1.5.1).

> [!info] Intuice
> Elasticitu lze číst jako **procentní odpověď na procentní podnět**. Místo „o kolik kusů se změní prodej, když zlevním o korunu" (což závisí na jednotkách) se ptáme „o kolik procent se změní prodej, když zlevním o 1 %". Tato procentní citlivost je univerzální a umožňuje srovnávat zboží různých řádů i měn.

## Cenová elasticita poptávky — jednofaktorový model

Nechť $Q = D(P)$ je funkce poptávky (ceteris paribus). Zkoumáme podíl procentních změn

$$E^A = -\frac{\Delta Q\%}{\Delta P\%}. \tag{4.2}$$

Znaménko minus je korekce: změny $\Delta Q$ a $\Delta P$ mají vždy opačná znaménka, takže bez korekce by $E^A$ bylo záporné; pro pohodlí pracujeme s nezápornými hodnotami. Pro procentní změny platí

$$\Delta Q\% = \frac{\Delta Q}{Q}\cdot 100, \qquad \Delta P\% = \frac{\Delta P}{P}\cdot 100. \tag{4.3}$$

Po dosazení:

$$E^A = -\frac{\frac{\Delta Q}{Q}}{\frac{\Delta P}{P}} = -\frac{P}{Q}\cdot \frac{\Delta Q}{\Delta P}. \tag{4.4}$$

Limitním přechodem $\Delta P \to 0$ získáme definici **cenové elasticity poptávky** (price elasticity of demand):

$$\boxed{\;E = E(P) = -\frac{P}{Q}\cdot \frac{\mathrm{d}Q}{\mathrm{d}P} = -\frac{P}{Q}\,Q'(P)\;} \tag{4.5}$$

kde $Q = D(P)$. Pro pevnou cenu $P = P^*$ se $E(P^*)$ nazývá *elasticita poptávky při ceně $P^*$* a je to vždy nezáporné číslo.

> [!warning] Pozor na znaménko
> V (4.5) je **explicitní $-1$** právě proto, že $Q'(P) < 0$ (poptávka klesá s cenou). Díky korekčnímu znaménku je výsledné $E(P^*) \ge 0$ a s touto nezápornou konvencí pracuje celá klasifikace $E > 1$, $E < 1$, $E = 1$. V některých starších pramenech se $-1$ vynechává a uvádějí se záporné hodnoty; obsah pojmu se tím nemění, ale srovnávat hodnoty napříč zdroji je třeba opatrně. Pokud narazíte na zápornou hodnotu, pracujte s **absolutní hodnotou**.

> [!tip] Postup: jak spočítat $E$ v bodě
> 1. Zapište $Q = D(P)$. Pokud je poptávka zadaná jako $P = D(Q)$, použijte vztah (4.9).
> 2. Spočítejte derivaci $Q'(P) = \mathrm{d}Q/\mathrm{d}P$.
> 3. Dosaďte zadanou cenu $P^*$ a dopočítejte odpovídající $Q^* = D(P^*)$.
> 4. Dosaďte do (4.5): $E(P^*) = -\dfrac{P^*}{Q^*}\,Q'(P^*)$.
> 5. Klasifikujte: $E > 1$ elastická, $E = 1$ jednotková, $E < 1$ neelastická.

### Interpretace (4.6)

> Číslo $E(P^*)$ udává, o kolik % se přibližně změní poptávané množství $Q$, jestliže se cena $P^*$ změní o 1 %. $(4.6)$

**Historicky:** úvahy vedoucí k hypotéze (4.1) formuloval již Cournot (1838), dnešní vymezení se připisuje Marshallovi (1881).

### Příklad 4.1

Poptávka $P = D(Q) = 50 - 2Q$. Vyjádříme $Q = 25 - 0{,}5P$, $\dfrac{\mathrm{d}Q}{\mathrm{d}P} = -0{,}5$:

$$E = -\frac{P}{25-0{,}5P}\cdot(-0{,}5) = \frac{0{,}5P}{25-0{,}5P}.$$

Potom $E(0)=0$, $E(10)=\tfrac{1}{4}$, $E(25)=1$, $E(40)=4$. Např. $E(40)=4$ znamená, že zvýšení ceny o 1 % (z 40 na 40,4) způsobí pokles množství o 4 % (z $Q=5$ na $Q=4{,}8$).

### Oblouková (průměrná) vs. bodová (okamžitá) elasticita

- **Oblouková** (průměrná) elasticita: výraz $E^A$ ze (4.4) vztažený k intervalu $\langle P,\, P+\Delta P\rangle$.
- **Bodová** (okamžitá) elasticita: $E$ dle (4.5) — výchozí pojem dále v textu.

### Výpočet, je-li dáno $P$ jako funkce $Q$

Pokud je poptávka zadaná ve tvaru $P = D(Q)$, využijeme vztah pro derivaci inverzní funkce

$$\frac{\mathrm{d}Q}{\mathrm{d}P} = \frac{1}{\frac{\mathrm{d}P}{\mathrm{d}Q}}. \tag{4.9}$$

**Příklad 4.3.** $P = 100 - Q^2$, ptáme se na elasticitu při ceně 36. Dostáváme

$$E = -\frac{100-Q^2}{Q}\cdot \frac{1}{-2Q} = \frac{100-Q^2}{2Q^2}.$$

Z rovnice $100 - Q^2 = 36$ plyne $Q = 8$, tedy $E(8) = \tfrac{36}{128} = 0{,}281$.

### Přibližné změny

Diferenciál $\mathrm{d}Q = Q'(P)\,\mathrm{d}P$ s $\mathrm{d}P = \Delta P$ dává nominální odhad

$$\Delta Q \approx \mathrm{d}Q = Q'(P)\,\mathrm{d}P. \tag{4.10}$$

Po přechodu na procentní změny (vztah (4.3)):

$$\boxed{\;\Delta Q\% \approx -E(P)\,\Delta P\%\;} \tag{4.11}$$

**Příklad 4.5.** $P = -Q^2 - 4Q + 96$, cena $P=51$. Z rovnice $51 = -Q^2-4Q+96$ volíme (kladný kořen) $Q=5$. Elasticita:

$$E = \frac{-Q^2-4Q+96}{Q(2Q+4)}, \qquad E(5) = \frac{51}{70} \doteq 0{,}728.$$

Jde o neelastickou poptávku. Zvýší-li se cena o 2 %, pak $\Delta Q\% \approx -0{,}728\cdot 2 = -1{,}456\,\%$.

## Klasifikace elasticit poptávky

V závislosti na hodnotě $E(P^*)$ mluvíme o poptávce podle následující tabulky $(4.7)$:

![[imek-typy-elasticity-5panelu.jpeg|Pět typů cenové elasticity: E=0 svislá, 0<E<1 strmá, E=1 hyperbola, E>1 plochá, E=∞ horizontální]]


| Hodnota $E(P^*)$ | Typ poptávky | Termín | Význam |
| --- | --- | --- | --- |
| $E = 0$ | **dokonale neelastická** | perfectly inelastic | množství se nemění bez ohledu na cenu |
| $0 < E < 1$ | **neelastická** | inelastic | $Q$ se mění pomaleji než $P$ |
| $E = 1$ | **jednotkově elastická** | unit elastic | $Q$ i $P$ se mění stejně rychle; $TR$ má maximum |
| $E > 1$ | **elastická** | elastic | $Q$ se mění rychleji než $P$ |
| $E \to \infty$ | **dokonale elastická** | perfectly elastic | sebemenší změna ceny úplně mění $Q$ |

**Pravidlo růstu elasticity s cenou:**

> S rostoucí cenou elasticita poptávky roste. $(4.8)$

Z toho plyne, že při *dostatečně nízkých* cenách je poptávka neelastická a při *dostatečně vysokých* elastická. Existuje tedy cena $P^*$, při které je poptávka jednotkově elastická, a ta rozděluje reálné cenové rozpětí na obě zóny.

> [!tip] Postup: jak klasifikovat poptávku
> 1. Spočítejte $E(P^*)$ dle (4.5).
> 2. Porovnejte s jedničkou (viz tabulka výše).
> 3. Chcete-li najít hranici mezi elastickou a neelastickou zónou, řešte rovnici $E(P) = 1$ a výsledek porovnejte s reálným cenovým rozpětím.

**Příklad 4.2.** Pro poptávku z Příkladu 4.1: $E = 1$ pro $P = 25$. Podle (4.8) je poptávka neelastická pro $P \in \langle 0, 25)$ a elastická pro $P \in (25, 50\rangle$.

## Elasticita a celkový příjem

![[imek-elasticita-tr.jpeg|Lineární poptávka rozdělená na elastickou, jednotkovou a neelastickou zónu, a TR(Q)]]

![[imek-elasticita-podel-linearni-poptavky.jpeg|Master diagram — elasticita se mění podél lineární poptávky od ∞ (nahoře) po 0 (dole); TR maximum je tam, kde E=1]]

Pro celkový příjem platí $TR = TR(Q) = P\cdot Q = Q\cdot D(Q)$. Pro mezní příjem $MR$ odvodíme:

$$MR = TR'(Q) = D(Q) + Q\,D'(Q) = P + Q\frac{\mathrm{d}P}{\mathrm{d}Q} = P\left(1 + \frac{Q}{P}\cdot\frac{\mathrm{d}P}{\mathrm{d}Q}\right)$$

$$= P\left(1 + \frac{1}{\tfrac{P}{Q}\cdot\tfrac{\mathrm{d}Q}{\mathrm{d}P}}\right) = P\left(1 + \frac{1}{-E}\right)$$

a tedy

$$\boxed{\;MR = P\left(1 - \frac{1}{E}\right) = D(Q)\left(1 - \frac{1}{E}\right)\;} \tag{4.12}$$

> [!info] Intuice: vztah $MR = P(1 - 1/E)$
> Vztah (4.12) je „most" mezi elasticitou a mezním příjmem — znaménko $MR$ jednoznačně určuje hodnota $E$:
> - $E > 1$ (elastická) $\Rightarrow$ $1 - 1/E > 0$ $\Rightarrow$ $MR > 0$ — $TR$ roste s množstvím, tj. klesá s cenou.
> - $E = 1$ (jednotková) $\Rightarrow$ $MR = 0$ — $TR$ je extrém (maximum).
> - $E < 1$ (neelastická) $\Rightarrow$ $MR < 0$ — $TR$ klesá s množstvím, tj. roste s cenou.
>
> Viz také [[prijem-naklady-zisk|Příjem, náklady, zisk]].

### Pravidla 1–3 (odvození z (4.12))

**(a) Poptávka elastická ($E > 1$).** Z (4.12) plyne $MR(Q) > 0$, a tedy celkový příjem $TR$ je rostoucí funkcí $Q$. Avšak růst $Q$ je odezvou na pokles ceny $P$. Tudíž s *poklesem ceny $P$* celkový příjem $TR$ *roste* a s *růstem ceny $P$* celkový příjem *klesá*.

> **Pravidlo 1.** Je-li poptávka elastická, pak s poklesem ceny celkový příjem roste a s růstem ceny celkový příjem klesá.

**(b) Poptávka neelastická ($E < 1$).** Z (4.12) plyne $MR(Q) < 0$, $TR$ je klesající funkce $Q$, tj. s růstem $Q$ (s poklesem ceny $P$) celkový příjem klesá. S růstem ceny $P$ celkový příjem $TR$ *roste*.

> **Pravidlo 2.** Je-li poptávka neelastická, pak s poklesem ceny celkový příjem klesá a s růstem ceny celkový příjem roste.

**(c) Jednotková elasticita ($E = 1$).** Z (4.12) plyne $MR = 0$ — nutná podmínka extrému $TR$. Dále $TR'' = MR' = D'(Q) + Q\,D''(Q)$; za normálních podmínek $D'(Q) < 0$ a $D''(Q) \le 0$, odkud $TR'' < 0$, tedy $TR$ nabývá **maxima**.

> **Pravidlo 3.** Celkový příjem nabývá maxima při ceně, pro kterou je poptávka jednotkově elastická.

Tato tři pravidla potvrzují hypotézu (4.1) a jsou klíčem k regulaci ceny za účelem zvýšení (maximalizace) celkového příjmu.

**Souhrnná tabulka Pravidel 1–3:**

| Charakter poptávky | $E$ | $MR$ | Pokles ceny $\Rightarrow$ $TR$ | Růst ceny $\Rightarrow$ $TR$ | Doporučení |
| --- | --- | --- | --- | --- | --- |
| elastická | $> 1$ | $> 0$ | roste | klesá | **snížit cenu** |
| jednotková | $= 1$ | $= 0$ | maximum | maximum | **držet cenu** |
| neelastická | $< 1$ | $< 0$ | klesá | roste | **zvýšit cenu** |

### Příklad 4.6 — aplikace Pravidel 1–3

Aplikujme pravidla 1–3 pro poptávku $P = 100 - Q^2$. Reálné cenové rozpětí je $\langle 1, 100\rangle$. Pro výpočet elasticity vyjádříme $Q$ jako funkci $P$; pro nezáporné $Q$ je $Q = \sqrt{100 - P}$, tedy $\dfrac{\mathrm{d}Q}{\mathrm{d}P} = -\dfrac{1}{2\sqrt{100-P}}$. Podle (4.5):

$$E(P) = -\frac{P}{Q}\cdot\frac{\mathrm{d}Q}{\mathrm{d}P} = -\frac{P}{\sqrt{100-P}}\cdot\left(-\frac{1}{2\sqrt{100-P}}\right) = \frac{P}{2(100-P)} = \frac{0{,}5P}{100-P}.$$

Stanovíme cenu, při které je poptávka jednotkově elastická. Řešíme $\dfrac{0{,}5P}{100-P} = 1$:

$$P^* = \frac{200}{3} \doteq 66{,}\overline{6}.$$

S využitím vlastnosti (4.8):

- Při cenách $P \in \langle 1;\, 66{,}\overline{6})$ je poptávka **neelastická** — dle *Pravidla 2* přiměřené zvýšení ceny zvýší celkový příjem.
- Při cenách $P \in (66{,}\overline{6};\, 100\rangle$ je poptávka **elastická** — dle *Pravidla 1* přiměřené snížení ceny povede ke zvýšení celkového příjmu.
- Dle *Pravidla 3* je při ceně $P^* = 66{,}\overline{6}$ dosaženo **maxima celkového příjmu** ve výši

$$TR(P^*) = P^*\cdot\sqrt{100 - P^*} = \frac{200}{3}\cdot\sqrt{\frac{100}{3}} = \frac{2000}{3\sqrt{3}} \doteq 384{,}9.$$

Ke stejnému výsledku bychom dospěli přímým hledáním maxima funkce $TR$.

## Cenová elasticita nabídky

Analogicky se definuje **cenová elasticita nabídky** (price elasticity of supply):

$$\boxed{\;E = E(P) = \frac{P}{Q}\cdot\frac{\mathrm{d}Q}{\mathrm{d}P}\;} \tag{4.13}$$

kde $Q = S(P)$ je funkce nabídky. Protože nabídka je rostoucí, $\dfrac{\mathrm{d}Q}{\mathrm{d}P} > 0$, a elasticita nabídky je vždy nezáporná — proto zde není znaménková korekce jako u poptávky.

Klasifikace na elastickou / jednotkově elastickou / neelastickou je analogická jako u poptávky (tabulka (4.7)). Platí paralela k (4.8):

> S rostoucí cenou elasticita nabídky roste. $(4.14)$

Pro nominální změny platí

$$\Delta Q \approx \mathrm{d}Q = Q'(P)\,\mathrm{d}P, \qquad \mathrm{d}P = \Delta P, \tag{4.15}$$

a pro procentní změny

$$\boxed{\;\Delta Q\% \approx E(P)\,\Delta P\%\;} \tag{4.16}$$

(bez znaménka minus).

### Příklad 4.7

Nabídka $Q = 0{,}1P^2 + 5P + 150$:

$$E = \frac{P}{0{,}1P^2 + 5P + 150}\,(0{,}2P + 5).$$

Potom $E(10) = \tfrac{1}{3}$, $E(\sqrt{1500}) = 1$, $E(100) = \tfrac{50}{33} \doteq 1{,}515$. Dle (4.14): pro $P > \sqrt{1500} \approx 38{,}7$ je nabídka elastická, pro $P < 38{,}7$ neelastická. Zvýší-li se cena z 10 o 20 %, pak $\Delta Q\% \approx \tfrac{1}{3}\cdot 20 = 6{,}\overline{6}\,\%$.

## Vícefaktorový model

Předpokládejme, že poptávané množství $Q$ závisí na **ceně základního zboží** $P$, na **ceně alternativního zboží** $P_A$ a na **důchodu** $Y$:

$$Q = D(P, P_A, Y). \tag{4.17}$$

V analogii jednofaktorového modelu pracujeme s **parciálními derivacemi** funkce poptávky.

### Cenová elasticita poptávky (vícefaktorová)

$$\boxed{\;E_P = -\frac{P}{Q}\,Q'_P\;} \tag{4.18}$$

kde $Q'_P$ je parciální derivace (4.17) podle $P$. Vždy $E_P \ge 0$. *Interpretace:* $E_P(P^*, P_A^*, Y^*)$ udává přibližnou procentní změnu $Q$ při 1% změně $P^*$, ceteris paribus.

### Křížová (křížově-cenová) elasticita poptávky

$$\boxed{\;E_{P_A} = \frac{P_A}{Q}\,Q'_{P_A}\;} \tag{4.19}$$

*Interpretace:* udává přibližnou procentní změnu $Q$ základního zboží při 1% změně ceny $P_A$ alternativního zboží (ceteris paribus).

**Znaménko závisí na povaze alternativního zboží:**

- Je-li alternativní zboží **komplement**, růst $P_A$ způsobí zdražení dvojice, pokles $Q$ $\Rightarrow\; Q'_{P_A} < 0,\; E_{P_A} < 0$.
- Je-li alternativní zboží **substitut**, růst $P_A$ učiní základní zboží relativně levnější, zájem se přesune, $Q$ roste $\Rightarrow\; Q'_{P_A} > 0,\; E_{P_A} > 0$.

$$\begin{aligned}
E_{P_A} &> 0 \;\;\Leftrightarrow\;\; \text{alternativní zboží je substitut},\\
E_{P_A} &< 0 \;\;\Leftrightarrow\;\; \text{alternativní zboží je komplement}.
\end{aligned}$$

### Důchodová elasticita poptávky

$$\boxed{\;E_Y = \frac{Y}{Q}\,Q'_Y\;} \tag{4.20}$$

*Interpretace:* udává přibližnou procentní změnu $Q$ při 1% změně důchodu $Y$ (ceteris paribus).

**Znaménko závisí na povaze základního zboží** (viz Engelova funkce, čl. 2.1.2):

- Jde-li o **normální zboží**, s růstem $Y$ roste $Q$ $\Rightarrow\; Q'_Y > 0,\; E_Y > 0$.
- Jde-li o **podřadné zboží**, s růstem $Y$ klesá $Q$ $\Rightarrow\; Q'_Y < 0,\; E_Y < 0$.

$$\begin{aligned}
E_Y &> 0 \;\;\Leftrightarrow\;\; \text{zboží je normální},\\
E_Y &< 0 \;\;\Leftrightarrow\;\; \text{zboží je podřadné}.
\end{aligned}$$

> [!tip] Intuice a české příklady podřadného zboží
> Proč by si spotřebitel měl s rostoucím důchodem kupovat **méně** daného zboží a ne jen pomaleji víc? Pro mechanismus „substituce nahoru", tabulku českých příkladů (MHD, privátní značky, Májka…) a kontextovou závislost viz [[poptavka-nabidka#Intuice — co vlastně znamená „podřadné"?|podřadné zboží v topicu Poptávka a nabídka]].

### Procentní a nominální odhady změn

Pro procentní odhady při změně jedné proměnné (analogie (4.11)):

$$\Delta Q\% \approx -E_P\,\Delta P\%, \qquad \Delta Q\% \approx E_{P_A}\,\Delta P_A\%, \qquad \Delta Q\% \approx E_Y\,\Delta Y\%. \tag{4.21}$$

Pro nominální odhady při současné změně všech proměnných (totální diferenciál):

$$\boxed{\;\Delta Q \approx \mathrm{d}Q = Q'_P\,\mathrm{d}P + Q'_{P_A}\,\mathrm{d}P_A + Q'_Y\,\mathrm{d}Y\;} \tag{4.22}$$

Nemění-li se některá z proměnných, odpovídající člen ve (4.22) vypadne.

### Příklad 4.8

Poptávka $Q = 500 - 3P - 2P_A + 0{,}01Y$, hladina $M[20, 30, 5000]$.

- Množství: $Q(M) = 500 - 60 - 60 + 50 = 430$.
- $E_P(M) = -\tfrac{20}{430}\cdot(-3) = \tfrac{60}{430} \doteq 0{,}14$ — **neelastická poptávka**.
- $E_{P_A}(M) = \tfrac{30}{430}\cdot(-2) = -\tfrac{60}{430} \doteq -0{,}14$ — alternativní zboží je **komplement**.
- $E_Y(M) = \tfrac{5000}{430}\cdot 0{,}01 \doteq 0{,}12$ — základní zboží je **normální**.

Při změnách $\mathrm{d}P = +5$, $\mathrm{d}P_A = -3$, $\mathrm{d}Y = +100$ z (4.22):

$$\Delta Q \approx (-3)\cdot 5 + (-2)\cdot(-3) + 0{,}01\cdot 100 = -15 + 6 + 1 = -8.$$

Množství klesne přibližně o 8.

## Shrnutí kapitoly 4

**Elasticita** je bezrozměrná veličina sloužící ke kvantifikaci citlivosti změny jedné veličiny na změnu veličiny jiné.

- *Cenová elasticita poptávky* vyjadřuje míru reakce spotřebitele na „malou" změnu ceny; výpočetní formule $E = -\tfrac{P}{Q}\,Q'(P)$ je nezáporné číslo.
- Klasifikace: $E > 1$ elastická, $E = 1$ jednotkově elastická, $E < 1$ neelastická; krajní případy $E = 0$, $E \to \infty$.
- Elasticita udává, o kolik procent se **přibližně** změní $Q$, změní-li se $P$ o 1 %.
- Pomocí elasticity a diferenciálu lze odhadovat změny množství jako odezvy na změny ceny.
- Pro praxi: **Pravidla 1–3** (MR vs $E$) umožňují regulovat cenu za účelem růstu celkového příjmu (elastická → snížit, neelastická → zvýšit, $E=1$ → maximum $TR$).
- *Cenová elasticita nabídky* je analogická míra reakce výrobce; vždy nezáporná, bez znaménkové korekce.
- *Vícefaktorový model* přibírá $P_A$ a $Y$. S pomocí parciálních derivací se definují *cenová*, *křížově-cenová* a *důchodová* elasticita; jejich znaménka slouží ke kvalitativní charakterizaci zboží (substitut/komplement, normální/podřadné).

## Otázky k sebehodnocení

1. Proč je ve vzorci pro elasticitu poptávky záporné znaménko?
2. Jak lze ekonomicky interpretovat fakt, že při ceně 100 je elasticita poptávky rovna 2?
3. Kdy se poptávka při zadané ceně prohlásí za elastickou, resp. neelastickou, resp. jednotkově elastickou?
4. Je pravda, že při nižších cenách má poptávka tendenci být elastičtější než při cenách vyšších?
5. Co se stane s celkovým příjmem, jestliže při neelastické poptávce zvýší prodejce cenu?
6. Při jaké ceně je dosaženo maxima celkového příjmu?
7. Jak lze ekonomicky interpretovat fakt, že při ceně 200 je elasticita nabídky 0,5?
8. Při jaké ceně základního zboží je křížově-cenová elasticita záporná? Je alternativní zboží substitut nebo komplement?
9. Jak lze ekonomicky interpretovat fakt, že při ceně 200 se důchodová elasticita poptávky rovná 3? O jaké zboží se pak jedná?

## Úlohy 4.1–4.21

### Cenová elasticita poptávky

**4.1** Je dána poptávka $Q = 60 - 3P$. (a) Načrtněte křivku poptávky a určete reálné cenové rozpětí. (b) Vypočtěte elasticitu poptávky při cenách 5, 10, 15, rozhodněte o jejím charakteru a vyznačte příslušné hodnoty na křivku poptávky. (c) Stanovte, při jakých cenách je poptávka elastická, jednotkově elastická, neelastická, dokonale elastická a dokonale neelastická.

**4.2** Proveďte zadání úlohy 4.1 pro poptávku $Q + 4P = 60$.

**4.3** Je dána lineární poptávka $P = a + bQ$. Analyzujte vlastnosti elasticity s ohledem na hodnotu $a$.

**4.4** Je dána poptávka $P = -Q^2 - 4Q + 96$. Vypočtěte elasticitu poptávky při ceně 51 a výsledek interpretujte.

**4.5** Je dána poptávka $P = \sqrt{1000 - 5Q}$. Vypočtěte elasticitu poptávky při ceně 25 a výsledek interpretujte.

**4.6** Je dána poptávka $P = 30 - 2Q$. (a) Stanovte reálné cenové rozpětí a rozhodněte, při jakých cenách je třeba cenu snížit, resp. zvýšit za účelem zvýšení celkového příjmu. (b) Stanovte cenu, při které je dosaženo maxima celkového příjmu, a určete odpovídající hodnotu maxima celkového příjmu.

**4.7** Proveďte zadání úlohy 4.6 pro poptávku $P = 60 - 12Q$.

**4.8** Závislost počtu $Q$ pasažérů na lince autobusu a ceny jízdného $P$ je dána vztahem (poptávkou) $P = 4 - \dfrac{Q^2}{100}$. Určete cenu jízdného, při které dosahuje dopravce maxima celkového příjmu, a stanovte odpovídající hodnotu maxima celkového příjmu.

**4.9** Je dána poptávka $Q = \dfrac{A}{P^2}$, kde $A$ je kladná konstanta. Vypočtěte elasticitu poptávky.

**4.10** Je dána poptávka $P = \dfrac{A}{Q^n}$, kde $A, n$ jsou kladné konstanty. (a) Vypočtěte elasticitu poptávky. (b) Stanovte, za jakých podmínek je poptávka elastická, resp. jednotkově elastická, resp. neelastická.

**4.11** Je dána poptávka $P = -Q^2 - 10Q + 150$. Stanovte, o kolik (v %) se přibližně musí změnit cena 75, aby se množství zvýšilo o 10 %.

**4.12** Je dána poptávka $Q = -5 + 2P - 0{,}01P^2$. Stanovte, jak (v %) se přibližně změní množství, jestliže se cena 150 sníží o 3 %.

### Cenová elasticita nabídky

**4.13** Je dána nabídka $P = 5 + 0{,}5Q$. Vypočtěte elasticitu nabídky při cenách 10, 30 a výsledky interpretujte.

**4.14** Vypočtěte elasticitu nabídky při ceně 10 pro nabídku: (a) $Q = 5P + 6$. (b) $Q = 7P^2$.

**4.15** Je dána lineární nabídka $Q = a + bP$. Analyzujte závislost charakteru elasticity nabídky na hodnotě $a$.

**4.16** Je dána nabídka $Q = 7 + 0{,}1P + 0{,}004P^2$. (a) Vypočtěte elasticitu nabídky při cenách 20, 50, 80. (b) Stanovte, při jakých cenách je nabídka elastická, resp. jednotkově elastická, resp. neelastická. (c) Odhadněte změnu (v %) nabídky, jestliže se cena 80 zvýší o 5 %.

**4.17** Je dána nabídka $Q = 25 - 0{,}3P + 2{,}2P^2$. (a) Vyjádřete nabídku ve tvaru $P$ jako funkce $Q$. (b) Určete reálné cenové rozpětí. (c) Stanovte, při jakých cenách je nabídka elastická, resp. jednotkově elastická, resp. neelastická.

### Vícefaktorové elasticity

**4.18** Je dána poptávka $Q = 100 - 2P + P_A + 0{,}1Y$, kde $P$ je cena základního zboží, $P_A$ cena alternativního zboží, $Y$ důchod, $Q$ (poptávané) množství základního zboží a nechť pro $P = 12$, $Y = 1000$ značí $M[10, 15, 1000]$. (a) Určete množství na hladině $M$. (b) Určete cenovou elasticitu poptávky na $M$; stanovte přibližnou změnu $Q$ v %, jestliže se cena základního zboží zvýší o 2 (ceteris paribus). (c) Určete křížově-cenovou elasticitu poptávky na $M$; rozhodněte, zda alternativní zboží je substitut, resp. komplement; stanovte přibližnou změnu $Q$ v %, jestliže se cena alternativního zboží sníží o 2 % (ceteris paribus). (d) Určete důchodovou elasticitu poptávky na $M$; rozhodněte, zda základní zboží je normální, resp. podřadné; stanovte přibližnou změnu $Q$, jestliže se důchod zvýší o 10 %. (e) Stanovte přibližnou změnu $Q$, jestliže se důchod sníží o 10 % (ceteris paribus). (f) Stanovte přibližnou změnu $Q$, jestliže se $P$ zvýší o 5, $P_A$ sníží o 3 a $Y$ sníží o 1 100 vzhledem k hladině $M$.

**4.19** Je dána poptávka $Q = 200 - 2P - P_A + 0{,}1Y^2$, kde $P$ je cena základního zboží, $P_A$ cena alternativního zboží, $Y$ důchod, $Q$ (poptávané) množství základního zboží a nechť pro $P = 10$, $P_A = 15$, $Y = 100$ značí $M[10, 15, 100]$. (a) Určete množství na hladině $M$. (b) Určete cenovou elasticitu poptávky na $M$; stanovte přibližnou změnu $Q$ v %, jestliže se cena základního zboží zvýší o 5 % (ceteris paribus). (c) Určete křížově-cenovou elasticitu poptávky na $M$; rozhodněte, zda alternativní zboží je substitut, resp. komplement; stanovte přibližnou změnu $Q$ v %, jestliže se cena alternativního zboží sníží o 3 %. (d) Určete důchodovou elasticitu poptávky na $M$; rozhodněte, zda základní zboží je normální, resp. podřadné; stanovte přibližnou nominální změnu $Q$, jestliže se důchod zvýší o 10 %. (e) Stanovte přibližnou změnu $Q$, jestliže se $P$ zvýší o 2, $P_A$ sníží o 3 a $Y$ zvýší o 10 % vzhledem k hladině $M$.

**4.20** Poptávka po bramborách je dána funkcí $Q = 1026 - 300P + 296P_A + 0{,}4Y$, kde $Q$ (jednotek hmotnosti) je množství, $P$ cena brambor (za jednotku hmotnosti), $P_A$ cena rýže (za jednotku hmotnosti), $Y$ důchod. (a) Určete poptávku po bramborách za předpokladu, že jsou pevně zadány $P_A = 0{,}25$, $Y = 10000$ a stanovte příslušné cenové rozpětí. (b) Rozhodněte, jakými komoditami jsou brambory, resp. rýže. (c) Určete $Q$ na hladině $P = 5$, $P_A = 0{,}25$, $Y = 10000$. (d) Odhadněte změnu $Q$ v %, jestliže se $Y$ zvýší o 400 vzhledem k hladině dle (c) (ceteris paribus). (e) Odhadněte změnu $Q$ v %, jestliže vzhledem k hladině dle (c) $P$ klesne na 3, $P_A$ vzroste na 0,3 a $Y$ vzroste na 200.

**4.21** Poptávka po ponožkách z kašmíru je dána funkcí $Q = 1000 - 400P + 200P_A + 0{,}5Y$, kde $Q$ je množství párů ponožek z kašmíru, $P$ cena páru ponožek z kašmíru, $P_A$ cena páru ponožek z vlny, $Y$ důchod. (a) Určete $Q$ na hladině $P = 10$, $P_A = 5$, $Y = 20000$. (b) Vypočtěte cenovou, křížově-cenovou a důchodovou elasticity poptávky na hladině dle (a) a proveďte charakterizaci elasticity zboží. (c) Odhadněte změnu $Q$ v %, jestliže vzhledem k hladině dle (a) $P$ vzroste o 1 %, $P_A$ klesne o 3 % a $Y$ vzroste o 20 %.

## Klíčové pojmy

- **elasticita** — bezrozměrná míra citlivosti odezvy jedné veličiny na změnu jiné
- **cenová elasticita poptávky** $E$, $E_P$ — $E = -\tfrac{P}{Q}\,\tfrac{\mathrm{d}Q}{\mathrm{d}P}$
- **elastická, jednotkově elastická, neelastická poptávka** — $E > 1$, $E = 1$, $E < 1$
- **dokonale elastická / neelastická poptávka** — $E \to \infty$, resp. $E = 0$
- **oblouková elasticita** (průměrná) vs. **bodová elasticita** (okamžitá)
- **mezní příjem a elasticita** — $MR = P\left(1 - \tfrac{1}{E}\right)$
- **Pravidla 1–3** (elastická → snížit cenu, neelastická → zvýšit cenu, $E=1$ → maximum $TR$)
- **cenová elasticita nabídky** — $E = \tfrac{P}{Q}\,\tfrac{\mathrm{d}Q}{\mathrm{d}P}$, vždy nezáporná
- **vícefaktorový model poptávky** — $Q = D(P, P_A, Y)$
- **křížově-cenová elasticita** $E_{P_A}$ — $> 0$ substitut, $< 0$ komplement
- **důchodová elasticita** $E_Y$ — $> 0$ normální zboží, $< 0$ podřadné zboží
- **totální diferenciál pro odhad změn** — $\Delta Q \approx \mathrm{d}Q = Q'_P\,\mathrm{d}P + Q'_{P_A}\,\mathrm{d}P_A + Q'_Y\,\mathrm{d}Y$
- **procentní formule** — $\Delta Q\% \approx -E_P\,\Delta P\%$, $\Delta Q\% \approx E_{P_A}\,\Delta P_A\%$, $\Delta Q\% \approx E_Y\,\Delta Y\%$

## Navigace

- **Související témata:** [[poptavka-nabidka|Poptávka a nabídka]], [[prijem-naklady-zisk|Příjem, náklady, zisk]], [[derivace|Derivace]]
- **Přednáška:** [[imek-blok-02|ImeK — souhrn 2. bloku]]
- **Kurz:** [[imek|Matematická ekonomie]]
