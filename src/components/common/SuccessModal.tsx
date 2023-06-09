import { useRecoilState } from "recoil";
import styled from "styled-components";
import successImg from "../../img/successImg/alert.png";
import { alertValue } from "../../util/atom";

function SuccessModal({ alertModal }: any) {
  const [customAlert, setCustomAlert] = useRecoilState(alertValue);
  return (
    <Wrap>
      <Box>
        <div>
          <AlertImg src={successImg} alt="alertImg" />
        </div>
        <Message>{alertModal.message}</Message>
        <CloseButton
          onClick={() =>
            setCustomAlert({
              toggle: false,
              message: "",
            })
          }
        >
          닫기
        </CloseButton>
      </Box>
    </Wrap>
  );
}

export default SuccessModal;
const Wrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
`;
const Box = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 160px;
  background-color: #ffe4c3;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const AlertImg = styled.img`
  width: 40px;
  height: 40px;
`;
const Message = styled.div`
  height: 72px;
  line-height: 72px;
`;
const CloseButton = styled.div`
  cursor: pointer;
  width: 60px;
  height: 20px;
  line-height: 20px;
  color: white;
  background-color: #c58a25;
  text-align: center;
  border-radius: 8px;
  font-size: 12px;
`;
