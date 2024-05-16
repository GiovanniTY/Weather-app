import { updateDayTitles} from './date.js';
import { processWeatherData } from './weatherDataProcessor.js';

const apiKey = "60dc88381896f9e6e688047458dc391c";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
const searchBox = document.getElementById("input");
const searchBtn = document.getElementById("btn");
const weatherIcon = document.querySelector(".weather-icon");


// Selezione degli elementi HTML per i giorni della settimana
const dayElements = document.querySelectorAll('.day');

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.city.name;
    document.querySelector(".temp").innerHTML = Math.round(data.list[0].main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.list[0].main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.list[0].wind.speed + "km/h";

    if(data.list[0].weather[0].main ===  "Clouds"){
        weatherIcon.src = "assets/image/clouds.png";
    }
    else if(data.list[0].weather[0].main === "Clear") {
        weatherIcon.src = "assets/image/clear.png";
    }
    else if(data.list[0].weather[0].main === "Rain") {
        weatherIcon.src = "assets/image/rain.png";
    }
    else if(data.list[0].weather[0].main === "Drizzle") {
        weatherIcon.src = "assets/image/drizzle.png";
    }
    else if(data.list[0].weather[0].main === "Mist") {
        weatherIcon.src = "assets/image/mist.png";
    }
    const daysWeatherData = processWeatherData(data);

    dayElements.forEach((dayElement, index) => {
        const { minTemperature, maxTemperature } = daysWeatherData[index];
        
        // Rimozione dei paragrafi delle temperature esistenti
        const existingTemperatureElements = dayElement.querySelectorAll('.temperature');
        existingTemperatureElements.forEach(element => {
            element.remove();
        });
        
        // Creazione del paragrafo per la temperatura minima
        const minTemperatureElement = document.createElement('p');
        minTemperatureElement.textContent = `${minTemperature}°C (min)`;
        minTemperatureElement.classList.add('temperature');
        
        // Creazione del paragrafo per la temperatura massima
        const maxTemperatureElement = document.createElement('p');
        maxTemperatureElement.textContent = `${maxTemperature}°C (max)`;
        maxTemperatureElement.classList.add('temperature');
        
        // Aggiunta dei paragrafi al giorno corrente
        dayElement.appendChild(minTemperatureElement);
        dayElement.appendChild(maxTemperatureElement);
    });
}
updateDayTitles()

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});