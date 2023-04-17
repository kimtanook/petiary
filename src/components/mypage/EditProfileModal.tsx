import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { editProfileImage } from "../../util/api";
import { editProfileValue } from "../../util/atom";
import { authService, storageService } from "../../util/firebase";

function EditProfileModal() {
  const queryClient = useQueryClient();
  const user = authService.currentUser;
  const { mutate: getUser } = useMutation(editProfileImage, {
    onSuccess: () => queryClient.invalidateQueries(["getUserData"]),
  });
  const [editProfileToggle, setEditProfileToggle] =
    useRecoilState(editProfileValue);
  const [fileImageValue, setFileImageValue] = useState(user?.photoURL || "");
  const [editNicknameValue, setEditNicknameValue] = useState(
    user?.displayName || ""
  );

  const handleImageChange = (e: any) => {
    let file = e.target.files;
    if (file.length === 0) {
      return;
    } else {
      const theFile = file[0];
      const reader = new FileReader();
      reader.readAsDataURL(theFile);
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        }: any = finishedEvent;

        const imageRef = ref(storageService, `${user?.uid}/${uuidv4()}`);
        uploadString(imageRef, result, "data_url").then((response) =>
          getDownloadURL(response.ref).then((url) => {
            setFileImageValue(url);
          })
        );
      };
    }
  };
  const onChangeNickname = (event: any) => {
    setEditNicknameValue(event.currentTarget.value);
  };
  const submitProfile = () => {
    getUser({
      uid: user?.uid,
      userImg: fileImageValue,
      userName: editNicknameValue,
    });
    updateProfile(user!, {
      ...user,
      displayName: editNicknameValue,
      photoURL: fileImageValue,
    }).then(() => setEditProfileToggle(false));
  };
  return (
    <Wrap>
      <EditWrap>
        <CloseBtn onClick={() => setEditProfileToggle(false)}>〈</CloseBtn>
        <label>
          <ProfileImg src={fileImageValue} />
          <input
            onChange={handleImageChange}
            type="file"
            style={{ display: "none" }}
          />
        </label>
        <div>
          수정할 닉네임 :{" "}
          <input
            onChange={onChangeNickname}
            value={editNicknameValue}
            maxLength={6}
          />
        </div>
        <div onClick={submitProfile}>수정완료</div>
      </EditWrap>
    </Wrap>
  );
}

export default EditProfileModal;
const Wrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: #0000007a;
  z-index: 100;
`;

const EditWrap = styled.div`
  width: 300px;
  height: 400px;
  background-color: beige;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const CloseBtn = styled.div`
  cursor: pointer;
  font-size: 24px;
  width: 24px;
  text-align: center;
`;
const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
`;
