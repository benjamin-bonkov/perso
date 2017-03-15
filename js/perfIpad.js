
    function isTouchDevice(){
        try{
            document.createEvent("TouchEvent");
            return true;
        }catch(e){
            return false;
        }
    }
    var triggerClick = "click";
    if(isTouchDevice()){
        triggerClick = "touchstart";
    }


$(document).ready(function() {
    $(".el").bind(triggerClick, function(){

    });
});