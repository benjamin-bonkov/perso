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
        height = 200,
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