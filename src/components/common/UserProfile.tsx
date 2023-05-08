import styled from "styled-components";

function UserProfile({ userData, setUserProfileToggle }: any) {
  return (
    <Wrap onClick={() => setUserProfileToggle()}>
      <ProfileWrap>
        <UserImg src={`${userData?.userImg}`} alt="user-img" />
        <div>
          <UserName>{userData?.displayName}</UserName>
          <div>{userData?.userType}</div>
          <div>{userData?.userGender}</div>
          <div>
            {userData?.userYearBirth}년 {userData?.userMonthBirth}월{" "}
            {userData?.userDayBirth}일
          </div>
        </div>
      </ProfileWrap>
    </Wrap>
  );
}

export default UserProfile;
const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #00000066;
`;
const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  border: 1px solid black;
  border-radius: 12px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const UserImg = styled.img`
  border-radius: 12px;
  width: 100px;
  height: 100px;
  margin-right: 24px;
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
