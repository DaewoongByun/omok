import { initializeApp } from "firebase/app";
import { getDocs, getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export async function recordGame(game) {
  try {
    const docRef = await addDoc(collection(db, "games"), {
      records: game.records,
      winner: game.winner,
      winnerTurn: game.winnerTurn,
    });
  } catch (e) {}
}

export async function getWinningRate() {
  const games = await getDocs(collection(db, "games"));
  let userWinCount = 0;
  let computerWinCount = 0;
  let blackTotal = 0;
  let blackWin = 0;
  let whiteTotal = 0;
  let whiteWin = 0;

  games.forEach((doc) => {
    if (doc.data().winner === "computer") {
      computerWinCount++;
      if (doc.data().winnerTurn === 1) {
        blackTotal++;
        blackWin++;
      } else {
        whiteTotal++;
        whiteWin++;
      }
    } else if (doc.data().winner === "user") {
      userWinCount++;
      if (doc.data().winnerTurn === 1) {
        whiteTotal++;
      } else {
        blackTotal++;
      }
    }
  });
  if (userWinCount + computerWinCount === 0) return "0";
  const rate = (computerWinCount / (userWinCount + computerWinCount)) * 100;
  const blackRate = (blackWin / blackTotal) * 100;
  const whiteRate = (whiteWin / whiteTotal) * 100;
  return {
    total: rate.toFixed(2),
    black: blackRate.toFixed(2),
    white: whiteRate.toFixed(2),
  };
}

export function setAnalytics() {
  const analytics = getAnalytics(app);
}
