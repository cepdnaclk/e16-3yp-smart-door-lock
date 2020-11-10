	
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
			var fnamev,lnamev,emailv,NICv,Departmentv,positionv,Contactv,searchv,imgName,imgUrl
			var files=[]
			var reader ; 
			
			function Ready(){
				fnamev = document.getElementById('exampleFirstName').value;
				
				emailv = document.getElementById('exampleInputEmail').value;
				NICv = document.getElementById('exampleInputNIC').value;
				Departmentv = document.getElementById('InputDepartment').value;
				positionv = document.getElementById('InputPosition').value;
				Contactv = document.getElementById('InputContactNo').value;
				searchv = document.getElementById('InputSearch').value;

			
			}
			//---------------insert data-------------------------------------------------------------
			document.getElementById('insert').onclick =function(){
			
				Ready();
				firebase.database().ref('Person/' + NICv).set({
					Name: fnamev,
					email: emailv,
					NIC : NICv,
					Department :Departmentv,
					Position : positionv,
					ContactNumber : Contactv
				});
			
			}
			//-------------------search--------------------------
			
			//snapshot capture small size of data
			document.getElementById('search').onclick =function(){
			
				Ready();
				firebase.database().ref('Person/' + searchv).on('value',function(snapshot){
					document.getElementById('exampleFirstName').value =snapshot.val().Name;
					document.getElementById('exampleInputEmail').value=snapshot.val().email;
					document.getElementById('exampleInputNIC').value=snapshot.val().NIC;
					document.getElementById('InputDepartment').value=snapshot.val().Department;
					document.getElementById('InputPosition').value=snapshot.val().Position;
					document.getElementById('InputContactNo').value=snapshot.val().ContactNumber;
					
				});
			
			}
			
			//-------------------Update--------------------------
			//update only given field
			document.getElementById('update').onclick =function(){
			
				Ready();
				firebase.database().ref('Person/' + searchv).update({
					Name: fnamev,
					email: emailv,
					Department :Departmentv,
					Position : positionv,
					ContactNumber : Contactv
				});
			
			}
			
			//-------------------Delete--------------------------
			document.getElementById('delete').onclick =function(){
			
				Ready();
				firebase.database().ref('Person/' + searchv).remove();
				
			
			}
			//------------------Select image----------------------
		/*	document.getElementById('selectimg').onclick =function(e){
				var input=document.createElement('input');
				input.type ='file';
				//input.click();
				input.onchange = e =>{
					files = e.target.files;
					reader = new FileReader();
					reader.onload =function(){
						document.getElementById('myimg').src =reader.result;
					}
					reader.readAsDataURL(files[0]);
					
					
				}
				input.click(); 
				
			}
			
			//------------------Upload image----------------------
			document.getElementById('uploadimg').onclick =function(){
				imgName =document.getElementById('exampleInputNIC').value;
				var uploadTask = firebase.storage().ref('Images/'+imgName+'.png').put(files[0]);
				
				uploadTask.on('state_changed',function(snapshot)){
					var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
					document.getElementById('upProgress').innerHTML = 'Upload'+progress+'%';
				},
				
				
				function(error){
					alert('error in saving the image');
				},
				function(){
					uploadTask.ref.getElementById().then(function(url){
						ImgUrl =url;
						firebase.database().ref('Pictures/'+imgName).set({
							imgNIC :	imgName,
							Link: ImgUrl
						});
					alert('image added successfully');
					}
					
				);
					
			});
							
							
				
			}  */
				
			
			
			
			
			