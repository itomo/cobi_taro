var LAST_STAGE = 4;
var SCREEN_WIDTH  = 2048;
var SCREEN_HEIGHT = 1536;

$.wait = function(msec) {
    var d = new $.Deferred;
    setTimeout(function(){
        d.resolve(msec);
    }, msec);

    return d.promise();
};

function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
}

var IMG_DIR        = "img";
var SOUND_DIR  = "sound";
var TITLE_IMG_DIR  = IMG_DIR + "/title";
var SELECT_IMG_DIR = IMG_DIR + "/select";
var STAGE_IMG_DIR  = IMG_DIR + "/stage";

var TITLE_IMG_BACKGROUND = TITLE_IMG_DIR + "/bg_01.jpg";
var TITLE_IMG_CHARACTER  = TITLE_IMG_DIR + "/chara_01.png";
var TITLE_IMG_BUTTON     = TITLE_IMG_DIR + "/button_01.png";

var SELECT_IMG_BUTTON     = SELECT_IMG_DIR + "/button_02.png";
var SELECT_IMG_BACKGROUND_1 = SELECT_IMG_DIR + "/SelectScene_02.jpg";
var SELECT_IMG_BACKGROUND_2 = SELECT_IMG_DIR + "/SelectScene_03.jpg";
var SELECT_IMG_BACKGROUND_3 = SELECT_IMG_DIR + "/SelectScene_04.jpg";
var SELECT_IMG_BACKGROUND_4 = SELECT_IMG_DIR + "/SelectScene_05.jpg";
var SELECT_IMG_TOUCH_1 = SELECT_IMG_DIR + "/SelectScene_06.png";
var SELECT_IMG_TOUCH_2 = SELECT_IMG_DIR + "/SelectScene_07.png";
var SELECT_IMG_TOUCH_3 = SELECT_IMG_DIR + "/SelectScene_08.png";
var SELECT_IMG_TOUCH_4 = SELECT_IMG_DIR + "/SelectScene_09.png";

var KOBI_SOUND = SOUND_DIR + "/cobi.mp3";