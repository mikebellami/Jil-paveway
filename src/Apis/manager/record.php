<?php 
require_once 'dbconfig.php';
private $connection;
	$result = array();
	$query ='';

	$query .= "SELECT * FROM schools";

	if(isset($_POST["search"]["value"])){
		$query .= "WHERE name LIKE "%'.$_POST["search"]["value"].'%" ";
		$query .= "OR email LIKE "%'.$_POST["search"]["value"].'%" ";
		$query .= "OR phone LIKE "%'.$_POST["search"]["value"].'%" ";
	}

	if($_POST["length"] != -1){
		$query .= 'LIMIT' .$_POST['start']. ' , ' . $_POST['length'];
	}

	$stmt = $connection->prepare($query);

	$stmt->execute();
	$stmt->setFetchMode(PDO::FETCH_ASSOC);

	while ($data = $stmt->fetch(PDO::FETCH_ASSOC)){
		$result[] = array_map("utf8_encode", $data);
	}
	if (count($result) > 0) {
		return $result;
	}else {
		return NULL;
	}


 ?>