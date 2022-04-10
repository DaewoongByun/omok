import { initializeApp } from "firebase/app";
import { getDocs, getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
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
  games.forEach((doc) => {
    if (doc.data().winner === "computer") {
      computerWinCount++;
    } else if (doc.data().winner === "user") {
      userWinCount++;
    }
  });
  if (userWinCount + computerWinCount === 0) return "0";
  const rate = (computerWinCount / (userWinCount + computerWinCount)) * 100;
  return rate.toFixed(2);
}
