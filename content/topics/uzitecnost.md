---
title: Užitečnost, Cobb-Douglasova funkce užitečnosti a optimalizace spotřebitele
course: imek
type: topic
tags: [imek, uzitecnost, mezni-uzitecnost, cobb-douglas, indiferencni-krivky, mrcs]
sources: [raw/imek/kniha_scanned/, raw/imek/KS_treti_blok.pdf]
created: 2026-04-22
updated: '2026-04-25'
---

# Užitečnost, Cobb-Douglasova funkce užitečnosti a optimalizace spotřebitele

## TL;DR

**Užitečnost** $U(Q_1, Q_2)$ je číselné vyjádření uspokojení spotřebitele ze svazku zboží — v ordinalistickém přístupu slouží jen k **uspořádání** svazků (nikoli k měření v jednotkách). Klíčové nástroje jsou mezní užitečnosti $MU_i = U'_i$, indiferenční křivky $U = c$ a mezní míra komoditní substituce $MRCS = MU_1/MU_2$. Tato stránka pokrývá **teorii užitečnosti** — funkce $U$, její vlastnosti, Cobb-Douglasův tvar, indiferenční křivky a MRCS. **Optimalizaci spotřebitele** (max $U$ při rozpočtu, min $E$ při dané $U$, Lagrange, funkce poptávky) viz [[optimalizace-spotrebitele|Optimalizace spotřebitele]].

Kapitola 6 knihy *Matematická ekonomie* — model rozhodování spotřebitele. Zde: funkce užitečnosti, indiferenční křivky, mezní míra komoditní substituce. Navazující optimalizace je v [[optimalizace-spotrebitele]].

## Úvod — cílové znalosti kapitoly 6

Po prostudování této kapitoly byste měli umět:

- vyložit, co se rozumí termínem **užitečnost**,
- definovat pojmy **svazek zboží** a **funkce užitečnosti**,
- vypočítat **mezní užitečnosti** a ekonomicky je interpretovat,
- vyjmenovat základní vlastnosti funkcí užitečnosti,
- uvést tvar **Cobb-Douglasových** funkcí užitečnosti,
- najít **křivky užitečnosti** (indiferenční křivky),
- vyjmenovat jejich základní vlastnosti,
- vypočítat **mezní míru komoditní substituce** a ekonomicky ji interpretovat,
- řešit **optimalizační úlohy** s ohledem na užitečnost.

## 6.1 Pojetí užitečnosti

Spotřebitel typicky přijímá tři typy rozhodnutí: (i) kolik kterého zboží či služby nakoupit, (ii) kolik času věnovat práci vs. odpočinku, (iii) zda spotřebovat více než důchod (půjčky) nebo méně (spoření). Teorie se soustředí na typ (i), který bezprostředně určuje [[poptavka-nabidka|poptávku]]. Centrálním pojmem je **užitečnost (utility)** — vše, co vede spotřebitele k nákupu zboží (uspokojení, potěšení, splnění přání, pohodlí).

### Kardinalistický vs. ordinalistický přístup

Historicky se vyvíjela dvě pojetí „měření" užitečnosti:

- **Kardinalistický přístup** (19. století — Gossen, Jevons, Walras): užitečnost měřena kvantitativně (např. peněžními jednotkami). Tento přístup se ukázal být nevýhodný.
- **Ordinalistický přístup** (v současnosti preferovaný): postačuje **uspořádání** svazků zboží podle preferencí; kvantitativní číselné hodnocení užitečnosti se nepožaduje.

> [!warning] Pozor — ordinalisté užitečnost **neměří**
> V ordinalistickém přístupu hodnoty funkce $U$ **nemají samostatný ekonomický význam** — slouží pouze k uspořádání svazků. Dvě funkce $U$ a $\tilde U$ reprezentují tytéž preference, jsou-li navzájem monotónní transformací (např. $\tilde U = U^2$, $\tilde U = \ln U$). Výroky typu „užitečnost je 250 jednotek" proto samy o sobě nic neříkají — smysl mají jen **porovnání** mezi svazky a **poměry** mezních veličin.

Ordinalistický přístup vychází z **pěti hlavních předpokladů**:

1. **Racionalita.** Spotřebitel jedná racionálně — snaží se maximalizovat své uspokojení (užitečnost) s ohledem na daný důchod a tržní ceny; disponuje všemi potřebnými informacemi.
2. **Ordinalita.** Spotřebitel dokáže uspořádat skupiny zboží podle míry uspokojení — rozhodne, který svazek je lepší, nebo zda jsou oba stejně dobré. Není však nutné, aby míru uspokojení vyjadřoval číselně.
3. **Konzistence a tranzitivita.** Preferuje-li v jisté době svazek $A$ před $B$, nebude jindy preferovat $B$ před $A$. **Tranzitivita**: pokud $A \succ B$ a $B \succ C$, pak $A \succ C$.
4. **Rostoucí užitečnost.** Uspokojení roste s množstvím zboží.
5. **Klesající mezní užitečnost.** „Přírůstky" uspokojení klesají s růstem množství zboží.

K naplnění předpokladů je ordinalistický přístup založen na pojmech *preference* a na příbuzné *funkci užitečnosti*.

## 6.2 Model užitečnosti — svazek zboží a funkce užitečnosti

Uvažujme $n$ různých zboží. **Svazek zboží (bundle of goods)** je uspořádaná $n$-tice

$$ (Q_1, \dots, Q_n), $$

kde $Q_i$ značí množství $i$-tého zboží. Spotřebitel je schopen svazky **uspořádat** s rostoucí užitečností, případně je prohlásit za **indiferentní** (tj. stejně užitečné). Tím je definována **relace preference**. Preferenci vyjadřujeme číselně: svazku preferovanému přiřadíme větší číslo, indiferentním svazkům stejné číslo. Dostáváme **funkci užitečnosti**:

$$
U = U(Q_1, \dots, Q_n), \tag{6.1}
$$

kde $Q_1, \dots, Q_n$ jsou množství jednotlivých zboží. Funkce užitečnosti (utility function) „umisťuje" svazky na určitá místa v posloupnosti preference — sama žádnou konkrétní hodnotu uspokojení neměří. Dvě funkce $U, \tilde U$ reprezentují stejné preference, pokud mezi nimi existuje **monotónní transformace** zachovávající pořadí.

Dále se omezíme na funkce pro **dvě zboží** — $U = U(Q_1, Q_2)$.

> [!example] Příklad 6.1 — uspořádání a indiference
> Pro $U = U(Q_1, Q_2, Q_3) = 2\sqrt{Q_1 Q_2 Q_3}$:
>
> - svazek $(16, 4, 64)$ je preferován před $(9, 9, 27)$, neboť $U(16,4,64) = 2\sqrt{16 \cdot 4 \cdot 64} = 2\sqrt{4096} = 128$ a $U(9,9,27) = 2\sqrt{9 \cdot 9 \cdot 27} = 2\sqrt{2187} \doteq 93{,}53$, tedy $128 > 93{,}53$;
> - svazky $(4, 8, 2)$ a $(64, 1, 4)$ jsou indiferentní, protože $U(4,8,2) = 2\sqrt{64} = 16$ a $U(64,1,4) = 2\sqrt{256} = 32$ — jsou stejně užitečné mezi sebou, pokud $U(4,8,2) = U(64,1,4)$; ověření: $4 \cdot 8 \cdot 2 = 64$ a $64 \cdot 1 \cdot 4 = 256$, takže $U = 16$ a $U = 32$ — nejsou indiferentní. Správně indiferentní jsou svazky s týmž součinem $Q_1 Q_2 Q_3$.

## Mezní užitečnost (MU)

Pro funkci užitečnosti $U = U(Q_1, Q_2)$ je **mezní užitečnost** $Q_1$, resp. $Q_2$ (**marginal utility**) parciální [[derivace|derivace]] užitečnosti podle příslušné proměnné:

$$
MU_1 = U'_1 = \frac{\partial U}{\partial Q_1}, \quad MU_2 = U'_2 = \frac{\partial U}{\partial Q_2}. \tag{6.2}
$$

Pro pevné $Q_1 = a, Q_2 = b$ se hodnota $MU_1(a, b)$ nazývá mezní užitečnost **v bodě (na hladině)** $[a, b]$.

> [!info] Intuice — co říká $MU_1(a,b)$
> $MU_1(a, b)$ je rychlost změny $U$ vzhledem k $Q_1$ v bodě $[a, b]$. Přibližně: změní-li se $Q_1$ z $a$ na $a+1$ při pevném $Q_2 = b$, změní se užitečnost zhruba o $MU_1(a, b)$. Stejně tak $MU_2$ pro $Q_2$. Mezní užitečnost tedy odpovídá „užitku z další jednotky" a podle předpokladu 5 s množstvím klesá.

### Totální diferenciál

Přibližnou změnu užitečnosti $\Delta U$ odpovídající změnám $\mathrm{d} Q_1, \mathrm{d} Q_2$ stanovíme pomocí **totálního diferenciálu**:

$$
\Delta U \approx \mathrm{d} U = U'_1 \mathrm{d} Q_1 + U'_2 \mathrm{d} Q_2 = MU_1 \mathrm{d} Q_1 + MU_2 \mathrm{d} Q_2. \tag{6.3}
$$

Skutečná změna je $\Delta U = U(Q_1 + \mathrm{d} Q_1, Q_2 + \mathrm{d} Q_2) - U(Q_1, Q_2)$.

## Vlastnosti funkce užitečnosti

Funkce užitečnosti musí vyjadřovat dva ekonomicky zásadní předpoklady — **rostoucí užitečnost** (předpoklad 4) a **klesající mezní užitečnost** (předpoklad 5).

**Předpoklad 4** (rostoucí užitečnost) znamená, že při pevně zadaných $Q_2 = a_0$, resp. $Q_1 = b_0$ jsou funkce jedné proměnné $U(Q_1, a_0)$, $U(b_0, Q_2)$ rostoucí. To platí, jestliže $\dfrac{\mathrm{d} U(Q_1, a_0)}{\mathrm{d} Q_1} > 0$ a $\dfrac{\mathrm{d} U(b_0, Q_2)}{\mathrm{d} Q_2} > 0$, tj.

$$
U'_1 > 0, \quad U'_2 > 0. \tag{6.4}
$$

Tedy mezní užitečnosti obou zboží jsou **kladné** — užitečnost roste s množstvím každého zboží.

**Předpoklad 5** (klesající mezní užitečnost) požaduje, aby $U'_1, U'_2$ byly klesající funkce. To znamená, že jejich parciální derivace podle příslušné proměnné jsou **záporné**:

$$
U''_{11} < 0, \quad U''_{22} < 0. \tag{6.5}
$$

Podmínka (6.5) je známa jako **zákon klesající mezní užitečnosti (law of diminishing marginal utility)** — mezní užitečnost každého zboží klesá s růstem jeho množství. Jde o analogii zákona klesajících výnosů z [[produkce|produkční teorie]].

Podmínky (6.4), (6.5) určují tvary křivek $U(Q_1, b_0)$ a $U(a_0, Q_2)$ v souřadnicových rovinách $(U, Q_1)$ a $(U, Q_2)$ (obrázek 6.1). Tyto křivky procházejí počátkem (neboť obvykle $U(0, 0) = 0$), jsou **rostoucí** a **konkávní**. Typický tvar grafu $U = U(Q_1, Q_2)$ — plocha v prostoru — je na obrázku 6.2.

*Obrázek 6.1 — typické průběhy funkce užitečnosti $U(Q_1, b)$ při pevném $Q_2 = b$ (vlevo) a $U(a, Q_2)$ při pevném $Q_1 = a$ (vpravo) pro různé hladiny druhé proměnné.*

*Obrázek 6.2 — plocha funkce užitečnosti $U = U(Q_1, Q_2)$ nad rovinou $(Q_1, Q_2)$ s řezy rovinami $Q_1 = \text{const}$ a $Q_2 = \text{const}$ a s křivkou $U(Q_1, Q_2) = c$.*

### Příklad 6.2 — ověření vlastností a dopočet pro $U = Q_1^{1/2} Q_2^{1/3}$

**Ověření (6.4) a (6.5).**

$$
U'_1 = \tfrac{1}{2} Q_1^{-1/2} Q_2^{1/3}, \quad U'_2 = \tfrac{1}{3} Q_1^{1/2} Q_2^{-2/3},
$$

zřejmě $U'_1, U'_2 > 0$ a platí (6.4). Dále:

$$
U''_{11} = -\tfrac{1}{4} Q_1^{-3/2} Q_2^{1/3}, \quad U''_{22} = -\tfrac{2}{9} Q_1^{1/2} Q_2^{-5/3},
$$

opět $U''_{11}, U''_{22} < 0$, platí (6.5).

**(a) Mezní užitečnosti v bodě $[100, 200]$.**

$$
MU_1(100, 200) = \tfrac{1}{2} \cdot 100^{-1/2} \cdot 200^{1/3} \doteq 0{,}4204,
$$

$$
MU_2(100, 200) = \tfrac{1}{3} \cdot 100^{1/2} \cdot 200^{-2/3} \doteq 0{,}63067.
$$

*Interpretace:* $MU_2(100, 200) \doteq 0{,}63067$ znamená, že na hladině $[100, 200]$ roste užitečnost při jednotkové změně $Q_2$ přibližně o 0,63067.

**(b) Odhad změny $\Delta U$ pomocí totálního diferenciálu (6.3).** Klesne-li vzhledem k hladině $[100, 200]$ množství $Q_1$ na 98 (tj. $\mathrm{d} Q_1 = -2$) a vzroste-li $Q_2$ o 3 (tj. $\mathrm{d} Q_2 = 3$):

$$
\Delta U \approx \mathrm{d} U = 0{,}4204 \cdot (-2) + 0{,}63067 \cdot 3 = -0{,}8408 + 1{,}89201 \doteq 1{,}05.
$$

Užitečnost se tedy zvýší přibližně o **1,05**. Skutečná změna je $\Delta U = U(98, 203) - U(100, 200) \doteq 1{,}031$ — relativní chyba odhadu je zhruba 2 %. Aproximace totálním diferenciálem je uspokojivá pro malé $\mathrm{d} Q_1, \mathrm{d} Q_2$.

## Cobb-Douglasova funkce užitečnosti

Nejčastěji používané funkce užitečnosti mají tvar

$$
U(Q_1, Q_2) = Q_1^a \cdot Q_2^b, \tag{6.6}
$$

kde $a, b$ jsou kladná čísla; nazývají se **Cobb-Douglasovy** (v příbuznosti s produkčními funkcemi — viz [[produkce|kapitola 5]]). Obvykle se volí $a, b \in (0, 1)$, často se klade $b = 1 - a$, čímž (6.6) přejde na tvar

![[imek-cobb-douglas-3d-plus-ic.jpeg|3D plocha užitečnosti U = Q_1^(1/2)·Q_2^(1/2) s horizontálními řezy projektovanými na indiferenční křivky — IC jsou vrstevnice funkce užitečnosti]]


$$
U(Q_1, Q_2) = Q_1^a \cdot Q_2^{1-a}.
$$

> [!example] Příklad 6.3 — ověření vlastností pro $U = Q_1^{1/4} Q_2^{3/4}$
>
> $$
> U'_1 = \tfrac{1}{4} Q_1^{-3/4} Q_2^{3/4} > 0, \quad U'_2 = \tfrac{3}{4} Q_1^{1/4} Q_2^{-1/4} > 0,
> $$
>
> $$
> U''_{11} = -\tfrac{3}{16} Q_1^{-7/4} Q_2^{3/4} < 0, \quad U''_{22} = -\tfrac{3}{16} Q_1^{1/4} Q_2^{-5/4} < 0,
> $$
>
> tedy podmínky (6.4) i (6.5) jsou splněny.

## Indiferenční křivky (křivky užitečnosti) a jejich vlastnosti

**Křivky užitečnosti** (utility curves) jsou indiferenční křivky funkce užitečnosti. Jsou dány rovnicí

$$
U(Q_1, Q_2) = c, \tag{6.7}
$$

kde $c$ je kladná konstanta. Pro Cobb-Douglasovu funkci:

$$
Q_1^a \cdot Q_2^b = c. \tag{6.8}
$$

Body na téže křivce užitečnosti reprezentují kombinace $[Q_1, Q_2]$ se **stejnou úrovní uspokojení** $c$. Křivky užitečnosti vznikají jako průsečnice plochy $U = U(Q_1, Q_2)$ s rovinami $U = c$ rovnoběžnými s rovinou $(Q_1, Q_2)$ (obrázek 6.2). Jsou v příbuznosti s **izokvantami** produkčních funkcí.

*Obrázek 6.3 — typický tvar křivek užitečnosti pro Cobb-Douglasovu funkci pro $a < b$ (vlevo) a $a > b$ (vpravo); různé hladiny $c_0 < c_1 < c_2$.*

*Obrázek 6.4 — soustava křivek užitečnosti pro tři hladiny (10, 20, 30) v rovině $(Q_1, Q_2)$; body $A = [a_1, a_2], B = [b_1, b_2]$ leží na téže křivce (hladina 10), body $C, D$ na vyšší hladině.*

> [!example] Příklad 6.4 — rovnice křivek užitečnosti
> Pro $U(Q_1, Q_2) = Q_1^{1/4} Q_2^{3/4}$ mají křivky užitečnosti rovnici $Q_1^{1/4} Q_2^{3/4} = c$. Umocněním na čtvrtou mocninu dostáváme $Q_1 Q_2^{3} = c^{4}$. Pro $c = 1$: $Q_2 = Q_1^{-1/3} = \dfrac{1}{\sqrt[3]{Q_1}}$. Pro $c = 2$: $Q_2 = 2^{4/3} \cdot Q_1^{-1/3} = \dfrac{2 \sqrt[3]{2}}{\sqrt[3]{Q_1}}$ (obrázek 6.5).

### Čtyři vlastnosti křivek užitečnosti

![[imek-ic-4vlastnosti-anotovane.jpeg|Čtyři vlastnosti indiferenčních křivek: klesající, neprotínající se, vzdálenější = vyšší užitek, konvexní]]

> [!warning] Čtyři základní vlastnosti indiferenčních křivek
> **1° Klesající.** Je-li nakoupeno méně jednoho zboží, je k dosažení stejného uspokojení třeba kompenzovat větším množstvím druhého zboží. Sklon tečny je
>
> $$\operatorname{tg} \alpha = -\frac{U'_1}{U'_2} < 0$$
>
> (derivace implicitně zadané funkce $U(Q_1, Q_2) - c = 0$). Ze záporné derivace plyne klesající průběh.
>
> **2° Neprotínají se.** V průsečíku by týž svazek ležel na dvou různých hladinách užitečnosti, což je spor.
>
> **3° Čím vzdálenější od počátku, tím vyšší užitečnost** (obrázek 6.4).
>
> **4° Konvexní.** Pro každé dva body $A, B$ na téže křivce leží vnitřní body úsečky $AB$ ve **vyšší** hladině užitečnosti (tj. „nad" křivkou) — vyjadřuje to preferenci smíšených svazků před krajními.

*Obrázek 6.6 — klesající a konvexní průběh $U(Q_1, Q_2) = c$ s tečnou se sklonem $\operatorname{tg}\alpha$.*

## Mezní míra komoditní substituce (MRCS)

**Mezní míra komoditní substituce** $\text{MRCS}$ (**marginal rate of commodity substitution**) je podíl mezních užitečností:

$$
\text{MRCS} = \text{MRCS}(Q_1, Q_2) = \frac{MU_1}{MU_2} = \frac{U'_1}{U'_2}. \tag{6.9}
$$

Geometricky: $-\tfrac{U'_1}{U'_2}$ je derivace funkce $Q_2 = f(Q_1)$ zadané implicitně rovnicí $U(Q_1, Q_2) = c$. Protože je vždy záporná (křivka je klesající), bereme absolutní hodnotu a kladný $\text{MRCS}$ chápeme jako velikost kompenzace.

> [!info] Intuice — MRCS jako sklon indiferenční křivky
> $\text{MRCS}(Q_1, Q_2)$ je **míra, jakou je spotřebitel ochoten zaměnit $Q_1$ za $Q_2$ při zachování užitečnosti** — tedy kolik jednotek $Q_2$ „obětuje" za jednu jednotku $Q_1$ navíc, aby zůstal na téže indiferenční křivce. Geometricky jde o absolutní hodnotu sklonu tečny k indiferenční křivce v daném bodě.

Pro obecnou změnu $\mathrm{d} Q_1$ platí

$$
\Delta Q_2 \approx \mathrm{d} Q_2 = -\text{MRCS} \cdot \mathrm{d} Q_1, \tag{6.10}
$$

$$
\mathrm{d} Q_1 = -\frac{1}{\text{MRCS}}\, \mathrm{d} Q_2. \tag{6.11}
$$

> [!example] Příklad 6.5 — MRCS pro Cobb-Douglasovu užitečnost
> Pro $U(Q_1, Q_2) = Q_1^{1/2} Q_2^{1/2}$ platí
>
> $$\text{MRCS} = \frac{\tfrac{1}{2} Q_1^{-1/2} Q_2^{1/2}}{\tfrac{1}{2} Q_1^{1/2} Q_2^{-1/2}} = \frac{Q_2}{Q_1}.$$
>
> Tedy $\text{MRCS}(300, 500) = \tfrac{500}{300} = \tfrac{5}{3}$. *Interpretace:* zvýší-li spotřebitel nákup prvního zboží o 1 jednotku, musí snížit nákup druhého zboží přibližně o $\tfrac{5}{3}$ jednotky, aby se užitečnost zachovala.

(Paralelou je [[produkce|mezní míra technické substituce MRTS]] z produkční teorie.)

## 6.3 – 6.4 Optimalizace spotřebitele — přehled

Rámcově se v kapitole 6 studují **dvě vázané optimalizační úlohy** s užitečností:

- **Primární úloha** — maximalizace $U(Q_1, Q_2)$ při **rozpočtovém omezení** $Y^* = P_1^* Q_1 + P_2^* Q_2$. Výstupem je Marshallova poptávka $Q_i = D_i(P_1, P_2, Y)$.
- **Duální úloha** — minimalizace výdajů $E = P_1^* Q_1 + P_2^* Q_2$ při zadané hladině užitečnosti $U^*$. Výstupem je Hicksova poptávka $Q_i = D_i(P_1, P_2, U)$.

Obě úlohy se řeší [[lagrangeova-metoda|metodou Lagrangeových multiplikátorů]] a vedou na **tentýž bod dotyku** $Q^*[Q_1^*, Q_2^*]$ indiferenční křivky a rozpočtové přímky (resp. přímky výdajů), v němž platí podmínka optimality

$$
\text{MRCS} = \frac{U'_1}{U'_2} = \frac{P_1^*}{P_2^*}.
$$

Poměr mezních užitečností se rovná poměru cen — sklon indiferenční křivky v optimu se rovná sklonu rozpočtové přímky.

> [!info] Pro detailní postup viz [[optimalizace-spotrebitele]]
> Kompletní odvození obou úloh Lagrangeovou metodou, geometrická interpretace, řešené **Příklady 6.5–6.8** (MRCS pro Cobb-Douglase, maximalizace $U = Q_1 Q_2$ s výsledkem $Q_1 = 25, Q_2 = 10$; minimalizace výdajů s $Q_1 = 4, Q_2 = 1$; obecná Hicksova poptávka pro $U = Q_1^{1/2} Q_2^{1/2}$), odvození Marshallovy i Hicksovy funkce poptávky a Engelových funkcí, vztah dualita primární ↔ duální úlohy a úlohy **6.8–6.13** jsou na stránce [[optimalizace-spotrebitele|Optimalizace spotřebitele — Lagrange, poptávka, minimalizace výdajů]].

## Shrnutí kapitoly 6

Každá $n$-tice množství jednotlivých zboží je **svazek zboží**. Přiřadíme-li každému svazku kladné číslo (jeho užitečnost), můžeme svazky uspořádat podle rostoucí užitečnosti; svazky se stejnou užitečností jsou indiferentní. Tím je definována **relace preference** a současně **funkce užitečnosti**. Její parciální derivace (podle jednotlivých množství) jsou **mezní užitečnosti** — přibližná změna užitečnosti při jednotkové změně příslušného zboží. Aby funkce mohla být funkcí užitečnosti, musejí být její první parciální derivace **kladné** (6.4) a druhé parciální derivace **záporné** (6.5 — zákon klesající mezní užitečnosti). **Indiferenční křivky** $U(Q_1, Q_2) = c$ jsou klesající, neprotínající se, vzdálenější od počátku mají vyšší užitečnost a jsou konvexní. $\text{MRCS}$ = podíl mezních užitečností udává náhradu jednoho zboží druhým při zachování užitečnosti. Na tento teoretický základ navazují optimalizační úlohy (**maximalizace užitečnosti** a duální **minimalizace výdajů**) řešené Lagrangeovou metodou — viz [[optimalizace-spotrebitele]].

## Otázky k sebehodnocení

1. Co se zahrnuje pod termín užitečnost?
2. Co se rozumí svazkem zboží? Které svazky zboží jsou indiferentní?
3. Jak souvisejí hodnoty funkce užitečnosti s preferencí svazků?
4. Jak se vypočítá mezní užitečnost?
5. Jak lze ekonomicky interpretovat fakt, že mezní užitečnost určitého zboží se rovná 2,5?
6. Jaké vlastnosti musí mít funkce více proměnných, aby mohla být funkcí užitečnosti?
7. Které jsou nejčastěji používané funkce užitečnosti?
8. Jakou rovnici mají křivky užitečnosti? Co platí v bodech ležících na téže křivce užitečnosti?
9. Proč mají křivky užitečnosti záporný sklon?
10. Jak se vypočte mezní míra komoditní substituce? Vysvětlete, co vypočtená hodnota vyjadřuje.

## Úlohy — teorie užitečnosti (6.1 – 6.7)

**6.1** Užitečnost pro tři zboží — hudbu, čokoládu a sýr je dána vztahem $U = Q_1 + 1{,}5 Q_2 + 2 Q_3$. (a) Vypočtěte $U(4, 2, 2)$, $U(1, 4, 2)$, $U(2, 3, 1)$. (b) Rozhodněte o vzájemné preferenci, resp. indiferentnosti svazků v (a).

**6.2** Je dána užitečnost $U = 2 Q_1^{1/3} Q_2^{1/2} Q_3$ pro tři zboží. Rozhodněte o vzájemné preferenci, resp. indiferentnosti svazků $(36, 27, 10)$, $(64, 8, 20)$, $(25, 64, 8)$, $(4, 125, 6)$, $(9, 40, 12)$, $(9, 64, 5)$, $(64, 8, 10)$ a uspořádejte je s neklesající užitečností.

**6.3** Je dána užitečnost $U = Q_1^{1/2} Q_2^{1/2}$. (a) Vypočtěte užitečnost pro $Q_1 = 50, Q_2 = 80$. (b) Určete mezní užitečnosti $MU_1, MU_2$ pro $Q_1 = 50, Q_2 = 80$ a výsledky ekonomicky interpretujte. (d) Odhadněte změnu užitečnosti v důsledku změny $Q_1$ na 60 a poklesu $Q_2$ o 5 vzhledem k hladině dle (a) a porovnejte se skutečnou změnou užitečnosti.

**6.4** Je dána funkce $U(Q_1, Q_2) = Q_1^{1/2} Q_2^{1/2}$. (a) Ověřte, že tato funkce vykazuje vlastnosti funkce užitečnosti. (b) Najděte a načrtněte křivky $U(Q_1, 1), U(Q_1, 2), U(1, Q_2), U(2, Q_2), U(3, Q_2)$.

**6.5** Je dána užitečnost $U = Q_1^{2/3} Q_2^{1/3}$. (a) Najděte rovnici křivek užitečnosti. (b) Určete a načrtněte křivky $U(Q_1, Q_2) = 2, U(Q_1, 3), U(Q_1, 2), U(2, Q_2), U(3, Q_2)$. Leží některé z bodů $A[1{,}5; 3{,}555]$, $B[2{,}5; 1{,}28]$, $C[2; U(Q_1, 3) = 3]$ (c) Leží některé z bodů $D[3; 1; 0{,}832]$, $E[2{,}5; 4{,}32]$ na téže křivce užitečnosti? Když ano, určete ji.

**6.6** Je dána užitečnost $U = Q_1^{2/3} Q_2^{1/3}$. (a) Najděte mezní míru komoditní substituce $\text{MRCS}$ pro $Q_1 = 100, Q_2 = 200$ a výsledek ekonomicky interpretujte. (c) Odhadněte, o kolik je třeba změnit $Q_1$, poklesne-li $Q_2$ o 5 vzhledem k hladině dle (b).

**6.7** Míra uspokojení z nákupu množství $Q_1$ nealko nápojů a množství $Q_2$ hamburgerů za týden je dána funkcí užitečnosti $U = \sqrt{Q_1 Q_2}$. (a) Najděte vztah pro hodnoty $Q_1, Q_2$, pro něž je dosaženo užitečnosti 10 a uveďte několik takových dvojic hodnot. (b) Najděte $\text{MRCS}$ na křivce nalezené v (a). (c) Ekonomicky interpretujte smysl $\text{MRCS}(5, 20)$, $\text{MRCS}(20, 5)$, $\text{MRCS}(2, 50)$.

> [!tip] Úlohy 6.8 – 6.13 (optimalizace, Lagrange, poptávka)
> Úlohy navázané na maximalizaci užitečnosti, minimalizaci výdajů a odvození Marshallových/Hicksových funkcí poptávky jsou na stránce [[optimalizace-spotrebitele#Úlohy k optimalizaci|Optimalizace spotřebitele — Úlohy]].

## Klíčové pojmy

- **Užitečnost (utility)** — ordinálně měřený ukazatel uspokojení spotřebitele ze svazku zboží.
- **Kardinalistický vs. ordinalistický přístup** — historická pojetí užitečnosti; v současnosti se preferuje ordinalistický.
- **Pět předpokladů chování spotřebitele** — racionalita, ordinalita, konzistence a tranzitivita, rostoucí užitečnost, klesající mezní užitečnost.
- **Svazek zboží (bundle of goods)** — uspořádaná $n$-tice $(Q_1, \dots, Q_n)$.
- **Relace preference** — uspořádání svazků podle užitečnosti; **indiferentní svazky** mají stejnou užitečnost.
- **Funkce užitečnosti** $U = U(Q_1, \dots, Q_n)$ — vzorec (6.1); ekvivalentní až na monotónní transformaci.
- **Mezní užitečnost** $MU_i = U'_i$ — vzorec (6.2); **totální diferenciál** $\mathrm{d} U$ — (6.3).
- **Vlastnosti funkce užitečnosti** — (6.4) $U'_i > 0$, (6.5) $U''_{ii} < 0$ (zákon klesající mezní užitečnosti).
- **Cobb-Douglasova funkce užitečnosti** $U = Q_1^a Q_2^b$ — (6.6), speciálně $b = 1 - a$.
- **Křivky užitečnosti (indiferenční)** $U(Q_1, Q_2) = c$ — (6.7), (6.8); čtyři vlastnosti: klesající, neprotínající se, vzdálenější od počátku = vyšší $U$, konvexní.
- **Mezní míra komoditní substituce** $\text{MRCS} = MU_1 / MU_2$ — (6.9); vztahy (6.10), (6.11).
- **Podmínka optimality** $\text{MRCS} = P_1/P_2$ — viz [[optimalizace-spotrebitele]] pro plné odvození.

## Navigace

- **Navazující téma:** [[optimalizace-spotrebitele|Optimalizace spotřebitele]] (Lagrange, max $U$, min $E$, funkce poptávky, Příklady 6.5–6.8, úlohy 6.8–6.13).
- **Související pojmy:** [[funkce-vice-promennych|Funkce více proměnných]] (parciální derivace = mezní užitečnost), [[derivace|Derivace]] (parciální derivace, totální diferenciál), [[produkce|Produkce]] (paralela: MRCS ↔ MRTS, izokvanty ↔ indiferenční křivky, Cobb-Douglas), [[poptavka-nabidka|Poptávka a nabídka]] (Marshallovy poptávkové funkce $D_i$), [[lagrangeova-metoda|Lagrangeova metoda]] (vázaná optimalizace — nástroj pro navazující téma).
- **Přednášky:** [[imek-blok-02|KS 2. blok]], [[imek-blok-03|KS 3. blok]]
- **Kurz:** [[imek|Matematická ekonomie]]
