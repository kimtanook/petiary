import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppRouter from "./pages/Router";
import { authService } from "./util/firebase";

function App() {
  const [init, setInit] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        navigate("/");
      } else {
        navigate("/landing");
      }
      setInit(true);
    });
  }, []);

  return <div>{init ? <AppRouter /> : <div>로딩 중...</div>}</div>;
}

export default App;
