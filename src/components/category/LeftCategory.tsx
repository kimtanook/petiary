import { Link } from "react-router-dom";
import styled from "styled-components";

function LeftCategory() {
  return (
    <ButtonWrap>
      <Link to={`/diary`}>
        <Button>Diary</Button>
      </Link>
      <Link to={`/todo`}>
        <Button>Todo</Button>
      </Link>
      <Link to={`/calendar`}>
        <Button>Calendar</Button>
      </Link>
    </ButtonWrap>
  );
}

export default LeftCategory;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  border: 1px solid black;
  background-color: inherit;
  margin: 4px;
`;
