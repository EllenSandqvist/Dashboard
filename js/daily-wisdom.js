async function updateQuote() {
    // Fetch a random quote from the Quotable API
    const response = await fetch("https://api.quotable.io/random");

    //Convert response to JavaScript
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      displayResult(data);
    } else {
        console.log("Fetch error: ", error);
    }
  }
updateQuote();

function displayResult(quote){
    const cardQuote = document.getElementById('card-quote');
    const quoteText = document.createElement('div');
    quoteText.classList.add('quote-text');
    const quotePara = document.createElement('p');
    const authorPara = document.createElement('p');

    quotePara.textContent = quote.content; 
    quoteText.appendChild(quotePara);

    authorPara.textContent = " ~ " + quote.author;
    quoteText.appendChild(authorPara);

    cardQuote.appendChild(quoteText);
}