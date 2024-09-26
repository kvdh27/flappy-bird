const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 480;

let bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 0.008,  // Verminderd de zwaartekracht om langzamer te vallen
    lift: -5,   // Minder sterke sprong om de controle te vergemakkelijken
    velocity: 0
};

let pipes = [];
let pipeWidth = 30;
let pipeGap = 500; // Grotere opening tussen pijpen voor eenvoudiger navigatie
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
    if (frame % 120 === 0) {  // Minder pijpen genereren, waardoor er meer tijd tussen obstakels is
        let pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
        pipes.push({
            x: canvas.width,
            height: pipeHeight
        });
    }

    pipes.forEach(pipe => {
        pipe.x -= 2;

        ctx.fillStyle = 'green';
        ctx.fillRect(pipe.x, 0,
