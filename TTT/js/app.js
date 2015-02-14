var TTT_ns = TTT_ns || {};
TTT_ns.HideUI = function () {
    $("#reset_btn").hide();
    $("#game_field").hide();
    $("#game_log").hide();
    $("#gameover_popup").hide();
}

TTT_ns.ShowUI = function () {
    $("#initialize_btn").hide();
    $("#reset_btn").show();
    $("#game_field").show();
    $("#game_log").show();
}
TTT_ns.ResetUI = function () {
    $(".GameTile").empty();
    $("#gameover_popup").hide();
    TTT_ns.EnableUI();
    if (Math.round(Math.random()) == 0) {
        $("#game_log").html("The field has been reset for a new game. AI goes first.<br />");
        TTT_ns.AI_plays();
    }
    else {
        $("#game_log").html("The field has been reset for a new game. Player goes first.<br />");
    }
}
TTT_ns.EnableUI = function () {
    $("#reset_btn").removeAttr('disabled');
    $(".GameTile").removeAttr('disabled');
    $("#game_log").removeAttr('disabled');
}
TTT_ns.DisableUI = function () {
    $("#reset_btn").attr("disabled", "disabled");
    $(".GameTile").attr("disabled", "disabled");
    $("#game_log").attr("disabled", "disabled");
}

TTT_ns.Player_plays = function () {
    if (this.textContent === "") {
        this.textContent = "X";
        $("#game_log").html($("#game_log").html() + "Player marks the tile № " + this.id + "<br />");
        if (TTT_ns.CheckForVictory()) {
            $("#game_log").html($("#game_log").html() + "Player wins the game!" + '<br />');
            $("#gameover_popup").html("You have won!");
            TTT_ns.DisableUI();
            $("#gameover_popup").show();
        }
        else
            TTT_ns.AI_plays();
    }
}
TTT_ns.AI_plays = function () {
    var marked = false;
    var count = $(".GameTile").filter(function () { if ($(this).text() == "") return this; }).length;//Counts the empty tiles
    while (!marked && count != 0) {
        var rnd = Math.floor((Math.random() * TTT_ns.GameTileAmount) + 1); //Generating a random number between 1 and the amount of tiles on the field.
        if ($("#" + rnd).text() == "") {
            $("#" + rnd).text("O");
            marked = true;
            $("#game_log").html($("#game_log").html() + "AI marks the tile № " + rnd + '<br />');
        }
    }
    if (TTT_ns.CheckForVictory()) {
        $("#game_log").html($("#game_log").html() + "AI wins the game!" + '<br />');
        $("#gameover_popup").html("AI has won!");
        TTT_ns.DisableUI();
        $("#gameover_popup").show();
    }
}
TTT_ns.CheckForVictory = function () {
    var draw = 0;//"draw" is a counter representing the current number of vacant spaces on the gamefield, if the victory conditions aren't met by the time it reaches 1, a draw is called.
    var size = Math.sqrt(TTT_ns.GameTileAmount);
    //Populating a 2D array representing the game field with its current state to simplify checking for victory conditions
    var fieldModel = new Array(size);
    for (var i = 0; i < size; i++) {
        fieldModel[i] = new Array(size);
        for (var j = 0; j < size; j++) {
            fieldModel[i][j] = $("#" + (size * i + j + 1)).text();
            if ($("#" + (size * i + j + 1)).text() == "") {
                draw++;
            }
        }
    }

    //The following loop will check the crossing row and column for each field size index value and both diagonals in the end, until the victory condition is satisfied.
    var diag = "";
    var xdiag = "";
    for (var i = 0; i < size; i++) {
        var col = "";
        var row = "";
        for (var j = 0; j < size; j++) {
            col += fieldModel[j][i];
            row += fieldModel[i][j];
            if (i == j)
                diag += fieldModel[i][j];
            if (i + j == size - 1)
                xdiag += fieldModel[i][j];
        }
        if (TTT_ns.CheckTriplex(row)) {
            return true;
        }
        if (TTT_ns.CheckTriplex(col)) {
            return true;
        }
    }
    if (TTT_ns.CheckTriplex(diag))
        return true;
    if (TTT_ns.CheckTriplex(xdiag))
        return true;

    if (draw == 0) {
        $("#gameover_popup").html("It's a draw!");
        TTT_ns.DisableUI();
        $("#gameover_popup").show();
        return false;
    }
    return false;
}
TTT_ns.CheckTriplex = function (str) {
    return (str == "XXX" || str == "OOO");
}
$(document).ready(function () {
    TTT_ns.GameTileAmount = $(".GameTile").size();
    TTT_ns.HideUI();

    $("#initialize_btn").click(TTT_ns.ShowUI);
    $("#reset_btn").click(TTT_ns.ResetUI);
    $("#game_field").on("click", ".GameTile", TTT_ns.Player_plays);
    $("#gameover_popup").click(TTT_ns.ResetUI);

});

