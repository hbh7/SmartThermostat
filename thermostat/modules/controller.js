var thermostat = require("../modules/thermostat");
var temperature = require("../modules/temperature");

const controlModes = {
    MANUAL: 'manual',
    SCHEDULE: "schedule"
};

const climateModes = {
    OFF: 'off',
    HEAT: 'heat',
    COOL: 'cool',
};

const fanModes = {
    OFF: 'off',
    ON: 'on',
};

var controlMode = controlModes.SCHEDULE;
var climateMode = climateModes.OFF; // save/load this from a file later
var fanMode = fanModes.OFF; // save/load this from a file later

var targetTemp = -1;
var climateRunning = 0;
var overshootRange = 1;



function watchTemperature() {
    temperature.getTemp().then(function (temp) {

        temp = parseFloat(temp);

        /*console.log();
        console.log("Current temp: " + temp);
        console.log("Target temp: " + targetTemp);
        console.log("Control Mode: " + controlMode);
        console.log("Climate Mode: " + climateMode);
        console.log("Running: " + climateRunning);*/

        if(climateRunning) { // If heat or cool is running, check if it's time to shut off
            if(climateMode === climateModes.HEAT) {
                if(temp > targetTemp + overshootRange) {
                    // Shut off heat
                    console.log("Turning heat off");
                    thermostat.heatOff();
                    climateRunning = 0;
                }
            } else if(climateMode === climateModes.COOL) {
                if(temp < targetTemp - overshootRange) {
                    // Shut off AC
                    console.log("Turning AC off");
                    thermostat.acOff();
                    climateRunning = 0;
                }
            }

        } else { // If not, check if it should be
            if(climateMode === climateModes.HEAT) {
                if(temp < targetTemp - overshootRange) {
                    // Turn on heat
                    console.log("Turning heat on");
                    thermostat.heatOn();
                    climateRunning = 1;
                }
            } else if(climateMode === climateModes.COOL) {
                if(temp > targetTemp + overshootRange) {
                    // Turn off AC
                    console.log("Turning AC on");
                    thermostat.acOn();
                    climateRunning = 1;
                }
            }
        }

    });

}


module.exports = {

    start: function () {
        setInterval(watchTemperature, 3000); // add another 0 later
    },

    setControlMode: function(m) {
        switch (m) {
            case("manual"):
                controlMode = controlModes.MANUAL;
                break;
            case("schedule"):
                controlMode = controlModes.SCHEDULE;
                break;
        }
        watchTemperature();
        return true;

    },

    getControlMode: function() {
        return controlMode;
    },

    setClimateMode: function(m) {
        if(controlMode !== controlModes.MANUAL) {
            return false;
        } else {
            climateRunning = 0;
            thermostat.heatOff();
            thermostat.acOff();
            switch (m) {
                case("heat"):
                    climateMode = climateModes.HEAT;
                    break;
                case("cool"):
                    climateMode = climateModes.COOL;
                    break;
                case("off"):
                    climateMode = climateModes.OFF;
                    break;
            }
            watchTemperature();
            return true;
        }
    },

    getClimateMode: function() {
        return climateMode;
    },

    setFanMode: function(m) {
        if(controlMode !== controlModes.MANUAL) {
            return false;
        } else {
            switch (m) {
                case("on"):
                    fanMode = fanModes.ON;
                    thermostat.fanOn();
                    break;
                case("off"):
                    fanMode = fanModes.OFF;
                    thermostat.fanOff();
                    break;
            }
            return true;
        }
    },

    getFanMode: function() {
        return fanMode;
    },

    setTargetTemp: function(temp) {
        if(controlMode !== controlModes.MANUAL) {
            return false;
        } else {
            targetTemp = parseInt(temp);
            watchTemperature();
            return true;
        }
    },

    getTargetTemp: function() {
        return targetTemp;
    },

};