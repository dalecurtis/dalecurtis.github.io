// From
// https://medium.com/better-programming/fun-with-html-canvas-lets-create-a-star-field-a46b0fed5002
function makeStars(count) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const s = {
      x : Math.random() * 1600 - 800,
      y : Math.random() * 900 - 450,
      z : Math.random() * 1000
    };
    out.push(s);
  }
  return out;
}

function putPixel(ctx, x, y, brightness) {
  const intensity = brightness * 255;
  const rgb = "rgb(" + intensity + "," + intensity + "," + intensity + ")";
  ctx.fillStyle = rgb;
  ctx.fillRect(x, y, 1, 1);
}

function moveStars(stars, distance) {
  const count = stars.length;
  for (var i = 0; i < count; i++) {
    const s = stars[i];
    s.z -= distance;
    while (s.z <= 1) {
      s.z += 1000;
    }
  }
}

function animateStars(ctx, w, h, stars, elapsed) {
  moveStars(stars, elapsed * 100);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;

  const count = stars.length;
  for (var i = 0; i < count; i++) {
    const star = stars[i];

    const x = cx + star.x / (star.z * 0.001);
    const y = cy + star.y / (star.z * 0.001);

    if (x < 0 || x >= w || y < 0 || y >= h) {
      continue;
    }

    const d = star.z / 1000.0;
    const b = 1 - d * d;

    putPixel(ctx, x, y, b);
  }
}
