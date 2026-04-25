---
title: "ImorK — Případovka: Krádež dat"
course: imork
type: summary
tags: [ochrana-dat, pii, gdpr, iso-27701, privacy-by-design, iot, botnet]
sources: [raw/imork/2109 VUT_Bezp Případovka Krádež dat_2020.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# Případovka: Ochrana osobních údajů — Krádež dat

P��ípadová studie z 6. listopadu 2020. Krádež osobních údajů (PII), černý trh, uživatelské pochybení a normativní rámce [[ochrana-dat|ochrany dat]].

## PII — Personally Identifiable Information

Potenciální problémy ze zpracování PII:
- Ztráta důvěry a sebeurčení
- Fyzické poškození, vyloučení, diskriminace
- Ekonomická ztráta, stigmatizace

## Černý trh s ukradenými údaji

| Údaj | Cena |
|---|---|
| Přístup na Facebook | 1 USD |
| Heslo ke Spotify Premium | 2 USD |
| Heslo do e-shopu | 10 USD |
| Heslo do Windows | 5–50 USD |
| Uživatelské přístupy | 30–50 USD |

Útočníkům je jedno, kdo jste — cena je jednotná. Kontrola: haveibeenpwned.com

## Zneužití IoT a botnety

- Špatně zabezpečené routery, IP kamery, NAS, chytré termostaty
- Útočníci je infikují, fungují normálně ale umožňují vzdálený přístup
- Použití jako proxy servery v botnetech

## Nejčastější uživatelská pochybení

- Stejné heslo pro více služeb
- Slabé a snadno odhadnutelné heslo
- Neaktualizovaný OS, aplikace, firmware
- Žádné softwarové zabezpečení
- Bezmyšlenkovité klikání na přílohy a odkazy
- Ponechání defaultních hesel výrobce

_Poznámka: Kalifornie od 2020 zakázala prodej síťových zařízení s přednastavenými univerzálními hesly._

## Operační taxonomie bezpečnosti dat (5 oblastí)

1. **Device & Application Registration** — zařízení, uživatelé, aktiva
2. **Identity & Access Management** — virtualizace, poskytovatelé identity
3. **Data Governance** — šifrování (at rest, in memory, in transit), DLP
4. **Infrastructure Management** — monitoring, logging, řízení hrozeb
5. **Risk & Accountability** — řízení rizik, forenzní analýza, compliance

## ISO/IEC 27701:2019

Rozšíření ISO 27001/27002 pro správu osobních informací (**PIMS**):
- Návody pro správce, zpracovatele i pověřence
- Mapuje požadavky GDPR — průvodce dodržováním
- Zavádí: **DPIA**, datovou analýzu, procesní analýzu

### Tři analýzy

| Analýza | Zaměření |
|---|---|
| **DPIA** | Posouzení dopadu zpracování na svobody a práva osob (čl. 35 GDPR) |
| **Datová** | Význam dat, vazby, identifikace osobních/citlivých dat |
| **Procesní** | Kdo a jak přistupuje k osobním datům, automatizované zpracování |

## Privacy by Design & Privacy by Default

- **Privacy by Design** — proaktivní zahrnutí ochrany od počátku návrhu
- **Privacy by Default** — ověření účelu, rozsahu, sdílení, anonymizace před zpracováním
- Orientace na **subjekt údajů** — analýza rizik z pohledu jednotlivce

## Hodnocení rizik (5 kroků)

1. Definice operace zpracování a kontextu
2. Pochopení a hodnocení dopadu (CIA)
3. Definice hrozeb a hodnocení pravděpodobnosti
4. Vyhodnocení rizika (matice pravděpodobnost × dopad)
5. Výběr bezpečnostn��ch opatření

## Normy NIST

- **SP 800-122** (2010) — Guide to Protecting PII Confidentiality
- **NISTIR 8062** (2017) — Privacy Engineering and Risk Management
- **FIPP** — Fair Information Practice Principles

## Metodiky ENISA

- Data Pseudonymisation: Advanced Techniques & Use Cases (2021)
- Privacy and Data Protection by Design (2014)
- Handbook on Security of Personal Data Processing (2017)

## Propojení s dalšími tématy

- [[ochrana-dat|Ochrana dat]] — technologická řešení
- [[imork-digitalni-identita|Digitální identita]] — PII a digitální stopa
- [[isms|ISMS]] — ISO 27701 jako rozšíření
- [[sae|SAE]] — povědomí o rizicích uživatelského pochybení

## Zdroj v kurzu [[imork|ImorK]]

- Případovka 2109 — Krádež dat (2020)
