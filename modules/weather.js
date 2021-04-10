'use strict';


const superagent = require('superagent');

module.exports = weatherHandler;

function Weather(data) {
    this.forecast = data.weather.description;
    this.time = data.valid_date;
}

function weatherHandler(req, res) {
    const gdata = req('./data/weatherbit.json');
    let weatherDaily = [];
    gdata.data.forEach(val => {
        var weatherData = new Weather(val);
        weatherDaily.push(weatherData);
    });
    res.send(weatherDaily);
}

