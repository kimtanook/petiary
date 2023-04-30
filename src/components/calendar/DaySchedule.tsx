import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import deleteImg from "../../img/icon/cross-small.png";
import { deleteSchedule } from "../../util/api";

function DaySchedule({ item }: any) {
  const queryClient = useQueryClient();
  const { mutate: deleteScheduleMutate } = useMutation(deleteSchedule);

  const onClickDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteScheduleMutate(item.id, {
        onSuccess: () => {
          setTimeout(
            () => queryClient.invalidateQueries(["scheduleData"]),
            300
          );
        },
      });
    }
  };
  return (
    <Wrap>
      <Content>{item.content}</Content>
      <DeleteImg src={deleteImg} onClick={onClickDelete} />
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
