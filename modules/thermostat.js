// Function used to check for the existence of certain device module types and enable them if they're installed
function moduleAvailable(name) {
   try {
      require.resolve(name);
      return true;
   } catch(e){}
   return false;
}

// Enable device types as applicable
const TuyAPI = moduleAvailable('tuyapi') ? require('tuyapi') : null;
const kasa = moduleAvailable('tplink-smarthome-api') ? require('tplink-smarthome-api') : null;
const kasaClient = kasa ? new kasa() : null;
const Gpio = moduleAvailable('onoff') ? require('onoff').Gpio : null;

// Define some types to describe different HVAC devices
const controllableDeviceTypes = Object.freeze({
   HEAT: Symbol("heat"),
   AC: Symbol("ac"),
   FAN: Symbol("fan")
});

// Define some control APIs to describe different ways of controlling HVAC devices
const controllableDeviceAPIs = Object.freeze({
   TUYA: Symbol("tuya"),
   KASA: Symbol("kasa"),
   RELAY: Symbol("relay"),
   WEBHOOK: Symbol("webhook")
});

class controllableDevice {
   constructor(type, api, location) {
      // Passed in vars
      this.type = type;
      this.api = api;
      this.location = location;

      // Configure access to the device
      switch(api) {
         case controllableDeviceAPIs.TUYA:
            // TODO: Make functional
            this.device = new TuyAPI({ id: this.location.id, ip: this.location.ip, key: this.location.key });
            // Find device on network
            this.device.find().then(() => {
               // Connect to device
               this.device.connect();
            });
            break;
         case controllableDeviceAPIs.KASA:
            // TODO: Make functional
            this.device = kasaClient.getDevice({ host: this.location.ip });
            break;
         case controllableDeviceAPIs.RELAY:
            // TODO: Make functional
            this.device = new Gpio(location, 'high', {activeLow: true});
            break;
         case controllableDeviceAPIs.WEBHOOK:
            // TODO: Make functional
            this.device = null
            break;
      }

      // Collect the current state (on/off)
      this.state = null;
      this.refreshState()
   }

   async turnOn() {
      switch(this.api) {
         case controllableDeviceAPIs.TUYA:
            // TODO: Make functional
            await this.device.set({dps: 1, set: true});
            break;
         case controllableDeviceAPIs.KASA:
            // TODO: Make functional
            await this.device.setPowerState(true);
            break;
         case controllableDeviceAPIs.RELAY:
            // TODO: Make functional

            break;
         case controllableDeviceAPIs.WEBHOOK:
            // TODO: Make functional

            break;
      }

      this.state = "on";
      return true;
   }

   async turnOff() {
      switch(this.api) {
         case controllableDeviceAPIs.TUYA:
            // TODO: Make functional
            await this.device.set({dps: 1, set: false});
            break;
         case controllableDeviceAPIs.KASA:
            // TODO: Make functional
            await this.device.setPowerState(false);
            break;
         case controllableDeviceAPIs.RELAY:
            // TODO: Make functional

            break;
         case controllableDeviceAPIs.WEBHOOK:
            // TODO: Make functional

            break;
      }
      this.state = "off";
      return true;
   }

   getState () {
      return this.state;
   }

   async refreshState () {
      this.state = "unknown";

      return this.state;
   }
}

// Define our devices. This should probably become a config thing at some point
const controllableDevices = {
   "heat" : new controllableDevice(controllableDeviceTypes.HEAT, controllableDeviceAPIs.WEBHOOK, ["http://10.20.x.x:xxxx/on", "http://10.20.x.x:xxxx/off", "http://10.20.x.x:xxxx/status"]),
   "hunters_ac" : new controllableDevice(controllableDeviceTypes.AC, controllableDeviceAPIs.TUYA, ['xxxxxxxxxxx', '10.20.x.x', 'xxxxxxx']),
   "moms_ac" : new controllableDevice(controllableDeviceTypes.AC, controllableDeviceAPIs.TUYA, ['xxxxxxxxxxx', '10.20.x.x', 'xxxxxxx']),
   "office_ac" : new controllableDevice(controllableDeviceTypes.AC, controllableDeviceAPIs.TUYA, ['xxxxxxxxxxx', '10.20.x.x', 'xxxxxxx'])
}

// Proposed functionality for validating types, this should get moved to the code creating objects of this class
//console.assert(TuyAPI != null)

setTimeout(function() {
   console.log("Attempting to turn off AC");
   controllableDevices.hunters_ac.turnOff();
}, 5000);

setTimeout(function() {
   console.log("Attempting to turn on AC");
   controllableDevices.hunters_ac.turnOn();
}, 10000);



var heatState = 0;
var acState = 0;
var fanState = 0;

var on = 1;
var off = 0;

module.exports = {

    heatOn: function() {
        this.acOff();
        heatState = on;
        //fanControl.writeSync(on);
        heatControl.writeSync(on);
    },

    heatOff: function() {
        heatState = off;
        //if(fanState !== on) {
        //    fanControl.writeSync(off);
        //}
        heatControl.writeSync(off);
    },

    acOn: function() {
        this.heatOff();
        acState = on;
        //fanControl.writeSync(on);
        acControl.writeSync(on);
    },

    acOff: function() {
        acState = off;
        //if(fanState !== on) {
        //    fanControl.writeSync(off);
        //}
        acControl.writeSync(off);
    },

    fanOn: function() {
        fanState = on;
        fanControl.writeSync(on);
    },

    fanOff: function() {
        fanState = off;
        fanControl.writeSync(off);
        //if(heatState !== on && acState !== on) {
        //    fanControl.writeSync(off);
        //}
    },

};