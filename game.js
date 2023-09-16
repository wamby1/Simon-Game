
let buttoncolours=["red","blue","green","yellow"];
let gamePattern=[];
let userClickedPattern=[];
let gamestart=false;
let level=0;
let clickcount=0;


function playSound(name){
    var myaudio= new Audio("./sounds/"+ name +".mp3");
    //console.log(myaudio);
    myaudio.play();
}
function nextSequence(){
    console.log("game "+gamePattern);
    console.log("users "+userClickedPattern);
    
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColour=buttoncolours[randomNumber];
    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(300).fadeOut(300).fadeIn(300);
    gamePattern.push(randomChosenColour);
    level++;
    //level change
    $("#level-title").text("Level "+level);
    console.log("game "+gamePattern);
    
    //count initializieren
    clickcount=0;
    gamestart=true
    
}

$(".btn").click(function(){
    let userChosenColour=$(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    $("#"+userChosenColour).fadeIn(300).fadeOut(300).fadeIn(300);
    userClickedPattern.push(userChosenColour);
    if(checkAnswer(clickcount)){
        clickcount++;
        if(clickcount>=gamePattern.length){
            userClickedPattern.length=0;
            setTimeout(function(){
                nextSequence();
            },1000);
        }
        console.log("Success")
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");

        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        console.log("wrong");
    }
    //console.log("users "+userClickedPattern);

});



function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");

    },100);
}
//vor erster nextsequence
//if gamestart==false
$(document).keypress(function(){
    nextSequence();
});


function checkAnswer(currentLevel){
    return userClickedPattern[currentLevel]===gamePattern[currentLevel]
}
function startOver(){
    userClickedPattern.length=0;
    gamePattern.length=0;
    level=0;
    clickcount=0;
   // console.log(gamePattern.length,clickcount);

}






