$(document).ready(function () {

    DisableUI();
    var GameTileAmount = $(".GameTile").size();

    //I have isolated both logics to their respective functions but I still don't quite follow why, since these controls are only supposed to be disabled and enabled a single time, on startup;


    $("#initialize_btn").click(EnableUI);
    $("#reset_btn").click(ResetUI);
    $("#game_field").on("click", ".GameTile", Player_plays);

    function EnableUI() {
        $("#reset_btn").removeAttr('disabled');
        $(".GameTile").removeAttr('disabled');
        $("#game_log").removeAttr('disabled');
    }
    function DisableUI() {
        $("#reset_btn").attr("disabled", "disabled");
        $(".GameTile").attr("disabled", "disabled");
        $("#game_log").attr("disabled", "disabled");
    }
    function ResetUI() {
        $(".GameTile").empty();
        if (Math.round(Math.random()) == 0) {
            $("#game_log").html("The field has been reset for a new game. AI goes first.<br />");
            AI_plays();
        }
        else {
            $("#game_log").html("The field has been reset for a new game. Player goes first.<br />");
        }
    }

    function Player_plays() {
        if (this.textContent === "") {
            this.textContent = "X";
            $("#game_log").html($("#game_log").html() + "Player marks the tile № " + this.id + "<br />");
            if (CheckForVictory()) {
                $("#game_log").html($("#game_log").html() + "Player wins the game!" + '<br />');
                alert("You have won!");
                ResetUI();
            }
            else
                AI_plays();
        }
    }
    function AI_plays() {
        var marked = false;
        while (!marked) {
            var rnd = Math.floor((Math.random() * GameTileAmount) + 1); //Generating a random number between 1 and the amount of tiles on the field.
            if ($("#" + rnd).text() == "") {
                $("#" + rnd).text("O");
                marked = true;
                $("#game_log").html($("#game_log").html() + "AI marks the tile № " + rnd + '<br />');
            }
        }
        if (CheckForVictory()) {
            $("#game_log").html($("#game_log").html() + "AI wins the game!" + '<br />');
            alert("AI has won!");
            ResetUI();
        }
    }
    function CheckForVictory() {

        var draw = 0;//"draw" is a counter representing the current number of vacant spaces on the gamefield, if the victory conditions aren't met by the time it reaches 1, a draw is called.
        var size = Math.sqrt(GameTileAmount);
        //Populating a 2D array representing the game field with its current state to simplify checking for victory conditions
        var fieldModel = new Array(size);
        for (i = 0; i < size; i++) {
            fieldModel[i] = new Array(size);
            for (j = 0; j < size; j++) {
                fieldModel[i][j] = $("#" + (size * i + j + 1)).text();
                if ($("#" + (size * i + j + 1)).text() == "") {
                    draw++;
                }
            }
        }

        //The following loop will check the crossing row and column for each field size index value and both diagonals in the end, until the victory condition is satisfied.
        var diag = "";
        var xdiag = "";
        for (i = 0; i < size; i++) {
            var col = "";
            var row = "";
            for (j = 0; j < size; j++) {
                col += fieldModel[j][i];
                row += fieldModel[i][j];
                if (i == j)
                    diag += fieldModel[i][j];
                if (i + j == size - 1)
                    xdiag += fieldModel[i][j];
            }
            if (CheckTriplex(row)) {
                return true;
            }
            if (CheckTriplex(col)) {
                return true;
            }
        }
        if (CheckTriplex(diag))
            return true;
        if (CheckTriplex(xdiag))
            return true;

        if (draw == 0) {
            alert("It's a draw!");
            ResetUI();
            return false;
        }
        return false;
    }
    function CheckTriplex(str) {
        return (str == "XXX" || str == "OOO");
    }
});