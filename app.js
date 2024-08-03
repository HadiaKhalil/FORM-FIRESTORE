
    






const Signup = async (e) => {
    e.preventDefault()
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
    try {
  
  
  
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
        //  createusercollection(result.user)
         createusercollection(result.user)
        alert(`welcome ${result.user.email}`)
       
    } catch (err) {
        console.log(err);
        alert(err.message)
        createusercollection(null)
  
    }
  }
  
  const Login = async (e) => {
    e.preventDefault()
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    console.log(email, password);
  
  
    try {
        const result = await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log(result);
        alert(`user is successfulluy login ${result.user.email}`)
    } catch (err) {
        alert(err.message)
  
    }
    
  } 
  
  
  
  
  const LogOut = (e) => {
    e.preventDefault()
    firebase.auth().signOut()

  
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
     getuserinfoRealtime(user.uid)
    
        // getuserinfoRealtime(user.uid)
      console.log(user);
      
      } else {
      
      
        console.log( `user successfully signout`);
        alert(`user successfully signout`)
        getuserinfoRealtime(null)
      }
    })
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  