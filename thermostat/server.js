const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

// Custom Modules
var thermostat = require("./modules/thermostat");
var temperature = require("./modules/temperature");
var controller = require("./modules/controller");

//temperature.start();
controller.start();

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'www', 'index.html'));
});

app.get('*.js', function(req, res) {
	res.sendFile(path.join(__dirname, 'www', req.url));
});

app.get('/api/setcontrolmode/:mode', function(req, res) {
	if(req.params.mode !== "manual" && req.params.mode !== "schedule") {
		res.status(400).send('Invalid mode');
	} else {
		controller.setControlMode(req.params.mode);
		res.status(200).send(req.params.mode + " mode active");
	}
});

app.get('/api/getcontrolmode', function(req, res) {
	res.status(200).send(controller.getControlMode());
});

app.get('/api/setclimatemode/:mode', function(req, res) {
	if(req.params.mode !== "heat" && req.params.mode !== "cool" && req.params.mode !== "off") {
		res.status(400).send('Invalid mode');
	} else {
		if(controller.setClimateMode(req.params.mode)) {
			if(req.params.mode === "off") {
				res.status(200).send("No mode active");
			} else {
				res.status(200).send(req.params.mode + " mode active");
			}
		} else {
			res.status(403).send('Manual mode not active');
		}
	}
});

app.get('/api/getclimatemode', function(req, res) {
	res.status(200).send(controller.getClimateMode());
});

app.get('/api/setfanmode/:mode', function(req, res) {
	if(req.params.mode !== "on" && req.params.mode !== "off") {
		res.status(400).send('Invalid mode');

	} else {
		if(controller.setFanMode(req.params.mode)) {
			res.status(200).send("Fan set to req.params.mode");

		} else {
			res.status(403).send('Manual mode not active');
		}
	}
});

app.get('/api/getfanmode', function(req, res) {
	res.status(200).send(controller.getFanMode());
});

app.get('/api/settargettemp/:temp', function(req, res) {
	if(!Number.isInteger(parseInt(req.params.temp))) {
		res.status(400).send('Invalid temp');

	} else {
		if(controller.setTargetTemp(req.params.temp)) {
			res.status(200).send("Temperature Set");

		} else {
			res.status(403).send('Manual mode not active');
		}
	}
});

app.get('/api/getcurrenttemp', function(req, res) {
	temperature.getTemp().then(function (temp) {
		res.status(200).send(temp.toString());
	});
});

app.get('/api/gettargettemp', function(req, res) {
	res.status(200).send(controller.getTargetTemp().toString());
});

app.get('/api/heat/on', function(req, res) {
	res.status(200).send('Starting heat!');
	thermostat.heatOn();
});

app.get('/api/heat/off', function(req, res) {
	res.status(200).send('Stopping heat!');
	thermostat.heatOff();
});

app.get('/api/ac/on', function(req, res) {
	res.status(200).send('Starting AC!');
	thermostat.acOn();
});

app.get('/api/ac/off', function(req, res) {
	res.status(200).send('Stopping AC!');
	thermostat.acOff();
});

app.get('/api/fan/on', function(req, res) {
	res.status(200).send('Starting fan!');
	thermostat.fanOn();
});

app.get('/api/fan/off', function(req, res) {
	res.status(200).send('Stopping fan!');
	thermostat.fanOff();
});


const server = app.listen(port, () => console.log(`App listening on port ${port}!`));

/*
process.on('SIGINT', () => {
	console.info('SIGINT signal received.');
	server.close(() => {
		console.log('Http server closed.');
		console.log("Exiting");
	});
});*/
