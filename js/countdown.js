
	// set the date we're counting down to 25/06/2015 10:00
	var dateEnd = new Date(new Date(2015, 6, 25).setHours(10)).getTime();
	var days, hours, minutes, seconds;
	var $jours = document.getElementById("jours");
	var $heures = document.getElementById("heures");
	var $minutes = document.getElementById("minutes");
	var $secondes = document.getElementById("secondes");
	setInterval(function () {
		// find the amount of "seconds" between now and target
		var current_date = new Date().getTime()
		,	seconds_left = (dateEnd - current_date) / 1000;

		// 86400/day
		days = parseInt(seconds_left / 86400);
		seconds_left = seconds_left % 86400;
		 
		hours = parseInt(seconds_left / 3600);
		seconds_left = seconds_left % 3600;
		  
		minutes = parseInt(seconds_left / 60);
		seconds = parseInt(seconds_left % 60);
		$jours.innerHTML = days;
		$heures.innerHTML = hours;
		$minutes.innerHTML = minutes;
		$secondes.innerHTML = seconds;

	}, 1000);