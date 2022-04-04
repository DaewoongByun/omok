import { useEffect, useState } from "react";
import OmokPan from "../components/OmokPan";
import { checkGameEnd, checkRules } from "../utils/check";
import { useRouter } from "next/router";
import { getNext } from "../utils/computer";

let computer: number;
let user: number;

export default function Multi() {
  const [turn, setTurn] = useState<number>(1);
  const [pan, setPan] = useState<Array<Array<number>>>(
    Array.from(new Array(19), () => Array.from(new Array(19), () => 0))
  );

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (turn === computer) computerDo();
  }, [turn]);

  const router = useRouter();

  function init() {
    setTurn(1);
    setPan(Array.from(new Array(19), () => Array.from(new Array(19), () => 0)));
    computer = Math.floor(Math.random() * 2 + 1);
    user = 3 - computer;
    if (1 === computer) {
      computerDo();
    }
    alert(`당신은 ${user === 1 ? "흑" : "백"}입니다.`);
  }

  function computerDo() {
    setTimeout(() => {
      const [r, c] = getNext(pan, turn);
      const newPan = pan.map((line) => line.map((t) => t));
      newPan[r][c] = turn;
      setPan(newPan);
      setTurn(3 - turn);
    }, 1000);
  }

  function handleClick(r: number, c: number, turn: number) {
    const newPan = pan.map((line) => line.map((t) => t));
    newPan[r][c] = turn;
    const ruleCheckResult = checkRules(pan, r, c, turn);
    if (ruleCheckResult) {
      alert(ruleCheckResult);
      return;
    }
    const endCheckResult = checkGameEnd(pan, r, c, turn);

    if (endCheckResult) {
      const result = alert(endCheckResult);
      console.log(result);
      init();
      return;
    }
    setPan(newPan);
    setTurn(3 - turn);
  }

  return (
    <>
      <div className="container">
        <div className="buttons">
          <button onClick={init}>새 게임</button>
          <button onClick={() => router.back()}>뒤로가기</button>
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
