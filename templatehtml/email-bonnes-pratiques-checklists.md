# En cas de doute un doute => mettre une image
### une bordure ? => met une image
# basic centered TPL
```
<table align="center" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="background: #ffffff;">
    <tr>
        <td align="center" bgcolor="#ffffff" style="background: #ffffff;">            
            <table align="center" class="w460" width="460"  cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
            </table>
        </td>
    </tr>
</table>
 ```

# Reusable css :
```
<style type="text/css">
    #outlook a { padding: 0; }
	body{width: 100%; margin:0; padding:0; -webkit-font-smoothing: antialiased;}
    body, td {font-family: Arial, Helvetica, Geneva, sans-serif; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;}
    table, table td { border-collapse:collapse; }
</style>
```

# NB newsletter :
1. gmail ne comprend pas "display: block" => float permet d'obtenir un resultat similaire si besoin

2. outlook ignore la font size, si il y a un !important dedans

3. gmail mobile, du moins ceux incompatible avec les media queries (gmail ios sur email on acid) "zoom" les typo => requiere !important sur les font-size

4. pour concilier le (3) et le (4), dupliquer chaque font-size, un en importantant, l'autre non

5. ne pas utiliser de padding => support completement aléatoire d'un navigateur à l'autre (malgré ce qui est dis sur les liste de compatibilité) (bgcolor optionel) eg : padding de 10 :
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
6. idem, éviter les margins => on peu utiliser cette technique dans certains cas pour le responsive (/!\)
```
	<table align="left" valign="top" cellpadding="0" cellspacing="0" border="0" style="border:none;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;"><tr><td>[tableau1]</td></tr></table>
	<table align="left" valign="top" height="20" width="15" class="w20" cellpadding="0" cellspacing="0" border="0" style="border:none;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;"><tr><td>&nbsp;</td></tr></table>
	<table align="left" valign="top" cellpadding="0" cellspacing="0" border="0" style="border:none;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;"><tr><td>[tableau2]</td></tr></table>
```
7. toute couleur dois utiliser la version non symplifié de l'hexa #ffffff et pas #fff

8. remplir les <td> vides avec (ne prend pas tjrs en compte le TD sinon eg: outlook2007)

9. sur tout les table (sauf cas particulier) /!\ suppression des bordures /!\
```
	<table valign="top" cellpadding="0" cellspacing="0" border="0" style="border:none;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;"><tr><td>[tableau1]</td></tr></table>
```
10. sur toute les <img /> => style="border:none;border-radius:;display:block;outline:none;text-decoration:none;" (évite des bordure auto en cas de lien et autres joyeuseté)

11. pour toute adresse / numéros de téléphone, lien dont on veut empecher les styling automatique => dans le head

		<style>
	        .forceLinkBlack a{color: #000000!important; text-decoration: none;}
	        .forceLinkGrey a{color: #858585!important; text-decoration: none;}
	        .forceLinkRegular a{color: #333333!important; text-decoration: none!important;}
	    </style>
=> `<span class="forceLinkBlack"></span>`
12. pour utiliser commentaire conditionnels outlook :
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
13. PB scaling outlook 120 dpi => après avoir activé les commentaires conditionnels pour outlook, dans le head
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
hightlight étrange de office => ajouter la class "owaContextualHighlight" sur le td concerné => dans le

    <style>
    .owaContextualHighlight span {border:none!important; color:inherit!important;}
    </style>
```
14. outlook web supprime les style des liens : => ajouter un <span> dans le <a> avec les même styles
(pire que ça, peu casser les style des textes suivant sur les version web...)
```
	<a href="#" style="color: #049cd7; text-decoration: underline;"><span style="color: #049cd7; text-decoration: underline;">sur notre site</span></a></p>
```
15. outlook web & office 365 supprime les bordures des tableaux se trouvant dans des <a> => mettre les bordures sur les <td>

17. `<a>` contenant un `<table>` ne sont pas pris en compte sur outlook

18. si lien "style bouton" (cad avec une hauteur et des paddings) => utiliser une image, méga galère sur outlook si texte variable => GL HF, ou alors mettre seulement le texte clickable et gerer les "padding" [https://litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design]
```
<p>
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr><td>
			<table border="0" cellspacing="0" cellpadding="0" align="center">
				<tr>
					<td bgcolor="#23c4e3" style="padding: 12px 18px 12px 18px; border-radius:3px" align="center">
						<a href="#" target="_blank" style="font-size: 16px; color: #ffffff; text-decoration: none; display: inline-block;">
							<span style="font-size: 16px; color: #ffffff; text-decoration: none; display: inline-block;">I am a button</span>
						</a>
					</td>
				</tr>
			</table>
		</td></tr>
	</table>
</p>
```
19. Block responsive ( X blocks cote à cote, passage full width en dessous de 600px de large)
Dans le `<head>` : 
```
<style type="text/css">
	@media only screen and (max-width:600px) {
		body { min-width:320px; width:100% !important; margin:0 auto; padding:0; }
		table[class="blockMobile"] {width:100% !important;}
		table[class="block3"], a[class="block3"] {min-width: 100% !important; margin: 0 auto;}
		img[class="miaouFluidImage"] { width:100% !important; height:auto !important; }
		a[class="miaouShowOnMobile"] { max-height:none !important; font-size:13px !important; display:block !important; text-decoration:none; background:#73c040; padding:10px; text-align:center; }
	}
</style>
```
Dans le `<body>` (width en %, avec total % < 100%, outlook gere mal les tailles et les fera passer à la ligne sinon
```
<!-- 2 block full -->
<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
    <tr><td>
        <table cellpadding="0" cellspacing="0" border="0" width="600" class="blockMobile" align="center"  style="margin:0 auto;" bgcolor="#ffffff"> 
            <tr>
                <td>
                    <!-- block1 -->
                    <table class="blockMobile" width="49.5%" height="175" border="0" cellspacing="0" cellpadding="0" align="left" bgcolor="#f3f3f3" style="text-align: center;">
                        <tr><td height="20" style="font-size: 1px; font-size: 1px!important; border:none;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">&nbsp;</td>
                        <tr>
                            <td height="60" vertical-align="middle" style="font-size: 14px; font-weight: bold; text-transform: uppercase;">
                               block1
                            </td>
                        </tr>
                        <tr><td height="20" style="font-size: 1px; font-size: 1px!important; border:none;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">&nbsp;</td>
                    </table>
                    <!-- / block1 -->
                    <!-- block2 -->
                    <table class="blockMobile" width="49.5%" height="175" border="0" cellspacing="0" cellpadding="0" align="left" bgcolor="#f3f3f3" style="text-align: center;">
                        <tr><td height="20" style="font-size: 1px; font-size: 1px!important; border:none;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">&nbsp;</td>
                        <tr>
                            <td height="60" vertical-align="middle" style="font-size: 14px; font-weight: bold; text-transform: uppercase;">
                               block1
                            </td>
                        </tr>
                        <tr><td height="20" style="font-size: 1px; font-size: 1px!important; border:none;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">&nbsp;</td>
                    </table>
                    <!-- / block2 -->
                </td>
            </tr>
        </table>
    </td></tr>
</table>
<!-- / 2 block full -->
```
 

 

 