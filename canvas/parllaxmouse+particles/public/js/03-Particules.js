    // Object Particule
        //params {
        //     coordStart: Coord, 
        //     coorEnd: Coord,
        //     coorCurrent: Coord,
        //     speed: Coord,
        // }
        function Particule(params){
            this.coordStart = new Coord(
                getRandomInt( (0), (canvasWidth) ),
                getRandomInt( (0), (canvasHeight) )
            );
            this.coorEnd = new Coord(
                getRandomInt( (0), (canvasWidth) ),
                getRandomInt( (0), (canvasHeight) )
            );
            this.coorCurrent = this.coordStart
            this.ctx = params.ctx;
            this.startWidth = getRandomInt(0.01,0.5)
            this.endWidth = 0.1;
            this.currentWidth = this.startWidth || 5;

            this.distX = this.coorEnd.x - this.coordStart.x ;
            this.dirX = ( (this.distX)<0 )? -1 : 1;
            this.distY = this.coorEnd.y - this.coordStart.y ;
            this.dirY = ( (this.distY)<0 )? -1 : 1;
            this.actif = true;

            this.duration = getRandomInt( 500, 1000);
            this.vitX = this.distX / (this.duration);

            this.vitWidth = (this.endWidth - this.startWidth)  / (this.duration)
            this.vitY = this.distY / (this.duration);
        }

        function isPointInPoly(poly, pt){
            for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
                ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
                && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
                && (c = !c);
            return c;
        }
        Particule.prototype.update = function(infinite){
            if(infinite){
                this.coorCurrent.x += this.vitX;
                this.coorCurrent.y += this.vitY;

                if(this.currentWidth >= this.endWidth){
                    this.currentWidth -= this.vitWidth;
                }
                if(!isPointInPoly(canvasPoly, this.coorCurrent)){
                    this.actif = false;
                }
            }else{
                if(
                    (
                        this.coorEnd.x == this.coorCurrent.x &&
                        this.coorEnd.y == this.coorCurrent.y
                    )
                ){
                    // console.log("end");
                    this.actif = false
                }
                if(
                    (this.dirX > 0 && this.coorEnd.x > this.coorCurrent.x) ||
                    (this.dirX < 0 && this.coorEnd.x < this.coorCurrent.x)
                ){
                    this.coorCurrent.x += this.vitX;
                }else{
                    this.coorCurrent.x = this.coorEnd.x;
                }
                if(
                    (this.dirY > 0 && this.coorEnd.y > this.coorCurrent.y) ||
                    (this.dirY < 0 && this.coorEnd.y < this.coorCurrent.y)
                ){
                    this.coorCurrent.y += this.vitY;
                }else{
                    this.coorCurrent.y = this.coorEnd.y;
                }
                if(this.currentWidth >= this.endWidth){
                    this.currentWidth -= this.vitWidth;
                }
            }
        }

        Particule.prototype.render = function(){
            // console.log(this.coorCurrent);
            this.ctx.save();

            this.ctx.strokeStyle = 'transparent';
            this.ctx.fillStyle = 'white';
            
            drawCircle(this.coorCurrent, this.currentWidth);

            this.ctx.restore();
        }

