//My accessKey
import { accessKey } from "./config.js";

const apiUrl = 'https://api.unsplash.com/photos/random';

/* Get data from localStorage and store in backgroundObj if there is any, 
otherwise set backgroundObj to an empty Object. */
let backgroundObj = JSON.parse(localStorage.getItem('background')) || {};

//render background and photographer info on page load
renderBackground();

//function to render background
function renderBackground(){
    if(backgroundObj.url){
        const body = document.querySelector('body');
        body.style.backgroundImage = `url(${backgroundObj.url})`;
        attributePhotographer();
    }
};

//----------------------------------------------
function attributePhotographer(){
    const container = document.querySelector('.container');
    const photoPara = document.createElement('p');
    photoPara.classList.add('photo-text');
    container.appendChild(photoPara);
    
    if(backgroundObj.portfolio) {
        photoPara.innerHTML = `Photo by <a href=${backgroundObj.portfolio} target="_blank">${backgroundObj.user}</a> on <a href="https://unsplash.com/" target="_blank">Unsplash</a>`;
    } else {
        photoPara.innerHTML = `Photo by ${backgroundObj.user} on <a href="https://unsplash.com/">Unsplash</a>`;
    }
}

//----------------------------------------------------
// Function to generate new background on button click
//----------------------------------------------------
const bgButton = document.querySelector('.bg-button');

bgButton.addEventListener('click',()=>{
    fetchData();
})

//function to fetch data from unsplash API
async function fetchData() {
    try {
        //try to fetch from api with a orientation parameter
        const response = await fetch(`${apiUrl}?client_id=${accessKey}&orientation=landscape`);

        //convert response to js
        const data = await response.json();
        console.log(data);

        //store relevant info in objekt
        backgroundObj = {
            url: data.urls.regular,
            portfolio: data.user.portfolio_url,
            user: data.user.name
        }

        //save backgroundObj in localStorage
        localStorage.setItem('background', JSON.stringify(backgroundObj));

        //function to render background image
        renderBackground();

        //function to display photographer name and Unsplash link
        attributePhotographer();

    } catch (error) {
        console.log('API-anrop misslyckades: ', error);
    }
}