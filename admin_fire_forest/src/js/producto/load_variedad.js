$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/producto/show_variedad.php",
		success: function(response){
			$('.selector-variedad select').html(response).fadeIn();
		}
	});
});

