---
title: "Ochrana dat"
courses: [imork]
type: topic
tags: [ochrana-dat, sifrovani, nac, ids, ips, dlp, gdpr]
sources:
  - raw/imork/2017 VUT_Ochrana dat-2022.pdf
  - raw/imork/2015 VUT_Bezp WWW-2019.pdf
  - raw/imork/2016 VUT_Bezp Email-2022.pdf
created: 2026-04-12
updated: 2026-04-12
---

# Ochrana dat

![[ochrana-dat-technologie.jpeg|Bezpečnostní technologie ochrany dat v síťové architektuře]]

Technologická řešení pro zabezpečení dat v interní infrastruktuře i kyberprostoru. Zahrnuje síťové, aplikační i datové bezpečnostní mechanismy.

## Formy zneužití dat

| Forma | Popis |
|---|---|
| Zašifrování | Ransomware |
| Zveřejnění | Double ransomware |
| Odposlech | Pasivní sběr dat |
| Krádež | Cílená exfiltrace |
| Krádež dodavatelského řetězce | Triple ransomware |
| Prodej | Darknet marketplace |

## Bezpečnostní technologie

### NAC (Network Access Control)
- Proaktivní ochrana sítě před neautorizovaným přístupem
- 4 fáze: detekce → autentizace → vyhodnocení → autorizace
- Ekvivalenty: MDM, BYOD

### IDS (Intrusion Detection System)
- Monitoruje síťový provoz, generuje alerty
- Pasivní systém — nezasahuje do provozu
- Signaturová a anomální detekce

### IPS (Intrusion Prevention System)
- Aktivní systém — blokuje škodlivý provoz
- Zařazen přímo do síťové cesty (in-line)

### SIEM (Security Information and Event Management)
- Centralizovaná správa bezpečnostních logů
- Sběr s agentem i bez agenta
- Prioritizace: třídy zpráv, zdroje, IP adresy, četnost

### DLP (Data Loss Prevention)
- Klasifikace citlivých dat a vynucení ochrany

### Šifrování
- AES (128/192/256 bit), 3DES
- RSA (2048+ bit), DSS
- SHA-256, SHA-1

## IPv6 bezpečnost

- **AH** (Authentication Header) — ověření odesílatele a integrity
- **ESP** (Encapsulating Security Payload) — šifrování dat
- Transportní a tunelovací režim
- SPD (Security Policy Database), bezpečnostní asociace

## Propojení s dalšími tématy

- [[isms|ISMS]] — ochrana dat jako technická vrstva ISMS
- [[kyberneticka-bezpecnost|Kybernetická bezpečnost]] — kontext hrozeb
- [[rizeni-rizik|Řízení rizik]] — hodnocení aktiv a hrozeb
- [[imork-www|Bezpečnost webu]] — webové útoky a obrana
- [[imork-email|Bezpečnost emailu]] — emailové protokoly

## Zdroje v kurzu [[imork|ImorK]]

- [[imork-ochrana-dat|Ochrana dat — shrnutí přednášky]]
- [[imork-www|Bezpečnost webových služeb]]
- [[imork-email|Bezpečnost emailových služeb]]
