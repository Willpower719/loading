var mapName = "";

function updateProgress(progress) {
    $("#text").text("Loading " + mapName + "... (" + Math.round(progress) + "%)");
}

dew.on("show", function (event) {
    mapName = event.data.map || "";
    $(".container").css("background-image","url('maps/"+mapName+".png')");
    updateProgress(0);
});

dew.on("loadprogress", function (event) {
    var progress = event.data.currentBytes / event.data.totalBytes * 100;
    updateProgress(progress);
});