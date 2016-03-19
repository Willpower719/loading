var mapName = "";
var mapData;
var serverMessage = ""

$(document).ready(function() {
    $.getJSON("dew://screens/loading/maps.json", function(json) {
        mapData = json;
    });
});

function updateProgress(progress) {
    $("#progressbar").attr('value', progress);
}

dew.on("show", function (event) {
    mapName = event.data.map || "";
    if (mapData[mapName]) {
        $("body").css("background","black");
        $(".container").css("border-width","1px 0 1px 0");
        $(".container").css("background-image","url('maps/"+mapName+".png')");
        $("#title").text(mapData[mapName].name);
        $("#desc").text(mapData[mapName].desc);
        $(".serverMessage").text(serverMessage);
        $(".header").show();
        $(".footer").show();
    } else {
        $("body").css("background","url('background.png') center");
        $("body").css("background-size","cover");
        $(".container").css("border-width","0");
        $(".container").css("background-image","none");
        $(".serverMessage").text("");
        $(".header").hide();
        $(".footer").hide();
    }
    updateProgress(0);
});

dew.on("loadprogress", function (event) {
    var progress = event.data.currentBytes / event.data.totalBytes * 100;
    updateProgress(progress);
});