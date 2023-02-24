
$('#registerModal').on('show.bs.modal', function (e) {
    $('body').addClass("example-open");
}).on('hide.bs.modal', function (e) {
  $('body').addClass("example-open");
  clearInputsOnHide()
})

$('#detailModal').on('show.bs.modal', function (e) {
  $('body').addClass("example-open");
}).on('hide.bs.modal', function (e) {
$('body').addClass("example-open");
})


function clearInputsOnHide(){
    document.getElementById("fullname").value = ""
    document.getElementById("dni").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("email").value = ""
    document.getElementById("password").value = ""
    document.getElementById("passstrength").innerHTML = ""
    document.getElementById("progress-div").style = "display:none;"
}
