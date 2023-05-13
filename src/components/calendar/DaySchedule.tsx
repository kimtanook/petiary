import styled from "styled-components";

function DaySchedule({ item }: any) {
  return (
    <Wrap>
      <Content>{item.content}</Content>
      {/* <DeleteImg src={deleteImg} onClick={onClickDelete} /> */}
    </Wrap>
  );
}

export default DaySchedule;
const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffb7cf;
  margin-bottom: 2px;
`;
const Content = styled.div`
  font-size: 12px;
`;
const DeleteImg = styled.img`
  cursor: pointer;
  width: 16px;
  height: 16px;
`;
