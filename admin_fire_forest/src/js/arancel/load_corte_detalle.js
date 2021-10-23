$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/arancel/show_corte_detalle.php",
		success: function(response){
			$('.selector-corte_detalle select').html(response).fadeIn();
		}
	});
});

