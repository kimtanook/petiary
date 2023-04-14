import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import exitIcon from "../../img/icon/exit.png";
import { Alert } from "../../util/atom";
import { authService } from "../../util/firebase";

function Logout() {
  const navigate = useNavigate();
  const [alertModal, setAlertModal] = useRecoilState(Alert);
  const onClickLogout = () => {
    signOut(authService).then(() => {
      setAlertModal({
        toggle: true,
        message: "로그아웃 성공!",
      });
      navigate("/");
    });
  };
  return (
    <div>
      {authService.currentUser ? (
        <LogoutImg src={exitIcon} onClick={onClickLogout} />
      ) : null}
    </div>
  );
}

export default Logout;

const LogoutImg = styled.img`
  cursor: pointer;
  width: 28px;
  height: 28px;
`;
