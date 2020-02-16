var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

var heatControl = new Gpio(17, 'high', {activeLow: true});
var acControl = new Gpio(27, 'high',{activeLow: true});
var fanControl = new Gpio(22, 'high',{activeLow: true});

var heatState = 0;
var acState = 0;
var fanState = 0;

var on = 1;
var off = 0;

module.exports = {

    heatOn: function() {
        this.acOff();
        heatState = on;
        fanControl.writeSync(on);
        heatControl.writeSync(on);
    },

    heatOff: function() {
        heatState = off;
        if(fanState !== on) {
            fanControl.writeSync(off);
        }
        heatControl.writeSync(off);
    },

    acOn: function() {
        this.heatOff();
        acState = on;
        fanControl.writeSync(on);
        acControl.writeSync(on);
    },

    acOff: function() {
        acState = off;
        if(fanState !== on) {
            fanControl.writeSync(off);
        }
        acControl.writeSync(off);
    },

    fanOn: function() {
        fanState = on;
        fanControl.writeSync(on);
    },

    fanOff: function() {
        fanState = off;
        if(heatState !== on && acState !== on) {
            fanControl.writeSync(off);
        }
    },

};