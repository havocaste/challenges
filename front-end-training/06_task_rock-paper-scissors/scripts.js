let opponentChoice = ["rock", "paper", "scissors"];
let convOpponentChoice = opponentChoice[Math.floor(Math.random() * 3)];
let userScore = 0;
let opponentScore = 0;

/*

let opponentChoice = Math.floor(Math.random() * 3);
let convOpponentChoice = null;

if (
    opponentChoice === 0) {
    convOpponentChoice = "rock";
} else if (
    opponentChoice === 1) {
    convOpponentChoice = "paper";
} else {
    convOpponentChoice = "scissors";
}

*/

for (let i=0; i < 5; i++) {

    let userChoice = prompt("Make your choice", "rock, paper or scissors");
    let convUserChoice = userChoice[0].toLowerCase();

    console.log("You have chosen " + userChoice + ".")
    console.log(`Your opponent chose ${convOpponentChoice}.`);

    if (
        convUserChoice === "r" && convOpponentChoice === "rock" ||
        convUserChoice === "p" && convOpponentChoice === "paper" ||
        convUserChoice === "s" && convOpponentChoice === "scissors") {
        console.log("This is a draw.");
    } else if (
        convUserChoice === "r" && convOpponentChoice === "scissors" ||
        convUserChoice === "p" && convOpponentChoice === "rock" ||
        convUserChoice === "s" && convOpponentChoice === "paper") {
        console.log("You have won.");
        opponentScore++;
    } else {
        console.log("You have lost.");
        userScore++;
    }
}
    console.log("Your score: " + userScore)
    console.log(`Opponent score: ${opponentScore}`)


