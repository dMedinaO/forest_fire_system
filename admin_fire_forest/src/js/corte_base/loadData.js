
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
						"url": "../php/corte_base/showData.php"
					},

					"columns":[
						{"data":"nombre_corte_base"},
						{"data":"nombre_corte_base_ingles"},
						{"data":"codigo_arancel"},
						{"data":"glosa_arancel"},
						{"data":"created_corte_base"},
						{"data":"modified_corte_base"},											
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
			
			var idcorte_base = $("#frmEliminar #idcorte_base").val( data.idcorte_base );
		});
	}

	var obtener_data_editar = function(tbody, table){
		$(tbody).on("click", "button.editar", function(){

			let tr = $(this).parents("tr");
			if ($(tr).is('.child')){
				tr = tr.prev();
			}
			var data = table.row( tr ).data();
			
			var idcorte_base = $("#frmEditar #idcorte_base").val( data.idcorte_base );			
			var corte_base_name = $("#frmEditar #corte_base_name").val(data.nombre_corte_base);
			var corte_base_name_ingles = $("#frmEditar #corte_base_name_ingles").val(data.nombre_corte_base_ingles);
		});
	}

	var eliminar = function(){
		$("#eliminar-corte_base").on("click", function(){
			var idcorte_base = $("#frmEliminar #idcorte_base").val();
			$.ajax({
				method:"POST",
				url: "../php/corte_base/removeData.php",
				data: {
						"idcorte_base": idcorte_base
					  }
			}).done( function( info ){
				var json_info = JSON.parse( info );				
				location.reload(true);
			});
		});
	}

	var editar = function(){
		$("#editar-corte_base").on("click", function(){

			var idcorte_base = $("#frmEditar #idcorte_base").val();			
			var corte_base_name = $("#frmEditar #corte_base_name").val();
			var corte_base_name_ingles = $("#frmEditar #corte_base_name_ingles").val();
			var arancel = $("#frmEditar #arancel").val();

			$.ajax({
				method: "POST",
				url: "../php/corte_base/editData.php",
				data: {
					"idcorte_base"   : idcorte_base,
					"corte_base_name"   : corte_base_name,
					"corte_base_name_ingles": corte_base_name_ingles,
					"arancel" : arancel
				}

			}).done( function( info ){

				var json_info = JSON.parse( info );				
				//mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var guardar = function(){
		$("#agregar-corte_base").on("click", function(){

			var corte_base_name = $("#frmAgregar #corte_base_name").val();
			var corte_base_name_ingles = $("#frmAgregar #corte_base_name_ingles").val();
			var arancel = $("#frmAgregar #arancel").val();

			$.ajax({
				method: "POST",
				url: "../php/corte_base/addData.php",
				data: {
						"corte_base_name"   : corte_base_name,
						"corte_base_name_ingles": corte_base_name_ingles,
						"arancel" : arancel
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
