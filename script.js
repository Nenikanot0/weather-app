const apiKey = "48bb104291617a800a4282b69c8d7ffa";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const weatherIcon = document.querySelector(".weather-icon");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Cloud") {
            weatherIcon.src = "pictures/cloud.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "pictures/clear-sky.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "pictures/heavy-rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "pictures/cloud.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "pictures/snow.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

    // console.log(data); // See full data in console
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) checkWeather(city);
});

// Optional: Load default weather (if you want)
// checkWeather("Delhi");
