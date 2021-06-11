import numpy as np
import cv2
import pickle

face_cascade = cv2.CascadeClassifier('cascades/data/haarcascade_frontalface_alt2.xml')
eye_cascade = cv2.CascadeClassifier('cascades/data/haarcascade_eye.xml')
smile_cascade = cv2.CascadeClassifier('cascades/data/haarcascade_smile.xml')


recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read("./recognizers/face-trainner.yml")

labels = {"person_name": 1}
count_id = {  0 : 1}
with open("pickles/face-labels.pickle", 'rb') as f:
    og_labels = pickle.load(f)
    labels = {v:k for k,v in og_labels.items()}
    count_id = {v:0 for k,v in og_labels.items()}

cap = cv2.VideoCapture(0)

#Photo_compare =True

while(True):
	
    # Capture frame-by-frame
    ret, frame = cap.read()
    gray  = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.5, minNeighbors=5)
	
    for (x, y, w, h) in faces:
    	#print(x,y,w,h)
        roi_gray = gray[y:y+h, x:x+w] #(ycord_start, ycord_end)
        roi_color = frame[y:y+h, x:x+w]
		
        color = (255, 0, 0) #BGR 0-255 
        stroke = 2
        end_cord_x = x + w
        end_cord_y = y + h
        cv2.rectangle(frame, (x, y), (end_cord_x, end_cord_y), color, stroke)

    	# recognize? deep learned model predict keras tensorflow pytorch scikit learn
        id_, conf = recognizer.predict(roi_gray)

        if conf>=4 and conf <= 85:
            if count_id[id_]==0:
                font = cv2.FONT_HERSHEY_SIMPLEX
                name = labels[id_]
                color = (255, 255, 255)
                stroke = 1
                cv2.putText(frame, name, (x-10,y-10), font, 1, color, stroke, cv2.LINE_AA)
                count_id[id_]=1
                print("got access")
				
            else:
                font = cv2.FONT_HERSHEY_SIMPLEX
                name = labels[id_]
                color = (255, 255, 255)
                stroke = 1
                cv2.putText(frame, name, (x-10,y-10), font, 1, color, stroke, cv2.LINE_AA)

        else:
            img_item = "Unauthorized_access.png"
            cv2.imwrite(img_item, roi_color)
            print("Unauthorized_access")
			
    # Display the resulting frame
    cv2.imshow('frame',frame)
		
    Photo_compare = False
    if cv2.waitKey(20) & 0xFF == ord('q'):
        break

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()