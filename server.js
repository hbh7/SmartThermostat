const express = require('express');
const app = express();
const port = 3000;

// GPIO Things
var thermostat = require("./thermostat");

app.get('/', function(req, res) {
	res.send('Welcome to the smart thermostat!');
	//res.sendFile('www/' + req.params.file);
});

app.get('*.png', function(req, res) {
	
	res.sendFile('www/' + req.params.file);
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

app.listen(port, () => console.log(`App listening on port ${port}!`));