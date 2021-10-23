$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/puerto_embarque/show_pais.php",
		success: function(response){
			$('.selector-pais select').html(response).fadeIn();
		}
	});
});

