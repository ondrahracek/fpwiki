---
title: ISMS — Systém řízení bezpečnosti informací
courses: [imork]
type: topic
tags: [imork, isms, iso-27001, iso-27002, informacni-bezpecnost, governance]
sources: [raw/imork/2001 VUT_Bezp Managerská 2022.pdf, raw/imork/2003 VUT_Bezp Risk Mngmt-2021.pdf, raw/imork/Detail předmětu.md]
created: 2026-04-12
updated: '2026-04-25'
---

# ISMS — Systém řízení bezpečnosti informací

![[isms-pdca-cyklus.jpeg|ISMS cyklus PDCA — Plan, Do, Check, Act]]

![[isms-oborova-mapa.jpeg|Mapa oborových řešení ISMS — 9 sektorů s příslušnými ISO normami]]

Information Security Management System (ISMS) je systematický přístup k řízení citlivých informací organizace tak, aby zůstaly bezpečné. Zahrnuje lidi, procesy a IT systémy.

## Základní pilíře

| Pilíř | Anglicky | Popis |
|---|---|---|
| **Důvěrnost** | Confidentiality | Přístup pouze oprávněným osobám |
| **Integrita** | Integrity | Ochrana před neoprávněnou změnou |
| **Dostupnost** | Availability | Systémy a data dostupné v potřebný čas |
| **Nepopiratelnost** | Non-repudiation | Prokázání autorství akce |

## Normativní rámec

### ISO/IEC 27000 rodina

- **ISO/IEC 27001** — požadavky na ISMS (certifikační norma)
- **ISO/IEC 27002** — soubor bezpečnostních opatření (best practices)
- **ISO/IEC 27005** — [[rizeni-rizik|řízení rizik]] bezpečnosti informací
- **ISO/IEC 27014** — governance bezpečnosti informací
- **ISO/IEC 27011** — ISMS pro [[imork-isp|telekomunikace]]
- **ISO/IEC 27019** — ISMS pro [[imork-energetika|energetiku]]
- **ISO/IEC 27799** — ISMS pro [[imork-zdravotnictvi|zdravotnictví]]

### Další rámce

- **NIST** — americké standardy (SP 800 řada)
- **ISACA** — profesní certifikace (CISM, CISA)
- **ENISA** — evropská agentura pro kybernetickou bezpečnost

## Governance (řízení)

### Bezpečnostní role

| Role | Zkratka | Odpovědnost |
|---|---|---|
| Chief Information Officer | CIO | Celkové řízení ICT |
| Chief Information Security Officer | CISO | Řízení informační bezpečnosti |
| Chief Technology Officer | CTO | Technologická strategie |
| IS Security Officer | ISSO | Bezpečnost IS |
| Manažer KB | — | Odpovědný za ISMS |
| Architekt KB | — | Návrh a implementace opatření |
| Auditor KB | — | Provádění auditů |
| Garant aktiva | — | Rozvoj, použití a bezpečnost aktiva |

### Tři třídy informační bezpečnosti

1. **Management** — hodnocení rizik, plánování, akvizice, certifikace
2. **Provoz** — kontinuita, personální bezpečnost, fyzická ochrana, incidenty, [[sae|SAE]]
3. **Technická** — identifikace/autentizace, řízení přístupu, audit, ochrana komunikace

## ISMS cyklus (PDCA)

1. **Plan** — stanovení kontextu, politiky, rozsahu ISMS
2. **Do** — implementace opatření, řízení rizik
3. **Check** — monitorování, audit, přezkoumání
4. **Act** — nápravná opatření, neustálé zlepšování

## Oborová řešení ISMS

Kurz [[imork|ImorK]] pokrývá ISMS specifika pro:

- [[imork-akademicke-prostredi|Akademické/univerzitní prostředí]]
- [[imork-zdravotnictvi|Zdravotnictví]] (HIPAA, ISO 27799)
- [[imork-energetika|Energetiku]] (ISO 27019, IEC 61850)
- [[imork-smart-grid|Smart Grid]] (NISTIR 7628)
- [[imork-doprava|Dopravu/železnici]] (CLC/TS 50701)
- [[imork-automotive|Automotive]] (TISAX)
- [[imork-isp|ISP/telekomunikace]] (ISO 27011)
- [[imork-mcn|Mission Critical Networks]]
- [[imork-financni-sektor|Finanční sektor]]

## Propojení s dalšími tématy

- [[rizeni-rizik|Řízení rizik]] — jádro ISMS procesu
- [[sae|SAE]] — budování bezpečnostního povědomí
- [[bcm|BCM]] — kontinuita činnosti
- [[kyberneticka-bezpecnost|Kybernetická bezpečnost]] — širší kontext
- [[ochrana-dat|Ochrana dat]] — technologická opatření

## Zdroje v kurzu [[imork|ImorK]]

- [[imork-manazerska-bezpecnost|Manažerská bezpečnost]]
- [[imork-risk-management|Risk Management]]
- [[imork-bezpecnostni-strategie|Bezpečnostní strategie]]
