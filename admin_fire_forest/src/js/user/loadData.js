
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
						"url": "../php/user/showData.php"
					},

					"columns":[
						{"data":"nombre_completo"},
						{"data":"tipo_producto_acceso"},
						{"data":"empresa_pertenece"},
						{"data":"nombre_usuario"},
						{"data":"password_user"},												
						{"data":"status_moroso"},
						{"data":"status_user"},
						{"defaultContent": "<button type='button' class='detail_facturacion btn btn-warning'><i class='fa fa-file'></i></button> <button type='button' class='detail_user btn btn-success'><i class='fa fa-cog'></i></button> <button type='button' class='editar btn btn-primary' data-toggle='modal' data-target='#myModalEditar'><i class='fa fa-pencil-square-o'></i></button>	<button type='button' class='eliminar btn btn-danger' data-toggle='modal' data-target='#modalEliminar' ><i class='fa fa-trash-o'></i></button>"}
					]
	    });
	    $('#demo-custom-toolbar2').appendTo($("div.newtoolbar"));

		obtener_id_eliminar("#clientes_data tbody", t);
		obtener_data_editar("#clientes_data tbody", t);
		obtener_data_detail("#clientes_data tbody", t);
		obtener_data_detail_facturacion("#clientes_data tbody", t);
	}

	var obtener_id_eliminar = function(tbody, table){
		$(tbody).on("click", "button.eliminar", function(){

			let tr = $(this).parents("tr");
			if ($(tr).is('.child')){
				tr = tr.prev();
			}
			var data = table.row( tr ).data();
			
			var idusuario = $("#frmEliminar #idusuario").val( data.idusuario );
		});
	}

	var obtener_data_detail = function(tbody, table){
		$(tbody).on("click", "button.detail_user", function(){
			let tr = $(this).parents("tr");
			if ($(tr).is('.child')){
				tr = tr.prev();
			}
			var data = table.row( tr ).data();
			
			var idusuario = data.idusuario;
			location.href="../detail_user/?user="+idusuario;
		});
	}

	var obtener_data_detail_facturacion = function(tbody, table){
		$(tbody).on("click", "button.detail_facturacion", function(){
			let tr = $(this).parents("tr");
			if ($(tr).is('.child')){
				tr = tr.prev();
			}
			var data = table.row( tr ).data();
			
			var idusuario = data.idusuario;
			location.href="../history_facturacion/?user="+idusuario;
		});
	}

	var obtener_data_editar = function(tbody, table){
		$(tbody).on("click", "button.editar", function(){

			let tr = $(this).parents("tr");
			if ($(tr).is('.child')){
				tr = tr.prev();
			}
			var data = table.row( tr ).data();
			
			var idusuario = $("#frmEditar #idusuario").val( data.idusuario );			
			var nombre_completo = $("#frmEditar #nombre_completo").val(data.nombre_completo);
			var correo = $("#frmEditar #correo").val(data.correo_contacto);
			var telefono = $("#frmEditar #telefono").val(data.telefono);
			var empresa = $("#frmEditar #empresa").val(data.empresa_pertenece);
			var username = $("#frmEditar #username").val(data.nombre_usuario);
			var password = $("#frmEditar #password").val(data.password_user);
		});
	}

	var eliminar = function(){
		$("#eliminar-usuario").on("click", function(){
			var idusuario = $("#frmEliminar #idusuario").val();
			$.ajax({
				method:"POST",
				url: "../php/user/removeData.php",
				data: {
						"idusuario": idusuario
					  }
			}).done( function( info ){
				var json_info = JSON.parse( info );				
				location.reload(true);
			});
		});
	}

	var editar = function(){
		$("#editar-usuario").on("click", function(){

			var idusuario = $("#frmEditar #idusuario").val();			
			var idusuario = $("#frmEditar #idusuario").val();			
			var nombre_completo = $("#frmEditar #nombre_completo").val();
			var correo = $("#frmEditar #correo").val();
			var telefono = $("#frmEditar #telefono").val();
			var empresa = $("#frmEditar #empresa").val();
			var username = $("#frmEditar #username").val();
			var password = $("#frmEditar #password").val();
			var activo = $("#frmEditar #activo").val();
			var moroso = $("#frmEditar #moroso").val();
			var type_product = $("#frmEditar #type_product").val();

			$.ajax({
				method: "POST",
				url: "../php/user/editData.php",
				data: {
					"idusuario"   : idusuario,
					"nombre_completo"   : nombre_completo,
					"correo"   : correo,
					"telefono"   : telefono,
					"empresa"   : empresa,
					"username"   : username,
					"password"   : password,
					"activo"   : activo,
					"moroso"   : moroso,
					"type_product" : type_product
				}

			}).done( function( info ){

				var json_info = JSON.parse( info );				
				//mostrar_mensaje( json_info );
				location.reload(true);
			});
		});
	}

	var guardar = function(){
		$("#agregar-usuario").on("click", function(){

			var nombre_completo = $("#frmAgregar #nombre_completo").val();
			var correo = $("#frmAgregar #correo").val();
			var telefono = $("#frmAgregar #telefono").val();
			var empresa = $("#frmAgregar #empresa").val();
			var username = $("#frmAgregar #username").val();
			var password = $("#frmAgregar #password").val();
			var activo = $("#frmAgregar #activo").val();
			var moroso = $("#frmAgregar #moroso").val();
			var fecha_inicio = $("#frmAgregar #fecha_inicio").val();
			var fecha_termino = $("#frmAgregar #fecha_termino").val();
			var type_product = $("#frmAgregar #type_product").val();

			$.ajax({
				method: "POST",
				url: "../php/user/addData.php",
				data: {
						"nombre_completo"   : nombre_completo,
						"correo"   : correo,
						"telefono"   : telefono,
						"empresa"   : empresa,
						"username"   : username,
						"password"   : password,
						"activo"   : activo,
						"moroso"   : moroso,
						"fecha_termino" : fecha_termino,
						"fecha_inicio" : fecha_inicio,
						"type_product" : type_product
					}

			}).done( function( info ){

				var json_info = JSON.parse( info );
				console.log(json_info);
				if (json_info.respuesta=="BIEN"){
					console.log("OK!");
					//mostrar_mensaje( json_info );
					location.href="../detail_user/?user="+json_info.user_id;
				}else{
					location.reload(true);
					console.log("cualquier cosa");
				}
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
