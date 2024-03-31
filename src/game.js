var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = -1;

$("body").keypress(function (event) {
  if (level === -1) {
    level = 0;
    nextSequence();
  }
});
$("body").click(function (event) {
  if (level === -1) {
    level = 0;
    nextSequence();
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

  playSound(userChosenColor);
});

function nextSequence() {
  level++;
  $("#level-title").text(`Level ${level}`);

  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeOut().fadeIn();
  playSound(randomChosenColor);
}

function playSound(name) {
  var sound = new Audio(`./sounds/${name}.mp3`);
  sound.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text(`Game Over, Press any Key or Tap to Restart`);
    startOver();
  }
}

function startOver() {
  level = -1;
  gamePattern = [];
  userClickedPattern = [];
}
