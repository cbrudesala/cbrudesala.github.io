class Slide {
  constructor(ctr1, ctr2) {
    this.ctr1 = ctr1;
    this.ctr2 = ctr2;
  }

  winner() {
    if(this.ctr1 > this.ctr2) {
      return this.ctr1
    } else {
      return this.ctr2
    }
  }

  loser() {
    if(this.ctr1 > this.ctr2) {
      return this.ctr2
    } else {
      return this.ctr1
    }
  }
  selectedOptionCtr(sel){
    if (sel == "A") {
      return this.ctr1
    } else {
      return this.ctr2
    }
  }
  winnerOption() {
    if (this.winner() == this.ctr1) {
      return "A";
    } else {
      return "B";
    }
  }
  loserOption() {
    return (this.winnerOption() == "A") ? "B"
                                        : "A";
  }

  diff(select) {
    if (select == this.winnerOption()){
      return ((this.winner() - this.loser())*100/this.loser()).toFixed(0);
    } else {
      return ((this.loser() - this.winner())*100/this.winner()).toFixed(0);
    }
  }

}

var slides = [
  new Slide(0.82 , 0.74),
  new Slide(1.32 , 0.91),
  new Slide(0.39 , 0.62),
  new Slide(1.12 , 1.36),
  new Slide(1.53 , 1.09),
  new Slide(1.11 , 1.27),
  new Slide(0.62 , 0.23),
  new Slide(1.24 , 1.16),
  new Slide(1.53 , 1.27),
  new Slide(0.98 , 0.89),
];

//ALL SCORES
var current = 1;
var score = 0;
var clicked = false;
var tiempoRestanteAcumulado = 0;

$(".next").click( function() {
  currentTime = 20;
  countdown();
  $(".active").removeClass("active");
  $(".ctr").removeClass("ctr-ok");
  $(".ctr").removeClass("ctr-ko");
  $(".circle").removeClass("ok");
  $(".circle").removeClass("ko");
  // decrease one
  current++;
  $(".slider" + current).addClass("active");
  if (current < 11){
    $("#current-level").text(current);
  }
  //reset status from option A & B
  $("circle").removeClass("show");
  $(".ko").removeClass("show");
  $(".ok").removeClass("show");
  $(".ctr").removeClass("show");
  $(".next").removeClass("show");
  $("img").css("transition", "1s");
  $("img").css("opacity", "1");
  $("img").css("-webkit-filter", "grayscale(0)");
  $("img").css("filter", "grayscale(0)");

  $(".countdown").removeClass("blinker");
  $(".countdown").removeClass("red");
  clicked = false;



  if(current > slides.length){
    var correctAnswers = score;
    var finalScore = correctAnswers * 30 + (tiempoRestanteAcumulado/1.5);
    $("#final-score").val(finalScore.toFixed(0));
    $("#name-score").val($.params('name'));
    $("#score-form").submit();
  }

});



$(".optionA").click( function() {
  if (clicked) {
    return;
  }
  highlightSelected("A");
});

$(".optionB").click( function() {
  if (clicked) {
    return;
  }
  highlightSelected("B");

});




// countdown
var timer
var currentTime = 20;
var countdown = function(){
    // Step 1. What element do we want to animate?
  var countdown = document.getElementById("countdown");
  // Step 2. What function will change it each time?
  var countItDown = function() {
    if (currentTime < 6) {
      $(".countdown").addClass("blinker");
    }
    if (currentTime > -1) {
       countdown.textContent = currentTime--;
    } else {
        window.clearInterval(timer);
        highlightSelected(slides[current-1].loserOption());
        $(".countdown").addClass("red");
        $(".countdown").removeClass("blinker");
    }
  };
  // Step 3: Call that on an interval
   timer = window.setInterval(countItDown, 1000);
};




// startdown
var timer3
var sizeAnimationTimer
var startdown = function(){
  // Step 1. What element do we want to animate?
    var startdown = document.getElementById("startdown");
    // Step 2. What function will change it each time?
    var currentTime = 6;
    var startItDown = function() {
      if (currentTime > 0) {

         startdown.textContent = currentTime--;
         var startDownSize = function() {
           $(".startdown").addClass("show");
           $(".startdown").css("transition", "0s");
           $(".startdown").css("font-size", "160");
           setTimeout(function() {
             $(".startdown").css("transition", "3s");
             $(".startdown").css("font-size", "0");
           },200);
        }
        if (sizeAnimationTimer == null){
          sizeAnimationTimer = window.setInterval(startDownSize, 1000);
        }


      } else {
          window.clearInterval(timer3);
          window.clearInterval(sizeAnimationTimer);

          $(".startdown").text("fight");

          setTimeout(function() {
            $(".battle-section").addClass("show");
            $(".startdown").text(" ");
            countdown();
          },1000);
      }
    };
    // Step 3: Call that on an interval
     timer3 = window.setInterval(startItDown, 1000);
  }
startdown();


var highlightSelected = function(selected) {
  var currentSlide = slides[current-1];

  var winner = currentSlide.winnerOption()
  var loser = currentSlide.loserOption();

  clicked = true;

  $(".option" + selected + " .ctr").text("CTR: " +  currentSlide.selectedOptionCtr(selected) + "%");
  var diff = currentSlide.diff(selected);

  $(".slider"+ current + " .option" + selected + " .ctr-diff").prepend(diff);
  $(".slider"+ current + " .text-ctrA").addClass("show");
  $(".slider"+ current + " .text-ctrB").addClass("show");
  $(".slider"+ current + " .ctrA").text(currentSlide.ctr1 + "%");
  $(".slider"+ current + " .ctrB").text(currentSlide.ctr2 + "%");
  $(".ctr" + winner).addClass("ctr-ok");
  $(".ctr" + loser).addClass("ctr-ko");
  $(".option" + winner + " img").css("transition", "1s");
  $(".option" + loser + " img").css("transition", "1s");
  $(".option" + loser + " img").css("opacity", "0.4");
  $(".option" + loser + " img").css("-webkit-filter", "grayscale(1)");
  $(".option" + loser + " img").css("filter", "grayscale(1)");
  $(".option" + selected + " .circle").addClass("show");
  $(".ctr").addClass("show");
  $(".next").addClass("show");
  $(".countdown").removeClass("blinker");
  if (selected == winner){
    $(".option" + selected + " .circle").addClass("ok");
    $(".barra-vidaB").css("transition", ".8s");
    var w = $(".barra-vidaB").width();
    var p = 100 * w / $(".barra-vidaB").offsetParent().width() + 5
    $(".barra-vidaB").width(p + "%");
    score++;
    $("#current-score").text(score);
    tiempoRestanteAcumulado += currentTime

  } else {
    $(".option" + selected + " .circle").addClass("ko");
    $(".barra-vidaA").css("transition", ".8s");
    var w = $(".barra-vidaA").width();
    var p = 100 * w / $(".barra-vidaA").offsetParent().width() + 5
    $(".barra-vidaA").width(p + "%");
  }

  window.clearInterval(timer);
}

// extra for static stuff
$.params = function(param){
  var results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.href);
  if (results!=null && results[1]) {
    return decodeURIComponent(results[1]);
  }
  return null;
};