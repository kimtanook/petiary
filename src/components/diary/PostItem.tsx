import MDEditor from "@uiw/react-md-editor";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteDiaryPost, deleteDiaryPostImage } from "../../util/api";
import { authService } from "../../util/firebase";

function PostItem({ postData }: any) {
  const uid = authService.currentUser?.uid;
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;
  const index = url.indexOf("/", 1); // 첫 번째 '/' 이후의 위치를 찾음
  const urlResult = index === -1 ? url : url.substring(0, index);

  const deleteButton = () => {
    const regex: RegExp = /(\w+-\w+-\w+-\w+-\w+)/;
    const matches: RegExpMatchArray[] = Array.from(
      postData.content.matchAll(regex)
    );
    const uniqueValues: string[] = Array.from(
      new Set(matches.map((match) => match[1]))
    );

    uniqueValues.map((item: string) =>
      deleteDiaryPostImage({ imageUrl: item })
    );
    console.log("uniqueValues : ", uniqueValues);
    deleteDiaryPost(postData);
    navigate("/diary");
  };

  useEffect(() => {
    if (urlResult === "/diary") {
      if (uid !== postData.uid) {
        navigate("/main");
      }
    }
  }, []);
  return (
    <Wrap>
      {uid === postData.uid ? (
        <Link to={`/diary/write/${postData.id}`} state={postData}>
          수정하기
        </Link>
      ) : null}
      {uid === postData.uid ? (
        <button onClick={deleteButton}>삭제하기</button>
      ) : null}
      <TitleBox>
        <div>{postData.title}</div>
      </TitleBox>
      <ContentBox data-color-mode="light">
        <MDEditor.Markdown className="Md-box" source={postData.content} />
      </ContentBox>
    </Wrap>
  );
}

export default PostItem;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TitleBox = styled.div`
  width: 800px;
  padding: 10px 40px 0 40px;
  border: 1px solid black;
`;
const ContentBox = styled.div`
  width: 800px;
  padding: 10px 40px 0 40px;
  border: 1px solid black;
`;
