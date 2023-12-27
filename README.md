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

## Kodreflektioner
Eftersom API-nycklarna till OpenWeather och Unsplash inte bör synas i GitHub-filer, fungerar det inte att publicera dashboarden på det sätt vi hittills använt för webbsidor. Jag förstått att man kan använda miljövariabler för att lösa detta, men det har jag inte hunnit testa. Jag antar att vi framöver kommer att få lära oss bra sätt att hantera problemet.  

Jag är överlag nöjd med min kod och tycker att den uppfyller de krav som ställdes i uppgiften på ett bra sätt. Vissa delar av koden kan säkerligen förbättras och effektiviseras. Framförallt filtreringen av väderprognosen till att bara täcka de närmsta timmarna idag samt kl 12:00 imorgon och iövermorgon borde kunna göras enklare. Jag är dock nöjd med att jag inte behövde "hårdkoda" in vilket index i listan över väderprognoser som jag ville använda. Sättet jag skrivit koden på gör det också relativt lätt att förstå hur man kan lägga till ytterligare dagar. I ett sånt läge skulle jag dock försöka använda en array och map för ändra datumformaten så att de kan jämföras med datumen i prognoslistan. 

För att uppdatera väderprognosen vid midnatt använde jag moduler och export/import av funktionen för att hämta användarens position, som i sin tur anropar funktionen för att hämta väderdata. Jag importerade denna funktion till min date.js fil och lade in en kod för att se om datumet ändrats i timern som uppdaterar klockan. När så är fallet anropas funktionen. Att lägga in datumkollen i funktionen som uppdaterar klockan innebär att programmet var 20:e sekund kollar om datumet ändrats. Detta känns helt klart i överkant men det fick vara så eftersom jag redan hade timerfunktionen och jag gjorde bedömningen att datumkollen inte var någon krävande uppgift. Att en funktion som egentligen är kopplat till vädret importeras till date.js kan kanske upplevas som rörigt, men jag hoppas att kommentarerna gör att koden ändå blir begriplig.

Formateringen av klockan och datumet enligt uppgiftens exempel krävde mer kod än jag först trott. Det kändes lite konstigt att behöva lägga till en nolla framför timmar och minuter om de var lägre än tio. Men kanske finns det någon enklare lösning för detta.

En del av koden som jag inte är helt nöjd med är hämtningen favikoner till länkarna. Jag hittade en enkel kod som fungerade, men nackdelen visar sig när man lägger in länkar till webbsidor utan favikoner. Vid sådana tillfällen visas en placeholder i form av en jordglob, men upplösningen är riktigt dålig. Dessutom får man ett tråkigt felmeddelande i konsolen. Att använda ett regelrätt api för att hämta favikonerna hade förmodligen varit bättre. 

En övervägning jag gjorde när jag kodade var i vilket läge jag skulle uppdatera localStorage med gjorda ändringar. Jag valde att använda input som event både för rubriken och anteckningarna. Jag är medveten om att man istället kan använda en eventlyssnare som reagerar när användaren stänger eller navigerar bort från webbsidan och först i det läget uppdaterar localStorage. Jag gjorde dock bedömningen att det inte kommer att vara några stora datamängder som sparas från min dashboard och att input, även om det leder till fler localStorage-anrop, fungerar bra i det här fallet.  

Jag använt try och catch för att hantera ev. fel vid API-anrop. Vilka av de fel som kan uppstå som ska kommuniceras till användaren och hur är något jag funderat på. Tydliga fel som blir synliga på sidan, såsom att vädret inte visas, kommunicerar jag till användaren. Mindre uppenbara fel loggas enbart till konsolen. Jag valde att använda alert som kommunicationsväg till användaren, även om jag är medveten om att många alerts kan störa användarupplevelsen. Felmeddelanden till användaren har jag skrivit på svenska, medan loggar till konsolen och kommentarer i koden är på engelska. 