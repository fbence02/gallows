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
    const url = "http://localhost:11434/api/generate";

    const promptText = `Generate one medium difficulty Hungarian noun for a hangman game. 
    You must output ONLY a valid JSON object with a single key called "word".
    Example: {"word": "SZÓ"}`;

    const payload = {
        model: "phi3",
        prompt: promptText,
        format: "json",
        stream: false,
        options: {
            temperature: 0.2
        }
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        
        if (data.response) {
            const parsedData = JSON.parse(data.response);
            
            return parsedData.word.trim().toUpperCase().replace(/[^A-ZÁÉÍÓÖŐÚÜŰ]/g, "");
        } else {
            throw new Error("Nincs válasz az AI-tól.");
        }
    } catch (error) {
        console.error("Hiba a szó generálásakor:", error);
        return "KALAPÁCS";
    }
}

document.getElementById("new-game").addEventListener("click", async () => {
    inGame = false;
    document.getElementById("generated-word").style.color = "#000000";
    
    const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let loadingIndex = 0;
    
    const loadingInterval = setInterval(() => {
        document.getElementById("generated-word").textContent = frames[loadingIndex];
        loadingIndex++;
        if (loadingIndex >= loadingTexts.length) {
            loadingIndex = 0;
        }
    }, 100);
    
    const aiWord = await generateWordFromAI();
    
    clearInterval(loadingInterval);
    
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
            document.getElementById("generated-word").textContent = randomWord;
            document.getElementById("generated-word").style.color = "red";
            maxGuesses = 0;
            inGame = false;
            return;
        }
    }

    document.getElementById("generated-word").textContent = unknownWord;
    document.getElementById("letter-input").value = "";

    if (unknownWord === randomWord) {
        alert("NYERTÉL!");
        guessedLetters = [];
        document.getElementById("generated-word").style.color = "#00ff0d";
        document.getElementById("wrong-letters").textContent = "";
        maxGuesses = 0;
        inGame = false;
    }
}

document.getElementById("enter-button").addEventListener("click", guessHandler);
document.getElementById("letter-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") guessHandler();
});