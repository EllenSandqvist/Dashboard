//variables for needed HTML-elements
const addLinkBtn = document.getElementById('add-link-button');
const linkModal = document.getElementById('link-modal');
const closeLinkModal = document.getElementById('link-modal-close');
const saveLinkBtn = document.getElementById('save-link-button');

/* if there is a linkArray in localStorage convert it to js and store in linkArray,
otherwise store an empty array */
const linkArray = JSON.parse(localStorage.getItem('links')) || [];

//function call to render links
renderLinks();

//------- FUNCTION renderLinks -------------
function renderLinks(){
    const linkContainer = document.querySelector('.link-container');

        //use map() to generate html element for the dashboard
        //add index to deleteLink function call to easily find right link to remove
        let mapLinks = linkArray.map((link, index) => { 
            return `
                <div class="link-div">
                    <a class="links" href="${link.linkUrl}" target="_blank">
                        <h3 class="link-h3">${link.linkName}</h3>
                    </a>
                    <i onclick= "deleteLink(${index})" class="fa-regular fa-trash-can"></i>
                </div>
            `
        });
    //render html elements from mapLinks and use join to remove ","
    linkContainer.innerHTML = mapLinks.join('');
}

//------- FUNCTION to save links -------------
saveLinkBtn.addEventListener('click', (event) => {
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
        
        //add new link to linkArray
        linkArray.push(newLink);
        //convert linkArray and save in localStorage
        localStorage.setItem('links', JSON.stringify(linkArray));

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

//------- FUNCTION Show add-links modal -------------
addLinkBtn.addEventListener('click', () => linkModal.classList.remove('link-modal-hidden'));

//------- FUNCTION Hide add-links modal -------------
closeLinkModal.addEventListener('click', () => linkModal.classList.add('link-modal-hidden'));

//------- FUNCTION Delete links -------------------------
function deleteLink(linkIndex) {
    //remove link at specified index
    linkArray.splice(linkIndex, 1);

    /* if linkArray is empty remove links from localStorage,
    otherwise update the stored array */
    linkArray.length === 0
        ? localStorage.removeItem('links') 
        : localStorage.setItem('links', JSON.stringify(linkArray));
    
    //call renderLinks to update links shown on dashboard
    renderLinks();
}