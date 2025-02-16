import { useState, useEffect } from "react";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

const auth = getAuth(app);
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Signup />
          <Signin />
        </div>
      )}
    </div>
  );
}

export default App;
