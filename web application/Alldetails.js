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
				
				//----------------------------------------------------------
				var personCount=0;
				
				function addItemsToList(contactNo,position,dept,email,name,nic,date,time){
					var ul= document.getElementById('list');
					var header = document.createElement('h2');
					
					var _ContactNumber=document.createElement('li');
					var _Position =document.createElement('li');
					var _Department =document.createElement('li');
					var _email =document.createElement('li');
					var _Name= document.createElement('li');
					var _NIC =document.createElement('li');
					var _Date =document.createElement('li');
					var _Time =document.createElement('li');
					
					header.innerHTML='Person - ' + (++personCount);
					
					_NIC.innerHTML = 'NIC :'+ nic;
					_Name.innerHTML = 'Name :'+ name;
					_email.innerHTML = 'email:'+ email;
					_Department.innerHTML = 'Department :'+dept ;
					_ContactNumber.innerHTML = 'Contact Number:'+contactNo ;
					_Position.innerHTML = 'Position:'+position ;
					_Date.innerHTML = 'Date:'+date ;
					_Time.innerHTML = 'Time:'+time ;
					
					ul.appendChild(header);
					ul.appendChild(_NIC);
					ul.appendChild(_Name);
					ul.appendChild(_email);
					ul.appendChild(_Department);
					ul.appendChild(_ContactNumber);
					ul.appendChild(_Position);
					ul.appendChild(_Date);
					ul.appendChild(_Time);
					
				}
				
				function FetchAllData(){
					firebase.database().ref('Person').once('value',function(snapshot){
						snapshot.forEach(
							function(ChildSnapshot){
								var nic=ChildSnapshot.val().NIC;
								var name =ChildSnapshot.val().Name;
								var email=ChildSnapshot.val().email;
								var dept =ChildSnapshot.val().Department ;
								var contactNo =ChildSnapshot.val().ContactNumber;
								var position =ChildSnapshot.val().Position;
								var date =ChildSnapshot.val().Date;
								var time =ChildSnapshot.val().Time;
								
								addItemsToList(contactNo,position,dept,email,name,nic,date,time);
							}
						);
					});
					
				} 
				
				window.onload(FetchAllData());
				