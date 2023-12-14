const h1Header = document.querySelector('h1');
let headerContent = localStorage.getItem('Dashboard-h1') || h1Header.textContent;

//function to render heading
function renderHeading() {
    h1Header.textContent = headerContent;
}

//eventlistener on h1 that listens to input
h1Header.addEventListener('input', () => {
    headerContent = h1Header.textContent;

    //function for saving headercontent to localStorage
    saveH1ToLocalStorage(headerContent);

    renderHeading();
});

function saveH1ToLocalStorage(heading) {
    localStorage.setItem('Dashboard-h1', heading);
}

renderHeading();
