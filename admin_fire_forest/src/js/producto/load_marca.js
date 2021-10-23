$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/producto/show_marca.php",
		success: function(response){
			$('.selector-marca select').html(response).fadeIn();
		}
	});
});

