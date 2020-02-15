#!/usr/bin/env python

import time

from luma.led_matrix.device import max7219
from luma.core.interface.serial import spi, noop
from luma.core.virtual import viewport, sevensegment

import sys


def main():
    # create seven segment device
    serial = spi(port=0, device=0, gpio=noop())
    device = max7219(serial, cascaded=1)
    seg = sevensegment(device)

    while True:
        f = open("text.txt","r")
        contents = f.read()
        #print(contents)
        if "stop" in contents:
            print("Python exiting")
            sys.exit()
        else:
            seg.text = contents
            time.sleep(0.5)


if __name__ == '__main__':
    main()