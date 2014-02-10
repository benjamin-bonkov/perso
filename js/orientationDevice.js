if(typeof orientation === 'undefined'){
}else{
    if ( orientation == 0 ) {
		alert ('Portrait Mode, Home Button bottom');
    }
    else if ( orientation == 90 ) {
		alert ('Landscape Mode, Home Button right');
    }
    else if ( orientation == -90 ) {
		alert ('Landscape Mode, Home Button left');
    }
    else if ( orientation == 180 ) {
		alert ('Portrait Mode, Home Button top');
    }
}