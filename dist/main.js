const renderer = new Renderer()
const tempManager = new TempManager()
const storage = new Storage()

//loadpage function
$(window).ready(async () => {
    let defaultLocations = storage.getDedaultLocations()
    defaultLocations.forEach(location => {
        handleSearch(location.country, location.city)
    });
})

//event listeners
$('#submitBtn').on('click', async () => {
    let location = getSearchValues()
    handleSearch(location.country, location.city)
})

$(document).keypress(async function (event) {
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
    status ? renderer.renderData(tempManager.data[tempManager.data.length - 1]) 
    : alert('There is a problem - one or more of the fields is invalid or the location is already exists')
    //clear the inputs
    $('#countryInput').val('')
    $('#cityInput').val('')
    storage.updateLocalStorage(tempManager.data)
}

function deleteCity(event) {
    let location = event.target.closest('div').dataset.city
    event.target.closest('div').remove()
    tempManager.deleteWeather(location)
    storage.updateLocalStorage(tempManager.data)
}