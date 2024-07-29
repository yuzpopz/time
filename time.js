"use strict";

let h1 = document.getElementById("h1");
let h2 = document.getElementById("h2");
let m1 = document.getElementById("m1");
let m2 = document.getElementById("m2");
let s1 = document.getElementById("s1");
let s2 = document.getElementById("s2");
let clock = document.querySelector('.clock');

const targetWidth = 0.7;  // Proportion of full screen width
let curFontSize = 20;

function transitionText() {
    const d = new Date();
    const h = d.getHours().toString().padStart(2, "0");
    const m = d.getMinutes().toString().padStart(2, "0");

    // Calculate the time for the next second
    const nextD = new Date(d.getTime() + 1000);
    const nextH = nextD.getHours().toString().padStart(2, "0");
    const nextM = nextD.getMinutes().toString().padStart(2, "0");

    // Create arrays for current and next digits
    const currentDigits = [h.charAt(0), h.charAt(1), m.charAt(0), m.charAt(1)];
    const nextDigits = [nextH.charAt(0), nextH.charAt(1), nextM.charAt(0), nextM.charAt(1)];

    // Get all clock elements
    const elements = [h1, h2, m1, m2];

    // Loop through the digits to check which will change
    for (let i = 0; i < elements.length; i++) {
        if (currentDigits[i] !== nextDigits[i]) {
            // Delay the fade-out to start 0.5 seconds later
            setTimeout(() => {
                elements[i].classList.add('fade-out');

                // Set a timeout to update the digit and fade-in
                setTimeout(() => {
                    elements[i].textContent = nextDigits[i];
                    elements[i].classList.remove('fade-out');
                    elements[i].classList.add('fade-in');
                }, 200);

                // Remove fade-in class after the animation
                setTimeout(() => {
                    elements[i].classList.remove('fade-in');
                }, 400);
            }, 800);
        }
    }
}


function updateClock() {
    const d = new Date();

    var h = d.getHours().toString().padStart(2, "0");
    var m = d.getMinutes().toString().padStart(2, "0");
    var s = d.getSeconds().toString().padStart(2, "0");

    h1.textContent = h.charAt(0);
    h2.textContent = h.charAt(1);
    m1.textContent = m.charAt(0);
    m2.textContent = m.charAt(1);
    s1.textContent = s.charAt(0);
    s2.textContent = s.charAt(1);

    document.title = "Time is " + h + ":" + m;

    transitionText();

    setTimeout(updateClock, 1000 - d.getMilliseconds() + 20);
}

function updateTextSize() {
    for (let i = 0; i < 3; i++) {  // Iterate for better convergence
        curFontSize *= targetWidth / (clock.offsetWidth / clock.parentNode.offsetWidth);
        clock.style.fontSize = curFontSize + "pt";
    }
}

updateClock();
updateTextSize();
window.addEventListener("resize", updateTextSize);
