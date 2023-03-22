import styled from "styled-components";
import Logo from "../../img/logo.png";
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
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: black;
  height: 70px;
`;
