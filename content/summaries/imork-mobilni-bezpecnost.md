---
title: "ImorK — Mobilní bezpečnost"
course: imork
type: summary
tags: [mobilni-bezpecnost, sim, 5g, malware, nist, common-criteria]
sources: [raw/imork/2206 VUT_Bezp_Případovka Mobilní bezpečnost-2021.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# Mobilní bezpečnost

Případová studie (35 slidů, 1.11.2021) pokrývající bezpečnost mobilních zařízení — od standardů NIST přes konkrétní útoky až po bezpečnost 5G sítí. Součást kurzu [[imork|ImorK]].

## Standardy a doporučení

| Standard | Zaměření |
|----------|----------|
| **NIST SP 1800-4B/4C** | Bezpečnost mobilních zařízení v podnikovém prostředí |
| **NIST SP 1800-21** | Správa mobilních zařízení (MDM) |
| **ENISA Mobile App Privacy** (2017) | Ochrana soukromí v mobilních aplikacích |
| **Agile SDL** (Microsoft) | Bezpečný životní cyklus vývoje SW — integrace bezpečnosti do agilního vývoje |

## SIMJacker útok

- Zranitelnost **S@T Browser** (SIM Application Toolkit) — zastaralá technologie v SIM kartách
- Útočník zasílá speciálně vytvořené SMS
- Získání **IMEI** a **polohy** zařízení bez vědomí uživatele
- Postiženy SIM karty ve více než 30 zemích
- Propojení s [[kyberneticka-bezpecnost|kybernetickou bezpečností]] mobilních sítí

## SIM swapping

Podvodná výměna SIM karty — převzetí telefonního čísla oběti.

### 5 kroků útoku

1. **Průzkum** — sběr informací o oběti (sociální sítě, OSINT)
2. **Sociální inženýrství** — kontakt operátora, přesvědčení o změně SIM
3. **Převod čísla** — aktivace nové SIM s číslem oběti
4. **Přístup** — příjem SMS kódů, 2FA obcházení
5. **Zneužití** — přístup k bankovnictví, emailu, sociálním sítím

### Obrana

- **eSIM** — elektronická SIM bez fyzické výměny
- PIN na účet u operátora
- Nepoužívat SMS jako jediný faktor 2FA
- Souvisí s [[imork-digitalni-identita|digitální identitou]] a [[imork-sprava-login|správou přístupů]]

## Malware Rogue (MRAT)

- **Mobile Remote Access Trojan** — vzdálený přístup k zařízení
- Cena na Dark Webu: **$30–190**
- Distribuce přes falešné aplikace, phishing
- Využití platformy **Firebase** pro C&C komunikaci
- Plný přístup k zařízení: kamera, mikrofon, soubory, SMS

## 10 typů útoků na mobilní zařízení

| # | Útok | Popis |
|---|------|-------|
| 1 | **GPS špehování** | Sledování polohy bez vědomí uživatele |
| 2 | **SDK Igexin** | Škodlivý reklamní SDK ve legitimních aplikacích |
| 3 | **Foto/video špehování** | Neoprávněný přístup ke kameře |
| 4 | **Ransomware Charger** | Zašifrování dat na mobilu, výkupné |
| 5 | **Brain Test** | Malware v Google Play s root exploitem |
| 6 | **Godless exploit** | Rootování zařízení přes známé zranitelnosti |
| 7 | **CopyCat** | Malware infikující 14M zařízení, podvodné reklamy |
| 8 | **Audiotextové linky** | Malware tajně volající prémiová čísla |
| 9 | **MediaTek/Adups firmware spyware** | Spyware přímo ve firmware levných zařízení |
| 10 | **Levná čínská zařízení** | Předinstalovaný malware od výrobce |

## Chytré hodinky — odposlech dětí

- **Německo** — zákaz prodeje dětských chytrých hodinek s odposlouchávací funkcí
- Rodiče mohli vzdáleně aktivovat mikrofon
- Zařízení klasifikována jako nelegální odposlouchávací technika
- Otázka [[ochrana-dat|ochrany soukromí]] dětí vs. bezpečnosti

## 5G bezpečnost

### Kritická infrastruktura

- 5G sítě jako páteř kritické infrastruktury (IoT, autonomní vozidla, telemedicína)
- Zvýšené nároky na [[kyberneticka-bezpecnost|kybernetickou bezpečnost]]

### Common Criteria EAL3+

- Mezinárodní standard pro hodnocení bezpečnosti IT produktů
- **EAL3+** — úroveň vyžadovaná pro 5G síťové prvky
- Metodicky testováno a ověřováno

### ZTE 5G-RAN testování

| Aspekt | Detail |
|--------|--------|
| **Produkt** | ZTE 5G-RAN (Radio Access Network) |
| **Certifikace** | Common Criteria EAL3+ |
| **Testovací laboratoře** | TÜV Rheinland, Brightsight BV |
| **Význam** | První 5G certifikace tohoto typu |

## Souvislosti

- [[kyberneticka-bezpecnost|Kybernetická bezpečnost]] — širší kontext mobilních hrozeb
- [[imork-digitalni-identita|Digitální identita]] — autentizace na mobilních zařízeních
- [[imork-sprava-login|Správa login]] — hesla a přístupy
- [[ochrana-dat|Ochrana dat]] — soukromí uživatelů mobilních zařízení
- [[imork-kradez-dat|Krádež dat]] — exfiltrace přes mobilní malware
- [[isms|ISMS]] — správa mobilních zařízení v organizaci (MDM/EMM)
- [[sae|SAE]] — bezpečnostní architektura
- [[imork-internetova-bezpecnost|Internetová bezpečnost]] — OSINT a APT skupiny cílící na mobilní platformy
