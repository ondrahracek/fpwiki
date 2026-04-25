---
title: Bezpečnost webových služeb
course: imork
type: summary
tags: [imork, web, owasp, ssl, tls, ipsec, xml-security, data-diodes]
sources: [raw/imork/2015 VUT_Bezp WWW-2019.pdf]
created: 2026-04-12
updated: '2026-04-25'
---

# Bezpečnost webových služeb

## Základy webu

- **HTTP** — protokol pro přenos hypertextu
- **HTML** — značkovací jazyk webových stránek
- Architektura klient–server

## Historie a standardizace

- **Tim Berners-Lee** — tvůrce World Wide Web (1989)
- **W3C** (World Wide Web Consortium) — standardizační organizace

## Projekt Solid

Decentralizovaná platforma pro správu osobních dat:

- Uživatel vlastní svá data v **POD** (Personal Online Data store)
- Aplikace žádají o přístup k datům
- Oddělení dat od aplikací

## OWASP Top 10

Žebříček 10 nejkritičtějších bezpečnostních rizik webových aplikací (pravidelně aktualizovaný).

## Důvěryhodnost webu (Web Credibility)

Faktory ovlivňující vnímání důvěryhodnosti webových stránek uživateli.

## Architektura webových aplikací

```
Prohlížeč → Webový server → Databáze
```

Každá vrstva představuje potenciální vektor útoku.

## Typy útoků na webové aplikace

| Útok | Cíl | Efekt | Prevence |
|------|-----|-------|----------|
| **Content Spoofing** | Obsah stránky | Falešný obsah | Validace vstupu |
| **XSS** (Cross-Site Scripting) | Prohlížeč uživatele | Krádež session, přesměrování | Escapování výstupu |
| **Session Fixation** | Session ID | Převzetí relace | Regenerace session |
| **Path Traversal** | Souborový systém | Přístup k souborům | Sanitizace cest |
| **DoS** | Dostupnost služby | Výpadek | Rate limiting, WAF |
| **SQL Injection** | Databáze | Únik/modifikace dat | Parametrizované dotazy |
| **XPath Injection** | XML data | Neautorizovaný přístup | Validace vstupu |

## W3C — 6 bodů bezpečnosti webových služeb

1. **Autentizace** — ověření identity
2. **Autorizace** — kontrola oprávnění
3. **Důvěrnost** — ochrana dat před odposlechem
4. **Integrita** — ochrana před modifikací
5. **Nepopiratelnost** — důkaz o provedení akce
6. **Dostupnost** — zajištění přístupu ke službě

## NIST SP 800-95

Průvodce zabezpečením webových služeb — doporučení pro návrh, implementaci a provoz.

## IPsec — bezpečnost na L3

Bezpečnostní protokol na síťové vrstvě (L3) dle **RFC 4301**:

| Protokol | Funkce |
|----------|--------|
| **AH** (Authentication Header) | Autentizace a integrita paketů |
| **ESP** (Encapsulating Security Payload) | Šifrování + autentizace |

### Režimy IPsec

- **Transportní režim** — šifruje pouze payload, hlavička zůstává; komunikace host-to-host
- **Tunelovací režim** — šifruje celý paket včetně hlavičky; VPN gateway-to-gateway

## TLS — bezpečnost na L4

Zabezpečení transportní vrstvy (L4) — 3 fáze handshaku:

1. **Dohoda** — výběr šifrovací sady (cipher suite)
2. **Výměna klíčů** — autentizace serveru (volitelně klienta), výměna session klíčů
3. **Šifrování** — symetrické šifrování datového přenosu

Použití: **HTTPS**, **SIP**, **VPN** a další protokoly.

## SSL architektura

- **Bodové zabezpečení** (point-to-point) — šifrování mezi dvěma koncovými body
- **Nevýhody**: zajišťuje pouze point-to-point, nikoli end-to-end zabezpečení; každý mezilehlý uzel musí dešifrovat a znovu zašifrovat

## XML Security

Sada standardů pro zabezpečení XML-based webových služeb:

| Standard | Funkce |
|----------|--------|
| **XML Digital Signature** | Digitální podpis XML dokumentů |
| **XML Encryption** | Šifrování XML dat |
| **XKMS** (XML Key Management Specification) | Správa klíčů pro XML |
| **SAML** (Security Assertion Markup Language) | Výměna autentizačních a autorizačních informací |
| **XACML** (eXtensible Access Control Markup Language) | Řízení přístupu na základě politik |
| **WSS/SOAP** (Web Services Security) | Zabezpečení SOAP zpráv |
| **WS-Trust** | Vydávání a validace bezpečnostních tokenů |

## Referenční model bezpečnosti webu

Pět klíčových oblastí:

1. **Security Management** — řízení bezpečnostních politik a procesů
2. **Identity Management** — správa identit a autentizace
3. **Message Security** — zabezpečení zpráv (šifrování, podpisy)
4. **Policy** — definice a vynucování bezpečnostních pravidel
5. **Access Control** — řízení přístupu ke zdrojům

## Data diodes

**Jednosměrné připojení** (unidirectional gateway) — hardware zajišťující tok dat pouze jedním směrem. Použití pro ochranu důvěrnosti v kritických infrastrukturách — data mohou odcházet, ale nelze se dostat dovnitř (nebo naopak).

## BERserk vulnerability

Zranitelnost v implementaci **RSA verifikace** v knihovně Mozilla NSS (použité v Mozilla Firefox). Umožňovala útočníkovi obejít ověření RSA podpisu — opraveno v aktualizaci prohlížeče.

## Důvěryhodné webové stránky — 9 tipů

Praktická doporučení pro ověření důvěryhodnosti webu:

1. Kontrola **HTTPS** a platnosti certifikátu
2. **WHOIS** lookup — ověření vlastníka domény
3. **VirusTotal** — skenování URL na malware
4. Antiphishing certifikát a další bezpečnostní indikátory
5. Kontrola kontaktních údajů, obchodních podmínek, grafické kvality a dalších signálů důvěryhodnosti

## SSL certifikáty

Zabezpečení komunikace pomocí SSL/TLS certifikátů — šifrování přenosu mezi klientem a serverem.
