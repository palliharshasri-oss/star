const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize support
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ----- STARS -----
const stars = [];
const STAR_COUNT = 250;

class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.5;
    this.alpha = Math.random();
    this.twinkleSpeed = Math.random() * 0.02;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.fill();
  }

  update() {
    this.alpha += this.twinkleSpeed;
    if (this.alpha <= 0 || this.alpha >= 1) {
      this.twinkleSpeed *= -1;
    }
    this.draw();
  }
}

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push(new Star());
}

// ----- COMETS -----
const comets = [];

class Comet {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = -50;
    this.speedX = Math.random() * 4 + 4;
    this.speedY = Math.random() * 3 + 4;
    this.size = Math.random() * 2 + 1;
    this.life = 0;
  }

  draw() {
    // Tail
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.speedX * 15, this.y - this.speedY * 15);
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = this.size;
    ctx.stroke();

    // Head
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size + 1, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;
    this.draw();
  }
}

// Spawn comets randomly
function spawnComet() {
  if (Math.random() < 0.02) {
    comets.push(new Comet());
  }
}

// ----- ANIMATE -----
function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => star.update());

  spawnComet();
  comets.forEach((comet, index) => {
    comet.update();
    if (
      comet.x > canvas.width + 100 ||
      comet.y > canvas.height + 100
    ) {
      comets.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();
