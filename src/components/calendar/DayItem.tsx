import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import closeBtn from "../../img/icon/cross-small.png";
import addScheduleImg from "../../img/icon/square-plus.png";
import { createSchedule } from "../../util/api";
import { alertValue } from "../../util/atom";
import { authService } from "../../util/firebase";
import DaySchedule from "./DaySchedule";

function DayItem({ day, scheduleData, monthStart }: any) {
  const user = authService.currentUser;
  const queryClient = useQueryClient();
  const [alertModal, setAlertModal] = useRecoilState(alertValue);
  const [modalToggle, setModalToggle] = useState(false);
  const [scheduleValue, setScheduleVale] = useState("");
  const { mutate: scheduleMutate } = useMutation(createSchedule);
  const scheduleDay = `${format(day, "yyyy")}${format(day, "M")}${format(
    day,
    "d"
  )}`;
  const currentDay = `${format(day, "yyyy")}년 ${format(day, "M")}월 ${format(
    day,
    "d"
  )}일의 일정`;
  const sameDayData = scheduleData?.filter(
    (item: any) => item.scheduleDay === scheduleDay
  );

  const data = {
    uid: user?.uid,
    scheduleDay: scheduleDay,
    content: scheduleValue,
  };
  const saveSchedule = () => {
    if (scheduleValue) {
      scheduleMutate(data, {
        onSuccess: () =>
          setTimeout(
            () => queryClient.invalidateQueries(["scheduleData"]),
            300
          ),
      });
      setScheduleVale("");
      setModalToggle(false);
    } else {
      setAlertModal({
        toggle: true,
        message: "일정을 입력해주세요.",
      });
    }
  };
  return (
    <>
      <Wrap>
        {sameDayData?.map((item: any) => (
          <DaySchedule key={uuidv4()} item={item} />
        ))}
      </Wrap>
      <AddScheduleBtn onClick={() => setModalToggle(true)}>
        <AddScheduleImg src={addScheduleImg} />
      </AddScheduleBtn>

      {modalToggle ? (
        <ModalWrap>
          <InputWrap>
            <Close src={closeBtn} onClick={() => setModalToggle(false)} />
            <ScheduleDay>{currentDay}</ScheduleDay>
            <ScheduleInput
              onChange={(event: any) => setScheduleVale(event.target.value)}
              value={scheduleValue}
              placeholder="일정을 입력해주세요."
              maxLength={10}
            />
            <SaveBtn onClick={saveSchedule}>저장</SaveBtn>
          </InputWrap>
        </ModalWrap>
      ) : null}
    </>
  );
}

export default DayItem;
const AddScheduleImg = styled.img`
  width: 16px;
  height: 16px;
  opacity: 0.2;
  :hover {
    opacity: 1;
  }
`;
const Wrap = styled.div`
  height: 40px;
  margin: 0px 4px 0px 4px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const AddScheduleBtn = styled.div`
  cursor: pointer;
  margin: 4px;
  display: flex;
  justify-content: right;
`;
const ModalWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #00000051;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;
const InputWrap = styled.div`
  width: 300px;
  height: 180px;
  display: flex;
  flex-direction: column;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Close = styled.img`
  cursor: pointer;
  font-size: 20px;
  width: 32px;
  height: 32px;
`;
const ScheduleDay = styled.div`
  margin: 0 auto;
`;
const ScheduleInput = styled.input`
  text-align: center;
  margin: 20px auto;
  height: 32px;
  width: 200px;
  border: 1px solid #b71d51;
`;
const SaveBtn = styled.div`
  cursor: pointer;
  background-color: #4f1760;
  color: white;
  border: none;
  width: 100px;
  height: 32px;
  line-height: 32px;
  font-size: 16px;
  margin: 4px;
  text-align: center;
  margin: 0 auto;
`;
