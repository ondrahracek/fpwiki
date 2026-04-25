---
title: "ImorK — Automotive bezpečnost"
course: imork
type: summary
tags: [isms, automotive, can-bus, tisax, iso-11898]
sources: [raw/imork/2010 VUT_Bezp Automotive-2023.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# Automotive bezpečnost

![[imork-automotive-vrstvy.jpeg|4 bezpečnostní vrstvy automobilu — Cloud, Komunikace, Gateway, ECU/CAN bus]]

## CAN Bus

**CAN** (Controller Area Network) — komunikační sběrnice pro vozidla:

- Vyvinuta firmou **Bosch** v roce 1983
- Normalizována jako **ISO 11898**
- Povinná v EU od roku 2001
- Moderní vozidlo obsahuje až **70 ECU** (Electronic Control Unit)

### CAN Hacking Tool (CHT)

Nástroj pro bezpečnostní testování a demonstraci zranitelností CAN sběrnice.

## Vektory útoku

- **OBD-II konektor** — přímý fyzický přístup ke sběrnici
- **Bluetooth** — bezdrátový útok přes hands-free a infotainment
- **WiFi** — připojení přes hotspot vozidla
- **Infotainment systém** — vstupní brána do vnitřní sítě vozidla
- **Relay útoky na keyless entry** — prodloužení signálu klíčenky

## 4 bezpečnostní vrstvy

Vícevrstvý model ochrany automobilových systémů (hardware, síťová, aplikační, datová vrstva).

## Ochrana soukromí

Problematika soukromí v kontextu:

- Navigačních systémů (sledování polohy)
- Systému **eCall** (automatické tísňové volání)

## TISAX

**Trusted Information Security Assessment Exchange** — standard pro automobilový průmysl:

- Vytvořen sdruženími **VDA** (Verband der Automobilindustrie) a **ENX**
- Založen na [[iso-27001|ISO 27001]]
- Obsahuje **model zralosti** (maturity model)
- **4 moduly**:
  1. ISMS
  2. Ochrana dat (data protection)
  3. Připojení třetích stran
  4. Ochrana prototypů

## UN Regulation No. 155

Od **července 2024** povinná kybernetická ochrana pro všechna nová vozidla v EU:

- Požadavky na celý životní cyklus vozidla
- Povinnost implementace CSMS (Cyber Security Management System)
- Podmínka pro **homologaci** vozidla

## Penetrační testování

Testování bezpečnosti automobilových systémů jako součást procesu homologace a certifikace.
