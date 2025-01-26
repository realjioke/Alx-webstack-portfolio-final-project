let isCelsius = true;

// Function to get weather data
async function getWeather(city, unit, unitText) {
    const apiKey = '9d96359c542344febfebd20ae1d32cda';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

    document.getElementById('spinner').style.display = 'block';

    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();

        // Display weather info
        const { main, weather } = data;
        const iconCode = weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; // Use higher resolution image

        const weatherDetails = `
            <div class="weather-info" style="font-family: Arial, sans-serif;">
                <h2>${data.name}</h2>
                <img src="${iconUrl}" alt="${weather[0].description}" style="filter: drop-shadow(2px 4px 6px black); filter: brightness(2) contrast(2) saturate(2);" />
                <p>${weather[0].description}</p>
                <p>Temperature: ${main.temp}°${unitText}</p>
                <p>Humidity: ${main.humidity}%</p>
                <p>Pressure: ${main.pressure} hPa</p>
            </div>
        `;

        document.getElementById('weatherResult').innerHTML = weatherDetails;

        // Change background based on weather condition
        const weatherCondition = weather[0].main.toLowerCase();
        const body = document.body;
        if (weatherCondition === 'clear') {
            body.style.backgroundColor = '#87CEEB'; // Sky blue
        } else if (weatherCondition === 'rain') {
            body.style.backgroundColor = '#4682B4'; // Steel blue
        } else if (weatherCondition === 'snow') {
            body.style.backgroundColor = '#FFFFFF'; // White
        } else if (weatherCondition === 'clouds') {
            body.style.backgroundColor = '#B0C4DE'; // Light steel blue
        } else {
            body.style.backgroundColor = '#F0F8FF'; // Light blue
        }

    } catch (error) {
        console.error(error);
        alert('Error fetching weather data: ' + error.message);
    } finally {
        document.getElementById('spinner').style.display = 'none';
    }
}

// Event listener for the "Get Weather" button
document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    if (city === '') {
        alert('Please enter a city name!');
        return;
    }

    const unit = isCelsius ? 'metric' : 'imperial';
    const unitText = isCelsius ? 'Celsius' : 'Fahrenheit';
    getWeather(city, unit, unitText);
});

// Event listener for the "Toggle Units" button
document.getElementById('toggleUnits').addEventListener('click', function() {
    isCelsius = !isCelsius;
    const unit = isCelsius ? 'metric' : 'imperial';
    const unitText = isCelsius ? 'Celsius' : 'Fahrenheit';
    this.textContent = `Switch to ${isCelsius ? 'Fahrenheit' : 'Celsius'}`;
    const city = document.getElementById('city').value;
    if (city !== '') {
        getWeather(city, unit, unitText);
    }
});

// Automatically fetch weather for London on page load
document.addEventListener('DOMContentLoaded', function() {
    getWeather('London', 'metric', 'Celsius');
});

