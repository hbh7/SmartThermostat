const { exec } = require("child_process");
const fs = require('fs');

var text = "Starting";

module.exports = {

    start: function() {
        exec("python modules/display/max7219.py &", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    },

    changeText: function(t) {
        text = t.toString();
    },

    getText: function() {
        return text;
    }
};