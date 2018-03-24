var qna = [
  q1 = {
    key: "1",
    q: "who suffered worst at the hands of togers?",
    a: "ernie",
    wrongs: [
      "bimp",
      "bramp",
      "Toger"
    ]
  },
  q2 = {
    key: "2",
    q: "who took care of bimp after his injury in Iowa?",
    a: "Toger",
    wrongs: [
      "bramp",
      "lort",
      "big den"
    ]
  },
  q3 = {
    key: "3",
    q: "who started a movement after getting dunked on?",
    a: "bruise",
    wrongs: [
      "glen",
      "chief",
      "bimp"
    ]
  }
]

var numberQuestions = 5;

var game = {
  numQs: '',
  qna: [],
  time: 5,
  t: '',
  intervalId: '',
  new: function () {
    //copy in dictionary vars
    this.t='';
    this.qna = qna;
    this.numQs = numberQuestions;

    //drop in welcome screent
    this.bounceIn("#welcome-wrapper");
    $("body").on("click", "#start", function () {
      game.bounceOut("#welcome-wrapper");
      game.bounceIn("#question-wrapper");
      game.eval();
    });
  },
  startTheClock: function () {
    console.log("sttttttart",this);
    this.t = this.time + 1;
    this.intervalId = setInterval(game.ticktock, 1000);
  },
  ticktock: function () {
    if (game.t === 1) {
      $("#t").html("<h2>0</h2>");
      game.handle("skip");
    }
    game.t--;
    $("#t").html("<h2>" + game.t + "</h2>");
  },
  stopTheClock: function () {
    console.log("stooooooooop", this)
    clearInterval(this.intervalId);
  },
  eval: function () {
    this.stopTheClock();
    $("#a").text("");

    if (this.numQs > 0) {
      this.numQs--;
      this.loadQs();
      //game.handle(); // send with "dingdingding" var
    } else {
      console.log("sssssss",this);
      this.stopTheClock();
      this.bounceOut("#question-wrapper");
      setTimeout(function(){
        game.bounceIn("#results-wrapper");
        game.wait();
      })
      //gameover
    }
  },
  wait: function(){
    $("body").on("click", "#try-again", function(){
      game.bounceOut("#results-wrapper");
      //todo: cleanup needs to happen here
      
      game.new();
    })
  },
  loadQs: function () {
    var rnd = Math.floor(Math.random() * game.qna.length);
    var q = this.qna[rnd];

    // console.log("before shuffle");
    // console.log(q.wrongs);

    //send q to have answers shuffled
    game.shuffleAry(q);
    var html = `<h1>${q.q}</h1>`;
    $("#q").html(html);

    // console.log("after shuffle");
    // console.log(q.wrongs);

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

    game.writeResult(q);

    game.startTheClock();
    game.handle();
  },
  writeResult: function(q){
    var ques = $("<div class='container mx-auto review-q'>").text(q.q); 
    
    var answers = $("<div class='row review-q-ans-wrap'>");

    ques.append(answers);

    q.wrongs.forEach(answer => {
      var ans = $("<div class='btn'>")
      .text(answer);

      if (answer == q.a){
        ans.addClass("review-q-ans-correct");
      } else {
        ans.addClass("review-q-ans");
      }

      answers.append(ans);      
    })

    $("#results").append(ques);
  }
  ,
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
    }, 1000);
  },
  bounceOut: function (div) {
    $(div).removeClass("bounceInDown")
      .addClass("animated bounceOutUp");
    setTimeout(function () {
      $(div).removeClass("bounceOutUp")
      $(div).css("display", "none");

      if (div == "#results-wrapper"){
        $("#results").text(""); 
      }


    }, 1000);
  },
  handle: function (instruction) {

    if (instruction == "skip"){
      game.cleanupQ();
    }

    //correct answ
    $('[data-truthy="1"]').on("click", function () {
      selection = true;
      game.cleanupQ()
    })
    //incorrect ans
    $('[data-truthy="0"]').on("click", function () {
      console.log("wompwomp");
      selection = true;
      game.cleanupQ()
    })
    //next/skip
    $("#next").on("click", function () {
      console.log("clicked next");
      selection = true;
      game.cleanupQ()
    })
  },
  cleanupQ: function () {
    this.bounceOut("#question-wrapper");
    setTimeout(function () {
      $("#a").text("");
      game.bounceIn("#question-wrapper");
      game.eval();
    }, 500);
  },
}

// function test(){
//     var rnd = Math.floor(Math.random() * game.qna.length);
//     var q = qna[rnd];
//     q.wrongs.push(q.a);

//     console.log(q.wrongs);
//     //randomize so not always in same order
//     ///h/t stackoverflow how to do w ES6
//     for (var i = q.wrongs.length - 1; i > 0; i--) {
//       var j = Math.floor(Math.random() * (i+1));
//       console.log(i + " " + j);
//       [q.wrongs[i], q.wrongs[j]] = [q.wrongs[j], q.wrongs[i]];
//     }
//     console.log(q.wrongs);

//     q.wrongs = Array.from(new Set(q.wrongs));

//     console.log(q.wrongs);
// }

$(document).ready(function () {
  game.new();
  $("#test").on("click", function(){
    test();
  })
})