
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
	    var t = $('#clientes_data').DataTable({
	        "responsive": true,
	        "language": idioma_espanol,
	        "dom": '<"newtoolbar">frtip',

					"destroy":true,
					"ajax":{
						"method":"POST",
						"url": "../php/puerto_embarque/showData.php"
					},

					"columns":[
						{"data":"codigo_puerto"},
						{"data":"nombre_puerto_embarque"},
						{"data":"nombre_puerto_embarque_ingles"},
						{"data":"nombrePais"},
						{"data":"created_puerto_embarque"},
						{"data":"modified_puerto_embarque"},											
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
			
			var idpuerto_embarque = $("#frmEliminar #idpuerto_embarque").val( data.idpuerto_embarque );
		});
	}

	var obtener_data_editar = function(tbody, table){
		$(tbody).on("click", "button.editar", function(){

			let tr = $(this).parents("tr");
			if ($(tr).is('.child')){
				tr = tr.prev();
			}
			var data = table.row( tr ).data();
			
			var idpuerto_embarque = $("#frmEditar #idpuerto_embarque").val( data.idpuerto_embarque );			
			var codigo_puerto = $("#frmEditar #codigo_puerto").val(data.codigo_puerto);
			var nombre_puerto = $("#frmEditar #nombre_puerto").val(data.nombre_puerto_embarque);
			var nombre_puerto_ingles = $("#frmEditar #nombre_puerto_ingles").val(data.nombre_puerto_embarque_ingles);
		});
	}

	var eliminar = function(){
		$("#eliminar-puerto").on("click", function(){
			var idpuerto_embarque = $("#frmEliminar #idpuerto_embarque").val();
			$.ajax({
				method:"POST",
				url: "../php/puerto_embarque/removeData.php",
				data: {
						"idpuerto_embarque": idpuerto_embarque
					  }
			}).done( function( info ){
				var json_info = JSON.parse( info );				
				location.reload(true);
			});
		});
	}

	var editar = function(){
		$("#editar-puerto").on("click", function(){

			var idpuerto_embarque = $("#frmEditar #idpuerto_embarque").val();			
			var codigo_puerto = $("#frmEditar #codigo_puerto").val();
			var nombre_puerto = $("#frmEditar #nombre_puerto").val();
			var nombre_puerto_ingles = $("#frmEditar #nombre_puerto_ingles").val();
			var pais = $("#frmEditar #pais").val();

			$.ajax({
				method: "POST",
				url: "../php/puerto_embarque/editData.php",
				data: {
					"idpuerto_embarque"   : idpuerto_embarque,
					"codigo_puerto"   : codigo_puerto,
					"nombre_puerto" : nombre_puerto,
					"nombre_puerto_ingles"   : nombre_puerto_ingles,
					"pais" : pais
				}

			}).done( function( info ){

				var json_info = JSON.parse( info );				
				//mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var guardar = function(){
		$("#agregar-puerto").on("click", function(){

			var codigo_puerto = $("#frmAgregar #codigo_puerto").val();
			var nombre_puerto = $("#frmAgregar #nombre_puerto").val();
			var nombre_puerto_ingles = $("#frmAgregar #nombre_puerto_ingles").val();
			var pais = $("#frmAgregar #pais").val();

			$.ajax({
				method: "POST",
				url: "../php/puerto_embarque/addData.php",
				data: {
						"codigo_puerto"   : codigo_puerto,
						"nombre_puerto" : nombre_puerto,
						"nombre_puerto_ingles"   : nombre_puerto_ingles,
						"pais" : pais
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
			texto = "<strong>Error</strong>, no se ejecut?? la consulta.";
			color = "#C9302C";
		}else if( informacion.respuesta == "EXISTE" ){
			texto = "<strong>Informaci??n!</strong> el usuario ya existe.";
			color = "#5b94c5";
		}else if( informacion.respuesta == "VACIO" ){
			texto = "<strong>Advertencia!</strong> debe llenar todos los campos solicitados.";
			color = "#ddb11d";
		}else if( informacion.respuesta == "OPCION_VACIA" ){
			texto = "<strong>Advertencia!</strong> la opci??n no existe o esta vacia, recargar la p??gina.";
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
	    "sEmptyTable":     "Ning??n dato disponible en esta tabla",
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
	        "sLast":     "??ltimo",
	        "sNext":     "Siguiente",
	        "sPrevious": "Anterior"
	    },
	    "oAria": {
	        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
	        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
	    }
	}
