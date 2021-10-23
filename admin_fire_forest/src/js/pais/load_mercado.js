$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/pais/show_mercados.php",
		success: function(response){
			$('.selector-mercado select').html(response).fadeIn();
		}
	});
});

