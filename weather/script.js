const apiKey = '674a6020426fe77e872e9ed84c2b56c6'; 

document.getElementById("weatherForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const city = document.getElementById("cityInput").value.trim();
    if(city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const resultDiv = document.getElementById("weatherResult");
    resultDiv.innerHTML = "<div class='spinner-border text-primary' role='status'></div>";
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        // Convert wind speed to km/h
        const windSpeedKmh = (data.wind.speed * 3.6).toFixed(1);
        resultDiv.innerHTML = `
            <div class="weather-card">
                <h3>${data.name}, ${data.sys.country}</h3>
                <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
                <h4>${data.weather[0].main}</h4>
                <p>${data.weather[0].description}</p>
                <h2>${Math.round(data.main.temp)}°C</h2>
                <div>
                    <small>Humidity: ${data.main.humidity}% | Wind: ${windSpeedKmh} km/h</small>
                </div>
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    }
}
