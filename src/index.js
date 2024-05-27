function updateWeather(response){
    console.log(response.data);
    let currentTemperature= document.querySelector(".city-weather-temperature");
    let city= document.querySelector("#chosen-city");
    city.innerHTML= `${capitalize(response.data.city)}`;
    currentTemperature.innerHTML= Math.round(response.data.temperature.current);
}

function searchCity(city){
let apiKey = "f41of6379tbae2fe2bd3f79075063741";
let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`
axios.get(apiUrl).then(updateWeather);
}
    
function capitalize(text){
return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
}

function searchSubmit(event){
    event.preventDefault()
    let searchInput= document.querySelector("#search-text-input")
    searchCity(searchInput.value);
}

let searchFormElement= document.querySelector("#search-form");
searchFormElement.addEventListener("submit",searchSubmit);

searchCity("vila Real");