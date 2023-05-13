import { useMutation, useQueryClient } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import deleteImg from "../../img/icon/trash.png";
import editImg from "../../img/icon/write.png";
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
    window.scrollTo(0, 0);
    if (urlResult === "/main") {
      if (!postData.open) {
        alert("비공개글에는 접근할 수 없습니다.");
        navigate("/main");
      }
    }
  }, []);

  return (
    <Wrap>
      <TitleBox>{postData.title}</TitleBox>
      <SubWrap>
        <DayBox>
          {postData.userName} · {day} · {postData.open ? "공개글" : "비공개글"}
        </DayBox>
        {uid === postData.uid ? (
          <EditDeleteWrap>
            <EditButton>
              <Link
                to={`/diary/write/${postData.id}`}
                state={postData}
                style={{ textDecoration: "none", color: "black" }}
              >
                <EditDeleteImg src={editImg} alt="editImg" />
                수정
              </Link>
            </EditButton>
            <DeleteButton onClick={deleteButton}>
              <EditDeleteImg src={deleteImg} alt="deleteImg" />
              삭제
            </DeleteButton>
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
const Wrap = styled.div<{ theme: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60vw;
  padding: 12px;
  @media screen and (max-width: ${({ theme }) => theme.width}px) {
    width: 100vw;
  }
`;

const SubWrap = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: nowrap;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const DayBox = styled.div``;
const EditDeleteWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
`;
const EditButton = styled.div`
  cursor: pointer;
  margin-right: 16px;
  font-size: 16px;
  opacity: 0.5;
  :hover {
    opacity: 1;
  }
`;
const EditDeleteImg = styled.img`
  width: 12px;
  margin-right: 4px;
`;
const DeleteButton = styled.div`
  cursor: pointer;
  border: none;
  background-color: inherit;
  font-size: 16px;
  opacity: 0.5;
  :hover {
    opacity: 1;
  }
`;
const TitleBox = styled.div`
  width: 45vw;
  height: 48px;
  font-size: 32px;
  padding: 10px 40px 0 40px;
  white-space: nowrap;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ContentBox = styled.div`
  width: 90%;
  padding: 32px 40px 32px 40px;
  background-color: white;
`;
