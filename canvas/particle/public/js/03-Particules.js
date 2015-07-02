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

            this.duration = getRandomInt( 3000000, 6000000);
            this.vitX = this.distX / (this.duration);

            this.vitWidth = (this.endWidth - this.startWidth)  / (this.duration)
            this.vitY = this.distY / (this.duration);
            this.dateStart = Date.now();
        }

        Particule.prototype.update = function(dateNow){
            t = dateNow - this.dateStart
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
                this.currentWidth = this.startWidth - this.vitWidth*t;
            }
        }

        Particule.prototype.render = function(){
            // console.log(this.coorCurrent);
            this.ctx.save();

            this.ctx.strokeStyle = 'white';
            
            drawCircle(this.coorCurrent, this.currentWidth);

            this.ctx.restore();
        }

