import { useMutation, useQueryClient } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteDiaryPost, deleteDiaryPostImage } from "../../util/api";
import { authService } from "../../util/firebase";

function DetailPostItem({ postData }: any) {
  const queryClient = useQueryClient();
  const { mutate: deletePost } = useMutation(deleteDiaryPost, {
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(["diaryData"]);
        queryClient.invalidateQueries(["getOpenDiaryPost"]);
      }, 300);
    },
  });
  const uid = authService.currentUser?.uid;
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;
  const index = url.indexOf("/", 1); // 첫 번째 '/' 이후의 위치를 찾음
  const urlResult = index === -1 ? url : url.substring(0, index);

  const deleteButton = () => {
    const regex: RegExp = /\/images%2F([\w-]+)\?/g;
    const matches: RegExpMatchArray[] = Array.from(
      postData.content.matchAll(regex)
    );
    const uniqueValues: string[] = Array.from(
      new Set(matches.map((match) => match[1]))
    );

    uniqueValues.map((item: string) =>
      deleteDiaryPostImage({ imageUrl: item })
    );
    deletePost(postData);
    navigate("/diary");
  };
  const day = new Date(postData.createdAt! + 9 * 60 * 60 * 1000).toLocaleString(
    "ko-KR",
    {
      timeZone: "UTC",
    }
  );
  useEffect(() => {
    if (urlResult === "/diary") {
      if (uid !== postData.uid) {
        navigate("/main");
      }
    }
  }, []);
  return (
    <Wrap>
      <TitleBox>
        <div>{postData.title}</div>
      </TitleBox>
      <SubWrap>
        <DayBox>
          {postData.userName} · {day}
        </DayBox>
        {uid === postData.uid ? (
          <EditDeleteWrap>
            <EditBox>
              <Link
                to={`/diary/write/${postData.id}`}
                state={postData}
                style={{ textDecoration: "none", color: "black" }}
              >
                수정하기
              </Link>
            </EditBox>
            <DeleteButton onClick={deleteButton}>삭제하기</DeleteButton>
          </EditDeleteWrap>
        ) : null}
      </SubWrap>
      <ContentBox data-color-mode="light">
        <MDEditor.Markdown className="Md-box" source={postData.content} />
      </ContentBox>
    </Wrap>
  );
}

export default DetailPostItem;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SubWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70vw;
  height: 24px;
`;
const DayBox = styled.div``;
const EditDeleteWrap = styled.div`
  display: flex;
  flex-direction: row;
`;
const EditBox = styled.div`
  cursor: pointer;
  margin-right: 16px;
  font-size: 16px;
`;
const DeleteButton = styled.div`
  cursor: pointer;
  border: none;
  background-color: inherit;
  font-size: 16px;
`;
const TitleBox = styled.div`
  width: 70vw;
  height: 48px;
  font-size: 32px;
  padding: 10px 40px 0 40px;
`;
const ContentBox = styled.div`
  width: 70vw;
  padding: 32px 40px 32px 40px;
  background-color: white;
`;
