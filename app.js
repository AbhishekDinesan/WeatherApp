

const express = require('express');
const request = require("request");
const path = require('path');

const app = express()
const port = 3000

app.engine('pug', require ('pug'). __express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/sendWeatherAPI', (req, res) => {

var options = {
    'method': 'GET',
    'url': 'http://dataservice.accuweather.com/currentconditions/v1/locationKey?locationKey=55073&apikey=dllEhaxrqutyGnakGlmO1vcZxQqykZ9G'
};

request(options, function(error, response){
    if (error) throw new Error(error);
    var weatherResponse = JSON.parse(response.body);
    var weather = weatherResponse[0].WeatherText;
    var temp = weatherResponse[0].Temperature.Metric.Value;
    var unit = weatherResponse[0].Temperature.Metric.Unit;
    var timestamp = weatherResponse[0].LocalObservationDateTime;

    console.log(weatherResponse);
    res.render('weather', {title: 'Weather App', city: "Waterloo, Canada", weather:weather, temp: temp, unit:unit, timestamp:timestamp}) 
});


})

app.get('/', (req, res) => {
res.render('index', {title: 'Weather App', city: "Waterloo, Canada"})   
});

app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`);
});



 
