enchant();

window.onload = function () {
    var game = new Game(2048, 1536);
    game.fps = 24;

    game.preload('img/bg_01.png', 'img/chara_01.png', 'img/button_01.png', 'img/stage_01.png', 'img/button_02.png');
    game.preload('img/bg_13.png', 'img/bord_01.png', 'img/bord_02.png', 'img/button_03.png');

    game.onload = function () {

        var TitleScene = function () {
            var scene = new Scene();
            var label = new Label('コビ太郎~ep.0~');

            scene.addChild(label);

            var bg1 = new Sprite(2048, 1536);
            bg1.image = game.assets['img/bg_01.png'];
            scene.addChild(bg1);

            var chara = new Sprite(520, 748);
            chara.image = game.assets['img/chara_01.png'];
            chara.moveTo(800, 250);
            chara.scaleX = 1.3;
            chara.scaleY = 1.3;
            scene.addChild(chara);

            var button1 = new Sprite(764, 384);
            button1.image = game.assets['img/button_01.png'];
            button1.moveTo(250, 1088);
            scene.addChild(button1);

            var button2 = new Sprite(764, 384);
            button2.image = game.assets['img/button_01.png'];
            button2.moveTo(1164, 1088);
            scene.addChild(button2);


            button1.addEventListener(Event.TOUCH_START, function (e) {
                game.replaceScene(SelectScene());
            });

            button2.addEventListener(Event.TOUCH_START, function (e) {
                game.replaceScene(GameScene());
            });

            return scene;
        };

        var SelectScene = function () {
            var scene = new Scene();
            var label = new Label('ステージ画面');

            scene.addChild(label);
            scene.backgroundcolor = 'rgba(230,230,0,1)';

            var stage = new Sprite(2048, 1536);
            stage.image = game.assets['img/stage_01.png'];
            scene.addChild(stage);

            var backbutton = new Sprite(128, 128);
            backbutton.image = game.assets['img/button_02.png'];
            backbutton.moveTo(1888, 32);
            scene.addChild(backbutton);

            stage.addEventListener(Event.TOUCH_START, function (e) {
                game.replaceScene(GameScene());
            });

            backbutton.addEventListener(Event.TOUCH_START, function (e) {
                game.replaceScene(TitleScene());
            });

            return scene;

        };

        var GameScene = function () {
            var scene = new Scene();
            var label = new Label('ゲーム画面');

            scene.addChild(label);
            scene.backgroundcolor = 'rgba(200,230,0,1)';

            var bg = new Sprite(2048, 1536);
            bg.image = game.assets['img/bg_13.png'];

            var bord1 = new Sprite(640, 128);
            bord1.image = game.assets['img/bord_01.png'];
            bord1.moveTo(32, 32);

            var backButton = new Sprite(128, 128);
            backButton.image = game.assets['img/button_02.png']
            backButton.moveTo(1888, 32);

            var scenario = new Sprite(1986, 512);
            scenario.image = game.assets['img/bord_02.png'];
            scenario.moveTo(32, 960);

            scene.addChild(bg);
            scene.addChild(bord1);
            scene.addChild(scenario);
            scene.addChild(backButton);


            backButton.addEventListener(Event.TOUCH_START, function (e) {
                game.replaceScene(TitleScene());
            });

            scenario.addEventListener(Event.TOUCH_START, function (e) {
                game.replaceScene(GameClearScene());
            });

            return scene;
        };

        var GameClearScene = function () {
            var scene = new Scene();
            var label = new Label('１ゲームクリア');

            scene.addChild(label);
            scene.backgroundcolor = 'rgba(180,230,0,1)';

            scene.addEventListener(Event.TOUCH_START, function (e) {

                game.replaceScene(SelectScene());
            });
            return scene;
        };

        game.replaceScene(TitleScene());

    };
    game.start();
};
