// the homepage elements
const homePageParagraph = document.getElementById("homePageParagraph");
const homePageHeading = document.getElementById("homePageHeading");
const homePageButton = document.getElementById("homePageButton");
var rulesCount = 0;

// function to change the homepage content to display the rules
function changeRule() {
    switch(rulesCount){
        //rule one
        case 0:
            homePageHeading.innerText = "How to Start the Game";
            homePageParagraph.innerText = `Decide the number of wickets.
            Begin with a toss. 
            The winner of the toss decides who does the batting at first.`
            homePageButton.innerText = "Next"
            break;

        //rule two
        case 1:
            homePageHeading.innerText = "Understanding how to represent numbers";
            homePageParagraph.innerText = `1 : Extend only your index finger
            2 : Show 'scissors'
            3 : Extend your middle, ring, and little fingers
            4 : Add your index finger to the three fingers
            5 : Show 'paper'
            6 : Clench your fist with your thumb extended
            'Stok': Throw a clenched fist<br>`
            homePageButton.innerText = "Next"
            break;
        
        //rule three
        case 2:
            homePageHeading.innerText = "Batting and Scoring";
            homePageParagraph.innerText = `In batting, both players throw hand signals simultaneously.
            Calculate the runs based on the numbers thrown.
            For example, if your friend throws a 6, and you throw a 4, you score 4 runs. If you throw a "stok" and your friend throws a 5, you get 5 runs.`
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
            break;

    }
    rulesCount++;
}

const gameH2 = document.getElementById('gameH2');
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const buttonDiv = document.getElementById('buttonDiv');

//function to decide the toss
function decideToss(){
        var randomNumber = Math.random();
        var result;
        if (randomNumber < 0.5) {
          result = 1;
        } 
        else {
          result = 2;
        }
        if(result == 1){
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
        else{
            randomNumber = Math.random();
            if (randomNumber < 0.5) {
                result = 2;
                gameH2.innerText = "You lost the toss and the computer chose Batting";
              } 
              else {
                result = 1;
                gameH2.innerText = "You lost the toss and the computer chose Balling";
              }
              var okButton = document.createElement('button');
              okButton.innerText = "OK";
              okButton.classList.add('button');
              choice1.remove();
              choice2.remove();
              buttonDiv.append(okButton);
              okButton.onclick = () =>{
                startGame(result);
              }
        }
}

function batting(){
    console.log("BATTING");
    gameH2.innerText = "It is your turn to Bat";
    startGame(1);
}

function balling(){
    console.log("BALLING");
    gameH2.innerText = "It is your turn to Ball";
    startGame(2);
}

function startGame(batOrBall){
    console.log("STARTGAME");
    
}

