$(function(){

enchant();

  //----- タイトルシーン -----
  var createTitleScene = function() {
    var scene = new Scene();
    var label = new Label('コビ太郎~ep.0~');
    var background = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
    // 背景
    background.image = game.assets[TITLE_IMG_BACKGROUND];
    scene.addChild(background);

    // 人物
    var chara = new Sprite(520, 748);
    chara.image = game.assets[TITLE_IMG_CHARACTER];
    chara.moveTo(800, 250);
    chara.scaleX = 1.3;
    chara.scaleY = 1.3;
    scene.addChild(chara);

    // ボタン
    var button1 = new Sprite(764, 384);
    button1.image = game.assets[TITLE_IMG_BUTTON];
    button1.moveTo(250, 1088);
    button1.ontouchstart = function() {
      game.replaceScene(SelectScene());
    };
    scene.addChild(button1);

    var button2 = new Sprite(764, 384);
    button2.image = game.assets[TITLE_IMG_BUTTON];
    button2.moveTo(1164, 1088);
    button2.ontouchstart = function() {
      game.replaceScene(GameScene());
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
    open_stage = 4;
    switch (open_stage) {
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

    select_button_2 = new Sprite(button_width, SCREEN_HEIGHT);
    start_width_2 = button_width;
    select_button_2.moveTo(start_width_2, 0);
    select_button_2.ontouchstart = function() {
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

    select_button_3 = new Sprite(button_width, SCREEN_HEIGHT);
    start_width_3 = button_width*2;
    select_button_3.moveTo(start_width_3, 0);
    select_button_3.ontouchstart = function() {
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

    select_button_4 = new Sprite(button_width, SCREEN_HEIGHT);
    start_width_4 = button_width*3;
    select_button_4.moveTo(start_width_4, 0);
    select_button_4.ontouchstart = function() {
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

    return scene;
  };

  //----- ステージシーンのセットアップ
  var setupScene = function(id) {
    // file = "data/" + "stage" + id + ".json";
    // $.getJSON(file , function(data) {
    //   createScene(id, data);
    // });
//    console.log(assets.stage_1);


    // var scene = new Scene();
    // var background = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
    // background.image = game.assets[STAGE_IMG_DIR + "/bg_13.jpg"];
    // background.x = 0;
    // background.y = 0;
    // scene.addChild(background);



    //for (var sid in assets.stage_1) {
    //$.wait(500).done(function(){
    game.replaceScene(renderingLabel(1, assets.stage_1[1]), "ho")
    //}
    //    }

  };

  var changeStoryScene = function() {
  }

  var renderingLabel = function(id, data, pic) {
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

    var serif = data["serif"];
    var serif_num = serif.length;
    var label_1 = new Label();
    label_1.moveTo(60, 1000);
    label_1.width = SCREEN_WIDTH * 0.9;
    label_1.height = 500;
    label_1.color = '#000000';
    label_1.font = 'normal normal 70px/1.0 "Arial"';

    if (data['type'] == 1) {
      //問題文のシーン
      label_1.text = data["question"][0];
      box_x_size = SCREEN_WIDTH / 4 * 1.5;
      box_y_size = (SCREEN_HEIGHT - 500)/ 2 * 0.7;

      var answer_box_1 = new Sprite(box_x_size, box_y_size)
      answer_box_1.moveTo(SCREEN_WIDTH/2 - 100 - box_x_size, 100);
      answer_box_1.backgroundColor = "rgba(127,255, 212, 0.5)";
      scene.addChild(answer_box_1);
      var answer_label_1 = new Label();
      answer_label_1.moveTo(SCREEN_WIDTH/2 - 100 - box_x_size + 10, 110);
      answer_label_1.width = box_x_size;
      answer_label_1.height = box_y_size;
	  answer_label_1.color = '#000000';
      answer_label_1.font = 'normal normal 70px/1.0 "Arial"';
      answer_label_1.text = data["select"][1];
      scene.addChild(answer_label_1);


      var answer_box_2 = new Sprite(box_x_size, box_y_size)
      answer_box_2.moveTo(SCREEN_WIDTH/2 + 100, 100);
      answer_box_2.backgroundColor = "rgba(127,255, 212, 0.5)";
      scene.addChild(answer_box_2);
      var answer_label_2 = new Label();
      answer_label_2.moveTo(SCREEN_WIDTH/2 + 100 + 10, 110);
      answer_label_2.width = box_x_size;
      answer_label_2.height = box_y_size;
	  answer_label_2.color = '#000000';
      answer_label_2.font = 'normal normal 70px/1.0 "Arial"';
      answer_label_2.text = data["select"][2];
      scene.addChild(answer_label_2);

      var answer_box_3 = new Sprite(box_x_size, box_y_size)
      answer_box_3.moveTo(SCREEN_WIDTH/2 - 100 - box_x_size, 100 + 50 + box_y_size);
      answer_box_3.backgroundColor = "rgba(127,255, 212, 0.5)";
      scene.addChild(answer_box_3);
      var answer_label_3 = new Label();
      answer_label_3.moveTo(SCREEN_WIDTH/2 - 100 - box_x_size + 10, 100 + 50 + box_y_size + 10);
      answer_label_3.width = box_x_size;
      answer_label_3.height = box_y_size;
	  answer_label_3.color = '#000000';
      answer_label_3.font = 'normal normal 70px/1.0 "Arial"';
      answer_label_3.text = data["select"][3];
      scene.addChild(answer_label_3);

      var answer_box_4 = new Sprite(box_x_size, box_y_size)
      answer_box_4.moveTo(SCREEN_WIDTH/2 + 100, 100 + 50 + box_y_size);
      answer_box_4.backgroundColor = "rgba(127,255, 212, 0.5)";
      scene.addChild(answer_box_4);
      var answer_label_4 = new Label();
      answer_label_4.moveTo(SCREEN_WIDTH/2 + 100 + 10, 100 + 50 + box_y_size + 10);
      answer_label_4.width = box_x_size;
      answer_label_4.height = box_y_size;
	  answer_label_4.color = '#000000';
      answer_label_4.font = 'normal normal 70px/1.0 "Arial"';
      answer_label_4.text = data["select"][4];
      scene.addChild(answer_label_4);


    } else {
        //通常の会話シーン
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
        scene.addChild(label_1);

        //見えないボタン
        kick_button= new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
        kick_button.moveTo(0, 0);
        kick_button.ontouchstart = function() {
          if (serif_count < serif_num) {
            label_1.text = serif[serif_count];
            serif_count += 1;
            if (serif_count < serif_num) {
              str = 0;
            }
          } else {
            next_id = id + 1;
            console.log("next_id: " + next_id)
            game.replaceScene(renderingLabel(next_id, assets.stage_1[next_id]), "ho")
          }
        };
        scene.addChild(kick_button);

    }


    return scene;
  }

  var chompText = function(text) {
//    var max_char = 
  }



  var getTextLineLevel = function(level) {
    var top = 990;
    // var bottom = SCREEN_HEIGHT - 30
    // var space = bottom - top;
    // var line_num = space / 70;

    return top + 90 * level;
  }


  // 画像読み込み

  //
  var createScene = function(id, data_list) {
//    createSingleScene(1, data_list[1])

    console.log("createSingleScene " + id);
    console.log(data_list[1]);

    var scene = new Scene(SCREEN_WIDTH, SCREEN_HEIGHT);
    var background = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
    background.image = game.assets[STAGE_IMG_DIR + "/bg_13.jpg"];
    background.x = 0;
    background.y = 0;

    scene.addChild(background);

    return scene;


    // $.each(data_list, function(i, data){
    //   createSingleScene(i, data);
    // });
  }
  var createSingleScene = function(id, data) {
    var scene = new Scene();
    var label = new Label('コビ太郎~ep.0~');
    var background = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);

    // 背景
    background.image = game.assets[TITLE_IMG_BACKGROUND];
    scene.addChild(background);

    // console.log("createSingleScene " + id)
    // console.log(data)

    // var scene = new Scene(SCREEN_WIDTH, SCREEN_HEIGHT);
    // var background = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
    // background.image = game.assets[STAGE_IMG_DIR + "/bg_13.jpg"];
    // scene.addChild(background);

    return scene;
    // var serif_label = new Label();
  }


  window.onload = function() {
    game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);

    // 画像読み込み
    game.preload(STAGE_IMG_DIR + "/bg_13.jpg");
    game.preload('img/bord_02.png');

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

    game.preload(KOBI_SOUND);

    game.onload = function() {
      game.fps = 24;
      game.replaceScene(createTitleScene());
    };
    game.start();

  };

});


