import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import moreBtnImg from "../../img/icon/angle-down.png";
import { getMyDiaryPost } from "../../util/api";
import { authService } from "../../util/firebase";
import Loading from "../common/Loading";
import DiaryOpenPost from "./DiaryPostItem";

function PostList() {
  const uid = authService.currentUser?.uid;

  // 무한 스크롤
  const {
    data: myPost, // data.pages를 갖고 있는 배열
    fetchNextPage, // 다음 페이지를 불러오는 함수
    status: myPostStatus, // loading, error, success 중 하나의 상태, string
  } = useInfiniteQuery(
    ["getMyDiaryPost", uid], // data의 이름
    getMyDiaryPost, // fetch callback, 위 data를 불러올 함수
    {
      getNextPageParam: () => {
        return true;
      },
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    }
  );
  const postLastIndex = myPost?.pages[myPost?.pages.length - 1];
  return (
    <Wrap>
      {myPostStatus === "loading" ? (
        <Loading />
      ) : (
        <>
          <GridWrap>
            {myPost?.pages.map((page: any) =>
              page.map((item: any) => (
                <Link
                  to={`/diary/${item.id}`}
                  state={{ postData: item }}
                  key={uuidv4()}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <DiaryOpenPost item={item} />
                </Link>
              ))
            )}
          </GridWrap>
          <MoreBtn
            onClick={() => {
              fetchNextPage();
              if (postLastIndex?.length === 0) {
                alert("불러올 게시물이 없습니다.");
              }
            }}
          >
            <div>더보기</div>
            <MortBtnImg src={moreBtnImg} />
          </MoreBtn>
        </>
      )}
    </Wrap>
  );
}

export default PostList;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const GridWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (min-width: 375px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (min-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1304px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1660px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
const MoreBtn = styled.div`
  cursor: pointer;
  width: 100px;
  height: 56px;
  line-height: 32px;
  border-radius: 12px;
  text-align: center;
  margin: auto;
  margin-top: 24px;
  font-weight: 700;
`;
const MortBtnImg = styled.img`
  width: 20px;
  height: 20px;
`;
