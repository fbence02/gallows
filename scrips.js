let wordsNormal = ["TELEFON", "ALMA", "ARANY", "ABLAK", "RÉPA", "LABRADOR"];
let wordsHard = ["HÁZTETŐ", "PROGRAM", "ESERNYŐ", "KANAPÉ", "KAUKÁZUS", "JÓS", "NEUROTRANSZMITTER", "RADIÁTOR", "NYÚL", "KEFÍR", "MOSONMAGYARÓVÁR",
    "SZIVARVÉG", "EGYETEM","PROGRAMOZÁS", "SZÁMÍTÓGÉP", "KÖNYVTÁR", "FÉNYKÉPEZŐGÉP", "KERTÉSZET", "VEGYSZERÉSZ", "AUTÓBUSZMEGÁLLÓ", 
    "MÁGNESESÍTÉS"];
let acceptedLetters = ["A", "Á", "B", "C", "D", "E", "É", "F", "G", "H",
    "I", "Í", "J", "K", "L", "M", "N", "O", "Ó", "Ö",
    "Ő", "P", "Q", "R", "S", "T", "U", "Ú", "Ü", "Ű",
    "V", "W", "X", "Y", "Z"]
let guessedLetters = [];
let randomWord = "";
let unknownWord = "";
let maxGuesses = 0;
let inGame = false;
let hangerImage = document.getElementById("hanger-image")
let faultCounter = document.getElementById("faults")

document.getElementById("new-game").addEventListener("click", () => {
  const randIndex = Math.floor(Math.random() * wordsHard.length);
  randomWord = wordsHard[randIndex];
  unknownWord = "_".repeat(randomWord.length);
  document.getElementById("generated-word").textContent = unknownWord;
  document.getElementById("wrong-letters").textContent = "";
  document.getElementById("letter-input").value = "";
  hangerImage.src = "./images/akasztofa_0.png";
  maxGuesses = 0;
  faultCounter.textContent = "11/0";
  guessedLetters = [];
  inGame = true;
});

function isLetterCorrect(letter) {
  if (acceptedLetters.con)
}

function hangerImageReplacer(maxGuesses) {
  hangerImage.src = `./images/akasztofa_${maxGuesses}.png`;
  faultCounter.textContent = "11/" + maxGuesses;
}    
    
function guessHandler() {
  if (!inGame) {
    alert("nem vagy játékban!");
    return;
  }

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
    maxGuesses += 1;
    hangerImageReplacer(maxGuesses);
    if (maxGuesses === 11) {
      alert("Vesztettél, a szó " + randomWord + " volt.");
      maxGuesses = 0;
      inGame = false;
    }
  }

  document.getElementById("generated-word").textContent = unknownWord;
  document.getElementById("letter-input").value = "";

  if (unknownWord === randomWord) {
    alert("NYERTÉL!");
    guessedLetters = [];
    document.getElementById("wrong-letters").textContent = "";
    maxGuesses = 0;
  }
}

document.getElementById("enter-button").addEventListener("click", guessHandler);
document.getElementById("letter-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") guessHandler();
});
