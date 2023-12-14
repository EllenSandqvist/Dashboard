async function updateQuote() {
    // Fetch a random quote from the Quotable API
    const response = await fetch("https://api.quotable.io/random");

    //Convert response to JavaScript
    const data = await response.json();
    if (response.ok) {
      //function to check quote length
      checkQuoteLength(data);
    } else {
        console.log("Fetch error: ", error);
    }
  }
updateQuote();

function checkQuoteLength(quote){
    if (quote.content.length > 90) {
        updateQuote();
    } else {
        //if quote length <= 90 display quote
        displayResult(quote);
    }
}

function displayResult(quote){
    const quoteDiv = document.querySelector('.quote-div');
    
    const quotePara = document.createElement('p');
    quotePara.classList.add('quote-para');
    
    const authorPara = document.createElement('p');
    authorPara.classList.add('author-para');

    quotePara.textContent = quote.content; 
    quoteDiv.appendChild(quotePara);

    authorPara.textContent = quote.author;
    quoteDiv.appendChild(authorPara);
}