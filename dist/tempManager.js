//save to storage
//get data from local storage
class TempManager {
    constructor() {
        this.data = []
    }

    async getWeather(country, city) {
        let isExist = this.data.find(item => item.country === country && item.city === city)
        if (isExist) {
            return false
        } else {
            let weather = await $.get(`/weather/${country}/${city}`)
            if (weather) {
                this.data.push(weather)
                return 'success'
            } else {
                return false
            }
        }
    }

    deleteWeather(location) {
        this.data = this.data.filter(item => item.city !== location)
    }
}

