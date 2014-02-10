<?php
define('IMAGE_PATH', './data');

scan_dir(IMAGE_PATH);

function scan_dir($dir)
{
   if($handle = opendir($dir))
   {
       while(false !== ($entry = readdir($handle)))
       {
           if($entry !== '.' && $entry !== '..')
           {
               if(is_dir($dir . '/' . $entry))
               {
                   scan_dir($dir . '/' . $entry);
               }
               else
               {
                   echo '<img src="' . $dir . '/' . $entry . '" />';
               }
           }
       }
   }
}
?>