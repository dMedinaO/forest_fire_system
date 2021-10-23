$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/puerto_desembarque/show_pais.php",
		success: function(response){
			$('.selector-pais select').html(response).fadeIn();
		}
	});
});

