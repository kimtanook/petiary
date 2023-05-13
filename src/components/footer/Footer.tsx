import styled from "styled-components";
import logo from "../../img/logo/logo.png";

function Footer() {
  return (
    <Wrap>
      <FooterTop>
        <LogoBox>
          <Img src={logo} /> PETIARY
        </LogoBox>
        <FooterItem>서비스소개 | 이용약관</FooterItem>
        <FooterItem>고객센터 | 개인정보 처리방침</FooterItem>
      </FooterTop>
      <FooterBottom>
        <FooterItem>펫티어리 Petiary - Pet Diary</FooterItem>
        <FooterItem>icon by flaticon, Smashicons</FooterItem>
      </FooterBottom>
    </Wrap>
  );
}

export default Footer;

const Wrap = styled.div`
  height: 180px;
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const FooterTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 450px) {
    flex-direction: column;
    border-bottom: 1px solid black;
  }
`;
const LogoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 24px;
`;
const Img = styled.img`
  height: 32px;
  margin-right: 8px;
`;
const FooterItem = styled.div`
  margin: 4px;
`;
const FooterBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 450px) {
    flex-direction: column;
  }
`;
