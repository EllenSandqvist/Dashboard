//eventlistener with a function that starts when window is loaded
window.addEventListener('load', showCurrentTime);

// ! O.B.S! Kom ihåg att ändra till date när funktionen verkar funka!
let previousMin = null;

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

        // ! O.B.S! Kom ihåg att ändra till date när funktionen verkar funka!
        if(previousMin !== minutes){
            console.log("Nu ska vädret uppdateras!");

            previousMin = minutes;
        }
    }, 20_000);  
};


// todo this belongs to check date for weather update:
    // const dateOfMonthSpan = document.getElementById('dateOfMonth-span');
    // const dateSpan = document.querySelector('.date-span').textContent;
    // console.log(dateSpan);
    // checkNewDate(dateOfMonthSpan);
    // checkNewTime(dateSpan);
