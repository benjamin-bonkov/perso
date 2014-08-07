<?php 
	header("Content-Type: text/plain"); // Utilisation d'un header pour spécifier le type de contenu de la page. Ici, il s'agit juste de texte brut (text/plain). 

	$xml = (isset($_POST["xml"])) ? $_POST["xml"] : NULL;
	if ($xml != NULL){
		$fp=fopen("monXML.xml","w");
		fwrite($fp,$xml); 
		echo "ecriture xml terminée";
	}else{
		echo "error ecriture xml";
	}
?>