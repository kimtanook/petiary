import styled from "styled-components";

function DiaryOpenPost({ item }: any) {
  const day = new Date(item.createdAt! + 9 * 60 * 60 * 1000).toLocaleString(
    "ko-KR",
    {
      timeZone: "UTC",
    }
  );
  return (
    <Wrap>
      {item.title}
      {day}
    </Wrap>
  );
}

export default DiaryOpenPost;
const Wrap = styled.div``;
