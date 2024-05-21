const api = {
    key: "https://www.youtube.com/watch?v=czabCJWYEaU",
    base: "https://home.openweathermap.org/data/2.5"
}

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=4${query}&units=metric&APPID=${api.key}`)
    then(weather => {
        return weather.json();
    }).then(displayResult);
}

function displayResult(weather) {
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name},${weather.sys.country}`;

    let now = new Data();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;

    let hi_low = document.querySelector(".hi-low");
    hi_low.innerText = `${Math.round(weather.main.temp_min)}°c / ${weather.main.temp_max}°c `;

}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonths()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

}