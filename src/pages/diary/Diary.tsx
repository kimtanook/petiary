import { Link } from "react-router-dom";
import PostList from "../../components/diary/PostList";
function Diary() {
  return (
    <div>
      <div>Diary</div>
      <Link to={"/post-form"}>
        <div>포스트 작성하기</div>
      </Link>
      <PostList />
    </div>
  );
}

export default Diary;
