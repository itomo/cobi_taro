$(function(){

enchant();

  var open_stage = 1;
  //----- タイトルシーン -----
  var createTitleScene = function() {
    var scene = new Scene();
    var label = new Label('コビ太郎~ep.0~');

    // 背景
    var background = makeImg(title_background_param)
    scene.addChild(background);

    // 人物
    var chara = makeChara(title_chara);
    scene.addChild(chara);
    var title = new Sprite(1152, 256);
    title.image = game.assets[TITLE_IMG_TEXT];
    title.moveTo(700,568);
    title.scaleX = 2.2;
    title.scaleY = 2.2;
    scene.addChild(title);

    // ボタン
    var button1 = makeImg(title_button1_param);
    button1.ontouchstart = function() {
      game.replaceScene(SelectScene());
    };
    scene.addChild(button1);
    var button2 = makeImg(title_button2_param);
    button2.ontouchstart = function() {
      // テスト用に全解放
      strage.open_stage = 4;
      game.replaceScene(SelectScene());
    };
    scene.addChild(button2);

    return scene;
  }

  //----- ステージ選択シーン -----
  var SelectScene = function () {
    var scene = new Scene();
    var select_bgm = game.assets[KOBI_SOUND];

    scene.backgroundcolor = 'rgba(230,230,0,1)';

    var label = new Label('ステージ画面');
    scene.addChild(label);

    var background = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);

    switch (strage.open_stage) {
    case 1:
      img_path = SELECT_IMG_BACKGROUND_1;
      break;
    case 2:
      img_path = SELECT_IMG_BACKGROUND_2;
      break;
    case 3:
      img_path = SELECT_IMG_BACKGROUND_3;
      break;
    case 4:
      img_path = SELECT_IMG_BACKGROUND_4;
      break;
    default:
      break;
    }
    background.image = game.assets[img_path];
    scene.addChild(background)

    var backbutton = new Sprite(128, 128);
    backbutton.image = game.assets[SELECT_IMG_BUTTON];
    backbutton.moveTo(1888, 32);
    scene.addChild(backbutton);

    var button_width = Math.floor(SCREEN_WIDTH/ LAST_STAGE);    //  各ボタンの幅
    select_button_1 = new Sprite(button_width, SCREEN_HEIGHT);
    select_button_1.moveTo(0, 0);
    select_button_1.ontouchstart = function() {
      scene.removeChild(this);
      select_bgm.play();
      $.wait(500).done(function(){
        select_scene = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
        select_scene.image = game.assets[SELECT_IMG_TOUCH_1];
        select_scene.moveTo(0, 0);
        scene.addChild(select_scene);
        select_scene.tl.moveBy(400,0,5);
        select_scene.tl.and();
        select_scene.tl.scaleBy(1.5,5);
        $.wait(500).done(function(){
          setupScene(1);
        });
      });
    };
    scene.addChild(select_button_1);

    if (strage.open_stage > 1) {
      select_button_2 = new Sprite(button_width, SCREEN_HEIGHT);
      start_width_2 = button_width;
      select_button_2.moveTo(start_width_2, 0);
      select_button_2.ontouchstart = function() {
        scene.removeChild(this);
        select_bgm.play();
        $.wait(500).done(function(){
          select_scene = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
          select_scene.image = game.assets[SELECT_IMG_TOUCH_2];
          select_scene.moveTo(0, 0);
          scene.addChild(select_scene);
          select_scene.tl.moveBy(300,0,5);
          select_scene.tl.and();
          select_scene.tl.scaleBy(1.5,5);
            $.wait(500).done(function(){
              setupScene(2);
            });
        });
      };
      scene.addChild(select_button_2);
    }

    if (strage.open_stage > 2) {
      select_button_3 = new Sprite(button_width, SCREEN_HEIGHT);
      start_width_3 = button_width*2;
      select_button_3.moveTo(start_width_3, 0);
      select_button_3.ontouchstart = function() {
        scene.removeChild(this);
        select_bgm.play();
        $.wait(500).done(function(){
          select_scene = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
          select_scene.image = game.assets[SELECT_IMG_TOUCH_3];
          select_scene.moveTo(0, 0);
          scene.addChild(select_scene);
          select_scene.tl.moveBy(-200,0,5);
          select_scene.tl.and();
          select_scene.tl.scaleBy(1.5,5);
            $.wait(500).done(function(){
              setupScene(3);
            });
        });
      };
      scene.addChild(select_button_3);
    }

    if (strage.open_stage > 3) {
      select_button_4 = new Sprite(button_width, SCREEN_HEIGHT);
      start_width_4 = button_width*3;
      select_button_4.moveTo(start_width_4, 0);
      select_button_4.ontouchstart = function() {
        scene.removeChild(this);
        select_bgm.play();
        $.wait(500).done(function(){
            select_scene = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
            select_scene.image = game.assets[SELECT_IMG_TOUCH_4];
            select_scene.moveTo(0, 0);
            scene.addChild(select_scene);
            select_scene.tl.moveBy(-600,0,5);
            select_scene.tl.and();
            select_scene.tl.scaleBy(1.5,5);
            $.wait(500).done(function(){
              setupScene(4);
            });
        });
      };
      scene.addChild(select_button_4);
    }

    return scene;
  };

  //----- ステージシーンのセットアップ
  var setupScene = function(id) {
    // 問題ミスのフラグを初期化
    strage.failed_ans = 0;
    //assets.loadAsset(id, renderingStart);
    assets.loadAsset(id, function(stage_id, scene_id, data){
      game.replaceScene(renderingLabel(stage_id, scene_id, data));
    });
  };

  var renderingLabel = function(stage_id, id, data, pic) {
    var scene = new Scene();

    // 背景データが入ってたら、背景切り替え
    var bg_param = background_default_param;
    // default
    if (assets.stage_pic[stage_id][id] != undefined) {
      if (assets.stage_pic[stage_id][id]['background'] != '') {
      bg_param['pic_url'] = "img/stage/" + assets.stage_pic[stage_id][id]['background'];
      }
    }

    var background = makeImg(bg_param);
    scene.addChild(background);


    var scenario_board_param = scenario_board_default_param;
    var scenario = makeImg(scenario_board_param);
    scene.addChild(scenario);

    var chara_param = chara_default_param;
    if (assets.stage_pic[stage_id][id] != undefined) {
      chara_param['pic_url'] = "img/chara/" + assets.stage_pic[stage_id][id]['character'];
    }
    if (chara_param['pic_url'] != "img/chara/null") {
      var chara = makeChara(chara_param);
      scene.addChild(chara);
    }

    var serif = data["serif"];
    var serif_num = serif.length;
    var label_1 = new Label();
    label_1.moveTo(60, 1000);
    label_1.width = SCREEN_WIDTH * 0.9;
    label_1.height = 500;
    label_1.color = '#000000';
    label_1.font = 'normal normal 70px/1.0 "Arial"';
    scene.addChild(label_1);

    if (data['type'] == 1) {
      //問題文のシーン
      label_1.text = data["question"][0];
      box_x_size = SCREEN_WIDTH / 4 * 1.5;
      box_y_size = (SCREEN_HEIGHT - 500)/ 2 * 0.7;

      var answer_box_1 = new Sprite(box_x_size, box_y_size)
      answer_box_1.moveTo(SCREEN_WIDTH/2 - 100 - box_x_size, 100);
      answer_box_1.backgroundColor = "rgba(127,255, 212, 0.5)";
      answer_box_1.ontouchstart = function() {
        console.log("push 1");
        checkAnswer(stage_id, id, 1, data, scene);
      }
      scene.addChild(answer_box_1);
      var answer_label_1 = new Label();
      answer_label_1.moveTo(SCREEN_WIDTH/2 - 100 - box_x_size + 10, 110);
      answer_label_1.width = box_x_size;
      answer_label_1.height = box_y_size;
	  answer_label_1.color = '#000000';
      answer_label_1.font = 'normal normal 70px/1.0 "Arial"';
      answer_label_1.text = "① " + data["select"][1];
      scene.addChild(answer_label_1);


      var answer_box_2 = new Sprite(box_x_size, box_y_size)
      answer_box_2.moveTo(SCREEN_WIDTH/2 + 100, 100);
      answer_box_2.backgroundColor = "rgba(127,255, 212, 0.5)";
      answer_box_2.ontouchstart = function() {
        console.log("push 2");
        checkAnswer(stage_id, id, 2, data, scene);
      }
      scene.addChild(answer_box_2);
      var answer_label_2 = new Label();
      answer_label_2.moveTo(SCREEN_WIDTH/2 + 100 + 10, 110);
      answer_label_2.width = box_x_size;
      answer_label_2.height = box_y_size;
	  answer_label_2.color = '#000000';
      answer_label_2.font = 'normal normal 70px/1.0 "Arial"';
      answer_label_2.text = "② " + data["select"][2];
      scene.addChild(answer_label_2);

      var answer_box_3 = new Sprite(box_x_size, box_y_size)
      answer_box_3.moveTo(SCREEN_WIDTH/2 - 100 - box_x_size, 100 + 50 + box_y_size);
      answer_box_3.backgroundColor = "rgba(127,255, 212, 0.5)";
      answer_box_3.ontouchstart = function() {
        console.log("push 3");
        checkAnswer(stage_id, id, 3, data, scene);
      }
      scene.addChild(answer_box_3);
      var answer_label_3 = new Label();
      answer_label_3.moveTo(SCREEN_WIDTH/2 - 100 - box_x_size + 10, 100 + 50 + box_y_size + 10);
      answer_label_3.width = box_x_size;
      answer_label_3.height = box_y_size;
	  answer_label_3.color = '#000000';
      answer_label_3.font = 'normal normal 70px/1.0 "Arial"';
      answer_label_3.text = "③ " + data["select"][3];
      scene.addChild(answer_label_3);

      var answer_box_4 = new Sprite(box_x_size, box_y_size)
      answer_box_4.moveTo(SCREEN_WIDTH/2 + 100, 100 + 50 + box_y_size);
      answer_box_4.backgroundColor = "rgba(127,255, 212, 0.5)";
      answer_box_4.ontouchstart = function() {
        console.log("push 4");
        checkAnswer(stage_id, id, 4, data, scene);
      }
      scene.addChild(answer_box_4);
      var answer_label_4 = new Label();
      answer_label_4.moveTo(SCREEN_WIDTH/2 + 100 + 10, 100 + 50 + box_y_size + 10);
      answer_label_4.width = box_x_size;
      answer_label_4.height = box_y_size;
	  answer_label_4.color = '#000000';
      answer_label_4.font = 'normal normal 70px/1.0 "Arial"';
      answer_label_4.text = "④ " + data["select"][4];
      scene.addChild(answer_label_4);

    } else {
        //通常の会話シーン
      console.log("normal -----");
        var str = 0;
        // セリフは0から
        var serif_count = 0;
        if (serif[serif_count] != "" && serif_count < serif_num) {
            label_1.on('enterframe', function() {
                if (serif_count < serif.length && str <= serif[serif_count].length) {
                    label_1.text = serif[serif_count].substring(0,str);
                    str++;
                }
            });
        }

        //見えないボタン
        var kick_button= new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
        kick_button.moveTo(0, 0);
        kick_button.ontouchstart = function() {
          if (serif_count < serif_num) {
            label_1.text = serif[serif_count];
            serif_count += 1;
            if (serif_count < serif_num) {
              str = 0;
            }
          } else {
            if (isLastStage(stage_id, id)) {
              //ここが最終ステージ
              console.log("last stage now id: " + id)
              //game.replaceScene(renderingLastScene(stage_id, id, data));
              game.removeScene(scene);
              game.replaceScene(renderingLastScene(stage_id, id, data));
            } else {
              //次もある
              next_id = getNextId(id, 0);
              console.log("next_id: " + next_id)
              game.removeScene(scene);
              game.replaceScene(renderingLabel(stage_id, next_id, assets.stage[stage_id][next_id]));
            }

          }
        };
        scene.addChild(kick_button);

    }

    return scene;
  }

  // 最終ステージの描画
  var renderingLastScene = function(stage_id, id, data) {
    var next_id;
    var succes;
    if (strage.failed_ans == 1) {
      // 失敗
      next_id = getNextId(id, 2);
    } else {
      // 成功
      next_id = getNextId(id, 1)
    }

    console.log("renderingLastScene next_id: " + next_id + " id: " + id);
    var last_data = assets.stage[stage_id][next_id];

    var scene = new Scene();
    var background = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
    background.image = game.assets[STAGE_IMG_DIR + "/bg_13.jpg"];
    background.x = 0;
    background.y = 0;
    scene.addChild(background);

    var scenario = new Sprite(1986, 512);
    scenario.image = game.assets['img/bord_02.png'];
    scenario.moveTo(32, 960);
    scene.addChild(scenario);

    var serif = last_data["serif"];
    var serif_num = serif.length;
    var label_1 = new Label();
    label_1.moveTo(60, 1000);
    label_1.width = SCREEN_WIDTH * 0.9;
    label_1.height = 500;
    label_1.color = '#000000';
    label_1.font = 'normal normal 70px/1.0 "Arial"';
    scene.addChild(label_1);

    //通常の会話シーン
    console.log("last scene -----");
    var str = 0;
    // セリフは0から
    var serif_count = 0;
    if (serif[serif_count] != "" && serif_count < serif_num) {
      label_1.on('enterframe', function() {
        if (serif_count < serif.length && str <= serif[serif_count].length) {
          label_1.text = serif[serif_count].substring(0,str);
          str++;
        }
      });
    }

    //見えないボタン
    var kick_button= new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
    kick_button.moveTo(0, 0);
    kick_button.ontouchstart = function() {
      if (serif_count < serif_num) {
        label_1.text = serif[serif_count];
        serif_count += 1;
        if (serif_count < serif_num) {
          str = 0;
        }
      } else {
        // 会話を表示させきったので選択画面へ
        console.log()
        if (strage.failed_ans == 0) {
          // 全問正解なのでエンディングへ
          strage.open_stage = strage.open_stage + 1;
          if (stage_id == 4) {
            console.log("gotto Ending")
            game.replaceScene(createEndingScene());
          }
        }
        game.replaceScene(SelectScene());

      }
    };
    scene.addChild(kick_button);

    return scene;
  };


  // num: 選択した問題番号
  var checkAnswer = function(stage_id, id, num, data, scene) {
    console.log("checkAnswer num: " + num + "data['answer']: " + data['answer'])
    //  cut in

    var correct_answer = game.assets[SE_SOUND_1];
    var fail_answer = game.assets[SE_SOUND_2];
    var cut_in_bgm = game.assets[SE_SOUND_3];

    var cut_in = new Sprite(2024, 748);
    cut_in.image = game.assets[STAGE_IMG_CUTIN];
    cut_in.moveTo(20, 150);
    scene.addChild(cut_in);
    cut_in_bgm.play();

    $.wait(500).done(function(){
      if (num == data['answer']) {
        //-----------------------------------------------
        //  せいかい
        //-----------------------------------------------
        correct_answer.play();
        //正解
        var next_id = getNextId(id, 1);

        //解説の表示
        var comment = data['comment'].join(" ");
        // 箱
        var comment_box = makeCommentBox();
        comment_box.ontouchstart = function() {
          if (isLastStage(stage_id, id)) {
            //ここが最終ステージ
            console.log("last stage now id: " + id)
            game.replaceScene(renderingLastScene(stage_id, id, data));
          } else {
            console.log("comment_box " + next_id);
            game.replaceScene(renderingLabel(stage_id, next_id, assets.stage[stage_id][next_id]));
          }
        }
        scene.addChild(comment_box);
        // 解説
        var comment_label = makeCommentText(comment)
        scene.addChild(comment_label);

      } else {
        //-----------------------------------------------
        //  ごとう
        //-----------------------------------------------

        fail_answer.play();
        //失敗
        var next_id = getNextId(id, 2);

        // 問題ミスのフラグオン
        strage.failed_ans = 1;

        //解説の表示
        var comment = data['comment'].join(" ");
        // 箱
        var comment_box = makeCommentBox();
        comment_box.ontouchstart = function() {
          if (isLastStage(stage_id, id)) {
            //ここが最終ステージ
            game.replaceScene(renderingLastScene(stage_id, id, data));
          } else {
            game.replaceScene(renderingLabel(stage_id, next_id, assets.stage[stage_id][next_id]));
          }
        }
        scene.addChild(comment_box);
        // 解説
        var comment_label = makeCommentText(comment)
        scene.addChild(comment_label);

        return scene;
      }
    });

  }

  var getTextLineLevel = function(level) {
    var top = 990;
    return top + 90 * level;
  }

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
  }

  // 最終ステージ化確認する
  var isLastStage = function(stage_id, now) {
    var now_id = now;
    var now_id_num;
    if (is('String', now_id) != true) {
      now_id = now_id + '';
    }
    now_id_num = now_id.replace(/-.*/, '');

    if (is('Number', now_id_num) != true) {
      now_id_num = Number(now_id_num);
    }
    if (now_id_num == assets.laststage[stage_id]) {
      return true;
    } else {
      return false;
    }
  }


  // 画像Spriteの基本的な部分を生成
  // pic_url        : 画像のパス
  // size_x, size_y : 画像の横/縦の大きさ
  // x, y           : 画像の座標
  //  var makeImg = function(pic_url, size_x, size_y, x, y) {
  var makeImg = function(param) {
    console.log(param)
    var pic_url = param['pic_url'];
    var size_x  = param['width'];
    var size_y  = param['height'];
    var x       = param['x'];
    var y       = param['y'];
    var img = new Sprite(size_x, size_y);
    img.image = game.assets[pic_url];
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
  }

  var makeCommentBox = function() {
    var comment_param = commentbox_default_param;
    var comment_box = makeImg(comment_param);
    comment_box.scaleX = 0.8;
    comment_box.scaleY = 0.8;
    return comment_box;
  }

  var makeCommentText = function(text) {
    var comment_param = commenttext_default_param
    var comment_label = new Label();
    comment_label.moveTo(comment_param['x'], comment_param['y']);
    comment_label.width = comment_param['width'];
    comment_label.height = comment_param['height'];
    comment_label.color = '#000000';
    comment_label.font = 'normal normal 70px/1.0 "Arial"';
    comment_label.text = text;
    return comment_label;
  }

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
    game.preload("img/comment_01.png");

    game.preload(STAGE_IMG_CUTIN);

    game.preload(KOBI_SOUND);
    game.preload(SE_SOUND_1);
    game.preload(SE_SOUND_2);
    game.preload(SE_SOUND_3);

    game.onload = function() {
      game.fps = 24;
//      game.replaceScene(createEndingScene());
      game.replaceScene(createTitleScene());
    };
    game.start();

  };

});


