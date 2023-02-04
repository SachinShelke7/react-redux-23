import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";
import useCookies from "react-cookie/cjs/useCookies";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const auth = getAuth();
  const handleSignOut = async () => {
    await signOut(auth);
    removeCookie("token");
  };
  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    }
  }, [cookies]);

  return (
    <div>
      {cookies.token && (
        <>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      )}
    </div>
  );
}

export default App;
