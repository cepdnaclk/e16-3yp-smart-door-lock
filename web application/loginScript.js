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
				
				//_----------------------------------------------------------
				var emailv2,pwv, AdminIdv,emailc,pwc,AdminIdc
				 
				
				function Ready2(){
			
					emailv2 = document.getElementById('Adminemail').value;
					pwv = document.getElementById('AdminPassword').value;
					AdminIdv = document.getElementById('AdminId').value;
				}
				
				
				document.getElementById('login').onclick =function(){
			
				Ready2();
				
				firebase.database().ref('Admin/' + AdminIdv).on('value',function(snapshot){
						//emailc =snapshot.val().email;
						//pwc=snapshot.val().password;
						
						if((document.getElementById('Adminemail').value==snapshot.val().email) && (pwv = document.getElementById('AdminPassword').value==snapshot.val().password)){
							alert('access given');
							
							if(AdminIdv == 'three'){
								alert('You can only check details ');
								window.location.replace('tables.html');
							}
							else{
								alert('You can manage details ');
							window.location.replace('getOTP.html');
							}
							
						}
						else{
							alert('access denied');
						} 
	
					});
				
				firebase.database().ref('Admin/' + 'one').set({
					
					email: emailv2,
					password : pwv
					
				});
			
				}
				