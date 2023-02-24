
var metrics = localStorage.getItem('metrics')
var cache = JSON.parse(metrics)

if(metrics != null){
            document.getElementById("price_kwh").value = cache.price_kwh
            document.getElementById("res-30").value = cache.price_residential_30
            document.getElementById("res-31").value = cache.price_residential_31
            document.getElementById("res-140").value = cache.price_residential_140
            document.getElementById("no_res").value = cache.price_no_residential
            document.getElementById("charge-res-30").value = cache.price_charge_residential_30
            document.getElementById("charge-res-31").value = cache.price_charge_residential_31
            document.getElementById("charge-res-140").value = cache.price_charge_residential_140
            document.getElementById("charge_no_res").value = cache.price_charge_no_residential
            document.getElementById("int").value = cache.interes
            document.getElementById("ali").value = cache.alicuota
            document.getElementById("mant").value = cache.reconecct
            document.getElementById("law").value = cache.law_28749
            getMetrics()
}else{
    getMetrics()
}



function saveMetrics(){

    let price = document.getElementById("price_kwh").value
    let residential30 = document.getElementById("res-30").value
    let residential31 = document.getElementById("res-31").value
    let residential140 = document.getElementById("res-140").value
    let chargeResidential30 = document.getElementById("charge-res-30").value
    let chargeResidential31 = document.getElementById("charge-res-31").value
    let chargeResidential140 = document.getElementById("charge-res-140").value
    let noResidential = document.getElementById("no_res").value
    let chargeNoResidential = document.getElementById("charge_no_res").value
    let interes = document.getElementById("int").value
    let alicuota = document.getElementById("ali").value
    let mant = document.getElementById("mant").value
    let law = document.getElementById("law").value

    if(price != "" && residential30 != "" && residential31 != "" && residential140 != "" && chargeResidential30 != "" && 
                     chargeResidential31 != "" && chargeResidential140 != ""  && noResidential != "" && chargeNoResidential != ""
                     && interes != "" && alicuota != "" && mant != "" && law != ""){
        var metrics = {
            price_kwh : price,
            price_charge_residential_30 : chargeResidential30,
            price_charge_residential_31 : chargeResidential31,
            price_charge_residential_140 : chargeResidential140,
            price_residential_30 : residential30,
            price_residential_31 : residential31,
            price_residential_140 : residential140,
            price_no_residential : noResidential,
            price_charge_no_residential : chargeNoResidential,
            alicuota : alicuota,
            interes : interes,
            reconecct : mant,
            law_28749 : law
        }
        db.collection('metrics').doc('data').set(metrics)
        
        Swal.fire(
            'Muy bien!',
            'Datos almacenados!',
            'Success'
          )
          localStorage.setItem('metrics',JSON.stringify(metrics))
    }else{
        
        Swal.fire(
            'Oopss!',
            'Complete los campos!',
            'warning'
          )
    }

}

function getMetrics(){
    db.collection('metrics').doc('data').get().then(snapshot =>{

        if(snapshot.exists){

            localStorage.setItem('metrics',JSON.stringify(snapshot.data()))
            document.getElementById("price_kwh").value = snapshot.data().price_kwh
            document.getElementById("res-30").value = snapshot.data().price_residential_30
            document.getElementById("res-31").value = snapshot.data().price_residential_31
            document.getElementById("res-140").value = snapshot.data().price_residential_140
            document.getElementById("no_res").value = snapshot.data().price_no_residential
            document.getElementById("charge-res-30").value = snapshot.data().price_charge_residential_30
            document.getElementById("charge-res-31").value = snapshot.data().price_charge_residential_31
            document.getElementById("charge-res-140").value = snapshot.data().price_charge_residential_140
            document.getElementById("charge_no_res").value = snapshot.data().price_charge_no_residential
            document.getElementById("int").value = snapshot.data().interes
            document.getElementById("ali").value = snapshot.data().alicuota
            document.getElementById("mant").value = snapshot.data().reconecct
            document.getElementById("law").value = snapshot.data().law_28749

        }else{
            
        }

    })
}


function onlyDateNumberString(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
  
      if(date <=9){
        date = "0"+date
      }
    var time = date + '/' + month + '/' + year;
    return time;
  }
  