---
title: Management oborových řešení (ImorK)
course: imork
type: course
tags: [imork, isms, informacni-bezpecnost, kyberneticka-bezpecnost, oborova-reseni, iso-27000]
sources: [raw/imork/Detail předmětu.md]
created: 2026-04-12
updated: '2026-04-25'
---

# Management oborových řešení (ImorK)

| | |
|---|---|
| **Zkratka** | ImorK |
| **Fakulta** | Fakulta podnikatelská, VUT v Brně |
| **Semestr** | letní 2025/2026 |
| **Ukončení** | zkouška |
| **Garant** | Ing. Lukáš Novák, Ph.D. |
| **Vyučující** | Ing. Petr Sedlák |
| **Ústav** | Ústav informatiky |
| **Prerekvizita** | Management informační bezpečnosti (ImibePA) |

## Cíle předmětu

- Znalosti o specifických problémech a odlišnostech při **oborovém řešení informační bezpečnosti**
- Porozumění jednotlivých řešení na úrovni **případových studií**
- Přehled o rozdílných aspektech v závislosti na oborové řešení **ISMS**
- Metodika pro budování bezpečných IS na bázi norem řady **ISO/IEC 27000**

## Osnova

1. Bezpečnost v kyberprostoru
2. Budování bezpečnostního povědomí — SAE
3. Manažerská informační bezpečnost
4. Problematika GDPR
5. ISMS v ISVS
6. ISMS v univerzitním prostředí
7. ISMS ve zdravotnictví
8. ISMS v energetice
9. ISMS poskytovatelů konektivity (ISP)
10. Bezpečnost konvergovaných sítí
11. Řízení bezpečnosti www aplikací
12. Řízení bezpečnosti mailových aplikací
13. Řízení mobilní bezpečnosti

## Shrnutí zdrojů

### Přednášky
- [[imork-detail-predmetu|Detail předmětu]] — sylabus kurzu, hodnocení, literatura
- [[imork-manazerska-bezpecnost|Manažerská bezpečnost]] — governance, SIEM, log management, bezpečnostní role
- [[imork-bezpecnostni-strategie|Bezpečnostní strategie]] — tvorba a implementace bezpečnostní strategie
- [[imork-sae|SAE]] — budování bezpečnostního povědomí (NIST SP 800-50/16)
- [[imork-risk-management|Risk Management]] — ISO 31000, ISO 27005, RTP, PoA/SoA

### Oborová ISMS
- [[imork-akademicke-prostredi|Akademické prostředí]] — kampus, WiFi, identita, VIS
- [[imork-financni-sektor|Finanční sektor]] — DORA, MiCA, DLT/blockchain
- [[imork-zdravotnictvi|Zdravotnictví]] — HIPAA, ISO 27799, PACS, DICOM, eHealth
- [[imork-energetika|Energetika]] — ISO 27019, IEC 61850, PLC/SBC/RTU
- [[imork-smart-grid|Smart Grid]] — NISTIR 7628, IEC 62351, prosumers
- [[imork-doprava|Doprava (železnice)]] — CLC/TS 50701, kritická infrastruktura
- [[imork-automotive|Automotive]] — CAN bus, TISAX, UN Reg. 155
- [[imork-isp|ISP/telekomunikace]] — ISO 27011, NGN, 5G bezpečnost
- [[imork-mcn|Mission Critical Networks]] — NCPI, model hrozeb, dostupnost

### Bezpečnost aplikací a dat
- [[imork-www|Bezpečnost webu]] — OWASP, SQL injection, XSS, Solid
- [[imork-email|Bezpečnost emailu]] — SPF, DKIM, DMARC, S/MIME, šifrování
- [[imork-ochrana-dat|Ochrana dat]] — NAC, IDS/IPS, SIEM, DLP, IPv6

### Kontinuita a obnova
- [[imork-bcm|BCM]] — ISO 22301, BIA, STEEPLE, PDCA
- [[imork-dr|Disaster Recovery]] — RPO/RTO, cloud DR, 7 tiers, DRaaS

### Kybernetické útoky
- [[imork-anatomie-utoku|Anatomie útoku]] — APT, vektory, exploit/payload
- [[imork-ai-utoky|AI útoky]] — WormGPT, BEC, phishing
- [[imork-sitove-utoky|Síťové útoky]] — DDoS, spoofing, Emotet→Trickbot→Ryuk
- [[imork-ransomware|Ransomware]] — historie 1989–2024, RaaS, NISTIR 8374, IR plán
- [[imork-rizeny-hacking|Řízený hacking / APT]] — APT skupiny, informační válka, OSINT
- [[imork-internetova-bezpecnost|Internetová bezpečnost]] — kyberprostor, OSINT, behaviorální biometrika

### Případové studie
- [[imork-nemocnice|Útoky na nemocnice]] — Benešov (70M Kč), FN Brno (350M Kč), Nymburk
- [[imork-kradez-dat|Krádež dat]] — PII, černý trh, IoT botnety, ISO 27701, GDPR
- [[imork-sprava-login|Správa login]] — privilegované účty, NIST SP 800-63, biometrika
- [[imork-ehealth|eHealth]] — elektronizace zdravotnictví, telemedicína, NSeZ
- [[imork-tor|TOR]] — anonymizace, onion routing, NSA X-Keyscore
- [[imork-payment|Bezpečnost plateb]] — PCI DSS v4.0, NFC/tokenizace, EMV, darknet
- [[imork-mobilni-bezpecnost|Mobilní bezpečnost]] — SIMJaker, SIM swapping, 5G, Common Criteria
- [[imork-audio-hack|Audio Hack]] — fyzická zranitelnost HDD, CVE-2022-38392, rezonanční útok

### Další
- [[imork-digitalni-identita|Digitální identita a stopa]] — online identita, footprint

## Témata

- [[isms|ISMS]] — systém řízení bezpečnosti informací
- [[rizeni-rizik|Řízení rizik]] — proces identifikace a ošetření rizik
- [[kyberneticka-bezpecnost|Kybernetická bezpečnost]] — hrozby, útoky, obrana
- [[sae|SAE]] — budování bezpečnostního povědomí
- [[bcm|BCM]] — řízení kontinuity činnosti
- [[ochrana-dat|Ochrana dat]] — technologická řešení ochrany

## Doporučená literatura

- JORDÁN, V. a ONDRÁK, V.: *Integrovaná podniková infrastruktura.* Brno: CERM, 2016. ISBN 978-80-214-5241-1
- SEDLÁK, P. a KONEČNÝ, M.: *Přeměna ISMS v manažerské informatice.* Brno: CERM, 2023. ISBN 978-80-7623-110-8
- SEDLÁK, P. a KONEČNÝ, M.: *Kybernetická (ne)bezpečnost.* Brno: CERM, 2021. ISBN 978-80-7623-068-2
- ČSN EN ISO/IEC 27011 — Bezpečnost pro telekomunikační organizace
- ČSN EN ISO/IEC 27019 — Bezpečnost pro energetický průmysl
- ČSN EN ISO/IEC 27799 — Bezpečnost ve zdravotnictví
