$(document).ready(function () {

    $("#reset_btn").attr("disabled", "disabled");
    $(".GameTile").attr("disabled", "disabled");
    $("#game_log").attr("disabled", "disabled");

    var game = new Array(9);

    $("#initialize_btn").click(function () {
        $("#reset_btn").removeAttr('disabled');
        $(".GameTile").removeAttr('disabled');
        $("#game_log").removeAttr('disabled');
    });

    $("#reset_btn").click(function () { Reset(); });
    function Reset() {
        $(".GameTile").empty();
        if (Math.round(Math.random()) == 0) {
            $("#log_text").text("The field has been reset for a new game. Player goes first.\n");
        }
        else {
            $("#log_text").text("The field has been reset for a new game. AI goes first.\n");
            AI_plays();
        }
    }
    $("#game_field").on("click", ".GameTile", function () {
        if (this.textContent === "") {
            this.textContent = "X";
            $("#log_text").innerHtml
            $("#log_text").text($("#log_text")[0].textContent  + "Player marks the tile № " + this.id + '\n');
            if (CheckForVictory()) {
                $("#log_text").text($("#log_text")[0].textContent + "Player wins the game!" + '\n');
                alert("You have won!");
                Reset();
            }
            AI_plays();
        }
    });
    function AI_plays() {
        var marked = false
        while (marked == false) {
            var rnd = Math.floor((Math.random() * 9) + 1);
            if (document.getElementById(rnd).textContent == "") {
                document.getElementById(rnd).textContent = "O";
                marked = true;
                $("#log_text").text($("#log_text")[0].textContent  + "AI marks the tile № " + rnd + '\n');
            }
        }
        if (CheckForVictory()) {
            $("#log_text").text($("#log_text")[0].textContent  + "AI wins the game!" + '\n');
            alert("AI has won!");
            Reset();
        }
    }
    function CheckForVictory() {
        var draw = 0;
        for (i = 1; i < 10; i++) {
            game[i] = document.getElementById(i).textContent;
            if (document.getElementById(i).textContent == "") {
                draw++;
            }
        }
        for (i = 1; i < 9; i += 3) {
            if (game[i] != "" && game[i] == game[i + 1] && game[i + 1] == game[i + 2])
                return true;
        }
        for (i = 1; i < 4; i++) {
            if (game[i] != "" && game[i] == game[i + 3] && game[i + 3] == game[i + 6])
                return true;
        }
        if (game[1] != "" && game[1] == game[5] && game[5] == game[9])
            return true;
        if (game[7] != "" && game[7] == game[5] && game[5] == game[3])
            return true;
        if (draw == 1 || draw == 0) {
            alert("It's a draw!");
            Reset();
            return false;
        }

        return false;
    }

});