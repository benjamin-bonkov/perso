function canIUseCss(name) {
	var prefixes = ['Webkit', 'Moz', 'O', 'ms', '']
	  , testStyle = document.createElement('div').style;

	for (var i = 0; i < prefixes.length; ++i) {
	    if (testStyle[prefixes[i] + name] !== undefined) {
	        return prefixes[i] + name;
	    }
	}
    // Not Supported
    return;
}
!!canIUseCss("transition");