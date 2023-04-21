import styled from "styled-components";
import logo from "../../img/logo/logo.png";

function Footer() {
  return (
    <Wrap>
      <FooterTop>
        <Img src={logo} />
        <FooterItem>서비스소개 |</FooterItem>
        <FooterItem>이용약관 |</FooterItem>
        <FooterItem>고객센터 |</FooterItem>
        <FooterItem>개인정보 처리방침</FooterItem>
      </FooterTop>
      <FooterBottom>
        <FooterItem>
          펫티어리 Petiary - Pet Diary | icon by Smashicons
        </FooterItem>
      </FooterBottom>
    </Wrap>
  );
}

export default Footer;

const Wrap = styled.div`
  height: 180px;
  border-top: 1px solid #c7c7c7;
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
  }
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
`;
