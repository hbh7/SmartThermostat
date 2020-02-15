#!/usr/bin/env python

import time

from luma.led_matrix.device import max7219
from luma.core.interface.serial import spi, noop
from luma.core.virtual import viewport, sevensegment

import sys
import urllib2


def main():
    # create seven segment device
    serial = spi(port=0, device=0, gpio=noop())
    device = max7219(serial, cascaded=1)
    seg = sevensegment(device)

    text = ""
    tries = 0

    while True:
        #f = open("text.txt","r")
        #contents = f.read()

        try: text = urllib2.urlopen('http://localhost:3000/api/segments').read()
        except urllib2.URLError as e:
            tries = tries + 1
            if tries > 2:
                print("Python exiting")
                sys.exit()

        seg.text = text
        time.sleep(0.5)


if __name__ == '__main__':
    main()