import styled from "styled-components";
import Logo from "../../img/logo/logo-row2.png";
import Logout from "./Logout";

function Header() {
  return (
    <Wrap>
      <img src={Logo} alt="logo" height={50} />
      <Logout />
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
  padding: 0px 16px 0px 16px;
  height: 70px;
  background-color: white;
  position: relative;
`;
