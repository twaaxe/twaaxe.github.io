window.onload = function() {
    var canvas;
    var canvasWidth = 900;
    var canvasHeight = 600;
    var ctx;
    var blocksize = 20;
    var delay = 45;
    var serpent;
    var pomme;
    var widthinblock = canvasWidth/blocksize;
    var heightinblock = canvasHeight/blocksize;
    var score;
    var timeout;
    
    init();
    function init(){
        canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "10px solid";
        canvas.style.backgroundColor = "silver";
        canvas.style.display = "block";
        canvas.style.margin = " 50px auto";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        serpent = new Snake( [ [6,4],[5,4],[4,4] ], "right" );
        pomme = new Apple( [10,10] );
        score = 0;
        refresh();
    }

    function refresh(){
        serpent.advance();
        if(serpent.checkCollision()){
            gameOver();

        } else {
                if(serpent.isEating(pomme) == true){
                    serpent.ateApple = true;
                    score++ ;
                   do{ 
                       pomme.setNewPosition();
                    } while ( pomme.isOnSnake(serpent) == true );

                };
                ctx.clearRect(0,0 ,canvasWidth, canvasHeight);
                drawScore();
                serpent.draw();
                pomme.draw();
                timeout = setTimeout(refresh, delay);
                
        }  
        
    };

    function drawBlock(ctx, positionBlock){
        //position = array avec X =array[0] et y=array[1]
        var x = positionBlock[0] * blocksize; // ici 6
        var y = positionBlock[1] * blocksize; // ici 4
        ctx.fillRect(x, y, blocksize, blocksize);
    }

    function gameOver(){
        ctx.textAling = "center";
        ctx.fillStyle = "white";
        ctx.font = "bold 50px Georgia";
        ctx.save();
        ctx.fillText("Game Over", 10, 60);
        ctx.fillText("Press Space bar to replay", 10, 120);
        ctx.restore();
    }

    function restart(){
        serpent = new Snake( [ [6,4],[5,4],[4,4] ], "right" );
        pomme = new Apple( [10,10] );
        score = 0;
        clearTimeout(timeout);
        refresh();
    }

    function drawScore(){
        ctx.fillStyle = "darkgrey";
        ctx.font = "bold 150px Georgia";
        ctx.textAling = "center";
        ctx.save();
        ctx.fillText(score.toString(), (canvasWidth/2 )-50, (canvasHeight/2) + 15 );

        
        
    }

    function Snake(body, direction){
        this.body = body;
        this.direction= direction;
        this.ateApple = false;
        this.draw = function(){
            ctx.save(); //sauve le context ctx et son contenu, couleur et position
            ctx.fillStyle = "#ff0000";
            for (var i =0 ; i<this.body.length; i++){
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore;
        };
        this.advance = function(){
            var nextPosition = this.body[0].slice();
            switch(this.direction){
                case "left":   
                            nextPosition[0] -=1;
                            break;
                case "right": 
                            nextPosition[0] +=1;
                            break;
                case "down": 
                            nextPosition[1] +=1;
                            break;
                case "up":
                            nextPosition[1] -=1;
                            break;
                default : 
                            throw("invalid direction");
            };
            this.body.unshift(nextPosition);
            if (!this.ateApple ){
                this.body.pop(); 
            } else {
                this.ateApple = false;
            }
        };

        this.setDirection = function(newDirection){
            var allowedDirection;
            switch(this.direction){
                case "left":   
                 case "right": 
                            allowedDirection = ["up", "down"];
                            break;
                case "down": 
                case "up":
                            allowedDirection = ["left", "right"];
                             break;
                default : 
                            throw("invalid direction");
            }
            if (allowedDirection.indexOf(newDirection) > -1 ){
                this.direction = newDirection;

            }
        };

        this.checkCollision = function(){ //return true s'il y a eu une collision, avec le mur ou le corps du serpent
            var wallCollision = false;
            var SnakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthinblock -1;
            var maxY = heightinblock -1;
            var outRangeH = snakeX < minX || snakeX > maxX; // cette var retourne vrai si on dépasse le mur en X
            var outRangeV = snakeY < minY || snakeY > maxY;

            if(outRangeH || outRangeV){
                wallCollision = true;
            }

            for(var i =0 ;  i<rest.length ; i++){

                if( snakeX === rest[i][0] && snakeY === rest[i][1] ){
                    SnakeCollision = true;
                }

            }
            return wallCollision || SnakeCollision ;

        };
        
        this.isEating = function(toEat){
            var head = this.body[0];
            if (head[0] == toEat.position[0] && head[1] == toEat.position[1]){
                return true;
            } else {
                return false;
            }

        };

    };


    document.onkeydown = function handleKeyDown(e){
        var key = e.keyCode;
        var newDirection;
        switch(key){
            case 37 :
                    newDirection = "left";
                    break;
            case 38:
                    newDirection = "up";
                    break;

            case 39 : 
                    newDirection = "right";
                    break;

            case 40 : 
                    newDirection = "down";
                    break;

            case 32 : 
                    restart();
                    return; // arrete l'execution de la fonction
            default : 
                    return;
        }
        serpent.setDirection(newDirection);
    };

    function Apple(position) {
        this.position = position;
        this.draw = function(){
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blocksize/2 ;
            var x = this.position[0] *blocksize + radius;
            var y = this.position[1] *blocksize + radius;
            ctx.arc(x, y, radius, 0, Math.PI*2);
            ctx.fill();

            ctx.restore();
        }

        this.setNewPosition = function(){
            var newX =Math.round( Math.random() * (widthinblock -1) );
            var newY = Math.round(Math.random() * (heightinblock -1) );
            this.position = [newX, newY];
        }

        this.isOnSnake = function(snakeToCheck){
            var isOnSnake = false;
            for(var i=0; i< snakeToCheck.body.length; i++){
                if( snakeToCheck.body[i][0] == this.position[0] && snakeToCheck.body[i][1] == this.position[1]){
                    isOnSnake = true;
                }

            }
            return isOnSnake;
        }


    }; 

    
}    
