const $ = (query) => document.querySelector(query);
const spaces = Array.from(new Array(18), (_, r) =>
  Array.from(new Array(18), (_, c) => `r${r}c${c}`)
);
function initPan() {
  const pan = $("#pan");
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

// 2,2   2,8    2,14
// 8,2   8,8    8,14
// 14,2  14,8   14,14

initPan();
