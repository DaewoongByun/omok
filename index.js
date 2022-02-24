const kans = Array.from(new Array(18), (_, r) =>
  Array.from(new Array(18), (_, c) => `r${r}c${c}`)
);
const spaces = Array.from(new Array(19), (_, r) =>
  Array.from(new Array(19), (_, c) => 0)
);
const kanSize = 40;
let turn = 1;

function getRC(element, top, left) {
  const kanR = +element.id.split("c")[0].slice(1);
  const kanC = +element.id.split("c")[1];
  const spaceR = kanR + (top === 0 ? 0 : 1);
  const spaceC = kanC + (left === 0 ? 0 : 1);
  return {
    r: spaceR,
    c: spaceC,
  };
}

function getTopLeft(event) {
  let top = 0;
  let left = 0;
  const [x, y] = [event.layerX, event.layerY];
  if (x < kanSize / 2) left = 0;
  else left = 100;
  if (y < kanSize / 2) top = 0;
  else top = 100;
  return { top, left };
}

function initPan() {
  const pan = document.querySelector("#pan");
  kans.forEach((arr, r) => {
    const line = document.createElement(`div`);
    line.id = `line${r}`;
    line.classList.add("line");

    arr.forEach((kanId, c) => {
      const dots = [2, 8, 14];
      const kan = document.createElement("div");
      kan.id = kanId;
      kan.classList.add("kan");
      if (dots.includes(r) && dots.includes(c)) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        kan.appendChild(dot);
      }
      line.appendChild(kan);
    });

    pan.appendChild(line);
  });
}

function addMouseOverEvent() {
  document.querySelector("#pan").addEventListener("mousemove", (e) => {
    if (e.target.classList.contains("kan")) {
      const { top, left } = getTopLeft(e);

      e.target.className = `kan al al-transparent al-${
        turn === 1 ? "black" : "white"
      } al${top}-${left}`;
    }
  });
  document.querySelector("#pan").addEventListener("mouseout", (e) => {
    if (e.target.classList.contains("kan")) {
      e.target.className = `kan`;
    }
  });
}

function addMouseClickEvent() {
  document.querySelector("#pan").addEventListener("click", (e) => {
    if (e.target.classList.contains("kan")) {
      const { top, left } = getTopLeft(e);
      const { r, c } = getRC(e.target, top, left);
      if (spaces[r][c] > 0) return;
      spaces[r][c] = turn;
      const al = document.createElement("div");
      al.className = `real-al real-al-${
        turn === 1 ? "black" : "white"
      } real-al${top}-${left}`;
      e.target.appendChild(al);
      checkGameEnd(r, c, turn);
      turn = turn === 1 ? 2 : 1;
    }
  });
}

initPan();
addMouseOverEvent();
addMouseClickEvent();
