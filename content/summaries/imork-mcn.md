---
title: "ImorK — Mission Critical Networks"
course: imork
type: summary
tags: [mcn, ncpi, dostupnost, spolehlivost, model-hrozeb]
sources: [raw/imork/2012 VUT_Bezp MCN-2015.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# Mission Critical Networks (MCN)

## Definice

MCN = síť s maximální dostupností. Jedná se o síťovou infrastrukturu, kde výpadek má kritické dopady na provoz organizace.

## NCPI — Network Critical Physical Infrastructure

Fyzická infrastruktura nezbytná pro provoz kritické sítě:

- **Napájení** (power)
- **Chlazení** (cooling)
- **Racky** (racks)
- **Kabeláž** (cabling)
- **Protipožární ochrana** (fire protection)
- **Management** (správa)
- **Servis** (service)

## Výhody standardizace

- Zvýšení [[dostupnost|dostupnosti]]
- Agilita nasazení
- Snížení TCO (Total Cost of Ownership)

## Modularita

Modularita je základem MCN — umožňuje škálovatelnost, jednodušší údržbu a rychlejší obnovu.

## 3 pravidla pro MCN

1. **Jednoduchost** — minimalizace složitosti
2. **Oddělení rutinních operací** — běžný provoz nesmí ohrožovat kritické funkce
3. **Spolehlivost** — redundance a odolnost vůči selhání

## Dostupnost

Výpočet dostupnosti:

```
Dostupnost = MTBF / (MTBF + MTTR)
```

- **MTBF** — Mean Time Between Failures (střední doba mezi poruchami)
- **MTTR** — Mean Time To Repair (střední doba opravy)

## TCO model

Model celkových nákladů na vlastnictví zahrnuje pořizovací náklady, provozní náklady, údržbu a náklady na výpadky.

## Model hrozeb ITU-T X.805 / X.800

### 5 typů útoků

1. Destrukce (destruction)
2. Poškození (corruption)
3. Odstranění (removal)
4. Odhalení (disclosure)
5. Přerušení (interruption)

### 8 bezpečnostních dimenzí

Řízení přístupu, autentizace, důvěrnost, integrita, nepopiratelnost, dostupnost, soukromí, komunikační bezpečnost.

### 3 bezpečnostní vrstvy

Vrstva infrastruktury, vrstva služeb, vrstva aplikací.

### 3 bezpečnostní úrovně

Úroveň end-user, úroveň control/signaling, úroveň management.

## Matice bezpečnostních modulů

Kombinací 3 vrstev × 3 úrovní vzniká **9 bezpečnostních modulů**, z nichž každý vyžaduje pokrytí všemi 8 dimenzemi.

## Aplikovatelnost na NGN

Model bezpečnosti je aplikovatelný na sítě nové generace (NGN), kde konvergence služeb zvyšuje požadavky na komplexní zabezpečení.
