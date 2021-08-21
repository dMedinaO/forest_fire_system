$(window).on('load', function() {

	listar();
	eliminar();
	editar();
	guardar();
});

$.fn.DataTable.ext.pager.numbers_length = 5;

var listar = function(){
    //users -> nombre de la tabla definida en el tag HTML
	var t = $('#users').DataTable({
		"responsive": true,
		"destroy":true,
		"ajax":{
			"method":"POST",
			"url": "showData.php" //llamada por ajax a php
		},
		"columns":[//agregar campos a la tabla segun nombre 
			{"data":"idcountry"},
			{"data":"name"},
			{"data":"createdCountry"},
			{"data":"modifiedCountry"},
            //informacion de campos default para hacer CRUD -> editar/eliminar registros
			{"defaultContent": "<button type='button' class='editar btn btn-primary' data-toggle='modal' data-target='#myModalEditar'><i class='fa fa-pencil-square-o'></i></button>	<button type='button' class='eliminar btn btn-danger' data-toggle='modal' data-target='#modalEliminar' ><i class='fa fa-trash-o'></i></button>"}
		]
	});

	//funciones auxiliares al momento de pinchar un boton de la tabla
	obtener_id_eliminar("#users tbody", t);
	obtener_data_editar("#users tbody", t);
}

var obtener_id_eliminar = function(tbody, table){
	$(tbody).on("click", "button.eliminar", function(){//accion para cuando pulsan uno de los botones eliminar de la tabla
		var data = table.row( $(this).parents("tr") ).data();
		var idcategoryReport = $("#frmEliminar #idcountry").val( data.idcountry );
	});
}


var obtener_data_editar = function(tbody, table){
	$(tbody).on("click", "button.editar", function(){//accion para cuando pulsan uno de los botones editar de la tabla
		var data = table.row( $(this).parents("tr") ).data();//modifica los valores en el formulario a mostrar
		var name = $("#frmEditar #name").val(data.name);
		var idcountry = $("#frmEditar #idcountry").val( data.idcountry );

	});
}

//elimina registros
var eliminar = function(){
	$("#eliminar-country").on("click", function(){
		var idcountry = $("#frmEliminar #idcountry").val();
		$.ajax({
			method:"POST",
			url: "removeData.php",
			data: {//los parametros a pasar en el metodo al script de eliminar
					"idcountry": idcountry
			}
		}).done( function( info ){//cuando termina la llamada asincrona se ejecuta esta seccion
			var json_info = JSON.parse( info );
			//mostrar_mensaje( json_info );
			location.reload(true);
		});
	});
}

var editar = function(){
	$("#editar-country").on("click", function(){

		var name = $("#frmEditar #name").val();
		var idcountry = $("#frmEditar #idcountry").val();

		$.ajax({
			method: "POST",
			url: "editData.php",
			data: {
				"name"   : name,
				"idcountry" : idcountry
			}

		}).done( function( info ){

			var json_info = JSON.parse( info );
			//mostrar_mensaje( json_info );
			location.reload(true);
		});
	});
}

var guardar = function(){
	$("#agregar-tipo_ropa").on("click", function(){

		var name = $("#frmAgregar #name").val();

		$.ajax({
			method: "POST",
			url: "addData.php",
			data: {
					"name"   : name												
			}

		}).done( function( info ){

			var json_info = JSON.parse( info );
			//mostrar_mensaje( json_info );
			location.reload(true);
		});
	});
}


