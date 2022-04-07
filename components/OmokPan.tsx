type OmokPanProps = {
  pan: Array<Array<number>>;
  turn: number;
  onClick: Function;
};

type LineProps = {
  line: Array<number>;
  idx: number;
  turn: number;
  onClick: Function;
};

function Line({ line, idx, turn, onClick }: LineProps) {
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
              <div className="black dol"></div>
            ) : num === 2 ? (
              <div className="white dol"></div>
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
          width: 50px;
          height: 50px;
        }
        .binkan {
          width: 50px;
          height: 50px;
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
          width: 50px;
          height: 50px;
          border-radius: 100%;
          position: absolute;
          transform: translate(calc(-50% - 1px), calc(-50% - 1px));
          z-index: 9999;
        }
        .black {
          background-color: black;
        }
        .white {
          background-color: white;
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

export default function OmokPan({ pan, turn, onClick }: OmokPanProps) {
  return (
    <>
      <div className="pan">
        {pan.map((line: Array<number>, i: number) => (
          <Line line={line} idx={i} turn={turn} onClick={onClick} key={i} />
        ))}
      </div>
      <style jsx>{`
        .pan {
          width: auto;
          padding: 50px 0 0 50px;
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
