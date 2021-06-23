const sensor = require('ds18b20-raspi');
// https://www.npmjs.com/package/ds18b20-raspi
// Automatically locates the sensor (somehow)

let t = -1;

module.exports = {

    start: function() {
        setInterval(this.updateTemp, 5000);
    },

    getTemp: async function () {
        return t;
    },

    updateTemp: async function () {
        sensor.readSimpleF(1, (err, temp) => {
            if (err) {
                console.log(err);
            } else {
                t = temp;
            }
        });
    }

};