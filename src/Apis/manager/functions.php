<?php

	class DbHandler{
		private $connection;
		private $tb_name="user";


	

		function __construct(){
			require_once dirname(__FILE__).'/dbconfig.php';
			//opening connection
			$db = new DBclass;
			$this->connection = $db->connect();
		}


		// function to create new user
		public function signUp($name, $password)
		{
			if (!$this->isNameExist($name)) {
				// query to insert
				$query = "INSERT INTO " .$this->$tb_name. "SET name=:name, password=:password";
				
				// prepare query
				$stmt = $this->connection->prepare($query);

				 // sanitize
				$this->name=htmlspecialchars(strip_tags($this->name));
				$this->password=htmlspecialchars(strip_tags($this->password));

				// bind value
				$stmt->bindParam(":name",$this->name);
				$stmt->bindParam(":password",$this->password);
				// $stmt->bindParam(":created"$this->created);

				//execute query
				if($stmt->execute()){
					return USER_CREATED;
				}else{
					return USER_FAIL;
				}
					return USER_EXIST;
			}
		}

		// function to login
		public function logIn($data, $password){
			require_once dirname(__FILE__).'/password_hash.php';
			if ($this->isDetailsExist($data)) {
				$user = $this->getUserPassword($data,$password);
				if(passwordHash::check_password($user["password"], $password)){
					
					return USER_VERIFIED;
				}else{					
					return USER_PASS_ERR;
				}
					return USER_NULL;
			}
		}

		// function to get all record
		public function getAllRecord(){
			$result = array();

			$query = "SELECT * FROM schools";
			$stmt = $this->connection->prepare($query);

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

		}

		// function to get one record
		public function getOneRecord($id){
			$query = "SELECT * FROM Schools WHERE `id` =:id";
			$stmt = $this->connection->prepare($query);
			$result = Array();

			$stmt->bindValue(":id",$id);

			$stmt->execute();
			$stmt->setFetchMode(PDO::FETCH_ASSOC);

			while ($line = $stmt->fetch(PDO::FETCH_ASSOC)){
				$result[]= array_map("utf8_encode", $line);
			}
			if (count($result) > 0) {
				return $result;
			}else {
				return NULL;
			}
		}

		// function to insert record
		public function insertRecord($id, $name,$phone,$email,$address,$std_num,$amount){

			$query = "INSERT INTO `Schools`(`name`,`phone`, `email`,`address`,`std_num`,`amount`) VALUES (:name,:phone,:email,:address,:std_num,:amount)";
						$stmt = $this->connection->prepare($query);

			 // sanitize
				$this->name=htmlspecialchars(strip_tags($this->name));
				$this->phone=htmlspecialchars(strip_tags($this->phone));
				$this->email=htmlspecialchars(strip_tags($this->email));
				$this->address=htmlspecialchars(strip_tags($this->address));
				$this->std_num=htmlspecialchars(strip_tags($this->std_num));
				$this->amount=htmlspecialchars(strip_tags($this->amount));
				
				//bind value
			$stmt->bindParam(":id",$this->id);
			$stmt->bindParam(":name",$this->name);
			$stmt->bindParam(":phone",$this->phone);
			$stmt->bindParam(":email",$this->email);
			$stmt->bindParam(":address",$this->address);
			$stmt->bindParam(":std_num",$this->std_num);
			$stmt->bindParam(":amount",$this->amount);

			$isSchoolExist = $db->getOneRecord("SELECT 1 from Schools WHERE name='$name' or email='$email' or address='$address'");

			if (!$isSchoolExist) {
				if ($stmt->execute()) {
				return $this->connection->lastInsertId();
				}else{
					return NULL;
				}
			}else{
				echo "schools with this name exist";	
			}


		}

		// function to update record
		public function updateRecord($id, $name,$phone,$email,$address,$std_num,$amount){
			$query = "UPDATE `schools` SET id=:id, name=:name, phone=:phone, email=:email, address=:address, std_num=:std_num, amount=:amount WHERE id=:id";
			$stmt = $this->connection->prepare($query);

			 // sanitize
				$this->name=htmlspecialchars(strip_tags($this->name));
				$this->phone=htmlspecialchars(strip_tags($this->phone));
				$this->email=htmlspecialchars(strip_tags($this->email));
				$this->address=htmlspecialchars(strip_tags($this->address));
				$this->std_num=htmlspecialchars(strip_tags($this->std_num));
				
				
				//bind value
			$stmt->bindParam(":id",$this->id);
			$stmt->bindParam(":name",$this->name);
			$stmt->bindParam(":phone",$this->phone);
			$stmt->bindParam(":email",$this->email);
			$stmt->bindParam(":address",$this->address);
			$stmt->bindParam(":std_num",$this->std_num);
			$stmt->bindParam(":amount",$this->amount);
			

			if ($stmt->execute()) {
				return $this->getOneRecord($id);
			}else{
				return NULL;
			}

		}

		// function to update one record
		public function deleteRecord($id){
			
			$query = "DELETE FROM `Schools` Where `id`=:id";
			$stmt = $this->connection->prepare($query);

			$stmt->bindParam(":id", $id);

			if ($stmt->execute()) {
				return 1;
			}else{
				return -1;
			}
		}

		// search function
		public function serachRecord($id){

		}

		// check in function
		public function checkIn($id){
			$result = array(); 
			$query = "INSERT INTO checkin SELECT `id`,`name`,`std_num`,`amount`,`created`, `modified` FROM Schools WHERE `id`=:id";
			$stmt= $this->connection->prepare($query);

			$stmt->bindParam(":id",$id);

			$stmt->execute();

			$stmt->fetch(PDO::FETCH_ASSOC);
			while ($line=$stmt) {
				$result[]=array_map("utf8_encode", $line);
			}
			if (count($result) > 0) {
				return $result;
			}else{
				return NULL;
			}

		}





		// function to check if name exist
		private function isNameExist($name){
			$query = "SELECT name FROM".$this->$tb_name."WHERE name='".$this->$name."'";
			//prepare query statement
			$stmt = $this->connection->prepare($query);
			// execute query
			$stmt ->execute();
			
			$res = $stmt->fetch(PDO::FETCH_ASSOC);

			if($stmt->rowCount() > 0){
				return $res;
			}else{
				return NULL;
			}
		}

		// function to check if  user details exist
		private function isDetailsExist($data){
			$query = "SELECT id FROM ".$this->$tb_name."WHERE name =:details";
			$stmt = $this->connection->prepare($query);
			$requete->bindValue(":details", $data);

			$stmt->fetch(PDO::FETCH_ASSOC);
			return $stmt->rowCount() > 0;
		}

		// function to check if  user's password
		private function getUserPassword($password,$data){

			$query =" SELECT password FROM".$this->$tb_name."WHERE name =:userdetails";
			$stmt->bindParam(":userdetails",$data);
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			return $row;
		}

		// get session function
		public function getSession(){
			if (!isset($_SESSION)){
				session_start();
			}
			$sess = array();

			if (isset($_SESSION['id'])) {
				$sess["id"] = $_SESSION['id'];
				$sess["name"] = $_SESSION['name'];
				$sess["timestamp"] = $_SESSION['timestamp'];
			}else{
				$sess = "Error";
			}
			return $sess;
		}

		//function to destroy a section
		public function destorySession(){
			if (!isset($_SESSION)){
				session_start();
			}
			if (isset($_SESSION['id'])) 
			{
				unset($_SESSION['id']);
				unset($_SESSION['name']);
				unset($_SESSION['timestamp']);
				session_destroy();
				session_unset();
				$msg = USER_LOGOUT;
			}else{
				$msg = USER_LOGOUT_ERR;
            }
            return $msg;
		}

	}

?>