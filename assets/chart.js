import { daysOfWeek } from './date.js';

// Get the current day's index (today)
const todayIndex = new Date().getDay();

// Create an array of labels starting from today's index
const shiftedLabels = [...daysOfWeek.slice(todayIndex), ...daysOfWeek.slice(0, todayIndex)];

/**
 * Creates a weather chart using Chart.js library.
 *
 * This function selects an HTML canvas element, defines the data and configuration for the chart,
 * and then creates a line chart that displays minimum and maximum temperatures.
 */
export function createWeatherChart() {
    // Select the HTML canvas element
    const ctx = document.getElementById('weatherChart').getContext('2d');

    // Define the chart data
    const data = {
        labels: shiftedLabels, // X-axis labels representing days of the week starting from today
        datasets: [{
            label: 'Min Temperature (°C)', // Label for the minimum temperature dataset
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Background color for the min temperature line
            borderColor: 'rgba(255, 99, 132, 1)', // Border color for the min temperature line
            borderWidth: 2, // Width of the line
            data: [20, 22, 18, 21, 19] // Data points for min temperatures
        }, {
            label: 'Max Temperature (°C)', // Label for the maximum temperature dataset
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Background color for the max temperature line
            borderColor: 'rgba(54, 162, 235, 1)', // Border color for the max temperature line
            borderWidth: 2, // Width of the line
            data: [25, 27, 23, 26, 24] // Data points for max temperatures
        }]
    };

    // Define the chart configuration
    const config = {
        type: 'line', // Type of chart
        data: data, // Data for the chart
        options: {
            responsive: true, // Makes the chart responsive to window resizing
            scales: {
                y: {
                    beginAtZero: true, // Y-axis starts at zero
                    ticks: {
                        color: 'white' // Color of the Y-axis labels
                    }
                },
                x: {
                    ticks: {
                        color: 'white' // Color of the X-axis labels
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white' // Color of the legend labels
                    }
                }
            }
        }
    };

    // Create the chart
    const myChart = new Chart(ctx, config);
}
