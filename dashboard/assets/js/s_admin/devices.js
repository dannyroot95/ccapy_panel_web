var dt = firebase.database()
var filterType = ""

let cacheSt = localStorage.getItem("devices")
let pCache = JSON.parse(cacheSt)


if(pCache == null){
  document.getElementById("loader").style = "display:block;margin-top:14px;"
  getDevicesFromDatabase()
}else{

  getDevicesFromCache()
  console.log(pCache)

}


function getDevicesFromDatabase(){
    dt.ref("devices").on('value', (snapshot) => {
        let ctx = 1
        let list = []
        $('#tb-staff').DataTable().destroy()
        document.getElementById("tbody").innerHTML = ""
        snapshot.forEach(array => {
            let key = array.key
            let currentData = array.val().current_data
            let config = array.val().config
            
            let parameters = {
                actual_med_read : config.actual_med_read,
                day_invoice : config.day_invoice,
                type_home : config.type_home,
                key : key,
                ampere : currentData.ampere,
                chip_id : currentData.chip_id,
                energy : currentData.energy,
                frequency : currentData.frequency,
                power_factor : currentData.power_factor,
                time : currentData.time,
                voltage : currentData.voltage,
                watts : currentData.watts
            }
            
            list.push(parameters)

            let data = `
            <tr style="cursor: pointer" onclick="setData('${encodeURIComponent(JSON.stringify(parameters))}')">

            <td><strong>${ctx++}</strong></td>
            <td>${parameters.key}</td>
            <td>${parameters.day_invoice}</td>
            <td>${parameters.type_home}</td>
            <td>${parameters.energy+parseInt(parameters.actual_med_read)+" kw/h"}</td>
            </tr>`
            $(data).appendTo("#tbody")
       
        });
        createScriptDatatable()
        localStorage.setItem("devices",JSON.stringify(list))
        document.getElementById("loader").style = "display:none;"
      });
}

function getDevicesFromCache(){

    let ctx = 1

    pCache.forEach(parameters => {
      
      let data = `
      <tr style="cursor: pointer" onclick="setData('${encodeURIComponent(JSON.stringify(parameters))}')">

      <td><strong>${ctx++}</strong></td>
      <td>${parameters.key}</td>
      <td>${parameters.day_invoice}</td>
      <td>${parameters.type_home}</td>
      <td>${parameters.energy+parseInt(parameters.actual_med_read)+" kw/h"}</td>
      </tr>`
      $(data).appendTo("#tbody")
 
  });
    
    $('#tb-staff').DataTable().destroy()
    createScriptDatatable()
    getDevicesFromDatabase()

}

function saveDevice(){
  let chip = document.getElementById("chip").value
  let med_read = document.getElementById("med").value
  let invoice_read = document.getElementById("invoice-med").value
  let date_invoice = document.getElementById("date-invoice").value
  let type_home = document.getElementById("inputGroupSelect01")
  var value = type_home.options[type_home.selectedIndex].value

  if(chip != "" && med_read != "" && invoice_read != "" && date_invoice != "" && value != "0"){

    let config = {
      _reset : "false",
      actual_med_read : med_read,
      actual_read : invoice_read,
      counter : 0,
      day_invoice : date_invoice.replaceAll("-","/").split("/")[2]+"/"+
      date_invoice.replaceAll("-","/").split("/")[1]+"/"+
      date_invoice.replaceAll("-","/").split("/")[0],
      limit : "",
      notify_intelligent : false,
      notify_limit : false,
      type_home : value
    }

    let currentData = {
      ampere : 0,
      chip_id : parseInt(chip),
      energy : 0,
      frequency : 60,
      power_factor : 1,
      time : Date.now(),
      voltage : 220,
      watts : 0
    }


    dt.ref("devices/"+chip+"/config").once('value').then((snapshot) => {

      if(snapshot.exists()){
        Swal.fire(
          "Hey!",
          "Ya existe este dispositivo!",
          "info"
        ) 
      }else{

        dt.ref("devices/"+chip+"/config").set(config)
        dt.ref("devices/"+chip+"/current_data").set(currentData)
        $('#registerModal').modal('hide')
        Swal.fire(
          "¡Exitoso!",
          "Dispositivo registrado!",
          "success"
        ) 
      }
    })
  }else{
    Swal.fire(
      "Hey!",
      "Complete los campos!",
      "info"
    ) 
  }

}

function createScriptDatatable(){

    $('#tb-staff').DataTable({
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

  function setData(device){

    device = JSON.parse(decodeURIComponent(device))
    $('#detailModal').modal('show')

    document.getElementById("detail-chip").innerHTML = "SERIE DE DISPOSITIVO : "+device.key
    document.getElementById("detail-voltage").value = device.voltage+"V"
    document.getElementById("detail-current").value = device.ampere+"A"
    document.getElementById("detail-energy").value = device.energy+"kw/h"
    document.getElementById("detail-frequency").value = device.frequency+"hz"
    document.getElementById("detail-power").value = device.watts+"W"
    document.getElementById("detail-factor").value = device.power_factor+"pf"
    document.getElementById("detail-time").value = onlyDateNumber(device.time)
    document.getElementById("detail-med").value = device.actual_med_read+"kw/h"
    document.getElementById("detail-invoice").value = device.day_invoice
    document.getElementById("detail-home").value = device.type_home

    document.getElementById("footer").innerHTML = ""
    document.getElementById("footer").innerHTML = `
    <button type="button" class="btn btn-danger" onclick="deleteDevice('${device.key}')">Eliminar dispositivo</button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>`

    dt.ref("devices/"+device.key+"/current_data").on('value', (snapshot) => {

      let data = snapshot.val()

      document.getElementById("detail-voltage").value = data.voltage+"V"
      document.getElementById("detail-current").value = data.ampere+"A"
      document.getElementById("detail-energy").value = device.energy+"kw/h"
      document.getElementById("detail-frequency").value = data.frequency+"hz"
      document.getElementById("detail-power").value = data.watts+"W"
      document.getElementById("detail-factor").value = data.power_factor+"pf"
      document.getElementById("detail-time").value = onlyDateNumber(data.time)
      

    })

  }

  function deleteDevice(id){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar! ',
      cancelButtonText: 'No, cancelar! ',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        dt.ref("devices/"+id).remove()
        $('#detailModal').modal('hide')
        swalWithBootstrapButtons.fire(
          'Muy bien!',
          'Se ha eliminado el dispositivo.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado'
        )
      }
    })

  }


  function onlyDateNumber(UNIX_timestamp){
   
    if(parseInt(UNIX_timestamp).toString().length == 10){
      UNIX_timestamp = UNIX_timestamp*1000
    }
    
    var a = new Date(UNIX_timestamp);
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
  
      if(date <=9){
        date = "0"+date
      }
    var time = date + '/' + month + '/' + year;
    return time;
  }