'use strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors');

const server = express();




const PORT = process.env.PORT || 3000;
server.use(cors());





server.get('/location',(req,res)=>{
    
    let locaData = require('./data/location.json');
    console.log(locaData);
    let locationData = new Location (locaData);
    console.log(locationData);
    res.send(locationData);
})



function Location (dat) {
    this.search_query= 'Lynnwood';
    this.formatted_query= dat[0].display_name;
    this.latitude=dat[0].lat;
    this.longitude=dat[0].lon;

}

server.get('/weather',(req,res)=>{
    let weatherData = require('./data/weather.json');
    let weather = weatherData.data.map(element=>{
        return new Weather(element);
    })
    res.send(weather);
})

// [
//     {
//       "forecast": "Partly cloudy until afternoon.",
//       "time": "Mon Jan 01 2001"
//     },

function Weather (data){
    this.forecast=data.weather.description;
    this.time=data.valid_date;
}

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})
