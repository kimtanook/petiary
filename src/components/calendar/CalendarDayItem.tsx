import { format } from "date-fns";
import { useState } from "react";
import styled from "styled-components";
import { createSchedule } from "../../util/api";
import { authService } from "../../util/firebase";

function CalendarDayItem({ day, scheduleData }: any) {
  const user = authService.currentUser;
  const scheduleDay = `${format(day, "yyyy")}${format(day, "M")}${format(
    day,
    "d"
  )}`;
  console.log("day : ", day);
  const sameDayData = scheduleData.filter(
    (item: any) => item.scheduleDay === scheduleDay
  );
  console.log("sameDayData : ", sameDayData);
  const [modalToggle, setModalToggle] = useState(false);
  const [scheduleValue, setScheduleVale] = useState("");
  const data = {
    uid: user?.uid,
    scheduleDay: scheduleDay,
    content: scheduleValue,
  };
  const saveSchedule = () => {
    createSchedule(data);
    setScheduleVale("");
    setModalToggle(false);
  };
  return (
    <>
      <Wrap onClick={() => setModalToggle(true)}>
        {sameDayData?.map((item: any) => (
          <div>{item.content}</div>
        ))}
      </Wrap>
      {modalToggle ? (
        <ModalWrap>
          <InputWrap>
            <Close onClick={() => setModalToggle(false)}>닫기</Close>
            <input
              onChange={(event: any) => setScheduleVale(event.target.value)}
              value={scheduleValue}
            />
            <div onClick={saveSchedule}>저장</div>
          </InputWrap>
        </ModalWrap>
      ) : null}
    </>
  );
}

export default CalendarDayItem;
const Wrap = styled.div`
  font-size: 8px;
  height: 80px;
  background-color: aqua;
`;
const ModalWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #00000051;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const InputWrap = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Close = styled.div`
  font-size: 20px;
  width: 40px;
  height: 40px;
  background-color: red;
`;
