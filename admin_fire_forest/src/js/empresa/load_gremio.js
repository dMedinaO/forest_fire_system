$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/empresa/show_gremios.php",
		success: function(response){
			$('.selector-gremio select').html(response).fadeIn();
		}
	});
});

