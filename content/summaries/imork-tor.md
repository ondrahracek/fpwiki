---
title: "ImorK — TOR anonymizační síť"
course: imork
type: summary
tags: [tor, anonymizace, sifrovani, darknet, nsa]
sources: [raw/imork/CV 05 VUT_TOR.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# TOR — The Onion Router

Anonymizační síť založená na principu cibulového směrování (onion routing) — každý uzel v řetězci zná pouze předchozí a následující uzel.

## Architektura TOR

```
Uživatel → [TOR síť — šifrovaný provoz] → Exit relay → Cíl (nešifrovaný)
```

- **Vstupní uzel (Guard)** — zná IP uživatele, nezná cíl
- **Prostřední uzel (Middle)** — nezná ani zdroj, ani cíl
- **Výstupní uzel (Exit relay)** — vidí nešifrovaný provoz k cíli, nezná zdroj
- Každá vrstva šifrování se „sloupne" na příslušném uzlu

## Nástroje ekosystému TOR

| Nástroj | Funkce |
|---------|--------|
| **TOR** | Jádro — onion routing daemon |
| **Vidalia** | Grafické rozhraní pro správu TOR |
| **Privoxy** | HTTP proxy s filtrováním obsahu |
| **Torbutton** | Rozšíření prohlížeče pro přepínání TOR |
| **TOR Browser Bundle** | Kompletní balík — předkonfigurovaný Firefox + TOR |

## Sledování TOR uživatelů

- **NSA / X-Keyscore** — program pro sledování a identifikaci uživatelů TOR (odhalen Edwardem Snowdenem, 2013)
- **BadExit blacklist** — seznam škodlivých výstupních uzlů, které odposlouchávají provoz
- I při použití TOR existují [[kyberneticka-bezpecnost\|bezpečnostní rizika]] na výstupním uzlu

## Zneužití TOR pro kybernetické útoky

- Distribuce [[imork-ransomware|ransomware]] — např. **Cerber 5.0.1** šířený přes TOR infrastrukturu
- Darknetové tržiště — prodej exploitů, malware-as-a-service
- Komunikační kanály pro [[imork-rizeny-hacking|APT skupiny]]

## Regulace v EU

- **Návrh na omezení šifrované komunikace** — novela směrnice 2002/58/ES
- **Iniciativa Francie + Německo** — požadavek na zadní vrátka (backdoor) v šifrovaných komunikacích
- Konflikt mezi [[ochrana-dat|ochranou soukromí]] a bezpečnostními potřebami státu

## Vazby na další témata

- [[imork-rizeny-hacking|Řízený hacking / APT]] — TOR jako nástroj anonymizace útočníků
- [[imork-sitove-utoky|Síťové útoky]] — sniffing na exit relay
- [[imork-ransomware|Ransomware]] — TOR jako distribuční kanál
- [[isms|ISMS]] — zohlednění anonymizačních technologií v bezpečnostní politice
- [[sae|SAE]] — analýza hrozeb spojených s anonymními sítěmi
