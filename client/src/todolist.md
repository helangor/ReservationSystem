## TOIMINNOT
 ### MUST
- Lisää tuotteille hinnat
    - EDIT komponentissa voi määrittää
    - Backendin puolella tapahtuu
- ULKONÄÖN luominen
- Paljufirmalle s-posti ja puh.nro kentät
- Lähettää s-postin myös paljufirmalle, kun varaus tehdään.
- Hakemaan kalenterin varatut päivät, siten, ettei siinä mukana varauksia jotka cancelled,  rejected etc..

-COMPANY-EDIT
   - Näkee varaukset ja voi asettaa varattuja päiviä
   - Kuvien uploadaaminen

### NICE TO HAVE
- Luo peruuta varaus confirm dialog.
- Varaukselle varausnumero. Id?
- Automaattisesti hakee tien perusteella numeron ja toimipaikan. 
- Tee Default photo ja eti samalla myös muille default parametreille koko Angularista hyvä keskitetty paikka. 
- Muuta API endpointtien nimet tyylillä get-users. Nyt PascalCase
- Unohdin salasanani painike ja email
- API Endpointteihin Authorizet toimimaan
- Kalenterin reserved tyyli paljon selkeämpi
- Captcha kun tekee varauksen?
- Luo email template, jossa Paljumiehen tiedot
- Vaihda käyttöohjeet ja vuokrausehdot, että lukee markdown filestä. Sitten helppo muuttaa niitä tarvittaessa. Nämä myös tulemaan modalina, eikä pelkästään omana sivuna.
- Pitää vielä serveriltä katsoa kun tallentaa varausta, että onko varmasti vielä vapaana
- Lisää NSwag
- Routet suomeksi
- Yritys voi luoda lisää tuotteita
- Tuotteet flag onko nähtävissä vai ei.

- Voi luoda uusia producteja muokkauksesta
    - Ei voi luoda uutta productia, joka nimi jo olemassa


## BUGIT 
- ReservationController Create palauttamaan ReservationDTO
- Kun kirjautuu väärällä salasanalla ei ilmoita herjalla