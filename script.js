const wordsWithHints = [
    { word: "application", hint: "A software program" },
    { word: "programming", hint: "The process of writing computer software" },
    { word: "interface", hint: "A point of interaction between components" },
    { word: "wizard", hint: "A person with magical powers" },
    { word: "element", hint: "A part or aspect of something" },
    { word: "prototype", hint: "An early sample or model" },
    { word: "callback", hint: "A function passed as an argument" },
    { word: "undefined", hint: "A variable without a value" },
    { word: "arguments", hint: "Values passed to a function" },
    { word: "settings", hint: "Configurations for software" },
    { word: "selector", hint: "A way to select elements in the DOM" },
    { word: "container", hint: "A component that can hold other elements" },
    { word: "instance", hint: "An occurrence of an object" },
    { word: "response", hint: "A reply from a server" },
    { word: "console", hint: "A tool for debugging" },
    { word: "constructor", hint: "A method for creating objects" },
    { word: "token", hint: "A piece of data used for authentication" },
    { word: "function", hint: "A block of code that performs a task" },
    { word: "return", hint: "To give back a value from a function" },
    { word: "length", hint: "The number of items in an array" },
    { word: "type", hint: "The data type of a variable" },
    { word: "node", hint: "An element in a data structure" },
  ];
  
  let selectedWordObj = wordsWithHints[Math.floor(Math.random() * wordsWithHints.length)];
  let selectedWord = selectedWordObj.word;
  let selectedHint = selectedWordObj.hint;
  
  let playable = true;
  
  const correctLetters = [];
  const wrongLetters = [];
  
  function displayWord() {
    wordElement.innerHTML = `
      ${selectedWord
        .split("") // to array
        .map(
          (letter) => `
      <span class="letter">
      ${correctLetters.includes(letter) ? letter : ""}
      </span>
      `
        )
        .join("")} 
      `; // to string
    const innerWord = wordElement.innerText.replace(/\n/g, "");
    if (innerWord === selectedWord) {
      finalMessage.innerText = "Won!";
      finalMessageRevealWord.innerText = "";
      popup.style.display = "flex";
      playable = false;
    }
  }
  
  function updateWrongLettersElement() {
    wrongLettersElement.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;
    figureParts.forEach((part, index) => {
      const errors = wrongLetters.length;
      index < errors
        ? (part.style.display = "block")
        : (part.style.display = "none");
    });
    if (wrongLetters.length === figureParts.length) {
      finalMessage.innerText = "Game over! ";
      finalMessageRevealWord.innerText = `Answer: ${selectedWord}`;
      popup.style.display = "flex";
      playable = false;
    }
  }
  
  function showNotification() {
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
    }, 2000);
  }
  
  window.addEventListener("keypress", (e) => {
    if (playable) {
      const letter = e.key.toLowerCase();
      if (letter >= "a" && letter <= "z") {
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            displayWord();
          } else {
            showNotification();
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            updateWrongLettersElement();
          } else {
            showNotification();
          }
        }
      }
    }
  });
  
  playAgainButton.addEventListener("click", () => {
    playable = true;
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWordObj = wordsWithHints[Math.floor(Math.random() * wordsWithHints.length)];
    selectedWord = selectedWordObj.word;
    selectedHint = selectedWordObj.hint;
    displayWord();
    updateWrongLettersElement();
    popup.style.display = "none";
    hintElement.innerText = selectedHint; // Update hint for the new word
  });
  
  // Init
  displayWord();
  hintElement.innerText = selectedHint; // Set initial hint
  