var score = 0;
var currentQuestion = 0;
var spamLevel = 2;
var timeLeft = 45;
var timerInterval;

/* QUESTIONS */
var questions = [
  { q: "What is a warning sign in a contract?", a: ["Clear pricing", "Hidden fees", "Short contract"], c: 1 },
  { q: "Why is a low starting price risky?", a: ["It may increase later", "It is always fake", "It is free"], c: 0 },
  { q: "What does fixed price mean?", a: ["Stays the same", "Changes weekly", "Random cost"], c: 0 },
  { q: "Why is auto-renewal bad?", a: ["Locks you in again", "Makes it cheaper", "Ends contract"], c: 0 },
  { q: "What should you always check?", a: ["Logo", "Price only", "Fees and terms"], c: 2 },
  { q: "What is fair usage?", a: ["Unlimited use", "Limits may apply", "Free access"], c: 1 },
  { q: "Why should students read small print?", a: ["To find hidden costs", "To waste time", "To make bills bigger"], c: 0 },
  { q: "What can happen after a cheap intro offer?", a: ["The price may rise", "The contract ends", "Bills disappear"], c: 0 }
];

/* CLICKABLE SPAM LINKS */
var popupLinks = [
  { text: "Your account is at risk", url: "trap-account.html" },
  { text: "Payment failed", url: "trap-payment.html" },
  { text: "Contract renewal started", url: "trap-renewal.html" },
  { text: "Hidden fee added", url: "trap-fee.html" },
  { text: "Urgent billing issue", url: "trap-payment.html" },
  { text: "Account locked warning", url: "trap-account.html" },
  { text: "Compare energy deals", url: "https://www.uswitch.com/" },
  { text: "Compare broadband deals", url: "https://www.comparethemarket.com/broadband/" }
];

/* SPAM PNG IMAGES */
var spamImages = [
  "assets/spam 1.png",
  "assets/spam 2.png",
  "assets/spam 3.png",
  "assets/spam 4.png",
  "assets/spam 5.png"
];

var spamIds = [
  "spam1","spam2","spam3","spam4","spam5",
  "spam6","spam7","spam8","spam9","spam10"
];

/* HELPERS */
function randomNumber(max){
  return Math.floor(Math.random() * max);
}

/* QUESTIONS */
function showQuestion(){
  currentQuestion = randomNumber(questions.length);

  document.getElementById("question").innerHTML = questions[currentQuestion].q;
  document.getElementById("btn0").innerHTML = questions[currentQuestion].a[0];
  document.getElementById("btn1").innerHTML = questions[currentQuestion].a[1];
  document.getElementById("btn2").innerHTML = questions[currentQuestion].a[2];
}

/* WARNING GIFS */
function spawnWarnings() {
  const page = document.querySelector(".page");

  for (let i = 0; i < 20; i++) {
    const gif = document.createElement("img");
    gif.src = "assets/warning.gif";
    gif.classList.add("warningGif");

    gif.style.top = Math.random() * 90 + "%";
    gif.style.left = Math.random() * 90 + "%";
    gif.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;

    page.appendChild(gif);
  }
}

/* SPAM */
function hideAllSpam(){
  for(var i = 0; i < spamIds.length; i++){
    document.getElementById(spamIds[i]).style.display = "none";
  }
}


function placeSpamBox(box){
  var page = document.querySelector(".page");
  var pageRect = page.getBoundingClientRect();

  var boxWidth = 170;
  var boxHeight = 90;

  var maxX = pageRect.width - boxWidth;
  var maxY = pageRect.height - boxHeight;

  if(maxX < 1){ maxX = 1; }
  if(maxY < 1){ maxY = 1; }

  var x = randomNumber(maxX);
  var y = randomNumber(maxY);

  box.style.left = x + "px";
  box.style.top = y + "px";
}

function updateSpam(){
  hideAllSpam();

  var howMany = spamLevel;
  if(howMany > spamIds.length){
    howMany = spamIds.length;
  }

  for(var i = 0; i < howMany; i++){
    var box = document.getElementById(spamIds[i]);
    var popup = popupLinks[randomNumber(popupLinks.length)];
    var spamImage = spamImages[randomNumber(spamImages.length)];

    box.style.display = "block";

    box.innerHTML = `
      <img src="${spamImage}" class="spamImage">
    `;

    box.onclick = function(link){
      return function(){
        window.open(link, "_blank");
      };
    }(popup.url);

    placeSpamBox(box);
  }
}


function startTimer(){
  timerInterval = setInterval(function(){
    timeLeft--;
    document.getElementById("timer").innerHTML = timeLeft;

    if(timeLeft <= 10){
      document.getElementById("timer").style.color = "red";
    }

    if(timeLeft <= 0){
      clearInterval(timerInterval);
      window.location.href = "caught.html";
    }
  }, 1000);
}


function checkAnswer(choice){
  var feedback = document.getElementById("feedback");

  if(choice == questions[currentQuestion].c){
    score++;
    document.getElementById("score").innerHTML = score;
    feedback.innerHTML = "Correct";
    feedback.style.color = "green";
  } else {
    spamLevel++;
    timeLeft -= 5;

    if(timeLeft < 0){
      timeLeft = 0;
    }

    document.getElementById("timer").innerHTML = timeLeft;

    feedback.innerHTML = "Wrong - spam is increasing";
    feedback.style.color = "red";
  }

  if(score >= 8){
    clearInterval(timerInterval);
    feedback.innerHTML = "You escaped!";

    setTimeout(function(){
      window.location.href = "home.html";
    }, 2000);

  } else if(timeLeft <= 0){
    clearInterval(timerInterval);
    window.location.href = "caught.html";

  } else {
    updateSpam();
    setTimeout(showQuestion, 1000);
  }
}


window.onload = function(){
  showQuestion();
  updateSpam();
  spawnWarnings();
  startTimer();

  document.getElementById("btn0").onclick = function(){ checkAnswer(0); };
  document.getElementById("btn1").onclick = function(){ checkAnswer(1); };
  document.getElementById("btn2").onclick = function(){ checkAnswer(2); };

  setInterval(updateSpam, 1800);
};