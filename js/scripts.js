function opponent(userName) {
    this.userName = userName;
    this.point = 0;

}

function Turn(opponent) {
    this.total = 0;
    this.randNumber = 0;
    this.opponent = opponent;
};

Turn.prototype.diceRoller = function(opponent1, opponent2) {
    var randNumber = Math.floor(Math.random() * 6) + 1;
    this.total += randNumber;

    if (randNumber == 1) {
        this.total = 0;
        this.endTurn(opponent1, opponent2);

        return randNumber;
    } else {
        this.randNumber += randNumber;
        return randNumber;
    };
};

Turn.prototype.endTurn = function(opponent1, opponent2) {
    this.opponent.point += this.total;
    this.total = 0;
    this.randNumber = 0;
    if (this.opponent == opponent1) {
        this.opponent = opponent2;
        $("#opponent2").toggleClass("active");
        $("#opponent1").toggleClass("active");
    } else if (this.opponent == opponent2) {
        this.opponent = opponent1;
        $("#opponent2").toggleClass("active");
        $("#opponent1").toggleClass("active");
    };
};
$(document).ready(function() {
    var opponent1 = new opponent("Opponent 1");
    var opponent2 = new opponent("Opponent 2");


    var currentTurn = new Turn(opponent1);

    var total = currentTurn.total;

    //Prints initial Turn Total of 0
    $("#roll-total").text(total);

    //Prints initial player scores of 0
    $('#opponent1-point').text(opponent1.point);
    $('#opponent2-point').text(opponent2.point);

    //Prints current Player
    $('#current_opponent').text(currentTurn.opponent.userName);

    //This code runs when you click the Roll button
    $("form#roller").submit(function(event) {
        event.preventDefault();

        //Creates a dice roll number
        var result = currentTurn.diceRoller(opponent1, opponent2);

        //Prints the roll number to the page
        $('#roll').text(result);

        //Prints the roll total to the page
        $('#roll-total').text(currentTurn.total);

        //Determines the winner and prints player score to page
        if ((currentTurn.total + currentTurn.opponent.point) >= 50) {
            if (currentTurn.opponent == opponent1) {
                $('#opponent1-point').text(currentTurn.total + currentTurn.opponent.point);
                alert("You won!");
            } else if (currentTurn.opponent == opponent2) {
                $('#opponent2-point').text(currentTurn.total + currentTurn.opponent.point)
                alert("You won!");
            };
        };
    });

    //This code runs when you click the End Turn button
    $("form#end-turn").submit(function(event) {
        event.preventDefault();

        currentTurn.endTurn(opponent1, opponent2);

        //Prints current Player
        $('#current_opponent').text(currentTurn.opponent.userName);

        //Prints players scores
        $('#opponent1-point').text(opponent1.point);
        $('#opponent2-point').text(opponent2.point);

        //Prints the cleared Current Roll and Turn Total on page
        $('#roll').text(currentTurn.randNumber);
        $('#roll-total').text(currentTurn.total);
    });
});
