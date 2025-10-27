console.log("script.js connected!");
const quiz = [
  {
    question: "What's your ideal weekend activity?",
    answers: [
      { text: "Exploring museums and nightlife", city: 1 },
      { text: "Relaxing on the beach", city: 2 },
      { text: "Hiking in the mountains", city: 3 },
      { text: "Visiting coffee shops and art galleries", city: 4 }
    ]
  },
  {
    question: "What kind of weather do you love?",
    answers: [
      { text: "Crisp fall days and snowy winters", city: 1 },
       { text: "Sunny and warm year-round", city: 2 },
      { text: "Cool and fresh mountain air", city: 3 },
      { text: "Foggy mornings and breezy afternoons", city: 4 }
    ]
  },
  {
    question: "What best describes your personality?",
    answers: [
      { text: "Ambitious and high-energy", city: 1 },
      { text: "Chill and easygoing", city: 2 },
      { text: "Balanced and outdoorsy", city: 3 },
      { text: "Creative and tech-savvy", city: 4 }
    ]
  },
  {
    question: "What job sounds most appealing?",
    answers: [
      { text: "Finance or media", city: 1 },
      { text: "Film or entertainment", city: 2 },
       { text: "Environmental science", city: 3 },
      { text: "Technology or design", city: 4 }
    ]
  },
  {
    question: "Pick your ideal view:",
     answers: [
      { text: "City skyline at night", city: 1 },
      { text: "Palm trees and ocean waves", city: 2 },
      { text: "Snowy mountains", city: 3 },
      { text: "Golden Gate Bridge and rolling hills", city: 4 }
    ]
  }
];
let scores = { 1: 0, 2: 0, 3: 0, 4: 0 };
let currentQuestion = 0;

// DOM Elements
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const showResultBtn = document.getElementById("show-result");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");


function loadQuestion() {
  const q = quiz[currentQuestion];
  questionText.textContent = q.question;
  answerButtons.innerHTML = ""; 

  q.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.className = "btn btn-outline-primary w-100 mb-2";
    btn.addEventListener("click", () => selectAnswer(answer.city));
    answerButtons.appendChild(btn);
  });
}

function selectAnswer(city) {
  scores[city]++;

  currentQuestion++;

  if (currentQuestion < quiz.length) {
    loadQuestion();
  } else {
    questionText.textContent = "All done!";
    answerButtons.innerHTML = "";
    showResultBtn.style.display = "block";
  }
}

showResultBtn.addEventListener("click", () => {
  showResult();
});

function showResult() {
  
  document.getElementById("quiz-container").style.display = "none";
  showResultBtn.style.display = "none";
  resultContainer.style.display = "block";


  const topCity = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  let cityName = "";
  let description = "";

  switch (parseInt(topCity)) {
    case 1:
      cityName = "New York City ";
      description = "You thrive in a fast-paced, ambitious environment full of opportunity and excitement!";
      break;
    case 2:
      cityName = "Los Angeles ";
      description = "You’re laid-back, creative, and love sunshine — the perfect fit for LA’s easy coastal vibe!";
      break;
    case 3:
      cityName = "Denver ";
      description = "You value balance, nature, and outdoor adventures — Denver’s your kind of town!";
      break;
    case 4:
      cityName = "San Francisco ";
      description = "You’re innovative, thoughtful, and appreciate culture and creativity — San Francisco fits you perfectly!";
      break;
  }

  resultText.innerHTML = `<strong>${cityName}</strong><br>${description}`;
}


loadQuestion();