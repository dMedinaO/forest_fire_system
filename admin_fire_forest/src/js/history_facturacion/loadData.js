
// Tables-DataTables.js
// ====================================================================
// This file should not be included in your project.
// This is just a sample how to initialize plugins or components.
//
// - ThemeOn.net -



$(window).on('load', function() {

	listar();
	guardar();
	eliminar();
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
		var listar = function(){
		var user_id = getQuerystring('user');
	    var t = $('#clientes_data').DataTable({
	        "responsive": true,
	        "language": idioma_espanol,
	        "dom": '<"newtoolbar">frtip',

					"destroy":true,
					"ajax":{
						"method":"POST",
						"url": "../php/history_facturacion/showData.php?user="+user_id
					},

					"columns":[
						{"data":"periodo_pago"},
						{"data":"fecha_facturacion"},
						{"data":"fecha_pago"},						
						{"data":"diferencia_dias"},
						{"data":"status_actual"},
						{"data":"created_historial_facturacion"},
						{"data":"modified_historial_facturacion"},						
						{"defaultContent": "<button type='button' class='editar btn btn-primary' data-toggle='modal' data-target='#myModalEditar'><i class='fa fa-pencil-square-o'></i></button>	<button type='button' class='eliminar btn btn-danger' data-toggle='modal' data-target='#modalEliminar' ><i class='fa fa-trash-o'></i></button>"}
					]
	    });
	    $('#demo-custom-toolbar2').appendTo($("div.newtoolbar"));

		obtener_id_eliminar("#clientes_data tbody", t);
		obtener_data_editar("#clientes_data tbody", t);
	}

	var obtener_id_eliminar = function(tbody, table){
		$(tbody).on("click", "button.eliminar", function(){

			let tr = $(this).parents("tr");
			if ($(tr).is('.child')){
				tr = tr.prev();
			}
			var data = table.row( tr ).data();
			
			var idhistorial_facturacion = $("#frmEliminar #idhistorial_facturacion").val( data.idhistorial_facturacion );
		});
	}

	var obtener_data_editar = function(tbody, table){
		$(tbody).on("click", "button.editar", function(){

			let tr = $(this).parents("tr");
			if ($(tr).is('.child')){
				tr = tr.prev();
			}
			var data = table.row( tr ).data();
			
			var idhistorial_facturacion = $("#frmEditar #idhistorial_facturacion").val( data.idhistorial_facturacion );
			var periodo = $("#frmEditar #periodo").val(data.periodo_pago);
			var fecha = $("#frmEditar #fecha").val(data.fecha_facturacion);
			var fecha_pago = $("#frmEditar #fecha_pago").val(data.fecha_pago);			

		});
	}

	var eliminar = function(){
		$("#eliminar-periodo").on("click", function(){
			var idhistorial_facturacion = $("#frmEliminar #idhistorial_facturacion").val();
			$.ajax({
				method:"POST",
				url: "../php/history_facturacion/removeData.php",
				data: {
						"idhistorial_facturacion": idhistorial_facturacion
					  }
			}).done( function( info ){
				var json_info = JSON.parse( info );				
				location.reload(true);
			});
		});
	}

	var editar = function(){
		$("#editar-periodo").on("click", function(){

			var idhistorial_facturacion = $("#frmEditar #idhistorial_facturacion").val();
			var periodo = $("#frmEditar #periodo").val();
			var fecha = $("#frmEditar #fecha").val();
			var fecha_pago = $("#frmEditar #fecha_pago").val();
			var status_factura = $("#frmEditar #status_factura").val();

			$.ajax({
				method: "POST",
				url: "../php/history_facturacion/editData.php",
				data: {
					"idhistorial_facturacion"   : idhistorial_facturacion,
					"periodo"   : periodo,
					"fecha" : fecha,
					"fecha_pago" : 	fecha_pago,
					"status_factura" : status_factura		
				}

			}).done( function( info ){

				var json_info = JSON.parse( info );				
				//mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var guardar = function(){
		$("#agregar-periodo").on("click", function(){

			var periodo = $("#frmAgregar #periodo").val();
			var fecha = $("#frmAgregar #fecha").val();
			var fecha_pago = $("#frmAgregar #fecha_pago").val();
			var user_id = getQuerystring('user');

			$.ajax({
				method: "POST",
				url: "../php/history_facturacion/addData.php",
				data: {
						"periodo"   : periodo,
						"fecha" : fecha,
						"fecha_pago" : fecha_pago,
						"user_id" : user_id
					}

			}).done( function( info ){

				var json_info = JSON.parse( info );
				console.log(json_info);
				//mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var mostrar_mensaje = function( informacion ){

		var texto = "", color = "";
		if( informacion.respuesta == "BIEN" ){
			texto = "<strong>Bien!</strong> Se han guardado los cambios correctamente.";
			color = "#379911";
		}else if( informacion.respuesta == "ERROR"){
			texto = "<strong>Error</strong>, no se ejecutó la consulta.";
			color = "#C9302C";
		}else if( informacion.respuesta == "EXISTE" ){
			texto = "<strong>Información!</strong> el usuario ya existe.";
			color = "#5b94c5";
		}else if( informacion.respuesta == "VACIO" ){
			texto = "<strong>Advertencia!</strong> debe llenar todos los campos solicitados.";
			color = "#ddb11d";
		}else if( informacion.respuesta == "OPCION_VACIA" ){
			texto = "<strong>Advertencia!</strong> la opción no existe o esta vacia, recargar la página.";
			color = "#ddb11d";
		}

		$(".mensaje").html( texto ).css({"color": color });
		$(".mensaje").fadeOut(5000, function(){
			$(this).html("");
			$(this).fadeIn(3000);
		});
	}

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

//funcion para recuperar la clave del valor obtenido por paso de referencia
function getQuerystring(key) {
	var url_string = window.location;
	var url = new URL(url_string);
	var c = url.searchParams.get(key);
	return c;
};