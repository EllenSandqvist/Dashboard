//call to fetch a random quote
fetchQuote();

//----------------------------------------------------
// Function to fetch a random quote
//----------------------------------------------------
async function fetchQuote() {
    try {
        // Fetch a random quote from the Quotable API
        const response = await fetch("https://api.quotable.io/random");

        //check if response is ok
        if(!response.ok) {
           //if not, throw error
           throw new Error(`HTTP-error: Status ${response.status}`);
        }

        //Convert response to JavaScript
        const data = await response.json();

        //function to check quote length
        checkQuoteLength(data);

    } catch (error) {
        console.error('API call failed: ', error);
        alert(`Nåt gick fel. Kunde inte hämta citat. ${error.message}`);
    }
  }


//----------------------------------------------------
// Function to check quote length
//----------------------------------------------------  
function checkQuoteLength(quote){
    if (quote.content.length > 90) {
        //if quote is longer than 90 char fetch new quote
        fetchQuote();
    } else {
        //if quote length <= 90 display quote
        displayQuote(quote);
    }
}

//----------------------------------------------------
// Function to display quote
//----------------------------------------------------
function displayQuote(quote){
    const quoteDiv = document.querySelector('.quote-div');
    
    const quotePara = document.createElement('p');
    quotePara.classList.add('quote-para');
    quotePara.textContent = quote.content; 
    quoteDiv.appendChild(quotePara);
    
    const authorPara = document.createElement('p');
    authorPara.classList.add('author-para');
    authorPara.textContent = quote.author;
    quoteDiv.appendChild(authorPara);
}