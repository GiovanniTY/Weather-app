// Export the current date and time as a Date instance
export const today = new Date();

// Export an array containing the abbreviations of the days of the week, from Sunday (Sun) to Saturday (Sat)
export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Calculate the current day of the week based on the current date
const dayOfWeek = daysOfWeek[today.getDay()];
console.log("Today is " + dayOfWeek);

/**
 * updateDayTitles
 *
 * Updates the text content of HTML elements with the class "day" to show the days of the week,
 * starting from the current day.
 *
 * The function selects all elements with the class "day" and updates them to reflect the days
 * of the week in sequence, starting from the current day.
 *
 * Example usage:
 * If today is Tuesday, the first element with the class "day" will contain "Tue", the second "Wed", etc.
 */
export function updateDayTitles() {
    // Define an array of days of the week, from Sunday to Saturday
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    // Get the index of the current day (0 for Sunday, 1 for Monday, etc.)
    const today = new Date().getDay();
    
    // Select all DOM elements with the class "day"
    const dayElements = document.querySelectorAll(".day");
   
    // Update the content of each element with the corresponding day of the week
    dayElements.forEach((dayElement, index) => {
        // Calculate the index of the day of the week to display for the current element
        const dayIndex = (today + index) % 7;
        
        // Set the text content of the element to the corresponding day of the week
        dayElement.textContent = daysOfWeek[dayIndex];
    });
}
