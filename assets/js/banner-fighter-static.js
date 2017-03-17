// Simulate server side with static fixture
function FighterService() {
  this.params = function (param) {
    var results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.href);
    if (results!=null && results[1]) {
      return decodeURIComponent(results[1]);
    }
    return null;
  };

  this.getName = function () {
    return this.params("name");
  };

  this.getScore = function () {
    return this.params("score");
  };
}

angular.module('fighterApp', [])
  .service('FighterService', FighterService)
  .controller('GameController', function(FighterService) {
    var game = this;
    game.name = FighterService.getName();

  })
  .controller('ScoreController', function(FighterService) {
    var score = this;
    score.value = FighterService.getScore();

    score.name = FighterService.getName();

    score.aboveAvg = function () {
      return score.value >= 201;
    };

    score.sendScoreAndName = function ($event) {
      $event.target.href = $event.target.href + window.location.search;
    }

  })
  .controller('RankingController', function (FighterService) {
    var ranking = this;
    ranking.score = FighterService.getScore();
    ranking.name = FighterService.getName();
    ranking.contestants = [
      {name: "Eva", score: 329 },
      {name: "Laura", score: 290 },
      {name: "Ferran", score: 152 },
      {name: "Jake", score: 33 },
      {name: "Monica", score: 187 },
      {name: "Javi", score: 154 },
      {name: "Anna", score: 310 },
      {name: "Edu", score: 217 },
      {name: "Marc", score: 259 },
      {name: "Marta", score: 173 },
      {name: "Xavi", score: 198 },
      {name: "Claudia", score: 182 },
      {name: "Rod", score: 288 },
      {name: "Kim", score: 184 },
      {name: "Michele", score: 246 },
      {name: "Ivan", score: 197 },
      {name: "Miquel", score: 192 },
      {name: "Daniela", score: 321 },
      {name: "Cristina", score: 205 },
      {name: "Dani", score: 106 },
      {name: ranking.name, score: ranking.score}
    ];

    ranking.contestants.sort(function (a, b) {
      return b.score - a.score;
    });

    var myPosition = 0;
    ranking.contestants.forEach(function (contestant, index) {
      if (contestant.name == ranking.name && contestant.score == ranking.score) {
        myPosition = index + 1; // start with 1
      }
      contestant.position = index + 1;
    });

    if (myPosition == 1) { // first
      ranking.myRanking = ranking.contestants.slice(0, 5);
    } else if (ranking.contestants.length - myPosition  < 3 ) { // last three, we want to be in 2nd place when we can
      ranking.myRanking = ranking.contestants.slice(-5);
    } else {
      ranking.myRanking = [ranking.contestants[myPosition - 2]].concat(ranking.contestants.slice(myPosition - 1, myPosition + 3));
    }

  });