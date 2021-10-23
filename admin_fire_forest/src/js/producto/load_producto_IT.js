$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/producto/show_productoIT.php",
		success: function(response){
			$('.selector-producto_IT select').html(response).fadeIn();
		}
	});
});

