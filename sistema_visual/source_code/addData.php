<?php

	include ("connection.php");

	#hacemos la obtencion de los datos
	$name = $_REQUEST['name'];	
	$idData = time();
	$query = "insert into tipo_ropa values ($idData, '$name', NOW(), NOW())";
	$resultado = mysqli_query($conexion, $query);

	verificar_resultado( $resultado, $conexion);
	cerrar( $conexion );

	function verificar_resultado($resultado, $conexion){

		if (!$resultado) $informacion["respuesta"] = "ERROR";
		else{
			$informacion["respuesta"] ="BIEN";
		}
		echo json_encode($informacion);
	}

	function cerrar($conexion){
		mysqli_close($conexion);
	}
?>