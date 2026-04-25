---
title: Anatomie kybernetického útoku
course: imork
type: summary
tags: [imork, kyberneticka-bezpecnost, apt, exploit, phishing, socialni-inzenyrstvi, malware, supply-chain]
sources: [raw/imork/CV 02 VUT_Anatomie útoku-2022.pdf]
created: 2026-04-12
updated: '2026-04-25'
---

# Anatomie kybernetického útoku

## Útočný povrch (Attack Surface)

- **Digitální** — síťová rozhraní, aplikace, služby, API
- **Fyzický** — USB porty, přístupové body, zařízení

## Klíčové pojmy

| Pojem | Definice |
|-------|----------|
| **Threat Agent** | Aktér provádějící útok (hacker, insider, APT skupina) |
| **Attack Vector** | Cesta/metoda průniku do systému |
| **Vulnerability** | Zranitelnost — slabina v systému |
| **Exploit** | Kód/technika zneužívající zranitelnost |
| **Payload** | Škodlivý obsah doručený exploitem |
| **Shellcode** | Kód spuštěný po úspěšném exploitu |

## Základní vektory útoku

1. **Email s přílohou** — nejčastější vektor, sociální inženýrství
2. **Trojanizované aplikace** — legitimní software s malwarem
3. **Drive-by download** — stažení malwaru při návštěvě webu
4. **Vyměnitelná média** — USB (BadUSB) — fyzický vektor
5. **Watering hole** — kompromitace často navštěvovaného webu cílové skupiny

## Plošný vs. cílený útok

- **Plošný útok** — masový, automatizovaný, netargeted (spam, phishing kampaně)
- **Cílený útok** — zaměřený na konkrétní organizaci/osobu, sofistikovaný

## APT (Advanced Persistent Threat)

Pokročilá přetrvávající hrozba — dlouhodobý, cílený útok financovaný státem nebo organizovaným zločinem.

### 4 fáze APT

1. **Příprava** (Preparation/Reconnaissance)
   - Průzkum cíle (OSINT, sociální sítě, technický recon)
   - Výběr vektoru útoku

2. **Infiltrace** (Infiltration)
   - [[imork-ai-utoky|Spear phishing]] — cílený phishing
   - Malvertising — škodlivá reklama
   - Počáteční kompromitace systému

3. **Kompromitace** (Compromise)
   - Laterální pohyb (lateral movement) — šíření v síti
   - Eskalace oprávnění
   - Instalace backdoorů

4. **Dokončení** (Completion)
   - Exfiltrace dat
   - Dlouhodobý přístup
   - Případná destrukce/sabotáž

## Softwarové útoky

- **Adware** — nevyžádaná reklama
- **Spyware** — sledování aktivity uživatele
- **Viry** — sebereplikující škodlivý kód
- **Trojany** — malware maskovaný jako legitimní software

## Sociální inženýrství

Nejoblíbenější metoda útoku — manipulace s lidskou důvěrou a emocemi (strach, zvědavost, autorita, časový tlak). Obchází technická opatření tím, že cílí na nejslabší článek — člověka.

## Phishing vs. Spear Phishing

| Typ | Popis |
|-----|-------|
| **Phishing** | Masový útok — **83 % útočníků** předstírá příslušnost ke známé značce |
| **Spear Phishing** | Cílený útok na konkrétní osoby/organizace — personalizované zprávy |

### Struktura phisherské organizace

Organizovaná skupina s dělbou rolí — tvůrci stránek, spameři, muly pro praní peněz, koordinátoři.

## Typy malwaru — rozšířeno

Doplnění k základním softwarovým útokům:

- **Cryptojacking** — neoprávněné využití výpočetního výkonu oběti pro těžbu kryptoměn
- **Trojský kůň** — maskuje se jako legitimní software, otevírá zadní vrátka
- **Červi (worms)** — samostatné šíření po síti bez interakce uživatele (na rozdíl od virů)

## Watering hole / Supply chain útoky

Pokročilé útoky na dodavatelský řetězec a průmyslové řídicí systémy ([[imork-mcn|ICS]]):

- **Watering hole** — kompromitace webu často navštěvovaného cílovou skupinou
- **Supply chain** — infiltrace přes důvěryhodného dodavatele softwaru/hardwaru
- **Steganografie v obrázcích** — ukrytí škodlivého kódu v obrazových souborech
- **Zneužití výjimek jako dešifrovacích klíčů** — využití exception handlerů pro aktivaci payloadu

## Útoky podle ISO/OSI vrstev

| Vrstva | Protokoly | Techniky útoku | Mitigace |
|--------|-----------|---------------|----------|
| **L1 (fyzická)** | Ethernet, Wi-Fi | Odposlech, rušení | Fyzická bezpečnost, stínění |
| **L2 (linková)** | ARP, MAC | ARP spoofing, MAC flooding | Port security, DHCP snooping |
| **L3 (síťová)** | IP, ICMP | IP spoofing, ICMP flood | Filtrování, ACL |
| **L4 (transportní)** | TCP, UDP | SYN flood, UDP flood | SYN cookies, rate limiting |
| **L5 (relační)** | NetBIOS, RPC | Session hijacking | Šifrování sessions |
| **L6 (prezentační)** | SSL/TLS | SSL stripping, POODLE | Aktualizace, HSTS |
| **L7 (aplikační)** | HTTP, DNS, SMTP | [[imork-www|XSS]], [[imork-www|SQL Injection]], DNS poisoning | WAF, validace vstupu |

## Amplifikační útoky

DDoS útoky využívající asymetrii mezi malým požadavkem a velkou odpovědí:

| Typ | Amplifikační faktor | Princip |
|-----|---------------------|---------|
| **DNS amplification** | 1:70 | Malý DNS dotaz → velká odpověď (ANY record) |
| **NTP amplification** | 1:556 | Příkaz `monlist` → obrovská odpověď |

### Obrana

- **BCP38** (RFC 2827) — filtrování zdrojových IP adres na hranici sítě (ingress filtering), zamezení IP spoofingu

## MITRE ATT&CK

Znalostní báze taktik a technik kybernetických útoků — referenční framework pro popis chování útočníků.
