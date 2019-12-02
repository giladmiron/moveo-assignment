class Storage {
    constructor() { }

    getDedaultLocations() {
        let locations = localStorage.getItem('locations')
        if (locations) {
            return JSON.parse(locations)
        } else {
            return (
                [
                    { country: 'israel', city: 'jerusalem' },
                    { country: 'germany', city: 'berlin' },
                    { country: 'hungary', city: 'budapest' }
                ]
            )
        }
    }

    updateLocalStorage(data) {
        if (data.length > 0) {
            localStorage.locations = JSON.stringify(data.map(location => ({
                country: location.country,
                city: location.city
            })))
        } else {
            localStorage.removeItem('locations')
        }
    }
}