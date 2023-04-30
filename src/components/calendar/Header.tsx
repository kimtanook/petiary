import { format } from "date-fns";
import styled from "styled-components";
import leftArrow from "../../img/icon/angle-square-left.png";
import rightArrow from "../../img/icon/angle-square-right.png";

function CalendarHeader({ currentDate, beforeMonth, afterMonth }: any) {
  return (
    <Wrap>
      <DateBox>
        <Month>{format(currentDate, "M")}월</Month>
        <div>{format(currentDate, "yyyy")}년</div>
      </DateBox>
      <ButtonBox>
        <BeforeBtn src={leftArrow} onClick={beforeMonth} />
        <AfterBtn src={rightArrow} onClick={afterMonth} />
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
  width: 48px;
  font-size: 24px;
`;
const ButtonBox = styled.div`
  width: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const BeforeBtn = styled.img`
  width: 32px;
  margin: 4px;
  cursor: pointer;
  opacity: 0.4;
  :hover {
    opacity: 1;
  }
`;
const AfterBtn = styled.img`
  width: 32px;
  margin: 4px;
  cursor: pointer;
  opacity: 0.4;
  :hover {
    opacity: 1;
  }
`;
