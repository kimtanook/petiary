import { useRecoilState } from "recoil";
import styled from "styled-components";
import alertImg from "../../img/alert/alert.png";
import { alertValue } from "../../util/atom";

function AlertModal({ alertModal }: any) {
  const [customAlert, setCustomAlert] = useRecoilState(alertValue);
  return (
    <Wrap>
      <Box>
        <div>
          <AlertImg src={alertImg} alt="alertImg" />
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
          확인
        </CloseButton>
      </Box>
    </Wrap>
  );
}

export default AlertModal;
const Wrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: #0000005d;
  backdrop-filter: blur(10px);
`;
const Box = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 160px;
  background-color: white;
  color: black;
  font-size: 20px;
  font-weight: 500;
  border: 3px solid #ce9ab8;
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
  background-color: #641c5e;
  text-align: center;
  border-radius: 8px;
  font-size: 12px;
`;
