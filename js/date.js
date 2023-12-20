//import function from weather.js
import {getUserLocation} from './weather.js';

//eventlistener with a function that starts when window is loaded
window.addEventListener('load', showCurrentTime);

//variable to check if it's a new day and weather forecast needs an update 
let initialDate = null;

function showCurrentTime(){
    const dateDisplay = document.querySelector('.date');

    //get current date and time from the Date object
    const currentDate = new Date();

    //get current time
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const time = (hours < 10? "0" : "") + hours + ":" + (minutes < 10? "0" : "") + minutes;

    //get date of the month
    const dateOfMonth = currentDate.getDate();

    //array of months needed to convert the "month-number" from the Date object
    const months = [
        "Januari","Februari","Mars",
        "April","Maj","Juni",
        "Juli","Augusti","September",
        "Oktober","November","December"
    ];
    /* date.getMonth returns a number 0-11, months[...] are used 
    to convert this to the actual month */
    let month = months[currentDate.getMonth()];

    //get current year
    let year = currentDate.getFullYear();

    dateDisplay.innerHTML = 
        `<p>
            <strong class="date-span">${time}</strong> 
            <span id="dateOfMonth-span">${dateOfMonth}</span> 
            ${month} ${year}
        </p>`;

    setTimeout(() => {
        showCurrentTime();

        /* if statement to check if it's a new day 
        - if so call getUserLocation() to update weather */
        if(initialDate !== dateOfMonth){
            console.log("Det är inte längre dag " + initialDate + " i månaden. Uppdatera vädret!");
            getUserLocation();
            initialDate = dateOfMonth;
        }

    //setTimeout will update time and date every 20th second
    }, 20_000);  
};
