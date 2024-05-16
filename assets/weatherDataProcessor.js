// weatherDataProcessor.js

export function processWeatherData(data) {
    const forecasts = data.list;
    const daysData = [];
    for (let i = 0; i < forecasts.length; i += 8) {
        const dayForecasts = forecasts.slice(i, i + 8);
        daysData.push(dayForecasts);
    }
    return daysData.map(dayData => ({
        minTemperature: Math.round(Math.min(...dayData.map(forecast => forecast.main.temp_min))),
        maxTemperature: Math.round(Math.max(...dayData.map(forecast => forecast.main.temp_max)))
    }));
}