# SmartThermostat

A flexible and modular smart thermostat system, written in Node.js and Angular. 

Work-in-progress, lots more to come!

![Hardware Front](/repo_resources/hardware-front.jpg)

![Hardware Back](/repo_resources/hardware-back.jpg)

## Features
- Numerous ways of controlling various types of climate control equipment
  - Local Relays
  - Remote relays (such as Shelly, Sonoff, or others)
  - Smart plugs and other smart devices
- Designed to be universal with minor modifications
  - Only requires two wires at the control panel, remotely controls systems
- Securely accessible remote access web UI
- Able to play sounds
- Can perform other functions too if desired, like access a smart home control interface

## Build Instructions

The current hardware choices are subject to change, but in general, you'll want to follow these guidelines to create your own version.

### Hardware Resources
- Raspberry Pi 
  - 3 or better preferred although not strictly necessary.
- Micro SD Card for the Pi
  - At least 32GB, but they're so cheap that you might as well go a fair bit larger for future reuse. 
- A screen
  - I used a 5" touchscreen that runs off of the Pi's DSI port. Lots of options exist in other sizes, display interfaces, etc. that will also work just fine. 
- Any control devices necessary
  - Relays, smart plugs, etc.
- Temperature sensor
  - Info TBD
- Power supply
  - Info TBD
- Power converter
  - Info TBD
- Magnets
  - Info TBD
- Speaker setup
  - Info TBD
- Wire connectors
  - Info TBD
- Screws
  - Info TBD

### Tools
- Soldering Iron
- 3D Printer
- Crimping Tool (optional)
- Superglue

### Hardware Assembly
These instructions will be expanded in the future, but the general process is as follows:
1. If necessary, make any modifications to the 3D models.
2. Use a 3D printer to print out the thermostat chassis and mounting plate.
3. Using the mount points in the thermostat chassis and some screws, mount all components inside the chassis. 
4. Glue the magnets to both prints. 
5. Mount the wall plate to the wall over your existing thermostat wiring hole (or run some new wires and make a new hole)
6. Attach the wire connectors to the existing wires
7. Connect the thermostat to the wall wires
8. Magnetically attach the thermostat to the base.
9. Modify the wires at the source to inject power. More info coming soon.

### Software Setup
1. The Pi can be set up using the OS of your choice, such as the standard [Raspberry Pi OS](https://www.raspberrypi.com/software/). As long as it can run Node.js 16+, any OS will probably work just fine. 
2. Copy the code in the `thermostat` folder somewhere, such as the `pi` user's home directory. 
3. Enter the thermostat folder and install the required packages using `npm install`.
4. Start the thermostat server by running `npm start`. Alternatively, copy the `smart-thermomstat.service` file to `/etc/systemd/system/` to set up a systemd service to automatically run the script on startup. You probably also need to run `sudo systemctl enable smart-thermostat` to enable it.

