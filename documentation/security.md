# Turvallisuus ja tietoturva 

- Actions automaattinen tietoturvan tarkastus 
- TOKENit
- Jokaisessa tietokanta-transaktiossa on TOKEN, ettei kukaan ulkopuolien yritä yhdistää.
- Käyttäjätunnusten, salasanojen ja viestien kryptaus ja validointi
- Kaksivaiheinen tunnistautuminen
    -    Oauth-tunnistautuminen
    -    Käytetään SHA256-salausta TOKENien generoimiseen
    -    Kaikki avaimet ENV-filussa
    -    Gitignore 
    -    Testit kaikille tietokantatoiminnallisuuksille
    -    Github actions ajaa nämä testit automaattisesti. 
    -    Koodikatselmoinneissa katsotaan aktiivisesti tietoturvapuolta, ainakin kaksi kehittäjää katsoo, että koodi on tietoturvattua ennen stating-palvelimelle siirtoa. 
