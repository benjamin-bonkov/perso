<?php
				$dateEnd = new DateTime('2015-07-25');
				$dateEnd->setTime(10, 0);
				$timestampEnd = date_timestamp_get($dateEnd);
				$dateNow = getdate(); 
				$timestampNow = $dateNow[0];
				$seconds_left = ($timestampEnd - $timestampNow);
				if($seconds_left > 0){
					$days = floor($seconds_left / 86400);
					$seconds_left = $seconds_left % 86400;
					$hours = floor($seconds_left / 3600);
					$seconds_left = $seconds_left % 3600;
					$minutes = floor($seconds_left / 60);
					$seconds = $seconds_left % 60;
				}else{
					$days = 00;
					$hours = 00;
					$minutes = 00;
					$seconds = 00;
				}
			?>
			<div class="timer">
				<span id="jours"><?php echo $days ?></span> JOURS
				<span id="heures"><?php echo $hours ?></span>h
				<span id="minutes"><?php echo $minutes ?></span>m
				<span id="secondes"><?php echo $seconds ?></span>s
			</div>
<script>
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
</script>