## TOIMINNOT
 ### MUST
 - ULKONÄÖN luominen

- Lisää tuotteille hinnat
    - EDIT komponentissa voi määrittää
    - Backendin puolella tapahtuu

-COMPANY-EDIT
   - Voi asettaa varattuja päiviä
   - Kuvien uploadaaminen

### NICE TO HAVE
- Luo peruuta varaus confirm dialog.
- Tee Default photo ja eti samalla myös muille default parametreille koko Angularista hyvä keskitetty paikka. 
- Unohdin salasanani painike ja email
- API Endpointteihin Authorizet toimimaan

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

- Muuta
    - Lisää NSwag
    - Routet suomeksi
    - Luo email template, jossa Paljumiehen tiedot
    - Vaihda käyttöohjeet ja vuokrausehdot, että lukee markdown filestä. Sitten helppo muuttaa niitä tarvittaessa. Nämä myös tulemaan modalina, eikä pelkästään omana sivuna.

## BUGIT 
- ReservationController Create palauttamaan ReservationDTO

## Kyssäreitä
- Miten pitää toimia. Tekee varauksen niin myyjä haluattaessa vahvistaa sen? Tai automaattivahvistus. Entä näkyykö uudet varaukset kalenterissa varattuja ennen myyjän vahvistusta?