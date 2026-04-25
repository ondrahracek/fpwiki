---
title: ISMS ve zdravotnictví
course: imork
type: summary
tags: [imork, isms, zdravotnictvi, hipaa, iso-27799, ehealth, pacs]
sources: [raw/imork/2006 VUT_Bezp zdravotnictví-2022.pdf]
created: 2026-04-12
updated: '2026-04-25'
---

# ISMS ve zdravotnictví

![[imork-zdravotnictvi-ekosystem.jpeg|Ekosystém bezpečnosti ve zdravotnictví — pacient, NIS, PACS, eHealth, regulace]]

## Kontext a strategie

WHO upozorňuje na rostoucí kybernetické hrozby ve zdravotnictví. Česká **Národní strategie kybernetické bezpečnosti ve zdravotnictví 2021–2025** definuje klíčové cíle a opatření.

### Hlavní problémy sektoru

- Zastaralá ICT infrastruktura
- Nedostatek kvalifikovaného personálu v oblasti IB
- Bezpečnost zdravotnických prostředků (medical devices)

## Standardy a normy

### ANSI/BICSI 004-2018

Standard pro návrh a implementaci ICT infrastruktury ve zdravotnických zařízeních.

### HIPAA

Americký zákon skládající se ze 4 částí:

1. **Privacy Rule** — ochrana osobních zdravotních údajů
2. **Security Rule** — technická a organizační opatření
3. **Unique Identifiers Rule** — identifikátory subjektů
4. **Electronic Transaction & Code Sets** — elektronické kódy a transakce

### ISO/IEC 27799:2019

Bezpečnost zdravotnických informací — rozšíření ISO 27001 pro zdravotnictví.

### ISO/IEC 27789:2021

Auditní záznamy (audit trails) pro elektronické zdravotní záznamy (EHR).

## Zdravotnické prostředky

Regulace dle EU směrnic:

- **93/42/EEC** — zdravotnické prostředky
- **93/68/EEC** — označení CE

## PACS a DICOM

**PACS** (Picture Archiving and Communications System) — systém pro archivaci a komunikaci medicínských obrazových dat. Využívá standard **DICOM** pro přenos a ukládání snímků.

## eIDAS

Elektronická identifikace a důvěryhodné služby — relevantní pro elektronické zdravotní záznamy a elektronické podpisy ve zdravotnictví.

## ENISA doporučení

- **Procurement guidelines for hospitals (2020)** — směrnice pro nákup bezpečných ICT řešení
- **Cloud security for healthcare (2021)** — bezpečnost cloudových služeb ve zdravotnictví

## Ransomware a BCM

Prevence ransomwarových útoků ve zdravotnictví zahrnuje:

- **[[bcm|BCM]]** (Business Continuity Management) — zajištění kontinuity provozu
- **SAE** (Security Awareness Education) — vzdělávání personálu
- **Monitoring** — nepřetržitý dohled nad infrastrukturou

BCM je ve zdravotnictví kritický — výpadek systémů může přímo ohrozit životy pacientů.
