# TriviaGame
## Here we have a nifty js framework for a trivia game. It reads from an array of options with question data (see below).
* The correct answer in a separate property from incorrect answers ("a")
* Incorrect answers are stored as an array in a separate property ("wrongs")
* When a question is selected by the game, a copy of the object is stored as a property in the game object
* "a" is pushed into the "wrongs" array in the game object copy of the question and the array is shuffled, so answers do not appear in the same location every time
* Within the "wrongs" array we can still be distinguished the correct answer from others by referencing "a"
* It doesn't matter whether the length of the "wrongs" array is 1 - 100, the behavior will work consistently
* Note the "key" property is not currently in use, but theoretically it could be used to categorize questions ("tags" might be a better name for the property).
```
var questionsAndAnswers = [
  q1 = {
    key: "1",
    q: "who suffered worst at the hands of togers?",
    a: "ernie",
    wrongs: [
      "bimp",
      "bramp",
      "Toger",
      "glen"
    ]
  },
  
  ... and so on ...
  
  ]
```

## Key Params
* numberOfQuestions (5 by default) - determines the number of questions per game
* numberOfSeconds (10 by default) - determines how many seconds the user has to answer a questions. Where the specified number runs out, the user is taken to the next question. This behavior is analogous to the "Next" or "Skip" button which players can use when they do not want to answer a question (nor wait for the timer on that question to expire)

## Other nifty stuff
* Questions are removed from the game's array of questions after they are presented, so the user is not presented duplicate questions 
* A "Review Page" prints questions as they were displays to the user, and displays responses in various styles which indicate...
** the correct answer (whether or not the user selected it)
** the user's correct answer
** the user's incorrect answer
** incorrect responses
