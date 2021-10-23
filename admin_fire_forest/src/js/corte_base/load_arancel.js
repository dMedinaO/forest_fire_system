$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/corte_base/show_arancel.php",
		success: function(response){
			$('.selector-arancel select').html(response).fadeIn();
		}
	});
});

