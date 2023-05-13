import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import noImage from "../../img/empty/no-image.png";
import { getUserData } from "../../util/api";
import UserProfile from "../common/UserProfile";

function DiaryPostItem({ item }: any) {
  const location = useLocation();
  const path = location.pathname;
  const [userProfileToggle, setUserProfileToggle] = useState(false);
  const { data: userData } = useQuery(["getUserData", item?.uid], getUserData);
  // const day = new Date(item.createdAt! + 9 * 60 * 60 * 1000).toLocaleString(
  //   "ko-KR",
  //   {
  //     timeZone: "UTC",
  //   }
  // );
  const titleImg = item.content;
  const regex = /<img.*?src=['"](.*?)['"].*?>/i;
  const match = titleImg.match(regex);

  return (
    <>
      <Wrap>
        <Link
          to={`${path}/${item.id}`}
          state={{ postData: item }}
          key={uuidv4()}
          style={{ textDecoration: "none", color: "black" }}
        >
          <ImageBox urlImg={match ? match[1] : noImage} />
          <PostTitleBox>
            <PostTitle>{item.title}</PostTitle>
          </PostTitleBox>
        </Link>
        <UserBox>
          <InfoBox onClick={() => setUserProfileToggle(!userProfileToggle)}>
            <UserInfoBox>
              <PostUserImg src={userData?.userImg} />
              {userData?.userName}
            </UserInfoBox>
          </InfoBox>
          <div>{item.open === true ? "공개글" : "비공개글"}</div>
        </UserBox>
      </Wrap>
      {userProfileToggle ? (
        <UserProfile
          userData={userData}
          setUserProfileToggle={setUserProfileToggle}
        />
      ) : null}
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
  @media screen and (max-width: 500px) {
    width: 160px;
    height: 180px;
    margin: 8px 8px 12px 8px;
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
  width: 200px;
  height: 140px;
  margin: 8px 0 12px 0;
  @media screen and (max-width: 500px) {
    width: 140px;
    height: 100px;
  }
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: auto;
  color: gray;
  font-size: 12px;
`;
const PostTitleBox = styled.div`
  width: 200px;
  @media screen and (max-width: 500px) {
    width: 140px;
    height: 20px;
  }
`;
const PostTitle = styled.div`
  font-size: 20px;
  height: 40px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 40px;
  margin-bottom: 12px;
  @media screen and (max-width: 500px) {
    font-size: 16px;
    height: 20px;
    line-height: 20px;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  cursor: pointer;
`;

const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const PostUserImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  margin-right: 8px;
`;
