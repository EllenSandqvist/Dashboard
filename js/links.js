//variables for needed HTML-elements
const addLinkBtn = document.getElementById('add-link-button');
const linkModal = document.getElementById('link-modal');
const closeLinkModal = document.getElementById('link-modal-close');
const saveLinkBtn = document.getElementById('save-link-button');

/* if there is a linkArray in localStorage convert it to js and store in linkArray,
otherwise store an empty array */
const savedLinks = JSON.parse(localStorage.getItem('links')) || [];

//function call to render links
renderLinks();


//------- FUNCTION renderLinks -------------
function renderLinks(){
    const linkContainer = document.querySelector('.link-container');

        //use map() to generate html element for the dashboard
        //add index to deleteLink function call to easily find right link to remove
        let mapLinks = savedLinks.map((link, index) => {
            //url to get favicons through google 
            const faviconUrl = `https://www.google.com/s2/favicons?domain=${link.linkUrl}&sz=32`;
            
            return `
                <div class="link-div">
                    <div class="favicon-div">
                        <img class="favicon" src="${faviconUrl}">
                        <a class="links" href="${link.linkUrl}" target="_blank">
                            <h3 class="link-h3">${link.linkName}</h3>
                        </a>
                    </div>
                    <i onclick= "deleteLink(${index})" class="fa-regular fa-trash-can"></i>
                </div>
            `
        });
    //render html elements from mapLinks and use join to remove ","
    linkContainer.innerHTML = mapLinks.join('');
}


//------- FUNCTION to save links -------------
saveLinkBtn.addEventListener('click', (event) => {
    //prevent page from reloading
    event.preventDefault();

    const modalForm = document.querySelector('form');
    
    //if statement to check so form is correct filled
    if(modalForm.checkValidity()) {
        console.log("formuläret är rätt ifyllt!");
        //add form info to link object
        let newLink = {
            linkName: document.getElementById('link-name').value, 
            linkUrl: document.getElementById('link-url').value 
        };
        
        addLinkToLocalStorage(newLink);
        
        //update links shown on dashboard
        renderLinks();

        //hide modal and reset form
        linkModal.classList.add('link-modal-hidden');
        modalForm.reset();

    } else {
        alert("Alla fält är inte korrekt ifyllda.\n" + 
            "Kom du ihåg https:// i början av webbadressen?\n" +
            "Prova igen!"
        );
    }
})


//------- FUNCTION add links to localStorage -------------
function addLinkToLocalStorage(link) {
    //add new link to savedLinks
    savedLinks.push(link);
    //convert savedLinks and save in localStorage
    localStorage.setItem('links', JSON.stringify(savedLinks));
}


//------- FUNCTION Show add-links modal -------------
addLinkBtn.addEventListener('click', () => linkModal.classList.remove('link-modal-hidden'));


//------- FUNCTION Hide add-links modal -------------
closeLinkModal.addEventListener('click', () => linkModal.classList.add('link-modal-hidden'));


//------- FUNCTION Delete links -------------------------
function deleteLink(linkIndex) {
    //remove link at specified index
    savedLinks.splice(linkIndex, 1);
    updateLocalStorage();
    
    //call renderLinks to update links shown on dashboard
    renderLinks();
}


//------- FUNCTION to update localStorage -------------
function updateLocalStorage(){
    /* if linkArray is empty remove links from localStorage,
    otherwise update the stored array */
    savedLinks.length === 0
        ? localStorage.removeItem('links') 
        : localStorage.setItem('links', JSON.stringify(savedLinks));
}