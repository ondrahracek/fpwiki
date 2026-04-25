---
title: "ImorK — Internetová bezpečnost"
course: imork
type: summary
tags: [internet, bezpecnost, osint, apt, kyberprostor, cviceni]
sources: [raw/imork/CV 01 VUT_Bezp_Internetová bezpečnost-2023.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# Internetová bezpečnost — cvičení

Cvičení (30 slidů, 1.8.2023) pokrývající základní koncepty bezpečnosti na internetu — od struktury kyberprostoru přes hrozby a APT skupiny až po OSINT a pravidla bezpečného chování. Součást kurzu [[imork|ImorK]].

## Kyberprostor

- **Vznik pojmu**: 1983 (William Gibson), popularizace J.P. Barlow (Deklarace nezávislosti kyberprostoru)
- Virtuální prostředí vytvořené propojením počítačových sítí

### Vrstvy webu

| Vrstva | Podíl | Charakteristika |
|--------|-------|-----------------|
| **Surface Web** | ~4 % | Indexováno vyhledávači, veřejně přístupné |
| **Deep Web** | ~96 % | Neindexováno — databáze, intranety, placený obsah |
| **Dark Web** | (součást Deep) | Přístup přes [[imork-tor\|Tor]], anonymita, nelegální tržiště |

## Aktiva v kyberprostoru

Kategorie aktiv, která je třeba chránit:

- **HW** — servery, síťové prvky, koncová zařízení
- **SW** — operační systémy, aplikace
- **Informace** — data, databáze, zálohy
- **Lidské zdroje** — zaměstnanci, správci, uživatelé
- **Protokoly** — komunikační a síťové protokoly
- **Služby** — webové, emailové, cloudové
- **Infrastruktura** — budovy, napájení, klimatizace

## Hrozby

Klasifikace hrozeb podle typu:

- **Fyzické** — krádež, sabotáž, vandalismus
- **Katastrofy** — přírodní (povodeň, požár) i lidské
- **Poruchy** — selhání HW, SW chyby
- **Výpadky** — ztráta konektivity, napájení
- **Poškození** — korupce dat, degradace
- **Zneužití** — neoprávněný přístup, eskalace práv
- **Odposlech** — [[imork-sitove-utoky|sniffing]], man-in-the-middle
- **Právní** — nesoulad s legislativou, sankce

### ESET Top 10 hrozeb ČR (2019)

Přehled nejčastějších [[kyberneticka-bezpecnost|kybernetických hrozeb]] detekovaných v České republice podle společnosti ESET.

## APT skupiny

Advanced Persistent Threat — sofistikované státem sponzorované skupiny:

| Skupina | Alias | Původ | Zaměření |
|---------|-------|-------|----------|
| **APT28** | Fancy Bear | Rusko (GRU) | NATO, politické cíle |
| **APT29** | Cozy Bear | Rusko (SVR) | Vládní instituce, výzkum |
| **APT34** | OilRig | Írán | Blízký východ, energetika |
| **APT37** | Reaper | Severní Korea | Jižní Korea, dezertéři |

## OSINT (Open Source Intelligence)

Zpravodajství z otevřených zdrojů — 5 procesních kroků:

1. **Identifikace** — definice cíle a požadavků
2. **Sběr** — shromáždění dat z otevřených zdrojů
3. **Zpracování** — třídění, čištění, strukturování
4. **Analýza** — vyhodnocení, korelace, interpretace
5. **Report** — prezentace výsledků, doporučení

## Pravidla bezpečného chování

### Komunikační opatření

- Ověřování identity komunikačních partnerů
- Opatrnost při sdílení osobních údajů
- Rozpoznávání phishingu a [[imork-email|podvodných emailů]]

### Technická opatření

- Aktualizace SW a OS
- Používání antivirového řešení
- Šifrování komunikace
- Bezpečné [[imork-sprava-login|hesla]] a vícefaktorová autentizace

## KRACKs (Key Reinstallation Attacks)

- Zranitelnost protokolu **WPA2** (2017)
- Umožňuje odposlech šifrované WiFi komunikace
- Útočník vynucuje reinstalaci šifrovacího klíče
- Propojení s [[imork-www|bezpečností webových služeb]]

## NÚKIB

**Národní úřad pro kybernetickou a informační bezpečnost** — ústřední orgán státní správy ČR pro [[kyberneticka-bezpecnost|kybernetickou bezpečnost]].

## NIST SP 800-63 — Politika hesel

Moderní doporučení pro správu hesel dle NIST:

- Minimální délka místo složitých pravidel
- Kontrola proti slovníkům kompromitovaných hesel
- Odstranění požadavku na pravidelnou změnu hesla
- Souvisí s [[imork-sprava-login|správou privilegovaných účtů]]

## 11 požadavků na správu privilegovaných účtů

Požadavky na bezpečné řízení účtů se zvýšenými oprávněními — shodné s obsahem [[imork-sprava-login|Správa login]]:

- Inventarizace privilegovaných účtů
- Princip nejmenšího oprávnění
- Vícefaktorová autentizace
- Monitoring a audit aktivit
- Automatická rotace hesel
- Oddělení povinností

## Behaviorální biometrika

- Identifikace uživatele na základě vzorců chování
- Dynamika psaní na klávesnici, pohyb myši, gesta na dotykovém displeji
- Kontinuální autentizace bez nutnosti aktivního zásahu uživatele
- Propojení s [[imork-digitalni-identita|digitální identitou]]

## Souvislosti

- [[imork-www|Bezpečnost WWW]] — webové hrozby a ochrana
- [[imork-email|Bezpečnost emailu]] — phishing, spam, malware
- [[imork-sprava-login|Správa login]] — hesla a privilegované účty
- [[imork-tor|Tor a anonymita]] — Dark Web
- [[imork-sitove-utoky|Síťové útoky]] — technické aspekty hrozeb
- [[ochrana-dat|Ochrana dat]] — legislativní rámec
- [[isms|ISMS]] — systém řízení bezpečnosti informací
