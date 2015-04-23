/**
 * Created by jhkang on 2015-04-19.
 */
// Tab Information Class
var Tab = (function() {
    /***
     *
     * @param tab {Element} Tab DOM Element (li)
     * @param url {string} API Path
     * @param renderer {function({array}, {boolean})} 화면 랜더러.
     * @constructor
     */
    function Tab(tab, url, renderer){
        this._tab = tab;
        this._url = url;
        this._renderer = renderer;

        this._items = [];
        this._keyword = null;
        this._page = 0;
        this._isMore = false;
    }

    Tab.prototype.addItems = function(data) {
        var items = data.channel.item;
        this._isMore = true;
        if(items.length < 10 || this._page >= 500) this._isMore = false;
        this._items = this._items.concat(items);
        this._renderer(items, this._isMore);

    };

    /***
     * 더보기 기능.
     */
    Tab.prototype.more = function() {
        if(!this._tab)  return;
        ++this._page;
        if(this._page > 500 || !this._isMore) {
            this._isMore = false;
            this._renderer([], this._isMore);
        }
        search(this._url, this._keyword, this._page, this.addItems, this);
    };

    /***
     *  검색.
     * @param keyword {string} 검색할 키워드
     */
    Tab.prototype.search = function(keyword) {
        if(!this._tab)  return;
        this._page = 1;
        this._keyword = keyword;
        this._items = [];

        search(this._url, this._keyword, this._page, this.addItems, this);
    };

    /***
     * 탭 활성화.
     * 만일 검색 키워드가 이전과 같으면 저장된 결과 출력.
     *
     * @param keyword 검색 키워드.
     */
    Tab.prototype.active = function(keyword) {
        if(!this._tab)  return;
        this._tab.addClass("active");

        if(this._keyword === keyword) {
            this._renderer(this._items, this._isMore);
        } else {
            this._keyword = keyword;
            this._page = 1;
            this._items = [];

            search(this._url, this._keyword, this._page, this.addItems, this);
        }
    };

    /***
     * 탭 비활성화.
     */
    Tab.prototype.unactive = function() {
        if(!this._tab) return;
        this._tab.removeClass("active");
    };

    /***
     *  탭의 활성화 여부.
     * @returns {boolean}
     */
    Tab.prototype.isActive = function() {
        if(!this._tab) return false;
        return this._tab.hasClass("active");
    };

    return Tab;
})();


// Tab Management Instance
var TabManager = (function(){
    var tabs = {};
    var activeTab = null;
    var instance = null;

    var TabManager = function() { };

    /***
     * Singleton
     * @returns {TabManager} Instance
     */
    TabManager.getInstance = function() {
        if(instance == null) {
            instance = new TabManager();
        }
        return instance;
    };

    /***
     * 탭 추가.
     * @param id {string} 탭 ID (hashtag에 따라간다.)
     * @param tab {Tab} Tab Information Object
     */
    TabManager.prototype.addTab = function(id, tab) {
        tabs[id] = tab;
        if(tab.isActive()) {
            if(activeTab) {
                activeTab.unactive();
            }
            activeTab = tab;
        }
    };

    /***
     * 탭 제거.
     * @param id {string} 탭 ID
     */
    TabManager.prototype.removeTab = function(id) {
        delete tabs[id];
    };

    /***
     * 탭 변경.
     * @param id {string} 탭 ID
     * @param keyword {string} 검색 키워드
     */
    TabManager.prototype.changeTab = function(id, keyword) {
        if(tabs[id] === undefined) throw Error();
        if(activeTab) {
            activeTab.unactive();
        }
        activeTab = tabs[id];
        activeTab.active(keyword);
    };

    /***
     * 현재 활성화된 탭의 다음패이지를 요청..
     */
    TabManager.prototype.more = function() {
        activeTab.more();
    };

    /***
     * 새로운 검색 실행.
     * @param keyword {string} 검색 키워드.
     */
    TabManager.prototype.search = function(keyword) {
        activeTab.search(keyword);
    };

    return TabManager;
})();