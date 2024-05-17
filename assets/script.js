import { updateDayTitles} from './date.js';
import { processWeatherData } from './weatherDataProcessor.js';
import { createWeatherChart } from './chart.js';

createWeatherChart();

// API key for OpenWeatherMap
const apiKey = "60dc88381896f9e6e688047458dc391c";
// Base URL for OpenWeatherMap API
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
// API key for Unsplash
const unsplashApiKey = "P4hgzqK6_4lz-w6BJGpRC8IbDvbnyNZ5L3kJ7LfhDhk";

// Select HTML elements
const dayElements = document.querySelectorAll('.day');
const searchBox = document.getElementById("input");
const searchBtn = document.getElementById("btn");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDiv = document.querySelector('.card');

/**
 * Sets the background image based on the city using the Unsplash API.
 * @param {string} city - The city name.
 */
async function setBackground(city) {
    const unsplashApiUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}&client_id=${unsplashApiKey}`;

    try {
        const response = await fetch(unsplashApiUrl);
        const data = await response.json();
        
        if (data.results.length > 0) {
            imageUrl = data.results[0].urls.regular; // Assign the value
            weatherDiv.style.backgroundImage = `url(${imageUrl})`;
            weatherDiv.style.backgroundSize = 'cover'; // Resize the image to cover the available space
            weatherDiv.style.backgroundPosition = 'center'; // Center the image
            weatherDiv.style.backgroundRepeat = 'no-repeat'; // Prevent image repetition
            weatherDiv.style.zIndex = '-9'; // Set z-index value to -9

        } else {
            console.error("No image found for the specified city.");
        }
    } catch (error) {
        console.error("Error fetching background image:", error);
    }
}

/**
 * Fetches weather data from the OpenWeatherMap API for the specified city.
 * @param {string} city - The city name.
 */
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.city.name;
    document.querySelector(".temp").innerHTML = Math.round(data.list[0].main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.list[0].main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.list[0].wind.speed + "km/h";

    // Update the chart with new data
    const weatherForecastData = processWeatherData(data);
    updateWeatherChart(weatherForecastData);

    /**
     * Updates the weather chart with new data.
     * @param {Array} weatherData - The processed weather data.
     */
    function updateWeatherChart(weatherData) {
        const minTemperatures = weatherData.map(day => day.minTemperature);
        const maxTemperatures = weatherData.map(day => day.maxTemperature);

        const myChart = Chart.getChart('weatherChart');
        myChart.data.datasets[0].data = minTemperatures;
        myChart.data.datasets[1].data = maxTemperatures;
        myChart.update();
    }

    // Set weather icon based on weather condition
    if (data.list[0].weather[0].main ===  "Clouds") {
        weatherIcon.src = "assets/image/clouds.png";
    } else if (data.list[0].weather[0].main === "Clear") {
        weatherIcon.src = "assets/image/clear.png";
    } else if (data.list[0].weather[0].main === "Rain") {
        weatherIcon.src = "assets/image/rain.png";
    } else if (data.list[0].weather[0].main === "Drizzle") {
        weatherIcon.src = "assets/image/drizzle.png";
    } else if (data.list[0].weather[0].main === "Mist") {
        weatherIcon.src = "assets/image/mist.png";
    }

    const daysWeatherData = processWeatherData(data);

    // Update day-wise temperature display
    dayElements.forEach((dayElement, index) => {
        const { minTemperature, maxTemperature } = daysWeatherData[index];
        
        // Remove existing temperature paragraphs
        const existingTemperatureElements = dayElement.querySelectorAll('.temperature');
        existingTemperatureElements.forEach(element => {
            element.remove();
        });
        
        // Create new temperature paragraphs
        const minTemperatureElement = document.createElement('p');
        minTemperatureElement.textContent = `${minTemperature}°C (min)`;
        minTemperatureElement.classList.add('temperature');
        
        const maxTemperatureElement = document.createElement('p');
        maxTemperatureElement.textContent = `${maxTemperature}°C (max)`;
        maxTemperatureElement.classList.add('temperature');
        
        // Append new temperature paragraphs to the day element
        dayElement.appendChild(minTemperatureElement);
        dayElement.appendChild(maxTemperatureElement);
    });
}

// Initialize day titles
updateDayTitles();

// Event listener for search button click
searchBtn.addEventListener("click", () => {
    const city = searchBox.value;
    saveCityToLocalStorage(city);
    checkWeather(city);
    setBackground(city);
});

// Check for saved city in local storage when the application loads
window.addEventListener('load', () => {
    const savedCity = getCityFromLocalStorage();
    if (savedCity) {
        // If a saved city is found, perform weather check for that city
        checkWeather(savedCity);
    }
});

/**
 * Saves the selected city to local storage.
 * @param {string} city - The city name.
 */
function saveCityToLocalStorage(city) {
    localStorage.setItem('selectedCity', city);
}

/**
 * Retrieves the selected city from local storage.
 * @returns {string} - The city name.
 */
function getCityFromLocalStorage() {
    return localStorage.getItem('selectedCity');
}
