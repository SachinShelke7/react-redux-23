import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCGz6bMvKttyRhPzYwW9raiWX-BGyFSB1c",
  authDomain: "crud-auth-a4b73.firebaseapp.com",
  projectId: "crud-auth-a4b73",
  storageBucket: "crud-auth-a4b73.appspot.com",
  messagingSenderId: "969220499876",
  appId: "1:969220499876:web:442e548ca7cf160aeab931",
  measurementId: "G-9DYW73ERFP",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
