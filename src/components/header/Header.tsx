import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../img/logo/logo-row2.png";
import { getUserData } from "../../util/api";
import { authService } from "../../util/firebase";
import Logout from "./Logout";

function Header() {
  const navigate = useNavigate();
  const user = authService.currentUser;
  const { data: userData } = useQuery(["getUserData", user?.uid], getUserData);

  return (
    <Wrap>
      <img src={Logo} alt="logo" height={50} />
      <HeaderRight>
        <Profile src={userData?.userImg} onClick={() => navigate("/my-page")} />
        <Logout />
      </HeaderRight>
    </Wrap>
  );
}

export default Header;
const Wrap = styled.div`
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  background-color: white;
  position: relative;
  padding: ${({ theme }) => theme.padding};
`;
const HeaderRight = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80px;
`;
const Profile = styled.img`
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
