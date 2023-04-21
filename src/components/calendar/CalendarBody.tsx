import { addMonths, subMonths } from "date-fns";
import { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import CalendarDays from "./CalendarDays";
import CalendarHeader from "./CalendarHeader";

function CalendarBody() {
  const [currentDate, setCurrentMonth] = useState(new Date());
  const [selectDate, setSelectDate] = useState(new Date());
  const beforeMonth = () => {
    setCurrentMonth(subMonths(currentDate, 1));
  };
  const afterMonth = () => {
    setCurrentMonth(addMonths(currentDate, 1));
  };
  const onClickDate = (day: any) => {
    setSelectDate(day);
  };
  const days = ["일", "월", "화", "수", " 목", "금", "토"];
  return (
    <Wrap>
      <CalendarHeader
        currentDate={currentDate}
        beforeMonth={beforeMonth}
        afterMonth={afterMonth}
      />
      <DaysBox>
        {days.map((day: any) => (
          <Day key={uuidv4()}>{day}</Day>
        ))}
      </DaysBox>
      <CalendarDays
        currentDate={currentDate}
        selectDate={selectDate}
        onClickDate={onClickDate}
      />
    </Wrap>
  );
}

export default CalendarBody;
const Wrap = styled.div``;

const DaysBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 800px;
  background-color: #b71d51;
`;
const Day = styled.div`
  margin: 4px;
  width: 40px;
  text-align: center;
  color: white;
`;
