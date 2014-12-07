window.assets = (function(){

  function Module() {}
  var assets = new Module();

  // stage番号と合わせる
  assets.laststage = [0, 13, 14, 15, 16];

  assets.stage = {};

  assets.loadAsset = function(stage_id, callback){
    file_name = "data/stage" + stage_id + ".json";
    $.getJSON(file_name, function(data) {
      assets.stage[stage_id] = data;
      //スタート時に呼ばれるだけと想定
      return callback(stage_id, 1, assets.stage[stage_id][1]);
    });
  }

  return assets;


})();
