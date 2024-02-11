import dayjs from 'https://cdn.skypack.dev/dayjs@1.10.7';

const saveIP = {ip : ''};
const weatherObj = {temp: '', feels_like: '', temp_min: '', temp_max: ''};
const locationObj = {city : '', country : ''};

//const kelvinToCelcius = value => {return value - 273.15};
const kelvinToCelcius = value => {return ((Number(value) - 273.15).toFixed(0)) + '°C'};

async function weather() {
    await getLocation();
    const API_KEY = '';
    const fetchWeather = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationObj.city},${locationObj.country}&appid=${API_KEY}`);
    const getWeatcherObj = await (await fetchWeather).json();
    weatherObj.temp = kelvinToCelcius(getWeatcherObj.main.temp);
    weatherObj.feels_like = kelvinToCelcius(getWeatcherObj.main.feels_like);
    weatherObj.temp_min = kelvinToCelcius(getWeatcherObj.main.temp_min);
    weatherObj.temp_max = kelvinToCelcius(getWeatcherObj.main.temp_max);
}


async function getIP() {
    const fetchIP = fetch('https://api.ipify.org/?format=json');
    const ipObj = await (await fetchIP).json();
    saveIP.ip = ipObj.ip;
}

async function getLocation() {
    await getIP();
    const fetchLocation = fetch(`https://freeipapi.com/api/json/${saveIP.ip}`);
    const getLocationObj = await (await fetchLocation).json();
    locationObj.city = getLocationObj.cityName;
    locationObj.country = getLocationObj.countryName;
}

const dateObj = {dayName: '',
                    monthName: '',
                    day: '',
                    currentTime: ''
};

function addToObj() {
    dateObj.dayName = dayjs().format('dddd');
    dateObj.monthName = dayjs().format('MMMM');
    dateObj.day = dayjs().format('D');
    dateObj.currentTime = dayjs().format('hh:mm:ss');
}

const varDisplayHTML = () => displayHTML();


function displayHTML() {
    addToObj();
    document.querySelector('.js-day-name')
    .innerHTML = `${dateObj.dayName}`;
    
    document.querySelector('.js-month-day')
    .innerHTML = `${dateObj.monthName} ${dateObj.day}`;
    
    document.querySelector('.js-current-time')
    .innerHTML = `${dateObj.currentTime}`;
    
    
}

async function displayWeatherHTML() {
    await weather();
    document.querySelector('.js-temp')
        .innerHTML = `Current Temperature: ${weatherObj.temp}`;
        
}
    
displayHTML();
displayWeatherHTML();
setInterval(varDisplayHTML, 1000);
