/**
 * Created by jhkang on 6/4/15.
 */
(function() {
    var cards = [1,2,3,4,5];
    var gameBoard = $('#game');
    var score = 0;
    var scoreBoard = $('#score');

    var preCard;

    function suffle() {
        var tmp = [];
        tmp = tmp.concat(cards).concat(cards);
        return tmp.sort(function(r, l) {
            return (Math.random() * 2) > 1;
        });
    }

    function makeBoard() {
        gameBoard.children().remove();
        makeCards(suffle());
        scoreBoard.text(score);
    }

    function makeCards(sufCards) {
        for(var i = 0; i < sufCards.length; ++i) {
            var card = makeCard(sufCards[i]);
            gameBoard.append(card);
        }
    }

    function makeCard(num) {
        var card = $('<div>');
        var span = $('<span>')
        var cover = $('<div>');
        card.attr('id', 'card');
        cover.addClass('run');
        span.text(num);

        card.append(span);
        card.append(cover);
        return card;
    }


    function checkMatch(preCard, postCard) {
        if(preCard == null || postCard == null) return false;
        return preCard.parent().children('span').text() === postCard.parent().children('span').text();
    }

    function startGame() {
        preCard = null;
        score = 0;
        makeBoard();

        gameBoard.on('click', '.run', function(ev){
            var card = $(ev.target);
            if(card.hasClass('open')) return;
            console.log(card);
            card.addClass('open');
            if(preCard != null) {
                if(checkMatch(preCard, card)) {
                    preCard.removeClass('run');
                    card.removeClass('run');
                    ++score;
                    scoreBoard.text(score);
                    if(gameBoard.children().children('.run').length === 0) endGame();
                } else {
                    var pre = preCard;
                    var post = card;
                    setTimeout(function() {
                        pre.removeClass("open");
                        post.removeClass("open");
                    }, 500);
                }
                preCard = null;
            } else {
                preCard = card;
            }
        });
    }

    function endGame() {
        gameBoard.off('click', '**');
        var startBtn = $('#start');
        startBtn.show();
        startBtn.on('click', function(ev) {
            console.log(ev);
            startBtn.hide();
            startGame();
            startBtn.off('click', "**");
        });
    }

    endGame();
})();
