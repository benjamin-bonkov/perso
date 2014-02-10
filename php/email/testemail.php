<?php

/**
 * TEST validation des emails
 * @author max
 * @copyright 2010
 */
 
 
define('MAILNAME','Test envoi');
define('MAILEMAIL','noreply@commonbox.net');
define('URLSITE','http://192.168.0.18/email/');

function mail_utf8($e_mail, $subject, $message, $headers = '')
 {
  // add headers for utf-8 message
  $headers = "From: \"".MAILNAME."\" <".MAILEMAIL.">\r\n";   
  $headers .= "MIME-Version: 1.0\r\n";  
  $headers .= "Content-type: text/html; charset=utf-8;\r\n";
  $headers .= "Content-Transfer-Encoding: 8bit\r\n";


  $subject="=?UTF-8?B?".base64_encode($subject)."?=\n";


  return(mail("$e_mail", "$subject", "$message", "$headers"));
 }
 

 
$content_html = '
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>Partage - SNCF jeu concours</title>
</head>
<body>
<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4" style="font-family: arial, sans-serif;"> 
<tr><td>
  <table cellpadding="0" cellspacing="0" border="0" width="599" align="center" bgcolor="#f4f4f4">
    <tr>
      <td>
        <img src="'.URLSITE.'images/mail_03.jpg" style="display:block;" alt="JEU-CONCOURS Trouve-moi si tu peux ?" />
      </td>
    </tr>
    <tr>
      <td>
        <table cellpadding="0" cellspacing="0" border="0" width="599" align="center" bgcolor="#ffffff">
          <tr>
            <td>
              <img src="'.URLSITE.'images/mail_05.jpg" style="display:block;" alt="JOUEZ AVEC LES SERVICES TGV ET TENTEZ DE GAGNER DES CENTAINES DE CADEAUX !" />
            </td>
          </tr>
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" width="599" align="center" bgcolor="#ffffff">
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" border="0" width="299" align="center" bgcolor="#ffffff">
                      <tr>
                        <td>
                          <table cellpadding="0" cellspacing="0" border="0" width="299" align="center" bgcolor="#ffffff" style="color: #4d4f53; font-size: 12px;">
                            <tr>
                              <td width="30"></td>
                              <td>
                                <p style="font-family: arial, sans-serif;">
                                  <strong>Bonjour,</strong><br />
                                  <br />
                                  <strong><?php if(isset($_GET["parrain"])) echo strip_tags($_GET["parrain"]); ?></strong> vous a invité à participer au grand jeu Trouve-moi si tu peux ? <br />
                                  <br />
                                  A gagner : <br />
                                  <br />
                                  <span style="color:#009aa6;">
                                    > <strong>1 AN DE TGV SERVICES INCLUS*</strong><br />
                                    > 1 LOCATION PRESTIGE AVIS <br />
                                    > 1 SET DE VOYAGE DELSEY <br />
                                    > ET DES CENTAINES DE SERVICES TGV <br />
                                  </span><br />
                                  Pour participer, il vous suffit de répondre à 4 questions !
                                  <br />
                                  <br />
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table cellpadding="0" cellspacing="0" border="0" width="299" align="center" bgcolor="#ffffff" style="color: #4d4f53; font-size: 12px;">
                            <tr>
                              <td width="30"></td>
                              <td width="141" height="50">
                                <a href="index.php?from=mail" style="display: block;">
                                  <img src="'.URLSITE.'images/mail_10.jpg" style="display:block;" alt="JE PARTICIPE" />
                                </a>
                              </td>
                              <td width="128"></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td>              
                    <table cellpadding="0" cellspacing="0" border="0" width="300" align="center" bgcolor="#ffffff">
                      <tr>
                        <td>
                          <img src="'.URLSITE.'images/mail_08.jpg" style="display:block;" alt="" />
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <img src="'.URLSITE.'images/mail_12.jpg" style="display:block;" alt="" />
            </td>
          </tr>
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0" width="599" align="center" bgcolor="#ffffff">
                <tr>
                  <td width="45">
                    <img src="'.URLSITE.'images/mail_16.jpg" style="display:block;" alt="" />
                  </td>
                  <td width="80">
                    <a href="sncf.com" style="color: #908880; font-size: 11px; display: block; border-right: 1px solid #908880; font-family: arial, sans-serif;">SNCF.COM</a>
                  </td>
                  <td width="474"></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <img src="'.URLSITE.'images/mail_18.jpg" style="display:block;" alt="" />
            </td>
          </tr>
        </table>
      </td>
    </tr>   
    <tr>
      <td>
        <table cellpadding="0" cellspacing="0" border="0" width="599" align="center" bgcolor="#f4f4f4">
          <tr>
            <td>
              <p style="color: #908880; font-size: 11px;">
                *Voir règlement sur le site, lot principal d’une valeur maximale de 16 275€ comprenant des billets de train sur le périmètre France et des prestations de services.  <br />
                <br />
                Cette communication vous est envoyée par SNCF – 34, rue du commandant Mouchotte – 75014  Paris Cedex. RCS Paris B 552 049 447 <br />
                <br />
                Conformément aux articles 39 et suivants de la loi du 6 janvier 1978 relative à l\'informatique, aux fichiers et aux libertés, vous pouvez exercer votre droit d\'accès, de rectification, de suppression et d\'opposition au traitement des données vous concernant en adressant un message électronique à jeu-voyagissimes@servicesfactory-sncf.com, ou un courrier à SNCF Voyages - Direction Marketing – 2 place de la Défense - CNIT 1 - BP440 - 92053 Paris La Défense Cedex. <br />
                <br />
                Ce message est envoyé par un automate, merci de ne pas y répondre. Votre réponse ne pourra être traitée. <br />
                <br />
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</td></tr>
</table>
</body>
</html>

';
					
					
  	mail_utf8("Benjamin <benjamin@sooyoos.com>", "Test d'envoi email", $content_html);
    mail_utf8("Benjamin <benjamin-bonnetkovacs@cifacom.com>", "Test d'envoi email", $content_html);
    //mail_utf8("Guillaume <guillaume@sooyoos.com>", "Test d'envoi email", $content_html);
    //mail_utf8("Maximilien w <maximilienwecxsteen@gmail.com>", "Test d'envoi email", $content_html);

 
 
?>