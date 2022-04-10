import Head from "next/head";
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

export default function Multi() {
  const [turn, setTurn] = useState<number>(1);
  const [pan, setPan] = useState<Array<Array<number>>>(
    Array.from(new Array(19), () => Array.from(new Array(19), () => 0))
  );
  const [winningRate, setWinnigRate] = useState<string>("-");

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
  }

  async function fetchWinningRate() {
    const winnigRate = await getWinningRate();
    setWinnigRate(winnigRate);
  }

  function computerDo(pan: any, turn: any) {
    const [r, c] = getNext(pan, turn);
    const newPan = pan.map((line) => line.map((t) => t));
    game.records.push({ turn: turn, r: r, c: c });
    newPan[r][c] = turn;
    setPan(newPan);
    setTurn(3 - turn);
    const endCheckResult = checkGameEnd(pan, r, c, turn);

    if (endCheckResult) {
      game.winner = "computer";
      game.winnerTurn = turn;
      recordGame(game);
      setTimeout(() => {
        alert("당신은 패배했습니다 🤣🤣🤣🤣");
        init();
      }, 100);
      return;
    }
  }

  function handleClick(r: number, c: number, turn: number) {
    const newPan = pan.map((line) => line.map((t) => t));
    newPan[r][c] = turn;
    const endCheckResult = checkGameEnd(pan, r, c, turn);
    game.records.push({ turn: turn, r: r, c: c });

    if (endCheckResult) {
      game.winner = "user";
      game.winnerTurn = turn;
      recordGame(game);
      setTimeout(() => {
        alert("당신이 이겼습니다 😄😄😄😄");
        init();
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
    computerDo(newPan, 3 - turn);
  }

  return (
    <>
      <Head>
        <title>인간지능 오목봇</title>
        <meta name="description" content="인간지능 오목봇" />
        <meta name="keywords" content="오목,오목봇,omok" />
      </Head>
      <div className="container">
        <div className="buttons">
          <button onClick={init}>새 게임</button>
          <span>컴퓨터 승률 : {winningRate}%</span>
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
          .buttons {
            display: flex;
            flex-direction: row;
            gap: 20px;
          }
        `}
      </style>
    </>
  );
}
