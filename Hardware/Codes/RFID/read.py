import datetime
import json
import pyrebase
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522

#add firebase configuration details

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
			

''''
Compare the recieved with the list of ID returned from database. Is ID is available
it is considered as avalid access. Send to the Attendance node in the database
with the details of ID, name and time&date. If not it will assumed as unauthorized access
and send used id and date&time to the Unauthorized Access node in the database
json.dumps(now, default = defaultconverter) is used to serialize the date&time
'''
	
user = 	{'976841U',
		'976555V',
		'1000','1001'}

#Compare	
reader=SimpleMFRC522()
try: 
	id,text=reader.read()
	print(id)	
	id2 = str(id)
	

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
			'userid' :id2,
			'date & time' : json.dumps(now, default = defaultconverter)
		}
		
		db.child("/Unauthorized Access").push(data1)
		
finally:
	GPIO.cleanup()		   

