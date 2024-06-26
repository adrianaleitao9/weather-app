function updateWeather(response){  
    let currentTemperature = document.querySelector(".city-weather-temperature");
    currentTemperature.innerHTML = Math.round(response.data.temperature.current);

    let city = document.querySelector("#chosen-city");
    city.innerHTML = `${capitalize(response.data.city)}`;

    let weatherDescription = document.querySelector("#weather-description");
    weatherDescription.innerHTML = response.data.condition.description;

    let weatherHumidity = document.querySelector("#weather-humidity");
    weatherHumidity.innerHTML = response.data.temperature.humidity;

    let weatherWind = document.querySelector("#weather-wind");
    weatherWind.innerHTML = response.data.wind.speed;
  
    let weatherIcon = document.querySelector("#icon");
    weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" >`;

     let currentDateElement = document.querySelector("#current-date");
    currentDateElement.innerHTML = formatDate(response.data.time);


    getForecast(response.data.city);
}

function searchCity(city){
    let apiKey = "f41of6379tbae2fe2bd3f79075063741";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
    axios.get(apiUrl).then(updateWeather);
}
    
function capitalize(text){
    return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
}

function searchSubmit(event){
    event.preventDefault()
    
    let searchInput = document.querySelector("#search-text-input")
    searchCity(searchInput.value);
}
function formatDate(timestamp){
    let date = new Date(timestamp * 1000);
    let minutes = date.getMinutes();
    let hours = date.getHours();

    if(hours < 10){
        hours =`0${hours}`;
    }

    if(minutes < 10){
        minutes =`0${minutes}`;
    }

    let day = date.getDay();

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let formatedDate = days[day];
    return `${formatedDate} ${hours}:${minutes}, `;
}

function getForecast(city){
    let apiKey = "f41of6379tbae2fe2bd3f79075063741";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp){
    let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    let date=new Date(timestamp*1000);

    return days[date.getDay()];
}

function displayForecast(response){
    let forecastHtml = "";

    response.data.daily.forEach(function(day,index) {
       
        if (index < 5){

        forecastHtml =
            forecastHtml +
            `
            <div class="weather-forecast-day">
                <div class="weather-forecast-date">${formatDay(day.time)}</div>
                <div >
                    <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
                </div>
                <div class="weather-forecast-temperature">
                    <div class="weather-forecast-temperature-max">${Math.round(day.temperature.maximum)}°</div>
                    <div class="weather-forecast-temperature-min">${Math.round(day.temperature.maximum)}°</div>
                </div>
            </div>
            `;
        }
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
    
};

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit",searchSubmit);


searchCity("vila real");

