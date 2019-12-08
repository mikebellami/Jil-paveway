<?php 
	
	require_once dirname(__FILE__).'/db.php';

	class DBclass{
		
		private $connection;
	
		function __construct(){
		}

		function connect(){
			$db_name = DB_NAME;	
			$user = DB_USER;	
			$pass = DB_PASS;	
			$server = DB_HOST;

			try{
					$this->connection = new PDO ("mysql:host=$server;dbname=$db_name", $user, $pass);
					  // set the PDO error mode to exception
					$this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);	
				}catch(PDOException $e) {
					echo "connection failed". $e->getMessage();
				}	
				return $this->connection;
		}
	}


 ?>