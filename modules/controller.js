var thermostat = require("../modules/thermostat");
var temperature = require("../modules/temperature");
var display = require("../modules/display/display");

const controlModes = {
    MANUAL: 'user',
    SCHEDULE: "schedule"
};

const climateModes = {
    OFF: 'off',
    HEAT: 'heat',
    COOL: 'cool',
    FAN: 'fan',
};

let controlMode = controlModes.SCHEDULE;
let climateMode = climateModes.OFF; // save/load this from a file later

let targetTemp = -1;
let running = 0;
let overshootRange = 2;

const displayCycles = {
    CURRENT: "current",
    SET: "set"
};

let displayCycle = displayCycles.CURRENT;


function watchTemperature() {
    temperature.getTemp().then(function (temp) {

        if(running) { // If heat or cool is running, check if it's time to shut off
            if(climateMode === climateModes.HEAT) {
                if(temp > targetTemp + overshootRange) {
                    // Shut off heat
                    thermostat.heatOff();
                }
            } else if(climateMode === climateModes.COOL) {
                if(temp < targetTemp - overshootRange) {
                    // Shut off AC
                    thermostat.acOff();
                }
            }

        } else { // If not, check if it should be
            if(temp < targetTemp - overshootRange) {

            }
        }

    });

}


module.exports = {

    start: function () {

        setInterval(this.updateDisplay, 5000);
        setInterval(watchTemperature, 3000); // add another 0 later

    },

    updateDisplay: function() {
        temperature.getTemp().then(function(temp) {

            let str = "";

            switch(displayCycle) {
                case displayCycles.CURRENT:
                    str = "CUr.  ";
                    str += temp;
                    displayCycle = displayCycles.SET;
                    break;

                case displayCycles.SET:
                    switch(climateMode) {
                        case climateModes.HEAT:
                            str += "SEt. H. ";
                            str += targetTemp;
                            break;
                        case climateModes.COOL:
                            str += "SEt. C. ";
                            str += targetTemp;
                            break;
                        case climateModes.FAN:
                            str += "FAn On";
                            break;
                        case climateModes.OFF:
                            str += "Sys. OFF";
                            break;
                    }
                    displayCycle = displayCycles.CURRENT;
            }

            display.changeText(str.toString());
        });
    },

    setMode: function(m) {
        if(controlMode !== controlModes.MANUAL) {
            return false;
        } else {
            switch (m) {
                case("heat"):
                    climateMode = climateModes.HEAT;
                    break;
                case("cool"):
                    climateMode = climateModes.COOL;
                    break;
                case("fan"):
                    climateMode = climateModes.FAN;
                    break;
                case("off"):
                    climateMode = climateModes.OFF;
                    break;
            }
            return true;
        }
    },

    setTemp: function(temp) {
        targetTemp = temp;
    }

};