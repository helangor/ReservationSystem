## TOIMINNOT
 ### MUST
- Käyttöohjeet ja tietosuojaseloste
- Kalenterin valinta Haku ja palautus eri valinnat. (airbnb)
- Company-detail formin inputtien validate
- Ei voi luoda uutta productia, joka nimi jo olemassa
- Routet suomeksi

- Varauksen luominen
   - Varaus email järkevämmäksi. Palautus ja hakuajat tähän mukaan.
   - Lähettää s-postin myös varaajalle.

-COMPANY-EDIT
   - Näkee varaukset ja voi asettaa varattuja päiviä
   - Voi muokata myös varauksen alku- ja päätösaikaa. Esim. Alku 14:00 Palautus 16:00
   - Voi vahvistaa tilauksen
   - Yrityksen tietojen muokkaaminen erillisen napin taakse.
   - Kuvien uploadaaminen
   - Voi peruuttaa varauksen, jolloin lähtee peruutus s-posti lähettäjälle.

### NICE TO HAVE
- Automaattisesti hakee tien perusteella numeron ja toimipaikan. 
- Tee Default photo ja eti samalla myös muille default parametreille koko Angularista hyvä keskitetty paikka. 
- Muuta API endpointtien nimet tyylillä get-users. Nyt PascalCase
- Unohdin salasanani painike ja email
- API Endpointteihin Authorizet toimimaan
- Kalenteri oma komponentti
- Kalenterin reserved tyyli paljon selkeämpi
- Captcha kun tekee varauksen?
- Luo email template, jossa Paljumiehen tiedot
- Vaihda käyttöohjeet ja vuokrausehdot, että lukee markdown filestä. Sitten helppo muuttaa niitä tarvittaessa. Nämä myös tulemaan modalina, eikä pelkästään omana sivuna.
- Pitää vielä serveriltä katsoa kun tallentaa varausta, että onko varmasti vielä vapaana
- Lisää NSwag


## BUGIT 
- ReservationController Create palauttamaan ReservationDTO
- Kun kirjautuu väärällä salasanalla ei ilmoita herjalla