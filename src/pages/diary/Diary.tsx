import { Link } from "react-router-dom";
import styled from "styled-components";
import PostList from "../../components/diary/PostList";
import WriteImg from "../../img/icon/write.png";
function Diary() {
  return (
    <Wrap>
      <div>Diary</div>
      <Link to={"/diary/write"}>
        <Write src={WriteImg} />
      </Link>
      <PostList />
    </Wrap>
  );
}

export default Diary;
const Wrap = styled.div``;
const Write = styled.img`
  width: 32px;
  height: 32px;
`;
