
<!-- facebook -->
<a href="https://www.facebook.com/sharer/sharer.php?u=www.url-to-share.fr" target="_blank" class="share-article__link share-article__link-facebook">share facebook</a>
<!-- twitter -->
<a href="https://twitter.com/home?status=Titre de l'article www.url-to-share.fr" target="_blank" class="share-article__link share-article__link-twitter">share twitter</a>
<!-- linkedin -->
<a href="https://www.linkedin.com/shareArticle?mini=true&url=www.url-to-share.fr&title=Titre de l'article&summary=Description de l'article&source=Source-titre" target="_blank" class="share-article__link share-article__link-linkedin">share linkedin</a>
<!-- plus.google -->
<a href="https://plus.google.com/share?url=www.url-to-share.fr" target="_blank" class="share-article__link share-article__link-linkedin">share google</a>

<?php
	// pas apple ni android
$urlShareFb = "http://www.facebook.com/sharer.php?s=100&p[url]=http://h.sooyoos.com/usnap-voeux/&p[images][0]=http://h.sooyoos.com/usnap-voeux/public/images/boite-a-voeux.png&p[title]=Avec la boite à voeux, découvre toi aussi plein de façons différentes de souhaiter la bonne année...&p[summary]=u SNAP VOUS SOUHAITE UNE BONNE ANNÉE. En 2013, les publicités nationales de votre journal s'enrichissent avec U SNAP. Vous pouvez désormais flasher votre page afin d'y retrouver des promotions, informations, offres privilégiées...&display=popup";
	//apple
if(strstr($_SERVER['HTTP_USER_AGENT'],'iPhone') || strstr($_SERVER['HTTP_USER_AGENT'],'iPod') || strstr($_SERVER['HTTP_USER_AGENT'],'iPad')){
	$urlShareFb = "http://m.facebook.com/sharer.php?u=http://h.sooyoos.com/usnap-voeux/";
}
	//android
$ua = strtolower($_SERVER['HTTP_USER_AGENT']);
if(stripos($ua,'android') !== false) {
	$urlShareFb = "http://m.facebook.com/sharer.php?u=http://h.sooyoos.com/usnap-voeux";
}
?>
<a class="facebook-btn" href="<?php echo $urlShareFb; ?>" target="_blank" title="Partager sur Facebook">
	<img src="public/images/facebook.png" alt="" width="61"/>
</a>


<a class="twitter-btn" href="https://twitter.com/share?text=Grâce au quiz STIF, tente de gagner un forfait Navigo Annuel #quizstif"  target="_blank" title="Partager sur Twitter">
	<img src="./public/images/twitter.png" alt="" width="27" />
</a>

<a href="http://twitter.com/home?status=<?php echo $this->activeArticle->getTitle(); ?> on rolexgrandslam.eurosport.com<?php echo $this->baseUrl();?>/article/<?php $this->activeArticle->getArticleId();?>" class="twitter" target="_blank"></a>
<script>
	$('.twitter').click(function(event) {
		var width  = 575,
		height = 260,
		left   = ($(window).width()  - width)  / 2,
		top    = ($(window).height() - height) / 2,
		url    = "http://twitter.com/home?status=<?php echo $this->activeArticle->getTitle(); ?> on http://rolexgrandslam.eurosport.com<?php echo $this->baseUrl();?>/article/<?php echo $this->activeArticle->getArticleId();?>",
		opts   = 'status=1' +
		',width='  + width  +
		',height=' + height +
		',top='    + top    +
		',left='   + left;

		window.open(url, 'twitter', opts);

		return false;
	});
</script>

<a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p[url]=http://rolexgrandslam.eurosport.com<?php echo $this->baseUrl();?>/article/<?php echo $this->activeArticle->getArticleId();?>&amp;p[images][0]=http://rolexgrandslam.eurosport.com<?php echo $this->baseUrl(Article::UPLOAD_DIR.$this->activeArticle->getPicture()); ?>&amp;p[title]=<?php echo $this->activeArticle->getTitle(); ?>&amp;p[summary]=<?php echo $this->activeArticle->getResume(); ?>" class="facebook" target="_blank"></a>
<script>
	$('.facebook').click(function(event) {
		var width  = 575,
		height = 400,
		left   = ($(window).width()  - width)  / 2,
		top    = ($(window).height() - height) / 2,
		url    = this.href,
		opts   = 'status=1' +
		',width='  + width  +
		',height=' + height +
		',top='    + top    +
		',left='   + left;

		window.open(url, 'facebook', opts);

		return false;
	});
</script>

<a href="https://plus.google.com/share?url=http://rolexgrandslam.eurosport.com<?php echo $this->baseUrl();?>/article/<?php echo $this->activeArticle->getArticleId();?>" class="googleplus" target="_blank"></a>
<script>
	$('.googleplus').click(function(event) {
		var width  = 575,
		height = 400,
		left   = ($(window).width()  - width)  / 2,
		top    = ($(window).height() - height) / 2,
		url    = this.href,
		opts   = 'status=1' +
		',width='  + width  +
		',height=' + height +
		',top='    + top    +
		',left='   + left;

		window.open(url, 'facebook', opts);

		return false;
	});
</script>

<div class="addthis_toolbox mail">
	<a class="addthis_button_email"></a>
</div>
<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=xa-51bf0955431bdaaa"></script>
<script type="text/javascript">
	var addthis_share = 
	{ 
		title: '<?php echo $this->activeArticle->getTitle(); ?>'
	}
</script>
</div>

<script>
	/**** share ****/
	/**** fb ****/
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/fr_FR/sdk.js#xfbml=1&appId=837150796315378&version=v2.0";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	window.baseUrl  = '';
	window.fb = { 
		permissions :'', 
		share: {
			title: 'Skin-Absolute®', 
			description: "Le nouveau soin anti-âge ultime nuit Filorga à l’extrait de Météorite.",
			picture: 'http://skin-absolute.filorga.com/public/dist/images/Filorga_Skin-Absolute-ShareFacebook.png',
			link: 'http://skin-absolute.filorga.com/'
		}
	};

	$('a.fb').click(function(e){
		e.preventDefault();
		FB.ui({
			method:'feed',
			name: window.fb.share.title,
			description: window.fb.share.description,
			picture: window.fb.share.picture,
			link: window.fb.share.link
		})
	})

	/**** twitter ****/
	window.twitter = {
		text: "Le nouveau soin anti-âge ultime nuit Filorga à l’extrait de Météorite.",
		url: "http://skin-absolute.filorga.com",
		hashtag: ''
	};
	$('a.twitter').click(function(e){
		e.preventDefault();
		var url = 'http://' + window.location.host + window.baseUrl;
		window.open('https://twitter.com/share?url=' + encodeURI(window.twitter.url) + '&text=' + window.twitter.text + '&hashtags=' + window.twitter.hashtag , 'twitter', 'menubar=no, location=no, width=400, height=300');
	})


	//twitter follow

	$(".twitter-follow").bind("click", function(e){
		e.preventDefault();
		var width  = 680,
		height = 575,
		// left   = ($(window).width()  - width)  / 2,
		// top    = ($(window).height() - height) / 2,
		url    = "https://twitter.com/intent/follow/?screen_name=@pqr66",
		opts   = 'status=1' +
		',width='  + width  +
		',height=' + height //+
		// ',top='    + top    +
		// ',left='   + left;

		window.open(url, 'twitter', opts);

		return false;
	 });

	// gplus
	// https://developers.google.com/+/web/share/interactive#button_design
	// https://console.developers.google.com/project?authuser=2
	'
	    <button
	        class="g-interactivepost googlePlus"
	        data-contenturl="http://enfaitcestpossible.com"
	        data-contentdeeplinkid=""
	        data-clientid="34020407879-k2nt600s4n8tho7c8onkcckc2seadcj2.apps.googleusercontent.com"
	        data-cookiepolicy="single_host_origin"
	        data-prefilltext="Découvrez tous les possible sur enfaitcestpossible.com"
	        data-calltoactionlabel="CREATE"
	        data-calltoactionurl="http://enfaitcestpossible.com"
	        data-calltoactiondeeplinkid="">
	        Tell your friends
	    </button>
		<script type="text/javascript">
			(function() {
			   var po = document.createElement("script"); po.type = "text/javascript"; po.async = true;
			   po.src = "https://apis.google.com/js/client:plusone.js";
			   var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(po, s);
			 })();
		</script>
	'


	/**** google+ ****/
	window.gplus = {
		text: title,
		url: window.location.href
	};
	$('[data-network="gplus"]').click(function(e){
		e.preventDefault();
		window.open('https://plus.google.com/share?url='+window.gplus.url);
	})

</script>