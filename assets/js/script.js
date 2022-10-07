var APIKey = "59d0933cc9a4ce76bb2ab24bbae4e56c";
var mainWeather = document.querySelector ('.main-weather');
var searchInputEl = document.querySelector('#search-input');
var searchButton = document.querySelector('#search-btn');
var forecastWeather = document.querySelector('.forecast')
var now = dayjs()
// 

function getCity (event) {
    event.preventDefault()
    var city = searchInputEl.value
    console.log(city)
    getSearchResults(city)
}
//function gets the search from openweather

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

function displayForecastResults(data){
    // for (let i=0; i<5; i++) {
        
    // let dataDay = data.list[index].dt_txt.split(' ')[0];
    // let dataTime = data.list[index].dt_txt.split(' ')[1];
    
    // if (index == 0 && dataTime == '00:00:00') {
    //     let dateTemp = data.list[index].main.temp;
    //     let dateHumidity = data.list[index].main.humidity;
    //     let dateWind = data.list[index].wind.speed;
    //     index++;
    //     continue;
    // }}
    
    // for (var index = 0; index<5; index++){
    // forecastWeather.textContent = "";
    var date = document.createElement("h3")
    // date.textContent = moment().add(i+1, 'days').format('MM DD')
    const card = document.createElement('div')
    card.setAttribute("class", "card-body col-lg-2")
    card.setAttribute("class", "card-weatherMain")
    const cardHeader = document.createElement('div')
    const cardTitle = document.createElement('h2')
    cardTitle.textContent = data.name
    const icon = document.createElement('img')
    icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png")
    const span = document.createElement('span')
    const cardBody = document.createElement('div')
    const temp = document.createElement('p')
    const humidity = document.createElement('p')
    const wind = document.createElement('p')
    temp.textContent = `Temperature: ${data.list[0].main.temp} F`
    humidity.textContent = `Humidity: ${data.list[0].main.humidity} %`
    wind.textContent = `Wind speed: ${data.list[0].wind.speed} MPH`

    span.append(icon)
    cardTitle.append(span)
    cardHeader.append(cardTitle)
    cardBody.append(temp,humidity,wind)
    card.append(date, cardHeader,cardBody)
    forecastWeather.append(card)

    var date1 = document.createElement("h3")
    // date.textContent = moment().add(i+1, 'days').format('MM DD')
    const card1 = document.createElement('div')
    card1.setAttribute("class", "card-body col-lg-2")
    card1.setAttribute("class", "card-weatherMain")
    const cardHeader1 = document.createElement('div')
    const cardTitle1 = document.createElement('h2')
    cardTitle1.textContent = data.name
    const icon1 = document.createElement('img')
    icon1.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[1].weather[0].icon + ".png")
    const span1 = document.createElement('span')
    const cardBody1 = document.createElement('div')
    const temp1 = document.createElement('p')
    const humidity1 = document.createElement('p')
    const wind1 = document.createElement('p')
    temp1.textContent = `Temperature: ${data.list[1].main.temp} F`
    humidity1.textContent = `Humidity: ${data.list[1].main.humidity} %`
    wind1.textContent = `Wind speed: ${data.list[1].wind.speed} MPH`

    span1.append(icon1)
    cardTitle1.append(span1)
    cardHeader1.append(cardTitle1)
    cardBody1.append(temp1,humidity1,wind1)
    card1.append(date1, cardHeader1,cardBody1)
    forecastWeather.append(card1)
}

searchButton.addEventListener("click", getCity);
