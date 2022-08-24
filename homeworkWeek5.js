//Current date and time
let APIKey = "8c7ecd85f32f605c8155d5373e494023";
let date = new Date();

let week = [
  "Monday",
  "Turesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let day = date.getDay();
let weekDay = week[day];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = date.getMonth();
let monthName = months[month];

let dayOfMonth = date.getDate();

let year = date.getFullYear();
let hour = date.getHours();
let min = date.getMinutes();

if (hour < 10) {
  hour = "0".concat(hour);
}
if (min < 10) {
  min = "0".concat(min);
}

let currentDate = ` ${weekDay}, ${monthName} ${dayOfMonth}, ${hour}:${min}, clear sky`;

let dateHtml = document.querySelector("#date");
dateHtml.innerHTML = currentDate;

let city = document.querySelector(".card-title");
let cityName = city.innerHTML;
let btn = document.querySelector("#search");
let cityInput = document.querySelector(".form-control");
let mainTemp = document.querySelector("#value");

let humidityField = document.querySelector("#hum");
let windField = document.querySelector("#wind");
let rainField = document.querySelector("#rain");
let celciusSign = document.querySelector("#C");
let farenheitSign = document.querySelector("#f");

let tempCelcius = null;


function onLoad() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`;

  axios.get(url).then((response) => {
    tempCelcius = Math.round(response.data.main.temp);
    let temperature = response.data.main.temp;
    let citySearch = response.data.name;
    let icon = response.data.weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    let windSpeed = Math.round(response.data.wind.speed * 3.6);
    let humidity = response.data.main.humidity;
    let desc = response.data.weather[0].description;
    let lon = response.data.coord.lon;
    let lat = response.data.coord.lat;
    weatherForecast(lon, lat);


    document.querySelector(".main-icon").setAttribute("src", iconUrl);
    humidityField.innerHTML = humidity + "%";
    windField.innerHTML = windSpeed + "km/h";
    currentDate = ` ${weekDay}, ${monthName} ${dayOfMonth}, ${hour}:${min}, ${desc}`;
    dateHtml.innerHTML = currentDate;


    city.innerHTML = citySearch;
    mainTemp.innerHTML = Math.round(temperature);
  });
}

function changeCity(event) {
  event.preventDefault();
  farenheitSign.classList.remove("active");
  celciusSign.classList.add("active");

  let citySearch = document.querySelector(".form-control").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${APIKey}&units=metric`;

  axios.get(url).then((response) => {
    tempCelcius = Math.round(response.data.main.temp);
    let temperature = response.data.main.temp;
    let citySearch = response.data.name;
    let icon = response.data.weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    let windSpeed = Math.round(response.data.wind.speed * 3.6);
    let humidity = response.data.main.humidity;
    let desc = response.data.weather[0].description;
    let lon = response.data.coord.lon;
    let lat = response.data.coord.lat;
    let country = response.data.sys.country;
    weatherForecast(lon, lat);


    document.querySelector(".main-icon").setAttribute("src", iconUrl);
    humidityField.innerHTML = humidity + "%";
    windField.innerHTML = windSpeed + "km/h";

    currentDate = ` ${weekDay}, ${monthName} ${dayOfMonth}, ${hour}:${min}, ${desc}`;
    dateHtml.innerHTML = currentDate;


    city.innerHTML = `${citySearch}<small style="font-weight:lighter">, ${country}</small>`;

    mainTemp.innerHTML = Math.round(temperature);
  });

}


function setCurrentLoc(event) {

  event.preventDefault();
  farenheitSign.classList.remove("active");
  celciusSign.classList.add("active");

  navigator.geolocation.getCurrentPosition((position) => {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    weatherForecast(lon, lat);
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;

    axios.get(url).then((response) => {
      tempCelcius = Math.round(response.data.main.temp);
      let temperature = response.data.main.temp;
      let citySearch = response.data.name;
      let icon = response.data.weather[0].icon;
      let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      let windSpeed = Math.round(response.data.wind.speed * 3.6);
      let humidity = response.data.main.humidity;
      let desc = response.data.weather[0].description;


      document.querySelector(".main-icon").setAttribute("src", iconUrl);
      humidityField.innerHTML = humidity + "%";
      windField.innerHTML = windSpeed + "km/h";
      currentDate = ` ${weekDay}, ${monthName} ${dayOfMonth}, ${hour}:${min}, ${desc}`;
      dateHtml.innerHTML = currentDate;


      city.innerHTML = citySearch;
      mainTemp.innerHTML = Math.round(temperature);
    });
  });
}


function changeUnits(event) {


  let unit = event.target.id;

  if (unit === "f") {
    let calc = Math.round((tempCelcius * 9) / 5 + 32);
    document.querySelector("#value").innerHTML = calc;
    celciusSign.classList.remove("active");
    farenheitSign.classList.add("active");
  } else {
    document.querySelector("#value").innerHTML = tempCelcius;
    farenheitSign.classList.remove("active");
    celciusSign.classList.add("active");
  }
}



function weatherForecast(lon, lat) {
  let urlAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;

  let forecastField = document.querySelector('#weather-forecast');
  let fieldHTML = "";

  axios.get(urlAPI).then((response) => {

    let forecast = response.data.daily;

    forecast.forEach(function (forecastDay, index) {
      if (index < 5) {
        let timestamp = forecastDay.dt;
        let day = formatDate(timestamp);
        let dayTemp = Math.round(forecastDay.temp.day);
        let nightTemp = Math.round(forecastDay.temp.night);
        let icon = forecastDay.weather[0].icon;

        let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;


        fieldHTML = fieldHTML +
          `<div class="col">
              <div class="card rounded-pill shadow p-3 mb-1 bg-body rounded">
                <div class="card-body">
                  <h4>${day}</h4>
                      <p class="temp-day day">${dayTemp}°C</p>
                      <p class="temp-night night">${nightTemp}°C</p>
                      <p><img class="icon-day day" src=${iconUrl}></img></p>
                      <p><img class="icon night" src=${iconUrl}></img></p>
                </div>
              </div>
            </div>`;
      }
    })

    forecastField.innerHTML = fieldHTML;
  });


}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

btn.addEventListener("click", changeCity);
document.querySelector(".units").addEventListener("click", changeUnits);
document.querySelector("#location").addEventListener("click", setCurrentLoc);
onLoad();
