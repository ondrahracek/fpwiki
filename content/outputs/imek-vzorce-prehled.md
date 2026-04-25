---
title: ImeK — kompletní přehled vzorců se zdroji a intuicí
course: imek
type: output
tags: [imek, vzorce, prehled, mikroekonomie, makroekonomie]
sources: [raw/imek/kniha_scanned/]
created: 2026-04-24
updated: '2026-04-25'
---

# ImeK — kompletní přehled vzorců se zdroji a intuicí

> [!abstract] TL;DR
> Referenční přehled **všech klíčových vzorců** kurzu [[imek|Matematická ekonomie]] v **základním (definičním) tvaru** — od poptávky a nabídky přes optimalizaci firmy a spotřebitele až po IS-LM. Pro každý vzorec: **kde se v materiálech bere** (odkaz do příslušné topic stránky) a **intuice** (co vzorec znamená ekonomicky).

## Jak číst tento přehled

- Všechny vzorce jsou zapsané **v definičním tvaru** — tj. tak, jak vznikají z prvních principů, beze snahy o algebraická zjednodušení. Když v jiném textu narazíš na „hezčí" tvar (např. $E = -P/(Q \cdot P'(Q))$ místo $E = -P/Q \cdot 1/(dP/dQ)$), je to zpravidla **jen dosazení jednoho kousku do druhého**.
- Každý vzorec má vlastní řádek (displayed math), ne inline, aby byl čitelný.
- Notace $dP/dQ$ je totéž co $P'(Q)$ — používám první tvar, protože je explicitnější.
- Prokliky vedou vždy na **primární topic stránku**, kde najdeš úplné odvození, příklady a úlohy.

---

## 1. Poptávka a nabídka

**Základní téma:** [[poptavka-nabidka|Poptávka, nabídka a tržní rovnováha]]

### Lineární poptávka

$$P = aQ + b, \qquad a < 0, \; b > 0$$

**Původ:** axiom — lineární aproximace vztahu ceny a množství pro nedokonalou konkurenci (vzorec 2.4). Odpovídá **zákonu klesající poptávky**.

**Intuice:** čím vyšší cena, tím méně lidé kupují. Sklon $a$ je záporný — klesající přímka v rovině $(Q, P)$.

### Lineární nabídka

$$P = cQ + d, \qquad c > 0, \; b > d$$

**Původ:** **zákon rostoucí nabídky** (vzorec 2.9). Podmínka $b > d$ zajišťuje, že rovnovážný bod leží v 1. kvadrantu.

**Intuice:** výrobce je ochoten vyrobit víc, jen když cena stoupne — rostou mu mezní náklady.

### Rovnovážná rovnice

$$aQ + b = cQ + d$$

**Původ:** v rovnováze je poptávané množství rovno nabízenému, takže obě rovnice platí současně.

**Intuice:** cena, při které se střetne „chci koupit" s „chci prodat". Geometricky — průsečík obou křivek.

### Redukovaný tvar rovnovážného množství

$$Q^E = \frac{b - d}{c - a}$$

**Původ:** algebraické řešení rovnováhy (vzorec 2.10).

**Intuice:** rovnovážné množství jako explicitní funkce parametrů. Čím větší mezera `b - d` mezi „maximální cenou poptávky" a „minimální cenou nabídky", tím větší trh.

---

## 2. Multiplikátory komparativní statiky

**Základní téma:** [[poptavka-nabidka|Poptávka a nabídka]] (sekce „Multiplikátory pro mikroekonomické proměnné")

### Totální diferenciál $Q^E$

$$dQ = \frac{\partial Q}{\partial a}\,da + \frac{\partial Q}{\partial b}\,db + \frac{\partial Q}{\partial c}\,dc + \frac{\partial Q}{\partial d}\,dd$$

**Původ:** lineární aproximace změny funkce více proměnných (vzorec 2.11).

**Intuice:** jak se změní $Q^E$ při současné změně všech parametrů. Každý parametr přispívá samostatně (ceteris paribus) a výsledky se sčítají.

### Jednotlivé multiplikátory

$$\frac{\partial Q}{\partial a} = \frac{b-d}{(c-a)^2}, \qquad \frac{\partial Q}{\partial b} = \frac{1}{c-a}$$

$$\frac{\partial Q}{\partial c} = -\frac{b-d}{(c-a)^2}, \qquad \frac{\partial Q}{\partial d} = -\frac{1}{c-a}$$

**Původ:** parciální derivace redukovaného tvaru $Q^E = (b-d)/(c-a)$ (vzorec 2.12).

**Intuice:** „O kolik se posune rovnovážné množství, když zvednu parametr $x$ o jednotku?" Znaménka zůstávají stálá: u $a, b$ kladná, u $c, d$ záporná.

---

## 3. Příjem firmy

**Základní téma:** [[prijem-naklady-zisk|Příjem, náklady, zisk a nabídka firmy]]

### Celkový příjem

$$TR = P \cdot Q$$

**Původ:** definice (3.1) — tržba jako cena krát množství.

**Intuice:** co firma inkasuje za prodej $Q$ kusů.

### Průměrný příjem

$$AR = \frac{TR}{Q} = D(Q)$$

**Původ:** podíl; po dosazení $TR = D(Q) \cdot Q$ se $Q$ vykrátí.

**Intuice:** průměrný příjem na kus = cena = křivka poptávky. **$AR$ a poptávka jsou doslova tatáž křivka.**

### Mezní příjem

$$MR = \frac{dTR}{dQ}$$

**Původ:** derivace $TR$ podle $Q$ (vzorec 3.2).

**Intuice:** „o kolik naroste tržba, když prodám o jeden kus víc". Pro lineární poptávku má $MR$ **dvojnásobný sklon** oproti $AR$.

---

## 4. Náklady firmy

**Základní téma:** [[prijem-naklady-zisk|Příjem, náklady, zisk a nabídka firmy]]

### Celkové náklady

$$TC = FC + TVC(Q)$$

**Původ:** definice (3.5) — rozklad na fixní a variabilní část.

**Intuice:** co zaplatíš, ať vyrobíš cokoli ($FC$) + co zaplatíš za samotnou výrobu ($TVC$).

### Průměrné náklady

$$AC = \frac{TC}{Q}, \qquad AFC = \frac{FC}{Q}, \qquad AVC = \frac{TVC}{Q}$$

**Původ:** definiční podíly (vzorce 3.6, 3.7).

**Intuice:** průměrný náklad na kus. $AFC$ s rostoucím $Q$ jde k nule (fixní náklad se rozředí přes víc kusů).

### Mezní náklady

$$MC = \frac{dTC}{dQ}$$

**Původ:** derivace $TC$ podle $Q$ (vzorec 3.8).

**Intuice:** „kolik mě stojí vyrobit ještě jeden kus navíc". Fixní náklady z derivace vypadnou → **mezní rozhodování nezávisí na fixních nákladech**.

---

## 5. Optimalizační principy firmy

**Základní téma:** [[prijem-naklady-zisk|Příjem, náklady, zisk]]

### Princip minimalizace průměrných nákladů

$$AC(Q_0) = MC(Q_0)$$

**Původ:** nutná podmínka minima $AC$, odvozeno derivací podílu $TC/Q$ (vzorec 3.10).

**Intuice:** analogie se známkovým průměrem — průměr klesá, když další známka (mezní) je pod průměrem; roste, když nad; je v extrému, když se rovnají.

### Princip minimalizace průměrných variabilních nákladů

$$AVC(Q_0) = MC(Q_0)$$

**Původ:** stejné odvození jako u $AC$, ale s $TVC$ (vzorec 3.11).

**Intuice:** identifikuje **shutdown point** — kritický bod pro nabídku firmy. Pod ním se firmě nevyplatí produkovat.

### Princip maximalizace zisku

$$MR(Q_0) = MC(Q_0)$$

**Původ:** nutná podmínka maxima zisku $PR = TR - TC$: derivace $PR' = MR - MC = 0$ (vzorec 3.13).

**Intuice:** vyrábím dál, dokud další kus přináší víc peněz, než stojí. Zastavím se, když se vyrovnají.

---

## 6. Nabídka firmy

**Základní téma:** [[prijem-naklady-zisk|Příjem, náklady, zisk]]

$$P = S(Q) = \begin{cases} MC(Q) & \text{pro } Q \geq Q^* \\ 0 & \text{pro } Q < Q^* \end{cases}$$

**Původ:** kombinace principu $P = MC$ a podmínky, že cena musí pokrýt alespoň $\min AVC$ (vzorec 3.15). $Q^*$ je bod minima $AVC$.

**Intuice:** nabídková křivka je rostoucí část $MC$ nad shutdown bodem. Pod ním firma raději zavře — ztráta z fixních nákladů je menší než ztráta z pokračování výroby pod náklady.

---

## 7. Elasticita poptávky

**Základní téma:** [[elasticita|Elasticita poptávky a nabídky]]

### Cenová elasticita poptávky (definiční tvar)

$$E = -\frac{P}{Q} \cdot \frac{dQ}{dP}$$

**Původ:** limitní přechod z průměrné (obloukové) elasticity $-\Delta Q\% / \Delta P\%$ (vzorec 4.5). Znaménko minus překlápí záporný výsledek (poptávka klesá), aby $E \geq 0$.

**Intuice:** „o kolik % se změní množství, když cena vzroste o 1 %". Bezrozměrná míra citlivosti.

### Převod na $dP/dQ$ (když je poptávka zadaná jako $P = D(Q)$)

$$\frac{dQ}{dP} = \frac{1}{\frac{dP}{dQ}}$$

**Původ:** pravidlo pro derivaci inverzní funkce (vzorec 4.9).

**Intuice:** když znám $P(Q)$ a potřebuju derivaci $Q$ podle $P$, stačí ji převrátit.

### Procentní odhad změny

$$\Delta Q\% \approx -E \cdot \Delta P\%$$

**Původ:** vzorec (4.11) — plyne přímo z definice $E$.

**Intuice:** při $E = 2$ a zdražení o 3 % klesne množství přibližně o 6 %.

### Vztah MR a elasticity

$$MR = P\left(1 - \frac{1}{E}\right)$$

**Původ:** derivací $TR = P \cdot Q$ podle $Q$ a dosazením $E$ (vzorec 4.12).

**Intuice:** most mezi $MR$ a $E$:
- $E > 1$ → $MR > 0$ → vyplatí se snížit cenu
- $E < 1$ → $MR < 0$ → vyplatí se zvýšit cenu
- $E = 1$ → $MR = 0$ → maximum $TR$

### Elasticita nabídky

$$E_{\text{nabídky}} = \frac{P}{Q} \cdot \frac{dQ}{dP}$$

**Původ:** analogie elasticity poptávky (vzorec 4.13). Bez minusu, protože nabídka roste s cenou.

**Intuice:** „o kolik % vzroste nabídka, když cena o 1 %".

### Vícefaktorové elasticity

$$E_P = -\frac{P}{Q}\,\frac{\partial Q}{\partial P}, \qquad E_{P_A} = \frac{P_A}{Q}\,\frac{\partial Q}{\partial P_A}, \qquad E_Y = \frac{Y}{Q}\,\frac{\partial Q}{\partial Y}$$

**Původ:** vícefaktorový model $Q = D(P, P_A, Y)$ (vzorce 4.18–4.20).

**Intuice:**
- $E_{P_A} > 0$ → substitut (máslo vs. margarín)
- $E_{P_A} < 0$ → komplement (auto + benzín)
- $E_Y > 0$ → normální zboží (luxus, standard)
- $E_Y < 0$ → podřadné zboží (s růstem důchodu přestáváš kupovat)

---

## 8. Produkce

**Základní téma:** [[produkce|Produkce — produkční funkce, Cobb-Douglas, MRTS]]

### Produkční funkce

$$Q = Q(L, K)$$

**Původ:** axiomatický zápis — produkce závisí na práci a kapitálu (vzorec 5.6).

**Intuice:** kolik se vyrobí z daného množství práce a kapitálu.

### Mezní produkty

$$MP_L = \frac{\partial Q}{\partial L}, \qquad MP_K = \frac{\partial Q}{\partial K}$$

**Původ:** parciální derivace produkční funkce (vzorec 5.2 a jeho 2F rozšíření).

**Intuice:** „o kolik vzroste produkce, když přidám 1 pracovníka navíc (kapitál pevný)". Podle **zákona klesajících výnosů** se od jistého bodu $MP_L$ začne snižovat.

### Průměrný produkt práce

$$AP_L = \frac{Q}{L}$$

**Původ:** definice (vzorec 5.4).

**Intuice:** produktivita na pracovníka. V maximu platí $MP_L = AP_L$ (stejná logika jako $AC = MC$).

### Cobb-Douglasova produkční funkce

$$Q = A \cdot L^a \cdot K^b$$

**Původ:** standardní funkční tvar v ekonomii (vzorec 5.7).

**Intuice:** součet $a + b$ rozhoduje o **výnosech z rozsahu**:
- $a + b = 1$ → konstantní
- $a + b > 1$ → rostoucí
- $a + b < 1$ → klesající

Speciálně $Q = A L^a K^{1-a}$ (ryzí CD) má vždy konstantní výnosy.

### Mezní míra technické substituce

$$MRTS = \frac{MP_L}{MP_K}$$

**Původ:** definice (vzorec 5.14).

**Intuice:** „kolik jednotek kapitálu nahradí 1 jednotka práce, aby produkce zůstala stejná". Je to sklon izokvanty. Přesná analogie [[uzitecnost|MRCS]] z teorie užitečnosti.

### Eulerova věta pro homogenní funkce

$$L \cdot MP_L + K \cdot MP_K = n \cdot Q(L, K)$$

**Původ:** matematická věta o homogenních funkcích stupně $n$ (vzorec 5.12). Pro Cobb-Douglase je $n = a + b$.

**Intuice:** při konstantních výnosech ($n = 1$) se celý produkt rozdělí mezi vstupy podle jejich mezních produktů — **důchodové pravidlo**. Práce dostane $L \cdot MP_L$, kapitál $K \cdot MP_K$, a to přesně vyčerpá $Q$.

---

## 9. Užitečnost

**Základní téma:** [[uzitecnost|Užitečnost, Cobb-Douglas a MRCS]]

### Funkce užitečnosti

$$U = U(Q_1, Q_2)$$

**Původ:** axiom — užitečnost jako funkce svazku zboží (vzorec 6.1).

**Intuice:** číselné „skóre" uspokojení. V ordinalistickém pojetí jen k **uspořádání** svazků, ne k měření absolutních hodnot.

### Mezní užitek

$$MU_1 = \frac{\partial U}{\partial Q_1}, \qquad MU_2 = \frac{\partial U}{\partial Q_2}$$

**Původ:** parciální derivace (vzorec 6.2).

**Intuice:** „užitek z další jednotky zboží". Musí být **kladný** (víc je lepší) a **klesající** (zákon klesající mezní užitečnosti — $U''_{ii} < 0$, 1. sklenice vody = záchrana, 10. už skoro nic).

### Mezní míra komoditní substituce

$$MRCS = \frac{MU_1}{MU_2}$$

**Původ:** definice (vzorec 6.9).

**Intuice:** „kolik $Q_2$ obětuji za 1 jednotku $Q_1$ navíc, aby zůstalo stejné uspokojení". Absolutní hodnota sklonu indiferenční křivky. Analogie [[produkce|MRTS]] z teorie produkce.

---

## 10. Optimalizace spotřebitele

**Základní téma:** [[optimalizace-spotrebitele|Optimalizace spotřebitele — Lagrange, poptávka, minimalizace výdajů]]

### Rozpočtové omezení

$$Y = P_1 Q_1 + P_2 Q_2$$

**Původ:** identita (vzorec 6.12) — veškerý důchod rozdělen mezi dvě zboží.

**Intuice:** geometricky přímka v rovině $(Q_1, Q_2)$. Pod ní (a na ní) leží dostupné svazky.

### Lagrangeova funkce (maximalizace užitečnosti)

$$\mathcal{L}(Q_1, Q_2, \lambda) = U(Q_1, Q_2) + \lambda(Y - P_1 Q_1 - P_2 Q_2)$$

**Původ:** nástroj [[lagrangeova-metoda|Lagrangeovy metody]] pro vázanou optimalizaci (vzorec 6.13). **Pozor: plus, ne mínus.**

**Intuice:** trik převádějící vázanou optimalizaci na volnou. $\lambda$ je **stínová cena** rozpočtu — mezní užitek dalšího kusu důchodu.

### Podmínka optimality (Gossenův 2. zákon)

$$\frac{MU_1}{P_1} = \frac{MU_2}{P_2} \qquad \Longleftrightarrow \qquad MRCS = \frac{P_1}{P_2}$$

**Původ:** z Lagrangeových rovnic (6.14) vyloučením $\lambda$.

**Intuice:** **za každou korunu utracenou za zboží 1 dostanu stejný mezní užitek jako za zboží 2**. Kdyby to neplatilo, vyplatila by se realokace. Ekvivalentně: sklon indiferenční křivky = sklon rozpočtové přímky (tečnost).

---

## 11. Přebytky spotřebitele a výrobce

**Základní téma:** [[prebytek-spotrebitele-vyrobce|Přebytek spotřebitele a výrobce]]

### Přebytek spotřebitele

$$CS(Q_0) = \int_0^{Q_0} D(Q)\,dQ - P_0 \cdot Q_0$$

**Původ:** definice (vzorec 2.14).

**Intuice:** **integrál = celková ochota platit** (součet mezních užitků za všechny jednotky od 0 do $Q_0$); **obdélník $P_0 \cdot Q_0$ = skutečně zaplaceno**. Rozdíl = „co jsem ušetřil, že mám trh a nemusím za každou jednotku platit svou maximální ochotu".

### Přebytek výrobce

$$PS(Q_0) = P_0 \cdot Q_0 - \int_0^{Q_0} S(Q)\,dQ$$

**Původ:** definice (vzorec 2.15).

**Intuice:** zrcadlo — tržba mínus minimální cena, za kterou by výrobce jednotky dodal (integrál z $S(Q)$ odpovídá celkovým variabilním nákladům).

### Celkový blahobyt trhu

$$W = CS + PS$$

**Původ:** součet obou přebytků.

**Intuice:** čistý ekonomický přínos trhu pro obě strany dohromady. Maximalizuje se v rovnováze **bez daně** — jakýkoli zásah (daň, regulace) blahobyt snižuje (mrtvá ztráta).

---

## 12. Zdanění trhu

**Základní téma:** [[zdaneni-trhu|Zdanění trhu — dopady daně na rovnováhu]]

### Posun křivek při zdanění

$$P = S_1(Q) = S(Q) + T \quad \text{(daň výrobci)}$$

$$P = D_2(Q) = D(Q) - T \quad \text{(daň spotřebiteli)}$$

**Původ:** odvození z rovnic $P - T = S(Q)$ resp. $P + T = D(Q)$.

**Intuice:** daň uložená komukoli posune jednu z křivek o $T$ svisle. Výsledek je ekonomicky tentýž (viz ekvivalence níže).

### Rozklad daňového břemene

$$T = T_{sp} + T_{\text{výr}}$$

**Původ:** definice rozkladu.

**Intuice:** daň nese vždy obě strany. Spotřebitel platí víc, výrobce dostane míň — součet = daň.

### Poměr daňového břemene (lineární model)

$$\frac{T_{sp}}{T_{\text{výr}}} = \frac{c}{-a} = \frac{|\text{sklon } S|}{|\text{sklon } D|}$$

**Původ:** odvozeno z rozkladu pro lineární model.

**Intuice:** **čím strmější křivka (méně elastická strana), tím větší podíl daně**. Poptávka strmější → lidé stejně kupují → platí víc spotřebitel. Nabídka strmější → výrobci nemohou reagovat → platí víc výrobce.

### Věta o ekvivalenci zdanění

$$Q_1^E = Q_2^E, \qquad P_1^E - T = P_2^E$$

**Původ:** porovnáním obou forem zdanění.

**Intuice:** zákon může psát, kdo „platí" daň — ekonomicky je to jedno. Rozdělení je určeno **tvarem křivek**, ne paragrafem.

---

## 13. Makroekonomie — národní důchod

**Základní téma:** [[narodni-duchod|Národní důchod]]

### HNP výdajovou metodou

$$GNP = C + I + G + X$$

**Původ:** definice (vzorec 7.1).

**Intuice:** celková výroba = spotřeba domácností + investice firem + vládní výdaje + čistý export.

### Rozklad důchodu

$$Y = C + S$$

**Původ:** identita (vzorec 7.2) — každou korunu důchodu buď utratím, nebo uspořím.

**Intuice:** důchod neumí „zmizet" — buď spotřeba, nebo úspory.

### Lineární modely spotřeby a úspor

$$C = aY + b, \qquad S = (1-a)Y - b$$

**Původ:** lineární aproximace s předpokladem $0 < a < 1$, $b > 0$ (vzorce 7.3, 7.4).

**Intuice:** $b$ = **autonomní spotřeba** (co utratím i s nulovým příjmem — ze starých úspor). $a$ = sklon — kolik z každé nové koruny utratím.

### Mezní sklony

$$MPC = \frac{dC}{dY}, \qquad MPS = \frac{dS}{dY}$$

**Původ:** definice derivací (článek 7.2).

**Intuice:** z dodatečné koruny důchodu utratím $MPC$ Kč a ušetřím $MPS$ Kč. V lineárním modelu $MPC = a$, $MPS = 1 - a$.

### Identita MPC + MPS

$$MPC + MPS = 1$$

**Původ:** derivace identity $Y = C + S$ (vzorec 7.5).

**Intuice:** koruna navíc buď jde na spotřebu, nebo na úspory — nic jiného se s ní stát nemůže.

### Podmínky rovnováhy jednotlivých modelů

$$Y = C + I \qquad \text{(C-I)}$$

$$Y = C + I + G \qquad \text{(C-I-G)}$$

$$Y = C + I + G + B - M \qquad \text{(C-I-G-X)}$$

**Původ:** rozšiřující se modely (vzorce 7.6, 7.8, 7.10).

**Intuice:** produkce = spotřeba všech sektorů. Postupné bohatnutí modelu — soukromí → + vláda → + zahraničí.

### Disponibilní důchod

$$Y_D = Y - T$$

**Původ:** definice (model C-I-G).

**Intuice:** co domácnostem zbývá po zaplacení daní — spotřeba závisí na $Y_D$, ne na $Y$. **Nejčastější zdroj chyb** — nesmí se zaměňovat s $Y$ v podmínce rovnováhy.

### Rovnovážný důchod (redukovaný tvar, C-I)

$$Y^E = \frac{b + I^*}{1 - a}$$

**Původ:** řešení rovnice $Y = aY + b + I^*$ pro $Y$.

**Intuice:** rovnovážný důchod je násobkem autonomních výdajů. Jmenovatel $1 - a$ je klíčový — vysoké $a$ (ochota utrácet) → silná multiplikace.

### Keynesův multiplikátor investic

$$\frac{\partial Y^E}{\partial I^*} = \frac{1}{1-a} = \frac{1}{MPS}$$

**Původ:** parciální derivace redukovaného tvaru $Y^E$ podle $I^*$.

**Intuice:** **1 Kč navíc v investicích zvýší důchod o víc než 1 Kč.** Jedna utracená koruna se stane něčím důchodem, z něj se utratí $a$ Kč, z toho $a^2$ Kč… geometrická řada $1 + a + a^2 + \dots = 1/(1-a)$. Čím vyšší $MPC$, tím silnější násobení.

---

## 14. IS-LM analýza

**Základní téma:** [[is-lm|IS-LM analýza — simultánní rovnováha]]

### Funkce investic

$$I = I(r) = cr + d, \qquad c < 0, \; d > 0$$

**Původ:** lineární model investic v závislosti na úrokové míře (vzorec 7.11).

**Intuice:** vyšší úroková sazba → dražší úvěr → menší investice. Proto $c < 0$.

### Křivka IS (trh zboží)

$$Y = \frac{c}{1-a}\,r + \frac{b+d}{1-a}$$

**Původ:** z rovnováhy $Y = C + I$ dosazením lineárních funkcí $C(Y)$ a $I(r)$ (vzorec 7.14).

**Intuice:** kombinace $(Y, r)$, pro které **Investice = Savings**. Klesající přímka (protože $c < 0$): vyšší $r$ → nižší $I$ → nižší $Y$.

### Křivka LM (trh peněz)

$$M^* = k_1 Y + k_2 r + k_3$$

**Původ:** rovnováha na trhu peněz $M^D = M^S$ — poptávka (transakční $k_1 Y$ + spekulační $k_2 r + k_3$) = pevná nabídka $M^*$ (vzorec 7.15).

**Intuice:** **L**iquidity of **M**oney. Rostoucí přímka: vyšší $Y$ → větší transakční poptávka po penězích → při pevné nabídce $M^*$ musí $r$ vzrůst, aby se trh vyrovnal.

### Simultánní rovnováha

Řešení soustavy (IS) a (LM) dá $(Y^E, r^E)$ — průsečík obou křivek. Rámec pro analýzu **fiskální politiky** (posun IS změnou $G$, $T$) a **monetární politiky** (posun LM změnou $M^*$).

---

## Jak tenhle přehled efektivně používat

> [!tip] K čemu se hodí
> - **Před zkouškou** — rychlá revize všech klíčových vztahů bez nutnosti procházet jednotlivé topic stránky.
> - **Při řešení úlohy** — najdi vzorec, klikni na primární topic a najdeš plné odvození + řešené příklady.
> - **Při nejistotě** — zda jsi správně zapamatoval vzorec: porovnej s definičním tvarem zde.
> - **Při nepochopení** — přečti si „Intuice" — často lepší než odvození.

> [!warning] Co tu není
> - **Úlohy a jejich řešení** — ty jsou na primárních topic stránkách.
> - **Obrázky a geometrické interpretace** — většina je na topic stránkách a v knize Mezník.
> - **Otázky k sebehodnocení** — viz konce jednotlivých topic stránek.
> - **Podrobná odvození** — vzorce jsou zde jen ve finálním tvaru; odvození viz příslušné kapitoly.

## Navigace

- **Kurz:** [[imek|Matematická ekonomie (ImeK)]]
- **Souhrny přednášek:** [[imek-blok-01|KS 1. blok]], [[imek-blok-02|KS 2. blok]], [[imek-blok-03|KS 3. blok]]
- **Primární zdroj:** [[imek-kniha|Kniha Mezník — Úvod do matematické ekonomie]]
- **Matematický aparát:** [[derivace|Derivace]], [[integral|Integrál]], [[funkce-vice-promennych|Funkce více proměnných]], [[lagrangeova-metoda|Lagrangeova metoda]]
- **Mikroekonomie:** [[poptavka-nabidka|Poptávka a nabídka]], [[zdaneni-trhu|Zdanění]], [[prebytek-spotrebitele-vyrobce|Přebytky]], [[prijem-naklady-zisk|Příjem/náklady/zisk]], [[elasticita|Elasticita]], [[produkce|Produkce]], [[uzitecnost|Užitečnost]], [[optimalizace-spotrebitele|Optimalizace spotřebitele]]
- **Makroekonomie:** [[narodni-duchod|Národní důchod]], [[is-lm|IS-LM analýza]]
