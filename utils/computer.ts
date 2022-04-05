// 컴퓨터 로직 정리

// 우선순위
// 5 놓기 ()
// 상대 5막기 (100000000)
// 열린 4 놓기 (10000000)
// 상대 열린 4 막기 (1000000)
// 막힌 4, 열린 3 놓기 (100000)
// 상대 열린 3, 막힌 4 막기 (10000)
// 막힌 3, 열린 2 놓기 (1000)
// 막힌 2, 열린 1 놓기 (100)
// 상대 열린 2, 막힌 3 막기 (10)
// 상대 막힌 2 막기 (1)

import { count, checkGameEnd, checkRules } from "./check";

const dr = [-1, -1, -1, 0, 1, 1, 1, 0];
const dc = [-1, 0, 1, 1, 1, 0, -1, -1];

function getNext(pan: Array<Array<number>>, turn: number): Array<number> {
  const scorePan = pan.map((line) => line.map(() => 0));
  scorePan[9][9] = 0.5;
  getScore(pan, scorePan, turn);
  const [r, c] = getMaxScoreLocation(scorePan);
  return [r, c];
}

function getScore(
  pan: Array<Array<number>>,
  scorePan: Array<Array<number>>,
  myTurn: number
): void {
  // 공격 점수 계산
  for (let r = 0; r < pan.length; r++) {
    for (let c = 0; c < pan.length; c++) {
      if (checkGameEnd(pan, r, c, myTurn)) {
        scorePan[r][c] = Number.MAX_VALUE;
        break;
      }
      if (checkRules(pan, r, c, myTurn)) {
        scorePan[r][c] = -10000000;
        continue;
      }
      if (pan[r][c] !== 0) {
        scorePan[r][c] = -10000000;
        continue;
      }
      const counts = dr.map((_, i) =>
        count(pan, r, c, dr[i], dc[i], myTurn, 0, 0)
      );
    }
  }
  // 수비 점수 계산
}

function getMaxScoreLocation(scorePan: Array<Array<number>>): Array<number> {
  let maxScore = 0;
  let maxLocations = [];
  for (let r = 0; r < scorePan.length; r++) {
    for (let c = 0; c < scorePan.length; c++) {
      if (scorePan[r][c] > maxScore) {
        maxScore = scorePan[r][c];
        maxLocations = [[r, c]];
      } else if (scorePan[r][c] === maxScore) {
        maxLocations.push([r, c]);
      }
    }
  }
  const randomIndex = Math.floor(Math.random() * maxLocations.length);
  return maxLocations[randomIndex];
}

export { getNext };
