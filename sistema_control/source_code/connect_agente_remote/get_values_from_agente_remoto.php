<?php

    #get params using request
    $values_param = $_REQUEST['measures'];

    #use this code to exec a process line to insert into data
    $command = "python3 ../process_information/process_measures.py $values_param";
    exec($command);
    
?>