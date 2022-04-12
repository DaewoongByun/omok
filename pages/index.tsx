import { useEffect, useState } from "react";
import OmokPan from "../components/OmokPan";
import { checkGameEnd, checkRules } from "../utils/check";
import { getNext } from "../utils/computer";
import { getWinningRate, recordGame, setAnalytics } from "../utils/firebase";

interface Record {
  turn: number;
  r: number;
  c: number;
}

interface Game {
  records: Array<Record>;
  winner: string;
  winnerTurn: number;
}

let computer: number;
let user: number;

let game: Game = {
  records: [],
  winner: "",
  winnerTurn: 0,
};

let gameEnd: boolean = false;

export default function Multi() {
  const [turn, setTurn] = useState<number>(1);
  const [pan, setPan] = useState<Array<Array<number>>>(
    Array.from(new Array(19), () => Array.from(new Array(19), () => 0))
  );
  const [winningRate, setWinningRate] = useState<string>("-");
  const [blackWinningRate, setBlackWinningRate] = useState<string>("-");
  const [whtieWinningRate, setWhtieWinningRate] = useState<string>("-");

  useEffect(() => {
    init();
    setAnalytics();
  }, []);

  function init() {
    game = {
      records: [],
      winner: "",
      winnerTurn: 0,
    };
    setTurn(1);
    const newPan = Array.from(new Array(19), () =>
      Array.from(new Array(19), () => 0)
    );
    setPan(newPan);
    computer = Math.floor(Math.random() * 2 + 1);
    user = 3 - computer;
    if (1 === computer) {
      computerDo(newPan, 1);
    }
    fetchWinningRate();
    gameEnd = false;
  }

  async function fetchWinningRate() {
    const winnigRate: any = await getWinningRate();
    setWinningRate(winnigRate.total);
    setBlackWinningRate(winnigRate.black);
    setWhtieWinningRate(winnigRate.white);
  }

  function computerDo(pan: any, turn: any) {
    if (gameEnd) return;
    const [r, c] = getNext(pan, turn);
    const newPan = pan.map((line) => line.map((t) => t));
    game.records.push({ turn: turn, r: r, c: c });
    newPan[r][c] = turn;
    setPan(newPan);
    setTurn(3 - turn);
    const endCheckResult = checkGameEnd(pan, r, c, turn);

    if (endCheckResult) {
      gameEnd = true;
      game.winner = "computer";
      game.winnerTurn = turn;
      recordGame(game);
      setTimeout(() => {
        alert("당신은 패배했습니다 🤣🤣🤣🤣");
      }, 100);
      return;
    }
  }

  function handleClick(r: number, c: number, turn: number) {
    if (gameEnd) return;
    const newPan = pan.map((line) => line.map((t) => t));
    newPan[r][c] = turn;
    const endCheckResult = checkGameEnd(pan, r, c, turn);
    game.records.push({ turn: turn, r: r, c: c });

    if (endCheckResult) {
      gameEnd = true;
      game.winner = "user";
      game.winnerTurn = turn;
      recordGame(game);
      setTimeout(() => {
        alert("당신이 이겼습니다 😄😄😄😄");
      }, 100);
      setPan(newPan);
      return;
    }
    const ruleCheckResult = checkRules(pan, r, c, turn);
    if (ruleCheckResult) {
      alert(ruleCheckResult);
      return;
    }
    setPan(newPan);
    setTurn(3 - turn);
    setTimeout(() => {
      computerDo(newPan, 3 - turn);
    }, 200);
  }

  return (
    <>
      <div className="container">
        <button onClick={init}>새 게임</button>
        <div className="info">
          <span>컴퓨터 승률 : {winningRate}%</span>
          <span>흑 승률 : {blackWinningRate}%</span>
          <span>백 승률 : {whtieWinningRate}%</span>
        </div>
        <OmokPan pan={pan} turn={turn} onClick={handleClick} />
      </div>
      <style jsx>
        {`
          .container {
            width: 100%;
            padding-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            align-items: center;
            justify-content: center;
          }
          .info {
            display: flex;
            gap: 20px;
            text-align: center;
            font-size: 16px;
          }
          @media screen and (max-width: 600px) {
            .info {
              font-size: 14px;
            }
          }
        `}
      </style>
    </>
  );
}
