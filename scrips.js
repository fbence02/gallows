let wordsNormal = ["TELEFON", "ALMA", "ARANY", "ABLAK", "RÉPA", "LABRADOR"];
let wordsHard = ["HÁZTETŐ", "PROGRAM", "ESERNYŐ", "KANAPÉ", "KAUKÁZUS", "JÓS", "NEUROTRANSZMITTER", "RADIÁTOR", "NYÚL", "KEFÍR", "MOSONMAGYARÓVÁR"];
let guessedLetters = [];
let randomWord = "";
let unknownWord = "";
let maxGuesses = 0;

document.getElementById("new-game").addEventListener("click", () => {
  const randIndex = Math.floor(Math.random() * wordsNormal.length);
  randomWord = wordsNormal[randIndex];
  unknownWord = "_".repeat(randomWord.length);
  document.getElementById("generated-word").textContent = unknownWord;
  guessedLetters = [];
  document.getElementById("wrong-letters").textContent = "";
  document.getElementById("letter-input").value = "";
});

function guessHandler() {
  const letter = document.getElementById("letter-input").value.trim().toUpperCase();
  if (!letter || guessedLetters.includes(letter)) {
    document.getElementById("letter-input").value = "";
    return;
  }

  guessedLetters.push(letter);
  let found = false;

  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === letter) {
      unknownWord = unknownWord.substring(0, i) + letter + unknownWord.substring(i + 1);
      found = true;
    }
  }

  if (!found) {
    document.getElementById("wrong-letters").textContent += letter + " ";
  }

  document.getElementById("generated-word").textContent = unknownWord;
  document.getElementById("letter-input").value = "";

  if (unknownWord === randomWord) {
    alert("NYERTÉL!\nA szó " + randomWord + " volt.");
    guessedLetters = [];
    document.getElementById("wrong-letters").textContent = "";
  }
}

document.getElementById("enter-button").addEventListener("click", guessHandler);
document.getElementById("letter-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") guessHandler();
});
