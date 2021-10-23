$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/arancel/show_producto.php",
		success: function(response){
			$('.selector-producto select').html(response).fadeIn();
		}
	});
});

