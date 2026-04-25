---
title: 'Případovka: Audio Hack'
course: imork
type: summary
tags: [imork, zranitelnost, fyzicky-utok, hdd, cve, dos]
sources: [raw/imork/2207 VUT_Bezp_Případovka Audio Hack-2022.pdf]
created: 2026-04-12
updated: '2026-04-25'
---

# Případovka: Audio Hack

Případová studie z 16. listopadu 2022. Demonstrace fyzické zranitelnosti hardwaru prostřednictvím zvukového signálu.

## Incident

- 4. album zpěvačky **Janet Jackson** — *Rhythm Nation 1814* (1989)
- Skladba **Rhythm Nation** způsobovala u některých notebooků **pád systému**
- Příčina: zvuk rezonuje s **mechanickými pevnými disky s 5400 ot/min**
- Známý efekt — křik v datovém centru měřitelně zvyšuje latenci disků

## CVE-2022-38392

- Produkt: **Seagate STDT40000100**
- Popis: HDD s 5400 ot/min (~2005) umožňují fyzicky blízkým útočníkům způsobit **DoS** (selhání zařízení) prostřednictvím **rezonančního frekvenčního útoku**

## Řešení

1. Filtr ve zvukovém kanálu — detekce a odstranění rušivých frekvencí
2. Přechod na technologii **SSD** (bez pohyblivých částí)

## Význam pro bezpečnost

- Demonstruje, že [[kyberneticka-bezpecnost|kybernetická bezpečnost]] zahrnuje i **fyzické vektory útoku**
- Rezonanční frekvence jako nekonvenční DoS vektor
- CVE databáze eviduje i fyzické zranitelnosti HW

## Propojení s dalšími tématy

- [[imork-anatomie-utoku|Anatomie útoku]] — fyzická útočná plocha
- [[ochrana-dat|Ochrana dat]] — fyzická ochrana médií
- [[imork-mcn|MCN]] — spolehlivost a dostupnost infrastruktury

## Zdroj v kurzu [[imork|ImorK]]

- Případovka 2207 — Audio Hack (2022)
