const clickAudio = new Audio("./audio/click.mp3");
const bgMusic = new Audio('./audio/bgMusic.mp3');
const child = new Audio('./audio/child.mp3');
const lostGame = new Audio('./audio/lostGame.mp3');
const lostToss = new Audio('./audio/lostToss.mp3');
const wonGame = new Audio('./audio/wonGame.mp3');
const wonToss = new Audio('./audio/wonToss.mp3');
const outAudio = new Audio('./audio/out.mp3');
const outAudio2 = new Audio('./audio/out2.mp3');

bgMusic.play();
// the homepage elements
const homePageParagraph = document.getElementById("homePageParagraph");
const homePageHeading = document.getElementById("homePageHeading");
const homePageButton = document.getElementById("homePageButton");
const startGameSectionH2 = document.querySelector("p.start-game-section-content");

var rulesCount = 0;
function playMusic(){
    bgMusic.currentTime = 0;
    bgMusic.play();
}
function stop(){
    bgMusic.pause();
}
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

const gameH2 = document.getElementById('gameH2');
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const buttonDiv = document.getElementById('buttonDiv');
const numberDiv = document.getElementById("numberDiv");
var okButton = document.createElement('button');
okButton.innerText = "OK";
okButton.classList.add('button');
//function to decide the toss
function decideToss(){
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
            choice1.remove();
            choice2.remove();
            buttonDiv.append(okButton);
            console.log(okButton)
            console.log(result)
            okButton.onclick = () =>{
                if(result == 1){
                    batting();
                }
                else if(result == 2){
                    balling();
                }
              }
        } 
}

function batting(){
    console.log("BATTING");
    gameH2.innerText = "It is your turn to Bat";
    document.getElementById('numberDiv').dataset.batOrBall = 'bat';
    startGame();
}
 
function balling(){
    console.log("BALLING");
    gameH2.innerText = "It is your turn to Ball";
    document.getElementById('numberDiv').dataset.batOrBall = 'ball';
    startGame();
}

function startGame(){
    numberDiv.style.visibility = "visible";
    buttonDiv.style.visibility = "hidden";
}

const yourScoreBoard = document.getElementById('yourScore');
const computerScoreBoard = document.getElementById('computerScore');
const handImage = document.getElementsByClassName('hand-img');
var yourScore = 0;
var computerScore = 0;
var turn = 0;
var notOut = true;
var computerNotOut = true;

function updateScore(run){
    clickAudio.currentTime = 0;
    clickAudio.play();
    var batOrBall = document.getElementById('numberDiv').dataset.batOrBall;
    const possibleOutcomes = [1,2,3,4,5,6];
    var computerRun = possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)];

    handImage[0].setAttribute('src',`./images/l${run}.png`);
    handImage[1].setAttribute('src',`./images/r${computerRun}.png`);

    if(batOrBall === 'bat'){
        if(notOut){
            if(turn == 1){
                gameH2.innerText = "It is your turn to Bat"
                if(computerScore == 0) {
                    endGame();
                }
            }
            if(computerRun == run){
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
                while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
                }
                buttonDiv.append(okButton);
                numberDiv.style.visibility = 'hidden';
                buttonDiv.style.visibility = 'visible';
                okButton.onclick = () =>{
                    if(turn == 1) gameH2.innerText = "It is your turn to Ball";
                    buttonDiv.style.visibility = 'hidden';
                    numberDiv.style.visibility = 'visible';
                }
            }
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
    else if(batOrBall === 'ball'){
        if(computerNotOut){
            if(turn == 1){
                gameH2.innerText = "It is your turn to Ball"
                if(yourScore == 0) {
                    endGame();
                }
            }
            if(computerRun == run){
                if(computerScore == 0){
                    computerScoreBoard.innerText = computerScore;
                }
                computerNotOut = false;
                outAudio2.currentTime = 0;
                outAudio2.play();
                gameH2.innerText = "OUT!!";
                turn++;
                document.getElementById('numberDiv').dataset.batOrBall = 'bat';
                var parent = document.getElementById("buttonDiv");
                while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
                }
                buttonDiv.append(okButton);
                numberDiv.style.visibility = 'hidden';
                buttonDiv.style.visibility = 'visible';
                okButton.onclick = () =>{
                    if(turn == 1) gameH2.innerText = "It is your turn to Bat";
                    buttonDiv.style.visibility = 'hidden';
                    numberDiv.style.visibility = 'visible';
                }
            }
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
        var parent = document.getElementById("buttonDiv");
                while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
                }
                buttonDiv.append(okButton);
                okButton.innerText = "NEW GAME";
                numberDiv.style.visibility = 'hidden';
                buttonDiv.style.visibility = 'visible';
                okButton.onclick = () =>{
                    document.location.reload();
                }
    }
    balls++;
}

