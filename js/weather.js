//import apiKey from config.js 
import { apiKey } from "./config.js";


// -------- Geolocation section ---------------

//if statement to check if user browser supports geolocation
if(!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
} else {
    //if supported run function to get user position
    navigator.geolocation.getCurrentPosition(success, error);
}

// use browser geolocation api to get users location
function success(position) {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;

    console.log(userLat, userLon);

    /* added one parameter for unit selection and one to limit the API response to cover 3 days  */ 
    const userApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLon}&units=metric&lang=sv&cnt=24&appid=${apiKey}`;

    // call function to get forecast
    getForecast(userApiUrl);
}

function error() {
    console.log("Unable to retrieve your location");
    alert(`ERROR(${error.code}): ${error.message}`);
}
// -----------------------------------------------------------------


//fetch weather forecast for user location
async function getForecast(apiUrl) {
    const weatherDiv = document.querySelector('.weather-div');
    
    let response = await fetch(apiUrl);

    if(response.ok){
        const userForecast = await response.json();
        console.log(userForecast);
        renderForecast(userForecast);

        //todo filter out the forecast for 12 o'clock tomorrow and the day after
        // todo check how many days were included in cnt = 3
        // todo split forecast list so that 12:00:00 for current day is not included
        /* const desiredTime = "12:00:00"

        const forecastList = userForecast.list;
        console.log(forecastList);

        const weatherAtMidday = forecastList.filter(data => {
            const dataAtDesiredTime = data.dt_txt.split(' ');
            console.log(dataAtDesiredTime);

            return dataAtDesiredTime[1] === desiredTime; 
        })

        console.log(weatherAtMidday); */


    } else {
        console.log("HTTP-errors: " + response.status);
        const weatherPara = document.createElement('p');
        weatherPara.textContent = "Kunde inte hämta väderprognos, Error: " + response.status;
        weatherDiv.appendChild(weatherPara);
    }
}

function renderForecast(data){
    const weatherToday = document.getElementById('today');
    const tempToday = Math.round(data.list[0].main.temp);
    weatherToday.innerHTML = `<h3>Idag</h3>\n ${tempToday}&deg`;

    const weatherTomorrow = document.getElementById('tomorrow');
    const tempTomorrow = Math.round(data.list[8].main.temp);
    weatherTomorrow.innerHTML = `<h3>Imorgon</h3>\n ${tempTomorrow}&deg`;

    const weatherDay3 = document.getElementById('day3');
    const tempDay3 = Math.round(data.list[16].main.temp);
    weatherDay3.innerHTML = `<h3>Iövermorgon</h3>\n ${tempDay3}&deg`;
}

const myDate = new Date().toLocaleString();
console.log(myDate);
// ev. find out how to handle passing midnight 
//todo render relevant weather data on page
    // 1. if-statement to check what img to display and ev. belonging text
    // 2. display date/day
    // 3. display temperature
    // 4. ev display wind speed, gust and direction 
        // 4a. Use if-statement to chose right wind arraw depending on wind degree
// todo use date for timedisplay and if-statement to check if date was changed - on change fetch new weatherData



// todo modal with info about weather forecast i.e. tomorrows weather is the forecast for the weather in 24h...