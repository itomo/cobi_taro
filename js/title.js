
// 開放するステージのdefault値は1
var open_stage = 1;
//----- タイトルシーン -----
var createTitleScene = function() {
  var scene = new Scene();
  var label = new Label('コビ太郎~ep.0~');
  // 背景
  var background = makeImg(title_background_param);
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
};

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

  var backbutton = makeImg(backbutton_param);
  scene.addChild(backbutton);

  // ステージ選択用の(透明)ボタンを配置
  var button_width = Math.floor(SCREEN_WIDTH/ LAST_STAGE);    //  各ボタンの幅
  var select_button_1 = makeSelectButton(1, scene);
  scene.addChild(select_button_1);

  if (strage.open_stage > 1) {
    var select_button_2 = makeSelectButton(2, scene);
    scene.addChild(select_button_2);
  }
  if (strage.open_stage > 2) {
    var select_button_3 = makeSelectButton(3, scene);
    scene.addChild(select_button_3);
  }
  if (strage.open_stage > 3) {
    var select_button_4 = makeSelectButton(4, scene);
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
    //game.replaceScene(renderingLabel(stage_id, scene_id, data));
    game.replaceScene(createNovelScene(stage_id));
  });
};
