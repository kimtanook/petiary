import { addMonths, subMonths } from "date-fns";
import { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Days from "./Days";
import Header from "./Header";

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
  const dayOfTheWeekBox = ["일", "월", "화", "수", " 목", "금", "토"];
  return (
    <Wrap>
      <Header
        currentDate={currentDate}
        beforeMonth={beforeMonth}
        afterMonth={afterMonth}
      />
      <DayOfTheWeekBox>
        {dayOfTheWeekBox.map((day: any) => (
          <DayOfTheWeek key={uuidv4()}>{day}</DayOfTheWeek>
        ))}
      </DayOfTheWeekBox>
      <Days currentDate={currentDate} />
    </Wrap>
  );
}

export default CalendarBody;
const Wrap = styled.div`
  width: 60vw;
  max-width: 800px;
  min-width: 360px;
  margin-top: 12px;
`;
const DayOfTheWeekBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #b71d51;
`;
const DayOfTheWeek = styled.div`
  margin: 4px;
  width: 40px;
  text-align: center;
  color: white;
`;
