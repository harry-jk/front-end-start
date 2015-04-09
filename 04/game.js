/**
 * Created by jhkang on 4/9/15.
 */
var game_tile = document.getElementById("game_form");
var score_wrap = document.getElementById("score_form");
var score_form = document.getElementById("score");
var level_form = document.getElementById("level");
var miss_form = document.getElementById("miss");
var miss_limit_form = document.getElementById("miss_limit");

var sizeXY = 20;
var score = 0;
var miss = 0;
var level = 1;

var interval = null;
var target = null;
var samePosition = false;

function positionChange() {
    var x = Math.random()*(document.body.scrollWidth-sizeXY);
    var y = Math.random()*(document.body.scrollHeight-score_wrap.scrollHeight-sizeXY)+score_wrap.scrollHeight;

    target.style.backgroundColor = "red";
    target.style.left = x+"px";
    target.style.top= y+"px";
    miss_form.innerHTML = miss;
    ++miss;
    samePosition = false;
    levelControl();
}

function levelControl(){
    if(miss > Math.ceil((10/level)+1)){
        gameover();
    }

    if(score/level > Math.ceil((Math.log(level+1)*10))){
        ++level;
        level_form.innerHTML = level;

        clearInterval(interval);
        var speed = 2000-(score*level);
        if(speed < 1000) speed = 1000;
        interval = setInterval(positionChange, speed);
        miss_limit_form.innerHTML = Math.ceil((10/level)+1);

        if(sizeXY > 10){
            --sizeXY;
            target.style.width = sizeXY;
            target.style.height = sizeXY;
        }
    }
}

function startGame() {
    target = document.createElement("div");
    target.setAttribute("id", "target");

    target.addEventListener("click", function() {
        if(samePosition) return;
        samePosition = true;
        target.style.backgroundColor = "blue";
        setTimeout(function(){
            target.style.backgroundColor = "red";
        }, 300);
        ++score;
        miss = 0;
        score_form.innerHTML = score;
        miss_form.innerHTML = miss;
    });

    sizeXY = 20;


    score = 0;
    miss = 0;
    level = 1;
    score_form.innerHTML = score;
    level_form.innerHTML = level;
    miss_limit_form.innerHTML = Math.ceil((10/level)+1);
    positionChange();

    var buttons = score_wrap.getElementsByTagName("button");
    for(var index = 0; index < buttons.length; ++index) {
        buttons[0].remove();
    }
    game_tile.appendChild(target);

    interval = setInterval(positionChange, 2000);
}

function gameover(){
    clearInterval(interval);
    target.remove();
    var start = document.createElement("button");
    start.innerHTML = "시작";
    score_wrap.appendChild(start);
    start.addEventListener("click", function(){
        startGame();
    });
}


startGame();