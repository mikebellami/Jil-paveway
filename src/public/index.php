<?php

require_once '../apis/manager/passwordHash.php';
require_once '../apis/manager/functions.php';
require '../includes/Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

// sign-up Api endpoint
$app->post('/signup', function (Request $request, Response $response){
			if(!verifyRequiredParams(array('name','password'),$response)){
				$r = $request -> getParsedBody();
				$name = $r['name'];
				$password = $r['password'];

				$secret_key = passwordHash::hash($password);

				$db = new DbHandler;

				$result = $db->signUp($name, $password);
				if($result == USER_CREATED){
					$msg = array();
					$msg['error'] = false;
					$msg['message']= "user Created! ";
					$response->write(json_encode($msg));
					return $response->withHeader('Content-type', 'application/json')->withStatus(201);
				}
				elseif ($result == USER_FAIL) {
					$msg = array();
					$msg['error'] = true;
					$msg['message'] =" Something When Wrong";
					$response->write(json_encode($msg));
					return  $response->withHeader('Content-type','application/json')->withStatus(422);
				}
				elseif ($result == USER_EXITS) {
					$msg = array();
					$msg['error'] = true;
					$msg['message'] = "Opps User Already Exist!";
					$response->write(json_encode($msg));
					return $response->withHeader('Content-type', 'application/json')->withStatus(422);
				}
					$response->write(json_encode($msg));
					return $response->withHeader('Content-type', 'application/json')->withStatus(422);	
			}
});
//login Api endpoint

//get all record Api endpoint
$app->get('/record', function() use($app){

	$db = new DbHandler();
	$result = $db->getAllRecord();

	$response = array();
	$response['error'] = false;
	$response['school'] = array();

	if ($result > 0) {
		$response['message'] = "success";
		array_push($response['school'], $result);
	}else{
		$response['error'] = true;
		$response['message'] = "No records found";
	}
	echoResponse(200,$response);

});

//get one record Api endpoint
$app->get('/record/:id', function($id) use($app){

	$db = new DbHandler();
	$result = $db->getOneRecord($id);

	$response = array();
	$response['error'] = false;
	$response['school'] = array();

	if ($result > 0) {
		$response['message'] = "success";
		array_push($response['school'], $result);
	}else{
		$response['error'] = true;
		$response['message'] = "No records found";
	}
	echoResponse(200,$response);

});

//delete one record Api endpoint
$app->delete('/deleteRecord/:id', function($id) use($app){

	$db = new DbHandler();
	$result = $db->deleteRecord($id);

	$response = array();

	if ($result > 0) {
		 $response['error'] = false;
		$response['message'] = "Record successfully deleted";
		echoResponse(200,$response);
	}else{
		$response['error'] = true;
		$response['message'] = "Oops! An error occurred while deleting record";
		echoResponse(201,$response);
	}
	
});

//update one record Api endpoint
$app->post('/updateRecord/:id', function($id) use($app){
	$r = json_decode($app->request->getBody());
	 verifyRequiredParams(array('name', 'email', 'phone', 'address', 'std_num', 'amount'),$r);
	 $db = new DbHandler();
	$response = array();
	$name = $r->name;
	$phone = $r->phone;
	$email = $r->email;
	$address = $r->address;
	$std_num = $r->std_num;
	$amount = $r->amount;
	
	$result = $db->updateRecord($id,$r);

	
	$response['school'] = array();

	if ($result > 0) {
		$response['error'] = false;
		$response['message'] = "Update was success";
		array_push($response['school'], $result);
		echoResponse(200,$response);
	}else{
		$response['error'] = true;
		$response['message'] = "Oops! An error occurred while update";
		echoResponse(201,$response);
	}
	
});

//update one record Api endpoint
$app->post('/addRecord', function() use($app){
	$record = $app->request->getBody();
	 verifyRequiredParams(array('name', 'email', 'phone', 'address', 'std_num', 'amount'),$record);
	$db = new DbHandler();
	$response = array();
	$name = $record->name;
	$phone = $record->phone;
	$email = $record->email;
	$address = $record->address;
	$std_num = $record->std_num;
	$amount = $record->amount;
	
	$result = $db->insertRecord($record);

	
	$response['school'] = array();

	if ($result > 0) {
		$response['error'] = false;
		$response['message'] = "record added";
		array_push($response['school'], $result);
		echoResponse(201,$response);
	}else{
		$response['error'] = true;
		$response['message'] = "Oops! An error occurred while registering";
		echoResponse(200,$response);
	}
	
});

/**
 * Verifying required params posted or not
 */
function verifyRequiredParams($required_fields,$request_params) {
    $error = false;
    $error_fields = "";
    foreach ($required_fields as $field) {
        if (!isset($request_params->$field) || strlen(trim($request_params->$field)) <= 0) {
            $error = true;
            $error_fields .= $field . ', ';
        }
    }

    if ($error) {
        // Required field(s) are missing or empty
        // echo error json and stop the app
        $response = array();
        $app = \Slim\Slim::getInstance();
        $response["status"] = "error";
        $response["message"] = 'Required field(s) ' . substr($error_fields, 0, -2) . ' is missing or empty';
        echoResponse(200, $response);
        $app->stop();
    }
}


function echoResponse($status_code, $response) {
    $app = \Slim\Slim::getInstance();
    // Http response code
    $app->status($status_code);

    // setting response content type to json
    $app->contentType('application/json');

    echo json_encode($response);
}


$app->run();