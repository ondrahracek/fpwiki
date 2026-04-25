---
title: ImorK — ISMS v akademickém prostředí
course: imork
type: summary
tags: [imork, isms, univerzity, kampus, wifi]
sources: [raw/imork/2004 VUT_Bezp akademici-2021.pdf]
created: 2026-04-12
updated: '2026-04-25'
---

# ImorK — ISMS v akademickém prostředí

## Specifika univerzitního kampusu

Univerzita má **dvojí roli**:

- **Zaměstnavatel** — zaměstnanci, akademici, výzkumníci
- **ISP (poskytovatel služeb)** — studenti, hosté, konference

Tato dualita přináší unikátní výzvy pro [[isms|ISMS]] — vysoká fluktuace uživatelů, otevřené prostředí, rozmanité požadavky na přístup.

## Síťová segmentace

| Segment | Účel |
|---------|------|
| Zaměstnanecká síť | Interní systémy, citlivá data |
| Laboratorní síť | Výzkum, experimenty |
| WiFi (eduroam aj.) | Studenti, hosté |

Klíčové principy: **AAA** (Authentication, Authorization, Accounting) a centrální **logging**.

## Standardy ANSI/BICSI

| Standard | Oblast |
|----------|--------|
| **BICSI 001-2017** | Vzdělávací instituce — kabeláž a infrastruktura |
| **BICSI 007-2020** | Inteligentní budovy |
| **BICSI 008-2018** | Bezdrátové sítě (WLAN) |

## Klasifikace dat (5 úrovní)

1. **Veřejná** — volně dostupné informace
2. **Duševní vlastnictví** — výzkum, publikace před zveřejněním
3. **Plány areálu** — fyzická bezpečnost
4. **Přístupová data** — identity, hesla, certifikáty
5. **Finanční a osobní údaje** — nejvyšší ochrana

## Bezpečnostní politika — cíle

- Ochrana informačních aktiv
- Zajištění kontinuity vzdělávacího procesu
- Soulad s legislativou (ZKB, GDPR)
- Ochrana výzkumných dat a duševního vlastnictví

## Implementace ISO 27001 + ISO 20000

Kombinovaná implementace:

- **ISO 27001** — systém řízení informační bezpečnosti
- **ISO 20000** — systém řízení IT služeb (ITSM)

Kroky: gap analýza → návrh politiky → implementace opatření → interní audit → certifikace.

## Identity management

Správa identit v univerzitním prostředí:

- Životní cyklus identity (nástup → studium → absolvent/odchod)
- Single Sign-On (SSO)
- Federace identit (eduID, eduroam)
- Přidělování rolí a oprávnění

## Regulace VIS (Vyhl. 360/2020 Sb.)

Vyhláška o významných informačních systémech — relevantní pro univerzity provozující IS s velkým počtem uživatelů nebo citlivými daty.

## TLP protokol (Traffic Light Protocol)

Klasifikace sdílení informací o bezpečnostních hrozbách:

| Barva | Sdílení |
|-------|---------|
| 🔴 TLP:RED | Pouze přímí příjemci |
| 🟠 TLP:AMBER | Omezená komunita |
| 🟢 TLP:GREEN | Širší komunita |
| ⚪ TLP:CLEAR | Veřejné |

## ENISA CyberHEAD

Databáze ENISA zaměřená na kybernetickou bezpečnost ve vysokoškolském vzdělávání (Cybersecurity Higher Education Database) — mapuje programy, kurzy a kompetence napříč EU.
