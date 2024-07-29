const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");

const paddleWidth = 5,
  paddleHeight = 30,
  ballRadius = 5;
let paddle1Y = canvas.height / 2 - paddleHeight / 2 - 50,
  paddle2Y = canvas.height / 2 - paddleHeight / 2 + 50,
  ballX = canvas.width / 2,
  ballY = canvas.height / 2;

let ballSpeedX = 3,
  ballSpeedY = 3;

let upPressed = false,
  downPressed = false,
  wPressed = false,
  sPressed = false;

let animationFrameId;
let gameStopped = false;

function drawNet() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(canvas.width / 2 - 1, 0, 2, canvas.height);
}

function drawPaddle(x, y) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#ffA500";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(ballX - ballRadius, ballY);
  ctx.lineTo(ballX + ballRadius, ballY);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawNet();
  drawPaddle(0, paddle1Y);
  drawPaddle(canvas.width - paddleWidth, paddle2Y);
  drawBall();
}

function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0)
    ballSpeedY = -ballSpeedY;
  if (
    ballX - ballRadius < paddleWidth &&
    ballY > paddle1Y &&
    ballY < paddle1Y + paddleHeight
  )
    ballSpeedX = -ballSpeedX;
  if (
    ballX + ballRadius > canvas.width - paddleWidth &&
    ballY > paddle2Y &&
    ballY < paddle2Y + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballX - ballRadius < 0 || ballX + ballRadius > canvas.width) {
    if (ballX - ballRadius < 0) p2.innerText = +p2.innerText + 1;
    else p1.innerText = +p1.innerText + 1;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }

  if (upPressed && paddle2Y > 0) {
    paddle2Y -= 5;
  }

  if (downPressed && paddle2Y + paddleHeight < canvas.height) {
    paddle2Y += 5;
  }

  if (wPressed && paddle1Y > 0) {
    paddle1Y -= 5;
  }

  if (sPressed && paddle1Y + paddleHeight < canvas.height) {
    paddle1Y += 5;
  }
}

function checkWin() {
  if (+p1.innerText > 14 || +p2.innerText > 14) {
    cancelAnimationFrame(animationFrameId);
    document.querySelector(".controls").classList.add("slide");
    gameStopped = true;
  }
}

function gameLoop() {
  checkWin();
  if (!gameStopped) {
    update();
    draw();
    animationFrameId = requestAnimationFrame(gameLoop);
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      upPressed = true;
      break;
    case "ArrowDown":
      downPressed = true;
      break;
    case "w":
      wPressed = true;
      break;
    case "s":
      sPressed = true;
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowUp":
      upPressed = false;
      break;
    case "ArrowDown":
      downPressed = false;
      break;
    case "w":
      wPressed = false;
      break;
    case "s":
      sPressed = false;
      break;
  }
});

document
  .getElementById("btn")
  .addEventListener("click", () => [location.reload()]);

gameLoop();
