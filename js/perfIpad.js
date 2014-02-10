
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
        triggerClick = "touchend";
    }


$(document).ready(function() {
    $(".el").bind(triggerClick, function(){

    });
});