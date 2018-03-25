# TriviaGame
## Here we have a nifty js framework for a trivia game. It reads from an array of options with question data. Each question looks something like this. Note the "key" property is not currently in use, but theoretically it could be used to categorize questions (in which case "tags" might be a better name for the property).

# Parameters
## numberOfQuestions - determines the number of questions per game
## numberOfSeconds - determines how many seconds the user has to answer a questions. Where the specified number runs out, the user is taken to the next question. This behavior is analogous to the "Next" or "Skip" button which players can use when they do not want to answer a question (nor wait for the timer on that question to expire)

# Other nifty stuff
## Questions are copied into the game object from a global array of question-objects
## Questions are removed from the game's array of questions after they are presented, so the user is not presented duplicate questions 
## Responses to questions are shuffled when a question is loaded. Therefore, responses to not appear in the same order every time. This prevents the user from memorizing the location of a response, as opposed to the response itself
## A "Review Page" prints questions as they were displays to the user, and displays responses in various styles which indicate...
### the correct answer (whether or not the user selected it)
### the user's correct answer
### the user's incorrect answer
### incorrect responses
