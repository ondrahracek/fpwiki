---
title: "ImorK — Disaster Recovery"
course: imork
type: summary
tags: [dr, disaster-recovery, rpo, rto, cloud, draas]
sources: [raw/imork/2013 VUT_Bezp DR-2021.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# Disaster Recovery (DR)

## Vztah k BCM

DR je součástí [[imork-bcm|Business Continuity Management]]. Zaměřuje se na obnovu IT systémů a dat po havárii.

## Klíčové metriky

- **RPO** (Recovery Point Objective) — maximální přípustná ztráta dat (časový úsek, za který se data ztratí)
- **RTO** (Recovery Time Objective) — maximální přípustná doba obnovy systému do provozuschopného stavu

## Normy a standardy

- **ISO/IEC 24762:2008** — směrnice pro obnovu ICT služeb po havárii
- **NIST SP 800-184** — průvodce obnovou po kybernetické události

## 10 kroků pro optimální DR plán

Strukturovaný postup tvorby DR plánu zahrnující analýzu rizik, identifikaci kritických systémů, definici RPO/RTO, výběr strategie, testování a průběžnou aktualizaci.

## 3 přístupy ke cloudovému DR

| Přístup | Popis | RTO |
|---------|-------|-----|
| **Cold** | Data zálohována, infrastruktura se staví až při havárii | Hodiny–dny |
| **Warm** | Částečně aktivní prostředí, rychlejší aktivace | Minuty–hodiny |
| **Hot** | Plně zrcadlené prostředí, okamžitý přepnutí | Sekundy–minuty |

## DRaaS (Disaster Recovery as a Service)

Tři modely poskytování:

- **Managed** — poskytovatel řídí celý DR proces
- **Assisted** — sdílená odpovědnost mezi zákazníkem a poskytovatelem
- **Self-service** — zákazník si sám spravuje DR v cloudovém prostředí

## 7 DR úrovní (Tiers)

| Tier | Popis |
|------|-------|
| 0 | Žádná off-site data |
| 1 | Záloha na vzdálené médium (pickup truck) |
| 2 | Záloha na vzdálené médium + hot site |
| 3 | Elektronický vaulting |
| 4 | Point-in-time kopie |
| 5 | Integrity transakcí |
| 6 | Minimální/žádná ztráta dat |
| 7 | Automatizace obnovy s využitím AI |

## Výstupy DR plánu

- **Obnova systémů** — postupy pro obnovení serverů, databází, aplikací
- **Obnova LAN** — rekonstrukce lokální síťové infrastruktury
- **Obnova vzdálené konektivity** — WAN, VPN, externí přístupy
