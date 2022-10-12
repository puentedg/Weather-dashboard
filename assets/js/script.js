var APIKey = "59d0933cc9a4ce76bb2ab24bbae4e56c";
var mainWeather = document.querySelector ('.main-weather');
var searchInputEl = document.querySelector('#search-input');
var searchButton = document.querySelector('#search-btn');
var forecastWeather = document.querySelector('.forecast')

// function to get the input and calls the function to fetch results
function getCity (event) {
    event.preventDefault()
    var city = searchInputEl.value
    console.log(city)
    getSearchResults(city)
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
        displaySearchResults(data)
        getForecast (lon,lat)
    })
}

// function that gets the forecast from the api
function getForecast(lon,lat){
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=59d0933cc9a4ce76bb2ab24bbae4e56c&units=Imperial`
    fetch(forecastURL)
    .then((res)=>{return res.json()})
    .then((data)=> {
        console.log(data);
            
        displayForecastResults(data)
    })
}
// function display results of our search
function displaySearchResults(data){

    const card = document.createElement('div')
    card.setAttribute("class", "column is-narrow card-weatherMain card")
    const cardHeader = document.createElement('div')
    cardHeader.setAttribute("class","card-header has-text-white has-text-weight-bold is-uppercase is-size-4")
    const cardTitle = document.createElement('h2')
    cardTitle.setAttribute ('class', "card-header-title has-text-weight-bold is-align-content-center")
    cardTitle.textContent = data.name
    const icon = document.createElement('img')
    icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png")
    const span = document.createElement('span')
    const cardBody = document.createElement('div')
    cardBody.setAttribute("class", "card-content")
    const temp = document.createElement('p')
    const humidity = document.createElement('p')
    const wind = document.createElement('p')
    temp.textContent = `Temperature: ${data.main.temp} F`
    humidity.textContent = `Humidity: ${data.main.humidity} %`
    wind.textContent = `Wind speed: ${data.wind.speed} MPH`

    span.append(icon)
    cardTitle.append(span)
    cardHeader.append(cardTitle)
    cardBody.append(temp,humidity,wind)
    card.append(cardHeader,cardBody)
    mainWeather.append(card)

}

// function to display forecast results

function displayForecastResults(data){
//    for loop to get the forecast for 5 days length
    for (var index = 0; index<5; index++){
      
        var date = document.createElement("h2")
        date.textContent = moment().add(index, 'days').format('dddd, MMM DD')
        date.setAttribute("class", "has-text-white has-text-weight-bold is-uppercase is-size-4")
        const card = document.createElement('div')
        card.setAttribute("class", "column is-narrow card card-weatherMain")
        const cardHeader = document.createElement('div')
        cardHeader.setAttribute("class","card-header has-text-weight-bold")
        const cardTitle = document.createElement('h2')
        cardTitle.setAttribute ('class', "card-header-title title is-4 has-text-weight-bold is-align-content-center")
        cardTitle.textContent = data.name
        const icon = document.createElement('img')
        icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[index].weather[0].icon + ".png")
        icon.setAttribute("class", "card-image icon is-large fas fa-2x")
        const span = document.createElement('span')
        const cardBody = document.createElement('div')
        cardBody.setAttribute("class", "card-content")
        const temp = document.createElement('p')
        const humidity = document.createElement('p')
        const wind = document.createElement('p')
        temp.textContent = `Temperature: ${data.list[index].main.temp} F`
        humidity.textContent = `Humidity: ${data.list[index].main.humidity} %`
        wind.textContent = `Wind speed: ${data.list[index].wind.speed} MPH`
        
        span.append(icon)
        cardTitle.append(span, date)
        cardHeader.append(cardTitle)
        cardBody.append(temp,humidity,wind)
        card.append(date, cardHeader,cardBody)
        forecastWeather.append(card)
       }
}
// Event Listener for check the weather button
searchButton.addEventListener("click", getCity);
