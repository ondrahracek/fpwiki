---
title: Ochrana dat
course: imork
type: summary
tags: [imork, ochrana-dat, sifrovani, nac, ids, dlp, kryptografie, eidas]
sources: [raw/imork/2017 VUT_Ochrana dat-2022.pdf]
created: 2026-04-12
updated: '2026-04-25'
---

# Ochrana dat

## Oblasti ochrany dat

- **Interní infrastruktura** — ochrana dat uvnitř organizace
- **Internet/kyberprostor** — ochrana dat při přenosu a v cloudu

## Typy zneužití dat

| Typ | Popis |
|-----|-------|
| **Šifrování** | Ransomware — zašifrování dat, požadavek výkupného |
| **Publikace** | Double ransomware — hrozba zveřejnění |
| **Odposlech** | Zachycení komunikace |
| **Krádež** | Exfiltrace dat |
| **Krádež v dodavatelském řetězci** | Triple ransomware — útok přes dodavatele |
| **Prodej** | Prodej ukradených dat na dark webu |

## 10 principů hrozeb pro databáze

Systematický přehled bezpečnostních hrozeb cílících na databázové systémy.

## Statistiky ČR

- **34 %** — zranitelnosti softwaru
- **27 %** — úniky z mobilních zařízení
- **26 %** — náhodné úniky zaměstnanců

## Open Data Institute (ODI)

Varování před riziky otevřených dat — nesprávné anonymizace, re-identifikace, zneužití.

## Bezpečnost IPv6

- **AH** (Authentication Header) — autentizace a integrita paketů
- **ESP** (Encapsulating Security Payload) — šifrování + autentizace
- **SPD** (Security Policy Database) — pravidla pro zpracování paketů
- **Security Associations** — parametry bezpečnostního spojení

## 7 bezpečnostních technologií

### 1. NAC (Network Access Control)

Řízení přístupu k síti — 4 fáze:

1. Identifikace zařízení
2. Autentizace uživatele
3. Posouzení stavu (compliance check)
4. Autorizace/karanténa

Funkční schéma: agent → policy server → enforcement point.

### 2. IDS (Intrusion Detection System)

Pasivní detekce průniků — monitoruje provoz a generuje alerty.

### 3. IPS (Intrusion Prevention System)

Aktivní prevence průniků — detekuje a automaticky blokuje hrozby.

### IDS vs. IPS

| Vlastnost | IDS | IPS |
|-----------|-----|-----|
| Režim | Pasivní (kopie provozu) | In-line (provoz prochází) |
| Reakce | Alert | Blokace |
| Dopad na síť | Žádný | Možná latence |

### 4. SIEM (Security Information and Event Management)

Centrální sběr a korelace bezpečnostních událostí.

### 5. DLP (Data Loss Prevention)

Prevence úniku dat — monitorování a blokování neoprávněného přenosu citlivých dat.

### 6. Šifrování

Kryptografická ochrana dat at-rest i in-transit.

### 7. UTM (Unified Threat Management)

Jednotná správa hrozeb — FW + IDS/IPS + AV + VPN v jednom zařízení.

### SIEM podrobně

- **EPS** (Events Per Second) — klíčová metrika pro dimenzování SIEM
- **Velikost logů** — plánování úložné kapacity dle objemu generovaných dat
- **Typy zařízení** — síťové prvky, servery, aplikace, bezpečnostní systémy, endpointy
- **Implementace** — začít s nejkritičtějšími zdroji logů, postupně rozšiřovat
- **Provozní příručka + BCM** — dokumentace provozu SIEM a jeho zahrnutí do plánů kontinuity

### DLP podrobně

Tři stavy dat:

| Stav | Popis | Ochrana |
|------|-------|---------|
| **Data in Use** | Data aktivně zpracovávaná na endpointu | DLP koncových bodů |
| **Data in Motion** | Data přenášená po síti | Síťový DLP (gateway) |
| **Data at Rest** | Data uložená na discích, v databázích | Šifrování, řízení přístupu |

- **Síťový DLP (gateway)** — monitorování a blokování na úrovni síťového perimetru
- **DLP koncových bodů** — agent na stanici, kontrola USB, tisku, schránky, emailu

### Kryptografie

| Algoritmus | Rok | Typ | Délka klíče |
|------------|-----|-----|-------------|
| **DES** | 1975 | Symetrický (blokový) | 64-bit (efektivních 56) |
| **IDEA** | 1990 | Symetrický (blokový) | 128-bit |
| **RSA** | 1977 (MIT) | Asymetrický | 1024–4096 bit |
| **AES** | 1997 (NIST) | Symetrický (blokový) | 128/192/256-bit |

### Steganografie

Skrytí informace ve zdánlivě neškodné zprávě — na rozdíl od kryptografie nezakrývá obsah, ale samotnou existenci tajné komunikace. Využití v obrázcích, zvuku, videu.

### Digitální podpisy

Ověření autora a integrity dokumentu pomocí asymetrické kryptografie.

### 4 vlastnosti elektronického podpisu

1. **Identifikace** — jednoznačné určení podepisující osoby
2. **Integrita** — detekce jakékoli změny dokumentu po podpisu
3. **Nepopiratelnost** — autor nemůže popřít, že dokument podepsal
4. **Nenapodobitelnost** — podpis nelze padělat

### Hašovací funkce

Jednosměrná funkce vytvářející otisk (hash) dokumentu — základ pro ověření integrity.

### Kvalifikovaný certifikát v ČR

V ČR existují **3 akreditované certifikační autority** pro vydávání kvalifikovaných certifikátů pro elektronický podpis.

## Dynamický biometrický podpis

- **ISO/IEC 24745** — ochrana biometrických šablon
- Zachycení unikátní **biometrické stopy** — tlak, rychlost, sklon pera, dynamika podpisu
- Každý podpis je jedinečný i při opakování — nelze jednoduše napodobit

## eIDAS

**Nařízení EU č. 910/2014** o elektronické identifikaci a službách vytvářejících důvěru:

- **Elektronické pečetě** — ověření původu a integrity dokumentů právnických osob
- **Časová razítka** — důkaz o existenci dokumentu v určitém čase
- **Služby vytvářející důvěru** — certifikační autority, doručovací služby

## ENISA Data Protection Engineering

Doporučení agentury ENISA pro technickou ochranu osobních údajů:

- **Privacy by Design / Default** — ochrana soukromí zabudovaná do návrhu systému
- **DPIA** (Data Protection Impact Assessment) — posouzení vlivu na ochranu údajů
- **PET** (Privacy Enhancing Technologies) — technologie pro zvýšení soukromí
- **Anonymizace** — nevratné odstranění identifikátorů
- **Differential privacy** — matematický rámec pro sdílení statistik bez odhalení jednotlivců
- **TEE** (Trusted Execution Environment) — bezpečné prostředí pro zpracování citlivých dat
- **Synthetic data** — generovaná data zachovávající statistické vlastnosti bez osobních údajů
