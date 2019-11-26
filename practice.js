// const ctx = $("#snake").getContext("2d");

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create the units
const box = 32;

//load images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// create the snake

let snake = [];

//snakes starting location

snake[0] = {
    
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
};

//create food

let food = {

    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
};

// create score var

let score = 0;

//control snake

let d;

document.addEventListener("keydown", direction);

function direction(event){

    let key = event.keyCode;

    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
        left.play();
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}
// collision function

function collision (head, array){
    for (let i = 0; i < array.length; i++){
        if (head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw to canvas

function draw(){

    ctx.drawImage(ground,0,0);

    for (let i = 0; i < snake.length; i++){
       
        ctx.fillStyle = (i == 0)? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "red"
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);  
    }
     ctx.drawImage(foodImg, food.x, food.y);


    // old head position

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //which direction

    if( d =="LEFT" ) snakeX -= box;
    if( d == "UP" ) snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    // if snake eats food

    if(snakeX == food.x && snakeY == food.y){
        score++;
        // eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box,
        }
        //we don't remove the tail
    }else{         
        //remove tail
        snake.pop();
    }

    //add new head

    let newHead = {
        x : snakeX,
        y : snakeY     
    }

    //game over

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);

     ctx.fillStyle = "white";
    ctx.font = "40px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}


// call draw function every 100 ms

let game = setInterval(draw, 100);
/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/

