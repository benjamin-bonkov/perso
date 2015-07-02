    // Object Particule
        //params {
        //     coordStart: Coord, 
        //     coorEnd: Coord,
        //     coorCurrent: Coord,
        //     speed: Coord,
        // }
        function Particule(params){
            this.coordStart = params.coordStart;
            this.coorEnd = params.coorEnd;
            this.coorCurrent = params.coorCurrent;
            this.ctx = params.ctx;
            this.startWidth = getRandomInt(0.01,0.5)
            this.endWidth = 0.1;
            this.currentWidth = this.startWidth;

            this.distX = this.coorEnd.x - this.coordStart.x ;
            this.dirX = ( (this.distX)<0 )? -1 : 1;
            this.distY = this.coorEnd.y - this.coordStart.y ;
            this.dirY = ( (this.distY)<0 )? -1 : 1;
            this.actif = true;
            // this.dateStart = params.dateStart;
            this.duration = params.duration || 3000;
            this.vitX = this.distX / (this.duration);
            // console.log(this.vitX);

            this.vitWidth = (this.endWidth - this.startWidth)  / (this.duration)
            this.vitY = this.distY / (this.duration);
            // console.log(this.vitY);
        }
        Particule.prototype.update = function(t){
            if(
                (
                    this.coorEnd.x == this.coorCurrent.x &&
                    this.coorEnd.y == this.coorCurrent.y
                )
                ||
                t >= this.duration
            ){
                // console.log("end");
                this.actif = false
            }
            if(
                (this.dirX > 0 && this.coorEnd.x > this.coorCurrent.x) ||
                (this.dirX < 0 && this.coorEnd.x < this.coorCurrent.x)
            ){
                this.coorCurrent.x = this.coordStart.x + this.vitX*t;
            }else{
                this.coorCurrent.x = this.coorEnd.x;
            }
            if(
                (this.dirY > 0 && this.coorEnd.y > this.coorCurrent.y) ||
                (this.dirY < 0 && this.coorEnd.y < this.coorCurrent.y)
            ){
                this.coorCurrent.y = this.coordStart.y + this.vitY*t;
            }else{
                this.coorCurrent.y = this.coorEnd.y;
            }
            if(this.currentWidth >= this.endWidth){
                this.currentWidth = this.startWidth + this.vitWidth*t;
            }
        }

        Particule.prototype.render = function(){
            drawCircle(this.coorCurrent, this.currentWidth)
            // this.ctx.beginPath();
            // this.ctx.arc(this.coorCurrent.x, this.coorCurrent.y, 1, 0, 2 * Math.PI, false);
            // this.ctx.moveTo(this.coorCurrent.x, this.coorCurrent.y);
            // this.ctx.stroke();
        }

