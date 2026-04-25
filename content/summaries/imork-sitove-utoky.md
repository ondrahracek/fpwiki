---
title: Síťové útoky — komplexní přehled
course: imork
type: summary
tags: [imork, sitove-utoky, ddos, spoofing, sniffing, mitm, emotet, ryuk]
sources: [raw/imork/CV 03 VUT_Síťové útoky-2023.pdf]
created: 2026-04-12
updated: '2026-04-25'
---

# Síťové útoky — komplexní přehled

Cvičení zaměřené na klasifikaci, techniky a obranu proti síťovým útokům napříč vrstvami modelu ISO/OSI.

## Klasifikace útoků

| Typ | Popis |
|-----|-------|
| **Pasivní** | Odposlech, monitoring provozu — útočník nemodifikuje data |
| **Aktivní** | Modifikace, injekce, přerušení komunikace |

## Hlavní kategorie síťových útoků

- **Bombing** — zahlcení cíle zprávami (e-mail bombing, SMS bombing)
- **DoS / DDoS** — odepření služby, distribuovaný útok z mnoha zdrojů
- **MitM (Man-in-the-Middle)** — vložení útočníka do komunikace mezi dvě strany
- **Sniffing** — pasivní zachytávání síťových paketů
- **Spoofing** — podvržení identity (IP, MAC, DNS, e-mail)

![[imork-iso-osi-utoky.jpeg|Útoky podle vrstev ISO/OSI modelu — L1 až L7]]

## Útoky podle vrstev ISO/OSI

| Vrstva | Příklady útoků |
|--------|----------------|
| **L1 — Fyzická** | Odpojení kabelu, rušení signálu, odposlech optického vlákna |
| **L2 — Linková** | MAC flooding, ARP spoofing, VLAN hopping |
| **L3 — Síťová** | IP spoofing, ICMP flood, Smurf attack, route poisoning |
| **L4 — Transportní** | SYN flood, UDP flood, TCP session hijacking |
| **L5 — Relační** | Session hijacking, SSL stripping |
| **L6 — Prezentační** | SSL/TLS exploity, šifrování malwarem |
| **L7 — Aplikační** | HTTP flood, SQL injection, XSS, DNS amplification |

## Spoofing — podrobně

- **IP spoofing** — podvržení zdrojové IP adresy
  - Využití pro **DDoS amplifikaci** — útočník pošle požadavek s podvrženou IP oběti na NTP/DNS server → odpověď (mnohonásobně větší) směřuje na oběť
  - **NTP amplifikace** — poměr požadavek:odpověď až 1:556
  - **DNS amplifikace** — poměr požadavek:odpověď až 1:70
- **Obrana** — filtrování na hranici sítě (BCP38/BCP84), uRPF (unicast Reverse Path Forwarding)

## Sniffing — podrobně

- **Packet capture** — zachytávání provozu na síťovém segmentu (Wireshark, tcpdump)
- Efektivní zejména v nešifrovaných sítích a na sdílených segmentech
- **Obrana:**
  - Šifrování — SSL/TLS pro webový provoz
  - **VPN** — šifrovaný tunel pro veškerý provoz
  - **SSH** — šifrovaný vzdálený přístup
  - Segmentace sítě (switche místo hubů)

## Sociální inženýrství a malware

- **Sociální inženýrství** — manipulace uživatelů k provedení nebezpečných akcí
- **Viry** — sebereplikující kód vyžadující hostitele
- **Červi (worms)** — samostatně se šířící malware
- **Rootkity** — skrytí přítomnosti útočníka v systému

## Kombinovaný útočný řetězec: Emotet → Trickbot → Ryuk

Reálný případ — **nemocnice Benešov (2019)**:

1. **Emotet** — počáteční infekce přes phishingový e-mail s makrem
2. **Trickbot** — banking trojan stažený Emotetem, provádí průzkum sítě a krade přihlašovací údaje
3. **Ryuk** — [[imork-ransomware|ransomware]] nasazený po kompromitaci sítě, šifruje data a žádá výkupné

Tento řetězec demonstruje, jak se moderní útoky skládají z více fází a nástrojů — viz také [[imork-rizeny-hacking|APT model útoku]].

## Obrana — NGFW (Next-Generation Firewall)

- Hloubková inspekce paketů (DPI)
- Aplikační filtrování (L7)
- IPS/IDS integrace
- Sandboxing podezřelých souborů
- Propojení s [[isms|ISMS]] a [[rizeni-rizik|řízením rizik]]

## Vazby na další témata

- [[imork-anatomie-utoku|Anatomie kybernetického útoku]] — obecný model útočného řetězce
- [[imork-rizeny-hacking|Řízený hacking / APT]] — APT skupiny využívající tyto techniky
- [[imork-tor|TOR síť]] — anonymizace útočníků
- [[imork-ransomware|Ransomware]] — Ryuk jako koncová fáze řetězce
- [[bcm|BCM]] — obnova po úspěšném útoku (případ Benešov)
- [[ochrana-dat|Ochrana dat]] — prevence úniku dat
