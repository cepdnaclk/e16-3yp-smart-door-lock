# e16-3yp-smart-door-lock
A project of third year students developing a smart door lock for the entrance.

## Group Members

- Virajani Dharmathilaka   - E/16/086 - e16086@eng.pdn.ac.lk
- Tharushini Jayathilaka   - E/16/156 - e16156@eng.pdn.ac.lk
- Chanika Madushanki       - E/16/223 - e16223@eng.pdn.ac.lk



## Links
* [University of Peradeniya](https://www.pdn.ac.lk/)
* [Faculty of Engineering, University of Peradeniya](https://eng.pdn.ac.lk/) 
* [Department of Computer Engineering, Faculty of Engineering, University of Peradeniya](http://www.ce.pdn.ac.lk/) 

# Introduction

## Problems at Entrance


![problem picture](https://raw.githubusercontent.com/cepdnaclk/e16-3yp-smart-door-lock/main/Images/entrance.jpg)

People who use doors for the entrances face different types of problems when entering. The security level, accuracy and efficiency of the current lock system at the entrance are some major causes for the user problems. 

Therefore by this project we are developing a smart door lock including the following main features.

- Face Recognition
- Finger Print detection
- RFID card reader

In addition to them following features will be included in the smart door lock.

- Unlock record of the current user at the door
- Information display of the current user
- Allowing only one person to enter at a time
- Web Application to control access
- Access at night only for specified persons
# Solution Architecture

## Circuit Diagram

![circuit diagram](https://raw.githubusercontent.com/cepdnaclk/e16-3yp-smart-door-lock/main/Images/Full%20Circuit.png)

# Hardware Components

Details and the uses of the used hardware components

## 1.Raspberry Pi -3

![Raspberry pi -3](https://raw.githubusercontent.com/cepdnaclk/e16-3yp-smart-door-lock/main/Images/Raspberry%20pi.jfif)

- Storage: MicroSD card or via USB-attached storage​
- Wireless: 802.11n Wireless LAN ​
  (Peak transmit/receive throughput of 150Mbps)​
- Camera interface (CSI)​
- Display interface (DSI)​
- Memory: 1GB LPDDR2-900 SDRAM​
- 750mA​

## 2.RFID Sensor 

![RFID](https://raw.githubusercontent.com/cepdnaclk/e16-3yp-smart-door-lock/main/Images/RFID%20sensor.png)

- Fast identification
- low power
- low cost
- pretty rugged

## 3.Fingerprint Sensor

![Fingerprint sensor](https://raw.githubusercontent.com/cepdnaclk/e16-3yp-smart-door-lock/main/Images/Fingerprint.png)

- Durable over an individual's lifetime 
- Difficult to alter
- 3.8V – 7V
- 65mA
- 20 oC to 60 oC

## 4.Solenoid door lock

## 5.16x2 LCD display

![Display](https://raw.githubusercontent.com/cepdnaclk/e16-3yp-smart-door-lock/main/Images/display.png)

## 6.IR Sensors


## Data Flow
 
 Data from the face recognition system, Finger print detection and RFID cards will be sent directly to a web server and the details of the user will be updated while sending them to the information display.
 
 ![Flow Diagram](https://raw.githubusercontent.com/cepdnaclk/e16-3yp-smart-door-lock/main/Images/flow.png)


# Software

## Web application
  Web appliaction is designed to control access to the system. In our web application there are three types of administrator roles.They are,

     - To monitor database
     - To add/update/delete personal data through web application
     - To view all personal details and and their access time
     
 Speciality of this roles is that, each of these administrators able to handle only the given role. It makes the web application more secure. Moreover, 
 Only these persons can login to the web applcation. For the authentication purpose we have added 2 factor authentication.
  
      - By using email and password 
      - Send OTP to predeteremined mobile phone number.

![ER diagram](https://raw.githubusercontent.com/cepdnaclk/e16-3yp-smart-door-lock/main/Images/ERdiagram.png)

## UI design
   ![UI Designs1](https://raw.githubusercontent.com/cepdnaclk/e16-3yp-smart-door-lock/main/Images/UIdesign1.png)
   ![UI Designs2](https://raw.githubusercontent.com/cepdnaclk/e16-3yp-smart-door-lock/main/Images/UIdesign2.png)
  
  
  

 
## Detailed budget

![Budget](https://raw.githubusercontent.com/cepdnaclk/e16-3yp-smart-door-lock/main/Images/budget.png)

* [Visit our github repository](https://github.com/cepdnaclk/e16-3yp-smart-door-lock/) 

## Advising Lecturers
 
- Dr. Isuru Nawinne
- Dr. Ziyan Maraikar
 





