
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
						"url": "../php/empresa/showData.php"
					},

					"columns":[
						{"data":"rut_empresa"},
						{"data":"nombre_empresa"},
						{"data":"nombre_empresa_ingles"},
						{"data":"nombre_tamano_empresa"},
						{"data":"nombre_tipo_empresa"},
						{"data":"alias_empresa"},
						{"data":"observaciones"},
						{"data":"modified_empresa"},
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
			
			var idempresa = $("#frmEliminar #idempresa").val( data.idempresa );
		});
	}

	var obtener_data_editar = function(tbody, table){
		$(tbody).on("click", "button.editar", function(){

			let tr = $(this).parents("tr");
			if ($(tr).is('.child')){
				tr = tr.prev();
			}
			var data = table.row( tr ).data();
			
			var idempresa = $("#frmEditar #idempresa").val( data.idempresa );
			var name = $("#frmEditar #name").val(data.nombre_empresa);
			var name = $("#frmEditar #name_ingles").val(data.nombre_empresa_ingles);
			var rut_empresa = $("#frmEditar #rut_empresa").val(data.rut_empresa);
			
		});
	}

	var eliminar = function(){
		$("#eliminar-empresa").on("click", function(){
			var idempresa = $("#frmEliminar #idempresa").val();
			$.ajax({
				method:"POST",
				url: "../php/empresa/removeData.php",
				data: {
						"idempresa": idempresa
					  }
			}).done( function( info ){
				var json_info = JSON.parse( info );				
				location.reload(true);
			});
		});
	}

	var editar = function(){
		$("#editar-empresa").on("click", function(){

			var idempresa = $("#frmEditar #idempresa").val();
			var name = $("#frmEditar #name").val();
			var name_ingles = $("#frmEditar #name_ingles").val();
			var rut_empresa = $("#frmEditar #rut_empresa").val();
			
			var idtipo_empresa = $("#frmEditar #idtipo_empresa").val();
			var id_tamano_empresa = $("#frmEditar #id_tamano_empresa").val();
			var idconsorcio = $("#frmEditar #idconsorcio").val();
			var idgremio = $("#frmEditar #idgremio").val();

			$.ajax({
				method: "POST",
				url: "../php/empresa/editData.php",
				data: {
					"idempresa"   : idempresa,
					"name"   : name,
					"name_ingles" : name_ingles,
					"rut_empresa" : rut_empresa,
					"idtipo_empresa" : idtipo_empresa,
					"id_tamano_empresa" : id_tamano_empresa,
					"idconsorcio" : idconsorcio,
					"idgremio" : idgremio	
				}

			}).done( function( info ){

				var json_info = JSON.parse( info );				
				//mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var guardar = function(){
		$("#agregar-empresa").on("click", function(){

			var name = $("#frmAgregar #name").val();
			var name_ingles = $("#frmAgregar #name_ingles").val();
			var rut_empresa = $("#frmAgregar #rut_empresa").val();
			var idtipo_empresa = $("#frmAgregar #idtipo_empresa").val();
			var id_tamano_empresa = $("#frmAgregar #id_tamano_empresa").val();
			var idconsorcio = $("#frmAgregar #idconsorcio").val();
			var idgremio = $("#frmAgregar #idgremio").val();
			var alias_empresa = $("#frmAgregar #alias_empresa").val();
			var observaciones_empresa = $("#frmAgregar #observaciones_empresa").val();

			$.ajax({
				method: "POST",
				url: "../php/empresa/addData.php",
				data: {
						"name"   : name,
						"name_ingles" : name_ingles,
						"rut_empresa" : rut_empresa,
						"idtipo_empresa" : idtipo_empresa,
						"id_tamano_empresa" : id_tamano_empresa,
						"idconsorcio" : idconsorcio,
						"idgremio" : idgremio,
						"alias_empresa" : alias_empresa,
						"observaciones_empresa" : observaciones_empresa
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
