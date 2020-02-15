const { exec } = require("child_process");
const fs = require('fs');

var defaultText = "Starting";
var writing = 0;

module.exports = {

    start: function() {
        this.changeText(defaultText);
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

    changeText: function(text) {

        // Tried to make it so that multiple write requests wouldn't just get merged in the file.
        // Not the greatest solution but it seems okay.

        console.log("Writing: " + text);
        write(text);

        function write(text) {
            if(writing === 1) {

                setTimeout(function () {
                    write(text);
                }, 500);

            } else {

                writing = 1;
                fs.writeFile("text.txt", text, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Written!");
                    writing = 0;
                });

            }
        }

    },

    stop: function() {
        console.log("Stopping display");
        this.changeText("stop");
    }
};