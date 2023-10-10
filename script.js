// the homepage elements
const homePageParagraph = document.getElementById("homePageParagraph");
const  homePageHeading = document.getElementById("homePageHeading");
const homePageButton = document.getElementById("homePageButton");
var rulesCount = 0;

// function to change the homepage content to display the rules
homePageButton.onclick = () => {
    switch(rulesCount){
        //rule one
        case 0:
            homePageHeading.innerText = "How to Start the Game";
            homePageParagraph.innerHTML = "Decide the number of wickets. <br> Begin with a toss. <br>The winner of the toss decides who does the batting at first."
            homePageButton.innerText = "Next"
            break;

        //rule two
        case 1:
            homePageHeading.innerText = "Understanding how to represent numbers";
            homePageParagraph.innerHTML = `1 : Extend only your index finger
            <br>
            2 : Show 'scissors'
            <br>
            3 : Extend your middle, ring, and little fingers
            <br>
            4 : Add your index finger to the three fingers
            <br>
            5 : Show 'paper'
            <br>
            6 : Clench your fist with your thumb extended
            <br>
            'Stok': Throw a clenched fist<br>`
            homePageButton.innerText = "Next"
            break;
        
        //rule three
        case 2:
            homePageHeading.innerText = "Batting and Scoring";
            homePageParagraph.innerHTML = `In batting, both players throw hand signals simultaneously.
            <br>
            Calculate the runs based on the numbers thrown.
            <br>
            For example, if your friend throws a 6, and you throw a 4, you score 4 runs. If you throw a "stok" and your friend throws a 5, you get 5 runs.`
            homePageButton.innerText = "Next"
            break;
        
        //rule four
        case 3:
            homePageHeading.innerText = "Wickets and Winning";
            homePageParagraph.innerHTML = `If both players throw out the same hand sign, the batter is out. 
            <br>
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

//function to decide the toss
const gameH2 = document.getElementById('gameH2');
function decideToss(choice){
        const randomNumber = Math.random();
        var tossResult;
        if (randomNumber < 0.5) {
          tossResult = 1;
        } else {
          tossResult = 2;
        }
        if(tossResult == 1){
            gameH2.innerText = "You Won the toss! Choose what you want"
        }
        else{
            gameH2.innerText = "You lost the toss"
        }
}