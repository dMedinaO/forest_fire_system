$(document).ready(function () {
	
	$.ajax({
		type: "POST",
		url: "../php/comuna/show_region.php",
		success: function(response){
			$('.selector-region select').html(response).fadeIn();
		}
	});
});

