const renderer = new Renderer
const tempManager = new TempManager

//loadpage function
$(window).ready(() => {
    handleSearch('israel', 'jerusalem')
    handleSearch('germany', 'berlin')
    handleSearch('hungary', 'budapest')
})

//event listeners
$('#submitBtn').on('click', () => {
    let location = getSearchValues()
    handleSearch(location.country, location.city)
})

$(document).keypress(function (event) {
    if (event.code == 'Enter') {
        let location = getSearchValues()
        handleSearch(location.country, location.city)
    }
})

$('#container').on('click', '.deleteCity', deleteCity)

//functions
function getSearchValues() {
    //grab the values
    let country = $('#countryInput').val()
    let city = $('#cityInput').val()
    //turn the values to valid in URL
    country.split(' ').length > 1 ? country = country.replace(/ /g, '-') : null
    city.split(' ').length > 1 ? city = city.replace(/ /g, '-') : null
    //values validation
    if (!country || !city) {
        alert('All fiels muse be full')
        return
    }
    return { country, city }
}

async function handleSearch(country, city) {
    let status = await tempManager.getWeather(country, city)
    status ? renderer.renderData(tempManager.data) : alert('There is a problem - one or more of the fields is invalid or the location is already exists')
    //clear the inputs
    $('#countryInput').val('')
    $('#cityInput').val('')
}

function deleteCity(event) {
    let location = event.target.closest('div').dataset.city
    tempManager.deleteWeather(location)
    renderer.renderData(tempManager.data)
}