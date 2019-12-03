const express = require('express')
const router = express.Router()

const request = require('request')
const cheerio = require('cheerio')

const BASE_URL = require('../config')

router.get('/weather/:country/:city', (req, res) => {
    let country = req.params.country
    let city = req.params.city
    
    request(`${BASE_URL}/${country}/${city}`, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html)
            let title = $('.pg-title__title').text()
            let temperature = $('#qlook .h2').text()
            let humidity = $('#qfacts .four')[5].next.data
            let windSpeed = $('#qlook p')[1].children[5]? $('#qlook p')[1].children[5].prev.data : "unknown"
            let icon = $('#cur-weather').attr('src')
            let countryFlag = $('.pg-title img').attr('src')
            let weatherData = { country,city,title, temperature, humidity, windSpeed, icon, countryFlag }
            res.send(weatherData)
        } else {
            res.end()
        }
    })
})

module.exports = router
