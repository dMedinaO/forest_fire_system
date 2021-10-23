$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/producto/show_especie.php",
		success: function(response){
			$('.selector-especie select').html(response).fadeIn();
		}
	});
});

