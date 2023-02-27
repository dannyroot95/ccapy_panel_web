
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
    document.getElementById("chip").value = ""
    document.getElementById("med").value = ""
    document.getElementById("invoice-med").value = ""
    document.getElementById("date-invoice").value = ""
}
