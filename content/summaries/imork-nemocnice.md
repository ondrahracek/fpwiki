---
title: "ImorK — Případovka: Útoky na nemocnice"
course: imork
type: summary
tags: [ransomware, zdravotnictvi, nemocnice, ryuk, kriticka-infrastruktura, nukib]
sources:
  - raw/imork/2106 VUT_Bezp_Případovka Nemocnice-2025.pdf
  - raw/imork/2106 VUT_Bezp_Případovka Nemocnice-2020.pdf
created: 2026-04-12
updated: 2026-04-12
---

# Případovka: Kybernetické útoky na české nemocnice

![[imork-nemocnice-ekonomika.jpeg|Nemocnice Benešov — prevence 8M Kč vs. škody 70M Kč]]

Případová studie z 6. dubna 2025. Tři reálné ransomware útoky na české nemocnice �� Benešov, Brno, Nymburk.

## Nemocnice Benešov — RYUK (prosinec 2019)

### Průběh útoku

| Čas | Událost |
|---|---|
| Neznámo | Malware proniká do sítě (týdny–měs��ce před aktivací) |
| 11.12.2019, 2:50 | Nahlášení problémů |
| 3:20 | Detekce kybernetického útoku |
| 3:30 | IT oddělení vypíná síť |

### Anatomie útoku

1. Masivní **spamová a phishingová kampaň**
2. E-mail s přílohou (falešná faktura) → spuštění malwaru **Emotet**
3. Emotet stáhl ransomware **RYUK**
4. RYUK mapoval síťová zařízení, pak šifroval klíči **RSA-4096** a **AES-256**

### Dopady

- Napadena **páteřní síť** včetně všech připojených zdravotnických p��ístrojů
- Nefunkční komunikace s jinými nemocnicemi
- Napadeno **600 koncových stanic** a všechny servery
- Zasaženy: laboratorní, ultrazvukové, rentgenové přístroje, CT a MR
- Napadeny i **datové zálohy**

### Ekonomické škody

| Položka | Částka |
|---|---|
| Přímé škody | 38 000 000 Kč |
| Reinstalace SW | 2 000 000 Kč |
| Ušlé platby pojišťoven | 30 000 000 Kč |
| **Celkem** | **~70 000 000 Kč** |

### Prevence vs. škoda

| Opatření | Náklady |
|---|---|
| Administrativní (denní kyberbezp. agenda) | 500 000 Kč |
| Organizační (školení personálu) | 500 000 Kč |
| Technická (zabezpečení infrastruktury) | 7 000 000 Kč |
| **Celkem prevence** | **~8 000 000 Kč** |

**8 mil. Kč prevence vs. 70 mil. Kč škod** — kde zůstal zdravý rozum?

## Fakultní nemocnice Brno (březen 2020)

- Kryptovirus (ransomware)
- Ztracena administrativní a ekonomická data
- Nenavratně ztracena data vědeckého významu a NIS
- Obnovena pacientská data a e-mailová komunikace
- Nemocnice se s následky vyrovnávala **roky**
- **Neoficiální odhad škod: minimálně 300–350 000 000 Kč** (odhady se liší dle zdroje)
- Útoky provedeny celkem na **16 dalších nemocnic**
- Ztracen internetový objednávkový systém u dárců krve

## Nemocnice Nymburk (červenec 2025)

- Ransomware ochromil téměř vše včetně přístrojového vybavení
- Nefungovaly vjezdové brány, zvonky, přístupy do systému
- Pacient převezen do jiné nemocnice
- Osobní údaje skutečně odcizeny ��točníky
- Nemocnice se vrátila do „papírové doby" minimálně do září 2025
- NÚKIB poskytuje součinnost, policie vyšetřuje

## Regulatorní reakce

- **NÚKIB** ve spolupráci s MZ vypracoval novelu vyhlášky č. 437/2017 Sb.
- Rozšíření počtu nemocnic regulovaných zákonem o [[kyberneticka-bezpecnost|kybernetické bezpečnosti]]
- Kybernetický audit u 16 významnějších nemocnic
- Distribuce indikátorů kompromitace (IP adresy, domény, hashe)

## Poučení

- Investice do prevence je **9× levnější** než náprava škod
- Separace a ochrana datových záloh je kritická
- Rychlá detekce a odpojení sítě (Benešov: 40 min od nahlášení)
- Pravidelné [[sae|školení personálu]] proti phishingu
- Sdílení informací s NÚKIB

## Propojení s dalšími tématy

- [[imork-zdravotnictvi|ISMS ve zdravotnictví]] — oborový kontext
- [[kyberneticka-bezpecnost|Kybernetická bezpečnost]] — ransomware, APT
- [[bcm|BCM]] / [[imork-dr|DR]] — obnova po havárii
- [[rizeni-rizik|Řízení rizik]] — ekonomické srovnání prevence vs. škod

## Zdroj v kurzu [[imork|ImorK]]

- Případovka 2106 — Útoky na nemocnice (2025)
