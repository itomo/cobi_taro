// --- ノベルシーン
// data: ステージのデータ
var createNovelScene = function(stage_id) {
  // sceneは1からスタート
  var now             = 1; // 現在のscene id
  var next            = 0;
  var text_id         = 0; // 現在表示中のセリフ番号

  // objects
  var scene           = new Scene();
  var text_background = makeImg(param.default_text_background);
  var background      = makeImg(param.default_background);
  var character       = makeImg(param.default_chara);
  var text            = makeLabel(param.default_nobel_text);  // 問題分とか
  var kick_button     = makeImg(param.default_kick_button);
  var cut_in          = makeImg(param.default_cut_in);

  var select_box_list = {};
  for (var i = 1; i <= 4; i++) {
    select_box_list[i] = new SelectBox(i); // 選択肢用の箱を作っておく
  }
  var comment_box = new CommentBox();

  // 問題を間違えていないかフラグを初期化
  strage.failed_ans = 0;

  // 描画
  scene.addChild(background);
  scene.addChild(character);
  scene.addChild(text_background);
  scene.addChild(text);

  // 最初の絵を描画
  setContext.background(stage_id, now, background);
  setContext.character(stage_id, now, character);
  setContext.text(stage_id, now, text_id, text);
  text_id += 1;

  // クリックしたら内容を変える
  kick_button.ontouchstart = function() {
    console.log (assets.stage[stage_id][now]['serif'][text_id])

    if (text_id < assets.stage[stage_id][now]['serif'].length) {
      // まだ asstes.stage[stage_id][id]['serif'] に表示していないセリフがある
      setContext.text(stage_id, now, text_id, text);
      text_id += 1;

    } else {
      // 次の会話シーン(assets.stage[stage_id][next])を描画

      if (isLastStage(stage_id, now)) {
        if (strage.failed_ans == 1) {
          // 1問でも不正解
          next = getNextId(now, 2);
        } else {
          // 全問正解
          next = getNextId(now, 1);
        }
      } else {
        // 次は通常の問題文のシーン
        next = getNextId(now, 0);
      }
      now  = next;
      text_id = 0;
      console.log("next: " + next + " now: " + now);

      if (assets.stage[stage_id][next]['type'] == 1) {
        // 次は問題文のシーン
        scene.removeChild(kick_button); // 先に進める用のボタンを消す

        // 各選択ボックスを出し、それぞれにイベントを登録していく
        setScene.question_scene(stage_id, next, background, character, text, select_box_list, comment_box);
        for (var i = 1; i <= 4; i++) {
          select_box_list[i].ontouchstart = function() {
            setContext.cut_in(cut_in);
            scene.addChild(cut_in);
            cut_in.tl.moveTo(0, SCREEN_HEIGHT * 0.1, 3, enchant.Easing.QUAD_EASEOUT);
            $.wait(500).done(function(){
              if (this.id == this.ans) {
                console.log("select_box_list: " + this.id + " is cliced. true");
                comment_box.setup_status(1); // 正解

              } else {
                console.log("select_box_list: " + this.id + " is cliced. false");
                comment_box.setup_status(0); //不正解
                strage.failed_ans = 1;  // 1問でも失敗した
              }
              scene.addChild(comment_box);
            });
          };

          scene.addChild(select_box_list[i]); // ボックスを描画
        };

      } else {
        setScene.normal_scene(stage_id, next, background, character, text);
      }
    }
  };
  scene.addChild(kick_button);

  comment_box.ontouchstart = function() {
    scene.addChild(kick_button);
    for (var i = 1; i <= 4; i++) {
      scene.removeChild(select_box_list[i]);
    }
    scene.removeChild(this);
    scene.removeChild(cut_in);
    console.log("comment_box: this.status: " + this.status);
    if (this.status == 1) {
      // 正解
      next = getNextId(now, 1);
      now  = next;
    } else {
      // 不正解
      next = getNextId(now, 2);
      now  = next;
    }
    setScene.normal_scene(stage_id, next, background, character, text);
  };

  return scene;
};

var setScene = {
  normal_scene: function(stage_id, id, background, character, text) {
    // 会話のみのシーンを描画
    // シーンの最初の会話なはずなので、text_id = 0
    setContext.background(stage_id, id, background); // background の変更
    setContext.character(stage_id, id, character);   // character の変更
    setContext.text(stage_id, id, 0, text);          // text_zone の変更
  },
  question_scene: function(stage_id, id, background, character, text, select_box_list, comment_box) {
    // 問題文のシーンを描画
    setContext.background(stage_id, id, background); // background の変更
    setContext.character(stage_id, id, character);   // character の変更
    setContext.question(stage_id, id, text);         // 問題文の表示
    for (var i = 1; i <= 4; i++) {
      select_box_list[i].setup_answer(assets.stage[stage_id][id]['answer']);  // 答え情報を更新
      select_box_list[i].setup_text(assets.stage[stage_id][id]['select'][i]); // 問題文を更新
    };
    comment_box.setup_text(assets.stage[stage_id][id]['comment'].join(" "));
  }
};

var setContext = {
  background: function (stage_id, id, background) {
    // 背景データが入っていたら切り替え
    var pic_url = '';
    if (assets.stage_pic[stage_id][id] != undefined) {
      if (assets.stage_pic[stage_id][id]['background'] != '') {
        console.log("setContext.background: stage_id: " + stage_id + " id: " + id);
        console.log("setContext.background: " + game.assets["img/stage/" + assets.stage_pic[stage_id][id]['background']]);
        background.image = game.assets["img/stage/" + assets.stage_pic[stage_id][id]['background']];
      }
    }
  },
  character: function (stage_id, id, character) {
    var pic_url = '';
    // 人物データが入っていたら切り替え
    if (assets.stage_pic[stage_id][id] != undefined) {
      if (assets.stage_pic[stage_id][id]['character'] != '') {
        // img/chara/null.png は、透明な画像
        if (assets.stage_pic[stage_id][id]['character'] == "null") {
          pic_url = "img/chara/null.png";
        } else {
          pic_url = "img/chara/" + assets.stage_pic[stage_id][id]['character'];
        }
        character.image = game.assets[pic_url];
      }
    }
  },
  text: function(stage_id, id, text_id, text) {
    text.text = assets.stage[stage_id][id]['serif'][text_id];
  },
  question: function(stage_id, id, text) {
    // 問題文を表示
    text.text = assets.stage[stage_id][id]['question'][0];
  },
  cut_in: function (obj) {
    obj.x = SCREEN_WIDTH;
    obj.y = SCREEN_HEIGHT * 0.3;
  }
};

  //----- エンディングシーン -----
  var createEndingScene = function() {
    console.log("createEndingScene");
    var scene = new Scene();
    var background = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
    // 背景
    background.backgroundColor= 'rgba(0,0,0,1)';
    scene.addChild(background);

    for (i=0; i < ending.length; i++) {
      var text = new Label();
      text.moveTo(50, 1300+(100*i));
      text.width = SCREEN_WIDTH * 0.9;
      text.height = 500;
      text.color = '#FFFFFF';
      text.font = 'normal normal 70px/1.0 "Arial"';
      text.text = ending[i];
      if (i == ending.length-1) {
        text.tl.moveBy(0,-8600,500).then(function() {
          var bk_button = new Label('戻る');
          bk_button.moveTo(900, 1200);
          bk_button.color = '#FFFFFF';
          bk_button.font = 'normal normal 50px/1.0 "Arial"';
          scene.addChild(bk_button);
          bk_button.ontouchstart = function() {
            game.replaceScene(createTitleScene());
          }
        });
      } else {
        text.tl.moveBy(0,-8600,500);
      }
      scene.addChild(text);
    }

    return scene;
  }

  window.onload = function() {
    game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);

    // 画像読み込み
    game.preload(STAGE_IMG_DIR + "/bg_13.jpg");
    game.preload('img/bord_02.png');

    game.preload(TITLE_IMG_TEXT);
    game.preload(TITLE_IMG_BACKGROUND);
    game.preload(TITLE_IMG_CHARACTER);
    game.preload(TITLE_IMG_BUTTON);
    game.preload(SELECT_IMG_BACKGROUND_1);
    game.preload(SELECT_IMG_BACKGROUND_2);
    game.preload(SELECT_IMG_BACKGROUND_3);
    game.preload(SELECT_IMG_BACKGROUND_4);
    game.preload(SELECT_IMG_BUTTON);
    game.preload(SELECT_IMG_TOUCH_1);
    game.preload(SELECT_IMG_TOUCH_2);
    game.preload(SELECT_IMG_TOUCH_3);
    game.preload(SELECT_IMG_TOUCH_4);
    game.preload("img/stage/bg_01.jpg");
    game.preload("img/stage/bg_02.jpg");
    game.preload("img/stage/bg_03.jpg");
    game.preload("img/stage/bg_04.jpg");
    game.preload("img/stage/bg_05.jpg");
    game.preload("img/stage/bg_06.jpg");
    game.preload("img/stage/bg_07.jpg");
    game.preload("img/stage/bg_08.jpg");
    game.preload("img/stage/bg_09.jpg");
    game.preload("img/stage/bg_10.jpg");
    game.preload("img/stage/bg_11.jpg");
    game.preload("img/stage/bg_12.jpg");
    game.preload("img/stage/bg_13.jpg");
    game.preload("img/stage/bg_14.jpg");
    game.preload("img/chara/chara_01-1.png");
    game.preload("img/chara/chara_02-2.png");
    game.preload("img/chara/chara_03-3.png");
    game.preload("img/chara/chara_07-1.png");
    game.preload("img/chara/chara_08-2.png");
    game.preload("img/chara/chara_09-3.png");
    game.preload("img/chara/chara_11-3.png");
    game.preload("img/chara/chara_13-1.png");
    game.preload("img/chara/chara_14-2.png");
    game.preload("img/chara/chara_15-3.png");
    game.preload("img/chara/chara_01-2.png");
    game.preload("img/chara/chara_02-3.png");
    game.preload("img/chara/chara_04-1.png");
    game.preload("img/chara/chara_07-2.png");
    game.preload("img/chara/chara_08-3.png");
    game.preload("img/chara/chara_10-1.png");
    game.preload("img/chara/chara_12-1.png");
    game.preload("img/chara/chara_13-2.png");
    game.preload("img/chara/chara_14-3.png");
    game.preload("img/chara/chara_16-1.png");
    game.preload("img/chara/chara_01-3.png");
    game.preload("img/chara/chara_03-1.png");
    game.preload("img/chara/chara_05-1.png");
    game.preload("img/chara/chara_07-3.png");
    game.preload("img/chara/chara_09-1.png");
    game.preload("img/chara/chara_11-1.png");
    game.preload("img/chara/chara_12-2.png");
    game.preload("img/chara/chara_13-3.png");
    game.preload("img/chara/chara_15-1.png");
    game.preload("img/chara/chara_16-2.png");
    game.preload("img/chara/chara_02-1.png");
    game.preload("img/chara/chara_03-2.png");
    game.preload("img/chara/chara_06-1.png");
    game.preload("img/chara/chara_08-1.png");
    game.preload("img/chara/chara_09-2.png");
    game.preload("img/chara/chara_11-2.png");
    game.preload("img/chara/chara_12-3.png");
    game.preload("img/chara/chara_14-1.png");
    game.preload("img/chara/chara_15-2.png");
    game.preload("img/chara/chara_16-3.png");
    game.preload("img/chara/chara_17-1.png");
    game.preload("img/chara/null.png");
    game.preload("img/comment_01.png");

    game.preload(STAGE_IMG_CUTIN);

    game.preload(KOBI_SOUND);
    game.preload(SE_SOUND_1);
    game.preload(SE_SOUND_2);
    game.preload(SE_SOUND_3);

    game.onload = function() {
      game.fps = 12;
      //      game.replaceScene(createEndingScene());
      game.replaceScene(createTitleScene());
    };
    //   game.start();
    game.debug();

  };

//});


