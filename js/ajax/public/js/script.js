$(document).ready(function(){

	var $execAjax = $("#execAjax"),
		$contentRecup = $("#contentRecup"),
        $contentAfter = $("#contentAfter"),
        i=0;

	/*créer un objet XMLhttpRequest*/
        function getXMLHttpRequest() {
            var xhr = null;
            
            if (window.XMLHttpRequest || window.ActiveXObject) {
                if (window.ActiveXObject) {
                    try {
                        xhr = new ActiveXObject("Msxml2.XMLHTTP");
                    } catch(e) {
                        xhr = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                } else {
                    xhr = new XMLHttpRequest(); 
                }
            } else {
                alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
                return null;
            }
            
            return xhr;
        }

        /*on demande au fichier php d'écrire dans le fichier xml*/
        function writeXML($xml){
            /*on a déjà recuperer les donnéees, on ecrit*/
            console.log("ecriture xml");
            var newXML = encodeURIComponent($('<div>').append($xml.clone()).html());
            var xmlhttp = getXMLHttpRequest();

            /*GET => penser a changer le php*/
			/*
            * xmlhttp.open("GET", "./public/xml/writeXML.php?xml="+newXML, true);
            * xmlhttp.send();
            */

            /*POST*/
            xmlhttp.open("POST", "./public/xml/writeXML.php", true);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send("xml="+newXML);
            
        }

        /*on récupere le xml et on appelle le callBack(normalement writeXML)*/
        function updateXML(callback){            
            var xmlhttp = getXMLHttpRequest();

            xmlhttp.onreadystatechange= function(){
                if (xmlhttp.readyState==4 && xmlhttp.status==200){

                    console.log("read xml");
                    var XML = xmlhttp.responseXML,
                    $XML =$(XML.documentElement);
                    $contentRecup.append($('<div>').append($XML.clone()).html());

                    console.log($XML);
                    var $newRow = $("\n"+
                                    "\t\t<marquage>\n"
                                        +"\t\t<colGoy>nouvelle ligne "+i+" !</colGoy>\n"
                                    +"\t</marquage>"
                                    +"\n\n");
                    $XML.append($newRow);
                    $contentAfter.append($XML);
                    callback($XML);
                }
            }

            xmlhttp.open("GET","./public/xml/monXML.xml",true);
            xmlhttp.send();
        }

        $execAjax.click(function(e){
            updateXML(writeXML);
        });

});






