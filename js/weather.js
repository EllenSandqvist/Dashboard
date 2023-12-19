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

    /* added one parameter for language, one for unit selection and 
    one to limit the API response to only cover needed days and times*/ 
    const userApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLon}&units=metric&lang=sv&cnt=21&appid=${apiKey}`;

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
        console.log("This is the fetched list: ", userForecast);
        
        filterForecast(userForecast);
    } else {
        console.log("HTTP-errors: " + response.status);
        const weatherPara = document.createElement('p');
        weatherPara.textContent = "Kunde inte hämta väderprognos, Error: " + response.status;
        weatherDiv.appendChild(weatherPara);
    }
}

function filterForecast(data){
    //today will display the first list item i.e. the weather forecast for the following 3-6 hours.
    const today = [data.list[0]];
   
    //the weather for tomorrow and day3 will show the forecast for the weather at noon
    //use Date() object and add 1 to get the date for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    //set the time to noon
    tomorrow.setHours(12, 0, 0, 0);
    //console.log to make sure date format matches that in the fetched forecast list 
    console.log(tomorrow.toLocaleString());

    const day3 = new Date();
    day3.setDate(day3.getDate() + 2);
    day3.setHours(12, 0, 0, 0);
    console.log(day3.toLocaleString());

    //filter the fetched list to only contain the forecast for noon tomorrow and day3
    const nextTwoDaysForecast = data.list.filter(forecast => {
        return forecast.dt_txt === tomorrow.toLocaleString() || forecast.dt_txt === day3.toLocaleString();
    })

    //concat the arrays for today and the next two days in the forecast for three days
    const threeDayForecast = today.concat(nextTwoDaysForecast);
    console.log(threeDayForecast);

    renderForcast(threeDayForecast);
}

// Use forEach to render weather for three days
function renderForcast(array) {
    array.forEach(function(element, index){
        const weatherDisplay = document.getElementById(`weather${index}`)
        const weatherHeading = renderForecastDay(index);

        weatherDisplay.innerHTML = 
           `<img class="weather-icon" src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png"></img>
            <div class="weather-text">
                <h3>${weatherHeading}</h3>
                <div class="weather-para">
                    <p class="weather-temp">${Math.round(element.main.temp)}&deg</p>
                    <p class="weather-description">${element.weather[0].description}</p>
                <div>
            </div>`
    })
}

function renderForecastDay(index){
    if(index === 0) {
        return "Idag";
    } else if (index === 1) {
        return "Imorgon";
    } else {
        const day3 = new Date();
        day3.setDate(day3.getDate() + 2);
        
        const weekdays = [
            "Söndag", "Måndag", "Tisdag",
            "Onsdag", "Torsdag", "Fredag", "Lördag"
        ];

        return weekdays[day3.getDay()];
    }
}


// ev. find out how to handle passing midnight 
//todo render relevant weather data on page
    // 4. ev display wind speed, gust and direction 
        // 4a. Use if-statement to chose right wind arraw depending on wind degree
// todo use date for timedisplay and if-statement to check if date was changed - on change fetch new weatherData

// todo modal with info about weather forecast i.e. tomorrows weather is the forecast for the weather in 24h...