let acceptedLetters = ["A", "Á", "B", "C", "D", "E", "É", "F", "G", "H",
    "I", "Í", "J", "K", "L", "M", "N", "O", "Ó", "Ö",
    "Ő", "P", "Q", "R", "S", "T", "U", "Ú", "Ü", "Ű",
    "V", "W", "X", "Y", "Z"];

let guessedLetters = [];
let randomWord = "";
let unknownWord = "";
let maxGuesses = 0;
let inGame = false;
let hangerImage = document.getElementById("hanger-image");
let faultCounter = document.getElementById("faults");

async function generateWordFromAI() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
    const prompt = "Írj nekem egy közepes nehézségű szót akasztófa játékhoz! Csak a szót írd le!";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });
        
        const data = await response.json();
        
        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text.trim().toUpperCase();
        } else {
            throw new Error("No answer from AI.");
        }
    } catch (error) {
        console.error("Hiba a szó generálásakor:", error);
        alert("Couldn't generate word with AI.");
        return null;
    }
}

document.getElementById("new-game").addEventListener("click", async () => {
    inGame = false;
    document.getElementById("generated-word").textContent = "Betöltés...";
    
    const aiWord = await generateWordFromAI();
    
    if (!aiWord) {
        document.getElementById("generated-word").textContent = "HIBA";
        return;
    }

    randomWord = aiWord;
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
    return acceptedLetters.includes(letter);
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
    
    if (!letter || !isLetterCorrect(letter) || guessedLetters.includes(letter)) {
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
        inGame = false;
    }
}

document.getElementById("enter-button").addEventListener("click", guessHandler);
document.getElementById("letter-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") guessHandler();
});