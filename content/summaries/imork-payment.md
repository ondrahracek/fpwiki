---
title: Bezpečnost plateb
course: imork
type: summary
tags: [imork, platby, pci-dss, nfc, tokenizace, emv, mobilni-platby]
sources: [raw/imork/2204 VUT_Bezp_Případovka Payment_2022.pdf]
created: 2026-04-12
updated: '2026-04-25'
---

# Bezpečnost plateb

Případová studie (32 slidů, 29.7.2022) zabývající se bezpečností platebních karet, mobilních plateb a standardem PCI DSS. Součást kurzu [[imork|ImorK]].

## Bezkontaktní karty — rizika

- **Reset limitu** — opakované drobné transakce pod limitem bez PIN
- **Úniky z čínských e-shopů** — kradené údaje karet zneužité pro nákupy
- Potřeba [[kyberneticka-bezpecnost|bezpečnostních opatření]] na straně uživatele i obchodníka

## POS a mobilní platby

### Technologie

| Technologie | Popis |
|-------------|-------|
| **NFC** (Near Field Communication) | Bezkontaktní komunikace na krátkou vzdálenost (~10 cm) |
| **HCE** (Host Card Emulation) | Emulace karty v SW bez fyzického bezpečnostního prvku |
| **TEE** (Trusted Execution Environment) | Izolované bezpečné prostředí v procesoru |
| **SE** (Secure Element) | Fyzický bezpečnostní čip (SIM, embedded, microSD) |
| **Tokenizace** | Nahrazení citlivých dat jednorázovým tokenem |

### Mobilní peněženky — porovnání bezpečnosti

| Peněženka | Bezpečnostní úroveň | Poznámka |
|-----------|---------------------|----------|
| **Samsung Pay** | High | MST + NFC, tokenizace, TEE/SE |
| **Apple Pay** | High | SE v zařízení, tokenizace, biometrie |
| **Android Pay** (Google Pay) | Medium-High | HCE, tokenizace, bez dedikovaného SE |

## PCI DSS v4.0

**Payment Card Industry Data Security Standard** — standard pro ochranu dat platebních karet.

### 6 kroků k dosažení souladu

1. Posouzení rozsahu (scope)
2. Analýza mezer (gap analysis)
3. Náprava zjištěných nedostatků
4. Dokumentace politik a procedur
5. Průběžné testování a monitoring
6. Certifikace a reporting

### 12 požadavků PCI DSS (checklist)

| # | Požadavek |
|---|-----------|
| 1 | Instalace a údržba síťového firewallu |
| 2 | Nepoužívat výchozí hesla dodavatele |
| 3 | Ochrana uložených dat držitelů karet |
| 4 | Šifrování přenosu dat přes veřejné sítě |
| 5 | Ochrana proti malwaru, aktuální antivirus |
| 6 | Vývoj a údržba bezpečných systémů a aplikací |
| 7 | Omezení přístupu k datům na potřebné minimum |
| 8 | Identifikace a autentizace přístupu ke komponentám |
| 9 | Fyzická ochrana přístupu k datům držitelů karet |
| 10 | Sledování a monitorování přístupu k síťovým zdrojům |
| 11 | Pravidelné testování bezpečnostních systémů a procesů |
| 12 | Politika bezpečnosti informací pro zaměstnance |

### Ekosystém PCI

| Standard | Účel |
|----------|------|
| **PCI PTS** | Bezpečnost platebních terminálů (HW) |
| **PA-DSS** | Bezpečnost platebních aplikací (SW) |
| **PCI DSS** | Bezpečnost prostředí zpracování dat karet |
| **PCI P2PE** | Point-to-Point Encryption — šifrování celé cesty transakce |

## 5 typů podvodů s kartami

1. **Skimming** — kopírování dat z magnetického proužku
2. **Phishing** — podvodné získání údajů karet
3. **Card-not-present** — podvody při online transakcích
4. **Counterfeit** — výroba padělků karet
5. **Lost/stolen** — zneužití ztracených/odcizených karet

## EMV standard

- **Europay, Mastercard, Visa** — globální standard pro čipové karty
- Nahrazení magnetického proužku čipem
- Dynamická autentizace transakce
- Výrazné snížení podvodů typu counterfeit

## Card Brand Mixup Attack (ETH Zurich)

- Výzkum ETH Zurich odhalil zranitelnost v protokolu **Visa**
- Útočník může obejít **PIN verifikaci** záměnou značky karty
- Terminál je podveden, aby věřil, že se jedná o kartu jiné značky s nižšími bezpečnostními požadavky
- Demonstrace na reálných terminálech

## Darknet a platební podvody

- Prodej kradených platebních karet na darknetových tržištích
- Obchod s kompromitovanými PayPal účty
- Cenové rozpětí podle typu karty, limitu a země vydání
- Propojení s [[imork-tor|Tor sítí]] a anonymními platbami (kryptoměny)

## Souvislosti

- [[kyberneticka-bezpecnost|Kybernetická bezpečnost]] — ochrana finančních transakcí
- [[ochrana-dat|Ochrana dat]] — GDPR a platební údaje
- [[isms|ISMS]] — řízení bezpečnosti v platebních organizacích
- [[imork-kradez-dat|Krádež dat]] — zneužití platebních údajů
- [[imork-tor|Tor a Dark Web]] — nelegální obchod s kartami
- [[imork-financni-sektor|Finanční sektor]] — bezpečnost bankovních systémů
