import { useLocation } from "react-router-dom";
import styled from "styled-components";

function DetailAnimal() {
  const location = useLocation();
  const data = location.state;
  console.log("data : ", data);
  const kindCd = data.kindCd.match(/\](.*)$/)[1];

  return (
    <Wrap>
      <Img src={data.popfile} />
      <InfoBox>
        <div>{kindCd}</div>
        <div>{data.age}</div>
        <div>{data.weight}</div>
        <div>{data.happenPlace}</div>
        <div>{data.careNm}</div>
        <div>{data.sexCd}</div>
        <div>{data.neuterYn}</div>
        <div>{data.specialMark}</div>
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
  height: 400px;
`;
const InfoBox = styled.div`
  background-color: aqua;
  width: 70vw;
  max-width: 800px;
`;
