const weatherForm = document.querySelector(".weather-form");
const cityInput = document.getElementById("cityInput");
const weatherDisplayCard = document.querySelector(".weatherDisplayCard");
const apiKey = "6d7b704e228ed7fb7b4c1e114e94b0d3";

weatherForm.addEventListener("submit", async event =>{

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try {

            const weatherData = await getWeatherData(city); 
            displayWeatherInfo(weatherData);
            
        } catch (error) {
            console.log(error);
            displayError(error);
        }
    }else{
        displayError("Please enter a city")
    }

});


async function getWeatherData(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiURL);

    if(!response.ok){
        throw new Error("Could not fetch weathe data")
    }

    return await response.json()
}

function displayWeatherInfo(data){
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;
    weatherDisplayCard.textContent = "";
    weatherDisplayCard.style.display = "flex";
    // weatherDisplayCard.style.height = "100vh";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(1.8 *(temp-273.15)+32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);



    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    weatherDisplayCard.appendChild(cityDisplay)
    weatherDisplayCard.appendChild(tempDisplay);
    weatherDisplayCard.appendChild(humidityDisplay);
    weatherDisplayCard.appendChild(descDisplay);
    weatherDisplayCard.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >=  200 && weatherId < 300):
            return "🌧️";
        case (weatherId >=  300 && weatherId < 400):
            return "🌧️";
        case (weatherId >=  400 && weatherId < 500):
            return "🌧️";
        case (weatherId >=  600 && weatherId < 700):
            return "❄️";
        case (weatherId >=  700 && weatherId < 800):
        return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >=  801 && weatherId < 810):
            return "☁️";
        default:
            return "?";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    weatherDisplayCard.textContent="";
    weatherDisplayCard.style.display = "flex";
    weatherDisplayCard.appendChild(errorDisplay);
}