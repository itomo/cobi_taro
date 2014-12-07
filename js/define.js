var LAST_STAGE = 4;
var SCREEN_WIDTH  = 2048;
var SCREEN_HEIGHT = 1536;

// まんなか
var CENTER_X_POINT = SCREEN_WIDTH/2;
var CENTER_Y_POINT = SCREEN_HEIGHT/2;
// 人物の画像サイズ(漫画カメラの解像度)
var CHARACTER_PIC_WIDTH   = 520;
var CHARACTER_PIC_HEIGHT  = 748;
var CHARACTER_PIC_X_POINT = 800;
var CHARACTER_PIC_Y_POINT = 250;
var CHARACTER_PIC_X_SCALE = 1.3;
var CHARACTER_PIC_Y_SCALE = 1.3;

// ------ デフォルト値
var background_default_param = {
  'width'  : SCREEN_WIDTH,
  'height' : SCREEN_HEIGHT,
  'pic_url': "img/stage/bg_13.jpg",
  'x'      : 0,
  'y'      : 0
}
var scenario_board_default_param ={
  'width'  : 1986,
  'height' : 512,
  'pic_url': "img/bord_02.png",
  'x'      : 32 ,
  'y'      : 960
}
var chara_default_param = {
  'width'  : CHARACTER_PIC_WIDTH,
  'height' : CHARACTER_PIC_HEIGHT,
  'pic_url': "null",
  'x'      : CHARACTER_PIC_X_POINT,
  'y'      : CHARACTER_PIC_Y_POINT
}

// ------- title scnen -------
var title_background_param = {
  'width'  : SCREEN_WIDTH,
  'height' : SCREEN_HEIGHT,
  'pic_url': "img/title/bg_01.jpg",
  'x'      : 0,
  'y'      : 0
}
var title_chara = {
  'width'  : CHARACTER_PIC_WIDTH,
  'height' : CHARACTER_PIC_HEIGHT,
  'pic_url': "img/title/chara_01.png",
  'x'      : CHARACTER_PIC_X_POINT,
  'y'      : CHARACTER_PIC_Y_POINT
}
var title_button1_param = {
  'width'  : 764,
  'height' : 384,
  'pic_url': "img/title/button_01.png",
  'x'      : 250,
  'y'      : 1088
}
var title_button2_param = {
  'width'  : 764,
  'height' : 384,
  'pic_url': "img/title/button_01.png",
  'x'      : 1164,
  'y'      : 1088
}

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

// 人物画像のディレクトリ
var CHARACTER_PIC_DIR = IMG_DIR + "/chara";


