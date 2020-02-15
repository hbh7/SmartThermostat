var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

var heatControl = new Gpio(17, 'high', {activeLow: true});
var acControl = new Gpio(27, 'high',{activeLow: true});
var fanControl = new Gpio(22, 'high',{activeLow: true});

var heatState = 0;
var acState = 0;
var fanState = 0;

module.exports = {

    heatOn: function() {
        heatState = 1;
        fanControl.writeSync(1);
        heatControl.writeSync(1);
    },

    heatOff: function() {
        heatState = 0;
        if(fanState !== 1) {
            fanControl.writeSync(0);
        }
        heatControl.writeSync(0);
    },

    acOn: function() {
        acState = 1;
        fanControl.writeSync(1);
        acControl.writeSync(1);
    },

    acOff: function() {
        acState = 0;
        if(fanState !== 1) {
            fanControl.writeSync(0);
        }
        acControl.writeSync(0);
    },

    fanOn: function() {
        fanState = 1;
        fanControl.writeSync(1);
    },

    fanOff: function() {
        fanState = 0;
        if(heatState !== 1 && acState !== 1) {
            fanControl.writeSync(0);
        }
    },

};