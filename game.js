gamePattern=[];
var started=false;
var level=0;
var currLevel=0;
buttonColours=["red", "blue", "green", "yellow"];
userClickedPattern=[];
function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level+=1;
    $("h1").html("Level "+level);
}

$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
playSound(userChosenColour);    
animatePress(userChosenColour);
checkAnswer(currLevel);
if(started!==false){
currLevel+=1;
if(currLevel===level){
    currLevel=0;
    userClickedPattern=[];
    setTimeout(nextSequence,1000);
}
}})

function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
      }, 100);
}

$(document).on("keypress",function(e){
    if(started===false){
        started=true;
        nextSequence();
    }
})
function checkAnswer(currentLevel){
if(userClickedPattern[currLevel]===gamePattern[currLevel]){
    console.log("success");
}
else {
    var audio=new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").html("Game Over, Press Any Key to Restart")
    startOver();
}
}
function startOver(){
level=0;
gamePattern=[];
started=false;
currLevel=0;
userClickedPattern=[];
}