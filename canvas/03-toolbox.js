/**********************
**** TABLE CONTENT ****
***********************

Object 
    -Object coordonnées
    -Object liste de coordonnées
    -Object Polygon
    -Object LINE

tests/math

drawing

ARRAY UPPGRADE

***************************
**** END TABLE CONTENT ****
**************************/

// Objects
    // Object coordonnées
        function Coord(x,y){
            this.x = x || 0;
            this.y = y || 0;
        }

        Coord.prototype.set = function (x, y){
            this.x = x || 0;
            this.y = y || 0;
        }

        Coord.prototype.isEqual = function (coord, lissage){
            lissage = lissage || 0.5;
            if((this.x >= coord.x-lissage && this.x <= coord.x+lissage)
                &&
                (this.y >= coord.y-lissage && this.y <= coord.y+lissage)){
                return true;
            }else{
                return false;
            }
        }

    // Object liste de coordonnées 
        function ListCoord(table){
            this.list = table || [];
        }

        ListCoord.prototype.push = function (coord){
            this.list.push(coord);
        }
        ListCoord.prototype.length = function (){
            return this.list.length;
        }
        ListCoord.prototype.getFirst = function (){
           return this.list[0];
        }
        ListCoord.prototype.getLast = function (){
            return this.list[this.list.length-1];
        }

    // Object Polygon
        function Polygon(coord){
            this.list = [coord||0];

            this.maxLeft = coord.x;
            this.currentMaxLeft = coord.x;
            this.lastMaxLeft = coord.x;
            this.goingLeft = false;

            this.maxRight = coord.x;
            this.currentMaxRight = coord.x;
            this.lastMaxRight = coord.x;
            this.goingRight = false;

            this.maxTop = coord.y;
            this.currentMaxTop = coord.y;
            this.lastMaxTop = coord.y;
            this.goingTop = false;

            this.maxBot = coord.y;
            this.currentMaxBot = coord.y;
            this.lastMaxBot = coord.y;
            this.goingBot = false;

            this.x = 0;
            this.y = 0;
            this.lissage = 20;
        }
        Polygon.prototype.length = function (){
            return this.list.length;
        }
        Polygon.prototype.push = function(coord){
            last = this.list[this.list.length]
            this.x = coord.x;
            this.y = coord.y;
            if(this.x < this.maxLeft){
                this.maxLeft = this.x;
            }
            if(this.x < this.currentMaxLeft){
                this.goingLeft = true;
                this.currentMaxLeft = this.x;
            }else{
                if( this.goingLeft && getDelta(this.lastMaxLeft, this.currentMaxLeft) > this.lissage){
                    this.lastMaxLeft = this.currentMaxLeft;
                    this.list.push(coord);
                    this.goingLeft = false;
                    this.currentMaxRight = this.x;
                    return true;
                }else{
                    this.currentMaxLeft = this.x;
                }
            }
            if(this.x > this.maxRight){
                this.maxRight = this.x;
            }
            if(this.x > this.currentMaxRight){
                this.goingRight = true;
                this.currentMaxRight = this.x;
            }else{
                if( this.goingRight && getDelta(this.lastMaxRight, this.currentMaxRight) > this.lissage){
                    this.lastMaxRight = this.currentMaxRight;
                    this.list.push(coord);
                    this.goingRight = false;
                    this.currentMaxLeft = this.x;
                    return true;
                }else{
                    this.currentMaxRight = this.x;
                }
            }
            if(this.y < this.maxTop){
                this.maxTop = this.y;
            }
            if(this.y < this.currentMaxTop){
                this.goingTop = true;
                this.currentMaxTop = this.y;
            }else{
                if( this.goingTop && getDelta(this.lastMaxTop, this.currentMaxTop) > this.lissage){
                    this.lastMaxTop = this.currentMaxTop;
                    this.list.push(coord);
                    this.goingTop = false;
                    return true;
                }else{
                    this.currentMaxTop = this.y;
                }
            }
            if(this.y > this.maxBot){
                this.maxBot = this.y;
            }
            if(this.y > this.currentMaxBot){
                this.goingBot = true;
                this.currentMaxBot = this.y;
            }else{
                if( this.goingBot && getDelta(this.lastMaxBot, this.currentMaxBot) > this.lissage){
                    this.lastMaxBot = this.currentMaxBot;
                    this.list.push(coord);
                    this.goingBot = false;
                    return true;
                }else{
                    this.currentMaxBot = this.y;
                }
            }
            return false;
        }

    // Object LINE
        function Line(coord1, coord2, isInfinite){
            this.p1 = new Coord(coord1.x, coord1.y) || 0;
            this.p2 = new Coord(coord2.x, coord2.y) || 0;
            this.isInfinite = isInfinite || false;
            this.isPoint = false;
            if(this.p1.x == this.p2.x && this.p1.y == this.p1.y){
                this.isPoint = true;
            }

            this.a = (this.p1.y - this.p2.y) / (this.p1.x - this.p2.x)
            this.b = this.p1.y - this.a * this.p1.x;

            if(this.isInfinite){
                var newP1
                this.p1 = checkLineIntersection(new Line(new Coord(coord1.x, coord1.y),new Coord(coord2.x, coord2.y)), new Line(new Coord(0, 0),new Coord(0, canvasHeight)));
                this.p2 = checkLineIntersection(new Line(new Coord(coord1.x, coord1.y),new Coord(coord2.x, coord2.y)), new Line(new Coord(0, 0),new Coord(canvasWidth, 0)));
                if((this.p1.x <= 0 || this.p1 >= canvasWidth) && (this.p1.y <= 0 || this.p1.y >= canvasHeight) ){
                    this.p1 = checkLineIntersection(new Line(new Coord(coord1.x, coord1.y),new Coord(coord2.x, coord2.y)), new Line(new Coord(canvasWidth, 0),new Coord(canvasWidth, canvasHeight)));
                }
                if((this.p2.x <= 0 || this.p2 >= canvasWidth) && (this.p2.y <= 0 || this.p2.y >= canvasHeight) ){
                    this.p2 = checkLineIntersection(new Line(new Coord(coord1.x, coord1.y),new Coord(coord2.x, coord2.y)), new Line(new Coord(0, canvasHeight),new Coord(canvasWidth, canvasHeight)));
                }
                //todo : autres directions (?)
            }
        }


// tests/math
    function getDelta(x,y){
        return Math.abs(x - y);
    }

    //table.sort(compareNombres)
    function compareNombres(a, b) {
        return a - b;
    }

    function compareCoordX(coordA, coordB) {
        return coordA.x - coordB.x;
    }

    function compareCoordY(coordA, coordB) {
        return coordA.y - coordB.y;
    }

    function compareCoordXDec(coordA, coordB) {
        return coordB.x - coordA.x;
    }

    function compareCoordYDec(coordA, coordB) {
        return coordB.y - coordA.y;
    }

    function checkLineIntersection(line1, line2) {
        // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
        var denominator, a, b, numerator1, numerator2, result = {
            x: null,
            y: null,
            onLine1: false,
            onLine2: false
        };
        denominator = ((line2.p2.y - line2.p1.y) * (line1.p2.x - line1.p1.x)) - ((line2.p2.x - line2.p1.x) * (line1.p2.y - line1.p1.y));
        if (denominator == 0) {
            return new Coord(result.x, result.y);
        }
        a = line1.p1.y - line2.p1.y;
        b = line1.p1.x - line2.p1.x;
        numerator1 = ((line2.p2.x - line2.p1.x) * a) - ((line2.p2.y - line2.p1.y) * b);
        numerator2 = ((line1.p2.x - line1.p1.x) * a) - ((line1.p2.y - line1.p1.y) * b);
        a = numerator1 / denominator;
        b = numerator2 / denominator;

        // if we cast these lines infinitely in both directions, they intersect here:
        result.x = line1.p1.x + (a * (line1.p2.x - line1.p1.x));
        result.y = line1.p1.y + (a * (line1.p2.y - line1.p1.y));
        
        // if line1 is a segment and line2 is infinite, they intersect if:
        if (a > 0 && a < 1) {
            result.onLine1 = true;
        }
        // if line2 is a segment and line1 is infinite, they intersect if:
        if (b > 0 && b < 1) {
            result.onLine2 = true;
        }
        // if line1 and line2 are segments, they intersect if both of the above are true
        return new Coord(result.x, result.y);
    }

    //f(y) = a*x + b
    function checkPointOnLine(pt, line, isInfinite){
        var isInfinite = isInfinite || false;
        var a = (line.p1.y - line.p2.y) / (line.p1.x - line.p2.x)
        ,   b = line.p1.y - a * line.p1.x;

        //vertical line
        if(a == "-Infinity" || a == "Infinity"){
            if (pt.x == line.p1.x){
                if(!isInfinite){
                    if(line.p1.y < line.p2.y){
                        if(line.p1.y <= pt.y && line.p2.y >= pt.y){
                            return true;
                        }
                    }else{
                        if(line.p2.y <= pt.y && line.p1.y >= pt.y){
                            return true;
                        }
                    }
                    return false;
                }
                return true;
            }
        }else{
            if(pt.y == a*pt.x + b){
                if(!isInfinite){//on check si le point est sur la ligne finie (pas une droite)
                    if(a == 0){
                        if(line.p1.x < line.p2.x){
                            if(line.p1.x <= pt.x && line.p2.x >= pt.x){
                                return true;
                            }
                        }else{
                            if(line.p2.x <= pt.x && line.p1.x >= pt.x){
                                return true;
                            }
                        }
                        return false;
                    }
                }
                return true;
            }
        }
    }

    function checkInRect(pt, rect){
        if(
                pt.x >= rect.lt.x
            &&  pt.x <= rect.rt.x
            &&  pt.y >= rect.lt.y
            &&  pt.y <= rect.rb.y
        ){
            return true;
        }
    }

    function distance(p1, p2){
        var dx = p2.x - p1.x
        ,   dy = p2.y - p1.y
        ,   d;
        if(dy != 0) dy = 1;
        return d = Math.sqrt(dx*dx + dy*dy);
    }

    function isPointInPoly(poly, pt){
        for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
            ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
            && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
            && (c = !c);
        return c;
    }

// drawing
    function drawCircle(coord){
        ctx.beginPath();
        ctx.arc(coord.x, coord.y, 2, 0, 2 * Math.PI, false);
        ctx.moveTo(coord.x, coord.y);
        ctx.stroke();
    }

    function drawRect(lt, rt, rb, lb){
        //strokeRect(float x, float y, float w, float h)
        var w = rt.x -lt.x
        ,   h = lb.y - lt.y;
        ctx.rect(lt.x, lt.y, w, h);
    }

    function setPolygonPoint(list, color){
        ctx.beginPath();
        ctx.strokeStyle = color || "#c3d200";
        for (var i = 0, len = list.length; i < len; i++) {
            ctx.moveTo(list[i].x, list[i].y);
            drawCircle(list[i]);
            ctx.stroke();
        }
        ctx.closePath();
    }

    function drawPolygon(list, color, fillStyle){
        ctx.beginPath();
        ctx.strokeStyle = color || "#00ff00";
        ctx.fillStyle = fillStyle || "#00ff00";
        for (var i = 0, len = list.length; i < len; i++) {
            ctx.lineTo(list[i].x, list[i].y);
            ctx.stroke();
        }
        ctx.lineTo(list[0].x, list[0].y);
            if (fillStyle) {
                ctx.fillStyle = fillStyle;
                ctx.fill();
            }
        ctx.stroke();
        ctx.closePath();
    }

    function setCenterText(rect, text){
        fontSize = 20
        if($(window).height() < 830){
            fontSize = 15
        }
        if($drawingArea.width() < 1100){
            fontSize = 15
        }
        if($drawingArea.width() < 825){
            fontSize = 12
        }
        if($drawingArea.width() < 650){
            fontSize = 9
        }
        if($drawingArea.width() < 520){
            fontSize = 9
        }
        // fontSize = (rect.rb.x-rect.lb.x)/10 /1.8
        // console.log(fontSize);
        ctx.font = fontSize+'pt knockouthtf28-juniorfeatherwt';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if(typeof text == "string"){
            ctx.moveTo(rect.lb.x, rect.lb.y);
            ctx.fillText(text, rect.lb.x + (rect.rb.x-rect.lb.x)/2, rect.lb.y - (rect.lb.y -rect.lt.y)/3);
        }else{
            for (var i = 0; i < text.length; i++) {
                ctx.moveTo(rect.lb.x, rect.lb.y);
                ctx.fillText(text[i], rect.lb.x + (rect.rb.x-rect.lb.x)/2, rect.lb.y+10+i*fontSize*1.25 - (rect.lb.y -rect.lt.y)/3);
            };
        }
    }

    // var params = {};
    function drawPolygonAnimated(list, strokeStyle, fillStyle, time, callback){
        ctx.strokeStyle = strokeStyle || "#bbbbbb";
        ctx.fillStyle = fillStyle || "#00ff00";
        if(list.length > 1){
            var step = 0
            var line = new Line(list[step], list[step+1]);
            list.unshift(new Coord(list[step].x, list[step].y));
            // v = d/time*10;
            var v = 15;
            if($("html").hasClass('ie9')) v = 50;
            drawingAnimatedLine({list:list, line:line, newX:line.p1.x, oldP:line.p1, v:v, step:step, strokeStyle:strokeStyle, fillStyle:fillStyle, callback:callback});
        }else{
            console.warn("aborting drawPolygonAnimated, only one point in list");
            callback();
        }
    }

    function drawingAnimatedLine(params, callback){
        if(params.step <= params.list.length && !stopAnim){
            if(params.line.p1.x-params.line.p2.x > 0){ //vers la gauche
                params.newX = params.newX - params.v;
                var newY = params.line.a*params.newX + params.line.b;
            }else{
                if(params.line.p1.x-params.line.p2.x == 0){//vertical
                    if(params.line.p1.y-params.line.p2.y > 0){// vers le bas
                        var newY = params.oldP.y-params.v;
                    }else{// vers le haut
                        var newY = params.oldP.y+params.v;
                    }
                }else{//vers la droite
                    params.newX = params.newX + params.v;
                    var newY = params.line.a*params.newX + params.line.b;
                }         
            }
            var stop = false;
            if(params.line.p1.x-params.line.p2.x > 0){//fin la gauche
                stop = params.newX <= params.line.p2.x;
            }else{
                if(params.line.p1.x-params.line.p2.x == 0){//vertical
                    if(params.line.p1.y-params.line.p2.y > 0){// fin bas
                        stop = newY <= params.line.p2.y;
                    }else{// fin haut
                        stop = newY >= params.line.p2.y;
                    }
                }else{//fin  droite
                    stop = params.newX >= params.line.p2.x;
                }     
            }

            if(!stop){
                ctx.beginPath();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = params.strokeStyle;
                    ctx.fillStyle = params.fillStyle;
                    ctx.moveTo(params.oldP.x, params.oldP.y);
                    ctx.lineTo(params.newX, newY);
                    ctx.stroke();
                ctx.closePath();
                params.oldP.x = params.newX
                params.oldP.y = newY;
                params.idAnimFrame = requestAnimationFrame(function(){
                    drawingAnimatedLine(params)
                });
            }else{
                if(params.step < params.list.length-1){
                    ctx.beginPath();
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = params.strokeStyle;
                        ctx.fillStyle = params.fillStyle;
                        ctx.moveTo(params.oldP.x, params.oldP.y);
                        ctx.lineTo(params.line.p2.x, params.line.p2.y);
                        ctx.stroke();
                    ctx.closePath();
                    params.step = params.step+1;
                    if(params.step < params.list.length-1){
                        params.line = new Line(params.list[params.step], params.list[params.step+1]);
                    }else{
                        params.line = new Line(params.list[params.step], /*params.start*/params.list[0]);
                    }
                    params.newX = params.line.p1.x;
                    params.oldP = {x:params.line.p1.x, y:params.line.p1.y};
                    cancelAnimationFrame(params.idAnimFrame);
                    params.idAnimFrame = requestAnimationFrame(function(){
                        drawingAnimatedLine(params)
                    });
                }else{
                    ctx.beginPath();
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = params.strokeStyle;
                        ctx.fillStyle = params.fillStyle;
                        ctx.moveTo(params.oldP.x, params.oldP.y);
                        ctx.lineTo(params.line.p2.x, params.line.p2.y);
                        ctx.stroke();
                    ctx.closePath();
                    cancelAnimationFrame(params.idAnimFrame);
                    params.callback();
                }
            }
        }
    }

    function drawLine(p1, p2, isInfinite, color, fillStyle){
        ctx.strokeStyle = color || "#bbbbbb";
        ctx.fillStyle = fillStyle || "#00ff00";
        ctx.beginPath();
        l = new Line(p1, p2, isInfinite||false)
        ctx.moveTo(l.p1.x, l.p1.y);
        ctx.lineTo(l.p2.x, l.p2.y);
        ctx.stroke();
        ctx.closePath();
        return l;
    }

    //images cropped
    function setCroppedImage(shape, rect, img, strokeStyle, fillStyle, useRatioInf, useRatioSup){
        useRatioInf = useRatioInf || false;
        useRatioSup = useRatioSup || false;
        imgWidth = img.width;
        imgHeight = img.height;
        ctx.save();
            ctx.strokeStyle = strokeStyle || "#bbbbbb";
            ctx.fillStyle = fillStyle || "#00ff00";
            drawPolygon(shape, strokeStyle, strokeStyle);
            ctx.clip();
            if(useRatioInf || useRatioSup){
                wRatio = (rect.rt.x-rect.lt.x) / imgWidth;
                hRatio = (rect.rb.y-rect.rt.y) / imgHeight;
                if(useRatioSup){
                    if(hRatio > wRatio){
                        ratio = hRatio
                    }else{
                        ratio = wRatio
                    }
                }else{
                    if(hRatio < wRatio){
                        ratio = hRatio
                    }else{
                        ratio = wRatio
                    }
                }
                if(useRatioInf && ratio > 1) ratio = 1;
                imgWidth = imgWidth*ratio
                imgHeight = imgHeight*ratio
            }
            w = ((rect.rt.x-rect.lt.x) - imgWidth) / 2;
            h = ((rect.rb.y-rect.rt.y) - imgHeight) / 2;
            ctx.drawImage(img, rect.lt.x+w, rect.lt.y+h, imgWidth, imgHeight);
        ctx.restore()
    }

// ARRAY UPPGRADE
    Array.prototype.removeDoublonCoord = function(){
        var i = 0;
        delta = 10;
        while(i < this.length-1){
            p1 = this[i]
            p2 = this[i+1]
            if( p2 == undefined ||
                (
                    (p1.x >= p2.x-delta && p1.x <= p2.x+delta)
                    &&
                    (p1.y >= p2.y-delta && p1.y <= p2.y+delta)
                )
            ){
                this.splice(i+1,1)
            }else{  
                i++;
            }
        }
    }

    Array.prototype.getMinX = function(){
        var toReturn = this[0];
        for (var i = 0, len = this.length; i < len; i++) {
            if(this[i].x < toReturn.x){
                toReturn = this[i];
            }
        }
        return toReturn;
    }

    Array.prototype.getMaxX = function(){
        var toReturn = this[0];
        for (var i = 0, len = this.length; i < len; i++) {
            if(this[i].x > toReturn.x){
                toReturn = this[i];
            }
        }
        return toReturn;
    }

    Array.prototype.getMinY = function(){
        var toReturn = this[0];
        for (var i = 0, len = this.length; i < len; i++) {
            if(this[i].y < toReturn.y){
                toReturn = this[i];
            }
        }
        return toReturn;
    }

    Array.prototype.getMaxY = function(){
        var toReturn = this[0];
        for (var i = 0, len = this.length; i < len; i++) {
            if(this[i].y > toReturn.y){
                toReturn = this[i];
            }
        }
        return toReturn;
    }

