$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/arancel/show_corte_base.php",
		success: function(response){
			$('.selector-corte_base select').html(response).fadeIn();
		}
	});
});

