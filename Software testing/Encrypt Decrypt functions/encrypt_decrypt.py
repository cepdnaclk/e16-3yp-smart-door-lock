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
	
	
text=encrypt("VIEWDATA")
decrypttext =decrypt("teRPk8A3CX/exkYpn+J68x4Mb6SfQv5iJgHynWvwu7c=")

print(decrypttext.decode("utf-8"))
print(text.decode("utf-8"))