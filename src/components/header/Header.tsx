import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../img/logo/logo.png";
import { getUserData } from "../../util/api";
import { authService } from "../../util/firebase";
import Logout from "./Logout";

function Header() {
  const navigate = useNavigate();
  const user = authService.currentUser;
  const { data: userData } = useQuery(["getUserData", user?.uid], getUserData);

  return (
    <Wrap>
      <LogoBox>
        <img src={Logo} alt="logo" height={50} />
        <LogoTitle>PETIARY</LogoTitle>
      </LogoBox>
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
const LogoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const LogoTitle = styled.div`
  font-weight: 700;
  font-size: 40px;
  text-align: center;
  margin-left: 4px;
  height: 40px;
  color: #b71d51;
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
  border-radius: 8px;
`;
