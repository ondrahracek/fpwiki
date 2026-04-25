---
title: "Predikce"
courses: [ipmrk]
type: topic
tags: [predikce, casove-rady, financni-trhy, prognozovani]
sources: [raw/ipmrk/nn-aplikace.md, raw/ipmrk/ga-vyuziti.md, raw/ipmrk/chaos.md]
created: 2026-04-10
updated: 2026-04-10
---

# Predikce a prognózování

Předpovídání budoucích hodnot na základě historických dat. Jedna z nejdůležitějších aplikačních oblastí v kurzu [[ipmrk|IpmrK]].

## Co se predikuje

- Akciové indexy
- Měnové kurzy (CZK/USD, USD/EUR)
- Kryptoměny
- Ceny komodit (zlato, ropa, obilí)
- Poptávka, prodeje, výrobní objem

## Metody predikce v kontextu kurzu

| Metoda | Role v predikci |
|---|---|
| [[umele-neuronove-site\|Neuronové sítě]] | Přímo se učí vzory z dat a predikují budoucí hodnoty |
| [[geneticke-algoritmy\|Genetické algoritmy]] | Optimalizují parametry predikčního modelu nebo obchodní strategie |
| [[fuzzy-logika\|Fuzzy logika]] | Modeluje expertní pravidla pro rozhodování o predikcích |
| [[anfis\|ANFIS]] | Hybridně kombinuje fuzzy pravidla s učením z dat |

## Omezení

- [[teorie-chaosu|Teorie chaosu]] ukazuje, že mnoho systémů je extrémně citlivých na počáteční podmínky → **dlouhodobá přesná předpověď bývá prakticky nemožná**
- Model nedává jistotu, ale informovaný odhad
- Budoucnost je nejistá — model může pracovat s více scénáři

## Hurstův exponent

Rozlišuje charakter časové řady: náhodná (H = 0,5), trendová (H > 0,5), antipersistentní (H < 0,5). Viz [[teorie-chaosu|teorie chaosu]].

## Zdroje v kurzu [[ipmrk|IpmrK]]

- [[ipmrk-nn-aplikace|Neuronové sítě — aplikace]]
- [[ipmrk-ga-vyuziti|Genetické algoritmy — využití]]
- [[ipmrk-chaos|Teorie chaosu]]
