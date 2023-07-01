"use strict";

const team1Scores = [800, 55, 45];
const team2Scores = [100, 200, 89];

function getAverage(scores) {
  const length = scores.length;
  let totalScore = 0;
  for (let i = 0; i < length; i++) {
    totalScore += scores[i];
  }
  const averageScore = totalScore / length;
  return averageScore;
}

function checkWinner(team1, team2) {
  const team1AverageScore = getAverage(team1);
  const team2AverageScore = getAverage(team2);
  if (team1AverageScore > team2AverageScore * 2) {
    console.log("team1 win!");
  } else if (team2AverageScore > team1AverageScore * 2) {
    console.log("team2 win!");
  } else {
    console.log("no winner");
  }
}
console.log(getAverage(team1Scores));
checkWinner(team1Scores, team2Scores);

const Mark = {
  fullName: "Mark Miller",
  mass: 98,
  height: 185,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};
Mark.calcBMI();
console.log(Mark.fullName);
console.log(Mark.BMI);

const jonas = [
  "Jonas",
  "Schmedtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Peter", "Steven"],
  true,
];

console.log("--- ONLY STRINGS ---");
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] !== "string") continue;

  console.log(jonas[i], typeof jonas[i]);
}

console.log("--- BREAK WITH NUMBER ---");
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] === "number") break;

  console.log(jonas[i], typeof jonas[i]);
}
