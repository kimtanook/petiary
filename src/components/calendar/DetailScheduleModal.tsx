import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

function DetailScheduleModal({ setDetailModal, item }: any) {
  return (
    <Wrap>
      <DetailBox>
        <BackBtn onClick={() => setDetailModal(false)}>뒤로</BackBtn>
        {item.length === 0 ? (
          <div>일정이 없습니다.</div>
        ) : (
          item.map((data: any) => <div key={uuidv4()}>{data.content}</div>)
        )}
      </DetailBox>
    </Wrap>
  );
}

export default DetailScheduleModal;
const Wrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: #00000039;
  z-index: 1;
`;
const DetailBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 400px;
  height: 400px;
`;
const BackBtn = styled.div`
  cursor: pointer;
  width: 40px;
  height: 32px;
  background-color: aqua;
`;
