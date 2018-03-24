//remove q from game.qna after asked

var qna = [
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
    q: "whose ex-step-dad is ernie?",
    a: "bruise",
    wrongs: [
      "glen",
      "big den",
      "bimp",
      "bramp",
      "lort"
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
    a: "car accident",
    wrongs: [
      "fire",
      "burial",
      "gunshot",
      "stabbing"
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
    q: "who was known as 'the flapjack pimp'?",
    a: "bimp",
    wrongs: [
      "big den",
      "bramp",
      "chief",
      "bruise",
      "whitey"
    ]
  }
]

var numberQuestions = 5;

var score = document.getElementById("score");
var total = document.getElementById("total");

var game = {
  numQs: '',
  score:0,
  qna: [],
  q:'',
  time: 5,
  t: '',
  intervalId: '',
  new: function () {
    //copy in dictionary vars
    this.t = '';
    this.qna = qna;
    this.q = '';
    this.numQs = numberQuestions;
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
    console.log("stop");
    clearInterval(this.intervalId);
  },
  eval: function () {
    console.log("eval");
    this.stopTheClock();
    $("#a").text("");

    if (this.numQs > 0) {
      this.numQs--;
      this.loadQs();
    } else {
      this.bounceOut("#question-wrapper");
      setTimeout(function () {
        score.textContent=game.score;
        total.textContent=numberQuestions;
        game.bounceIn("#results-wrapper");
        game.wait();
      })
      //gameover
    }
  },
  wait: function () {
    $("body").on("click", "#try-again", function () {
      game.bounceOut("#results-wrapper");
      //cleanup here?

      game.new();
    })
  },
  loadQs: function () {
    //get a random q from dictionary ary
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
  },
  shuffleAry: function (q) {
    ///push q.a to q.wrongs
    q.wrongs.push(q.a);
    //randomize so not always in same order
    ///h/t stackoverflow how to do w ES6
    for (var i = q.wrongs.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [q.wrongs[i], q.wrongs[j]] = [q.wrongs[j], q.wrongs[i]];
    }

    // previous loop => duplicates for some reason
    /// this deduplicates
    q.wrongs = Array.from(new Set(q.wrongs));


  },
  bounceIn: function (div) {
    setTimeout(function () {
      $(div).addClass("animated bounceInDown")
        .css("display", "block")
    }, 600);
  },
  bounceOut: function (div) {
    $(div).removeClass("bounceInDown")
      .addClass("animated bounceOutUp");
    setTimeout(function () {
      $(div).removeClass("bounceOutUp")
      $(div).css("display", "none");

      if (div == "#results-wrapper") {
        $("#results").text("");
      }
    }, 600);
  },
  handle: function (q, instruction) {

    //if timer runs out
    if (instruction == "skip") {
      console.log("skip");
      game.writeResult(q, "null");
      game.cleanupQ();
    }

    //correct answ
    $('[data-truthy="1"]').on("click", function () {
      var selection = this.textContent;
      game.writeResult(q, selection);
      //++ game level var
      game.score++;
      //move on
      game.cleanupQ()
    })

    //incorrect ans
    $('[data-truthy="0"]').on("click", function () {
      var selection = this.textContent;
      game.writeResult(q, selection)
      game.cleanupQ()
    })

    //next/skip
    $("#next").unbind('click').on("click", function () {
      console.log("next");
      game.writeResult(q, "null");
      game.cleanupQ();
    })
  },
  cleanupQ: function () {
    console.log("cleanup");
    this.bounceOut("#question-wrapper");
    setTimeout(function () {
      $("#a").text("");
      game.bounceIn("#question-wrapper");
      game.eval();
    }, 600);
  },
}

// function test(){
// }

$(document).ready(function () {
  game.new();
  $("#test").on("click", function () {
    // test();
  })
})