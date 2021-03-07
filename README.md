# e16-3yp-smart-door-lock
A project of third year students developing a smart door lock for the entrance.

## Group Members

- Virajani Dharmathilaka   - E/16/086 - e16086@eng.pdn.ac.lk
- Tharushini Jayathilaka   - E/16/156 - e16156@eng.pdn.ac.lk
- Chanika Madushanki       - E/16/223 - e16223@eng.pdn.ac.lk

* [Visit our website](https://cepdnaclk.github.io/e16-3yp-smart-door-lock/) 
* [Visit our security-system web Application](https://smart-door-lock-2.web.app/) 

## Problems at Entrance

![problem picture](https://github.com/cepdnaclk/e16-3yp-smart-door-lock/blob/main/Images/entrance.jpg)

People who use doors for the entrances face different types of problems when entering. The security level, accuracy and efficiency of the current lock system at the entrance are some major causes for the user problems. 

Therefore by this project, we are developing a smart door lock including the following main features.

- Face Recognition
- Finger Print detection
- RFID card reader

In addition to them following features will be included in the smart door lock.

- Unlock record of the current user at the door
- Information display of the current user
- Allowing only one person to enter at a time
- Web Application to control access
- Access time control

## Data Flow
 
 Data from the face recognition system, Finger print detection and RFID cards will be sent directly to a web server and the details of the user will be updated while sending them to the information display.
 
 ![dataflow](https://github.com/cepdnaclk/e16-3yp-smart-door-lock/blob/main/Images/flow.png)
 
## Software Testing

### Firebase security rules
Database access has controled by applying security rules. So we checked whom can access to the data as we set security rules to deny permission for unauthorized access. The Firebase Local Emulator Suite is used for testing.

### Check UserID validity
Always the  IDs stored in the databse are compared with the ID which is taken by the hardware. So it is importat to confirm that process is correctly processing if not the unlocking records will be innacurrate.

![testsummary1](https://github.com/cepdnaclk/e16-3yp-smart-door-lock/blob/main/Images/test2.png)

### Data encryption and Decryption function testing
 In the database, userID of each employee and the security status of a Admin is considered as most sensitive data stored in the database as userID is directly connected with hardware components which gives the access to the doors and admin privilages are depend on the security status of a admin. So these data is stored in the database after encryption. We have implemented AES encryption decryption functions.
</br> All the hardware configurations are planned to do in python language and Reactjs is used for implementation of web Application.So tests are done to verify that both python and JavaScript functions give the same result in encryption and decryption process.

![testsummary2](https://github.com/cepdnaclk/e16-3yp-smart-door-lock/blob/main/Images/encrypt_test.png)

#### Test 5 - Time taken for encryption and decryption
 Data encryption and decryption may cause the delays in the reliable data transfer to the frontend and hardware components. So we have checked the time taken for that. Actualy   it takes few microseconds. So the effect of delay can be neglegible. Following values may slightly change according to the data we use
   - for encyption = 0:00:00.000782
   - for decryption = 0:00:00.000019

[Know more details about software testing](https://github.com/cepdnaclk/e16-3yp-smart-door-lock/tree/main/Software%20testing)
 
 ## Advising Lecturers
 
- Dr. Isuru Nawinne
- Dr. Ziyan Maraikar
 
 ## Links
* [University of Peradeniya](https://www.pdn.ac.lk/)
* [Faculty of Engineering, University of Peradeniya](https://eng.pdn.ac.lk/) 
* [Department of Computer Engineering, Faculty of Engineering, University of Peradeniya](http://www.ce.pdn.ac.lk/) 
