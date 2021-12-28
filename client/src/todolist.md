## TOIMINNOT
 ### MUST
- Käyttöohjeet ja tietosuojaseloste
- Kalenterin valinta Haku ja palautus eri valinnat. (airbnb)
- Company-detail formin inputtien validate
- Ei voi luoda uutta productia, joka nimi jo olemassa
- Varaus email järkevämmäksi. 
- Varaukselle, IsVerified. Eli myyjän pitää vahvistaa tilaus.

-COMPANY-EDIT
   - Näkee varaukset ja voi asettaa varattuja päiviä
   - Voi muokata myös varauksen alku- ja päätösaikaa. Esim. Alku 14:00 Palautus 16:00
   - Voi vahvistaa tilauksen
   - Yrityksen tietojen muokkaaminen erillisen napin taakse.
   - Kuvien uploadaaminen

### NICE TO HAVE
- Automaattisesti hakee tien perusteella numeron ja toimipaikan. 
- Tee Default photo ja eti samalla myös muille default parametreille koko Angularista hyvä keskitetty paikka. 
- Muuta API endpointtien nimet tyylillä get-users. Nyt PascalCase
- Unohdin salasanani painike ja email
- API Endpointteihin Authorizet toimimaan
- Kalenteri oma komponentti
- Kalenterin reserved tyyli paljon selkeämpi
- Captcha kun tekee varauksen?

- Pitää vielä serveriltä katsoa kun tallentaa varausta, että onko varmasti vielä vapaana
- Lisää NSwag


## BUGIT 
- ReservationController Create palauttamaan ReservationDTO
- Kun kirjautuu väärällä salasanalla ei ilmoita herjalla