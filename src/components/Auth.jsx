import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();

    try {
      if (!auth.currentUser) {
        await signInWithEmailAndPassword(auth, email, password).then((res) =>
          setCookie("token", res?.user?.accessToken)
        );
        toast.success("SignIn Successfully...");
      } else {
        toast.info("Already SignIn");
      }
    } catch (error) {
      toast.error("User Not Found...");
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password).then((res) =>
        setCookie("token", res?.user?.accessToken)
      );
      toast.success("Account Created Successfully...");
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        toast.info("User Exist Login To Continue...");
      }
      return;
    }
  };

  onAuthStateChanged(auth, (user) => {
    setTimeout(() => {
      if (user) {
        navigate("/");
      }
    }, 1000);
  });

  return (
    <div className="flex flex-col min-w-screen h-screen justify-center items-center px-2 sm:px-0">
      <div className="flex overflow-hidden max-w-[25rem]">
        <form
          onSubmit={signIn}
          className={`min-w-full transform transition-all duration-[1000ms] border border-green-500 rounded-md p-5 ${
            tab ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
        >
          <h2 className="text-center text-2xl font-serif pb-5">Sign In</h2>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email..."
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password </label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn">
            Sign In
          </button>
        </form>

        <form
          onSubmit={signUp}
          className={`min-w-full transform transition-all duration-[1000ms] border border-green-500 rounded-md p-5 ${
            tab ? "translate-x-0 opacity-0" : "-translate-x-full opacity-100"
          }`}
        >
          <h2 className="text-center text-2xl font-serif pb-5">Sign Up</h2>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email..."
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password </label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
      </div>

      <div className="truncate">
        {tab ? (
          <span className="text-sm font-medium">
            Already Have An Account{" "}
            <button onClick={() => setTab(!tab)} className="link">
              Sign In
            </button>
          </span>
        ) : (
          <span className="text-sm font-medium">
            Not Have An Account{" "}
            <button onClick={() => setTab(!tab)} className="link">
              Sign Up
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default Authentication;
