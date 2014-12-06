var LAST_STAGE = 4;
var SCREEN_WIDTH  = 2048;
var SCREEN_HEIGHT = 1536;

$.wait = function(msec) {
    // Deferredのインスタンスを作成
    var d = new $.Deferred;

    setTimeout(function(){
        // 指定時間経過後にresolveしてdeferredを解決する
        d.resolve(msec);
    }, msec);

    return d.promise();
};