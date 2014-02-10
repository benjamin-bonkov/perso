<div>
	<p class="left"><span class="lastTweet">les derniers tweets</span> <span class="green">@_SOOYOOS_</span></p>
	<a href="https://twitter.com/_sooyoos_" class="twitter-follow-button" data-show-count="false" data-size="large">Follow @_sooyoos_</a>
	<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
</div>

<?php 
$consumer_key='CY0RsmW4H7czBp8gbpyLw'; //Provide your application consumer key
$consumer_secret='bEZDGl0SKIjffCrhaYqBZUM5mUCVquArisRSWTAXhTw'; //Provide your application consumer secret
$oauth_token = '266714640-mfXlo56hC2AfwNJkiEB96jS7Uhw1WhtTerrHMppg'; //Provide your oAuth Token
$oauth_token_secret = 'TqcMPkC1oqmfxnYXdaBC45Kvpkq3hXjD50rOfLhLORD9i'; //Provide your oAuth Token Secret

require_once('twitteroauth/twitteroauth/twitteroauth.php');
$connection = new TwitterOAuth($consumer_key, $consumer_secret, $oauth_token, $oauth_token_secret);

$query = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=_sooyoos_&count=2'; //Your Twitter API query
$tweets = $connection->get($query);
// var_dump($tweets);
function convertLinkFromTweet($tweet){
	//Convert urls to <a> links
	$tweet = preg_replace("/([\w]+\:\/\/[\w-?&;#~=\.\/\@]+[\w\/])/", "<a target=\"_blank\" href=\"$1\">$1</a>", $tweet);
	//Convert hashtags to twitter searches in <a> links
	$tweet = preg_replace("/#([A-Za-z0-9\/\.]*)/", "<a target=\"_new\" href=\"http://twitter.com/search?q=$1\">#$1</a>", $tweet);
	//Convert attags to twitter profiles in <a> links
	$tweet = preg_replace("/@([A-Za-z0-9\/\.]*)/", "<a href=\"http://www.twitter.com/$1\">@$1</a>", $tweet);
	return $tweet;
}
?>
<div class="tweets">
<?php foreach ($tweets as $tweet) : ?>
	<div class="tweet">
		<img src="<?php echo $tweet->user->profile_image_url; ?>" alt="">
		<?php echo $tweet->user->name; ?>
		<?php echo $tweet->user->screen_name; ?>
		<?php echo convertLinkFromTweet($tweet->text); ?>
	</div>
		<!-- <?php var_dump($tweet->entities->url); ?> -->
<?php endforeach; ?>
</div>