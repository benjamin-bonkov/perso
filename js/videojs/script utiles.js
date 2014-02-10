$(function(){
  //cache controle au fullScreen
  var myPlayer = V("example_video_1");
     var myFunc = function(){
             var myPlayer = this;            
             //console.log(myPlayer.controlBar);
             if(myPlayer.controlBar.player.isFullScreen){
                     myPlayer.controlBar.hide();
             } else {
                     myPlayer.controlBar.show();
             }
     };
     myPlayer.addEvent("fullscreenchange", myFunc);

//ajoute une class au fullscreen
var $video = $("video"),
        nbVideo = $video.length;
//var myPlayer = V("example_video_1");
console.log($video)
for(var i=0; i<nbVideo; i++){
        console.log($video.eq(i).attr("id"))
        var myPlayer = V($video.eq(i).attr("id")),
                id =$video.eq(i).attr("id");
               
       function fullscreenchange(){
               $(".playerVideo").toggleClass("fullscreen");
               console .log("coucou fullscreen"+ id)
       }
        myPlayer.addEvent("fullscreenchange", fullscreenchange);

}