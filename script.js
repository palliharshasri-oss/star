const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ---------- STARS ---------- */
const stars = [];
const STAR_COUNT = 300;

class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.5;
    this.alpha = Math.random();
    this.speed = Math.random() * 0.02 + 0.005;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.fill();
  }

  update() {
    this.alpha += this.speed;
    if (this.alpha <= 0.2 || this.alpha >= 1) {
      this.speed *= -1;
    }
    this.draw();
  }
}

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push(new Star());
}

/* ---------- COMETS ---------- */
const comets = [];

class Comet {
  constructor() {
    this.x = Math.random() * canvas.width * 0.5;
    this.y = -50;
    this.vx = Math.random() * 6 + 6;
    this.vy = Math.random() * 4 + 6;
    this.size = Math.random() * 2 + 1;
  }

  draw() {
    // Tail
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.vx * 15, this.y - this.vy * 15);
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = this.size;
    ctx.stroke();

    // Head
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size + 1, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.draw();
  }
}

function spawnComet() {
  if (Math.random() < 0.015) {
    comets.push(new Comet());
  }
}

/* ---------- ANIMATION LOOP ---------- */
function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
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
