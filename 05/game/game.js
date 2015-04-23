/**
 * Created by jhkang on 4/9/15.
 */
var game_tile = $('#game_form');
var score_wrap = $('#score_form');
var score_form = $('#score');
var level_form = $('#level');
var miss_form = $('#miss');
var miss_limit_form = $('#miss_limit');
var body = $('body');

var sizeXY = 20;
var score = 0;
var miss = 0;
var level = 1;

var interval = null;
var target = null;
var samePosition = false;

function positionChange() {
    var x = Math.random()*(body.outerWidth(true)-sizeXY);
    var y = Math.random()*(body.outerWidth(true)-score_wrap.outerHeight(true)-sizeXY)+score_wrap.outerHeight(true);

    target.css({
        backgroudColor : 'red',
        left : x+'px',
        top : y+'px'
    });
    miss_form.html(miss);
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
        level_form.html(level);

        clearInterval(interval);
        var speed = 2000-(score*level);
        if(speed < 1000) speed = 1000;
        interval = setInterval(positionChange, speed);
        miss_limit_form.html(Math.ceil((10/level)+1));

        if(sizeXY > 10){
            --sizeXY;
            target.css({
                width : sizeXY,
                height : sizeXY
            });
        }
    }
}

function startGame() {
    target = $('<div></div>', {
        id : 'target'
    });

    target.click(function() {
        if(samePosition) return;
        samePosition = true;
        target.css('backgroundColor', 'blue');
        setTimeout(function(){
            target.css('backgroundColor','red');
        }, 300);
        ++score;
        miss = 0;
        score_form.html(score);
        miss_form.html(miss);
    });

    sizeXY = 20;


    score = 0;
    miss = 0;
    level = 1;
    score_form.html(score);
    level_form.html(level);
    miss_limit_form.html(Math.ceil((10/level)+1));
    positionChange();

    var buttons = score_wrap.children('[name=button]');
    buttons.each(function(index, el) {
        el.remove();
    });
    game_tile.append(target);

    interval = setInterval(positionChange, 2000);
}

function gameover(){
    clearInterval(interval);
    target.remove();
    var start = $('button');
    start.innerHTML = '시작';
    score_wrap.append(start);
    start.click(function(){
        startGame();
    });
}


startGame();