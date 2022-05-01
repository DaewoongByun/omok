// 컴퓨터 로직 정리

// 우선순위

/* 무조건 하는거 */
// 5 놓기 (0)
// 상대 4막기 (1)
// 열린 4 놓기 (2)
/*****************/

// 막힌 4 놓기 (3)
// 상대 열린 3 막기 (4)
// 열린 3 놓기 (5)

// 상대 막힌 3 막기 (7)
// 상대 열린 2 막기 (7)

// 막힌 3 놓기 (6)
// 열린 2 놓기 (6)
// 막힌 2 놓기 (8)
// 상대 열린 1 막기 (8)
// 막힌 2 막기 (8)
// 상대 막힌 1 막기 (9)

import { count, checkGameEnd, checkRules } from "./check";

const dr = [-1, -1, -1, 0, 1, 1, 1, 0];
const dc = [-1, 0, 1, 1, 1, 0, -1, -1];

const scores = Array.from(new Array(20), (_, i) => Math.pow(10, i)).reverse();

interface CountLineType {
  count: number;
  nearCount: number;
  blockedCount: number;
}

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
      if (pan[r][c] !== 0) {
        scorePan[r][c] = -scores[0];
        continue;
      }
      if (checkGameEnd(pan, r, c, myTurn)) {
        scorePan[r][c] = scores[0];
        return;
      }
      if (checkRules(pan, r, c, myTurn)) {
        scorePan[r][c] = -scores[0];
        continue;
      }
      const counts = dr.map((_, i) =>
        count(pan, r, c, dr[i], dc[i], myTurn, 0, 0, 0)
      );
      const countLine: Array<CountLineType> = Array.from(new Array(4), () => ({
        count: 0,
        nearCount: 0,
        blockedCount: 0,
      }));
      for (let i = 0; i < 4; i++) {
        countLine[i] = {
          count: counts[i].count + counts[i + 4].count,
          nearCount: counts[i].nearCount + counts[i + 4].nearCount,
          blockedCount:
            (counts[i].isBlocked ? 1 : 0) + (counts[i + 4].isBlocked ? 1 : 0),
        };
      }

      if (is43(countLine, true, r, c)) {
        scorePan[r][c] += scores[2] - scores[3];
      }

      for (let i = 0; i < 4; i++) {
        if (countLine[i].blockedCount === 2) continue;
        if (countLine[i].blockedCount === 1) {
          // 막힌 4 놓기
          if (countLine[i].count === 3) {
            scorePan[r][c] += scores[3];
            // 막힌 3 놓기
          } else if (countLine[i].count === 2) {
            scorePan[r][c] += scores[6];
            // 막힌 2 놓기
          } else if (countLine[i].count === 1) {
            scorePan[r][c] += scores[8];
          }
        } else if (countLine[i].blockedCount === 0) {
          // 열린 4 놓기
          if (countLine[i].nearCount === 3) {
            scorePan[r][c] += scores[2];
            // 열린 3 놓기
          } else if (countLine[i].count === 2) {
            scorePan[r][c] += scores[5];
            // 열린 2 놓기
          } else if (countLine[i].count === 1) {
            scorePan[r][c] += scores[6];
          }
        }
      }
    }
  }
  // 수비 점수 계산
  const userTurn = 3 - myTurn;
  for (let r = 0; r < pan.length; r++) {
    for (let c = 0; c < pan.length; c++) {
      if (pan[r][c] !== 0) {
        continue;
      }
      if (checkGameEnd(pan, r, c, userTurn)) {
        scorePan[r][c] = scores[0];
        return;
      }
      const counts = dr.map((_, i) =>
        count(pan, r, c, dr[i], dc[i], userTurn, 0, 0, 0)
      );
      const countLine: Array<CountLineType> = Array.from(new Array(4), () => ({
        count: 0,
        nearCount: 0,
        blockedCount: 0,
      }));
      for (let i = 0; i < 4; i++) {
        countLine[i] = {
          count: counts[i].count + counts[i + 4].count,
          nearCount: counts[i].nearCount + counts[i + 4].nearCount,
          blockedCount:
            (counts[i].isBlocked ? 1 : 0) + (counts[i + 4].isBlocked ? 1 : 0),
        };
      }

      if (is43(countLine, false, r, c)) {
        scorePan[r][c] += scores[5] * 4;
      }

      for (let i = 0; i < 4; i++) {
        if (countLine[i].blockedCount === 2) continue;
        if (countLine[i].blockedCount === 1) {
          // 막힌 3 막기
          if (countLine[i].nearCount === 3) {
            scorePan[r][c] += scores[7];
            // 막힌 2 막기
          } else if (countLine[i].nearCount === 2) {
            scorePan[r][c] += scores[8];
          }
        } else if (countLine[i].blockedCount === 0) {
          // 열린 3 막기
          if (countLine[i].nearCount === 3) {
            scorePan[r][c] += scores[4];
            // 열린 2 막기
          } else if (countLine[i].nearCount === 2) {
            scorePan[r][c] += scores[7];
            // 열린 1 막기
          } else if (countLine[i].nearCount === 1) {
            scorePan[r][c] += scores[8];
          }
        }
      }
    }
  }
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

function is43(
  countLine: Array<CountLineType>,
  isAttack: boolean,
  r: number,
  c: number
): boolean {
  let count4 = 0;
  let count3 = 0;
  if (isAttack) {
    countLine.forEach((value) => {
      if (value.count === 3 && value.blockedCount <= 1) count4++;
      if (value.count === 2 && value.blockedCount === 0) count3++;
    });
  } else {
    countLine.forEach((value) => {
      if (value.count === 3 && value.blockedCount === 1) count4++;
      if (value.count === 2 && value.blockedCount === 0) count3++;
    });
  }
  if (count4 >= 1 && count3 >= 1) {
    console.log("43임 ㅋㅋ");
    console.log(r, c);
  }
  return count4 >= 1 && count3 >= 1;
}

export { getNext };
