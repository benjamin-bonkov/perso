<!DOCTYPE html>
<html>
  <head>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script type="text/javascript" src="https://platform.twitter.com/widgets.js"></script>
  </head>
  <body>
    <script>
      $(document).ready(function() {
        var url = "https://twitter.com/intent/tweet?" + $.param({
          url: "http://www.google.com",
          text: "text"
        });
        
        $(window).bind("message", function(event) {
          event = event.originalEvent
          if(event.source == share_window && event.data != "__ready__") {
            console.log($.parseJSON(event.data));
          }
        });
        var share_window = window.open(url);
      });
    </script>
  </body>
</html>