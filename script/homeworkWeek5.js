//Current date and time
let date = new Date;

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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
let month = date.getMonth();
let monthName = months[month];

let dayOfMonth = date.getDate();

let year = date.getFullYear();
let hour = date.getHours();
let min = date.getMinutes();
console.log(hour, min);


let currentDate = ` ${weekDay}, ${monthName} ${dayOfMonth}, ${year}, ${hour}:${min}`;

let dateHtml = document.querySelector('#date');
dateHtml.innerHTML = currentDate;



//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

let city = document.querySelector('.card-title');
let btn = document.querySelector('#search');
let cityInput = document.querySelector('.form-control');
function changeCity(event) {
    event.preventDefault();
    city.innerHTML = cityInput.value;
}

btn.addEventListener("click", changeCity);

//Bonus Feature 
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.


function changeUnits(event) {
    let tempDay = 30;

    let unit = event.target.id;

    if (unit === "f") {
        let calc = tempDay * 9 / 5 + 32;
        document.querySelector('#value').innerHTML = calc;
    }
    else {
        document.querySelector('#value').innerHTML = tempDay;

    }

}

document.querySelector('.units').addEventListener("click", changeUnits);

//koniec poprzedniego 

//Current location 

function handlePosition(position) {
    let lon = position.coords.longitude;
    console.log(lon);
}
function setCurrentLoc(event) {
    event.preventDefault();


    navigator.geolocation.getCurrentPosition(handlePosition);


}

document.querySelector('#location').addEventListener("click", setCurrentLoc);


//Weather API
let APIKey = "8c7ecd85f32f605c8155d5373e494023";

