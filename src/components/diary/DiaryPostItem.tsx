import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import noImage from "../../img/empty/no-image.png";
import { getUserData } from "../../util/api";
import { transformListValue } from "../../util/atom";

function DiaryPostItem({ item }: any) {
  const transformListToggle = useRecoilValue(transformListValue);
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
    <>
      {transformListToggle ? (
        <WrapList>
          <InfoBoxForList>
            <PostUserImg src={userData?.userImg} />
            {userData?.userName}
          </InfoBoxForList>
          <ContentBoxForList>
            <ImageBoxForList urlImg={match ? match[1] : noImage} />
            <PostTitleForListBox>
              <PostTitleForList>{item.title}</PostTitleForList>
            </PostTitleForListBox>
          </ContentBoxForList>
        </WrapList>
      ) : (
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
      )}
    </>
  );
}

export default DiaryPostItem;
const Wrap = styled.div`
  width: 220px;
  height: 260px;
  margin: 8px 8px 40px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  :hover {
    scale: 1.01;
  }
`;
const WrapList = styled.div`
  width: 47vw;
  min-width: 300px;
  height: 60px;
  margin: 8px 8px 10px 8px;
  padding: 0 12px 0 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  :hover {
    scale: 1.01;
  }
`;
const ImageBox = styled.div<{ urlImg: string }>`
  background-image: url(${(props) => props.urlImg});
  background-position: center;
  background-size: cover;
  border-radius: 12px 12px 0 0;
  width: 100%;
  height: 100%;
  margin: 8px 0 12px 0;
`;
const ImageBoxForList = styled.div<{ urlImg: string }>`
  background-image: url(${(props) => props.urlImg});
  background-position: center;
  background-size: cover;
  border-radius: 12px;
  width: 40px;
  height: 40px;
  margin: 8px 0 12px 0;
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 40px;
  margin-bottom: 12px;
`;
const PostTitleForListBox = styled.div`
  width: 30vw;
  min-width: 120px;
  height: 30px;
  display: flex;
  align-items: center;
  margin-left: 12px;
`;
const PostTitleForList = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  color: gray;
`;
const InfoBoxForList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 130px;
  color: gray;
`;
const ContentBoxForList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const DayBoxForList = styled.div`
  font-size: 12px;
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
