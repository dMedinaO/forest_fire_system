<?php

	#script para hacer la carga de informacion desde la base de datos a la tabla
	include ("connection.php");

	$query = "select * from table"; //cambiar table por el nombre de la tabla o la consulta que se quiere desarrollar
	$resultado = mysqli_query($conexion, $query);

	if (!$resultado){
		die("Error");
	}else{

		while($data = mysqli_fetch_assoc($resultado)){

			$arreglo["data"][] = $data;
		}

		echo json_encode($arreglo);

	}

	mysqli_free_result($resultado);
	mysqli_close($conexion);
?>