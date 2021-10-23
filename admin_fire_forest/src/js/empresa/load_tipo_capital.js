$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/empresa/show_tipo_capital.php",
		success: function(response){
			$('.selector-tipo_capital select').html(response).fadeIn();
		}
	});
});

