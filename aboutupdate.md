# Openstaande punten verhalenmodule Zeeuwse Klimaatlabels

Bijgewerkt: 8 september 2026

Naar aanleiding van de feedback in `26-08-2026 verhalen module Zeeuwse Klimaatlabels.docx`
(met `Tabel_labelindelingen.xlsx` en `Tabel_gebruikte bronnen labelanalyses.xlsx`).
De verwerkte punten staan in de commits `0bbcd72`, `16d7ffd` en `cf52f79`.
Hieronder wat nog open staat.

## Wacht op de opdrachtgever

**Link naar het dataportaal bij Methodiek**
De feedback zegt: "Methodiek moet ik nog afstemmen hoe dit in zijn werk zal gaan.
Link naar het dataportaal van de provincie lijkt mij logisch. Stem ik nog af."
Zodra de URL bekend is, kan die in de stap *Methodiek & gegevens*.

**Layout "Gebruik van klimaatlabels"**
Gevraagd: "Layout bij Gebruik van klimaatlabels in duidelijke paragrafen met een
duidelijke kop." Die stap heeft al vier `<h4>`-koppen met alinea's eronder.
Onduidelijk wat er extra moet — navragen wat er precies mist.

**Kleur voor het themablok "Archief"**
De excel introduceert een thema *Archief* voor indicatoren die vervangen zijn
(gevoelstemperatuur PET). Dat thema bestond nog niet, dus er is geen originele
kleur. Nu neutraal grijs `#E7E6E6`. Even laten bevestigen.

**Kolom C "Definities" uit de excel**
De excel heeft een kolom *Definities* die niet als tabelkolom is overgenomen;
die tekst staat al in de tweekolomsblokken per thema. Als hij tóch in de tabel
moet, is dat nog werk.

## Bij de deploy

**De GIS-zip hoort niet bij de broncode en moet apart meegeleverd worden**
`Klimaatlabels_Zeeland_GIS.zip` (828 MB) staat in `.gitignore` en zit dus niet in
de repo; een `git clone` levert het bestand niet mee. De story linkt er wel naar,
dus zonder dat bestand geeft die download een 404.

Waar de viewer ook draait - docker, een gewone webserver, een statische host -
het bestand moet in de webroot staan als
`images/klimaatlabels/Klimaatlabels_Zeeland_GIS.zip`, dus in deze repo op de plek
`static/images/klimaatlabels/Klimaatlabels_Zeeland_GIS.zip`. Bij een docker-deploy
moet het daar staan *voordat* de image gebouwd wordt: de build kopieert `static/`
naar binnen, hij haalt niets op tijdens het draaien.

Op bertha staat het bestand er sinds 21 juli 2026 handmatig neergezet, en het gaat
daar dus gewoon mee de image in. Voor productie moet dat apart geregeld worden,
samen met wie het aanlevert en waar het vandaan komt.

De downloads bij *Data* en *Methodiek* wijzen sinds september 2026 naar bestanden
in deze repo in plaats van naar klimaatatlaszeeland.ireporting.nl - die vroegen om
een login. Het gaat om deze drie:

| link in de story | bestand | in de repo |
| --- | --- | --- |
| `./images/klimaatlabels/Klimaatlabels_Zeeland_GIS.zip` | `static/images/klimaatlabels/Klimaatlabels_Zeeland_GIS.zip` (828 MB) | nee, `.gitignore` |
| `./images/klimaatlabels/Aanpak_voor_de_kwetsbaarheidsanalyse_Zeeland.pdf` | `static/images/klimaatlabels/Aanpak_voor_de_kwetsbaarheidsanalyse_Zeeland.pdf` (373 KB) | ja |
| `./images/klimaatlabels/Stroomdiagrammen_GIS_analyses_Zeeuwse_Klimaatatlas_juli2026.pdf` | `static/images/klimaatlabels/Stroomdiagrammen_GIS_analyses_Zeeuwse_Klimaatatlas_juli2026.pdf` (696 KB) | ja |

De links zijn relatief aan de webroot van de viewer; `static/` is die webroot, dus
`static/images/...` op schijf wordt `./images/...` in de story.

## Ontbrekend materiaal

Geen. De maatlat-afbeelding en de flowchart met RoyalHaskoningDHV-logo zijn
uit de aangeleverde bestanden gehaald en staan in `static/images/klimaatlabels/`.

## Bewust zo gelaten

**Bronvermelding bij "Water tegen panden"**
Nagevraagd: de richtlijnen en bronnen zijn voor water tegen panden dezelfde als
voor water op straat (Landelijke maatlat; Bestuursakkoord Water; Richtlijn
overstromingsrisico's LIWO). In de excel stond dit fout. De tabel bij
*Wateroverlast* volgt nu voor beide indicatoren dezelfde bronvermelding.

**Verzilting is overal verwijderd**
Conform "Verzilting voor nu verwijderen". Komt het thema terug, dan was de
originele achtergrondkleur `#ECE7FF` — terug te vinden in commit `0bbcd72^`.

**Detailregels 70mm/140mm bij Wateroverlast**
De excel kent alleen "bij bui T=100 in 2050", maar de twee bui-regels zijn op
verzoek teruggezet in de labeltabel, met de labelwaarden als `rowspan`.

**Overzichtstabel zonder kolom "Richtlijnen en bronnen"**
Die kolom is toegevoegd geweest maar weer verwijderd: met negen kolommen werd
de tekst te smal en de rijen te hoog. De richtlijnen staan volledig in de vier
themabellen, waar de kolom 40% breed is.

## Aandachtspunten in de brondata

**`3-4` in plaats van `3.-4`**
In `Tabel_labelindelingen.xlsx` staat bij *Gemiddeld aantal zichtbare bomen per
gebouw* label B als `3.-4`, met een punt. In de story is dat gecorrigeerd naar
`3-4`. Graag ook in de excel herstellen, anders komt het terug bij een volgende
actualisatie.

**Scenario's nog niet overal geactualiseerd**
De intro vermeldt nu KNMI'23 Hd en Hn, met de disclaimer dat een deel van de
data nog op KNMI'14 WH2050 is gebaseerd. In de tabellen en indicatornamen staat
op veel plekken nog WH2050. Dat volgt de excel, maar wordt inconsistent zodra
de data geactualiseerd is.
