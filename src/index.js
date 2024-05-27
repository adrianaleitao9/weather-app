function capitalize(text){
return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
}

function searchSubmit(event){
    event.preventDefault()
    let searchInput=document.querySelector("#search-text-input")
    let city=document.querySelector("#chosen-city");
    city.innerHTML=`${capitalize(searchInput.value)}`;
}

let searchFormElement=document.querySelector("#search-form");
searchFormElement.addEventListener("submit",searchSubmit);