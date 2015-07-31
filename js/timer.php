
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
	<span id="jours"><?php echo $days ?></span> <?php print $translate->_("JOURS"); ?>
	<img src="./public/images/sep-timer.png" alt="">
	<span id="heures"><?php echo $hours ?></span><?php print $translate->_("h"); ?>
	<img src="./public/images/sep-timer.png" alt="">
	<span id="minutes"><?php echo $minutes ?></span><?php print $translate->_("m"); ?>
	<img src="./public/images/sep-timer.png" alt="">
	<span id="secondes"><?php echo $seconds ?></span><?php print $translate->_("s"); ?>
</div>

<script>
$(document).ready(function(){

	var dateEnd = new Date(new Date(2015, 6, 25).setHours(10)).getTime();
	var days, hours, minutes, seconds;
	var $jours = document.getElementById("jours");
	var $heures = document.getElementById("heures");
	var $minutes = document.getElementById("minutes");
	var $secondes = document.getElementById("secondes");

	var current_date = new Date().getTime()
	,	seconds_left = (dateEnd - current_date) / 1000;
	if(seconds_left > 0){
		setInterval(function () {
			var current_date = new Date().getTime()
			,	seconds_left = (dateEnd - current_date) / 1000;

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
	}else{
		$jours.innerHTML = 00;
		$heures.innerHTML = 00;
		$minutes.innerHTML = 00;
		$secondes.innerHTML = 00;
	}
});
</script>