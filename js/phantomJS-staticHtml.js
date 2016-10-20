
var fs = require('fs');

var siteUrl = "http://www.monsite.fr/";
var staticDestination = "web/static/";
var generateIMG = false;
var pages = [
    {"url":"/", "loaded": false},
    // list location url
];

    i=0;
    page = new WebPage();
    function createPages(){
        url = pages[i].url,
        console.log("--------------------------------------------------");
        console.log("page"+i);
        console.log(pages[i].url);
        page.open(siteUrl+url, function() {
          // page.evaluate(function() {console.log("evaluate");});
        });

        page.onLoadFinished = function(status) {
            console.log(url+" load finished");
            console.log("status :");
            console.log(status);
            if(status == "fail"){
                console.log("/!\\ FAIL /!\\");
                return;
            }
            console.log("--------------------------------------------------");
            if(url=="/"){
                url="index";
            }
            if(pages[i].loaded){
                console.log("/!\\ LOADED ALREADY /!\\");
                return;
            }else{
                pages[i].loaded = true;
                if(generateIMG){
                    page.render('web/static/'+url+'.png');
                }
                setTimeout(function(){
                    fs.write(staticDestination+url+'.html', page.content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ""), 'w');
                        // setTimeout(function(){

                            if(i < pages.length-1){
                                i++;
                                    createPages(i);
                            }else{
                                // phantom.exit();
                            }
                        // },10000)
                },10000)
            }
        };
        page.onResourceTimeout = function(request) {
            console.log("---------------------------/!\\ onResourceTimeout /!\\-----------------------");
            console.log("---------------------------/!\\ onResourceTimeout /!\\-----------------------");
            console.log('Response (#' + request.id + '): ' + JSON.stringify(request));
            console.log("---------------------------/!\\ onResourceTimeout /!\\-----------------------");
            console.log("---------------------------/!\\ onResourceTimeout /!\\-----------------------");
        };
    }

    createPages();

