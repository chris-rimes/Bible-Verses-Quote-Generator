const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const verseText = document.getElementById('verse');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl ='https://whispering-shore-49107.herokuapp.com/'
    const apiUrl = 'https://beta.ourmanna.com/api/v1/get/?format=json&order=random'
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        const newVerseText = data.verse.details.text
        const newVerse = data.verse.details.reference
        // Display Verse info
            verseText.innerText = newVerse;
        // Reduce font size for long quotes
        if (newVerseText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        // Display Verse Text
        quoteText.innerText = newVerseText;
        // Stop Loader, Show Quote
        removeLoadingSpinner();
    } catch (error) {
        getQuote();
    }
}
// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const verse = verseText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();