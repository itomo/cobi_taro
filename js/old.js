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

    // 背景
    var background = makeImg(bg_param);
    scene.addChild(background);

    // セリフ
    var scenario_board_param = scenario_board_default_param;
    var scenario = makeImg(scenario_board_param);
    scene.addChild(scenario);

    // 登場人物
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
          } else {
            game.replaceScene(SelectScene());
          }
        } else {
          game.replaceScene(SelectScene());
        }
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
