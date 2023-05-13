import { Link } from "react-router-dom";
import styled from "styled-components";
import femaleImg from "../../img/icon/female.png";
import home from "../../img/icon/home.png";
import maleImg from "../../img/icon/male.png";
import spot from "../../img/icon/spot.png";

function AnimalItem({ item }: any) {
  const kindCd = item.kindCd.match(/\](.*)$/)[1];
  return (
    <Link
      to={`/shelter/${item.desertionNo}`}
      state={item}
      style={{ textDecorationLine: "none", color: "black" }}
    >
      <Wrap>
        <Img urlImg={item.popfile} />
        <Info>
          <NameGender>
            <Name>{kindCd}</Name>
            {item.sexCd === "M" ? (
              <MaleImg src={maleImg} />
            ) : (
              <FemaleImg src={femaleImg} />
            )}
          </NameGender>
          <FlexBox>
            <InfoImg src={spot} />
            {item.happenPlace}
          </FlexBox>
          <FlexBox>
            <InfoImg src={home} />
            {item.careNm}
          </FlexBox>
        </Info>
      </Wrap>
    </Link>
  );
}

export default AnimalItem;
const Wrap = styled.div`
  margin: 12px;
  width: 200px;
  height: 230px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  :hover {
    scale: 1.01;
  }
`;
const Img = styled.div<{ urlImg: string }>`
  background-image: url(${(props) => props.urlImg});
  background-position: center;
  background-size: cover;
  width: 200px;
  height: 120px;
`;
const Info = styled.div`
  width: 180px;
  height: 100px;
  margin: 8px auto;
  overflow-y: scroll;
  font-size: 12px;
`;
const NameGender = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Name = styled.div`
  font-size: 20px;
  margin: 4px;
`;
const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  margin: 4px;
`;
const MaleImg = styled.img`
  width: 20px;
  height: 20px;
`;
const FemaleImg = styled.img`
  width: 20px;
  height: 20px;
`;
const InfoImg = styled.img`
  width: 16px;
  margin-right: 8px;
`;
