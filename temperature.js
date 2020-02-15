const sensor = require('ds18b20-raspi');

module.exports = {

    getTemp: async function () {
        return sensor.readSimpleF(1, (err, temp) => {
            if (err) {
                console.log(err);
            } else {
                return temp;
            }
        });
    }

};