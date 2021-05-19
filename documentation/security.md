# Turvallisuus ja tietoturva 

Turvallisuus ja tietoturva ovat tämän projektin kannalta hyvin tärkeässä roolissa. Tässä dokumentissa on listattuna eri käsin ja automaation hallinnoitavia tehtäviä, joilla pyritään varmistamaan ohjelman käyttäjän turvallisuus ja tietoturva. 

## Manuaalinen 

Ohjelmakoodia luodaan ja tarkastetaan joukkoälyllä. Ennen tuotantoon viemistä tiimin jäsenen tekemät muutokset tarkistaa toinen tiimin jäsen. Jatkuvan käsin tehtävän analysoinnin jälkeen, ohjelmakoodille ajetaan automaattisia tietoturvatestejä, jotta ennen tuotantoon viemistä ohjelmakoodi on tietoturvallista. 

Tarkastuslistaa:

-   TOKEN
    - Jokaisessa tietokanta-transaktiossa on TOKEN, ettei kukaan ulkopuolien yritä yhdistää.
    - SHA256-salaus TOKEN:in generointiin
-   Käyttäjätunnusten, salasanojen ja viestien salaus ja validointi
-   Kaksivaiheinen tunnistus
    - Oauth-tunnistautuminen
-   Kaikki salaus-avaimet ENV-filussa
-   Erityistarkat testit kaikille tietokantatoiminnallisuuksille

## Automaatio
   
Github Actions ajaa kaikki tietoturvatestit automaattisesti. Automaatio ilmoittaa ennen tuotantoon viemistä onko kaikki testit menneet läpi. Mikäli jokin testi epäonnistuu, automaatio ilmoittaa tästä. Kun kaikki on korjattu, testit ajetaan uudestaan, ja kun ne menevät läpi, ohjelma on tietoturvattu ja valmis _mergettäväksi_ tuotantoon.

## Ylläpito 


