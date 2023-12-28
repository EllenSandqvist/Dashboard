# Dashboard

## Beskrivning
En dashboard som kan användas som startsida i webbläsaren. Dashboardens innehåll:

- Datum och tid
- Dashboardens namn (kan ändras av användaren)
- Snabblänkar som användaren själv lägger in
- Väderprognos för tre dagar
- Ett slumpat citat
- En anteckningsyta där användaren fritt kan skriva
- Bakgrundsbild med knapp för att slumpa fram en ny bild samt info om fotografen

## Användning
För att hämtningen av väderprognoser och bakgrundsbilder till Dashboarden ska fungera behöver en config.js fil med API-nycklarna sättas upp lokalt efter att repot har klonats. 

### Så här kan du gå tillväga:
1) Klona repot och öppna i din kodeditor.
2) I js-mappen - skapa en ny fil vid namn config.js
3) I config.js - skapa följande variabler och lägg in de riktiga värdena för dina API nycklar:
    - const apiKey = "din_OpenWeatherMap_API-key"; 
    - const accessKey = "din_Unsplash_API-key";
4) Exportera dina API-nycklar genom att skriva följande kod nedanför variablerna i config.js:
    - export {apiKey};
    - export {accessKey};
5) Lägg till scriptet för config.js i index.html och lägg in attributet type="module" (behövs för att export/import mellan olika filer ska fungera)

Om du inte sedan tidigare har API-nycklar till OpenWeather och Unsplash så besök [OpenWeatherMap](https://openweathermap.org/) och [Unsplash](https://unsplash.com/developers) där finns info om hur du går tillväga för att skaffa dessa. 

## Kodreflektioner
Jag är överlag nöjd med min kod och tycker att den uppfyller de krav som ställdes i uppgiften på ett bra sätt. Vissa delar av koden kan säkerligen förbättras och effektiviseras. Här nedan resonerar jag kring särskilda delar av koden.

### API-nycklar
Eftersom API-nycklarna till OpenWeather och Unsplash inte bör synas i GitHub-filer, har jag placerat mina nycklar i en config.js fil som jag lagt i gitignore. Detta leder till att dashboarden inte går att publicera på det sätt vi hittills använt för webbsidor eftersom API-nycklarna inte kommer att vara tillgängliga. Jag förstått att man kan använda miljövariabler eller GitHub Secrets för att lösa detta och jag hoppas att det är något vi kommer att få lära oss framöver.  

### Filtrering av data från OpenWeather 
Den filtrering av väderdatan från OpenWeather som jag gjorde till att bara täcka de närmsta timmarna idag samt kl 12:00 imorgon och iövermorgon borde kunna göras enklare. Jag är dock nöjd med att jag inte behövde "hårdkoda" in vilka index i listan över väderprognoser som jag ville använda. Sättet jag skrivit koden på gör det också relativt lätt att förstå hur man kan lägga till ytterligare dagar. I ett sånt läge skulle jag dock försöka använda en array och map för ändra datumformaten så att de kan jämföras med datumen i prognoslistan. 

### Export/import av funktion för att uppdatera vädret vid midnatt
För att uppdatera väderprognosen vid midnatt använde jag moduler och export/import av funktionen för att hämta användarens position, som i sin tur anropar funktionen för att hämta väderdata. Jag importerade denna funktion till min date.js fil och lade in en kod för att se om datumet ändrats i timern som uppdaterar klockan. När så är fallet anropas funktionen. Att lägga in datumkollen i funktionen som uppdaterar klockan innebär att programmet var 20:e sekund kollar om datumet ändrats. Detta känns helt klart i överkant men det fick vara så eftersom jag redan hade timerfunktionen och jag gjorde bedömningen att datumkollen inte var någon krävande uppgift. Att en funktion som egentligen är kopplat till vädret importeras till date.js kan kanske upplevas som rörigt, men jag hoppas att kommentarerna gör att koden ändå blir begriplig.

### Favikoner till länkarna
En del av koden som jag inte är nöjd med är hämtningen av favikoner till länkarna. Jag hittade en enkel kod som fungerade, men nackdelen visar sig när man lägger in länkar till webbsidor utan favikoner. Vid sådana tillfällen visas en placeholder i form av en jordglob, men upplösningen är riktigt dålig. Dessutom får man ett tråkigt felmeddelande i konsolen. Att använda ett regelrätt api för att hämta favikonerna hade varit bättre. 

### Spara till localStorage
En övervägning jag gjorde när jag kodade var i vilket läge jag skulle uppdatera localStorage med gjorda ändringar. Jag valde att använda input som event både för rubriken och anteckningarna. Jag är medveten om att man istället kan använda en eventlyssnare som reagerar när användaren stänger eller navigerar bort från webbsidan och först i det läget uppdaterar localStorage. Jag gjorde dock bedömningen att det inte kommer att vara några stora datamängder som sparas från min dashboard och att input, även om det leder till fler localStorage-anrop, fungerar bra i det här fallet.  

### Try, catch och felmeddelanden
Jag använt try och catch för att hantera ev. fel vid API-anrop. Vilka av de fel som kan uppstå som ska kommuniceras till användaren och hur, är något jag funderat på. Tydliga fel som blir synliga på sidan, såsom att vädret inte visas, kommunicerar jag till användaren. Mindre uppenbara fel loggas enbart till konsolen. Jag valde att använda alert som kommunicationsväg till användaren, även om jag är medveten om att många alerts kan störa användarupplevelsen. Felmeddelanden till användaren har jag skrivit på svenska, medan loggar till konsolen och kommentarer i koden är på engelska. 