window.assets = (function(){

  function Module() {}
  var assets = new Module();

  // stage番号と合わせる
  assets.laststage = [0, 13, 12, 12, 12];

  assets.stage = {};
  assets.stage_pic = {};

  assets.loadAsset = function(stage_id, callback){
    file_name     = "data/stage" + stage_id + ".json";
    pic_file_name = "data/stage" + stage_id + "_pic.json";
    $.getJSON(file_name, function(data) {
      assets.stage[stage_id] = data;
      $.getJSON(pic_file_name, function(data) {
        assets.stage_pic[stage_id] = data;
        //スタート時に呼ばれるだけと想定
        return callback(stage_id, 1, assets.stage[stage_id][1]);
      });
    });
  };

  return assets;


})();

window.param = {
  default_background:{
    'width'  : SCREEN_WIDTH,
    'height' : SCREEN_HEIGHT,
    'pic_url': "img/stage/bg_13.jpg",
    'x'      : 0,
    'y'      : 0
  },
  default_text_background: {
    'width'  : 1986,
    'height' : 512,
    'pic_url': "img/bord_02.png",
    'x'      : 32 ,
    'y'      : 960
  },
  default_chara: {
    'width'  : CHARACTER_PIC_WIDTH,
    'height' : CHARACTER_PIC_HEIGHT,
    'pic_url': "null",
    'x'      : CHARACTER_PIC_X_POINT,
    'y'      : CHARACTER_PIC_Y_POINT
  },
  default_nobel_text: {
    'width'  : SCREEN_WIDTH * 0.9,
    'height' : 500,
    'x'      : 60 ,
    'y'      : 1000,
    'color'  : '#000000',
    'font'   : 'normal normal 70px/1.0 "Arial"'
  },
  default_kick_button: {
    'width'  : SCREEN_WIDTH,
    'height' : SCREEN_HEIGHT,
    'pic_url': "",
    'x'      : 0,
    'y'      : 0
  },
  default_comment_box: {
    'width'  : 1664,
    'height' : 1408,
    'pic_url': "img/comment_01.png",
    'x'      : (SCREEN_WIDTH - 1664)/2,
    'y'      : (SCREEN_HEIGHT - 1408)/2
  },
  default_comment_text: {
    'width'  : 1664 * 0.65,
    'height' : 1408 * 0.6,
    'x'      : (SCREEN_WIDTH - 1664)/2 + 200,
    'y'      : (SCREEN_HEIGHT - 1408)/2 + 450,
    'color'  : '#000000',
    'font'   : 'normal normal 70px/1.0 "Arial"'
  },
  default_cut_in: {
    'width'  : 2024,
    'height' : 768,
    'pic_url': "img/stage/cutin.png",
    'x'      : SCREEN_WIDTH,
    'y'      : SCREEN_HEIGHT * 0.1
  }

};


