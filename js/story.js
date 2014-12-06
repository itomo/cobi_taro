var story;
function getStorySetting(stage) {
    story = [];
    file = "data/"+"stage"+stage+".json";
    $.getJSON(file, function (data) {
        $.each(data, function (key, val) {
            story[key] = val;
            //console.log(story);
        });
        setStoryData();
    });
}

function setStoryData(scene){
    console.log(story);
    this.type = story.scene;
    console.log(this.type);

}
var story_data = new getStorySetting(1);


    /*
    var serif = function getSerif(scene) {
        return this.story["scene"];
    };

    var question = function getQuestion(scene)
    :["fuga", "poyo"], "select":{"1":"hoge", "2":"fuga"}, "answer":1, "comment":["hoge", "fuga"]},00
    function getSerif(scene) {
        return this.story["scene"];
    }

    function getQuestion(scene) {
        return this.story["scene"];
    }

    function getResult(scene) {
        return this.story["scene"];
    }

*/
//var type = story.type(1);
