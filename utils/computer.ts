// 컴퓨터 로직 정리

// 우선순위
// 1. 5 놓기
// 2. 4일때 막기
// 3. 4 3 놓기
// 4. 4 놓기
// 5. 3 놓기
// 6. 3일때 막기
// 7. 2 2 놓기
// 8. 2일때 막기
// 9. 1 놓기

function getNext(pan: Array<Array<number>>, turn: number): Array<number> {
  const turn1 = [];
  const turn2 = [];
  for (let r = 0; r < pan.length; r++) {
    for (let c = 0; c < pan.length; c++) {
      if (pan[r][c] === 1) turn1.push([r, c]);
      else if (pan[r][c] === 2) turn2.push([r, c]);
    }
  }
  if (turn1.length + turn2.length === 0) return [9, 9];
}

export { getNext };
