---
title: "Řízení rizik"
courses: [imork]
type: topic
tags: [rizeni-rizik, iso-31000, iso-27005, nist, hodnoceni-rizik]
sources:
  - raw/imork/2003 VUT_Bezp Risk Mngmt-2021.pdf
  - raw/imork/2001 VUT_Bezp Managerská 2022.pdf
created: 2026-04-12
updated: 2026-04-12
---

# Řízení rizik

![[rizeni-rizik-proces.jpeg|Proces řízení rizik — šest fází od stanovení kontextu po monitorování]]

Komplexní proces identifikace, analýzy a ošetření rizik ohrožujících bezpečnost informací v organizaci. Tvoří jádro [[isms|ISMS]].

## Normativní základ

| Norma | Zaměření |
|---|---|
| **ISO 31000:2019** | Obecné smrnice pro management rizik |
| **ISO 31010:2020** | Techniky posuzování rizik |
| **ISO/IEC 27005:2019** | Řízení rizik bezpečnosti informací |
| **NIST SP 800-30** | Průvodce hodnocením rizik |
| **NIST SP 800-39** | Proces řízení bezpečnostních rizik |

## Proces řízení rizik (ISO/IEC 27005)

1. **Stanovení kontextu** — rozsah, kritéria, metodika, role
2. **Identifikace rizik** — aktiva, hrozby, zranitelnosti
3. **Analýza rizik** — kvantifikace nebo kvalitativní popis
4. **Vyhodnocení rizik** — prioritizace dle kritérií
5. **Zvládání rizik** — výběr opatření (redukce, přenos, retence, vyhnutí)
6. **Akceptace rizik** — formální rozhodnutí
7. **Komunikace** — sdílení informací o rizicích
8. **Monitorování** — průběžné přezkoumávání

## Výpočet hodnoty rizika

**Riziko = dopadová hodnota aktiva × hrozba × zranitelnost**

- **Hrozba** — potenciální příčina incidentu (stupnice 1–5)
- **Zranitelnost** — slabé místo aktiva (stupnice 1–5)
- **Dopad** — hodnota aktiva při ztrátě CIA

## Obecný model hodnocení rizik

Hrozba → Systém → Zranitelnost → Zneužitelnost? → Riziko → Přijatelné? → Opatření/Zbytkové riziko

## Klíčové dokumenty

- **RTP** (Risk Treatment Plan) — plán zvládání rizik s opatřeními, prioritami, termíny, zdroji
- **PoA/SoA** (Statement of Applicability) — přehled aplikovaných a neaplikovaných opatření

## Bezpečnostní role dle ZKB

- **Výbor pro řízení KB** — organizovaná skupina pro celkové řízení
- **Manažer KB** — odpovědný za ISMS
- **Architekt KB** — návrh a implementace opatření
- **Auditor KB** — provádění auditů
- **Garant aktiva** — zajištění rozvoje a bezpečnosti aktiva

## Tří-úrovňový model (NIST SP 800-39)

| Úroveň | Zaměření | Typ rizika |
|---|---|---|
| Stupeň 1 | Organizace | Strategické riziko |
| Stupeň 2 | Poslání/obchodní procesy | Taktické riziko |
| Stupeň 3 | Informační systémy | Operační riziko |

## Propojení s dalšími tématy

- [[isms|ISMS]] — řízení rizik jako součást systému
- [[bcm|BCM]] — kontinuita činnosti při materializaci rizik
- [[imork-dr|Disaster Recovery]] — obnova po havárii
- [[kyberneticka-bezpecnost|Kybernetická bezpečnost]] — kontext hrozeb

## Zdroje v kurzu [[imork|ImorK]]

- [[imork-risk-management|Risk Management — shrnutí přednášky]]
- [[imork-manazerska-bezpecnost|Manažerská bezpečnost]]
