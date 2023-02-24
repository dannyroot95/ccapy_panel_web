var staff = []
var filterType = ""

let cacheSt = localStorage.getItem("staff")
let pCache = JSON.parse(cacheSt)


if(pCache == null){

  document.getElementById("loader").style = "display:block;margin-top:14px;"
  getUsersFromDatabase()
  
}else{

  getUsersFromCache()

}



/*===== END API STUDENTS  =====*/ 

$('#password').keyup(function(e) {
  var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
  var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
  var enoughRegex = new RegExp("(?=.{6,}).*", "g");
  if (false == enoughRegex.test($(this).val())) {
          $('#passstrength').html('La contraseña debe contener 6 caracteres como mínimo.');
          document.getElementById("passstrength").style = "font-weight:bold;color:#000;"
  } else if (strongRegex.test($(this).val())) {
          $('#passstrength').className = 'ok';
          $('#passstrength').html('Fuerte!');
          document.getElementById("passstrength").style = "font-weight:bold;color:#0082AF;"
  } else if (mediumRegex.test($(this).val())) {
          $('#passstrength').className = 'alert';
          $('#passstrength').html('Media!');
          document.getElementById("passstrength").style = "font-weight:bold;color:#00AF4A;"
  } else {
          $('#passstrength').className = 'error';
          $('#passstrength').html('Débil!');
          document.getElementById("passstrength").style = "font-weight:bold;color:red;"
  }
  return true;
});


function clearInputs(){
    $('#registerModal').modal('hide')
    document.getElementById("fullname").value = ""
    document.getElementById("dni").value = ""
    document.getElementById("email").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("password").value = ""
    document.getElementById("passstrength").innerHTML = ""
    document.getElementById("progress-div").style = "display:none;"
}


function saveUser(){

    
    let email = document.getElementById("email").value
    var password = document.getElementById("password").value 
    let dni = document.getElementById("dni").value
    let fullname = document.getElementById("fullname").value
    let phone = document.getElementById("phone").value
    var type = document.getElementById("inputGroupSelect01")
    var value = type.options[type.selectedIndex].value
   
    let resultdni = ""
    let resultEmail = ""

    if(email != "" && password != "" && dni != "" && phone != "" && value != "0" && fullname != ""){

      if(password.length >= 6){

        document.getElementById("progress-div").style = "display: block;margin-left: 40px;margin-right: 40px;"
        document.getElementById("dni").disabled = true
        document.getElementById("fullname").disabled = true
        hideElementsOnRegister()

        db.collection("users").where("dni", "==", dni).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            resultdni = doc.data().dni;
            resultEmail = doc.data().email;
          })
  
          if(resultdni == dni){
              Swal.fire(
                  "¡Error!",
                  "Este usuario ya está registrado!",
                  "error"
                )
                document.getElementById("progress-div").style = "display:none;"
                document.getElementById("dni").disabled = false
                document.getElementById("fullname").disabled = false
                showElementsOnRegister()
          }else{

            firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
  
              var idUser = userCredential.user.uid;
            
              var data = {

                  id:idUser,
                  fullname : fullname,
                  dni : dni,
                  type : value,
                  email : email,
                  phone : phone,
                  status_account : 1

              }

             
              db.collection("users").doc(idUser).set(data)
              clearInputs()
              showElementsOnRegister()
 
            Swal.fire(
              "¡Exitoso!",
              "Usuario Registrado!",
              "success"
            )     
   
          }).catch((error) => {
            if(error.code = "auth/email-already-in-use"){
              Swal.fire(
                "Error!",
                "Pruebe con otro correo!",
                "error"
              )     
              showElementsOnRegister()
              document.getElementById("progress-div").style = "display:none;"
              document.getElementById("email").value = ""
              document.getElementById("dni").disabled = false
              document.getElementById("fullname").disabled = false
            }
          })

          }
      })
    }else{

      
      Swal.fire(
        "¡Oopss!",
        "La contraseña debe contener 6 caracteres como mínimo!",
        "warning"
      )   

    }

      
  }else{
    Swal.fire(
      "Hey!",
      "Complete los campos!",
      "warning"
    )
  }
}



function getUsersFromDatabase(){
 
    db.collection("users").onSnapshot((querySnapshot) => {

      let ctx = 0
      let staff = []

        users = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          if(users.length > 0){

            $('#tb-staff').DataTable().destroy()
            $("#tbody").html(
            users
              .map((user) => {

                ctx++

                staff.push(user)

                let type = ""
                if(user.type == "root"){
                  type = "<b style='color:#D4AC0D;'>SUPER ADMINISTRADOR</b>"
                }else if(user.type == "client"){
                  type = "<b style='color:#13723B;'>CLIENTE</b>"
                }else{
                  type = "<b style='color:#641372;'>ADMINISTRADOR</b>"
                }
        
                if(user.address == undefined){
                  address = "SIN DIRECCION REGISTRADA"
                }else{
                  address = user.address
                }

                  return `
                  <tr style="cursor: pointer" onclick="setData('${encodeURIComponent(JSON.stringify(user))}')">

                  <td><strong>${ctx}</strong></td>
                  <td>${user.fullname}</td>
                  <td>${user.dni}</td>
                  <td>${type}</td>
                  <td>${address}</td>
                  </tr>`;
               
              })
              .join("")
          );

          //console.log(students)
          createScriptDatatable()
          localStorage.setItem("staff",JSON.stringify(staff))
          document.getElementById("loader").style = "display:none;"

        }
             

    }, (error) => {
      console.log(error)
  }); 
  
}

function getUsersFromCache(){

  let ctx = 0
  
  $("#tbody").html(

    pCache.map((user) => {

        ctx++

        let type = ""
        let address = ""
        if(user.type == "root"){
          type = "<b style='color:#D4AC0D;'>SUPER ADMINISTRADOR</b>"
        }else if(user.type == "client"){
          type = "<b style='color:#13723B;'>CLIENTE</b>"
        }else{
          type = "<b style='color:#641372;'>ADMINISTRADOR</b>"
        }

        if(user.address == undefined){
          address = "SIN DIRECCION REGISTRADA"
        }else{
          address = user.address
        }

          return `
          <tr style="cursor: pointer" onclick="setData('${encodeURIComponent(JSON.stringify(user))}')">

                  <td><strong>${ctx}</strong></td>
                  <td>${user.fullname}</td>
                  <td>${user.dni}</td>
                  <td>${type}</td>
                  <td>${address}</td>
                  </tr>`;
       
      })
      .join("")
  );

$('#tb-staff').DataTable().destroy()
createScriptDatatable()
getUsersFromDatabase()

}

function setData(user){

  user = JSON.parse(decodeURIComponent(user))
  let device = user.current_device_id
 
  $('#detailModal').modal('show')

   document.getElementById("detail-dni").value = user.dni
   document.getElementById("detail-fullname").innerHTML = user.fullname
   document.getElementById("detail-phone").value = user.phone 
   document.getElementById("detail-address").value = user.address

   if(user.phone != undefined ){
    user.phone = document.getElementById("detail-phone").value
   }else{
    document.getElementById("detail-phone").value = ""
   }

   if(user.address != undefined ){
    user.address = document.getElementById("detail-address").value
   }else{
   document.getElementById("detail-address").value = ""
   }

  
   document.getElementById("footer").innerHTML = ""
   document.getElementById("device").innerHTML = ``

   if(user.type == "admin"){
    document.getElementById("type-user").innerHTML = "<b style='color:#641372;'>ADMINISTRADOR<b/>"
    document.getElementById("footer").innerHTML = `
    <button type="button" class="btn btn-danger" onclick="deleteUser('${user.id}')">Eliminar</button>
    <button type="button" class="btn btn-success" onclick="updateUser('${encodeURIComponent(JSON.stringify(user))}')">Actualizar</button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
    `
   }else if(user.type == "root"){
    document.getElementById("type-user").innerHTML = "<b style='color:#D4AC0D;'>SUPER ADMINISTRADOR</b>"
    document.getElementById("footer").innerHTML = `
    <button type="button" class="btn btn-success" onclick="updateUser('${encodeURIComponent(JSON.stringify(user))}')">Actualizar</button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
    `
   }else{
    if(device != undefined){
      if(device != ""){
     
        document.getElementById("device").innerHTML = `ID de dispositivo sincronizado : <b>${device}</b>`
      }
    }
    document.getElementById("type-user").innerHTML = "<b style='color:#13723B;'>CLIENTE</b>"
    document.getElementById("footer").innerHTML = `
    <button type="button" class="btn btn-success" onclick="updateUser('${encodeURIComponent(JSON.stringify(user))}')">Actualizar</button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
    `
   }

}

function updateUser(data){

  data = JSON.parse(decodeURIComponent(data))

  let phone = document.getElementById("detail-phone").value
  let address = document.getElementById("detail-address").value


  if(phone != "" && address != ""){
    db.collection("users").doc(data.id).update({
      phone : phone,
      address : address
    })
    $('#detailModal').modal('hide')
    Swal.fire(
      "¡Exitoso!",
      "Datos de usuario actualizado!",
      "success"
    )  
  }else{
    Swal.fire(
      "Oopss!",
      "Complete los campos!",
      "info"
    )  
  }

}


function deleteUser(id){
  db.collection("users").doc(id).delete()
  $('#detailModal').modal('hide')
  Swal.fire(
    "¡Exitoso!",
    "Usuario eliminado!",
    "success"
  ) 
}

function createScriptDatatable(){

  $('#tb-students').DataTable({
    language: {
          "decimal": "",
          "emptyTable": "No hay información",
          "info": "Mostrando _START_ a _END_ de _TOTAL_ datos",
          "infoEmpty": "Mostrando 0 to 0 of 0 datos",
          "infoFiltered": "(Filtrado de _MAX_ total datos)",
          "infoPostFix": "",
          "thousands": ",",
          "lengthMenu": "Mostrar _MENU_ datos",
          "loadingRecords": "Cargando...",
          "processing": "Procesando...",
          "search": "Buscar:",
          "zeroRecords": "Sin resultados encontrados",
          "paginate": {
              "first": "Primero",
              "last": "Ultimo",
              "next": "Siguiente",
              "previous": "Anterior"
          }
   },
  
  });

}


function hideElementsOnRegister(){

  document.getElementById("btn-save").disabled = true
  document.getElementById("btn-close-modal").disabled = true

}

function showElementsOnRegister(){

  document.getElementById("btn-close-modal").disabled = false
  document.getElementById("btn-save").disabled = false


}