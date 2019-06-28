//Weather and cloud conditions
//Land elevation
//Traveltime to the base station at the Kennedy Space Center, Cape Canaveral,Florida
//Landing spot photos
//Pubs near landing site

const kennedySpaceCenterLocation = {
    latitude: 28.5022039,
    longitude: -81.1186103
}



function updateWeatherResult(currentWeather) {
    const sunrise__time = document.querySelector('.sunrise__time')
    const sunset__time = document.querySelector('.sunset__time')
    const wind__speed = document.querySelector('.wind__speed')
    const wind__direction = document.querySelector('.wind__direction')
    const temp__current = document.querySelector('.temp__current')
    const temp__feeling = document.querySelector('.temp__feeling')
    const clouds__percentage = document.querySelector('.clouds__percentage')
    const weather__status = document.querySelector('.weather__status')
    const weather__status__icon = document.getElementById('weather__status__icon')
    const visibility__distance = document.querySelector('.visibility__distance')

    sunrise__time.textContent = currentWeather.sunrise;
    sunset__time.textContent = currentWeather.sunset;

    wind__speed.textContent = currentWeather.wind_spd;
    wind__direction.textContent = currentWeather.wind_cdir_full;

    temp__current.textContent = currentWeather.temp;
    temp__feeling.textContent = currentWeather.app_temp;

    clouds__percentage.textContent = currentWeather.clouds;

    weather__status__icon.src = `./icons/${currentWeather.weather.icon}.png`;
    weather__status.textContent = currentWeather.weather.description;

    visibility__distance.textContent = currentWeather.vis;
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function showCurrentAstroids(currentAstroidList) {
    const container=document.getElementById('astroids');
    for (let index = 0; index < 2; index++) {
        const astroid = currentAstroidList[index];

        const asteroidInformation = `<li>` +
            `<p class="astroid__name">${astroid.name.replace('(','').replace(')','')}</p>` +
            `<p class="astroid__specs">` +
            `Estimated Diameter Min(Meters) <span class="astroid__diameter-min">${astroid.estimated_diameter.meters.estimated_diameter_min}</span>` +
            `Estimated Diameter Max(Meters) <span class="astroid__diameter-max">${astroid.estimated_diameter.meters.estimated_diameter_max}</span>` +
            `Is hazardous <span class="astroid__hazardous">${astroid.is_potentially_hazardous_asteroid}</span>` +
            `Approach Date <span class="astroid__approachDate">${astroid.close_approach_data[0].close_approach_date_full}</span>` +
            `Relative velocity(KM) <span class="astroid__velocity-km">${astroid.close_approach_data[0].relative_velocity.kilometers_per_hour}</span>` +
            `Distance(Lunar) <span class="astroid__distance-lunar">${astroid.close_approach_data[0].miss_distance.lunar}</span>` +
            `</p>` +
            `</li>`;

        const domElement = htmlToElement(asteroidInformation);
        container.appendChild(domElement);
    }
}
function updateCurrentEarthImage(imageUrl) {
    let earthImage = document.getElementById('earth__image');
    earthImage.src = imageUrl;
}

function apiBuilder(url) {
    const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

    return fetch(`${corsProxyUrl}${url}`)
}

function getWeatherResult() {
    const apiKey = '1bacdc5c0cdf41399588d7850e5f986b';
    const weatherApiUrl = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&lang=en&units=M&lat=${kennedySpaceCenterLocation.latitude}&lon=${kennedySpaceCenterLocation.longitude}`;

    apiBuilder(weatherApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const currentWeather = response.data[0];
            updateWeatherResult(currentWeather);
        });
}

function getNasaInformation() {
    const apiKey = 'fArABG63x3BcysZqgIafVG2FLM7WVF8iyTf88cph';



    const today = new Date();
    const startDate = today.toISOString().slice(0, 10);

    const url = `https://api.nasa.gov/neo/rest/v1/feed/today?api_key=${apiKey}&detailed=false`
    const imageUrl = `https://api.nasa.gov/EPIC/api/enhanced/date/2019-06-25?api_key=${apiKey}`
    // Account Email: ofaruk.demir@gmail.com
    // Account ID: f77c5555-b8fe-4216-acc4-fda5d4b61eec
    apiBuilder(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const currentAstroidList = response.near_earth_objects[startDate];
            showCurrentAstroids(currentAstroidList);
        });

    apiBuilder(imageUrl).then(function (response) {
        return response.json();
    })
        .then(function (response) {
            const imageName = response[0].image;
            const imageUrl = `https://api.nasa.gov/EPIC/archive/enhanced/2019/06/25/png/${imageName}.png?api_key=${apiKey}`;
            updateCurrentEarthImage(imageUrl);
        });

}

getWeatherResult();
getNasaInformation();