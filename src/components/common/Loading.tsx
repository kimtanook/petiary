import styled from "styled-components";
import loadingImage from "../../img/loading/loading.gif";
function Loading() {
  return (
    <Wrap>
      <LoadingBox>
        <Img src={loadingImage} alt="loadingImage" />
        <LoadingTitle>잠시만 기다려주세요!</LoadingTitle>
      </LoadingBox>
    </Wrap>
  );
}

export default Loading;
const Wrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: #cecece33;
  backdrop-filter: blur(4px);
`;
const LoadingBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Img = styled.img`
  width: 300px;
`;
const LoadingTitle = styled.div`
  position: absolute;
  top: 180px;
  width: 300px;
  text-align: center;
`;
