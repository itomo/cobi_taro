/* -*- coding: utf-8 -*- */
var IMG_DIR        = "img";
var TITLE_IMG_DIR  = IMG_DIR + "/title";
var SELECT_IMG_DIR = IMG_DIR + "/select";
var STAGE_IMG_DIR  = IMG_DIR + "/stage";

var TITLE_IMG_BACKGROUND = TITLE_IMG_DIR + "/bg_01.jpg";
var TITLE_IMG_CHARACTER  = TITLE_IMG_DIR + "/chara_01.png";
var TITLE_IMG_BUTTON     = TITLE_IMG_DIR + "/button_01.png";

var SELECT_IMG_BACKGROUND = SELECT_IMG_DIR + "/bg_01.jpg";
var SELECT_IMG_BUTTON     = SELECT_IMG_DIR + "/button_02.png";

enchant();

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

var SelectScene = function () {
  console.log("hoge")
  var scene = new Scene();
  scene.backgroundcolor = 'rgba(230,230,0,1)';

  var label = new Label('ステージ画面');
  scene.addChild(label);

  var background = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
  background.image = game.assets[SELECT_IMG_BACKGROUND];
  scene.addChild(background)

  var backbutton = new Sprite(128, 128);
  backbutton.image = game.assets[SELECT_IMG_BUTTON];
  backbutton.moveTo(1888, 32);
  scene.addChild(backbutton);

  // todo
  // ステージを選択できるようにbuttonを4つ配置する
  // 戻るボタンを機能させる

  // stage.addEventListener(Event.TOUCH_START, function (e) {
  //   game.replaceScene(GameScene());
  // });

  // backbutton.addEventListener(Event.TOUCH_START, function (e) {
  //   game.replaceScene(TitleScene());
  // });

  return scene;

};


window.onload = function() {
  game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);

  // 画像読み込み
  game.preload(TITLE_IMG_BACKGROUND);
  game.preload(TITLE_IMG_CHARACTER);
  game.preload(TITLE_IMG_BUTTON);
  game.preload(SELECT_IMG_BACKGROUND);
  game.preload(SELECT_IMG_BUTTON);

  game.onload = function() {
    game.fps = 24;
    game.replaceScene(createTitleScene());
  };
  game.start();

};
