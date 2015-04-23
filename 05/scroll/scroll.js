/**
 * Created by jhkang on 4/23/15.
 */
var dom = $("html, body");
var topBtn = $('#up');
var prevY = 0;

topBtn.click(function() {
    dom.animate({
        scrollTop : 0
    }, 400, "swing", function(){

    });
});

topBtn.hide();
var isShow = false;
$(window).scroll(function(){
    if(scrollY > prevY && scrollY > 100 && !isShow) {
        topBtn.show('slow');
        isShow = true;
    } else if( scrollY < prevY && scrollY < 100 && isShow) {
        topBtn.hide('slow');
        isShow = false;
    }
    prevY = scrollY;
});

