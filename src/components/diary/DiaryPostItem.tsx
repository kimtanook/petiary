import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import noImage from "../../img/empty/no-image.png";
import { getUserData } from "../../util/api";

function DiaryPostItem({ item }: any) {
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
      <ImageBox urlImg={match ? match[1] : noImage} />
      <TitleUserBox>
        <PostTitle>{item.title}</PostTitle>
        <InfoBox>
          <UserInfoBox>
            <PostUserImg src={userData?.userImg} />
            {userData?.userName}
          </UserInfoBox>
          <div>{item.open === true ? "공개글" : "비공개글"}</div>
        </InfoBox>
      </TitleUserBox>
    </Wrap>
  );
}

export default DiaryPostItem;
const Wrap = styled.div`
  width: 320px;
  height: 380px;
  margin: 8px 8px 40px 8px;
  padding: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  :hover {
    scale: 1.01;
  }
`;
const ImageBox = styled.div<{ urlImg: string }>`
  background-image: url(${(props) => props.urlImg});
  background-position: center;
  background-size: cover;
  border-radius: 12px 12px 0 0;
  width: 300px;
  height: 260px;
  margin-bottom: 12px;
`;

const TitleUserBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
`;
const PostTitle = styled.div`
  font-size: 20px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 12px;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  color: gray;
`;
const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const PostUserImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;
