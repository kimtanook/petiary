import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService } from "../../util/firebase";

function Logout() {
  const navigate = useNavigate();
  const onClickLogout = () => {
    signOut(authService).then(() => {
      alert("로그아웃 성공!");
      navigate("/");
    });
  };
  return (
    <div>
      {authService.currentUser ? (
        <button onClick={onClickLogout}>로그아웃</button>
      ) : null}
    </div>
  );
}

export default Logout;
