var mapName = "";
var gameModes = ["slayer","ctf","slayer","oddball","koth","forge","vip","juggernaut","territories","assault","infection"];

function updateProgress(progress) {
    $("#progressbar").attr('value', progress);
}

dew.on("show", function (event) {
    mapName = event.data.map || "";
    if (mapName != "mainmenu") {
        $("body").css("background-image","url('maps/"+mapName+".png')");
        dew.getMapVariantInfo(function (info) {
            $("#title").text(info.name);
            $("#desc").text(info.description);
        });
        dew.getGameVariantInfo(function (info) {
            $("#gametypeicon").attr("src","gametypes/"+gameModes[info.mode]+".png");
            $("#gametype").text(info.name);  
            $("#gamerounds").text(info.rounds);   
            $("#gamescore").text(info.scoreToWin);   
            $("#timelimit").text(info.timeLimit);                
        });
        dew.command("Server.NameClient", { internal: true }, function (name) {
            $(".serverName").text(name);
        });
        dew.command("Server.MessageClient", { internal: true }, function (message) {
            if(message.length > 0){
                $(".serverMessage").show();
                $(".serverMessage").html(textWithNewLines(message));
            } else {
                $(".serverMessage").hide();
            }
        });
        $(".header").show();
        $(".footer").show();
    } else {
        $("body").css("background-image","url('background.png')");
        $(".serverMessage").hide();
        $(".header").hide();
        $(".footer").hide();
    }
    updateProgress(0);
});

dew.on("loadprogress", function (event) {
    var progress = event.data.currentBytes / event.data.totalBytes * 100;
    updateProgress(progress);
});

function textWithNewLines(text) {
    var htmls = [];
    var lines = text.split("\\n");
    var tmpDiv = jQuery(document.createElement('div'));
    for (var i = 0 ; i < lines.length ; i++) {
        htmls.push(tmpDiv.text(lines[i].trim()).html());
    }
    return htmls.join("<br>");
}