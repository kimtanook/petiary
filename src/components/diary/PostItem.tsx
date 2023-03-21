import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";

function PostItem({ postData }: any) {
  console.log("postData : ", postData);
  return (
    <Wrap>
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
  & .Md-box {
    /* padding: 10px 40px 0 40px; */
  }
`;
