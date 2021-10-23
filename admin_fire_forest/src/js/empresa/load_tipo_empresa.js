$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/empresa/show_tipo_empresa.php",
		success: function(response){
			$('.selector-tipo_empresa select').html(response).fadeIn();
		}
	});
});

