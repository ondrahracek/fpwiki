---
title: Ransomware — komplexní případová studie
course: imork
type: summary
tags: [imork, ransomware, raas, wannacry, nistir-8374, incident-response, vykupne]
sources: [raw/imork/CV 06 VUT_Ransomware.pdf]
created: 2026-04-12
updated: '2026-04-25'
---

# Ransomware — komplexní případová studie

![[imork-ransomware-kill-chain.jpeg|Kill chain ransomware útoku — Emotet → Trickbot → Ryuk s obrannými body]]

Rozsáhlá prezentace (56 slidů) pokrývající historii, techniky, ekonomiku a obranu proti ransomware útokům.

## Historie ransomware (1989–2024)

| Rok | Ransomware | Význam |
|-----|-----------|--------|
| 1989 | **AIDS Trojan** | První známý ransomware — šířen na disketách |
| 2004 | **GPCode** | Šifrování RSA klíčem |
| 2013 | **CryptoLocker** | Průlomový — Bitcoin platby, silné šifrování |
| 2017 | **WannaCry** | Exploit **EternalBlue** (uniklý z NSA), 200 000+ obětí ve 150 zemích |
| 2017 | **Petya / NotPetya** | Destruktivní wiper maskovaný jako ransomware |
| 2019 | **Maze** | Průkopník **double extortion** — šifrování + hrozba zveřejnění dat |
| 2021 | **REvil** | Masivní útoky na dodavatelské řetězce (Kaseya) |

## Ransomware-as-a-Service (RaaS)

- **Obchodní model** — vývojáři pronajímají ransomware afiliátům za podíl z výkupného
- **Double extortion** — šifrování dat + hrozba jejich zveřejnění
- **Triple extortion** — navíc DDoS útok na oběť nebo kontaktování zákazníků oběti
- Propojení s [[imork-rizeny-hacking|organizovaným kybernetickým zločinem]]

## Významné případy 2021–2024

### 2021 — Rok velkých útoků

| Případ | Výkupné | Detail |
|--------|---------|--------|
| **Colonial Pipeline** | $4,4M | Odstávka největšího palivovodu v USA |
| **JBS Foods** | $11M | Největší zpracovatel masa na světě |
| **Kia Motors** | $20M | Požadavek skupiny DoppelPaymer |

### 2022 — Nové trendy

- **DeadBolt** — cílení na QNAP NAS zařízení (domácnosti i firmy)
- **BlackCat / ALPHV** — triple extortion RaaS, napsaný v **Rustu** (první ransomware v tomto jazyce)

### 2023–2024 — Další evoluce

- **HardBit 2.0** — útočníci žádají oběti o informace o pojistném krytí ([[rizeni-rizik|pojistný podvod]])
- **Rorschach** — nejrychlejší známé šifrování (dosud)
- **Phobos** — varování CISA, cílení na SMB segment

## Statistiky a ekonomika

- **75 %** obětí, které zaplatí, získá data zpět
- Průměrné výkupné Q3/2019: **$41 000**
- Náklady na obnovu: **7,5× výše výkupného** (downtime, reputace, forenzní analýza)
- Trend výkupného strmě stoupá — v roce 2021 průměr přes $200 000

## NISTIR 8374 — rámec obrany proti ransomware

Založeno na NIST Cybersecurity Framework — 5 pilířů:

| Pilíř | Aktivity |
|-------|----------|
| **Identify** | Inventarizace aktiv, [[rizeni-rizik\|analýza rizik]], mapování procesů |
| **Protect** | Zálohy (pravidlo 3-2-1), segmentace, školení, [[isms\|bezpečnostní politiky]] |
| **Detect** | Monitoring, EDR/XDR, analýza anomálií |
| **Respond** | Incident response plán, komunikace, forenzní analýza |
| **Recover** | Obnova ze záloh, [[bcm\|kontinuita provozu]], poučení |

## 9-krokový plán reakce na incident (IR)

1. Izolace napadených systémů
2. Identifikace varianty ransomware
3. Forenzní zajištění důkazů
4. Posouzení rozsahu napadení
5. Komunikace (vedení, právní, PR, regulátor)
6. Rozhodnutí o platbě (doporučení: **neplatit**)
7. Obnova ze záloh
8. Monitoring — ověření, že útočník nemá stále přístup
9. Poučení a aktualizace bezpečnostních opatření

## Proč neplatit výkupné

- Žádná záruka dešifrování
- Financování dalšího zločinu
- Opakované cílení na „platící" oběti
- **Projekt No More Ransom** (Europol + partneri) — bezplatné dešifrovací nástroje
- **Český trestní zákoník § 230** — financování terorismu / organizovaného zločinu

## Pravidlo 3-2-1 pro zálohy

- **3** kopie dat
- **2** různá úložná média
- **1** kopie mimo pracoviště (offsite / cloud)
- Klíčové: zálohy musí být **odpojené** (air-gapped) — jinak je ransomware zašifruje také

## Nástroje obrany

- **Cybereason XDR** — příklad platformy pro detekci a reakci napříč endpointy
- **NGFW** — blokování C2 komunikace
- [[sae|Bezpečnostní analýzy]] — pravidelné hodnocení zranitelností

## Vazby na další témata

- [[imork-sitove-utoky|Síťové útoky]] — řetězec Emotet → Trickbot → Ryuk
- [[imork-rizeny-hacking|Řízený hacking / APT]] — APT skupiny provozující RaaS
- [[imork-tor|TOR síť]] — distribuce ransomware přes Tor
- [[bcm|BCM]] — plán kontinuity po ransomware útoku
- [[isms|ISMS]] — preventivní bezpečnostní opatření
- [[rizeni-rizik|Řízení rizik]] — pojištění kybernetických rizik
- [[ochrana-dat|Ochrana dat]] — zálohovací strategie
