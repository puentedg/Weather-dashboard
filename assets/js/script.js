var APIKey = "59d0933cc9a4ce76bb2ab24bbae4e56c";
var mainWeather = document.querySelector ('.main-weather');
var searchInputEl = document.querySelector('#search-input');
var searchButton = document.querySelector('#search-btn');
// 

// // function gets the search from openweather

function getSearchResults (city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=59d0933cc9a4ce76bb2ab24bbae4e56c&units=Imperial`;
    fetch(queryURL)
    .then((res)=>{return res.json()})
    .then((data)=> {
        console.log(data);
        const lon = data.coord.lon
        const lat = data.coord.lat
        displaySearchResults(data)
       //getForecast (lon,lat)
    })
}
function getForecast(lon,lat){
    var forecastURL = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=&appid=59d0933cc9a4ce76bb2ab24bbae4e56c&units=Imperial`
    fetch(forecastURL)
    .then((res)=>{return res.json()})
    .then((data)=> {
        console.log(data);
        const lon = data.coord.lon
        const lat = data.coord.lat
        displaySearchResults(data)
    })
}
// // function display results of our search
function displaySearchResults(data){
    const card = document.createElement('div')
    card.setAttribute("class", "card-weatherMain")
    const cardHeader = document.createElement('div')
    const cardTitle = document.createElement('h2')
    cardTitle.textContent = data.name
    const icon = document.createElement('img')
    icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png")
    const span = document.createElement('span')
    const cardBody = document.createElement('div')
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


// fetch(queryURL)

searchButton.addEventListener("click", (event)=>{
    event.preventDefault()
    const city = searchInputEl.value
    console.log(city)
    getSearchResults(city)
})

