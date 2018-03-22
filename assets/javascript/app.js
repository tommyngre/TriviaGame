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


var game = {
  numQs: 5,
  qna: [],
  time: 5,
  t: '',
  intervalId: '',
  new: function () {
    //copy in dictionary var
    game.qna = qna;

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
      game.stopTheClock();
      game.handle("skip");
    }
    game.t--;
    $("#t").html("<h2>" + game.t + "</h2>");
  },
  stopTheClock: function () {
    clearInterval(this.intervalId);
  },
  eval: function () {
    if (this.numQs > 0) {
      this.numQs--;
      this.loadQs();
      //game.handle(); // send with "dingdingding" var
    } else {
      this.stopTheClock();
      this.bounceOut("#question-wrapper");
      setTimeout(function(){
        game.bounceIn("#results-wrapper");
      })
      //gameover
    }
  },
  loadQs: function () {
    var rnd = Math.floor(Math.random() * game.qna.length);
    var q = this.qna[rnd];

    console.log("before shuffle");
    console.log(q.wrongs);

    //send q to have answers shuffled
    game.shuffleAry(q);
    var html = `<h1>${q.q}</h1>`;
    $("#q").html(html);

    console.log("after shuffle");
    console.log(q.wrongs);

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

    game.startTheClock();
    game.handle();
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
    }, 1000);
  },
  bounceOut: function (div) {
    $(div).removeClass("bounceInDown")
      .addClass("animated bounceOutUp");
    setTimeout(function () {
      $(div).removeClass("bounceOutUp")
      $(div).css("display", "none");
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
    game.stopTheClock();
    this.bounceOut("#question-wrapper");
    setTimeout(function () {
      $("#a").text("");
      game.bounceIn("#question-wrapper");
      game.eval();
    }, 500);
  },
}

function test(){
    var rnd = Math.floor(Math.random() * game.qna.length);
    var q = qna[rnd];
    q.wrongs.push(q.a);

    console.log(q.wrongs);
    //randomize so not always in same order
    ///h/t stackoverflow how to do w ES6
    for (var i = q.wrongs.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i+1));
      console.log(i + " " + j);
      [q.wrongs[i], q.wrongs[j]] = [q.wrongs[j], q.wrongs[i]];
    }
    console.log(q.wrongs);

    q.wrongs = Array.from(new Set(q.wrongs));

    console.log(q.wrongs);
}

$(document).ready(function () {
  game.new();
  $("#test").on("click", function(){
    test();
  })
})