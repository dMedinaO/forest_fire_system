
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
						"url": "../php/tipo_moneda/showData.php"
					},

					"columns":[
						{"data":"idtipo_moneda"},
						{"data":"nombre_moneda"},
						{"data":"nombre_moneda_ingles"},						
						{"data":"created_moneda"},
						{"data":"modified_moneda"},						
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
			
			var idtipo_moneda = $("#frmEliminar #idtipo_moneda").val( data.idtipo_moneda );
		});
	}

	var obtener_data_editar = function(tbody, table){
		$(tbody).on("click", "button.editar", function(){

			let tr = $(this).parents("tr");
			if ($(tr).is('.child')){
				tr = tr.prev();
			}
			var data = table.row( tr ).data();
			
			var idtipo_moneda = $("#frmEditar #idtipo_moneda").val( data.idtipo_moneda );			
			var codigo_moneda = $("#frmEditar #codigo_moneda").val(data.idtipo_moneda);
			var name = $("#frmEditar #name").val(data.nombre_moneda);
			var name_ingles = $("#frmEditar #name_ingles").val(data.nombre_moneda_ingles);			
			
		});
	}

	var eliminar = function(){
		$("#eliminar-tipo_moneda").on("click", function(){
			var idtipo_moneda = $("#frmEliminar #idtipo_moneda").val();
			$.ajax({
				method:"POST",
				url: "../php/tipo_moneda/removeData.php",
				data: {
						"idtipo_moneda": idtipo_moneda
					  }
			}).done( function( info ){
				var json_info = JSON.parse( info );				
				location.reload(true);
			});
		});
	}

	var editar = function(){
		$("#editar-tipo_moneda").on("click", function(){

			var idtipo_moneda = $("#frmEditar #idtipo_moneda").val();			
			var codigo_moneda = $("#frmEditar #codigo_moneda").val();
			var name = $("#frmEditar #name").val();
			var name_ingles = $("#frmEditar #name_ingles").val();			

			$.ajax({
				method: "POST",
				url: "../php/tipo_moneda/editData.php",
				data: {
					"idtipo_moneda"   : idtipo_moneda,
					"name"   : name,
					"codigo_moneda" : codigo_moneda,
					"name_ingles" : name_ingles
				}

			}).done( function( info ){

				var json_info = JSON.parse( info );				
				//mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var guardar = function(){
		$("#agregar-tipo_moneda").on("click", function(){

			var codigo_moneda = $("#frmAgregar #codigo_moneda").val();
			var name = $("#frmAgregar #name").val();
			var name_ingles = $("#frmAgregar #name_ingles").val();			

			$.ajax({
				method: "POST",
				url: "../php/tipo_moneda/addData.php",
				data: {
						"name"   : name,
						"codigo_moneda" : codigo_moneda,
						"name_ingles" : name_ingles						
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
