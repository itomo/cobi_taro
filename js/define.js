var LAST_STAGE = 4;
var SCREEN_WIDTH  = 2048;
var SCREEN_HEIGHT = 1536;

$.wait = function(msec) {
    // Deferred�Υ��󥹥��󥹤����
    var d = new $.Deferred;

    setTimeout(function(){
        // ������ַв���resolve����deferred���褹��
        d.resolve(msec);
    }, msec);

    return d.promise();
};