---
title: "Optimalizace spotřebitele — Lagrange, poptávka, minimalizace výdajů"
course: imek
type: topic
tags: [optimalizace-spotrebitele, lagrange, uzitecnost, poptavka-spotrebitele, minimalizace-vydaju, dualita]
sources: [raw/imek/kniha_scanned/]
created: 2026-04-22
updated: 2026-04-22
---

# Optimalizace spotřebitele — Lagrange, poptávka, minimalizace výdajů

## TL;DR

**Optimalizace spotřebitele** řeší, jaký svazek zboží $[Q_1^*, Q_2^*]$ zvolit při známých cenách a důchodu. Existují dvě ekvivalentní formulace: **primární úloha** — maximalizace užitečnosti $U(Q_1, Q_2)$ při rozpočtovém omezení $Y^* = P_1 Q_1 + P_2 Q_2$, a **duální úloha** — minimalizace výdajů $E = P_1 Q_1 + P_2 Q_2$ při zadané hladině užitečnosti $U^*$. Obě úlohy se řeší [[lagrangeova-metoda|metodou Lagrangeových multiplikátorů]] a vedou na tentýž bod dotyku indiferenční křivky a rozpočtové přímky, v němž platí $\text{MRCS} = P_1/P_2$. Výstupem jsou **funkce poptávky** — Marshallova (závislá na důchodu) a Hicksova (závislá na hladině užitečnosti).

## Úvod — proč optimalizovat

Racionální spotřebitel má omezený důchod a musí se rozhodnout, jak jej rozdělit mezi spotřebovávané zboží. V modelu pro dvě zboží je k dispozici částka $Y^*$ a ceny $P_1^*, P_2^*$, rozpočtové omezení má tvar

$$
Y^* = P_1^* Q_1 + P_2^* Q_2, \tag{6.12}
$$

geometricky **rozpočtová přímka (budget line)** procházející body $[Y^*/P_1^*, 0]$ a $[0, Y^*/P_2^*]$. Spotřebitel chce v rámci této přímky (a pod ní) najít svazek s nejvyšší dostupnou užitečností. Teorie před optimalizací — tvar funkce $U$, indiferenční křivky a $\text{MRCS}$ — je shrnuta v [[uzitecnost|Užitečnost]].

> [!warning] Pozor — dvě úlohy, totéž řešení
> **Primární úloha** (max $U$ při pevném rozpočtu) a **duální úloha** (min $E$ při pevné užitečnosti) vedou na **tentýž bod** $Q^*[Q_1^*, Q_2^*]$. Rozdíl je v tom, co je „vstup" a co „výstup": u primární úlohy je zadán důchod $Y^*$ a hledáme maximální $U^*$; u duální úlohy je zadána hladina $U^*$ a hledáme minimální $E^*$. Z pozorování je přirozenější minimalizace výdajů (výdaje lze měřit).

## Maximalizace užitečnosti za rozpočtového omezení

Úlohou je najít maximum $U(Q_1, Q_2)$ vázané podmínkou (6.12) ve tvaru $g(Q_1, Q_2) = Y^* - P_1^* Q_1 - P_2^* Q_2 = 0$. Použijeme [[lagrangeova-metoda|metodu Lagrangeových multiplikátorů]].

### Lagrangeova funkce a podmínky optimality

Sestavíme

$$
\mathcal{L}(Q_1, Q_2, \lambda) = U(Q_1, Q_2) + \lambda(Y^* - P_1^* Q_1 - P_2^* Q_2). \tag{6.13}
$$

Soustava prvního řádu:

$$
\begin{aligned}
\mathcal{L}'_1 &= U'_1 - \lambda P_1^* = 0, \\
\mathcal{L}'_2 &= U'_2 - \lambda P_2^* = 0, \\
\mathcal{L}'_\lambda &= Y^* - P_1^* Q_1 - P_2^* Q_2 = 0.
\end{aligned}
\tag{6.14}
$$

Díky konvexitě indiferenčních křivek je řešení **vázaným maximem**. Z prvních dvou rovnic po vyloučení $\lambda$ dostáváme **podmínku optimality**:

$$
\boxed{\; \text{MRCS} = \frac{U'_1}{U'_2} = \frac{P_1^*}{P_2^*} \;}
$$

> [!info] Intuice — mezní poměr užitečnosti = mezní poměr cen
> Podmínka $\text{MRCS} = P_1^*/P_2^*$ říká, že v optimu je **sklon indiferenční křivky roven sklonu rozpočtové přímky**. Ekonomicky: spotřebitel je ochoten vyměnit $Q_1$ za $Q_2$ v přesně tom poměru, v jakém je trh (ceny) umožňuje vyměňovat. Kdyby $\text{MRCS} > P_1/P_2$, vyplatilo by se nakupovat více $Q_1$ (subjektivní ocenění převažuje nad tržním); kdyby $\text{MRCS} < P_1/P_2$, vyplatil by se opak.

### Interpretace $\lambda$ — mezní užitečnost důchodu

Lagrangeův multiplikátor $\lambda^*$ představuje **mezní užitečnost důchodu** — přibližnou změnu maximální užitečnosti $U^*$ při jednotkové změně důchodu $Y^*$. Je to **stínová cena** rozpočtového omezení.

> [!tip] Postup — maximalizace užitečnosti Lagrangeovou metodou
> 1. **Zapiš rozpočtové omezení** ve tvaru $Y^* - P_1^* Q_1 - P_2^* Q_2 = 0$.
> 2. **Sestav Lagrangeovu funkci** $\mathcal{L} = U(Q_1, Q_2) + \lambda(Y^* - P_1^* Q_1 - P_2^* Q_2)$.
> 3. **Spočítej parciální derivace** podle $Q_1, Q_2, \lambda$ a polož je rovny nule.
> 4. **Vyluč $\lambda$** dělením prvních dvou rovnic — dostaneš podmínku $\text{MRCS} = P_1^*/P_2^*$, která dá vztah mezi $Q_1$ a $Q_2$.
> 5. **Dosaď do rozpočtového omezení** a vypočítej $Q_1^*, Q_2^*$, případně $\lambda^*$ a maximální užitečnost $U^* = U(Q_1^*, Q_2^*)$.

## Geometrie optima — tečnost IC a rozpočtové přímky

![[imek-uzitecnost-optimum.jpeg|Indiferenční křivky + rozpočtová přímka, optimum v bodě tečnosti MRCS = P_1/P_2]]

*Obrázek 6.7 — Rozpočtová přímka $Y^* = P_1^* Q_1 + P_2^* Q_2$ protíná osy v $Y^*/P_1^*$ a $Y^*/P_2^*$. Tři indiferenční křivky $c_1 < c^* < c_2$. Optimum $Q^*[Q_1^*, Q_2^*]$ je bod dotyku rozpočtové přímky s křivkou $c^*$. Křivka $c_1$ je dosažitelná, ale nemaximalizuje užitečnost; křivka $c_2$ není při daném důchodu dosažitelná.*

Geometrie je jádrem intuice: přímka (rozpočet) a křivka (užitečnost) se v optimu **dotýkají**, tj. mají v bodě $Q^*$ společnou tečnu. To přímo převádí podmínku $\text{MRCS} = P_1/P_2$ — poměr mezních užitečností (sklon IC) = poměr cen (sklon přímky).

## Příklad 6.5 — MRCS pro Cobb-Douglasovu užitečnost

Pro $U(Q_1, Q_2) = Q_1^{1/2} Q_2^{1/2}$ platí

$$\text{MRCS} = \frac{\tfrac{1}{2} Q_1^{-1/2} Q_2^{1/2}}{\tfrac{1}{2} Q_1^{1/2} Q_2^{-1/2}} = \frac{Q_2}{Q_1}.$$

Tedy $\text{MRCS}(300, 500) = \tfrac{500}{300} = \tfrac{5}{3}$. *Interpretace:* zvýší-li spotřebitel nákup prvního zboží o 1 jednotku, musí snížit nákup druhého zboží přibližně o $\tfrac{5}{3}$ jednotky, aby se užitečnost zachovala. Tato forma $\text{MRCS} = Q_2/Q_1$ je typická pro symetrické Cobb-Douglasovy preference a vstupuje do optimalizace skrze podmínku $\text{MRCS} = P_1/P_2$.

## Příklad 6.6 — maximalizace užitečnosti pro $U = Q_1 Q_2$

Je dána $U(Q_1, Q_2) = Q_1 Q_2$, $P_1^* = 2$, $P_2^* = 5$, $Y^* = 100$. Lagrangeova funkce:

$$
\mathcal{L}(Q_1, Q_2, \lambda) = Q_1 Q_2 + \lambda(100 - 2 Q_1 - 5 Q_2).
$$

Soustava:

$$
\begin{aligned}
Q_2 - 2 \lambda &= 0, \\
Q_1 - 5 \lambda &= 0, \\
100 - 2 Q_1 - 5 Q_2 &= 0.
\end{aligned}
$$

Z prvních dvou rovnic $Q_2 = 2\lambda$, $Q_1 = 5\lambda$; dosazením do třetí $100 = 2 \cdot 5\lambda + 5 \cdot 2\lambda = 20\lambda$, tedy $\lambda = 5$. Odtud **$Q_1^* = 25$, $Q_2^* = 10$**, maximální užitečnost $U^* = 25 \cdot 10 = 250$.

*Obrázek 6.8 — Rozpočtová přímka $100 - 2 Q_1 - 5 Q_2 = 0$ procházející body $A[0, 20]$ a $B[50, 0]$; hyperbolická indiferenční křivka $Q_2 = 250/Q_1$ se dotýká rozpočtové přímky v bodě $E[25, 10]$. Sklon přímky $-\tfrac{2}{5}$ odpovídá $-\text{MRCS}(25, 10) = -\tfrac{10}{25} = -\tfrac{2}{5}$.*

## Funkce poptávky spotřebitele (Marshallova)

Považujeme-li v úloze $P_1, P_2, Y$ za **parametry** (nikoli čísla), dostáváme z první řádové podmínky **Marshallovy poptávkové funkce**:

$$
Q_1 = D_1(P_1, P_2, Y), \quad Q_2 = D_2(P_1, P_2, Y), \tag{6.15}
$$

$$
\lambda = \lambda(P_1, P_2, Y). \tag{6.16}
$$

**Odvození pro $U = Q_1 Q_2$.** Lagrangeova funkce $\mathcal{L} = Q_1 Q_2 + \lambda(Y - P_1 Q_1 - P_2 Q_2)$ dává soustavu

$$
\begin{aligned}
\mathcal{L}'_1 &= Q_2 - \lambda P_1 = 0, \\
\mathcal{L}'_2 &= Q_1 - \lambda P_2 = 0, \\
\mathcal{L}'_\lambda &= Y - P_1 Q_1 - P_2 Q_2 = 0.
\end{aligned}
\tag{6.17}
$$

Z prvních dvou: $Q_2 = P_1 \lambda$ (6.18), $Q_1 = P_2 \lambda$ (6.19). Dosazením do třetí $Y = P_1 \cdot P_2 \lambda + P_2 \cdot P_1 \lambda = 2 P_1 P_2 \lambda$, odtud

$$
\lambda = \frac{Y}{2 P_1 P_2}. \tag{6.20}
$$

Zpětně:

$$
\boxed{\; Q_1 = \frac{Y}{2 P_1}, \quad Q_2 = \frac{Y}{2 P_2} \;} \tag{6.21}
$$

### Engelova funkce

Pro **pevné ceny** a proměnný důchod se Marshallova poptávka stává **Engelovou funkcí**: pro $Y = 100$ vychází $Q_1 = 50/P_1$, $Q_2 = 50/P_2$. Pro pevné ceny $P_1 = 10, P_2 = 20$ dostáváme Engelovy funkce $Q_1 = Y/20$, $Q_2 = Y/40$ — lineární závislost spotřebovaného množství na důchodu.

## Duální úloha — minimalizace výdajů

Výdaje spotřebitele jsou

$$
E = E(Q_1, Q_2) = P_1^* Q_1 + P_2^* Q_2, \tag{6.22}
$$

a je pevně zadána hladina užitečnosti

$$
U^* = U(Q_1, Q_2). \tag{6.23}
$$

**Úlohou o minimalizaci výdajů** je najít minimum $E(Q_1, Q_2)$ vázané podmínkou (6.23) ve tvaru $g(Q_1, Q_2) = U^* - U(Q_1, Q_2) = 0$.

### Lagrangeova funkce

$$
\mathcal{L}(Q_1, Q_2, \lambda) = P_1^* Q_1 + P_2^* Q_2 + \lambda(U^* - U(Q_1, Q_2)). \tag{6.24}
$$

Soustava podmínek prvního řádu:

$$
\begin{aligned}
\mathcal{L}'_1 &= P_1^* - \lambda U'_1 = 0, \\
\mathcal{L}'_2 &= P_2^* - \lambda U'_2 = 0, \\
\mathcal{L}'_\lambda &= U^* - U(Q_1, Q_2) = 0.
\end{aligned}
\tag{6.25}
$$

Postačující podmínka pro minimum (vzhledem k linearitě funkce výdajů) má tvar

$$
D(Q_1, Q_2, \lambda) = -\lambda \left(U''_{11} + U''_{22} + 2 U''_{12}\right). \tag{6.26}
$$

**Geometrie (obrázek 6.9).** Řešením je bod $Q^*[Q_1^*, Q_2^*]$ dotyku křivky užitečnosti $U^* = U(Q_1, Q_2)$ s přímkou výdajů $E^* = P_1^* Q_1 + P_2^* Q_2$. Hladina $E_0 < E^*$ nestačí k dosažení $U^*$, hladina $E_1 > E^*$ je nadbytečná.

> [!tip] Postup — duální úloha (minimalizace výdajů)
> 1. **Zapiš vazbu** $U^* - U(Q_1, Q_2) = 0$ (zadaná hladina užitečnosti).
> 2. **Sestav Lagrangeovu funkci** $\mathcal{L} = P_1^* Q_1 + P_2^* Q_2 + \lambda(U^* - U(Q_1, Q_2))$.
> 3. **Derivace rovny nule**, z prvních dvou rovnic podílem dostaneš podmínku $\text{MRCS} = P_1^*/P_2^*$ (stejná jako u maximalizace!).
> 4. **Dosaď do vazby** $U(Q_1, Q_2) = U^*$ a vyřeš pro $Q_1^*, Q_2^*$.
> 5. **Vypočítej minimální výdaje** $E^* = P_1^* Q_1^* + P_2^* Q_2^*$ a případně ověř druhou podmínku (6.26).

## Příklad 6.7 — minimalizace výdajů pro $U = Q_1^{1/2} Q_2^{1/2}$

Dáno $U^* = 2$, $P_1^* = 0{,}25$, $P_2^* = 1$. Lagrangeova funkce:

$$
\mathcal{L} = 0{,}25 Q_1 + Q_2 + \lambda(2 - Q_1^{1/2} Q_2^{1/2}).
$$

Soustava:

$$
\begin{aligned}
\mathcal{L}'_1 &= 0{,}25 - \lambda \cdot \tfrac{1}{2} Q_1^{-1/2} Q_2^{1/2} = 0, \\
\mathcal{L}'_2 &= 1 - \lambda \cdot \tfrac{1}{2} Q_1^{1/2} Q_2^{-1/2} = 0, \\
\mathcal{L}'_\lambda &= 2 - Q_1^{1/2} Q_2^{1/2} = 0.
\end{aligned}
$$

Podílem prvních dvou rovnic: $0{,}25 = Q_2 / Q_1$, tj. $Q_2 = 0{,}25 Q_1$. Dosazením do třetí: $Q_1^{1/2} (0{,}25 Q_1)^{1/2} = 0{,}5 Q_1 = 2$, tedy **$Q_1^* = 4$, $Q_2^* = 1$**, $\lambda^* = 1$. Minimální výdaje: $E^* = 0{,}25 \cdot 4 + 1 \cdot 1 = 2$.

*Ověření postačující podmínky* (6.26): $U''_{11} = -\tfrac{1}{4} Q_1^{-3/2} Q_2^{1/2}$, $U''_{22} = -\tfrac{1}{4} Q_1^{1/2} Q_2^{-3/2}$, $U''_{12} = \tfrac{1}{4} Q_1^{-1/2} Q_2^{-1/2}$. Po dosazení $D(4, 1, 1) = 0{,}28125 > 0$ — v bodě $[4, 1]$ je vázané **minimum**.

## Poptávka minimalizující výdaje (Hicksova)

Obecně:

$$
Q_1 = D_1(P_1, P_2, U), \quad Q_2 = D_2(P_1, P_2, U), \tag{6.27}
$$

$$
\lambda = \lambda(P_1, P_2, U). \tag{6.28}
$$

Hicksova poptávka závisí na **hladině užitečnosti** $U$ (nikoli na důchodu $Y$ jako u Marshallovy). Fyzická interpretace: jaké množství zboží koupit při daných cenách, abych dosáhl předem stanovené úrovně uspokojení s minimálními výdaji.

## Příklad 6.8 — obecné odvození pro $U = Q_1^{1/2} Q_2^{1/2}$

$P_1, P_2, U$ jsou parametry. Lagrangeova funkce:

$$
\mathcal{L} = P_1 Q_1 + P_2 Q_2 + \lambda(U - Q_1^{1/2} Q_2^{1/2}).
$$

Soustava:

$$
\begin{aligned}
\mathcal{L}'_1 &= P_1 - \lambda \cdot \tfrac{1}{2} Q_1^{-1/2} Q_2^{1/2} = 0, \\
\mathcal{L}'_2 &= P_2 - \lambda \cdot \tfrac{1}{2} Q_1^{1/2} Q_2^{-1/2} = 0, \\
\mathcal{L}'_\lambda &= U - Q_1^{1/2} Q_2^{1/2} = 0.
\end{aligned}
$$

Podílem rovnic: $P_1/P_2 = Q_2/Q_1 \Rightarrow P_1 Q_1 = P_2 Q_2$, tedy celkové výdaje $E = P_1 Q_1 + P_2 Q_2 = 2 P_1 Q_1$. Odtud

$$
Q_1 = \frac{E}{2 P_1}, \quad Q_2 = \frac{E}{2 P_2}. \tag{6.29}
$$

Ze třetí rovnice $U = \sqrt{\tfrac{E}{2 P_1} \cdot \tfrac{E}{2 P_2}} = \tfrac{E}{2\sqrt{P_1 P_2}}$, tj. $E = 2 U \sqrt{P_1 P_2}$. Dosazením:

$$
\boxed{\; Q_1 = U \sqrt{\frac{P_2}{P_1}} = D_1(P_1, P_2, U), \quad Q_2 = U \sqrt{\frac{P_1}{P_2}} = D_2(P_1, P_2, U) \;} \tag{6.30}
$$

## Vztah primární a duální úlohy

Primární (max $U$ při rozpočtu $Y^*$) a duální (min $E$ při užitečnosti $U^*$) úloha jsou **ekvivalentní**: mají tentýž bod optima $Q^*[Q_1^*, Q_2^*]$ a v obou platí $\text{MRCS} = P_1/P_2$. Rozdíl je v tom, která veličina je zadána a která se optimalizuje:

![[imek-primarni-vs-dualni.jpeg|Primární (max U za rozpočtu) a duální (min E za užitku) úloha dávají stejný bod (Q_1*, Q_2*) — elegance duality]]


- **Primární** (Marshall): zadáno $Y$, hledáme maximální $U^*(P_1, P_2, Y)$ a poptávku $Q_i = D_i^M(P_1, P_2, Y)$.
- **Duální** (Hicks): zadáno $U$, hledáme minimální $E^*(P_1, P_2, U)$ a poptávku $Q_i = D_i^H(P_1, P_2, U)$.

Proč se studují obě? Marshallova poptávka je **pozorovatelná** (lze odhadnout z dat o spotřebě a důchodech), zatímco Hicksova umožňuje čistě oddělit **substituční efekt** změny ceny od efektu důchodového — je klíčová pro teorii blahobytu a cenové indexy.

## Úlohy k optimalizaci

### Maximalizace užitečnosti a Marshallova poptávka

**6.8** Jsou dány užitečnost $U = Q_1^{0{,}5} Q_2^{0{,}5}$, ceny $P_1^* = 4, P_2^* = 10$ za jednotku zboží a důchod spotřebitele 200. Určete množství $Q_1, Q_2$ maximalizující užitečnost.

**6.9** Jsou dány rozpočtové omezení $Y = P_1 Q_1 + P_2 Q_2$ a užitečnost $U = Q_1^{0{,}5} Q_2^{0{,}5}$. (a) Odvoďte funkce poptávky maximalizující užitečnost. (b) Najděte funkce poptávky pro důchod $Y^* = 500$. (c) Najděte Engelovy funkce pro ceny $P_1^* = 5, P_2^* = 10$.

**6.10** Odvoďte funkce poptávky pro Cobb-Douglasovy funkce užitečnosti $U = Q_1^a Q_2^b$, kde $a, b \in \langle 0, 1 \rangle$ a rozpočtové omezení $Y = P_1 Q_1 + P_2 Q_2$.

**6.11** Odvoďte funkce poptávky pro funkce užitečnosti CES typu $U = Q_1^a + Q_2^a$, kde $a \neq 0$ a rozpočtové omezení $Y = P_1 Q_1 + P_2 Q_2$.

### Minimalizace výdajů a Hicksova poptávka

**6.12** Jsou dány užitečnost $U = Q_1 Q_2$, $U^* = 10$ hladina užitečnosti a ceny $P_1^* = 2$, $P_2^* = 4$. Určete množství $Q_1, Q_2$ minimalizující výdaje spotřebitele $U = Q_1 \cdot Q_2$.

**6.13** Jsou dány výdaje spotřebitele $E = P_1 Q_1 + P_2 Q_2$ a užitečnost. (a) Najděte funkce poptávky minimalizující výdaje spotřebitele. (b) Určete funkce poptávky pro užitečnost $U^* = 25$ a stanovte příslušné výdaje spotřebitele při cenách $P_1^* = 20, P_2^* = 15$.

## Klíčové pojmy

- **Rozpočtové omezení (budget constraint)** $Y^* = P_1^* Q_1 + P_2^* Q_2$ — (6.12); **rozpočtová přímka (budget line)**.
- **Úloha o maximalizaci užitečnosti** (primární) — Lagrangeova funkce (6.13), soustava (6.14), podmínka optimality $\text{MRCS} = P_1^*/P_2^*$.
- **Lagrangeův multiplikátor $\lambda$** — stínová cena uvolnění omezení; u maximalizace **mezní užitečnost důchodu**.
- **Podmínka tečnosti** — sklon indiferenční křivky = sklon rozpočtové přímky; $\text{MRCS} = P_1/P_2$.
- **Poptávka maximalizující užitečnost (Marshallova)** — $Q_i = D_i(P_1, P_2, Y)$ — (6.15).
- **Engelova funkce** — poptávka jako funkce důchodu při pevných cenách.
- **Úloha o minimalizaci výdajů** (duální) — Lagrangeova funkce (6.24), soustava (6.25), postačující podmínka (6.26).
- **Poptávka minimalizující výdaje (Hicksova)** — $Q_i = D_i(P_1, P_2, U)$ — (6.27); obecný výsledek pro $U = Q_1^{1/2} Q_2^{1/2}$: (6.30).
- **Bod dotyku $Q^*[Q_1^*, Q_2^*]$** — řešení obou úloh; totožný pro primární i duální formulaci.
- **Dualita** — ekvivalence max $U$ a min $E$; Marshallova a Hicksova poptávka.

## Navigace

- **Teorie před optimalizací:** [[uzitecnost|Užitečnost]] (funkce $U$, indiferenční křivky, MRCS).
- **Matematický aparát:** [[lagrangeova-metoda|Lagrangeova metoda]] (vázaná optimalizace), [[funkce-vice-promennych|Funkce více proměnných]] (parciální derivace), [[derivace|Derivace]].
- **Paralely:** [[produkce|Produkce]] (MRTS ↔ MRCS, izokvanty ↔ IC, Eulerova věta pro CD), [[poptavka-nabidka|Poptávka a nabídka]] (Marshallova poptávka jako vstup tržního modelu).
- **Přednášky:** [[imek-blok-02|KS 2. blok]], [[imek-blok-03|KS 3. blok]]
- **Kurz:** [[imek|Matematická ekonomie]]
