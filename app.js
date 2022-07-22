const modeBtn = document.getElementById('mode-btn');
const colorOptions = Array.from(
  document.getElementsByClassName('color-option')
);
const color = document.getElementById('color');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const lineWidth = document.getElementById('line-width');

canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = lineWidth.value;

let isPainting = false;
let isFillig = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  // ctx.beginPath(); 여기 혹은 페인팅 끝났을 때에 넣어줌
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(event) {
  console.log(event.target.value);
  ctx.lineWidth = event.target.value;
}
function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}
function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}
function onModeClick() {
  if (isFillig) {
    isFillig = false;
    modeBtn.innerText = 'Fill';
  } else {
    isFillig = true;
    modeBtn.innerText = 'Draw';
  }
}
function onCanvasClick() {
  if (isFillig) {
    ctx.fillRect(0, 0, 800, 800);
  }
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
canvas.addEventListener('click', onCanvasClick);
lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);

colorOptions.forEach(color => {
  color.addEventListener('click', onColorClick);
});

modeBtn.addEventListener('click', onModeClick);
