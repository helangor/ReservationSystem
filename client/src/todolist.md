## TOIMINNOT
 ### MUST
 - ULKONÄÖN luominen

- Lisää tuotteille hinnat
    - EDIT komponentissa voi määrittää
    - Backendin puolella tapahtuu

- Vaihda default kuva koirasta johonkin muuhun.

### NICE TO HAVE
- Luo peruuta varaus confirm dialog.
- Tee Default photo ja eti samalla myös muille default parametreille koko Angularista hyvä keskitetty paikka. 
- Antamaan error, jos kuva ei sopiva tai muuta ongelmia kuvan upload
- Unohdin salasanani painike ja email
- API Endpointteihin Authorizet toimimaan
- Kun vaihdetaan kuva niin tekee cascaden muille productin kuville. Jäävät siis DB, mutta id null. Olisi kivempi jos saisi kokonaan pois.

- Tuotteen tilaus/Varaus
    - Valittavat lisävalinnat
        - Vienti vai nouto.
            - Jos vienti niin pitää täyttää osoitetiedot
    - Varaukselle varausnumero. Id?
    - Automaattisesti hakee tien perusteella numeron ja toimipaikan. 
    - Captcha kun tekee varauksen?
    - Pitää vielä serveriltä katsoa kun tallentaa varausta, että onko varmasti vielä vapaana

-Kalenteri
    - Kalenterin reserved tyyli paljon selkeämpi. Nyt ei meinaa nähdä mitkä varattuja
    - Kalenteri omana komponenttinaan
    - Muokkauksessa näkee varaukset myös kalenterissa, eikä pelkästään listana

- Tuotteet
    - Tuotteet flag onko nähtävissä vai ei.
    - Voi luoda uusia producteja muokkauksesta
        - Ei voi luoda uutta productia, joka nimi jo olemassa
    - Voi asettaa varattuja päiviä, jolloin palju ei ole vuokrattavissa

- Muuta
    - Lisää NSwag
    - Routet suomeksi
    - Luo email template, jossa Paljumiehen tiedot
    - Vaihda käyttöohjeet ja vuokrausehdot, että lukee markdown filestä. Sitten helppo muuttaa niitä tarvittaessa. Nämä myös tulemaan modalina, eikä pelkästään omana sivuna.

## BUGIT 
- ReservationController Create palauttamaan ReservationDTO

## Kyssäreitä
- Miten pitää toimia. Tekee varauksen niin myyjä haluattaessa vahvistaa sen? Tai automaattivahvistus. Entä näkyykö uudet varaukset kalenterissa varattuja ennen myyjän vahvistusta?