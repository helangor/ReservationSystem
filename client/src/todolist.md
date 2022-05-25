## TOIMINNOT
 ### MUST
- Lisää tuotteille hinnat
    - EDIT komponentissa voi määrittää
    - Backendin puolella tapahtuu käsittely, ettei voi muut muokata.
    - Tai vähintää checkki backendiin

    - Hinta luokittelu tallennettu tuotteen alle. List<PriceTable>

    - Eka versio. //Tee tähän vaan, että voi hakea ja luoda uusi näitä Productin alle. 
        - Perus päivähinta
        - Perus viikkohinta
        - Perus vkpl päivän hinta
        - Koko viikonloppu

    PriceTable 
        - Erikoispäivä hinnat tulee myöhemmin.
        - Valitse yksi päivä tai range.
        - Valitse kerran tai toistuva. Jos kerran niin ilmoita pvm.
        - Toistuvaan voi valita 

        - Perusvalinnat 
            - Päivähinta
            - Viikonloppupäivät
            - Viikkohinnat
        - Ensin erikoispäivät ja erikoispäivä ranget
        - Sitten päivä ranget 
        - Lopuksi yksittäiset päivät. Ensin erikoiset esim. vklp sitten normi pvä hinta.

### NICE TO HAVE
- Loading screen alkuun kun paljut ei ole vielä laataantuneet
    - Myös lazy loading tähän
- Tee Default photo ja eti samalla myös muille default parametreille koko Angularista hyvä keskitetty paikka. 

- Unohdin salasanani painike ja email

- Edit component
    - Antamaan error, jos kuva ei sopiva tai muuta ongelmia kuvan upload
    - Luo peruuta varaus confirm dialog.
    - Jos useita tuotteita niin tuotteen editissä nuolet, joilla pääsee valitsemaan. Tai linkit

- Tuotteen tilaus/Varaus
    - Valittavat lisävalinnat
        - Vienti vai nouto.
            - Jos vienti niin pitää täyttää osoitetiedot
    - Varaukselle varausnumero. Id?
    - Automaattisesti hakee tien perusteella numeron ja toimipaikan. 
    - Captcha kun tekee varauksen?
    - Pitää vielä serveriltä katsoa kun tallentaa varausta, että onko varmasti vielä vapaana
    - Ilmoita, jos varaus ei mene läpi. Äläkä lähetä viestejä.

-Kalenteri
    - Kalenterin reserved tyyli paljon selkeämpi. Nyt ei meinaa nähdä mitkä varattuja
    - Kalenteri omana komponenttinaan
    - Muokkauksessa näkee varaukset myös kalenterissa, eikä pelkästään listana

- Tuotteet
    - Muuta, että hakee tuotteen id avulla. Nimi vaan tulee routeen
    - Tuotteet flag onko nähtävissä vai ei.
    - Voi luoda uusia producteja muokkauksesta
        - Ei voi luoda uutta productia, joka nimi jo olemassa
    - Voi asettaa varattuja päiviä, jolloin palju ei ole vuokrattavissa

- Muuta
    - Lisää NSwag
    - Routet suomeksi
    - Luo email template, jossa Paljumiehen tiedot
    - Authorize tuotekohtaisesti. Ei riitä pelkkä kirjautuminen 

## Kyssäreitä
- Miten pitää toimia. Tekee varauksen niin myyjä haluattaessa vahvistaa sen? Tai automaattivahvistus. Entä näkyykö uudet varaukset kalenterissa varattuja ennen myyjän vahvistusta?


### Mappi Ö
- Kun vaihdetaan kuva niin tekee cascaden muille productin kuville. Jäävät siis DB, mutta id null. Olisi kivempi jos saisi kokonaan pois.
- Vaihda käyttöohjeet ja vuokrausehdot, että lukee markdown filestä. Sitten helppo muuttaa niitä tarvittaessa. Nämä myös tulemaan modalina, eikä pelkästään omana sivuna.