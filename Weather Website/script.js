const apiKey = "833e41ca7b009b151c10bd31a3c26400";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather--icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").classList.remove("show");
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " KMPH";
        document.querySelector(".description").innerHTML = data.weather[0].description;

        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "Images/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "Images/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "Images/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "Images/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "Images/mist.png";
                break;
            default:
                weatherIcon.src = "Images/default.png";
        }

        document.querySelector(".weather").classList.add("show");
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

checkWeather("Udaipur");
