$(document).ready(function() {

	$('#init_process_load').bootstrapValidator({
				feedbackIcons: {
						valid: 'glyphicon glyphicon-ok',
						invalid: 'glyphicon glyphicon-remove',
						validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
						process_name: {
								validators: {
										notEmpty: {
												message: 'Nombre del proceso es obligatorio'
										}
								}
						},
						ano_carga: {
								validators: {
										notEmpty: {
												message: 'Año de carga es obligatorio'
										}
								}
						}
				}
		}).on('success.form.bv', function(e) {
			e.preventDefault();
			$('#loading').show();
			var process_name = $("#init_process_load #process_name").val();
			var ano_carga = $("#init_process_load #ano_carga").val();
      		var mes_carga = $("#init_process_load #mes_carga").val();
			var tipo_producto = $("#init_process_load #tipo_producto").val();
			
			$.ajax({
				method: "POST",
				url: "../php/carga_datos/createProcess.php",
				data: {
					"process_name"   : process_name,
					"ano_carga"   : ano_carga,
	        		"mes_carga"   : mes_carga,
					"tipo_producto"   : tipo_producto
					
				}
			}).done( function( info ){
				var parse = JSON.parse(info);
				if (parse.response_loader == "BIEN"){

					location.href="step2_loader.php?process_id="+parse.job;

				}else{
					$('#loading').hidden();
					$('#errorResponse').show();
				}
			});
    });

});
