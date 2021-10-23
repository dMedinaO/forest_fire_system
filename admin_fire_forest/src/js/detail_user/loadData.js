
// Tables-DataTables.js
// ====================================================================
// This file should not be included in your project.
// This is just a sample how to initialize plugins or components.
//
// - ThemeOn.net -



$(window).on('load', function() {

	loadFicha();	
	editar();

});
    // DATA TABLES
    // =================================================================
    // Require Data Tables
    // -----------------------------------------------------------------
    // http://www.datatables.net/
    // =================================================================

    $.fn.DataTable.ext.pager.numbers_length = 5;

    //listamos los datos...
	var loadFicha = function(){

		var user_data = getQuerystring('user');
		var t = $('#clientes_data').DataTable({
	        "responsive": true,
	        "language": idioma_espanol,
	        "dom": '<"newtoolbar">frtip',

					"destroy":true,
					"ajax":{
						"method":"POST",
						"url": "../php/detail_user/showData.php?user="+user_data
					},

					"columns":[
						{"data":"periodo_consultas"},
						{"data":"numero_consultas_mes"},
						{"data":"consultas_desarrolladas_mes"},
						{"data":"fecha_inicio"},
						{"data":"fecha_limite"},
						{"data":"puede_hacer_consultas"},											
						{"data":"puede_hacer_descargas"},
						{"data":"bloquear_acceso_en_caso_morosidad"},
						{"data":"notificar_en_caso_morosidad"},
						{"defaultContent": "<button type='button' class='editar btn btn-primary' data-toggle='modal' data-target='#myModalEditar'><i class='fa fa-pencil-square-o'></i></button>"}									
						
					]
	    });
	    $('#demo-custom-toolbar2').appendTo($("div.newtoolbar"));

		//obtener_id_eliminar("#clientes_data tbody", t);
		obtener_data_editar("#clientes_data tbody", t);
	}

	var obtener_data_editar = function(tbody, table){

		$(tbody).on("click", "button.editar", function(){

			let tr = $(this).parents("tr");
			if ($(tr).is('.child')){
				tr = tr.prev();
			}
			var data = table.row( tr ).data();
			
			var idconfiguracion_acceso = $("#frmEditar #idconfiguracion_acceso").val( data.idconfiguracion_acceso );			
			var periodo_consultas = $("#frmEditar #periodo_consultas").val(data.periodo_consultas);
			var numero_consultas_mes = $("#frmEditar #numero_consultas_mes").val(data.numero_consultas_mes);			

			var numero_consultas_mes = $("#frmEditar #fecha_inicio").val(data.fecha_inicio);			
			var numero_consultas_mes = $("#frmEditar #fecha_limite").val(data.fecha_limite);

		});
	}

	var editar = function(){
		$("#editar-configuracion").on("click", function(){

			var idconfiguracion_acceso = $("#frmEditar #idconfiguracion_acceso").val();			
			var periodo_consultas = $("#frmEditar #periodo_consultas").val();
			var numero_consultas_mes = $("#frmEditar #numero_consultas_mes").val();	
			var habilitar_consultas = $("#frmEditar #habilitar_consultas").val();	
			var habilitar_descargas = $("#frmEditar #habilitar_descargas").val();	
			var habilitar_bloqueo = $("#frmEditar #habilitar_bloqueo").val();	
			var habilitar_notificaciones = $("#frmEditar #habilitar_notificaciones").val();	

			var fecha_inicio = $("#frmEditar #fecha_inicio").val();			
			var fecha_limite = $("#frmEditar #fecha_limite").val();

			$.ajax({
				method: "POST",
				url: "../php/detail_user/editData.php",
				data: {
					"idconfiguracion_acceso"   : idconfiguracion_acceso,
					"periodo_consultas"   : periodo_consultas,
					"numero_consultas_mes" : numero_consultas_mes,
					"habilitar_consultas" : habilitar_consultas,
					"habilitar_descargas" : habilitar_descargas,
					"habilitar_bloqueo" : habilitar_bloqueo,
					"habilitar_notificaciones" : habilitar_notificaciones,
					"fecha_limite" : fecha_limite,
					"fecha_inicio" : fecha_inicio
				}

			}).done( function( info ){

				var json_info = JSON.parse( info );				
				//mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}
//funcion para recuperar la clave del valor obtenido por paso de referencia
function getQuerystring(key) {
	var url_string = window.location;
	var url = new URL(url_string);
	var c = url.searchParams.get(key);
	return c;
};

	var idioma_espanol = {
	    "sProcessing":     "Procesando...",
	    "sLengthMenu":     "Mostrar _MENU_ registros",
	    "sZeroRecords":    "No se encontraron resultados",
	    "sEmptyTable":     "Ningún dato disponible en esta tabla",
	    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
	    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
	    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
	    "sInfoPostFix":    "",
	    "sSearch":         "Buscar:",
	    "sUrl":            "",
	    "sInfoThousands":  ",",
	    "sLoadingRecords": "Cargando...",
	    "oPaginate": {
	        "sFirst":    "Primero",
	        "sLast":     "Último",
	        "sNext":     "Siguiente",
	        "sPrevious": "Anterior"
	    },
	    "oAria": {
	        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
	        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
	    }
	}
