import datetime
import json
import pyrebase
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
# SPDX-FileCopyrightText: 2021 ladyada for Adafruit Industries
# SPDX-License-Identifier: MIT

import time
import board
from digitalio import DigitalInOut, Direction
import adafruit_fingerprint

led = DigitalInOut(board.D13)
led.direction = Direction.OUTPUT


# If using with a computer such as Linux/RaspberryPi, Mac, Windows with USB/serial converter:
# import serial
# uart = serial.Serial("/dev/ttyUSB0", baudrate=57600, timeout=1)

# If using with Linux/Raspberry Pi and hardware UART:
import serial
uart = serial.Serial("/dev/ttyS0", baudrate=57600, timeout=1)

finger = adafruit_fingerprint.Adafruit_Fingerprint(uart)

##################################################

config = {
  "apiKey": "AIzaSyCACFG8oKC5ezD1xL5_-86KnRrteYTI_VQ",
  "authDomain": "doorlock-a0c00.firebaseapp.com",
  "databaseURL": "https://doorlock-a0c00.firebaseio.com",
  "storageBucket": "doorlock-a0c00.appspot.com",
}


firebase = pyrebase.initialize_app(config)
db = firebase.database()

#To serialize the time this function was used
def defaultconverter(o):
  if isinstance(o, datetime.datetime):
      return o.__str__()

#print(encrypt('helo').decode("utf-8"))
firebase_id = list()
user_id = list()
user = list()
user_name = dict()


#firebase  = firebase.FirebaseApplication("https://smart-door-lock-2-default-rtdb.firebaseio.com/",None);
getdata_users = db.child("Users").get()
getdata_admin = db.child("AdminProfiles").get()

#--------------------------------------------------------------------------------------------------------
#IDs and the user names are seprearted from the recieved response. 
#newID stores all the user IDs. It is a list
#IDname is dictionary where key is the ID and value is the username
#--------------------------------------------------------------------------------------------------------
newID=list()
newIDAdmin2=list()
IDname=dict()
for key,value in getdata_admin.val().items():	
	newIDAdmin2.append(key)
	val3=dict()
	val3=value
	k=""
	n=""
	for key2,value2 in val3.items():
		if key2=="UserID":
			k=value2
			newID.append(value2)
		elif key2=="UserName":
			n=value2	
	IDname[k]=n
	
for key,value in getdata_users.val().items():	
	newIDAdmin2.append(key)
	val3=dict()
	val3=value
	k=""
	n=""
	for key2,value2 in val3.items():
		if key2=="UserID":
			k=value2
			newID.append(value2)
		elif key2=="UserName":
			n=value2	
	IDname[k]=n		
#print(IDname)
print(newID)			

''''
Compare the recieved with the list of ID returned from database. Is ID is available
it is considered as avalid access. Send to the Attendance node in the database
with the details of ID, name and time&date. If not it will assumed as unauthorized access
and send used id and date&time to the Unauthorized Access node in the database
json.dumps(now, default = defaultconverter) is used to serialize the date&time
'''



	   

id2 = ""	

def get_fingerprint():
    """Get a finger print image, template it, and see if it matches!"""
    print("Waiting for image...")
    while finger.get_image() != adafruit_fingerprint.OK:
        pass
    print("Templating...")
    if finger.image_2_tz(1) != adafruit_fingerprint.OK:
        return False
    print("Searching...")
    if finger.finger_search() != adafruit_fingerprint.OK:
        return False
    return True


# pylint: disable=too-many-branches
def get_fingerprint_detail():
    """Get a finger print image, template it, and see if it matches!
    This time, print out each error instead of just returning on failure"""
    print("Getting image...", end="", flush=True)
    i = finger.get_image()
    if i == adafruit_fingerprint.OK:
        print("Image taken")
    else:
        if i == adafruit_fingerprint.NOFINGER:
            print("No finger detected")
        elif i == adafruit_fingerprint.IMAGEFAIL:
            print("Imaging error")
        else:
            print("Other error")
        return False

    print("Templating...", end="", flush=True)
    i = finger.image_2_tz(1)
    if i == adafruit_fingerprint.OK:
        print("Templated")
    else:
        if i == adafruit_fingerprint.IMAGEMESS:
            print("Image too messy")
        elif i == adafruit_fingerprint.FEATUREFAIL:
            print("Could not identify features")
        elif i == adafruit_fingerprint.INVALIDIMAGE:
            print("Image invalid")
        else:
            print("Other error")
        return False

    print("Searching...", end="", flush=True)
    i = finger.finger_fast_search()
    # pylint: disable=no-else-return
    # This block needs to be refactored when it can be tested.
    if i == adafruit_fingerprint.OK:
        print("Found fingerprint!")
        return True
    else:
        if i == adafruit_fingerprint.NOTFOUND:
            print("No match found")
        else:
            print("Other error")
        return False


# pylint: disable=too-many-statements
def enroll_finger(location):
    """Take a 2 finger images and template it, then store in 'location'"""
    for fingerimg in range(1, 3):
        if fingerimg == 1:
            print("Place finger on sensor...", end="", flush=True)
        else:
            print("Place same finger again...", end="", flush=True)

        while True:
            i = finger.get_image()
            if i == adafruit_fingerprint.OK:
                print("Image taken")
                break
            if i == adafruit_fingerprint.NOFINGER:
                print(".", end="", flush=True)
            elif i == adafruit_fingerprint.IMAGEFAIL:
                print("Imaging error")
                return False
            else:
                print("Other error")
                return False

        print("Templating...", end="", flush=True)
        i = finger.image_2_tz(fingerimg)
        if i == adafruit_fingerprint.OK:
            print("Templated")
        else:
            if i == adafruit_fingerprint.IMAGEMESS:
                print("Image too messy")
            elif i == adafruit_fingerprint.FEATUREFAIL:
                print("Could not identify features")
            elif i == adafruit_fingerprint.INVALIDIMAGE:
                print("Image invalid")
            else:
                print("Other error")
            return False

        if fingerimg == 1:
            print("Remove finger")
            time.sleep(1)
            while i != adafruit_fingerprint.NOFINGER:
                i = finger.get_image()

    print("Creating model...", end="", flush=True)
    i = finger.create_model()
    if i == adafruit_fingerprint.OK:
        print("Created")
    else:
        if i == adafruit_fingerprint.ENROLLMISMATCH:
            print("Prints did not match")
        else:
            print("Other error")
        return False

    print("Storing model #%d..." % location, end="", flush=True)
    i = finger.store_model(location)
    if i == adafruit_fingerprint.OK:
        print("Stored")
    else:
        if i == adafruit_fingerprint.BADLOCATION:
            print("Bad storage location")
        elif i == adafruit_fingerprint.FLASHERR:
            print("Flash storage error")
        else:
            print("Other error")
        return False

    return True


##################################################

def get_num():
    """Use input() to get a valid number from 1 to 127. Retry till success!"""
    i = 0
    while (i > 127) or (i < 1):
        try:
            i = int(input("Enter ID # from 1-127: "))
        except ValueError:
            pass
    id2= str(i)
    return i


while True:
    print("----------------")
    if finger.read_templates() != adafruit_fingerprint.OK:
        raise RuntimeError("Failed to read templates")
    print("Fingerprint templates:", finger.templates)
    print("e) enroll print")
    print("f) find print")
    print("d) delete print")
    print("----------------")
    c = input("> ")
	
    if c == "e":
        enroll_finger(get_num())
    if c == "f":
        if get_fingerprint():
			#Compare	

                        if id2 in newID:
				#if i==k:
                                now =datetime.datetime.now()
                                name = IDname[id2]
                                data={
					'userid' :id2,
					'date & time' : json.dumps(now, default = defaultconverter),
					'UserName' : name
				}
				
                                print(json.dumps(data, default = defaultconverter))
                                db.child("/Attendance").push(data)
                                print("Attendance added to the database of userid  :"+id2)
				
                        else:
                                now =datetime.datetime.now()
                                data1={
					
					'date & time' : json.dumps(now, default = defaultconverter)
				}
				
                                db.child("/Unauthorized Access").push(data1)
                                print("Unauthorized access ")
                        print("Detected #", finger.finger_id, "with confidence", finger.confidence)
        else:
            print("Finger not found")
            print("Time: ",datetime.datetime.now())
            now =datetime.datetime.now()
            data1={
					
					'date & time' : json.dumps(now, default = defaultconverter)
            }
				
            db.child("/Unauthorized Access").push(data1)
            print("Unauthorized access ")
    if c == "d":
        if finger.delete_model(get_num()) == adafruit_fingerprint.OK:
            print("Deleted!")
        else:
            print("Failed to delete")
	


