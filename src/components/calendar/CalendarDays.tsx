import { useQuery } from "@tanstack/react-query";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import styled from "styled-components";
import { getSchedule } from "../../util/api";
import { authService } from "../../util/firebase";
import CalendarDayItem from "./CalendarDayItem";

function CalendarDays({ currentDate, selectDate, onClickDate }: any) {
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
        <DayBox key={dayIndex}>
          <Day day={day}>{formatDate}</Day>
          <CalendarDayItem day={day} scheduleData={scheduleData} />
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
  width: 800px;
`;
const Week = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  margin: 20px 0 20px 0;
`;
const DayBox = styled.div`
  width: 100px;
  height: 140px;
  border: 1px solid black;
`;
const Day = styled.div<{ day: any }>`
  margin: 12px;
  width: 20px;
  text-align: center;
  color: ${({ day }) =>
    format(day, "EEE") === "Sun" || format(day, "EEE") === "Sat"
      ? "red"
      : "black"};
`;
