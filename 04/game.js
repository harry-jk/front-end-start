/**
 * Created by jhkang on 4/9/15.
 */
function positionChange() {
    var x = Math.random()*(400-20);
    var y = Math.random()*(400-20);

    target.style.marginLeft = x+"px";
    target.style.marginTop = y+"px";
}

var game_tile = document.getElementById("game_form");
var score_form = document.getElementById("score");
var score = 0;


var target = document.createElement("div");
target.setAttribute("id", "target");

target.addEventListener("click", function() {
    ++score;
    score_form.innerHTML = score;
});

positionChange();
game_tile.appendChild(target);

setInterval(positionChange, 1000);
