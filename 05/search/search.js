/**
 * Created by jhkang on 2015-04-19.
 */

// Init;
var boardTab = new Tab($('#boardTab'), '/search/board', contentsRenderer);
var videoTab = new Tab($('#videoTab'), '/search/vclip', contentsRenderer);
var imageTab = new Tab($('#imageTab'), '/search/image', contentsRenderer);
var tipTab   = new Tab($('#tipTab'), '/search/knowledge', contentsRenderer);
var blogTab  = new Tab($('#blogTab'), '/search/blog', contentsRenderer);
var cafeTab  = new Tab($('#cafeTab'), '/search/cafe', contentsRenderer);

TabManager.getInstance().addTab('board', boardTab);
TabManager.getInstance().addTab('video', videoTab);
TabManager.getInstance().addTab('image', imageTab);
TabManager.getInstance().addTab('tip', tipTab);
TabManager.getInstance().addTab('blog', blogTab);
TabManager.getInstance().addTab('cafe', cafeTab);

var searchText = $('#searchText');
var searchBtn = $('#searchBtn');
var moreBtn = $('#moreBtn');
var loader = $('#loader');

if(location.hash.length > 1) {
    TabManager.getInstance().changeTab(location.hash.substr(1), searchText.value);
}
renderingLoader(false);
renderingMoreBtn(false);

/////////////////////////////////////////////////////Controller
// 탭이 변경되는걸 확인.
$(window).on('hashchange', function() {
    var keyword = searchText.val();
    if(keyword !== undefined && keyword !== null && keyword.length > 0) renderingLoader(true);
    contentsWrap.html("");
    TabManager.getInstance().changeTab(location.hash.substr(1), keyword);
});
// 검색 버튼
searchBtn.click(function(ev) {
    var keyword = searchText.val();
    if(keyword !== undefined && keyword !== null && keyword.length > 0) renderingLoader(true);
    contentsWrap.html("");
    TabManager.getInstance().search(keyword);
    ev.stopPropagation();
    ev.preventDefault();
});
// 더보기 버튼
moreBtn.click(function() {
    var keyword = searchText.val();
    if(keyword !== undefined && keyword !== null && keyword.length > 0) renderingLoader(true);
    TabManager.getInstance().more();
});


/////////////////////////////////////////////////////Renderer
var template = $('#_template').html();
var contentsWrap = $('#contents');

/***
 * 더보기 버튼 Rendering
 * @param isMore {boolean}
 */
function renderingMoreBtn(isMore) {
    if(isMore) {
        moreBtn.removeClass("hidden");
    } else {
        moreBtn.addClass("hidden");
    }
}

/***
 * 로딩 이미지 Rendering
 * @param isShow {boolean}
 */
function renderingLoader(isShow) {
    if(isShow) {
        loader.removeClass("hidden");
    } else {
        loader.addClass("hidden");
    }
}

/***
 * Contents Rendering
 * @param items {array} 결과 데이터.
 * @param isMore {boolean} 더보기 여부.
 */
function contentsRenderer(items, isMore) {
    renderingMoreBtn(isMore);
    var html = tmpl(template, {items : items});

    contentsWrap.append(html);

    renderingLoader(false);
}
