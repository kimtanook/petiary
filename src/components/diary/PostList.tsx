import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getDiaryPost } from "../../util/api";
import { authService } from "../../util/firebase";

function PostList() {
  const uid = authService.currentUser?.uid;
  const { data: diaryPostData } = useQuery(["diaryData", uid], getDiaryPost);
  return (
    <div>
      <div>PostList</div>
      {diaryPostData?.map((data: any) => (
        <Link
          to={`/diary/${data.id}`}
          state={{ postData: data }}
          key={uuidv4()}
        >
          <div>{data.title}</div>
        </Link>
      ))}
    </div>
  );
}

export default PostList;
