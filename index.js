const API_KEY = `63c3cf14c4c8a26573d6f9e419a2784c`;

const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");
const cityName = document.querySelector("#city-name"); // Select city name element

const getWeather = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            weather.innerHTML = `<h3>City not found. Please try again!</h3>`;
        } else {
            showWeather(data);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weather.innerHTML = `<h3>Failed to fetch data. Please try again later.</h3>`;
    }
};

const showWeather = (data) => {
    console.log(data);

    // Get weather details
    const temperature = data.main.temp;
    const condition = data.weather[0].main; // Fix: Correct access to weather condition
    const city = data.name;
    const weatherIcon = data.weather[0].icon; // Get weather icon code from API

    // Update city name dynamically
    cityName.textContent = `City: ${city}`;

    // Update weather details
    weather.innerHTML = `
        <div>  
            <h2 id="temp">${temperature} &degC</h2>
        </div>
        <div>
            <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${condition}">
            <h4>${condition}</h4>    
        </div>
    `;
};

// Event listener for form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const city = search.value.trim();
    if (city) {
        getWeather(city);
    }
});
