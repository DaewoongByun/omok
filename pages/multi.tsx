import { useEffect, useState } from "react";
import OmokPan from "../components/OmokPan";
import { checkGameEnd, checkRules } from "../utils/check";

export default function Multi() {
  const [turn, setTurn] = useState<number>(1);
  const [pan, setPan] = useState<Array<Array<number>>>(
    Array.from(new Array(19), () => Array.from(new Array(19), () => 0))
  );

  function init() {
    setTurn(1);
    setPan(Array.from(new Array(19), () => Array.from(new Array(19), () => 0)));
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
      alert(endCheckResult);
      init();
      return;
    }
    setPan(newPan);
    setTurn(3 - turn);
  }

  return (
    <>
      <div>
        <OmokPan pan={pan} turn={turn} onClick={handleClick} />
      </div>
      <style jsx>
        {`
          div {
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
}
