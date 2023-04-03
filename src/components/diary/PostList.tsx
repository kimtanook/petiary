import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getDiaryPost } from "../../util/api";

function PostList() {
  const { data: diaryPostData, isLoading: diaryPostLoading } = useQuery(
    ["diaryData"],
    getDiaryPost
  );
  return (
    <div>
      <div>PostList</div>
      {diaryPostData?.map((data: any) => (
        <Link
          to={`/detail-diary/${data.id}`}
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
