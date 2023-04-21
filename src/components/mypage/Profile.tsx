import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
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
      <div>
        <UserName>{user?.displayName}</UserName>
        <div>{userData?.userType}</div>
        <div>{userData?.userGender}</div>
        <div>
          {userData?.userYearBirth}년 {userData?.userMonthBirth}월{" "}
          {userData?.userDayBirth}일
        </div>
      </div>
      <EditProfileBtn onClick={() => setEditProfileToggle(true)}>
        프로필 수정
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
  border: 1px solid black;
  border-radius: 12px;
  padding: 0 12px 0 12px;
`;

const UserImg = styled.img`
  background-color: white;
  border-radius: 12px;
  width: 100px;
  height: 100px;
  margin: 4px;
`;
const UserName = styled.div`
  font-size: 28px;
  margin: 4px;
`;
const EditProfileBtn = styled.button`
  cursor: pointer;
  border: none;
  width: 100px;
  height: 24px;
  border-radius: 12px;
  background-color: white;
`;
