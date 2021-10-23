$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/aduana/show_puerto_embarque.php",
		success: function(response){
			$('.selector-puerto_embarque select').html(response).fadeIn();
		}
	});
});

