const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const iconOutput = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('.locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.btn');
const cities = document.querySelector('.city');

//Default city when the page load
let cityInput = "Prague";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWhetherData();
        app.style.opacity = "0";
    });
});

//Add submit event from the form
form.addEventListener('submit', (e) => {
    if (search.value.lenght == 0) {
        alert('Pleace type in a city name')
    } else {
        cityInput = search.value;
        fetchWhetherData();
        search.value = "";
        app.style.opacity = "0";

    }
    e.preventDefault();
})

function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wendesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

function fetchWhetherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=51f8c5f6794b458186a71004242105&q=${cityInput}`)
        .then(response => response.json())
        .then(data => console.log(data));
    temp.innerHTML = data.current.temp_c + "&#176;";
    conditionOutput.innerHTML = data.current.condition.text;

    const date = data.location.localtime;
    const y = parseInt(date.substr(0, 4));
    const m = parseInt(date.substr(5, 2));
    const d = parseInt(date.substr(8, 2));
    const time = date.substr(11);

    dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)}${d},${m},${y}`;
    timeOutput.innerHTML = time;
    nameOutput.innerHTML = data.location.name;

    const icon = data.current.condition.icon.sustr("//cdn.weatherapi.com/weather/64x64".length);

    icon.src = "./icons/" + iconId;

    cloudOutput.innerHTML = data.current.cloud + "%";
    humidityOutput.innerHTML = data.current.humidity + "%";
    windOutput.innerHTML = data.current.cloud + "km/h";

    let timOfDay = 'day';
    const code = data.current.condition.code;

    if (!data.current.is_day) {
        timOfDay = "night";
    }
    if (code == 1000) {
        app.style.background = `url(./day${timOfDay}/clear.jpg)`;
        bnt.style.background = "#e5ba92";
    }
    if (timOfDay == "night") {
        btn.style.background = "#181e27";
    } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
    ) {
        app.style.background = `url(./day${timOfDay}/pexels-pixabay-158163.jpg)`;
        bnt.style.background = "#fa6d1b";
        if (timOfDay == "night") {
            btn.style.background = "#181e27";
        }
    } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252 
    ) {
        app.style.background = `url(./day${timOfDay}/rain3.jpg)`;
        btn.style.background = "#647d75";
        if (timOfDay =="night") {
            btn.style.background = "#325c80";
        }
    } else {
        app.style.backgroundImage = `url(./day${timOfDay}/snowy.jpg)`;
        if (timOfDay == "night") {
            btn.style.background = "#1b1b1b";
        }
    }
    app.style.opacity = '1';
}
