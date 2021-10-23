$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/producto/show_calidad.php",
		success: function(response){
			$('.selector-calidad select').html(response).fadeIn();
		}
	});
});

