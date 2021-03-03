from firebase import firebase
from datetime import datetime
from Crypto.Cipher import AES
import base64
from Crypto import Random

BLOCK_SIZE = 16
key = b"1234567890123456" # TODO change to something with more entropy

def pad(data):
    length = BLOCK_SIZE - (len(data) % BLOCK_SIZE)
    return data + chr(length)*length

def unpad(s):
    #return data[:-ord(str(data[-1]))]
	return s[:-ord(s[len(s)-1:])]

def encrypt(message):
    IV = Random.new().read(BLOCK_SIZE)
    aes = AES.new(key, AES.MODE_CBC, IV)
    return base64.b64encode(IV + aes.encrypt(pad(message)))

def decrypt(encrypted):
    encrypted = base64.b64decode(encrypted)
    IV = encrypted[:BLOCK_SIZE]
    aes = AES.new(key, AES.MODE_CBC, IV)
    return unpad(aes.decrypt(encrypted[BLOCK_SIZE:]))

firebase_id = list()
user_id = list()
user = list()
user_name = dict()

firebase_id_admins ={ '-MUhuDj_N71_PJYmyWTt','-MUhuXHEf12whWuULoj9','-MUhunnVOA07kUGAioZt'}

firebase_id_users = {'-MUlOK6Pq_uqBHGuOB5c',
				'-MUlOPkPYzketZIIazGh','-MUn9RhmWAMwQ43oQ8_z'
				}

firebase  = firebase.FirebaseApplication("https://smart-door-lock-2-default-rtdb.firebaseio.com/",None);
getdata_admin = firebase.get('AdminProfiles','');
getdata_users = firebase.get('Users','');

for i in firebase_id_admins:
    user_id.append(decrypt(getdata_admin[i]['UserID']).decode("utf-8"))
    user_name[decrypt(getdata_admin[i]['UserID']).decode("utf-8")]=decrypt(getdata_admin[i]['UserName']).decode("utf-8")

for j in firebase_id_users:
    user_id.append(decrypt(getdata_users[j]['UserID']).decode("utf-8"))
    user_name[decrypt(getdata_users[j]['UserID']).decode("utf-8")]=decrypt(getdata_users[j]['UserName']).decode("utf-8")
	
user = 	{'976843V',
		'976555V',
		'976840R',
		'1000','1001','1002','1003'
		'236542V'}


for i in user:	

	if i in user_id:
		#if i==k:
			now = datetime.now();
			name = user_name[i]
			data={
				'userid' :encrypt( i).decode("utf-8"),
				'date & time' : now,
				'UserName' : encrypt(name).decode("utf-8")
			}
			#count = 1
			result = firebase.post('/Attendance',data)
			print("Attendance added to the database of userid  :"+i)
			print(result)	
		
	else:
		now1 = datetime.now();
		data1={
			'userid' :encrypt(i).decode("utf-8"),
			'date & time' : now1
		}
		result1 = firebase.post('/Unauthorized Access',data1)
		print("Unauthorized access from userid  :"+i)
		print(result1)