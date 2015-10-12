<?php
require_once('inc/recaptchalib.php');
$publickey = "6LeUfA0TAAAAAHwVg7uV7dY5L0b-tX-bee-MmiPe"; // you got this from the signup page
$privatekey = "6LeUfA0TAAAAAIMq9IsJu0TIWUHpDO4Sv1689gHe";
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr">
<head>
<title>Validating reCaptcha with jQuery and AJAX</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
<script type="text/javascript">
function validateCaptcha()
{
    challengeField = $("input#recaptcha_challenge_field").val();
    responseField = $("input#recaptcha_response_field").val();
    //alert(challengeField);
    //alert(responseField);
    //return false;
    var html = $.ajax({
    type: "POST",
    url: "ajax.recaptcha.php",
    data: "recaptcha_challenge_field=" + challengeField + "&recaptcha_response_field=" + responseField,
    async: false
    }).responseText;
    
    if(html == "success")
    {
        $("#captchaStatus").html("Success. Submitting form.");
        return false;
        // Uncomment the following line in your application
        //return true;
    }
    else
    {
        $("#captchaStatus").html("Your captcha is incorrect. Please try again");
        Recaptcha.reload();
        return false;
    }
}
</script>
<style>
#login form
{
    width: 320px;
}
</style>
</head>
<body class="login" onKeyPress="keyCheck(event)">
<div id="login">
<form name="loginform" id="loginform" action="#" method="post" onSubmit="return validateCaptcha()">
	<p>
		<label>Name<br />
		<input type="text" id="name" name="name" class="input" value="" size="20" tabindex="20" /></label>
	</p>
    <p><?php echo recaptcha_get_html($publickey);?></p>
    <p style="color: red;" id="captchaStatus">&nbsp;</p>
    <input type="submit" name="Submit" value="Submit">
</form>
</div>
</body>
</html>