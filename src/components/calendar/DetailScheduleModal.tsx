import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import closeImg from "../../img/icon/cross-small.png";
import { deleteSchedule } from "../../util/api";

function DetailScheduleModal({ setDetailModal, item }: any) {
  const queryClient = useQueryClient();
  const { mutate: deleteScheduleMutate } = useMutation(deleteSchedule);

  const onClickDelete = (id: string) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteScheduleMutate(id, {
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
      <DetailBox>
        <CloseButton src={closeImg} onClick={() => setDetailModal(false)} />
        {item.length === 0 ? (
          <div>일정이 없습니다.</div>
        ) : (
          item.map((data: any) => (
            <ScheduleItem key={uuidv4()}>
              <div>{data.content}</div>
              <div onClick={() => onClickDelete(data.id)}>삭제</div>
            </ScheduleItem>
          ))
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

const CloseButton = styled.img`
  cursor: pointer;
  width: 32px;
  height: 32px;
`;
const ScheduleItem = styled.div`
  border: 1px solid black;
`;
