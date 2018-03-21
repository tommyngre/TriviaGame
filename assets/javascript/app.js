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
      q: "who took care of bimp after his injury in Iowa",
      a: "Toger",
      wrongs: [
        "bramp",
        "lort",
        "big den"
      ]
    }
  ]


var game = {
  numQs: 10,
  qna: [],
  time: 5,
  intervalId: '',
  new: function () {
    game.qna = qna;
    this.start();
  },
  start: function () {
    game.intervalId = setInterval(game.ticktock, 1000);
    this.load();
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
      game.load();
      game.handle(); // send with "dingdingding" var
    } else {
      //gameover
    }
  },
  load: function () {
    var rnd = Math.floor(Math.random() * game.qna.length);
    var q = this.qna[rnd];
    console.log(q);
    console.log(q.q);    
    var html = `<h1>${q.q}</h1>`;
    $("#q").html(html);
    for (i=0; i<q.wrongs.length; i++){
      var ans = $("<div>");
      ans.textContent = q.wrongs[i];
      $("#a").append(ans);
    }
  },
  handle: function () {
    //define later
  }
}

$(document).ready(function () {
  game.new();
})