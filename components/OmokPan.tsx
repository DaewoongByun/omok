type OmokPanProps = {
  pan: Array<Array<number>>;
};

type LineProps = {
  line: Array<number>;
  idx: number;
};

function Line({ line, idx }: LineProps) {
  return (
    <>
      <div className="line">
        {line.map((turn, i) => (
          <div
            key={i}
            className={i % 6 === 3 && idx % 6 === 3 ? "kan dot" : "kan"}
            style={{
              borderLeft: idx !== 18 && i !== 18 ? "2px solid black" : "",
              borderRight: idx !== 18 && i === 17 ? "2px solid black" : "",
              borderTop: i !== 18 ? "2px solid black" : "",
            }}
          ></div>
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
      `}</style>
    </>
  );
}

export default function OmokPan({ pan }: OmokPanProps) {
  return (
    <>
      <div className="pan">
        {pan.map((line: Array<number>, i: number) => (
          <Line line={line} idx={i} key={i} />
        ))}
      </div>
      <style jsx>{`
        .pan {
          width: auto;
          padding: 50px 0 0 50px;
          background-color: #e3b24a;
        }
      `}</style>
    </>
  );
}
