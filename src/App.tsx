/* eslint-disable react-hooks/exhaustive-deps */
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Loading from "./components/common/Loading";
import AppRouter from "./pages/Router";
import { authService } from "./util/firebase";

function App() {
  const [init, setInit] = useState(false);
  const user = authService.currentUser;
  const navigate = useNavigate();
  const paddingLeftRight = 32;
  const theme = {
    padding: `0 ${paddingLeftRight}px 0 ${paddingLeftRight}px`,
    width: 475,
  };
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        navigate("/main");
      } else {
        navigate("/");
      }
      setInit(true);
    });
  }, []);

  return (
    <div>
      {init ? (
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
