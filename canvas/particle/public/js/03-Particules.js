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
            this.fixed = params.fixed || false;
            this.w = getRandomInt(0.1,0.3);

            this.distX = this.coorEnd.x - this.coordStart.x ;
            this.dirX = ( (this.distX)<0 )? -1 : 1;
            this.distY = this.coorEnd.y - this.coordStart.y ;
            this.dirY = ( (this.distY)<0 )? -1 : 1;
            this.actif = true;

            this.duration = getRandomInt( 500, 1000);
            this.vitX = this.distX / (this.duration);
            this.vitY = this.distY / (this.duration);
        }

        function isPointInPoly(poly, pt){
            for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
                ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
                && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
                && (c = !c);
            return c;
        }
        Particule.prototype.update = function(){
            this.bounce();

            this.coorCurrent.x += this.vitX;
            this.coorCurrent.y += this.vitY;
        }


        Particule.prototype.bounce = function(){
            if (this.coorCurrent.y < 0 || this.coorCurrent.y > canvasHeight) {
                this.vitX = this.vitX;
                this.vitY = - this.vitY;
            } else if (this.coorCurrent.x < 0 || this.coorCurrent.x > canvasWidth) {
                this.vitX = - this.vitX;
                this.vitY = this.vitY;
            }
        }

        Particule.prototype.followMouse = function(){
            this.bounce();
            this.coorCurrent.x = this.coordStart.x + (mousePosDelta.x*this.vitX/this.duration)*this.vitX + this.vitX;
            this.coorCurrent.y = this.coordStart.y + (mousePosDelta.y*this.vitY/this.duration)*this.vitY + this.vitY;
            // console.log(this.coorCurrent);
            // console.log(this.coorCurrent.y);
        }

        Particule.prototype.render = function(){
            // console.log(this.coorCurrent);
            this.ctx.save();

            this.ctx.strokeStyle = 'white';
            this.ctx.fillStyle = 'white';
            
            drawCircle(this.coorCurrent, this.w);

            this.ctx.restore();
        }

