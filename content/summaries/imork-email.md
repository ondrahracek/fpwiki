---
title: "ImorK — Bezpečnost emailových služeb"
course: imork
type: summary
tags: [email, smtp, bezpecnost, sifrovani, spf, dkim, dmarc, pgp, bec, sandboxing, mimecast]
sources: [raw/imork/2016 VUT_Bezp Email-2022.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# Bezpečnost emailových služeb

## Principy emailu

- **SMTP** (Simple Mail Transfer Protocol) — odesílání a přenos zpráv
- **POP3** (Post Office Protocol v3) — stahování zpráv (maže ze serveru)
- **IMAP** (Internet Message Access Protocol) — přístup ke zprávám na serveru

## MIME standard

Multipurpose Internet Mail Extensions — umožňuje přenos příloh, formátovaného textu a multimédií v emailu.

## NIST SP 800-45

Průvodce zabezpečením emailových služeb — doporučení pro konfiguraci a provoz.

## 9 bezpečnostních protokolů emailu

| # | Protokol | Funkce |
|---|----------|--------|
| 1 | **SSL/TLS pro HTTPS** | Šifrování webového přístupu k emailu |
| 2 | **SMTPS** | Šifrování SMTP komunikace |
| 3 | **STARTTLS** | Upgrade nešifrovaného spojení na šifrované |
| 4 | **MTA-STS** | Vynucení TLS mezi mail servery |
| 5 | **SPF** | Ověření oprávněného odesílatele (DNS záznam) |
| 6 | **DKIM** | Digitální podpis zprávy doménou |
| 7 | **DMARC** (+ BIMI) | Politika pro SPF/DKIM selhání + vizuální ověření |
| 8 | **S/MIME** | End-to-end šifrování a podpis (certifikáty) |
| 9 | **OpenPGP** | End-to-end šifrování a podpis (klíče) |

## Doporučení pro šifrování

- **Symetrické**: AES 128/192/256
- **Podpisy**: DSS (Digital Signature Standard)
- **Asymetrické**: RSA 2048+ bitů
- **Hash**: SHA-256

## Zabezpečení OS mailového serveru

Hardening operačního systému — minimalizace služeb, aktualizace, správa oprávnění.

## DMZ architektura

Mail server umístěn v demilitarizované zóně — oddělení od vnitřní sítě i internetu.

## Mail gateway

Vstupní bod pro email — filtrování spamu, malwaru, kontrola politik.

## PGP / OpenPGP

- **RSA asymetrické šifrování** — veřejný klíč pro šifrování, soukromý pro dešifrování
- **RFC 2440** — specifikace OpenPGP Message Format
- **EFAIL zranitelnost (2018)** — útok na šifrované emaily přes HTML rendering; útočník mohl exfiltrovat obsah šifrované zprávy
- **MDC** (Modification Detection Code) — ochrana integrity zpráv proti EFAIL útoku

## Digitální certifikáty

Elektronické dokumenty prokazující vlastnictví veřejného klíče:

- Vydávány certifikační autoritou (CA)
- Obsahují: veřejný klíč, identitu vlastníka, dobu platnosti, podpis CA
- Základ pro [[informacni-bezpecnost|důvěryhodnou komunikaci]] (S/MIME, TLS)

## Emailové hrozby 21. století

### Komplexní přístup k ochraně

Trojí úroveň:

1. **Perimetr** — ochrana na hranici sítě (spam filtry, gateway)
2. **Vnitřní síť** — detekce hrozeb uvnitř organizace
3. **Mimo organizaci** — ochrana značky, monitoring podvodných domén

### Cloud migration rizika

Přechod na cloudové emailové služby (např. **Office 365**) přináší nové vektory útoku — sdílená infrastruktura, API zranitelnosti.

### Email jako vektor č. 1

Email zůstává primárním vektorem kybernetických útoků — vstupní brána pro phishing, malware, BEC.

## BEC přes email (Business Email Compromise)

- **Impersonace** — útočník se vydává za vedoucího pracovníka nebo obchodního partnera
- **Kompromitace dodavatelského řetězce** — zneužití důvěry mezi organizacemi
- **Ztráta citlivých dat** — exfiltrace informací přes kompromitovaný email

## Ochrana a obrana

### SAE + simulační nástroje

Školení bezpečnostního povědomí (Security Awareness Education) doplněná o simulované phishingové kampaně.

### Tři zóny ochrany

| Zóna | Opatření |
|------|----------|
| **Perimetr** | Spam/phishing filtrování, antimalware gateway |
| **Vnitřní síť** | Detekce anomálií, monitorování neobvyklého chování |
| **Za perimetrem** | Monitoring podvodných webů, [[imork-email|DMARC]] enforcement |

## Mimecast

- **Cloudová emailová brána** — SaaS architektura
- **Email Security 3.0** — pokročilá ochrana proti cíleným útokům, impersonaci a malwaru
- Integrace s existující infrastrukturou (Office 365, Google Workspace)

## Sandboxing

- **Emulace hrozeb** — spuštění podezřelých příloh a odkazů v izolovaném virtuálním prostředí
- Detekce neznámého malwaru, který projde signaturovou kontrolou
- Izolace zabraňuje šíření hrozby do produkční sítě

## Vrstvy zabezpečení infrastruktury

1. **Firewall** — síťová filtrace
2. **Server** — hardening, aktualizace
3. **Endpoint** — ochrana koncových stanic
