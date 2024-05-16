//date.js
export const today = new Date();

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayOfWeek = daysOfWeek[today.getDay()];
console.log("Today is " + dayOfWeek);

export function updateDayTitles() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();
    const dayElements = document.querySelectorAll(".day");
   

    dayElements.forEach((dayElement, index) => {
        const dayIndex = (today + index) % 7;
        dayElement.textContent = daysOfWeek[dayIndex];
    });
}
    