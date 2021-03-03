## Firebase security rules 

The Firebase Local Emulator Suite consists of individual service emulators built to accurately mimic the behavior of Firebase services.It enables app to directly connect to these emulators to perform integration testing.Through this we checked whom can access to the data as we set security rules to deny permission for unauthorized access.

## Check UserID validity
Always the  IDs stored in the databse are compared with the ID which is taken by the hardware. So it is importatnt confirm that that process is correctly processing if not the unlocking records will be innacurrate. InputAddendance.py code is used for testing this.


![Test summary](https://github.com/cepdnaclk/e16-3yp-smart-door-lock/blob/main/Images/test%20summary.png)

## Data encryption and Decryption function testing

In the database, userID of each employee and the security status of a Admin is considered as most sensitive data stored in the database as userID is directly connected with hardware components which gives the access to the doors and admin privilages are depend on the security status of a admin. So these data is stored in the database after encryption.

Advanced Encryption Standard <b>(AES)</b> which is a <b>symmentric block ciper</b> is used to encrypt this sensitive data. Encryption function is implemented according to the following specifications.
  - Mode of operation -> CBC
  - Padding ->Zero Padding 
  - Key -> clear key
  
All the hardware configurations are planned to do in python language and Reactjs is used for implementation of web Application.So tests are done to verify that both python and JavaScript functions give the same result in encryption and decryption process.

- encrypt_decrypt.py - python implementation for encryption and decryption process
- encrypt_decrypt.js - JavaScript implementation for encryption and decryption process

![Test summary](https://github.com/cepdnaclk/e16-3yp-smart-door-lock/blob/main/Images/encrypt_test.png)
