// audio files
const clickAudio = new Audio("./audio/click.mp3");
const bgMusic = new Audio('./audio/bgMusic.mp3');
const child = new Audio('./audio/child.mp3');
const lostGame = new Audio('./audio/lostGame.mp3');
const lostToss = new Audio('./audio/lostToss.mp3');
const wonGame = new Audio('./audio/wonGame.mp3');
const wonToss = new Audio('./audio/wonToss.mp3');
const outAudio = new Audio('./audio/out.mp3');
const outAudio2 = new Audio('./audio/out2.mp3');
var musicPlaying = false;

// the homepage elements
const homePageParagraph = document.getElementById("homePageParagraph");
const homePageHeading = document.getElementById("homePageHeading");
const homePageButton = document.getElementById("homePageButton");
const startGameSectionH2 = document.querySelector("p.start-game-section-content");

// function to play music
function playMusic(){
    if(musicPlaying == true){
        musicPlaying = false;
        bgMusic.pause();
        document.getElementById('musicButton').style.textDecoration = "line-through";
    }
    else if (musicPlaying == false){
        musicPlaying = true;
        bgMusic.currentTime = 0;
        bgMusic.play();
        document.getElementById('musicButton').style.textDecoration = "none";
    }
}

var rulesCount = 0;
// function to change the homepage content to display the rules
function changeRule() {
    clickAudio.currentTime = 0;
    clickAudio.play();
    switch(rulesCount){
        //rule one
        case 0:
            homePageHeading.innerText = "How to Start the Game";
            homePageParagraph.innerText = `Begin with a toss. 
            The winner of the toss decides who does the batting at first.`
            homePageButton.innerText = "Next"
            break;

        //rule two
        case 1:
            homePageHeading.innerText = "Understanding how to represent numbers";
            homePageParagraph.innerText = `The number of fingers raised represents the number chosen.
            Six is represented by a closed fist.`
            homePageButton.innerText = "Next"
            break;
        
        //rule three
        case 2:
            homePageHeading.innerText = "Batting and Scoring";
            homePageParagraph.innerText = `In batting, both players throw hand signals, numbers in this case simultaneously.
            Calculate the runs based on the numbers thrown.
            For example, if computer throws a 6, and you throw a 4, you score 4 runs. If you throw a 1 and the computer throws a 5, computer gets 5 runs.`
            homePageButton.innerText = "Next"
            break;
        
        //rule four
        case 3:
            homePageHeading.innerText = "Wickets and Winning";
            homePageParagraph.innerText = `If both players throw out the same hand sign, the batter is out. 
            The bowler gets to bat and at the end, who has the highest runs wins.`
            var anchorTag = document.createElement('a');
            anchorTag.innerText = "START GAME";
            anchorTag.setAttribute('href','gamePage.html');
            homePageButton.innerText = "";
            homePageButton.append(anchorTag);
            startGameSectionH2.innerText = "Thats it!";
            break;
    }
    rulesCount++;
}

// gamePage elements
const gameH2 = document.getElementById('gameH2');
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const buttonDiv = document.getElementById('buttonDiv');
const numberDiv = document.getElementById("numberDiv");
const okDiv = document.getElementById("okDiv");
const okButton = document.getElementById("okButton");

//function to decide the toss
function decideToss(){
        buttonDiv.style.visibility = 'visible';
        var randomNumber = Math.random();
        var result;
        if (randomNumber < 0.5) {
            child.currentTime = 0;
            child.play();
            gameH2.innerText = "You Won the toss! Choose what you want";
            choice1.innerText = "Batting";
            choice2.innerText = "Balling";
            choice1.onclick = () =>{
                batting();
            }
            choice2.onclick = () =>{
                balling();
            }
        } 
        else {
            lostToss.currentTime = 0;
            lostToss.play();
            randomNumber = Math.random();
            if (randomNumber < 0.5) {
                result = 2;
                gameH2.innerText = "You lost the toss and the computer chose Batting";
            } 
            else {
                result = 1;
                gameH2.innerText = "You lost the toss and the computer chose Balling";
            }
            okDiv.style.visibility = 'visible';
            buttonDiv.style.visibility = 'hidden';
            okButton.onclick = () =>{
                okDiv.style.visibility = 'hidden';
                if(result == 1){
                    batting();
                }
                else if(result == 2){
                    balling();
                }
              }
        } 
}

// function to display that its out batting turn
function batting(){
    console.log("BATTING");
    gameH2.innerText = "It is your turn to Bat";
    document.getElementById('numberDiv').dataset.batOrBall = 'bat';
    startGame();
}

// function to display that its our balling turn
function balling(){
    console.log("BALLING");
    gameH2.innerText = "It is your turn to Ball";
    document.getElementById('numberDiv').dataset.batOrBall = 'ball';
    startGame();
}

// function to display the number buttons
function startGame(){
    numberDiv.style.visibility = "visible";
    buttonDiv.style.visibility = "hidden";
}

// score boards
const yourScoreBoard = document.getElementById('yourScore');
const computerScoreBoard = document.getElementById('computerScore');
const handImage = document.getElementsByClassName('hand-img');
var yourScore = 0;
var computerScore = 0;
var turn = 0;
var notOut = true;
var computerNotOut = true;

// function to update the score, onclick is used on number buttons
function updateScore(run){
    clickAudio.currentTime = 0;
    clickAudio.play();
    var batOrBall = document.getElementById('numberDiv').dataset.batOrBall;
    const possibleOutcomes = [1,2,3,4,5,6];
    var computerRun = possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)];

    handImage[0].setAttribute('src',`./images/l${run}.png`);
    handImage[1].setAttribute('src',`./images/r${computerRun}.png`);

    // to update our score during our batting
    if(batOrBall === 'bat'){
        if(notOut){
            // if its the second turn, update turn message
            if(turn == 1){
                gameH2.innerText = "It is your turn to Bat"
                if(computerScore == 0) {
                    endGame();
                }
            }

            // if out
            if(computerRun == run){
                // if out on first try, atleast update the score

                if(yourScore == 0){
                    yourScoreBoard.innerText = computerScore;
                }
                notOut = false;
                outAudio.currentTime = 0;
                outAudio.play();
                gameH2.innerText = "OUT!!";
                turn++;
                document.getElementById('numberDiv').dataset.batOrBall = 'ball';
                var parent = document.getElementById("buttonDiv");
                numberDiv.style.visibility = 'hidden';
                okDiv.style.visibility = 'visible';
                okButton.onclick = () =>{
                    if(turn == 1) gameH2.innerText = "It is your turn to Ball";
                    okDiv.style.visibility = 'hidden';
                    numberDiv.style.visibility = 'visible';
                }
            }

            // if not out 
            else{
                yourScore += run;
                yourScoreBoard.innerText = yourScore;
                if(turn == 1){
                    console.log('out');
                    if(computerScore < yourScore || computerScore == 0){
                        endGame();
                    }
                }
            }
        }
    }

    // to update computer's score during our balling
    else if(batOrBall === 'ball'){
        if(computerNotOut){
            // if its the second turn, update turn message
            if(turn == 1){
                gameH2.innerText = "It is your turn to Ball"
                if(yourScore == 0) {
                    endGame();
                }
            }

            // if out 
            if(computerRun == run){
                // if out on first try, atleast update the score
                if(computerScore == 0){
                    computerScoreBoard.innerText = computerScore;
                }
                computerNotOut = false;
                outAudio2.currentTime = 0;
                outAudio2.play();
                gameH2.innerText = "OUT!!";
                turn++;
                document.getElementById('numberDiv').dataset.batOrBall = 'bat';
                numberDiv.style.visibility = 'hidden';
                okDiv.style.visibility = 'visible';
                okButton.onclick = () =>{
                    if(turn == 1) gameH2.innerText = "It is your turn to Bat";
                    okDiv.style.visibility = 'hidden';
                    numberDiv.style.visibility = 'visible';
                }
            }

            // if not out
            else{
                computerScore += computerRun;
                computerScoreBoard.innerText = computerScore;
                if(turn == 1){
                    if(computerScore > yourScore || yourScore == 0){
                        endGame();
                    }
                }
            }   
        }
    }
    if(turn == 2){
        endGame();
    }

    // function to display results
    function endGame(){
        if(yourScore > computerScore){
            wonGame.currentTime = 0;
            wonGame.play();
            gameH2.innerText = "You Won!!!!";
        }
        else if(yourScore < computerScore){
            lostGame.currentTime = 0;
            lostGame.play();
            gameH2.innerText = "You Lost!!!!";

        }
        else if(yourScore == computerScore){
            lostGame.currentTime = 0;
            lostGame.play();
            gameH2.innerText = "Its a Draw!!!!";
        }
        // displaying newgame button
        console.log(okDiv);
        okDiv.style.visibility = 'visible';
        okButton.innerText = "NEW GAME";
        numberDiv.style.visibility = 'hidden';
        buttonDiv.style.visibility = 'hidden';

        // clicking starts new game
        okButton.onclick = () =>{
        newGame();
        }
    }
}


//function to start a new game
function newGame(){
    yourScore = 0;
    computerScore = 0;
    turn = 0;
    notOut = true;
    computerNotOut = true;
    okButton.innerText = "OK";
    choice1.innerText = "Heads";
    choice2.innerText = "Tails";
    yourScoreBoard.innerText = "Waiting Turn...";
    computerScoreBoard.innerText = "Waiting Turn...";
    gameH2.innerText = "New Game";
    okDiv.style.visibility='hidden';
    buttonDiv.style.visibility = 'visible';
    handImage[0].setAttribute('src',`./images/l0.png`);
    handImage[1].setAttribute('src',`./images/r0.png`);
    choice1.onclick = () =>{
        decideToss();
    }
    choice1.onclick = () =>{
        decideToss();
    }
}

