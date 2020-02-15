const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

// Custom Modules
var thermostat = require("./thermostat");
var temperature = require("./temperature");

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'www', 'index.html'));
});

app.get('*.js', function(req, res) {
	res.sendFile(path.join(__dirname, 'www', req.url));
});

app.get('/api/heat/on', function(req, res) {
	res.send('Starting heat!');
	thermostat.heatOn();
});

app.get('/api/heat/off', function(req, res) {
	res.send('Stopping heat!');
	thermostat.heatOff();
});

app.get('/api/ac/on', function(req, res) {
	res.send('Starting AC!');
	thermostat.acOn();
});

app.get('/api/ac/off', function(req, res) {
	res.send('Stopping AC!');
	thermostat.acOff();
});

app.get('/api/fan/on', function(req, res) {
	res.send('Starting fan!');
	thermostat.fanOn();
});

app.get('/api/fan/off', function(req, res) {
	res.send('Stopping fan!');
	thermostat.fanOff();
});

app.get('/api/temperature', function(req, res) {
	//res.status(200).send(temperature.getTemp().toString());

	temperature.getTemp().then(function (temp) {
		res.status(200).send(temp.toString());
	});
});

app.listen(port, () => console.log(`App listening on port ${port}!`));