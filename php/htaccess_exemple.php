# a mettre avant les wp

RewriteCond %{REQUEST_URI} ^/product(/){0,1}$
RewriteRule (.*) / [L,R=301]
RewriteCond %{REQUEST_URI} ^/fr/product(/){0,1}$
RewriteRule (.*) /fr/ [L,R=301]