import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getOpenDiaryPost } from "../../util/api";
import DiaryOpenPost from "./DiaryOpenPost";

function DiaryOpenPostList() {
  const { data: openPost } = useQuery(["getOpenDiaryPost"], getOpenDiaryPost, {
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 10,
  });
  return (
    <div>
      {openPost?.map((item: any) => (
        <Link
          to={`/main/${item.id}`}
          state={{ postData: item }}
          key={uuidv4()}
          style={{ textDecoration: "none", color: "black" }}
        >
          <DiaryOpenPost item={item} />
        </Link>
      ))}
    </div>
  );
}

export default DiaryOpenPostList;
