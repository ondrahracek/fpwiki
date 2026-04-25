---
title: "ImorK — Manažerská bezpečnost"
course: imork
type: summary
tags: [isms, governance, siem, log-management, isaca, nba, incident-management, iam, access-control, mobilni-bezpecnost, penetracni-testy]
sources: [raw/imork/2001 VUT_Bezp Managerská 2022.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# ImorK — Manažerská informační bezpečnost

![[imork-isms-role.jpeg|Organizační schéma bezpečnostních rolí ISMS — CEO, CIO, CISO, Manažer/Architekt/Auditor KB]]

## Governance informační bezpečnosti

Rámce pro řízení [[informacni-bezpecnost|informační bezpečnosti]] na úrovni vedení organizace:

- **ISO/IEC 27014** — governance informační bezpečnosti
- **NIST SP 800-100** — Information Security Handbook pro management

## Bezpečnostní role

| Role | Odpovědnost |
|------|-------------|
| **CISO** | Hlavní odpovědnost za IB, reporting vedení |
| **CIO** | Řízení IT strategie |
| **CTO** | Technologická architektura |
| **ISSO** | Operativní bezpečnost systémů |

## Tři třídy informační bezpečnosti

1. **Manažerská** — governance, politiky, [[rizeni-rizik|řízení rizik]]
2. **Provozní (Operations)** — procesy, incidenty, kontinuita
3. **Technická** — šifrování, řízení přístupu, síťová bezpečnost

## Strom počítačové bezpečnosti

Hierarchická dekompozice oblastí IB — od strategického řízení přes provozní opatření po technické kontroly.

## Řízení rizik — normativní rámec

- **ISO 31000** — obecný rámec [[rizeni-rizik|řízení rizik]]
- **ISO/IEC 27005** — řízení rizik specificky pro IB
- Vazba na aktiva, hrozby a zranitelnosti

## Události vs. incidenty

| Pojem | ISO 27001 | NIST 800-61 |
|-------|-----------|-------------|
| **Událost (event)** | Identifikovaný výskyt stavu systému | Jakákoli pozorovatelná událost v systému |
| **Incident** | Nežádoucí událost s pravděpodobným dopadem na IB | Porušení bezpečnostní politiky |

## SIEM a Log Management

### Log Management (NIST SP 800-92)

- Sběr, ukládání a analýza logů
- Protokol **syslog** jako standard
- Centralizované vs. distribuované řešení

### [[siem|SIEM]] (Security Information and Event Management)

- Korelace událostí z více zdrojů
- Real-time monitoring a alerting
- Forenzní analýza

## Ochranné bezpečnostní vrstvy

```
Firewall → IDS/IPS → Antivirus → Event Management → SIEM
```

- **Firewall (FW)** — řízení síťového provozu
- **IDS/IPS** — detekce/prevence průniků
- **Antivirus** — ochrana před malwarem
- **Event management** — správa bezpečnostních událostí

## NBA (Network Behavior Analysis)

Detekce hrozeb na základě chování sítě — na rozdíl od signaturových metod dokáže identifikovat:

- **Zero-day útoky** — dosud neznámé hrozby bez existující signatury
- **Polymorfní malware** — škodlivý kód měnící svou podobu při každém spuštění
- Analýza anomálií v síťovém provozu (objemy, vzory komunikace, neobvyklé protokoly)

## Incident management

### Normativní rámce

- **ISO/IEC 27035** — řízení incidentů [[informacni-bezpecnost|informační bezpečnosti]]
- **NIST SP 800-61r2** — Computer Security Incident Handling Guide

### CSIRT (Computer Security Incident Response Team)

Role CSIRT:

- **Detekce** — identifikace bezpečnostních incidentů
- **Poradenství** — doporučení pro řešení a prevenci
- **SAE** (Security Awareness Education) — zvyšování povědomí o bezpečnosti
- **Sdílení informací** — výměna poznatků s dalšími týmy a organizacemi

### Klasifikace incidentů

Tři třídy závažnosti incidentů pro určení priority reakce a eskalace.

### IRP životní cyklus (Incident Response Plan)

1. **Příprava** — politiky, školení, nástroje
2. **Detekce a analýza** — identifikace a posouzení incidentu
3. **Odstranění a obnova** — eliminace hrozby, obnova systémů
4. **Poučení** — dokumentace, lessons learned, úprava procesů

## Správa klíčů

### NIST SP 800-57

Doporučení pro správu kryptografických klíčů — životní cyklus klíčů (generování, distribuce, ukládání, rotace, zničení).

### PKI (Public Key Infrastructure)

Infrastruktura veřejných klíčů — certifikační autority, digitální certifikáty, registrační autority.

### Protokoly využívající správu klíčů

| Protokol | Použití |
|----------|---------|
| **IPsec** | Bezpečnost síťové komunikace (L3) |
| **TLS** | Šifrování transportní vrstvy (L4) |
| **S/MIME** | End-to-end šifrování emailu |
| **Kerberos** | Autentizace v doménových sítích |
| **DNSSEC** | Ověření integrity DNS záznamů |

## Testování bezpečnosti

### NIST SP 800-115

Technical Guide to Information Security Testing and Assessment.

### Typy testů

- **Externí testy** — simulace útoku z vnější sítě
- **Interní testy** — hodnocení bezpečnosti zevnitř organizace
- **Lámání hesel** — ověření síly heselných politik

### Penetrační testy — 4 fáze

1. **Plánování** — definice rozsahu, pravidel a cílů
2. **Průzkum (Discovery)** — sběr informací o cíli
3. **Exploitace** — pokus o průnik a zneužití zranitelností
4. **Reporting** — dokumentace nálezů a doporučení

### Nástroje

- **SCAP** (Security Content Automation Protocol) — automatizované hodnocení bezpečnosti
- **BackTrack / Kali Linux** — distribuce pro penetrační testování

## IAM / IdM (Identity and Access Management)

Řízení identit a přístupu — správa životního cyklu digitálních identit v organizaci.

### Životní cyklus identity

Vytvoření → Správa → Použití → Deaktivace → Smazání.

### ITU-T Y.2720

Rámec pro řízení identit v NGN (Next Generation Networks).

### Konektory pro integraci

- **LDAP** — adresářové služby
- **SQL** — databázové systémy
- **Web services** — webové služby (SOAP, REST)

### Nasazení IdM

Implementace probíhá v postupných krocích — od pilotního nasazení přes integraci klíčových systémů po plný provoz.

## Access Control (Řízení přístupu)

### Síťový přístup

Řízení přístupu k síťovým prostředkům — autentizace, autorizace, accounting (AAA).

### Fyzický přístup — ČSN P 734450-1

- **STO** (Systém technické ochrany) — technické prostředky fyzické bezpečnosti
- **EPS** (Elektrická požární signalizace) — detekce a signalizace požáru
- **Kategorizace objektů** — klasifikace dle úrovně požadované ochrany

## Mobilní bezpečnost

### BYOD (Bring Your Own Device)

Politika umožňující zaměstnancům používat vlastní zařízení — přináší rizika úniku dat a nedostatečné kontroly.

### Řešení pro správu mobilních zařízení

| Řešení | Rozsah |
|--------|--------|
| **MDM** (Mobile Device Management) | Správa zařízení — vzdálené vymazání, vynucení politik |
| **EMM** (Enterprise Mobility Management) | Rozšířená správa — aplikace, obsah, identita |
| **Kontejnerizace** | Oddělení firemních a soukromých dat na zařízení |

## Certifikace ISACA

- CISA (Certified Information Systems Auditor)
- CISM (Certified Information Security Manager)
- CRISC (Certified in Risk and Information Systems Control)
- CGEIT (Certified in Governance of Enterprise IT)
