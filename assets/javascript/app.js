var qna = [
  q1 = {
    key: "1",
    q: "who suffered worst at the hands of togers?'",
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
  time: 10,
  intervalId: '',
  new: function () {
    game.qna = qna;
    this.bounceIn("#welcome-wrapper");
    //just load qs right away for now
    $("body").on("click", "#start", function(){
      game.start();
      game.bounceOut("#welcome-wrapper");
      game.bounceIn("#question-wrapper");
    });
    ///later on will be an on/click -> start()
  },
  start: function () {
    game.intervalId = setInterval(game.ticktock, 1000);
    this.loadQs();
  },
  ticktock: function () {
    if (game.time === 1) {
      $("#t").html("<h2>0</h2>");
      game.stop();
    }
    game.time--;
    $("#t").html("<h2>" + game.time + "</h2>");
  },
  stop: function () {
    clearInterval(game.intervalId);
    this.evalNext();
    this.handle() // send with "womp" var
  },
  evalNext: function () {
    if (this.numQs > 1) {
      this.numQs--;
      game.loadQs();
      game.handle(); // send with "dingdingding" var
    } else {
      //gameover
    }
  },
  loadQs: function () {
    $("#t").html(`<h2>${game.time}</h2>`);
    var rnd = Math.floor(Math.random() * game.qna.length);
    var q = this.qna[rnd];
    //send q to have answers shuffled
    game.shuffleAry(q);

    var html = `<h1>${q.q}</h1>`;
    $("#q").html(html);

    //don't love this...
    ///but for now correct ans will have id "a"
    ///or maybe data() attr?
    q.wrongs.forEach(answer => {
      if (answer == q.a){
        var ans = $(`<div class="ans" id="a">`)
        .data("truthy",true);        
      } else {
        var ans = $(`<div class="ans" id="b">`)
        .data("truthy",false);        
      }
      ans.text(answer);
      $("#a").append(ans);
    });
  },
  shuffleAry: function (q) {
    ///push q.a to q.wrongs
    q.wrongs.push(q.a);
    //randomize so not always in same order
    ///h/t stackoverflow how to do w ES6
    for (let i = q.wrongs.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [q.wrongs[i], q.wrongs[j]] = [q.wrongs[j], q.wrongs[i]];
    }
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
  handle: function () {
    //define later
  }
}

$(document).ready(function () {
  game.new();
})