const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 480;

let bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 1.5,
    lift: -20,
    velocity: 0
};

let pipes = [];
let pipeWidth = 30;
let pipeGap = 120;
let frame = 0;

function drawBird() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.height > canvas.height) {
        bird.y = canvas.height - bird.height;
        bird.velocity = 0;
    }
    
    if (bird.y < 0) {
        bird.y = 0;
        bird.velocity = 0;
    }
}

function flap() {
    bird.velocity = bird.lift;
}

function generatePipes() {
    if (frame % 90 === 0) {
        let pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
        pipes.push({
            x: canvas.width,
            height: pipeHeight
        });
    }

    pipes.forEach(pipe => {
        pipe.x -= 2;

        ctx.fillStyle = 'green';
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.height);
        ctx.fillRect(pipe.x, pipe.height + pipeGap, pipeWidth, canvas.height - pipe.height - pipeGap);

        if (pipe.x + pipeWidth < 0) {
            pipes.shift();
        }

        if (bird.x < pipe.x + pipeWidth && bird.x + bird.width > pipe.x &&
            (bird.y < pipe.height || bird.y + bird.height > pipe.height + pipeGap)) {
            resetGame();
        }
    });
}

function resetGame() {
    bird.y = 150;
    bird.velocity = 0;
    pipes = [];
    frame = 0;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBird();
    updateBird();
    generatePipes();

    frame++;
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', flap);

gameLoop();
