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
      <div
        className="line"
        style={{
          borderBottom: "2px solid black",
          borderTop: idx === 0 ? "2px solid black" : "",
        }}
      >
        {line.map((turn, i) =>
          i < 18 ? (
            <div
              key={i}
              className="kan"
              style={{
                borderLeft: "2px solid black",
                borderRight: i === 17 ? "2px solid black" : "",
              }}
            ></div>
          ) : (
            ""
          )
        )}
      </div>

      <style jsx>{`
        .line {
          display: flex;
        }
        .kan {
          width: 50px;
          height: 50px;
        }
      `}</style>
    </>
  );
}

export default function OmokPan({ pan }: OmokPanProps) {
  return (
    <>
      <div className="pan">
        {pan.map((line: Array<number>, i: number) =>
          i < 18 ? <Line line={line} idx={i} key={i} /> : ""
        )}
      </div>
      <style jsx>{`
        .pan {
          width: auto;
          padding: 50px;
          background-color: #e3b24a;
        }
      `}</style>
    </>
  );
}
