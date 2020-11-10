var firebaseConfig = {
					apiKey: "AIzaSyCACFG8oKC5ezD1xL5_-86KnRrteYTI_VQ",
					authDomain: "doorlock-a0c00.firebaseapp.com",
					databaseURL: "https://doorlock-a0c00.firebaseio.com",
					projectId: "doorlock-a0c00",
					storageBucket: "doorlock-a0c00.appspot.com",
					messagingSenderId: "702401593997",
					appId: "1:702401593997:web:be4875fe06d95829f4d8c4"
					
				};
				
				
				 // Initialize Firebase
				firebase.initializeApp(firebaseConfig);
				

const hiddenSocialMediaContainer = 'container socialMedia-container hidden-container';
const phoneContainer = document.querySelector('.phone-container');
const shownPhoneContainer = 'container phone-container shown-container';
const hiddenPhoneContainer = 'container phone-container hidden-container';

const authenticationMethod3 = document.getElementById('method3');
const phoneNumberField = document.getElementById('phoneNumber');;
const codeField = document.getElementById('code');
const labels = document.getElementsByTagName('label');

const signInWithPhoneButton = document.getElementById('signInWithPhone');
const getCodeButton = document.getElementById('getCode');
const signUp = document.getElementById('signUp');
const failureModal = document.querySelector('.failure');


//Necessary part for the firebase built in functions
//It's easier and cleaner to type auth.signInWithEmailAndPassword
//than firebase.auth().signInWithEmailAndPassword
//also it's less repetitive since we are using it more than once
const auth = firebase.auth();

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

recaptchaVerifier.render().then(widgetId => {
  window.recaptchaWidgetId = widgetId;
})

const sendVerificationCode = () => {
  const phoneNumber = '+94 71 012 4847';
  const appVerifier = window.recaptchaVerifier;

  auth.signInWithPhoneNumber(phoneNumber, appVerifier)
  .then(confirmationResult => {
    const sentCodeId = confirmationResult.verificationId;
    signInWithPhoneButton.addEventListener('click', () => signInWithPhone(sentCodeId));
  })
 // alert('verification code sent');
}

const signInWithPhone = sentCodeId => {
  const code = codeField.value;
  const credential = firebase.auth.PhoneAuthProvider.credential(sentCodeId, code);
  auth.signInWithCredential(credential)
  .then(() => {
    window.location.replace('cards.html');
  })
  .catch(error => {
    console.error(error);
  })
}

getCodeButton.addEventListener('click', sendVerificationCode);



//Animations
const initializeInputAnimationState = (fieldName, labelNumber) => {
  if(fieldName.value)
    labels.item(labelNumber).className = 'initial-focused-field'
  else
    labels.item(labelNumber).className = 'initial-unfocused-field'
}




authenticationMethod3.addEventListener('change', () => {
  
 
  phoneContainer.className = shownPhoneContainer
  initializeInputAnimationState(phoneNumberField, 2);
  initializeInputAnimationState(codeField, 3);
});



phoneNumberField.addEventListener('focus', () => {
  if(!phoneNumberField.value)
    labels.item(2).className = "focused-field"
});

codeField.addEventListener('focus', () => {
  if(!codeField.value)
    labels.item(3).className = "focused-field"
})

phoneNumberField.addEventListener('blur', () => {
  if(!phoneNumberField.value)
  labels.item(2).className = "unfocused-field"
})

codeField.addEventListener('blur', () => {
  if(!codeField.value)
  labels.item(3).className = "unfocused-field"
})
				
