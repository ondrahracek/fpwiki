---
title: 'Případovka: Správa přihlašovacích údajů'
course: imork
type: summary
tags: [imork, autentizace, hesla, privilegovane-ucty, biometrika, nist, isms]
sources: [raw/imork/2104 VUT_Bezp_Případovka Správa login_2020.pdf]
created: 2026-04-12
updated: '2026-04-25'
---

# Případovka: Správa přihlašovacích údajů

Případová studie z 22. srpna 2020. Správa hesel, privilegovaných účtů, SSH klíčů a autentizačních prostředků v kontextu [[isms|ISMS]].

## Typy přístupu

| Typ | Popis |
|---|---|
| **Uživatelský přístup** | Běžný přístup uživatelů |
| **Privilegovaný účet** | Admin, root, sys — přístup k nejcitlivějším datům |
| **SSH klíč** | Zabezpečený komunikační protokol pro TCP/IP sítě |
| **PEM klíč** | Zakódovaný certifikát |

## Nebezpečné zvyky

- Slabé heslo, dlouho nezměněné
- Heslo na lístku na monitoru, v nešifrovaném souboru
- Sdílení hesel pro různé přístupy
- Chybějící zodpovědnost za privilegované účty
- **A2A** (aplikace-aplikace) — hesla pevně zakódovaná v kódu/konfiguracích

## Nová politika hesel (NIST SP 800-63)

### Doporučení NIST (2017)

- Povolit minimálně **64 znaků** pro přístupové fráze
- **Nevyžadovat periodické změny** (pouze po kompromitaci)
- Základní kritéria: **délka + složitost**
- Povolit zobrazení hesla při psaní, povolit vložení
- Nepoužívat nápovědy hesel
- Omezit pokusy o přihlášení
- Používat **hašování hesel** v databázích
- Zavést **vícefaktorové ověřování**

## 11 oblastí řešení správy privilegovaných hesel

1. **Automatizovaná detekce účtů** — detekce systémů bez agentů
2. **Zabezpečené úložiště** — šifrování dle FIPS 140-2, HSM moduly
3. **Automatické vynucování politik** — složitost, obnovovací cykly
4. **Bezpečné použití hesel** — uživatel hesla nevidí ani nezíská
5. **Heterogenní prostředí** — Windows, Linux, DB, síťová zařízení, ERP
6. **Podpora hypervizorů a cloudu** — VMware, Hyper-V, AWS, Azure
7. **A2A řešení** — dynamické získávání hesel místo pevného kódování
8. **Správa SSH klíčů** — stejné postupy ochrany jako pro hesla
9. **Volba nasazení** — HW server, SW, cloud služba
10. **All-in-One** — kompletní zabezpečený server
11. **Škálovatelnost** — klastrování, active-active, hybridní cloud

## Silná autentizace — behaviorální biometrika

- **Fyzická biometrika** — fyzické atributy (otisk, obličej)
- **Behaviorální biometrika** — vzorce chování uživatele

### Sledované parametry

- Preference zařízení a jejich parametrů
- Typ připojení vs. zařízení
- Frekvence a časy připojení
- Preference lokalit
- Způsob zadávání údajů
- Pracovní workflow v aplikacích

### Proces

Pokus o přihlášení → sběr dat → analýza → výpočet rizika → případný požadavek na dodatečnou autentizaci

**Závěr**: Behaviorální biometrika s vícefaktorovým ověřením = nejlepší poměr použitelnosti, nákladů a bezpečnosti.

## Propojení s dalšími tématy

- [[isms|ISMS]] — správa přístupu jako technická vrstva
- [[ochrana-dat|Ochrana dat]] — NAC, řízení přístupu
- [[imork-digitalni-identita|Digitální identita]] — autentizace a identifikace
- [[sae|SAE]] — budování povědomí o bezpečnosti hesel

## Zdroj v kurzu [[imork|ImorK]]

- Případovka 2104 — Správa přihlašovacích údajů (2020)
