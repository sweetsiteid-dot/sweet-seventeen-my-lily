
// =========================
// PIN SYSTEM
// =========================

const CORRECT_PIN = "1410";
let pin = "";

function addPin(num) {
    if (pin.length >= 4) return;

    pin += num;

    document.getElementById("pinInput").value =
        "●".repeat(pin.length);
}

function clearPin() {
    pin = pin.slice(0, -1);

    document.getElementById("pinInput").value =
        "●".repeat(pin.length);
}

function checkPin() {
    if (pin === CORRECT_PIN) {
        document.getElementById("pinScreen").style.display = "none";

        document.getElementById("website")
            .classList.remove("hidden");

        const music = document.getElementById("music");

        music.play().catch(() => {
            // Musik dapat dimulai setelah interaksi pengguna.
        });
    } else {
        alert("Wrong PIN, my Lily ❤️");

        pin = "";
        document.getElementById("pinInput").value = "";
    }
}

// =========================
// OPEN HEART
// =========================

function openHeart() {
    const section = document.getElementById("bottleSection");

    section.classList.remove("hidden");

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// =========================
// FLOATING HEARTS
// =========================

function createHeart() {
    const heart = document.createElement("div");

    heart.innerHTML = ["❤️", "💗", "💕", "🌹", "✨"][
        Math.floor(Math.random() * 5)
    ];

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-30px";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    heart.style.opacity = ".8";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "999";
    heart.style.animation = `fall ${Math.random() * 4 + 6}s linear`;

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 600);

// =========================
// ANIMATIONS
// =========================

const style = document.createElement("style");

style.textContent = `
@keyframes fall {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(120vh) rotate(360deg);
        opacity: 0;
    }
}

@keyframes flowerBurst {
    0% {
        opacity: 1;
        transform: translate(0, 0) scale(.5);
    }
    100% {
        opacity: 0;
        transform:
            translate(var(--x), var(--y))
            scale(1.5)
            rotate(360deg);
    }
}

@keyframes popIn {
    from {
        opacity: 0;
        transform: scale(.5);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
`;

document.head.appendChild(style);

// =========================
// BOTTLE BREAK
// =========================

let bottleOpened = false;

function breakBottle() {
    if (bottleOpened) return;

    bottleOpened = true;

    const bottle = document.getElementById("bottle");

    bottle.innerHTML = "💥";

    createFlowerBurst();

    setTimeout(() => {
        bottle.style.display = "none";

        const letterContainer =
            document.getElementById("letterContainer");

        letterContainer.style.display = "block";

        typeLetter();
    }, 1200);
}

// =========================
// FLOWER BURST
// =========================

function createFlowerBurst() {
    const flowers = document.getElementById("flowers");

    const emojis = [
        "🌹", "🌹", "🌹", "❤️",
        "💗", "✨", "💕", "🌷"
    ];

    for (let i = 0; i < 40; i++) {
        const flower = document.createElement("div");

        flower.innerHTML =
            emojis[Math.floor(Math.random() * emojis.length)];

        flower.style.position = "absolute";
        flower.style.left = "0px";
        flower.style.top = "0px";
        flower.style.fontSize = Math.random() * 15 + 25 + "px";

        flower.style.setProperty(
            "--x",
            Math.random() * 700 - 350 + "px"
        );

        flower.style.setProperty(
            "--y",
            -Math.random() * 450 - 50 + "px"
        );

        flower.style.animation = "flowerBurst 2.5s forwards";

        flowers.appendChild(flower);

        setTimeout(() => flower.remove(), 2500);
    }
}

// =========================
// BIRTHDAY LETTER
// =========================

const message = `My beloved Lilyy,

Happy sweet seventeen 🩷

Today is all about celebrating you and the beautiful person you are.

I hope this new chapter of your life brings you endless happiness, peaceful days, genuine laughter, and memories that you will always treasure.

May every dream you carry slowly find its way to reality. May life be gentle with your heart, and may you always find reasons to smile even on the days that feel a little difficult.

You deserve beautiful things, lovely surprises, and all the kindness this world can offer.

Never forget how special you are, my Lily.

Keep shining in your own beautiful way, keep chasing your dreams, and never stop being the wonderful person you are.

Happy sweet seventeen once again, my beloved Lilyy.

With all my love,
Nayy ❤️`;

let typingInterval;

function typeLetter() {
    const target = document.getElementById("letterText");

    target.textContent = "";

    let i = 0;

    clearInterval(typingInterval);

    typingInterval = setInterval(() => {
        target.textContent += message.charAt(i);
        i++;

        if (i >= message.length) {
            clearInterval(typingInterval);
        }
    }, 30);
}

// =========================
// LOVE QUIZ
// =========================

let currentQuestion = 0;

const questions = document.querySelectorAll(".question");

function checkAnswer(button, correct) {
    if (!correct) {
        alert("Oops, my Lily! Try again ❤️");
        return;
    }

    // Prevent additional clicks on an answered question.
    if (!questions[currentQuestion]) return;

    const answeredQuestion = questions[currentQuestion];

    answeredQuestion.querySelectorAll("button").forEach(btn => {
        btn.disabled = true;
    });

    answeredQuestion.classList.remove("active");

    currentQuestion++;

    if (currentQuestion < questions.length) {
        questions[currentQuestion].classList.add("active");
    } else {
        const success = document.getElementById("quizSuccess");

        success.classList.remove("hidden");
        success.style.animation = "popIn .6s ease";

        createConfetti();

        success.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}

// =========================
// CONFETTI
// =========================

function createConfetti() {
    const emojis = ["❤️", "✨", "🌹", "💗", "💕"];

    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement("div");

        confetti.innerHTML =
            emojis[Math.floor(Math.random() * emojis.length)];

        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-20px";
        confetti.style.fontSize = Math.random() * 20 + 15 + "px";
        confetti.style.zIndex = "999";
        confetti.style.pointerEvents = "none";

        confetti.style.animation =
            `fall ${Math.random() * 3 + 3}s linear`;

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 6000);
    }
}
