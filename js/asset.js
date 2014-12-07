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
  }

  return assets;


})();
