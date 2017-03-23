function inheritPrototype(childObject, parentObject) {
	var copyOfParent = Object.create(parentObject.prototype);
	copyOfParent.constructor = childObject;
	childObject.prototype = copyOfParent;
}

function Question(theQuestion, theChoices, theCorrectAnswer) {
	this.question = theQuestion;
	this.choices = theChoices;
	this.correctAnswer = theCorrectAnswer;
	this.userAnswer = "";

	var newDate = new Date(),
		QUIZ_CREATED_DATE = newDate.toLocaleDateString();

	this.getQuizDate = function() {
		return QUIZ_CREATED_DATE;
	};

	console.log("Quiz Created On: " + this.getQuizDate());
}

Question.prototype.getCorrectAnswer = function() {
	return this.correctAnswer;
};

Question.prototype.getUserAnswer = function() {
	return this.userAnswer;
};

Question.prototype.displayQuestion = function() {
	var questionToDisplay = "<div class='question'>" + this.question + "</div><ul>";
	choiceCounter = 0;

	this.choices.forEach(function(eachChoice) {
		questionToDisplay += '<li><input type="radio" name="choice" value="' + choiceCounter + '">' + eachChoice + '</li>';
		choiceCounter++;
	});

	questionToDisplay += "</ul>";

	console.log(questionToDisplay);
}

function MultipleChoiceQuestion(theQuestion, theChoices, theCorrectAnswer) {
	Question.call(this,theQuestion, theChoices, theCorrectAnswer);
}

inheritPrototype(MultipleChoiceQuestion,Question);

function DragDropQuestion(theQuestion, theChoices, theCorrectAnswer) {
	Question.call(this,theQuestion,theChoices,theCorrectAnswer);
}

inheritPrototype(DragDropQuestion,Question);

DragDropQuestion.prototype.displayQuestion = function() {
	console.log(this.question);
};

var allQuestions = [
new MultipleChoiceQuestion("who is Prime Minister of England?",["Obama","Blair","Brown"]),
new MultipleChoiceQuestion("what is the Capital of Brazil?",["Sao Paulo","Rio de Janeiro"]),
new DragDropQuestion("Drag the correct City to the world map",["Washington, DC","Rio de Janeiro"])
];

allQuestions.forEach(function(eachQuestion) {
	eachQuestion.displayQuestion();
})