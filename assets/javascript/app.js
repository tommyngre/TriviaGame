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

    //just load qs right away for now
    this.load();
    ///later on will be an on/click -> start()
    //this.start();
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
    //send q to have answers shuffled
    this.shuffleAry(q);

    var html = `<h1>${q.q}</h1>`;
    $("#q").html(html);

    //don't love this...
    ///but for now correct ans will have id "a"
    q.wrongs.forEach(answer => {
      if (answer == q.a){
        var ans = $(`<div id="a">`);        
      } else {
        var ans = $(`<div id="b">`);        
      }
      ans.text(answer);
      console.log(ans);
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
  handle: function () {
    //define later
  }
}

$(document).ready(function () {
  game.new();
})