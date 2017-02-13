NB newsletter :

1) gmail ne comprend pas "display: block" => float permet d'obtenir un resultat similaire si besoin

2) outlook ignore la font size, si il y a un !important dedans

3) gmail mobile, du moins ceux incompatible avec les media queries (gmail ios sur email on acid) "zoom" les typo => requiere !important sur les font-size

4) pour concilier le (3) et le (4), dupliquer chaque font-size, un en importantant, l'autre non

5) ne pas utiliser de padding => support completement aléatoire d'un navigateur à l'autre (malgré ce qui est dis sur les liste de compatibilité) (bgcolor optionel)
	eg : padding de 10 :
```
	 <table cellpadding="0" cellspacing="0" border="0"  valign="top"  bgcolor="#ffffff" style="border:none;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
        <tr>
            <td width="10"></td>
            <td>
                <table cellpadding="0" cellspacing="0" border="0"  valign="top" style="border:none;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
                	<tr height="10"><td></td></tr>
                	<tr><td></td></tr>
                	<tr height="10"><td></td></tr>
                </table>
            </td>
        </tr>
    </table>
```

6) idem, éviter les margins
	=> on peu utiliser cette technique dans certains cas pour le responsive (/!\)
```
	<table align="left" valign="top" cellpadding="0" cellspacing="0" border="0" style="border:none;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;"><tr><td>[tableau1]</td></tr></table>
	<table align="left" valign="top" height="20" width="15" class="w20" cellpadding="0" cellspacing="0" border="0" style="border:none;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;"><tr><td>&nbsp;</td></tr></table>
	<table align="left" valign="top" cellpadding="0" cellspacing="0" border="0" style="border:none;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;"><tr><td>[tableau2]</td></tr></table>
```

7) toute couleur dois utiliser la version nons suymplifié de l'hexa #ffffff et pas #fff

8) remplir les `<td>` vides avec &nbsp; (ne prend pas tjrs en compte le TD sinon eg:outlook2007)

9) sur tout les table (sauf cas particulier) /!\ suppression des bordures /!\
```
	<table valign="top" cellpadding="0" cellspacing="0" border="0" style="border:none;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;"><tr><td>[tableau1]</td></tr></table>
```

10) sur toute les `<img />`
	=> style="border:none;border-radius:;display:block;outline:none;text-decoration:none;"
		(évite des bordure auto en cas de lien et autres joyeuseté)

11) pour toute adresse / numéros de téléphone, lien dont on veut empecher les styling automatique
	=> dans le head
```
		<style>
	        .funkingLinkBlack a{color: #000000!important; text-decoration: none;}
	        .funkingLinkGrey a{color: #858585!important; text-decoration: none;}
	        .fuckingLinkRegular a{color: #333333!important; text-decoration: none!important;}
	    </style>
```
	=> 
```
		<span class="funkingLinkBlack"></span>
```

12) pour utiliser commentaire conditionnels outlook :
```
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
	<head>

    	<!--[if !mso]><!-- -->
    	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    	<!--<![endif]-->

	    <!--[if mso]>
	    <xml>
	      <o:OfficeDocumentSettings>
	        <o:AllowPNG/>
	        <o:PixelsPerInch>96</o:PixelsPerInch>
	      </o:OfficeDocumentSettings>
	    </xml>
	    <![endif]-->
	    <!--[if lte mso 11]>
	    <style type="text/css">
	      .outlook-group-fix {
	        width:100% !important;
	      }
	    </style>
	    <![endif]-->
	</head>
	[...]
```

13) PB scaling outlook 120 dpi
	=> après avoir activé les commentaires conditionnels pour outlook, dans le head
```
	    <!--[if mso]>
	    <xml>
	      <o:OfficeDocumentSettings>
	        <o:AllowPNG/>
	        <o:PixelsPerInch>96</o:PixelsPerInch>
	      </o:OfficeDocumentSettings>
	    </xml>
	    <![endif]-->
	    <!--[if lte mso 11]>
	    <style type="text/css">
	      .outlook-group-fix {
	        width:100% !important;
	      }
	    </style>
	    <![endif]-->
```

14) hightlight étrange de office 
	=> ajouter la class "owaContextualHighlight" sur le td concerné
	=> dans le <head>
```
    <style>
    .owaContextualHighlight span {border:none!important; color:inherit!important;}
    </style>
```

15) outlook web supprime les style des liens :
	=> ajouter un `<span>` dans le `<a>` avec les même styles
```
	<a href="#" style="color: #049cd7; text-decoration: underline;"><span style="color: #049cd7; text-decoration: underline;">sur notre site</span></a></p>
```

15) outlook web & office 365 supprime les bordures des tableaux se trouvant dans des `<a>`
	=> mettre les bordures sur les `<td>`