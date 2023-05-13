import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import female from "../../img/icon/female.png";
import male from "../../img/icon/male.png";
import { getUserData } from "../../util/api";
import { editProfileValue } from "../../util/atom";
import { authService } from "../../util/firebase";

function Profile() {
  const user = authService.currentUser;
  const { data: userData } = useQuery(["getUserData", user?.uid], getUserData);
  const [editProfileToggle, setEditProfileToggle] =
    useRecoilState(editProfileValue);

  return (
    <Wrap>
      <UserImg src={`${user?.photoURL}`} alt="user-img" />
      <UserInfo>
        <UserName>{user?.displayName}</UserName>
        <div>{userData?.userType}</div>
        {userData?.userGender === "여" ? (
          <GenderImg src={female} />
        ) : (
          <GenderImg src={male} />
        )}
        <div>
          {userData?.userYearBirth}년 {userData?.userMonthBirth}월{" "}
          {userData?.userDayBirth}일
        </div>
      </UserInfo>
      <EditProfileBtn onClick={() => setEditProfileToggle(true)}>
        수정
      </EditProfileBtn>
    </Wrap>
  );
}

export default Profile;
const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 320px;
  border: 2px solid #626262;
  border-radius: 12px;
  padding: 0 12px 0 12px;
`;

const UserImg = styled.img`
  background-color: white;
  border-radius: 12px;
  width: 100px;
  height: 100px;
`;
const UserInfo = styled.div`
  width: 140px;
  margin-left: 12px;
`;
const UserName = styled.div`
  font-size: 28px;
`;
const GenderImg = styled.img`
  width: 16px;
`;

const EditProfileBtn = styled.button`
  cursor: pointer;
  border: none;
  width: 40px;
  height: 20px;
  border-radius: 12px;
  background-color: #ebebeb;
`;
