

$(document).ready(function () {
    var options = [

  //question-choices- === answer
    {
      question: "The Dodgers moved to Los Angeles to play in the 1958 season. Where were they located before?",
      choice: ["Oakland", "Anahiem", "Brooklyn", "Newyork"],
			answer: 2,
			photo: "https://www.riseupeight.org/wp-content/uploads/2016/06/fall-down-seven-times-rise-up-eight-Brooklyn-Dodgers.jpg"
    },

    { 
      question: "When right fielder, Shawn Green, broke the Dodgers franchise record, in 2001, for most homeruns in a season, whose record did he beat?",
      choice: ["Ron Cey", "Matt Kemp", "Tommy Lasorda", "Gary Sheifield"],
			answer: 3,
			photo: "http://a.espncdn.com/photo/2012/0330/la_greatest_dodgers_46.jpg"

    },

    {
      question: "Dodger Stadium is located in which Los Angeles park?",
      choice: ["Elysian Park", "Central Park", "Echo Park", "Candlestick Park"],
			answer: 0,
			photo: "https://greatruns.com/wp-content/uploads/2016/11/Elysian-Park-Dodger-Stadium-screenshot.png"
    },

    {
      question: "Which former Red Sox player wore the number 99 for the Dodgers in 2009?",
      choice: ["Adrian Gonzales", "Hanley Ramirez", "Manny Ramirez", "Dave Roberts"],
			answer: 2,
			photo: "http://images2.fanpop.com/image/photos/13200000/Manny-Ramirez-los-angeles-dodgers-13284031-600-399.jpg"
    },

    {
      question: "Which team is NOT in the Dodgers Division?",
      choice: ["Padres", "Giants", "Diamonbacks", "Cubs"],
			answer: 3,
			photo: "https://www.latimes.com/resizer/kNE0qy3FCiLY88rVcms37dTWRDk=/1200x0/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/E6JFH3J645DJ7PHWRTQVXPB5ZM.jpg"
    }];
  


//var names


var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}





//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];


		//iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Results: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})
 
 
 