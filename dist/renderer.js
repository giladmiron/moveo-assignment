class Renderer {
    constructor() { }

    renderData(data) {
            $('#container').append(`
            <div class="city-weather" data-country=${data.country} data-city=${data.city}>
            <img src=${data.countryFlag} alt="country flag" class="country-flag">
            <img src=${data.icon}>
            <h1>${data.title}</h1>
            <p> Temperature: ${data.temperature}</p>
            <p> Humidity:${data.humidity}</p>
            <p> Wind speed: ${data.windSpeed}</p>
            <button class="deleteCity clear-btn-style"><i class="fas fa-trash"></i></button>
            </div>
            `)
    }
}