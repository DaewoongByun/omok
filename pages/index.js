import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <Link href="single">
          <a>유저 vs 컴퓨터</a>
        </Link>
        <Link href="multi">
          <a>유저 vs 유저</a>
        </Link>
      </div>
    </>
  );
}
