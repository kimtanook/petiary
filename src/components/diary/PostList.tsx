import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getDiaryPost } from "../../util/api";

function PostList() {
  const { data: diaryPostData, isLoading: diaryPostLoading } = useQuery(
    ["diaryData"],
    getDiaryPost
  );
  console.log("diaryPostData : ", diaryPostData);
  return (
    <div>
      <div>PostList</div>
      {diaryPostData?.map((data: any) => (
        <Link to={`/detail-diary/${data.id}`} state={{ postData: data }}>
          <div>{data.title}</div>
        </Link>
      ))}
    </div>
  );
}

export default PostList;
