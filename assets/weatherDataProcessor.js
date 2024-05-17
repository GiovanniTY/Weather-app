// weatherDataProcessor.js

/**
 * processWeatherData
 *
 * Processes weather forecast data to extract daily minimum and maximum temperatures.
 *
 * This function takes weather forecast data from the API, organizes it into daily chunks,
 * and calculates the minimum and maximum temperatures for each day.
 *
 * @param {Object} data - The weather forecast data from the API.
 * @returns {Array} - An array of objects, each containing the minimum and maximum temperatures for a day.
 *
 * Example usage:
 * Given forecast data, the function will return an array like:
 * [
 *   { minTemperature: 15, maxTemperature: 25 },
 *   { minTemperature: 14, maxTemperature: 26 },
 *   ...
 * ]
 */
export function processWeatherData(data) {
    // Extract the list of forecast entries from the data object
    const forecasts = data.list;
    
    // Initialize an empty array to hold the processed data for each day
    const daysData = [];
    
    // Loop through the forecast data in chunks of 8 (assuming each chunk represents a day)
    for (let i = 0; i < forecasts.length; i += 8) {
        // Extract a slice of 8 forecast entries (representing one day)
        const dayForecasts = forecasts.slice(i, i + 8);
        
        // Push the day's forecast data into the daysData array
        daysData.push(dayForecasts);
    }
    
    // Map the processed daily data to an array of objects with min and max temperatures
    return daysData.map(dayData => ({
        // Calculate the minimum temperature for the day and round it to the nearest integer
        minTemperature: Math.round(Math.min(...dayData.map(forecast => forecast.main.temp_min))),
        
        // Calculate the maximum temperature for the day and round it to the nearest integer
        maxTemperature: Math.round(Math.max(...dayData.map(forecast => forecast.main.temp_max)))
    }));
}
