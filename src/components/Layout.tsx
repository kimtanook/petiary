import { useRecoilValue } from "recoil";
import styled from "styled-components";
import up from "../img/icon/up.png";
import { alertValue, editProfileValue } from "../util/atom";
import AlertModal from "./common/AlertModal";
import EditProfileModal from "./mypage/EditProfileModal";

function Layout() {
  const alertModal = useRecoilValue(alertValue);
  const editProfileModal = useRecoilValue(editProfileValue);

  return (
    <div>
      {alertModal.toggle ? <AlertModal alertModal={alertModal} /> : null}
      {editProfileModal ? <EditProfileModal /> : null}
      <Top
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      >
        <TopImg src={up} />
        <div>TOP</div>
      </Top>
    </div>
  );
}

export default Layout;
const Top = styled.div`
  cursor: pointer;
  position: fixed;
  top: 90%;
  right: 50px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
`;

const TopImg = styled.img`
  width: 28px;
  height: 28px;
  margin-bottom: 4px;
`;
