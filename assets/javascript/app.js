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
  q2 = {
    key: "2",
    q: "who took care of bimp after his injury in Iowa?",
    a: "Toger",
    wrongs: [
      "bramp",
      "lort",
      "big den",
      "priest",
      "bap"
    ]
  },
  q3 = {
    key: "3",
    q: "who started a movement after getting dunked on?",
    a: "bruise",
    wrongs: [
      "glen",
      "chief",
      "bimp",
      "chief",
      "lort"
    ]
  },
  q4 = {
    key: "4",
    q: "who isn't part of the trinity?",
    a: "cardinal",
    wrongs: [
      "priest",
      "bruise",
      "chief",
    ]
  },
  q5 = {
    key: "5",
    q: "whose ex-step-dad is ernie?",
    a: "big den",
    wrongs: [
      "glen",
      "bruise",
      "bimp",
      "bramp",
      "lort"
    ]
  },
  q6 = {
    key: "6",
    q: "which injury did lorraine not suffer?",
    a: "stabbing",
    wrongs: [
      "fire",
      "burial",
      "car accident"
    ]
  },
  q7 = {
    key: "7",
    q: "who envied priest for giving Toger communion?",
    a: "card",
    wrongs: [
      "bramp",
      "lort",
      "bimp"
    ]
  },
  q8 = {
    key: "8",
    q: "who secretly visited bramp at his engagement party?",
    a: "ernie",
    wrongs: [
      "glen",
      "bruise",
      "priest",
      "chief",
      "jane"
    ]
  },
  q9 = {
    key: "9",
    q: "whose burka fell off as bramp and toger drove past?",
    a: "glen",
    wrongs: [
      "big den",
      "jane",
      "lorraine",
      "lort",
      "a flapjack"
    ]
  },
  q10 = {
    key: "10",
    q: "who was known as &quot;the flapjack pimp&quot;?",
    a: "bimp",
    wrongs: [
      "big den",
      "bramp",
      "chief",
      "bruise",
      "whitey"
    ]
  },
  q11 = {
    key: "11",
    q: "who stabbed whitey?",
    a: "bap",
    wrongs: [
      "bruise",
      "chief",
      "one of bruise's girls",
      "a flapjack",
      "unknown",
      "whitey herself"
    ]
  },
  q12 = {
    key: "12",
    q: "what does the &quot;G&quot; in T.O.G.E.R. stand for?",
    a: "googly",
    wrongs: [
      "greater",
      "grand",
      "gregarious",
      "gargantuan",
      "gimpy",
      "garrulous"
    ]
  },
  q13 = {
    key: "13",
    q: "what is whitey's real name?",
    a: "whitney",
    wrongs: [
      "whitey",
      "james joseph",
      "jane",
      "flapjack",
      "big den"
    ]
  },
  q14 = {
    key: "14",
    q: "to whom as lorraine not made love?",
    a: "bimp",
    wrongs: [
      "bramp",
      "glen",
    ]
  },
  q15 = {
    key: "15",
    q: "where do toger's come from?",
    a: "iowa",
    wrongs: [
      "south america",
      "tanzania",
      "the american southwest",
      "the dakotas"
    ]
  },
  q16 = {
    key: "16",
    q: "who said, &quot;i'll be a tog' for 'rraine&quot;?",
    a: "bramp",
    wrongs: [
      "glen",
      "lort",
      "big den",
      "ernie"
    ]
  },
  q17 = {
    key: "17",
    q: "who wired the cameras in the basement of lort's workplace?",
    a: "big den",
    wrongs: [
      "paul friesen",
      "paul friesen's mom",
      "glen",
      "bramp",
      "bimp",
      "jane",
    ]
  },
  q18 = {
    key: "18",
    q: "who gave the orders to wire the cameras at lort's workplace?",
    a: "jane",
    wrongs: [
      "paul friesen",
      "paul friesen's mom",
      "glen",
      "bramp",
      "bimp",
      "big den"
    ]
  },
  q19 = {
    key: "19",
    q: "who gave the orders to wire the cameras at lort's workplace?",
    a: "jane",
    wrongs: [
      "paul friesen",
      "paul friesen's mom",
      "glen",
      "bramp",
      "bimp",
      "big den"
    ]
  },
  q19 = {
    key: "19",
    q: "fill in the blank: &quot;one pointed left; the other pointed __________&quot;?",
    a: "down",
    wrongs: [
      "right",
      "forward",
      "straight",
      "backward"
    ]
  },
  q20 = {
    key: "20",
    q: "what did the togers plan to turn bimp into?",
    a: "a streetlight",
    wrongs: [
      "a slave",
      "a toger",
      "a flapjack",
      "a leader",
      "an animal",
      "a scrumptious stew",
    ]
  },
]

// var colors = [
//   "#ECDB54",
//   "#E94B3C",
//   "#DBB1CD",
//   "#EC9787",
//   "#00A591",
//   "#BC70A4",
//   "#BFD641",
//   "#F6D155",
//   "#95DEE3",
//   "#EDCDC2",
//   "#F2552C",
//   "#D8AE47"
// ];

var numberOfQuestions = 5;
var numberOfSeconds = 10;

var score = document.getElementById("score");
var total = document.getElementById("total");

var game = {
  numQs: numberOfQuestions,
  score:0,
  qna: [],
  q:'',
  time: numberOfSeconds,
  t: '',
  intervalId: '',
  new: function () {
    //copy in dictionary vars
    this.t = '';
    this.qna = questionsAndAnswers.map(x => x);
    this.q = '';
    this.numQs = numberOfQuestions;
    this.score = 0;

    //drop in welcome screent
    this.bounceIn("#welcome-wrapper");
    $("body").on("click", "#start", function () {
      game.bounceOut("#welcome-wrapper");
      game.bounceIn("#question-wrapper");
      game.eval();
    });
  },
  startTheClock: function () {
    this.t = this.time + 1;
    this.intervalId = setInterval(game.ticktock, 1000);
  },
  ticktock: function () {
    if (game.t === 1) {
      $("#t").html("<h2>0</h2>");
      game.handle(game.q, "skip");
    }
    game.t--;
    $("#t").html("<h2>" + game.t + "</h2>");
  },
  stopTheClock: function () {
    clearInterval(this.intervalId);
  },
  eval: function () {
    this.stopTheClock();
    $("#a").text("");

    if (this.numQs > 0) {
      this.numQs--;
      this.loadQuestion();
    } else {
      this.bounceOut("#question-wrapper");
      setTimeout(function () {
        score.textContent=game.score;
        total.textContent=numberOfQuestions;
        game.bounceIn("#results-wrapper");
        game.wait();
      })
      //gameover
    }
  },
  //wait for click on review page
  wait: function () {
    $("body").unbind('click').on("click", "#try-again", function () {
      game.bounceOut("#results-wrapper");
      game.new();
    })
  },
  //load random q from dictionary ary
  loadQuestion: function () {
    var rnd = Math.floor(Math.random() * game.qna.length);
    var q = this.qna[rnd];

    //shuffle and draw answers
    game.shuffleAry(q);
    var html = `<h1>${q.q}</h1>`;
    $("#q").html(html);

    q.wrongs.forEach(answer => {
      var ans;
      if (answer == q.a) {
        ans = $(`<button data-truthy="1" class="btn btn-outline-primary" id="a">`);
      } else {
        ans = $(`<button data-truthy="0" class="btn btn-outline-primary" id="b">`)
          .data("truthy", "0");
      }
      ans.text(answer);
      $("#a").append(ans);
    });

    //set settled q to game var
    game.q = q;

    game.startTheClock();
    game.handle(q, "");
  },
  writeResult: function (q, selection) {
    var ques = $("<div class='container mx-auto review-q'>").text(q.q);

    var answers = $("<div class='row review-q-ans-wrap'>");

    ques.append(answers);

    q.wrongs.forEach(answer => {
      var ans = $("<div class='btn'>")
        .text(answer);

      if (answer == q.a) {
        if (answer == selection) {
          ans.addClass("correct-ans");
        } else {
          ans.addClass("review-q-ans-correct")
        }
      } else {
        if (answer == selection) {
          ans.addClass("incorrect-ans");
        } else {
          ans.addClass("review-q-ans");
        }
      }
      answers.append(ans);
    })
    $("#results").append(ques);

    game.removeQuestion(q);

  },
  //remove question from game ary so not asked >1x
  removeQuestion: function (q){
    if (this.qna.indexOf(q) > -1){
      var i = this.qna.indexOf(q);
      this.qna.splice(i,1);
    }
  },
  //randomize so not always in same order
  shuffleAry: function (q) {
    //push correct answer to wrongs
    q.wrongs.push(q.a);
    //shuffle
    for (var i = q.wrongs.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [q.wrongs[i], q.wrongs[j]] = [q.wrongs[j], q.wrongs[i]];
    }
    // previous loop duplicates... ?
    /// this deduplicates
    q.wrongs = Array.from(new Set(q.wrongs));
  },
  //new elements transition in
  bounceIn: function (div) {
    setTimeout(function () {
      $(div).addClass("animated bounceInDown")
        .css("display", "block")
    }, 600);

  },
  //new elements transition out
  bounceOut: function (div) {
    $(div).removeClass("bounceInDown")
      .addClass("animated bounceOutUp");
    setTimeout(function () {
      // var color = colors[Math.round(Math.random() * colors.length)];
      // $("body").css("background-color",color);
      $(div).removeClass("bounceOutUp")
      $(div).css("display", "none");

      //when out of sight, clear #results
      if (div == "#results-wrapper") {
        $("#results").text("");
      }
    }, 600);
  },
  //handle user input or timeout
  handle: function (q, instruction) {

    //if timer runs out
    if (instruction == "skip") {
      game.writeResult(q, "null");
      game.cleanupQ();
    }

    //correct answ
    $('[data-truthy="1"]').unbind('click').on("click", function () {
      var selection = this.textContent;
      game.writeResult(q, selection);
      //++ game level var
      game.score++;
      //move on
      game.cleanupQ()
    })

    //incorrect ans
    $('[data-truthy="0"]').unbind('click').on("click", function () {
      var selection = this.textContent;
      game.writeResult(q, selection)
      game.cleanupQ()
    })

    //next/skip
    $("#next").unbind('click').on("click", function () {
      game.writeResult(q, "null");
      game.cleanupQ();
    })
  },
  //clear q elements when out of sight
  cleanupQ: function () {
    this.bounceOut("#question-wrapper");
    setTimeout(function () {
      $("#a").text("");
      // var color = colors[Math.round(Math.random() * colors.length)];
      // $("body").css("background-color",color);
      game.bounceIn("#question-wrapper");
      game.eval();
    }, 600);
  },
}

$(document).ready(function () {
  game.new();
  $("#test").on("click", function () {
  })
})