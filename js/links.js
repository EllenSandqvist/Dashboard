const addLinkBtn = document.getElementById('add-link-button');
const linkModal = document.getElementById('link-modal');
const closeLinkModal = document.getElementById('link-modal-close');
const saveLinkBtn = document.getElementById('save-link-button');

let linkArray = JSON.parse(localStorage.getItem('links')) || [];

//function call to render links
renderLinks();

//function renderLinks
function renderLinks(){
    const linkContainer = document.querySelector('.link-container');
    
        //user linkArray.map to render links
        //vi vill lägga in produkterna med pris < 200 på vår hemsida i HTML. Vi skapar flera html element och sparar dessa i mapResults
        //smart att lägga in klasser på det här viset
        let mapLinks = linkArray.map((link, index) => { 
            return `
                <div class="link-div">
                    <a class="links" href="${link.linkUrl}" target="_blank"><h3 class="link-h3">${link.linkName}</h3></a>
                    <i onclick= "deleteLink(${index})" class="fa-regular fa-trash-can"></i>
                </div>
            `
        });
    linkContainer.innerHTML = mapLinks.join('');
}

//function to saveLinks in array in localStorage
saveLinkBtn.addEventListener('click', function(){
    const modalForm = document.querySelector('form');
    
    if(modalForm.checkValidity()) {
        console.log("formuläret är rätt ifyllt!");
        linkObj = {
            linkName: document.getElementById('link-name').value, 
            linkUrl: document.getElementById('link-url').value 
            }
        
        linkArray.push(linkObj);
        localStorage.setItem('links', JSON.stringify(linkArray));

    } else {
        alert("Alla fält är inte korrekt ifyllda. \nKom du ihåg https:// i början av webbadressen? \nProva igen!");
    }
})

//------- Show add-links modal -------------
addLinkBtn.addEventListener('click', function(){
    linkModal.classList.remove('link-modal-hidden');
});

//------- Hide add-links modal -------------
closeLinkModal.addEventListener('click', function(){
    linkModal.classList.add('link-modal-hidden');
})

//------- Delete links -------------------------
console.log(linkArray);
function deleteLink(linkIndex) {
    linkArray.splice(linkIndex, 1);

    if(linkArray.length === 0) {
        localStorage.removeItem('links');
    } else {
        localStorage.setItem('links', JSON.stringify(linkArray));
    }
    renderLinks();
}