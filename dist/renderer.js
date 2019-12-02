class Renderer {
    constructor() { }

    renderData(data) {
        $('#container').empty()
        data.forEach(location => {
            $('#container').append(`
            <div class="city-weather" data-country=${location.country} data-city=${location.city}>
            <img src=${location.icon}>
            <h1>${location.title}</h1>
            <p> temperature: ${location.temperature}</p>
            <p>humidity:${location.humidity}</p>
            <p> wind speed: ${location.windSpeed}</p>
            <button class="deleteCity clear-btn-style"><i class="fas fa-trash"></i></button>
            </div>
            `)
        })
    }
}