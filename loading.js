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
        $("body").css("background-image","url('maps/"+mapName+".png')");
        $("#title").text(mapData[mapName].name);
        $("#desc").text(mapData[mapName].desc);
        $(".serverMessage").text(serverMessage);
        $(".header").show();
        $(".footer").show();
    } else {
        $("body").css("background-image","url('background.png')");
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