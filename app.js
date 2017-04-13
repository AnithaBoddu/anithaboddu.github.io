// Create initial state object

var state = {

 questions: [{
        	questionNumber: 1,
        	questionText: "What is the name of Stewie's first teddy bear?",
        	questionAnswers: ["Rupert" , "Sheldon", "Jonny", "Oscar"],
            correctAnswer: "0",
            correctAnswerText: "Rupert.",
        },
        {
        	questionNumber: 2,
        	questionText: "Where was Peter born?",
        	questionAnswers: ["Ireland" , "Mexico", "America", "Japan"],
            correctAnswer: "1",
            correctAnswerText: "Mexico.",
        },
        {
        	questionNumber: 3,
        	questionText: "Who did the voice for Meg Griffin?",
        	questionAnswers: ["Alex Borstein","Rachael MacFarlane","Mila Kunis","Lori Alan"],
            correctAnswer: "2",
            correctAnswerText: "Mila Kunis.",
        },	
        {
        	questionNumber: 4,
        	questionText: "What is the name of Peter's favorite bar?",
        	questionAnswers: ["The inebriated clam" , "The clam", "The stupid clam", "The drunken clam"],
            correctAnswer: "3",
            correctAnswerText: "The drunken clam.",
        },
        {
        	questionNumber: 5,
        	questionText: "What street do the Griffin's live on? ",
        	questionAnswers: ["Patriot Lane" , "Royal Road" ,"Spooner Street" ,"Edmund Boulevard"],
            correctAnswer: "2",
            correctAnswerText: "Spooner Street.",
        }
 ],

 score: 0,
 correctAnsMsg: "Correct!",
 wrongAnsMsg: "Wrong Answer!",
 counter: 0
};

// State manipulation functions

     //To ensure an answer's been chosen and we're evaluating the correct question/answer pair.
        function answerMatchesQuestion() {
            if (!($("input[type='radio'][name='answer']:checked").val())) {
                toastr.error("Please select an answer");
                return false;
            }    
            else if (state.counter === 0) {
               checkAnswer(state, 0);
               renderNextQuestion(); 
            }
            else if (state.counter === 4) {
               checkAnswer(state, 4);
               score = state.score; 
               renderFinalPage();
               resetCounter();
               resetScore();
            }
            else { 
                checkAnswer(state, state.counter);
                renderNextQuestion(); 
            }
        }

    //Is the answer choice correct?  
        function checkAnswer(state, index) {
            if ($("input[type='radio'][name='answer']:checked").val() === state.questions[index].correctAnswer) {
                showCorrectAnswerMessage();
                state.counter++;
                state.score++;
            }
            else {
                showIncorrectAnswerMessage();
                state.counter++;
            }
        }

    //Resets the counter
        function resetCounter() {
            state.counter = 0;
        }

    //Resets the score
        function resetScore() {
            state.score = 0;
        }

    

// // Render functions

    //Hides Start Page and Renders Question Page
        function advanceToQuizFromStartPage() {
            $('#div2').removeClass("hidden");
            $('#div1').addClass("hidden");
        }

    //Renders Question and Answers after advancing past Start Page
        function createQuizItems(state, index) {
        // Renders question text, player progress, and player score.
            $('.question').html(state.questions[index].questionText);
            $('.progress').html("Progress: " + state.questions[index].questionNumber + " of 5");
            $('.score').html("Score: " + state.score);

        // Renders answer choice text inside of form label elements.
            $('.first-answer').html(state.questions[index].questionAnswers[0]);
            $('.second-answer').html(state.questions[index].questionAnswers[1]);
            $('.third-answer').html(state.questions[index].questionAnswers[2]);
            $('.fourth-answer').html(state.questions[index].questionAnswers[3]);
        }
    
    //Renders Correct Answer Message
        function showCorrectAnswerMessage() {
            toastr.success(state.correctAnsMsg);
        }

    //Renders Incorrect Answer Message    
        function showIncorrectAnswerMessage() {
            toastr.error(state.wrongAnsMsg + " The answer was " + state.questions[state.counter].correctAnswerText);            
        }

    //Clears Radio Button and Renders Next Item Set
        function renderNextQuestion () {
            $('input').prop('checked', false);
            createQuizItems(state, state.counter);
        }

    //Renders Final Page with Score and Option to Start Over 
        function renderFinalPage(state, index) {
        // Renders Feedback page and Start Over Button, Hides Questions Form 
            $('#div3').removeClass("hidden");
            $('#div2').addClass("hidden");

        // Render Score on Feedback page. 
            $('.overall-score').html(" You correctly answered " + score + " of 5 questions!");
        }

    //Hides Final Page and Renders Question Page
        function advanceToBeginningFromEnd() {
            $('input').prop('checked', false);
            $('#div1').removeClass("hidden");
            $('#div3').addClass("hidden");
        }



// When start button is clicked.
$('#startButton').click(function(event) {
	event.preventDefault();
    advanceToQuizFromStartPage();
    createQuizItems(state, 0);
});

// When answer submit button is selected.
$('#submitButton').click(function(event) {
    event.preventDefault();
    answerMatchesQuestion(); 
});

// Restart button
$('.restart').click(function(event) {
    event.preventDefault();
    advanceToBeginningFromEnd();
});		

