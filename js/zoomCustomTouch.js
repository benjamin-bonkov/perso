//scrollCustom
document.querySelector("#visuelSlider li").addEventListener("gesturechange",function(e){
  e.preventDefault();
  document.querySelector("#visuelSlider li").style.WebkitTransform = "scale("+e.scale+")";
})
document.querySelector("#visuelSlider li").addEventListener("gestureend",function(e){
  e.preventDefault();
 alert(scale);
})