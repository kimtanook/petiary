import { format } from "date-fns";
import styled from "styled-components";

function CalendarHeader({ currentDate, beforeMonth, afterMonth }: any) {
  return (
    <Wrap>
      <DateBox>
        <Month>{format(currentDate, "M")}월</Month>
        <div>{format(currentDate, "yyyy")}년</div>
      </DateBox>
      <ButtonBox>
        <BeforeBtn onClick={beforeMonth}>{"<"}</BeforeBtn>
        <AfterBtn onClick={afterMonth}>{">"}</AfterBtn>
      </ButtonBox>
    </Wrap>
  );
}

export default CalendarHeader;
const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const DateBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const Month = styled.div`
  font-size: 24px;
`;
const ButtonBox = styled.div`
  width: 100px;
  background-color: cadetblue;
  display: flex;
  flex-direction: row;
`;
const BeforeBtn = styled.div`
  width: 50px;
  margin: 8px;
  background-color: aqua;
`;
const AfterBtn = styled.div`
  width: 50px;
  margin: 8px;
  background-color: aqua;
`;
