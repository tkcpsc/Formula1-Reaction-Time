
/**
 * Script.js
 * 
 * This file has stuling utility functions along with game logic
 * 
 */


function adjustContainerPosition() {
    const container = document.querySelector('.screen-container');
    const startButton = document.querySelector('#start-button');
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Original size of the background image
    const originalWidth = 1920; 
    const originalHeight = 1080;

    // Original dimensions of the container
    const originalContainerWidth = 240;
    const originalContainerHeight = 170;
    const originalBottom = 155;

    // Calculate the scale factor of the background image
    const scaleWidth = viewportWidth / originalWidth;
    const scaleHeight = viewportHeight / originalHeight;
    const scale = Math.max(scaleWidth, scaleHeight);

    // Scale the dimensions of the container
    const newWidth = originalContainerWidth * scale;
    const newHeight = originalContainerHeight * scale;
    const newBottom = originalBottom * scale;

    // Apply new dimensions and position
    container.style.width = newWidth + 'px';
    container.style.height = newHeight + 'px';
    container.style.bottom = newBottom + 'px';

    // Original dimensions of the button
    const startOriginalButtonrWidth = 240;
    const startOriginalButtonrHeight = 130;
    const startOriginalBottom = -5;

    // Scale the dimensions of the Button
    const startNewWidth = startOriginalButtonrWidth * scale;
    const startNewHeight = startOriginalButtonrHeight * scale;
    const startNewBottom = startOriginalBottom * scale;

    // Apply startNew dimensions and Button
    startButton.style.width = startNewWidth + 'px';
    startButton.style.height = startNewHeight + 'px';
    startButton.style.bottom = startNewBottom + 'px';

}

// Adjust the position and size on load and on resize
window.addEventListener('load', adjustContainerPosition);
window.addEventListener('resize', adjustContainerPosition);




// Declare & initialize grid light classes.
let iterations = 0;
let startBtnClick = document.getElementById("start-button");
let light1 = document.querySelectorAll(".grid-light-column-1");
let light2 = document.querySelectorAll(".grid-light-column-2");
let light3 = document.querySelectorAll(".grid-light-column-3");
let light4 = document.querySelectorAll(".grid-light-column-4");
let light5 = document.querySelectorAll(".grid-light-column-5");
let errorCode = "";
let timerElement = document.querySelector('.screen-timer-span');
let bestElement = document.querySelector('.screen-pr-span');
let startTime;
let timerInterval;

// Delay function using a Promise
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(function() {
        let elapsedTime = Date.now() - startTime;
        timerElement.textContent = (elapsedTime / 1000).toFixed(3);
        if (elapsedTime >= 20000) { // End game due to inactivity
            stopTimer();
            errorCode = "no input detected after 20 seconds"
        }
    }, 1);
}

function stopTimer() {
    clearInterval(timerInterval);
}

// Utility function to get background color of grid lights
function setBackgroundColor (column, color) {
    column.forEach(light => {
        // Perform some action on each light
        light.style.backgroundColor = color;
    });
}

function waitForClick() {
    return new Promise((resolve) => {
        const listener = () => {
            document.removeEventListener('click', listener);
            stopTimer()
            resolve();
        };
        document.addEventListener('click', listener);
    });
}

// Async function for sequential execution, defined outside the event listener
async function executeSequentially(startButton) {

    startButton.classList.add('disabled');
    // Define the click event listener function
    function handleClick() {
        errorCode = "Jumped Start";
    }

    // Use setTimeout to defer the setup of the click listener
    setTimeout(() => {
        document.addEventListener('click', handleClick);
    }, 0);

    // Sequentially Turns lights off with 1000ms (1 second) deplay between.
    debuggingCoefficient = 1; // Default is 1, increase game speed for debugging.

    setBackgroundColor(light1, "red");
    await delay(1000/debuggingCoefficient);
    if (errorCode === "Jumped Start" ) {
        startButton.classList.remove('disabled');
        errorCode = "";
        return;
    }

    setBackgroundColor(light2, "red");
    await delay(1000/debuggingCoefficient);
    if (errorCode === "Jumped Start" ) {
        startButton.classList.remove('disabled');
        errorCode = "";
        return;
    }

    setBackgroundColor(light3, "red");
    await delay(1000/debuggingCoefficient);
    if (errorCode === "Jumped Start" ) {
        startButton.classList.remove('disabled');
        errorCode = "";
        return;
    }

    setBackgroundColor(light4, "red");
    await delay(1000/debuggingCoefficient);
    if (errorCode === "Jumped Start" ) {
        startButton.classList.remove('disabled');
        errorCode = "";
        return;
    }

    setBackgroundColor(light5, "red");
    
    // Await random time between 1-3 seconds and then turns off lights.
    await delay((1000+(Math.random()*2000))/debuggingCoefficient);
    setBackgroundColor(light1, 'rgb(85, 85, 85)')
    setBackgroundColor(light2, 'rgb(85, 85, 85)')
    setBackgroundColor(light3, 'rgb(85, 85, 85)')
    setBackgroundColor(light4, 'rgb(85, 85, 85)')
    setBackgroundColor(light5, 'rgb(85, 85, 85)')

    
    document.removeEventListener('click', handleClick);
    
    if (errorCode === "Jumped Start" ) {
        startButton.classList.remove('disabled');
        errorCode = "";
        return;
    }

    startTimer();
    await waitForClick();
    let currScore = parseFloat(timerElement.innerText);
    let bestScore = parseFloat(bestElement.innerText);

    
    if (currScore < bestScore || iterations === 0) {
        bestElement.textContent = currScore;
        iterations++;
    }



    startButton.classList.remove('disabled');}


startBtnClick.addEventListener("click", async function() {
    await executeSequentially(this);
    console.log(errorCode);
});


