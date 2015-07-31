/**********************
**** TABLE CONTENT ****
***********************

getCursorPos

Object 
    -Object coordonnées
    -Object Particule

tests/math

drawing

ARRAY UPPGRADE

***************************
**** END TABLE CONTENT ****
**************************/

//recup position client, update l'objet coord fournis
    function getCursorPos(e, pos){
        currentPos = pos || new Coord();
        if(isTouch){
            var touch = e.originalEvent.touches[0];
            currentPos.set(touch.clientX, touch.clientY);
            return (currentPos);
        }else{
            currentPos.set(e.clientX, e.clientY);
            return (currentPos);
        }
    }
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

// tests/math

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


// drawing
    function drawCircle(coord, rayon){
        ctx.beginPath();
        ctx.arc(coord.x, coord.y, rayon || 1, 0, 2 * Math.PI, false);
        ctx.moveTo(coord.x, coord.y);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    function drawRect(lt, rt, rb, lb){
        //strokeRect(float x, float y, float w, float h)
        var w = rt.x -lt.x
        ,   h = lb.y - lt.y;
        ctx.rect(lt.x, lt.y, w, h);
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
