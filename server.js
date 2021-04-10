'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

const server = express();

const PORT = process.env.PORT || 3000;
server.use(cors());


server.get('/location', locationhandler)
server.get('/weather', weatherHandler)



//localhost:3030/location?city=seattle

function Location(city,dat) {
    this.search_query = city;
    this.formatted_query = dat[0].display_name;
    this.latitude = dat[0].lat;
    this.longitude = dat[0].lon;

}

function Weather(data) {
    this.forecast = data.weather.description;
    this.time = data.valid_date;
}



function locationhandler(req, res) {
    let key = process.env.LOCATION_KEY;
    console.log(req.query,'rrrr');
    let city = req.query.city;
    let url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
    superagent.get(url)
    .then(locationData=>{
        let location=locationData.body;
        let correctLocationData = new Location(city,location);
        res.send(correctLocationData)
    })
    .catch(error => {
        console.error(error);
        res.send(error);
      });
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





server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
