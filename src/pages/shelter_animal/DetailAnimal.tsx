import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import femaleImg from "../../img/icon/female.png";
import maleImg from "../../img/icon/male.png";

function DetailAnimal() {
  const location = useLocation();
  const data = location.state;
  const kindCd = data.kindCd.match(/\](.*)$/)[1];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrap>
      <Img src={data.popfile} />
      <InfoBox>
        <KindBox>{kindCd}</KindBox>
        <AgeBox>
          <Title>나이</Title>
          {data.age}
        </AgeBox>
        <WeightBox>
          <Title>무게</Title>
          {data.weight}
        </WeightBox>
        <PlaceBox>
          <Title>발견장소</Title>
          {data.happenPlace}
        </PlaceBox>
        <ShelterBox>
          <Title>보호소</Title> {data.careNm}
        </ShelterBox>
        <GenderBox>
          <Title>성별</Title>{" "}
          <GenderImg
            src={data.sexCd === "M" ? maleImg : femaleImg}
            alt="gender-img"
          />
        </GenderBox>
        <NeuterBox>
          <Title>중성화 </Title>
          {data.neuterYn === "Y" ? "완료" : "미완료"}
        </NeuterBox>
        <SpecialMarkBox>
          <Title>특이사항</Title> {data.specialMark}
        </SpecialMarkBox>
      </InfoBox>
    </Wrap>
  );
}

export default DetailAnimal;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Img = styled.img`
  width: 100vw;
  max-width: 500px;
`;
const InfoBox = styled.div`
  margin-top: 12px;
  width: 80vw;
  max-width: 500px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: gray;
`;
const GenderBox = styled.div`
  margin-bottom: 12px;
`;
const GenderImg = styled.img`
  width: 20px;
`;
const KindBox = styled.div`
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: 700;
`;
const AgeBox = styled.div`
  margin-bottom: 12px;
`;
const WeightBox = styled.div`
  margin-bottom: 12px;
`;
const PlaceBox = styled.div`
  margin-bottom: 12px;
`;
const ShelterBox = styled.div`
  margin-bottom: 12px;
`;
const NeuterBox = styled.div`
  margin-bottom: 12px;
`;
const SpecialMarkBox = styled.div`
  margin-bottom: 12px;
`;
