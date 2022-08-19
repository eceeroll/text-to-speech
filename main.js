// selecting all required elements
const textInput = document.getElementById("textarea");
const speedInput = document.getElementById("speed-input");
const playButtton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("restart-button");
const clearText = document.querySelector(".fa-trash");
let currentChar; // this will be for checking which position speech is currently at

// All event listeners
playButtton.addEventListener("click", () => {
    playText(textInput.value);
});
pauseButton.addEventListener("click", pauseText);
stopButton.addEventListener("click", stopText);

// stop the speech and then restart at the current position, so if we change the speed while speaking, speed will be change too
speedInput.addEventListener("input", () => {
    stopText();
    playText(utterance.text.substring(currentChar));
})

// this will specify all utterance
const utterance = new SpeechSynthesisUtterance();

// enable input back when the speech ends
utterance.addEventListener("end", () => {
    textInput.disabled = false;
})

utterance.addEventListener("boundary", (e) => {
    currentChar = e.charIndex; // first char of every word
})

clearText.addEventListener("click", clearInput);

function playText(text) {

    if(speechSynthesis.paused && speechSynthesis.speaking) {
        return speechSynthesis.resume();
    }

    if(speechSynthesis.speaking) return;

    utterance.text = text;

    // if user doesnt select speed value then rate will be 1 
    utterance.rate = speedInput.value || 1
    // disable input when speaking
    text.disabled = true;

    speechSynthesis.speak(utterance);
}

function pauseText() {
    if(speechSynthesis.speaking) 
    speechSynthesis.pause();
}

function stopText() {
    // if we are in a pause situation we should out of it 
    speechSynthesis.resume();
    // then quit of everything with cancel
    speechSynthesis.cancel();
}

// this function clears the input when clicked the trash icon
function clearInput() {
    textInput.value = '';
}