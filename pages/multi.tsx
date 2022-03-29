import { useEffect, useState } from "react";
import OmokPan from "../components/OmokPan";

export default function Multi() {
  const [turn, setTurn] = useState<number>(1);
  const [pan, setPan] = useState<Array<Array<number>>>(
    Array.from(new Array(19), () => Array.from(new Array(19), () => 0))
  );

  function handleClick(r: number, c: number, turn: number) {
    const newPan = pan.map((line) => line.map((t) => t));
    newPan[r][c] = turn;
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
