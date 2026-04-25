---
title: "ImorK — Business Continuity Management"
course: imork
type: summary
tags: [bcm, kontinuita-cinnosti, iso-22301, bia, pdca, spof, drp, bcmaas, vyhlaska-82-2018]
sources: [raw/imork/2014 VUT_Bezp BCM-2021.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# Business Continuity Management (BCM)

## Definice

- **BCM** (Business Continuity Management) — řízení kontinuity činností organizace
- **BIA** (Business Impact Analysis) — analýza dopadů na podnikání; identifikuje kritické procesy a stanoví priority obnovy
- **MBCO** (Minimum Business Continuity Objective) — minimální úroveň služeb, kterou musí organizace udržet

## Vztah BCM k řízení rizik

BCM je součástí [[imork-risk-management|podnikového řízení rizik]]. Zatímco risk management se zaměřuje na prevenci, BCM řeší situace, kdy k incidentu dojde.

## PDCA cyklus pro BCMS

1. **Plan** — stanovení politiky BCM, analýza BIA, strategie kontinuity
2. **Do** — implementace postupů, školení, dokumentace
3. **Check** — interní audity, přezkum vedením, testování plánů
4. **Act** — nápravná opatření, zlepšování

## ISO/IEC 27031:2011

Připravenost ICT pro kontinuitu podnikání — propojení mezi [[imork-mcn|kritickou infrastrukturou]] a BCMS.

## ISO 22301:2019 — Požadavky na BCMS

Kapitoly mapované na PDCA:

| Kapitola | Obsah | PDCA fáze |
|----------|-------|-----------|
| 4 | Kontext organizace | Plan |
| 5 | Leadership | Plan |
| 6 | Plánování | Plan |
| 7 | Podpora | Plan/Do |
| 8 | Provoz (BIA, strategie, plány) | Do |
| 9 | Hodnocení výkonnosti | Check |
| 10 | Zlepšování | Act |

## STEEPLE analýza

Analýza vnějšího prostředí pro BCM plánování:

- **S** — Social (sociální faktory)
- **T** — Technological (technologické)
- **E** — Economic (ekonomické)
- **E** — Ethical (etické)
- **P** — Political (politické)
- **L** — Legislative (legislativní)
- **E** — Environmental (environmentální)

## Rozsah BCM plánování

Určení hranic BCMS — které procesy, lokality, produkty a služby jsou zahrnuty.

## Přínosy BCM

- **Regulatorní soulad** — splnění požadavků legislativy a norem
- **Konkurenční výhoda** — důvěra zákazníků a partnerů
- **Finanční přínosy** — snížení ztrát z výpadků
- **Reputace** — ochrana dobrého jména organizace

## BIA podrobně

### Dva způsoby provedení BIA

1. **Bottom-up** — od provozních manažerů směrem nahoru; detailní znalost procesů, ale časově náročné
2. **Top-down** — od vyššího managementu; rychlejší, ale může opomenout provozní detaily

### Principy BIA

- Orientace na **dopad**, ne na příčinu — nezkoumá, co se stane, ale jaké budou následky
- **Kalendář klíčových ročních událostí** — identifikace období se zvýšenou kritičností (uzávěrky, sezónní špičky)

## Mapování procesů

- **Víceúrovňové mapování** — od strategických procesů po operativní detaily
- **Identifikace zdrojů** — lidé, technologie, prostory, dodavatelé potřební pro každý proces
- **SPoF** (Single Point of Failure) — identifikace jediných bodů selhání, jejichž výpadek zastaví celý proces

## Strategie kontinuity

### 4 kroky strategie

1. **Reakce na incident** — okamžitá odezva, aktivace krizového řízení
2. **Obnova kritických činností** — prioritní obnovení klíčových procesů dle BIA
3. **Vztahy se stakeholdery** — komunikace se zainteresovanými stranami
4. **Nekritické činnosti** — postupná obnova ostatních procesů

### 4 scénáře narušení

1. **Zamezení přístupu** — nedostupnost budov/prostor (požár, povodeň)
2. **Nedostatek pracovníků** — pandemie, hromadná absence
3. **Selhání technologie** — výpadek ICT, kybernetický útok
4. **Selhání dodavatele** — přerušení dodavatelského řetězce

### Další aspekty

- **Riziko nahromadění práce** — kumulace nedokončených úkolů během výpadku, které mohou přetížit organizaci po obnově
- **Komunikační strategie** — interní (zaměstnanci, vedení) i externí (zákazníci, úřady, média); řízení komunikace s médii

## Implementace plánů

### Obsah plánu kontinuity

- **Účel a rozsah** — co plán pokrývá
- **Role a odpovědnosti** — kdo za co odpovídá
- **Aktivační kritéria** — kdy se plán spouští
- **DRP** (Disaster Recovery Plan) — obnova IT infrastruktury
- **Kontaktní seznamy** — krizové kontakty
- **Priority obnovy** — pořadí obnovovaných procesů dle BIA

### Dlouhodobá obnova

Dlouhodobá obnova je řízena jako **samostatný projekt** — návrat do normálního provozu, obnova plné kapacity, vyhodnocení.

## Testování BCM

### Formy testování

1. **Přezkoumání u stolu** (Tabletop review) — teoretické procházení scénářů
2. **Procházení plánu** (Walkthrough) — krokové ověření postupů s účastníky
3. **Úplné testování** (Full exercise) — simulace reálného incidentu

### Zásady testování

- **Neočekávané testy** — testování bez předchozího varování pro ověření reálné připravenosti
- **Direktivní řízení pod tlakem** — v krizové situaci přechod na centralizované rozhodování

## VKB (Vyhláška o kybernetické bezpečnosti)

Požadavky dle **§15 vyhlášky č. 82/2018 Sb.**:

- **MBCO** — minimální úroveň služeb pro kontinuitu
- **Doba obnovení** (RTO) — maximální přípustná doba výpadku
- **Bod obnovení dat** (RPO) — maximální přípustná ztráta dat

Příloha č. 5, bod **1.23 Politika řízení kontinuity** — požadavky na dokumentaci a řízení BCM.

## BCMaaS (BCM as a Service)

Cloudový model poskytování BCM — outsourcing plánování a řízení kontinuity jako služby, vhodný zejména pro menší organizace bez vlastních kapacit.

## Integrace BCM do kultury organizace

BCM nesmí být izolovaný projekt — musí být součástí firemní kultury, pravidelně testován a aktualizován.
