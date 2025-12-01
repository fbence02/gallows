let wordsNormal = ["ALMA", "KÖRTE", "HÁZTETŐ", "TELEFON", "PROGRAM", "ESERNYŐ", "KANAPÉ"];

let guessedLetters = []

document.getElementById("new-game").addEventListener("click", (e) => {
  const randIndex = Math.floor(Math.random() * wordsNormal.length);
  const chosen = wordsNormal[randIndex];
  document.getElementById("generated-word").textContent = chosen;
});