import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import noImage from "../../img/empty/no-image.png";
import { getUserData } from "../../util/api";

function DiaryOpenPost({ item }: any) {
  const { data: userData } = useQuery(["getUserData", item?.uid], getUserData);
  const day = new Date(item.createdAt! + 9 * 60 * 60 * 1000).toLocaleString(
    "ko-KR",
    {
      timeZone: "UTC",
    }
  );
  const titleImg = item.content;
  const regex = /<img.*?src=['"](.*?)['"].*?>/i;
  const match = titleImg.match(regex);

  return (
    <Wrap>
      <ItemTopBox>
        <UserInfo>
          <PostUserImg src={userData?.userImg} />
          {userData?.userName}
        </UserInfo>
        <Day>{day}</Day>
      </ItemTopBox>
      <Hr />
      <ImageBox>
        <TitleImg src={match ? match[1] : noImage} alt="srcValue" />
      </ImageBox>
      {item.title}
    </Wrap>
  );
}

export default DiaryOpenPost;
const Wrap = styled.div`
  width: 320px;
  height: 320px;
  border-radius: 20px;
  background-color: white;
  padding: 8px;
  margin: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ItemTopBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 290px;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Day = styled.div`
  width: 160px;
  text-align: center;
  color: gray;
  font-size: 12px;
`;
const Hr = styled.hr`
  width: 300px;
  height: 1px;
  border: none;
  background-color: #aaaaaa;
  margin-bottom: 12px;
`;
const ImageBox = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 12px;
`;
const TitleImg = styled.img`
  width: 100%;
  height: 100%;
`;
const PostUserImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;
