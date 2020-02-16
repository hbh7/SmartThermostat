var thermostat = require("../modules/thermostat");
var temperature = require("../modules/temperature");
var display = require("../modules/display/display");

const controlModes = {
    USER: 'user',
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

let setTemp = -1;

const displayCycles = {
    CURRENT: "current",
    SET: "set"
};

let displayCycle = displayCycles.CURRENT;

module.exports = {

    start: function () {

        setInterval(this.updateDisplay, 5000);

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
                            str += setTemp;
                            break;
                        case climateModes.COOL:
                            str += "SEt. C. ";
                            str += setTemp;
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
    }

};