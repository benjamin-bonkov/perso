var getLinks = new RegExp("((http://)[a-zA-Z0-9\-/.?=&;]+)+","gi")
,	getLinks2 = new RegExp("((https://)[a-zA-Z0-9\-/.?=&;]+)+","gi")
,	getHashs = new RegExp("((#)[a-zA-Z0-9]+)+", "g")
,	getLebanon = new RegExp("((#insidelebanon))+", "g");

msgTxt = msgTxt.replace(getHashs , "<span class='hashtag'>$1</span>");
msgTxt = msgTxt.replace(getLinks , "<span class='link'>$1</span>");
msgTxt = msgTxt.replace(getLinks2 , "<span class='link'>$1</span>");
