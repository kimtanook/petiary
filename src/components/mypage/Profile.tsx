import { useRecoilState } from "recoil";
import styled from "styled-components";
import { editProfileValue } from "../../util/atom";
import { authService } from "../../util/firebase";

function Profile() {
  const user = authService.currentUser;
  const [editProfileToggle, setEditProfileToggle] =
    useRecoilState(editProfileValue);

  return (
    <Wrap>
      <UserImg src={`${user?.photoURL}`} alt="user-img" />
      <UserName>{user?.displayName}</UserName>
      <EditProfileBtn onClick={() => setEditProfileToggle(true)}>
        프로필 수정
      </EditProfileBtn>
    </Wrap>
  );
}

export default Profile;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const UserImg = styled.img`
  background-color: white;
  border-radius: 50%;
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
