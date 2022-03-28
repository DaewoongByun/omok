import { useEffect, useState } from "react";
import OmokPan from "../components/OmokPan";

export default function Multi() {
  const [turn, setTurn] = useState<number>(2);
  const [pan, setPan] = useState<Array<Array<number>>>(
    Array.from(new Array(19), () => Array.from(new Array(19), () => 0))
  );

  return (
    <>
      <div>
        <OmokPan pan={pan} turn={turn} />
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
