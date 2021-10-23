
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
		var mercado_id = getQuerystring('mercado');
	    var t = $('#clientes_data').DataTable({
	        "responsive": true,
	        "language": idioma_espanol,
	        "dom": '<"newtoolbar">frtip',

					"destroy":true,
					"ajax":{
						"method":"POST",
						"url": "../php/pais_mercado/showData.php?mercado="+mercado_id
					},

					"columns":[
						{"data":"idpais"},
						{"data":"nombrePais"},
						{"data":"nombrePais_ingles"},
						{"data":"codigo_3L"},												
						{"data":"created_pais"},
						{"data":"modified_pais"},
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
			
			var idpais = $("#frmEliminar #idpais").val( data.idpais );
		});
	}

	var obtener_data_editar = function(tbody, table){
		$(tbody).on("click", "button.editar", function(){

			let tr = $(this).parents("tr");
			if ($(tr).is('.child')){
				tr = tr.prev();
			}
			var data = table.row( tr ).data();
			
			var idpais = $("#frmEditar #idpais").val( data.idpais );
			var codigo_pais = $("#frmEditar #codigo_pais").val(data.idpais);
			var name = $("#frmEditar #name").val(data.nombrePais);
			var name_ingles = $("#frmEditar #name_ingles").val(data.nombrePais_ingles);
			var codigo_3L = $("#frmEditar #codigo_3L").val(data.codigo_3L);
		});
	}

	var eliminar = function(){
		$("#eliminar-pais").on("click", function(){
			var idpais = $("#frmEliminar #idpais").val();
			$.ajax({
				method:"POST",
				url: "../php/pais/removeData.php",
				data: {
						"idpais": idpais
					  }
			}).done( function( info ){
				var json_info = JSON.parse( info );				
				location.reload(true);
			});
		});
	}

	var editar = function(){
		$("#editar-pais").on("click", function(){

			var idpais = $("#frmEditar #idpais").val();
			var codigo_pais = $("#frmEditar #codigo_pais").val();
			var name = $("#frmEditar #name").val();
			var name_ingles = $("#frmEditar #name_ingles").val();
			var codigo_3L = $("#frmEditar #codigo_3L").val();
			var idmercado = getQuerystring('mercado');

			$.ajax({
				method: "POST",
				url: "../php/pais/editData.php",
				data: {
					"idpais"   : idpais,
					"codigo_pais"   : codigo_pais,
					"name" : name,
					"name_ingles" : name_ingles,
					"codigo_3L" : codigo_3L,
					"idmercado" : idmercado
				}

			}).done( function( info ){

				var json_info = JSON.parse( info );				
				//mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var guardar = function(){
		$("#agregar-pais").on("click", function(){

			var mercado = getQuerystring('mercado');
			var codigo_pais = $("#frmAgregar #codigo_pais").val();
			var name = $("#frmAgregar #name").val();
			var name_ingles = $("#frmAgregar #name_ingles").val();
			var codigo_3L = $("#frmAgregar #codigo_3L").val();						

			$.ajax({
				method: "POST",
				url: "../php/pais/addData.php",
				data: {
						"codigo_pais"   : codigo_pais,
						"name" : name,
						"name_ingles" : name_ingles,
						"codigo_3L" : codigo_3L,
						"idmercado" : mercado
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