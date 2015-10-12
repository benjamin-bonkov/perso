<?php
require_once('inc/recaptchalib.php');
$publickey = "6LeUfA0TAAAAAHwVg7uV7dY5L0b-tX-bee-MmiPe"; // you got this from the signup page
$privatekey = "6LeUfA0TAAAAAIMq9IsJu0TIWUHpDO4Sv1689gHe";

$resp = recaptcha_check_answer ($privatekey,
                                $_SERVER["REMOTE_ADDR"],
                                $_POST["recaptcha_challenge_field"],
                                $_POST["recaptcha_response_field"]);

if ($resp->is_valid) {

echo "success";
}
else 
{
    die ("The reCAPTCHA wasn't entered correctly. Go back and try it again." .
       "(reCAPTCHA said: " . $resp->error . ")");
}