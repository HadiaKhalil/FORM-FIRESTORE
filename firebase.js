const userDetails = document.querySelector(".userdetail")
const editsprofile = document.getElementById("editsprofile")
function createusercollection(user){
 firebase.firestore()
    .collection("users")
    .doc(user.uid)
    .set({
        uid:user.uid,
        name:user.displayName,
        email:user.email,
        phone:"",
        age:"",
        speciality:"",
        portfolioURL:"",
    })
}


async function getuserinfoRealtime(userID){

    if (userID){
        const userdocRef = await firebase
        .firestore()
        .collection("users")
        .doc(userID)
        userdocRef.onSnapshot((doc)=>{
        if(doc.exists){
         const userinfo = doc.data();
if(userinfo){
            userDetails.innerHTML = `
            <h3 class="hllo"> ${userinfo.name}</h3>
             <h3 class="hllo"> ${userinfo.email}</h3>
              <h3 class="hllo"> ${userinfo.phone}</h3>
              <h3 class="hllo"> ${userinfo.age}</h3>
               <h3 class="hllo"> ${userinfo.speciality}</h3>
              <h3 class="hllo"> ${userinfo.portfolioURL}</h3>
              
            `
            
        
                editsprofile["name"].value = userinfo.name;
                editsprofile["email"].value  = userinfo.email;
                editsprofile["phone"].value  = userinfo.phone;
                editsprofile["age"].value  = userinfo.age;
                editsprofile["speciality"].value  = userinfo.speciality;
                editsprofile["portfolioURL"].value  = userinfo.portfolioURL;
           
}

        }
    })
        }else{
             userDetails.innerHTML = `
            <h3>please login ur account</h3>
            `
        }
            
    }

    
    function userupdate(e){
        e.preventDefault()
       const userDocRefs = firebase
       .firestore()
       .collection("users")
        .doc(firebase.auth().currentUser.uid);
        userDocRefs.update({
            name:editsprofile["name"].value,
            email:editsprofile["email"].value,
            phone:editsprofile["phone"].value,
            age:editsprofile["age"].value,
            speciality:editsprofile["speciality"].value,
            portfolioURL:editsprofile["portfolioURL"].value,

        })
    }




    function uploading (e){
    const uid = firebase.auth().currentUser.uid;
    const fileRef = firebase.storage().ref().child(`/users/${uid}/profile`);
    const uploadTask = fileRef.put(e.target.files[0])

    uploadTask.on('state_changed', 
        (snapshot) => {
         
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          if(progress=='100')alert("uploaded pic")
          
        }, 
        (error) => {
          console.log(error);
        }, 
        () => {
        
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            firebase.auth().currentUser.updateProfile({
                photoURL: downloadURL
              })
          });
        }
      );
}
 