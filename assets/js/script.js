var apiKey ="7cb8e0b712f8020b6129bd30e58c6bca";
var mainWeather = document.querySelector ('.main-weather');
var searchInputEl = document.querySelector('#search-input');
var searchButton = document.querySelector('#search-btn');
var forecastWeather = document.querySelector('.forecast')
let historySelector = document.querySelector('#history-selector')

// let historySelector = document.querySelector("#history-selector")
let userHistory=document.querySelector('#search-history');
let historyCache = [];
var cityName = ""

loadHistory()

// function to get the input and calls the function to fetch results
function getCity (event) {
    event.preventDefault()
    var city = searchInputEl.value
    console.log(city)
    getSearchResults(city)
    saveHistory(city);
}
//function gets the search from openweather api

function getSearchResults (city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=59d0933cc9a4ce76bb2ab24bbae4e56c&units=Imperial`;
    fetch(queryURL)
    .then((res)=>{return res.json()})
    .then((data)=> {
        console.log(data);
        const lon = data.coord.lon
        const lat = data.coord.lat
        cityName = data.name
        getForecast (lon,lat)
        displaySearchResults(data) 
    })
}

// function that gets the forecast from the api
function getForecast(lon,lat){
    var oneCall = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={minutely,hourly,alerts}&appid=${apiKey}&units=Imperial`
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=59d0933cc9a4ce76bb2ab24bbae4e56c&units=Imperial`
    fetch(oneCall)
    .then((res)=>{return res.json()})
    .then((data)=> {
        console.log(data);
        displaySearchResults(data)  
        displayForecastResults(data)
    })
}

// function display results of our search
function displaySearchResults(data){
    mainWeather.innerHTML ="";
    const card = document.createElement('div')
    card.setAttribute("class", "column is-narrow card-weatherMain card")
    const cardHeader = document.createElement('div')
    cardHeader.setAttribute("class","card-header has-text-white has-text-weight-bold is-uppercase is-size-4")
    const cardTitle = document.createElement('h2')
    cardTitle.setAttribute ('class', "card-header-title has-text-weight-bold is-align-content-center")
    cardTitle.textContent = cityName
    const icon = document.createElement('img')
    icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png")
    const span = document.createElement('span')
    const cardBody = document.createElement('div')
    cardBody.setAttribute("class", "card-content")
    const temp = document.createElement('p')
    const humidity = document.createElement('p')
    const wind = document.createElement('p')
    const uvi= document.createElement('p')
    temp.textContent = `Temperature: ${data.current.temp} F`
    humidity.textContent = `Humidity: ${data.current.humidity} %`
    wind.textContent = `Wind speed: ${data.current.wind_speed} MPH`
    uvi.textContent = `UVI: ${data.current.uvi}`

    span.append(icon)
    cardTitle.append(span)
    cardHeader.append(cardTitle)
    cardBody.append(temp,humidity,wind,uvi)
    card.append(cardHeader,cardBody)
    mainWeather.append(card)

}

// function to display forecast results

function displayForecastResults(data){
    forecastWeather.innerHTML="";
//    for loop to get the forecast for 5 days length
    for (var index = 0; index<5; index++){
      
        var date = document.createElement("h2")
        date.textContent = moment().add(index, 'days').format('dddd, MMM DD')
        date.setAttribute("class", "has-text-white has-text-weight-bold is-uppercase is-size-4")
        const card = document.createElement('div')
        card.setAttribute("class", "card card-weatherMain")
        const cardHeader = document.createElement('div')
        cardHeader.setAttribute("class","card-header has-text-weight-bold")
        const cardTitle = document.createElement('h2')
        cardTitle.setAttribute ('class', "card-header-title title is-4 has-text-weight-bold is-align-content-center")
        cardTitle.textContent = data.name
        const icon = document.createElement('img')
        icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[index].weather[0].icon + ".png")
        icon.setAttribute("class", "weather-icon")
        const span = document.createElement('span')
        const cardBody = document.createElement('div')
        cardBody.setAttribute("class", "card-content")
        const temp = document.createElement('p')
        const humidity = document.createElement('p')
        const wind = document.createElement('p')
        temp.textContent = `Temperature: ${data.daily[index].temp.day} F`
        humidity.textContent = `Humidity: ${data.daily[index].humidity} %`
        wind.textContent = `Wind speed: ${data.daily[index].wind_speed} MPH`
        
        span.append(icon)
        cardTitle.append(span, date)
        cardHeader.append(cardTitle)
        cardBody.append(temp,humidity,wind)
        card.append(date, cardHeader,cardBody)
        forecastWeather.append(card)
       }
}

function renderHistory(history) {
    // if any history objects are disabled, do not delete them
    history.forEach (element => {
        let userHistoryItem = document.createElement("li");
        const btn = document.createElement("button");
        btn.textContent = element;
        btn.setAttribute("class", "button is-warning is-medium is-hovered is-size-5 is-capitalized has-text-weight-semibold has-text-info-dark mb-3")
        userHistoryItem.setAttribute("class", "search-history-item is-justify-content-center");
        userHistoryItem.append(btn)
        historySelector.append(userHistoryItem);
    })
}

// This function loads the history from localstorage from the localStorageKey and parses it from json
function loadHistory() {
    let history = JSON.parse(localStorage.getItem("searchResult")) || [];
    console.log(history)
    
    userHistory.setAttribute("style","display:flex")
    historySelector.innerHTML = "";

    console.log(historyCache)

    renderHistory(history)
    
}

// if the search history has the same term already, it is moved to the start of the list
function saveHistory(city) {

    if (!historyCache.includes(city)){
        historyCache.push(city)
        localStorage.setItem("searchResult", JSON.stringify(historyCache));
        console.log(historyCache);
        console.log(historyCache.length);
    }

    // check if city is null or "", if it is either, return;
    if (city == null || city == "") {
        console.log ("variable is null or undefined");
        return;

    }

loadHistory();
}

// Event Listener for check the weather button
searchButton.addEventListener("click", getCity);

// this button starts a search based on the term inside it
function historyButtonClicked(event) {
    event.preventDefault();
    
    var userHistoryEl = event.target.textContent;
    
    getSearchResults(userHistoryEl);
}

// listen for change event on history buttons then pass to historyButtonClicked

historySelector.addEventListener("click", historyButtonClicked);


