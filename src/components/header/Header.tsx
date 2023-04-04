import styled from "styled-components";
import Logo from "../../img/logo-row2.png";
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
  height: 70px;
`;
