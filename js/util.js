// 画像Spriteの基本的な部分を生成
// pic_url        : 画像のパス
// size_x, size_y : 画像の横/縦の大きさ
// x, y           : 画像の座標
//  var makeImg = function(pic_url, size_x, size_y, x, y) {
var makeImg = function(param) {
  var pic_url = param['pic_url'];
  var size_x  = param['width'];
  var size_y  = param['height'];
  var x       = param['x'];
  var y       = param['y'];
  var img = new Sprite(size_x, size_y);

  // pic_urlが空文字でないなら、imageを配置する
  if (pic_url != "" && pic_url != "null") {
    img.image = game.assets[pic_url];
  }
  img.moveTo(x, y);
  return img;
};

// 中央に人物を配置するパーツの作成
var makeChara = function(param) {
  if (param['pic_url'] != "img/title/chara_01.png") {
    param['height'] =640;
    param['width'] =480;
  }
  var img = makeImg(param);
  img.scaleX = CHARACTER_PIC_X_SCALE;
  img.scaleY = CHARACTER_PIC_Y_SCALE;
  return img
};

// 文字列用のオブジェクトの作成
var makeLabel = function(param) {
  var label = new Label();
  label.width  = param['width'];
  label.height = param['height'];
  label.color  = param['color'];
  label.font   = param['font'];
  label.moveTo(param['x'], param['y']);
  return label;
};

var makeSound = function(path) {
  return game.assets[path];
};

// 問題の選択肢を入れておくボックス
var SelectBox = Class.create(Group, {
  initialize: function(id) {
    Group.call(this);

    this.id       = id;
    this.ans      = 0; //答え
    this.question = new Label();
    this.box      = new Sprite();

    var x_size = SCREEN_WIDTH / 4 * 1.5;
    var y_size = (SCREEN_HEIGHT - 500)/ 2 * 0.7;
    this.question.width  = x_size;
    this.question.height = y_size;
    this.question.font   = 'normal normal 70px/1.0 "Arial"'

    this.box.width  = x_size;
    this.box.height = y_size;
    this.box.backgroundColor = "rgba(127,255, 212, 0.5)";

    var x, y = 0;
    switch (id) {
    case 1:
      x = SCREEN_WIDTH/2 - 100 - x_size
      y = 100;
      break;
    case 2:
      x = SCREEN_WIDTH/2 + 100;
      y = 100;
      break;
    case 3:
      x = SCREEN_WIDTH/2 - 100 - x_size;
      y = 100 + 50 + y_size;
      break;
    case 4:
      x = SCREEN_WIDTH/2 + 100;
      y = 100 + 50 + y_size;
      break;
    default:
      break;
    }
    this.moveTo(x, y);
    this.addChild(this.box);
    this.addChild(this.question);

  },
  setup_answer: function(ans) {
    // 答え情報を更新
    this.ans = ans;
  },
  setup_text: function(text) {
    // 問題文を乗せる
    var str = '';
    switch (this.id) {
    case 1:
      str = "①";
      break;
    case 2:
      str = "②";
      break;
    case 3:
      str = "③";
      break;
    case 4:
      str = "④";
      break;
    default:
      break;
    }
    this.question.text = str + text;
  }
});

// 問題の解説を表示するボックス
var CommentBox = Class.create(Group, {
  initialize: function() {
    Group.call(this);
    this.status      = -1;
    this.comment    = makeLabel(param.default_comment_text);
    this.box        = makeImg(param.default_comment_box);
    this.box.scaleX = 0.8;
    this.box.scaleY = 0.8;
    this.addChild(this.box);
    this.addChild(this.comment);
  },
  setup_status: function(status, sound_assets) {
    // status = 0 不正解
    //        = 1 正解
    //        = -1 不定
    this.status = status;
    this.sound  = sound_assets;
  },
  setup_text: function(text) {
    console.log("comment.setup_text: " + text);
    this.comment.text = text;
  }
});

// ステージ選択用のボタンオブジェクトを作成する
var makeSelectButton = function(stage_id, scene) {
  var select_bgm = game.assets[KOBI_SOUND];
  var kick_button = makeImg(select_stage_button_param[stage_id]);
  var animation_info = select_stage_button_param[stage_id]['animation'];
  kick_button.ontouchstart = function() {
    scene.removeChild(this);
    select_bgm.play();
    $.wait(500).done(function(){
      var select_scene = makeImg(animation_info);
      scene.addChild(select_scene);
      select_scene.tl.moveBy(
        animation_info['move_x'],
        animation_info['move_y'],
        animation_info['move_s']
      );
      select_scene.tl.and();
      select_scene.tl.scaleBy(
        animation_info['scale_x'],
        animation_info['scale_y']
      );
      $.wait(500).done(function(){
        setupScene(stage_id);
      });
    });
  };
  return kick_button;
};

// 次のscene idを手に入れる
// branch = 0 -> 通常シーン
// branch = 1 -> 正解シーンへ
// branch = 2 -> 不正解シーン
var getNextId = function(now, branch) {
  var next_id;
  var now_id = now;
  if (is('String', now_id) != true) {
    now_id = now_id + ''; //文字列型へ変換
  }
  if (now_id.indexOf("-") != -1) {
    // - がnowに存在する
    console.log("before now_id: ", now_id);
    now_id = now_id.replace(/-.*/, '');
    console.log("replaced now_id: ", now_id);
  }

  if (branch == 1) {
    next_id = now_id + "-1";
  } else if (branch == 2){
    next_id = now_id + "-2";
  } else {
    if (is('Number', now_id) != true) {
      now_id = Number(now_id);
    }
    next_id = now_id + 1;
  }

  return next_id;
};

// ステージの最終結果を伝えるシーンかどうか確認する
// １つ手前 -> true
var isLastStage = function(stage_id, now) {
  var now_id = now;
  var now_id_num;
  if (is('String', now_id) != true) {
    now_id = now_id + '';
  }
  now_id_num = now_id.replace(/-.*/, '');// 13-1 とかを13に変える

  if (is('Number', now_id_num) != true) {
    now_id_num = Number(now_id_num);
  }
  if (now_id_num == assets.laststage[stage_id]) {
    return true;
  } else {
    return false;
  }
};

// 最終結果を伝えるシーンかどうか
var isStageEnd = function(stage_id, now) {
  var now_id = now;
  var end_id_1 = assets.laststage[stage_id] + '-1';
  var end_id_2 = assets.laststage[stage_id] + '-2';
  if (is('String', now_id) != true) {
    now_id = now_id + ''; // Stirng化
  }
  console.log('isStageEnd? now_id: ' + now_id + " end_id_1: " + end_id_1 + " end_id_2 " + end_id_2);
  if (now_id == end_id_1 || now_id == end_id_2) {
    return true;
  } else {
    return false;
  }
};

// 開放されているシーンがどのくらいか調べる
var openNewStage = function(stage_id) {
  if (stage_id == strage.open_stage) {
    // 現在実行中のステージが開放されている最も新しいステージなら、次のステージを開放
    strage.open_stage += 1;
  }
};
