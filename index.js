const spaces = Array.from(new Array(18), (_, r) =>
  Array.from(new Array(18), (_, c) => `r${r}c${c}`)
);
const kanSize = 40;

function initPan() {
  const pan = document.querySelector("#pan");
  spaces.forEach((arr, r) => {
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
      let top = 0;
      let left = 0;
      const [x, y] = [e.layerX, e.layerY];
      if (x >= 0 && y >= 0) {
        if (x < kanSize / 2) left = 0;
        else left = 100;
        if (y < kanSize / 2) top = 0;
        else top = 100;
        e.target.className = `kan al al${top}-${left}`;
      }
    }
  });
  document.querySelector("#pan").addEventListener("mouseout", (e) => {
    if (e.target.classList.contains("kan")) {
      e.target.className = `kan`;
    }
  });
}

initPan();
addMouseOverEvent();
