---
title: "ImorK — Risk Management"
course: imork
type: summary
tags: [rizeni-rizik, iso-31000, iso-27005, nist, hodnoceni-rizik]
sources: [raw/imork/2003 VUT_Bezp Risk Mngmt-2021.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# ImorK — Risk Management

## Normativní rámec

| Norma | Oblast |
|-------|--------|
| **ISO 31000:2019** | Obecné principy [[rizeni-rizik|řízení rizik]] |
| **ISO 31010:2020** | Techniky posuzování rizik |
| **ISO/IEC 27005:2019** | Řízení rizik informační bezpečnosti |
| **NIST SP 800-30** | Průvodce hodnocením rizik |

## Fáze řízení rizik

1. **Stanovení kontextu** — rozsah, kritéria, hranice
2. **Identifikace rizik** — aktiva, hrozby, zranitelnosti
3. **Analýza rizik** — odhad pravděpodobnosti a dopadu
4. **Hodnocení rizik** — porovnání s kritérii přijatelnosti
5. **Ošetření rizik** — výběr opatření
6. **Akceptace rizik** — formální přijetí zbytkového rizika
7. **Komunikace a konzultace** — průběžně se stakeholdery
8. **Monitorování a přezkoumání** — kontinuální cyklus

## Vzorec rizika

```
Riziko = Dopad na aktivum × Hrozba × Zranitelnost
```

Riziko je funkcí hodnoty aktiva (co chráníme), pravděpodobnosti realizace hrozby a míry zranitelnosti.

## Přijatelnost rizika

Organizace stanoví hranici akceptovatelného rizika. Rizika nad touto hranicí musí být ošetřena jedním ze způsobů:

- **Redukce** — implementace opatření
- **Transfer** — přenesení (pojištění, outsourcing)
- **Vyhnutí** — ukončení rizikové činnosti
- **Akceptace** — vědomé přijetí (s odůvodněním)

## Bezpečnostní role dle ZKB

| Role | Odpovědnost |
|------|-------------|
| **Výbor pro kybernetickou bezpečnost** | Strategické řízení |
| **Manažer kybernetické bezpečnosti** | Operativní řízení |
| **Architekt kybernetické bezpečnosti** | Návrh bezpečnostní architektury |
| **Auditor kybernetické bezpečnosti** | Nezávislé hodnocení |
| **Garant aktiva** | Odpovědnost za konkrétní aktivum |

## Plán zvládání rizik (RTP)

Risk Treatment Plan — dokument specifikující:

- Vybraná opatření pro jednotlivá rizika
- Odpovědné osoby
- Termíny implementace
- Potřebné zdroje

## Prohlášení o aplikovatelnosti (SoA/PoA)

Statement of Applicability — seznam všech opatření z Přílohy A normy ISO 27001 s uvedením:

- Zda je opatření aplikováno
- Zdůvodnění zahrnutí/vyloučení
- Stav implementace

## NIST SP 800-30 — víceúrovňové hodnocení

Hodnocení rizik na třech úrovních:

1. **Organizační** — strategická rizika
2. **Procesní (mission/business)** — rizika klíčových procesů
3. **Informačních systémů** — technická rizika

## Metodika pro organizace s KII/VIS

Specifický postup hodnocení rizik pro organizace provozující:

- **KII** — kritickou informační infrastrukturu
- **VIS** — významné informační systémy

Vychází z požadavků zákona o kybernetické bezpečnosti (ZKB 181/2014 Sb.) a prováděcích vyhlášek.
