#!/usr/bin/env python
import skywriter
import signal
import alsaaudio
from subprocess import call

display = 1

m = alsaaudio.Mixer('CHARGE2+ - A2DP') 

some_value = 5000

@skywriter.move()

@skywriter.flick()
def flick(start,finish):
	print('Got a flick!', start, finish)
	curr_volume = m.getvolume() 
	if start == 'south' and  curr_volume[0] < 90:
        	m.setvolume(curr_volume[0] + 10)
	elif start == 'north' and curr_volume[0] > 10:
                m.setvolume(curr_volume[0] - 10)

@skywriter.double_tap()
def doubletap(position):
	print('Double tap!', position)
	global display
	if display == 1:
		call(["/usr/bin/vcgencmd", "display_power", "0"])
		display = 0
	else:
		call(["/usr/bin/vcgencmd", "display_power", "1"])
		display = 1

@skywriter.tap()
def tap(position):
  print('Tap!', position)

@skywriter.touch()
def touch(position):
	print('Hello World')
signal.pause()
