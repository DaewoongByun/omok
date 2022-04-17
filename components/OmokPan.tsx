type OmokPanProps = {
  pan: Array<Array<number>>;
  turn: number;
  onClick: Function;
  lastComputerLocation: Array<number>;
};

type LineProps = {
  line: Array<number>;
  idx: number;
  turn: number;
  lastComputerLocation: Array<number>;
  onClick: Function;
};

function Line({ line, idx, turn, lastComputerLocation, onClick }: LineProps) {
  return (
    <>
      <div className="line">
        {line.map((num, i) => (
          <div
            key={i}
            className={i % 6 === 3 && idx % 6 === 3 ? "kan dot" : "kan"}
            style={{
              borderLeft: idx !== 18 && i !== 18 ? "2px solid black" : "",
              borderRight: idx !== 18 && i === 17 ? "2px solid black" : "",
              borderTop: i !== 18 ? "2px solid black" : "",
            }}
          >
            {num === 1 ? (
              <div
                className={`black dol ${
                  idx === lastComputerLocation[0] &&
                  i === lastComputerLocation[1]
                    ? "last"
                    : ""
                }`}
              ></div>
            ) : num === 2 ? (
              <div
                className={`white dol ${
                  idx === lastComputerLocation[0] &&
                  i === lastComputerLocation[1]
                    ? "last"
                    : ""
                }`}
              ></div>
            ) : (
              <div
                className="binkan"
                onClick={() => onClick(idx, i, turn)}
              ></div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .line {
          display: flex;
        }
        .kan {
          width: 44px;
          height: 44px;
        }
        .binkan {
          width: 44px;
          height: 44px;
          border-radius: 100%;
          position: absolute;
          transform: translate(calc(-50% - 1px), calc(-50% - 1px));
          opacity: 0.7;
          z-index: 9999;
          cursor: pointer;
        }
        .binkan:hover {
          background-color: ${turn === 1 ? "black" : "white"};
        }
        .dot::after {
          content: "";
          display: inline-block;
          width: 10px;
          height: 10px;
          background-color: black;
          position: absolute;
          border-radius: 100%;
          transform: translate(calc(-50% - 1px), calc(-50% - 1px));
        }
        .dol {
          width: 44px;
          height: 44px;
          border-radius: 100%;
          position: absolute;
          transform: translate(calc(-50% - 1px), calc(-50% - 1px));
          z-index: 9999;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }
        .black {
          background-color: black;
        }
        .white {
          background-color: white;
        }
        .last {
          box-shadow: 0 0 3px 2px rgba(232, 52, 14, 1);
        }

        @media screen and (max-width: 1000px) {
          .kan {
            width: 40px;
            height: 40px;
          }
          .binkan {
            width: 40px;
            height: 40px;
          }
          .dot::after {
            width: 10px;
            height: 10px;
          }
          .dol {
            width: 40px;
            height: 40px;
          }
        }
        @media screen and (max-width: 800px) {
          .kan {
            width: 30px;
            height: 30px;
          }
          .binkan {
            width: 30px;
            height: 30px;
          }
          .dot::after {
            width: 8px;
            height: 8px;
          }
          .dol {
            width: 30px;
            height: 30px;
          }
        }
        @media screen and (max-width: 600px) {
          .kan {
            width: 20px;
            height: 20px;
          }
          .binkan {
            width: 20px;
            height: 20px;
          }
          .dot::after {
            width: 6px;
            height: 6px;
          }
          .dol {
            width: 20px;
            height: 20px;
          }
        }
        @media screen and (max-width: 400px) {
          .kan {
            width: 18px;
            height: 18px;
          }
          .binkan {
            width: 18px;
            height: 18px;
          }
          .dot::after {
            width: 6px;
            height: 6px;
          }
          .dol {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
    </>
  );
}

export default function OmokPan({
  pan,
  turn,
  onClick,
  lastComputerLocation,
}: OmokPanProps) {
  return (
    <>
      <div className="pan">
        {pan.map((line: Array<number>, i: number) => (
          <Line
            line={line}
            idx={i}
            turn={turn}
            onClick={onClick}
            lastComputerLocation={lastComputerLocation}
            key={i}
          />
        ))}
      </div>
      <style jsx>{`
        .pan {
          width: auto;
          padding: 44px 0 0 44px;
          background-color: #e3b24a;
        }
        @media screen and (max-width: 1000px) {
          .pan {
            padding: 40px 0 0 40px;
          }
        }
        @media screen and (max-width: 800px) {
          .pan {
            padding: 30px 0 0 30px;
          }
        }
        @media screen and (max-width: 600px) {
          .pan {
            padding: 20px 0 0 20px;
          }
        }
        @media screen and (max-width: 400px) {
          .pan {
            padding: 18px 0 0 18px;
          }
        }
      `}</style>
    </>
  );
}
