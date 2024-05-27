function updateWeather(response){
    console.log(response.data);
    
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
}

function searchCity(city){
let apiKey = "f41of6379tbae2fe2bd3f79075063741";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`
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
function formatDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours()

    if(hours < 10){
        hours =`0${hours}`;
    }

    if(minutes < 10){
        minutes =`0${minutes}`;
    }

    let day = date.getDay();

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let formatedDate = days[day];
    return `${formatedDate} ${hours}:${minutes}, `
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit",searchSubmit);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();



currentDateElement.innerHTML = formatDate(currentDate);
searchCity("vila Real");
