const dr = [-1, -1, -1, 0, 1, 1, 1, 0];
const dc = [-1, 0, 1, 1, 1, 0, -1, -1];

interface CountType {
  count: number;
  nearCount: number;
  isBlocked: Boolean;
}

interface CountLineType {
  count: number;
  blockedCount: number;
}

export function checkGameEnd(
  pan: Array<Array<number>>,
  r: number,
  c: number,
  turn: number
): any {
  function count(r, c, dr, dc, turn, curCount) {
    const nr = r + dr;
    const nc = c + dc;
    if (
      nr >= 0 &&
      nr < pan.length &&
      nc >= 0 &&
      nc < pan[0].length &&
      pan[nr][nc] === turn
    ) {
      return count(nr, nc, dr, dc, turn, curCount + 1);
    }
    return curCount;
  }
  const counts = dr.map((_, i) => count(r, c, dr[i], dc[i], turn, 0));
  for (let i = 0; i < 4; i++) {
    if (counts[i] + counts[i + 4] === 4) {
      return turn === 1 ? "흑 승" : "백 승";
    }
    if (counts[i] + counts[i + 4] >= 4 && turn === 2) return "백 승";
  }
  return false;
}

export function checkRules(
  pan: Array<Array<number>>,
  r: number,
  c: number,
  turn: number
): any {
  if (turn === 2) return false;

  const counts = dr.map((_, i) =>
    count(pan, r, c, dr[i], dc[i], turn, 0, 0, 0)
  );
  const countLine: Array<CountLineType> = Array.from(new Array(4), () => ({
    count: 0,
    blockedCount: 0,
  }));
  for (let i = 0; i < 4; i++) {
    countLine[i] = {
      count: counts[i].count + counts[i + 4].count,
      blockedCount:
        (counts[i].isBlocked ? 1 : 0) + (counts[i + 4].isBlocked ? 1 : 0),
    };
  }
  // 33 체크
  const count3 = countLine.reduce(
    (prev, cur) =>
      cur.count === 2 && cur.blockedCount === 0 ? prev + 1 : prev,
    0
  );
  if (count3 > 1) {
    return "흑은 3 3을 놓을 수 없습니다.";
  }
  // 44 체크
  const count4 = countLine.reduce(
    (prev, cur) => (cur.count === 3 && cur.blockedCount < 2 ? prev + 1 : prev),
    0
  );
  if (count4 > 1) {
    return "흑은 4 4를 놓을 수 없습니다.";
  }
  // 6목 체크
  const count6 = countLine.reduce(
    (prev, cur) => (cur.count === 5 ? prev + 1 : prev),
    0
  );
  if (count6 > 0) {
    return "흑은 6목을 놓을 수 없습니다.";
  }
  return false;
}

export function count(
  pan: Array<Array<number>>,
  r: number,
  c: number,
  dr: number,
  dc: number,
  turn: number,
  curCount: number,
  nearCount: number,
  blankCount: number
): CountType {
  const nr = r + dr;
  const nc = c + dc;
  if (nr >= 0 && nr < pan.length && nc >= 0 && nc < pan[0].length) {
    if (pan[nr][nc] === turn) {
      if (blankCount === 0)
        return count(
          pan,
          nr,
          nc,
          dr,
          dc,
          turn,
          curCount + 1,
          nearCount + 1,
          blankCount
        );
      else
        return count(
          pan,
          nr,
          nc,
          dr,
          dc,
          turn,
          curCount + 1,
          nearCount,
          blankCount
        );
    } else if (pan[nr][nc] === 0) {
      if (blankCount === 0)
        return count(
          pan,
          nr,
          nc,
          dr,
          dc,
          turn,
          curCount,
          nearCount,
          blankCount + 1
        );
      else return { count: curCount, nearCount: nearCount, isBlocked: false };
    } else {
      if (pan[r][c] === 0) {
        return {
          count: curCount,
          nearCount: nearCount,
          isBlocked: curCount === 0 ? true : false,
        };
      } else {
        return {
          count: curCount,
          nearCount: nearCount,
          isBlocked: true,
        };
      }
    }
  }
  return { count: curCount, nearCount: nearCount, isBlocked: true };
}
