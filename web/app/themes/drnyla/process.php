
<?php
	$errors = array();
	$data   = array();

	$data['name']    = $_POST['name'];
	$data['email']   = $_POST['email'];
	$data['signup']  = $_POST['signup'];
	$data['sector']  = $_POST['sector'];

    if (empty($data['name'])) {
        $errors['name'] = 'Name is required.';
    }

    if (empty($data['email'])) {
        $errors['email'] = 'Email is required.';
    } else if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
		$errors['email'] = "Invalid email format";
    }

    if ( ! empty($errors)) {
        $data['success'] = false;
        $data['errors']  = $errors;
    } else {
        $data['success'] = true;
        $data['message'] = '<h2>You’re in!</h2><p>Thanks for joining us on our mission to make managing money straightforward.</p><p>An email will be coming your way soon to seal the deal.</p>';

	    $admin_email = "steven.grain@wearecube3.com";
	    $email = $_REQUEST['email'];
	    $subject = 'New '.$data['sector'].' account submission';
	    $comment = 'Name: '.$data['name'].PHP_EOL.'Email address: '.$data['email'].PHP_EOL.'Interested in: '.$data['sector'].PHP_EOL.'Sign up? '.$data['signup'];

	    mail($admin_email, "$subject", $comment, "From:" . 'arromarketing@arromoney.com');

	    require_once 'cm/csrest_subscribers.php';
	    $auth = array(
	        'username' => '2faad43300b826fc7a815297705ecd8051833e4382a1ccf0',
	        'password' => '2faad43300b826fc7a815297705ecd8051833e4382a1ccf0');
	    $wrap = new CS_REST_Subscribers('546ae0e8d691996eb6bed7c7672a2fd3', $auth);
	    $result = $wrap->add(array(
	        'EmailAddress' => $data['email'],
	        'Name'         => $data['name'],
	        'Resubscribe'  => true,
	        'CustomFields' => array(
	        	array(
	        		'Key' => 'AccountType',
	       			'Value' => $data['sector'],
	        	)
	        )
	    ));
	    // echo "Result of POST /api/v3.1/subscribers/{list id}.{format}\n<br />";
	    if($result->was_successful()) {
	        // echo "Subscribed with code ".$result->http_status_code;
	    } else {
	        // echo 'Failed with code '.$result->http_status_code."\n<br /><pre>";
	        // var_dump($result->response);
	        // echo '</pre>';
	    }

	    if ( $data['signup'] == 'true') {
	    	require_once 'cm/csrest_subscribers.php';
	    	$auth = array(
	    	    'username' => '2faad43300b826fc7a815297705ecd8051833e4382a1ccf0',
	    	    'password' => '2faad43300b826fc7a815297705ecd8051833e4382a1ccf0');
	    	$wrap = new CS_REST_Subscribers('a81ae47d64808c29e31e1857e4334e99', $auth);
	    	$result = $wrap->add(array(
	    	    'EmailAddress' => $data['email'],
	    	    'Name'         => $data['name'],
	    	    'Resubscribe'  => true,
	    	    'CustomFields' => array(
	    	    	array(
	    	    		'Key' => 'AccountType',
	    	   			'Value' => $data['sector'],
	    	    	)
	    	    )
	    	));
	    	// echo "Result of POST /api/v3.1/subscribers/{list id}.{format}\n<br />";
	    	if($result->was_successful()) {
	    	    // echo "Subscribed with code ".$result->http_status_code;
	    	} else {
	    	    // echo 'Failed with code '.$result->http_status_code."\n<br /><pre>";
	    	    // var_dump($result->response);
	    	    // echo '</pre>';
	    	}
	    }
    }

    echo json_encode($data);
