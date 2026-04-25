---
title: "Kybernetická bezpečnost"
courses: [imork]
type: topic
tags: [kyberneticka-bezpecnost, utoky, apt, ransomware, phishing, owasp]
sources:
  - raw/imork/CV 02 VUT_Anatomie útoku-2022.pdf
  - raw/imork/CV 05 VUT_ AI útoky-2023 (1).pdf
  - raw/imork/2001 VUT_Bezp Managerská 2022.pdf
created: 2026-04-12
updated: 2026-04-12
---

# Kybernetická bezpečnost

![[kb-defense-in-depth.jpeg|Defense-in-Depth — 5 vrstev ochrany od perimetru po data]]

Ochrana informačních systémů, sítí a dat před kybernetickými hrozbami. V kontextu [[isms|ISMS]] zahrnuje jak manažerské, tak technické aspekty bezpečnosti.

## Základní pojmy

- **Útočná plocha** (Attack Surface) — celkový počet vstupních bodů pro neoprávněný přístup (digitální + fyzická)
- **Vektor útoku** (Attack Vector) — způsob zneužití zranitelnosti
- **Zranitelnost** (Vulnerability) — slabé místo v aktivu nebo procesu
- **Exploit** — kód zneužívající konkrétní zranitelnost
- **Payload** — kód spuštěný po úspěšném exploitu
- **Shellcode** — kód spouštěný v shellu napadeného systému

## Typy útoků

### Podle cílení

| Typ | Popis | Cíl |
|---|---|---|
| **Plošný** | Útočníkovi je jedno, kdo je obětí | Botnety, spam, ransomware |
| **Cílený (APT)** | Soustředěná pozornost na konkrétní cíl | Špionáž, sabotáž, krádež dat |

### APT — Advanced Persistent Threat

![[apt-faze-utoku.jpeg|Čtyři fáze APT útoku — příprava, průnik, kompromitace, dokončení]]

4 fáze:
1. **Příprava** — sběr informací, skenování zranitelností, sociální inženýrství
2. **Průnik** — spear phishing, watering hole, malvertising
3. **Kompromitace** — laterální pohyb, eskalace oprávnění, trvalý přístup
4. **Dokončení** — exfiltrace dat, vydírání, sabotáž

### Základní vektory útoku

- Email s přílohou (spear phishing)
- Trojanizované aplikace
- Drive-by download (webové exploity)
- Výměnná média (BadUSB)
- Watering hole (kompromitace důvěryhodného webu)

### Software útoky

- **Adware/Spyware** — sběr dat, odposlech
- **Viry** — poškození HW/SW
- **Trojské koně** — skrytá funkčnost
- **Ransomware** — šifrování dat za výkupné (single/double/triple)
- **WormGPT** — AI nástroj pro automatizaci kybernetické kriminality

## Webové útoky (OWASP)

| Útok | Cíl | Efekt |
|---|---|---|
| Content Spoofing | Klient | Ztráta přihlašovacích údajů |
| XSS | Klient | Přístup k cookies |
| SQL Injection | Server | Neoprávněný přístup do DB |
| DoS/DDoS | Server | Nedostupnost služby |
| Path Traversal | Server | Přístup k souborům |

## BEC — Business Email Compromise

Zneužití firemního emailu k podvodným platbám. 5 typů dle FBI:
1. Vydávání se za právníka
2. Podvod na CEO
3. Krádež dat (personální oddělení)
4. Kompromitace účtu
5. Falešné faktury

## Obranné technologie

- **NAC** — řízení přístupu k síti
- **IDS** — detekce průniku (pasivní)
- **IPS** — prevence průniku (aktivní, in-line)
- **SIEM** — centralizovaná správa bezpečnostních událostí
- **DLP** — prevence úniku dat
- **FW/VPN** — perimetrová ochrana

## Propojení s dalšími tématy

- [[isms|ISMS]] — manažerský rámec bezpečnosti
- [[rizeni-rizik|Řízení rizik]] — hodnocení hrozeb a zranitelností
- [[sae|SAE]] — budování povědomí jako obrana č. 1
- [[bcm|BCM]] / [[imork-dr|DR]] — reakce na incidenty a obnova
- [[ochrana-dat|Ochrana dat]] — technologická ochrana

## Zdroje v kurzu [[imork|ImorK]]

- [[imork-anatomie-utoku|Anatomie kybernetického útoku]]
- [[imork-ai-utoky|AI útoky]]
- [[imork-www|Bezpečnost webu]]
- [[imork-sitove-utoky|Síťové útoky]]
- [[imork-pripadovky|Případové studie]]
