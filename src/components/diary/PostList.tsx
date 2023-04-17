import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { getDiaryPost } from "../../util/api";
import { authService } from "../../util/firebase";

function PostList() {
  const uid = authService.currentUser?.uid;
  const { data: diaryPostData } = useQuery(["diaryData", uid], getDiaryPost, {
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 10,
  });
  return (
    <div>
      {diaryPostData?.map((data: any) => (
        <PostItemWrap key={uuidv4()}>
          <Link
            to={`/diary/${data.id}`}
            state={{ postData: data }}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div>{data.title}</div>
          </Link>
        </PostItemWrap>
      ))}
    </div>
  );
}

export default PostList;
const PostItemWrap = styled.div`
  background-color: aqua;
`;
