let wordsNormal = ["TELEFON", "ALMA", "ARANY", "ABLAK", "RÉPA", "LABRADOR"];
let wordsHard = ["HÁZTETŐ", "PROGRAM", "ESERNYŐ", "KANAPÉ", "KAUKÁZUS", "JÓS", "NEUROTRANSZMITTER", "RADIÁTOR", "NYÚL", "KEFÍR", "MOSONMAGYARÓVÁR"];

let guessedLetters = []
let chosen;
let unknownWord;

document.getElementById("new-game").addEventListener("click", (e) => {
  const randIndex = Math.floor(Math.random() * wordsNormal.length);
  chosen = wordsHard[randIndex];
  unknownWord = "_".repeat(chosen.length);

  document.getElementById("generated-word").textContent = unknownWord;
});

document.getElementById("enter-button").addEventListener("click", (e) => {
  const letter = document.getElementById("letter-input").value;
  
  console.log(letter)

  for (let i = 0; i < chosen.length; i++) {
    if (chosen[i] === letter.toUpperCase()) {
      unknownWord = unknownWord.substring(0, i) + letter.toUpperCase() + unknownWord.substring(i + 1);
    }
  }

  document.getElementById("generated-word").textContent = unknownWord;

  document.getElementById("letter-input").value = "";

  if (unknownWord === chosen) {
    alert("NYERTÉL!\nA szó " + chosen + " volt.");
  }
});
