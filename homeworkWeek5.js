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


    document.querySelector(".main-icon").setAttribute("src", iconUrl);
    humidityField.innerHTML = humidity + "%";
    windField.innerHTML = windSpeed + "km/h";
    currentDate = ` ${weekDay}, ${monthName} ${dayOfMonth}, ${hour}:${min}, ${desc}`;
    dateHtml.innerHTML = currentDate;


    city.innerHTML = citySearch;
    mainTemp.innerHTML = Math.round(temperature);
  });

}


function setCurrentLoc(event) {

  event.preventDefault();

  navigator.geolocation.getCurrentPosition((position) => {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
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

btn.addEventListener("click", changeCity);
document.querySelector(".units").addEventListener("click", changeUnits);
document.querySelector("#location").addEventListener("click", setCurrentLoc);
onLoad();



