import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { getOpenDiaryPost } from "../../util/api";

function DiaryOpenPost() {
  const { data } = useQuery(["getOpenDiaryPost"], getOpenDiaryPost);
  return (
    <Wrap>
      <div>
        {data?.map((item: any) => (
          <Link
            to={`/main/${item.id}`}
            state={{ postData: item }}
            key={uuidv4()}
          >
            <div>{item.title}</div>
          </Link>
        ))}
      </div>
    </Wrap>
  );
}

export default DiaryOpenPost;
const Wrap = styled.div``;
