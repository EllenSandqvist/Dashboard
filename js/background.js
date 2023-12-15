//My accessKey
const accessKey = "izbaVrML58ENwVHhmd3YS1QfE2wxxl848ZOeIaJ9c0U";

const apiUrl = 'https://api.unsplash.com/photos/random';

//function to fetch data from unsplash API
async function fetchData() {
    try {
        //try to fetch from api with a orientation parameter
        const response = await fetch(`${apiUrl}?client_id=${accessKey}&orientation=landscape`);

        //convert response to js
        const data = await response.json();
        console.log(data);

        //function to render background image
        renderBackground(data);

        //function to display photographer name and Unsplash link
        attributePhotographer(data);

    } catch (error) {
        console.log('API-anrop misslyckades: ', error);
    }
}

//----------------------------------------------
function renderBackground(payload){
    const backgroundImg = payload.urls.regular;
    const body = document.querySelector('body');
    body.style.backgroundImage = `url(${backgroundImg})`;
};

//----------------------------------------------
function attributePhotographer(payload){
    const photoPara = document.getElementById('photo-para');
    photoPara.classList.add('photo-text');
    const photographerPortfolio = payload.user.portfolio_url;

    if(photographerPortfolio) {
        photoPara.innerHTML = `Photo by <a href=${photographerPortfolio} target="_blank">${payload.user.name}</a> on <a href="https://unsplash.com/" target="_blank">Unsplash</a>`;
    } else {
        photoPara.innerHTML = `Photo by ${payload.user.name} on <a href="https://unsplash.com/">Unsplash</a>`;
    }
}

//----------------------------------------------------
// Function to generate new background on button click
//----------------------------------------------------
const bgButton = document.querySelector('.bg-button');

bgButton.addEventListener('click',()=>{
    fetchData();
})