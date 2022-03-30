import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container">
        <Link href="single">
          <a>유저 vs 컴퓨터</a>
        </Link>
        <Link href="multi">
          <a>유저 vs 유저</a>
        </Link>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          gap: 40px;
        }
        a {
          font-size: 24px;
        }
      `}</style>
    </>
  );
}
