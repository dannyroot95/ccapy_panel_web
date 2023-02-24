
var pass = document.getElementById("password")
var mail = document.getElementById("email")

pass.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("btn-login").click();
  }
});

mail.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("btn-login").click();
  }
});

function login(){

    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    if(email != "" && password != ""){

        //document.getElementById("loader").style = "display:block;"
        //document.getElementById("credentials").style = "display:none;"
        document.getElementById("email").disabled = true
        document.getElementById("password").disabled = true
        document.getElementById("btn-login").disabled = true
        

        firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {

            var uid = response.user.uid;
  
            db.collection("users").doc(uid).get().then((snapshot) =>{

              if (snapshot.exists) {

                localStorage.setItem("currentUser",uid)
                localStorage.setItem("currentUserData",JSON.stringify(snapshot.data()))
                
                window.location.href = "/dashboard"

              }else{
                console.log("no existe")
              }

             

            }).catch((error) =>{
              alert("Error : "+error)
              window.location.reload() 
            })
             
        }).catch((error) => {
           
            var errorCode = error.code;
            var errorMessage = error.message;

            //document.getElementById("loader").style = "display:none;"
            //document.getElementById("credentials").style = "display:block;"
            document.getElementById("email").disabled = false
            document.getElementById("password").disabled = false
            document.getElementById("btn-login").disabled = false
  
            if(errorCode == "auth/user-not-found"){
              Swal.fire(
                  'Error!',
                  'Este usuario no existe!',
                  'error'
                )
            }else if(errorCode == "auth/wrong-password"){
              Swal.fire(
                  'Oopss!',
                  'Contraseña incorrecta!',
                  'warning'
                )
            }else{
              Swal.fire(
                  'Oopss!',
                  'Error 404!',
                  'error'
                )
            }
  
            console.log(errorCode +" "+errorMessage)
          });		


    }else{

        Swal.fire(
            'Oopss!',
            'Complete los campos!',
            'warning'
          )

    }

}