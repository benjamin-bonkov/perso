
//home
    setTimeout(function(){
        $(".skip").fadeIn();
    },2000);


    $(".skip").bind(down, function(e){
        ga('send', {
            'hitType': 'event', // Required.
            'eventCategory': 'home',    // Required.
            'eventAction': 'Voir les interview',    // Required.
            'eventLabel': 'Chargement de la template',
            // 'eventValue': 4
        });
        e.preventDefault();
        e.stopPropagation();
        $("#home").hide();
        $drawingArea.fadeIn();
        if($("html").hasClass("lt-ie9") || !supportCanvas){
            animIE();
            ga('send', {
                'hitType': 'event',          // Required.
                'eventCategory': 'Template de base',   // Required.
                'eventAction': 'Affichage',      // Required.
                'eventLabel': 'Affichage',
                'eventValue': 4
            });
        }else{
            ga('send', {
                'hitType': 'event',          // Required.
                'eventCategory': 'Template Perso (dessin)',   // Required.
                'eventAction': 'Affichage',      // Required.
                'eventLabel': '',
                'eventValue': 4
            });
        }
    });

    $("#home").bind(down,function(e){
        ga('send', {
            'hitType': 'event', // Required.
            'eventCategory': 'home',    // Required.
            'eventAction': 'Voir les interview',    // Required.
            'eventLabel': 'Chargement de la template',
            // 'eventValue': 4
        });
        $("#home").hide();
        $drawingArea.fadeIn();
        startMoving(e);
        if($("html").hasClass("lt-ie9") || !supportCanvas){
            animIE();
        }else{
            setRectGuid();
        }
    })
//pages
    $(".showPageHorsChamp").bind(triggerClick, function(e){
        e.preventDefault();
        $($(this).attr("data-target")).toggleClass("hidden");
    });

    $(".horsChamp .close").bind(triggerClick, function(e){
        e.preventDefault();
        $(this).closest(".horsChamp").addClass("hidden");
        stopVideos();
    });

//video
    $('video,audio').mediaelementplayer({
        features: ['playpause','progress',/*'current','duration','tracks','volume','fullscreen'*/]
    });

    function stopVideos(){
        $('video,audio').each(function() {
          $(this)[0].pause();
        });
    }
    // $(".mejs-mediaelement").bind(triggerClick, function(e){
    //     $video = $(this).find('video')[0];
    //     console.log($video);
    //     console.log($video.paused);
    //     // $(this).find('video')[0].pause();
    //     if ($video.paused) {
    //         $video.play();
    //     } else {
    //         $video.pause();
    //     }
    // });

    $(".page-video .next").bind(triggerClick, function(e){
        e.preventDefault();
        $newPageVideo = $($(this).closest(".page-video").attr("data-next"));
        $newPageVideo.addClass("noTransition").addClass("hiddenLeft");
        setTimeout(function(){
            $(".page-video:not(.hidden)").addClass("hidden");
            $(".page-video.noTransition.hiddenLeft").removeClass("noTransition hidden hiddenLeft");
        },0);
        stopVideos();

        $newPageVideo.find("video")
        $video = $newPageVideo.find('video');
        $newPageVideo.addClass("playing");
        $video[0].play();
    });
    $(".page-video .prev").bind(triggerClick, function(e){
        e.preventDefault();
        $(this).closest(".page-video").addClass("hidden hiddenLeft");
        $newPageVideo = $($(this).closest(".page-video").attr("data-prev"));
        $newPageVideo.removeClass("hidden");
        setTimeout(function(){
            $(".page-video.hiddenLeft").addClass("hide");
            $(".page-video").removeClass("hiddenLeft");
            setTimeout(function(){
                $(".page-video.hide").removeClass("hide");
            },500);
        },500);
        stopVideos();

        $newPageVideo.find("video")
        $video = $newPageVideo.find('video');
        $newPageVideo.addClass("playing");
        $video[0].play();
    });