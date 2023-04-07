import { Link } from "react-router-dom";
import styled from "styled-components";
import PostList from "../../components/diary/PostList";
function Diary() {
  return (
    <Wrap>
      <div>Diary</div>
      <Link to={"/diary/write"}>
        <div>포스트 작성하기</div>
      </Link>
      <PostList />
    </Wrap>
  );
}

export default Diary;
const Wrap = styled.div`
  background-color: aqua;
`;
