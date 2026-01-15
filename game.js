//var name = prompt("May I know your name???");
let score = 0;

var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var colorsArray = ["red", "blue", "green", "yellow"];



//computer creating the next step
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h2").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = colorsArray[randomNumber];
  gamePattern.push(randomChosenColor);

  //animation

  $("#" + randomChosenColor)
    .fadeOut(200)
    .fadeIn(200);

  //audio
  playSound(randomChosenColor);
}





// when clicked

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  console.log(userClickedPattern);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  //to check the last answer

  checkAnswer(userClickedPattern.length - 1);
});





function playSound(chosenColor) {
  var audio = new Audio("sounds/" + chosenColor + ".mp3");
  audio.play();
}




function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}



//starting the game
var started = false;

$(document).keydown(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});




function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // correct so far
    

    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      score++;
      setTimeout(function () {
        nextSequence();
      }, 1000);
      ;
    }

    
    $("#score").text("Score: " + score);

  } else {
    console.log("wrong");



    $("h2").text("Game Over, Press Any Key to Restart");
    playSound("wrong"); // add wrong.mp3 in sounds folder

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h2").text("Game Over, Press Any Key to Restart");

    gameOver();
    startOver();
    
   
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//using localStorage so that the high score doesnt change while refreshing

let highScore = localStorage.getItem("highScore") || 0;

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }
  document.getElementById("highScore").innerText = "High Score: " + highScore;
}




function gameOver() {
  updateHighScore();
  score = 0;
  document.getElementById("score").innerText = "Score: " + score;
}