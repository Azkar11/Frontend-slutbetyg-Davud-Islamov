# README för FilmSamlaren

## Välkommen till FilmSamlaren!
Denna webbplats låter dig söka efter filmer, visa detaljer om dem och spara dina favoriter för senare. Nedan följer en guide för att navigera på webbplatsen.

---

## Hur du navigerar på webbplatsen

### Startsida
När du öppnar webbplatsen landar du på startsidan. Här hittar du:
- En sökruta där du kan skriva in namnet på en film.
- En sökknapp som visar resultaten baserat på din sökning.
- En lista med filmer som visas dynamiskt när du söker eller laddar startsidan.

### Söka efter filmer
1. Skriv in ett filmtitel eller sökord i sökrutan. Exempel: "Inception".
2. Klicka på "Sök" eller tryck på **Enter**.
3. Resultaten visas som en lista med filmkort. Varje filmkort innehåller:
    - En poster av filmen.
    - Filmens titel.
    - Filmens utgivningsår.

### Visa detaljer om en film
1. Klicka på filmens poster för att se detaljerad information.
2. Ett fönster (modal) visas med följande information:
    - Titel.
    - Genre.
    - Handling.
    - År.
3. Stäng modalen genom att klicka på knappen **"Stäng"**.

### Favoriter
1. Klicka på länken **"Gå till Favoriter"** längst ner i sidfoten.
2. Här kan du se och hantera dina sparade favoritfilmer (denna funktion kräver vidare utveckling).

---

## Övriga funktioner

### Responsiv design
Webbplatsen anpassar sig för olika enheter, inklusive mobiltelefoner och surfplattor.

### Felhantering
- Om det inte hittas några filmer visas ett felmeddelande. Exempel: 
  - **"Ingen film hittades. Försök med ett annat sökord."**
- Vid nätverksfel visas meddelandet:
  - **"Nätverksfel. Försök igen senare."**

### Förvalda filmer
Om du inte skriver något i sökrutan visas en lista med populära filmer.

---

## Teknologi som används

- **HTML5**: Strukturen för webbplatsen.
- **CSS3**: Stilmallar för att skapa en attraktiv och responsiv design.
- **JavaScript (ES6)**: Logiken för att hämta och visa filmer från OMDb API.
- **OMDb API**: Extern tjänst för att hämta information om filmer.

---

## Uppfyllande av krav

### JSON
Filmer hämtas och visas genom JSON-formatet via OMDb API. Sökresultaten och filmens detaljer bearbetas och visas dynamiskt på webbplatsen.

### HTTP/HTTPS
Webbplatsen gör HTTP/HTTPS-förfrågningar till OMDb API för att hämta filmdata. Alla API-anrop sker över en säker HTTPS-anslutning, vilket säkerställer att datan är skyddad.

### Asynkronitet
För att hämta filmer utan att blockera användarens interaktion använder vi asynkrona funktioner (`async`/`await`) och `fetch()` för att kommunicera med OMDb API och visa resultaten dynamiskt.

### UX/UI
Webbplatsens användargränssnitt (UI) är responsivt och användarvänligt, vilket gör att den fungerar bra på både datorer och mobila enheter. Den innehåller interaktiva element som filmkort, modalfönster för detaljer och felhantering som informerar användaren om resultat eller nätverksproblem.

### Figma mockup: ![figma mockup](<Figma mockuop.png>)

---

## Installation

1. Klona repot:
   ```bash
   git clone https://github.com/username/filmsamlaren.git
