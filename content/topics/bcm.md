---
title: "BCM — Business Continuity Management"
courses: [imork]
type: topic
tags: [bcm, kontinuita-cinnosti, iso-22301, bia, disaster-recovery]
sources:
  - raw/imork/2014 VUT_Bezp BCM-2021.pdf
  - raw/imork/2013 VUT_Bezp DR-2021.pdf
created: 2026-04-12
updated: 2026-04-12
---

# BCM — Řízení kontinuity činnosti

![[bcm-rpo-rto.jpeg|Časová osa incidentu — RPO, detekce, MBCO, RTO, plná obnova]]

Identifikuje potenciální dopady incidentů a zajišťuje kontinuitu a obnovu klíčových procesů organizace na předem stanovenou minimální úroveň.

## Klíčové pojmy

| Pojem | Anglicky | Popis |
|---|---|---|
| **BCMS** | Business Continuity Management System | Plánovaný, kontinuální a dokumentovaný systém |
| **BCM** | Business Continuity Management | Činnost identifikující dopady a zajišťující kontinuitu |
| **BIA** | Business Impact Analysis | Identifikace kritických činností (orientace na dopad, ne příčinu) |
| **MBCO** | Minimum Business Continuity Objective | Minimální přijatelná úroveň služeb |
| **RPO** | Recovery Point Objective | Do jakého bodu v minulosti lze obnovit data |
| **RTO** | Recovery Time Objective | Čas potřebný pro obnovu provozu |

## PDCA cyklus pro BCMS

| Fáze | Obsah |
|---|---|
| **Plan** | Kontext, požadavky, rozsah, politika, BIA, posouzení rizik |
| **Do** | Strategie kontinuity, implementace plánů, cvičení |
| **Check** | Monitoring, audit, přezkoumání managementem |
| **Act** | Nápravná opatření, neustálé zlepšování |

## ISO 22301:2019 — struktura

- Kap. 4 — kontext organizace
- Kap. 5 — vedení (leadership)
- Kap. 6 — plánování (BIA, rizika)
- Kap. 7 — podpora (kompetence, dokumentace, komunikace)
- Kap. 8 — provoz (strategie, plány, cvičení)
- Kap. 9 — hodnocení výkonnosti (monitoring, audit)
- Kap. 10 — zlepšování (neshody, nápravná opatření)

## Analýza STEEPLE

| Faktor | Oblast |
|---|---|
| **S**ociální | Zaměstnanost, bezpečnost, komunity |
| **T**echnologický | Závislost na technologiích |
| **E**konomický | Ekonomická situace, finanční instituce |
| **E**tický | Podnikatelská etika, média, veřejnost |
| **P**olitický | Politický systém, hrozba nepokojů |
| **L**egislativní | Předpisy, zákony |
| **E**nvironmentální | Životní prostředí, přírodní hrozby |

## Disaster Recovery (DR)

Předem stanovený scénář obnovy provozu po havárii — součást BCM.

### 7 úrovní DR (Tiers)

| Tier | Popis |
|---|---|
| 0 | Žádná off-site data |
| 1 | Fyzická záloha + cold site |
| 2 | Fyzická záloha + hot site |
| 3 | Elektronický trezor (electronic vaulting) |
| 4 | Point-in-time recovery |
| 5 | Two-site commit (kontinuální přenos) |
| 6 | Minimální až nulová ztráta dat (zrcadlení) |
| 7 | Automatizovaná obnova (AI monitoring) |

### Cloud DR

- **Cold DR** — nejlevnější, nejdelší odstávka
- **Warm DR** — aktualizované zálohy u poskytovatele
- **Hot DR** — paralelní řešení v tandemu
- **DRaaS** — Disaster Recovery as a Service (řízené/asistované/vlastní)

## Propojení s dalšími tématy

- [[isms|ISMS]] — BCM jako součást bezpečnostního systému
- [[rizeni-rizik|Řízení rizik]] — krizové plány pro zbytková rizika
- [[kyberneticka-bezpecnost|Kybernetická bezpečnost]] — reakce na incidenty

## Zdroje v kurzu [[imork|ImorK]]

- [[imork-bcm|BCM — shrnutí přednášky]]
- [[imork-dr|Disaster Recovery — shrnutí přednášky]]
