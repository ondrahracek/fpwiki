---
title: ISMS v energetice
course: imork
type: summary
tags: [imork, isms, energetika, smart-grid, iec-61850, scada, plc]
sources: [raw/imork/2007 VUT_Bezp energetika-2023.pdf]
created: 2026-04-12
updated: '2026-04-25'
---

# ISMS v energetice

![[imork-energetika-vrstvy.jpeg|3 úrovně řízení elektrárny dle IEC 61850 — Station, Bay, Process]]

## Energetická strategie

Současný trend v energetice směřuje k:

- Decentralizované výrobě energie
- [[imork-smart-grid|Smart Grid]] (chytré sítě)
- Obnovitelným zdrojům energie

## Tři klíčové faktory pro IB v energetice

1. **Strategické vstupy** — smart grids a jejich závislost na ICT
2. **Vývoj SBC** (Single Board Computer) — miniaturizace řídících jednotek
3. **Kybernetický prostor** — propojení fyzické a digitální infrastruktury

## Normy

### ISO/IEC TR 27019:2020

Specifická norma pro řízení informační bezpečnosti v energetickém sektoru — rozšíření ISO 27001 pro energetiku.

### IEC 61850

Standard pro komunikaci v elektrických stanicích a elektrárnách. Definuje protokoly a datové modely pro automatizaci rozvodných sítí.

### IEC TC 57 WG 15

Pracovní skupina zaměřená na bezpečnost dat v energetických komunikačních systémech.

## Duální infrastruktura

Energetický sektor disponuje dvěma propojenými vrstvami:

- **Fyzická infrastruktura** — výrobny, rozvodny, přenosová vedení
- **Digitální infrastruktura** — SCADA, řídicí systémy, komunikační sítě

## Automatizační systémy

| Zkratka | Název | Funkce |
|---------|-------|--------|
| **PLC** | Programmable Logic Controller | Programovatelný logický automat |
| **SBC** | Single Board Computer | Jednodeskový počítač |
| **RTU** | Remote Terminal Unit | Vzdálená terminálová jednotka |
| **IED** | Intelligent Electronic Device | Inteligentní elektronické zařízení |

## Architektura elektrárny

Definovány **3 úrovně** v architektuře řízení elektrárny (station level, bay level, process level).

## Bezpečnostní principy

V energetice se uplatňuje rozšířený model:

- **CIA** (Confidentiality, Integrity, Availability)
- **Non-repudiation** (nepopiratelnost) — zvláště důležitá u řídících příkazů

## Penetrační testování

Příklad penetračního testování energetické infrastruktury — ověření odolnosti SCADA systémů a řídicích jednotek proti kybernetickým útokům.
