---
title: Řízený hacking — Advanced Persistent Threat (APT)
course: imork
type: summary
tags: [imork, apt, fancy-bear, informacni-valka, osint]
sources: [raw/imork/CV 04 VUT_Řízený hacking.pdf]
created: 2026-04-12
updated: '2026-04-25'
---

# Řízený hacking — Advanced Persistent Threat (APT)

Případová studie zaměřená na pokročilé přetrvávající hrozby (APT) — organizované, dlouhodobé kybernetické operace řízené státními aktéry.

## 4 fáze APT útoku

| Fáze | Popis | Techniky |
|------|-------|----------|
| **1. Příprava** | Průzkum cíle, vývoj exploitů | OSINT, vývoj zero-day exploitů, mapování infrastruktury |
| **2. Průnik** | Počáteční kompromitace | Spear phishing, watering hole, zero-day zranitelnosti |
| **3. Kompromitace** | Rozšíření přístupu v síti | Lateral movement, RAT (Remote Access Trojan), rootkit |
| **4. Dokončení** | Splnění cíle operace | Exfiltrace dat, sabotáž systémů |

## Známé APT skupiny

| Skupina | Alias | Stát | Cíle |
|---------|-------|------|------|
| **APT28** | Fancy Bear / Sofacy | Rusko | NATO, západní vlády, [[kyberneticka-bezpecnost\|kritická infrastruktura]] |
| **APT29** | Cozy Bear | Rusko | Pentagon, DNC (Demokratická strana USA) |
| **APT34** | — | Írán | Blízký východ, energetika |
| **APT37** | Reaper | Severní Korea | Jihokorejské cíle |
| **APT41** | Winnti | Čína | Globální technologické firmy |
| **Ghost Net** | — | Čína | 100+ zemí, diplomatické cíle |

## Ruské informační operace

- **Trollí farmy** — systematická tvorba a šíření dezinformací na sociálních sítích
- **Falešné zprávy** — vytváření důvěryhodně vypadajících zpravodajských webů
- **Zpráva FBI/CIA/NSA (2017)** — společná zpráva amerických zpravodajských služeb o ruském zasahování do prezidentských voleb 2016
- Propojení s konceptem informační války a [[sae\|bezpečnostní analýzy]]

## České cíle APT útoků

- **MZV ČR** (Ministerstvo zahraničních věcí) — opakované cíle APT28/Sofacy
- **MO ČR** (Ministerstvo obrany) — kompromitace e-mailové infrastruktury
- **BIS** — výroční zprávy opakovaně upozorňují na APT aktivity cílené na ČR
- Kampaň **APT28/Sofacy** specificky zaměřená na české státní instituce

## Obranné mechanismy

- **NGFW** (Next-Generation Firewall) — hloubková inspekce provozu
- **Malware Analysis Appliance** — analýza podezřelých souborů v sandboxu
- **Virtual Execution Engine** — spouštění podezřelého kódu v izolovaném prostředí
- Propojení s [[isms|ISMS]] a [[rizeni-rizik|řízením rizik]] v organizaci

## Vazby na další témata

- [[imork-anatomie-utoku|Anatomie kybernetického útoku]] — obecný kill chain model
- [[imork-sitove-utoky|Síťové útoky]] — technické vektory průniku
- [[imork-tor|TOR síť]] — anonymizace útočníků
- [[ochrana-dat|Ochrana dat]] — cíl exfiltrace
- [[bcm|BCM]] — kontinuita po APT kompromitaci
