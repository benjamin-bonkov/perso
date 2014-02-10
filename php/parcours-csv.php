<?php
if($lang == "fr"){
	$handle = fopen(APPLICATION_ROOT."/csv/FR_country.csv", "r");
}else{
	$handle = fopen(APPLICATION_ROOT."/csv/EN_country.csv", "r");
}

while(($the_line = fgets($handle)) !== FALSE){
	$data = explode(';', $the_line);
	$target = utf8_encode($data[1]);
	$mailPays[$target] = $data[2];
}
fclose($handle);
?>