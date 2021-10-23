$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/empresa/show_consorcio.php",
		success: function(response){
			$('.selector-consorcio select').html(response).fadeIn();
		}
	});
});

