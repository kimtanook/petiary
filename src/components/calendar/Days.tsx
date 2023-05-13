import { useQuery } from "@tanstack/react-query";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import styled from "styled-components";
import { getSchedule } from "../../util/api";
import { authService } from "../../util/firebase";
import DayItem from "./DayItem";

function CalendarDays({ currentDate }: any) {
  const user = authService.currentUser;
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const { data: scheduleData } = useQuery(
    ["scheduleData", user?.uid],
    getSchedule
  );
  const rows: any = [];
  let days: any = [];
  let day = startDate;
  let formatDate = "";
  let dayIndex = 0;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formatDate = format(day, "d");
      days.push(
        <DayBox key={dayIndex} day={day} monthStart={monthStart}>
          <Day day={day} monthStart={monthStart}>
            {formatDate}
          </Day>
          {isSameMonth(day, monthStart) ? (
            <DayItem day={day} scheduleData={scheduleData} />
          ) : null}
        </DayBox>
      );
      day = addDays(day, 1);
      dayIndex++;
    }
    rows.push(<Week key={`week-${dayIndex}`}>{days}</Week>);
    days = [];
  }

  return <Wrap>{rows}</Wrap>;
}

export default CalendarDays;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
  max-width: 800px;
  min-width: 360px;
`;
const Week = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  margin: 4px 0 4px 0;
`;
const DayBox = styled.div<{ day: any; monthStart: any }>`
  width: 100px;
  height: 100px;
  margin: 4px;
  border-bottom: 1px solid
    ${({ day, monthStart }) =>
      !isSameMonth(day, monthStart) ? "white" : "#c6c6c6"};
`;
const Day = styled.div<{ day: any; monthStart: any }>`
  margin: 8px;
  width: 20px;
  text-align: center;
  color: ${({ day, monthStart }) =>
    !isSameMonth(day, monthStart)
      ? "#d1d1d1"
      : format(day, "EEE") === "Sun" || format(day, "EEE") === "Sat"
      ? "red"
      : "black"};
`;
