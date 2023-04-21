import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { editProfileImage, getUserData } from "../../util/api";
import { editProfileValue } from "../../util/atom";
import { authService, storageService } from "../../util/firebase";

function EditProfileModal() {
  const queryClient = useQueryClient();
  const user = authService.currentUser;
  const { data: currentUserData } = useQuery(
    ["getUserData", user?.uid],
    getUserData
  );
  const { mutate: editUser } = useMutation(editProfileImage, {
    onSuccess: () => queryClient.invalidateQueries(["getUserData"]),
  });
  const [editProfileToggle, setEditProfileToggle] =
    useRecoilState(editProfileValue);
  const [fileImageValue, setFileImageValue] = useState(user?.photoURL || "");
  const [nicknameValue, setNicknameValue] = useState(user?.displayName || "");
  const [yearBirthValue, setYearBirthValue] = useState("");
  const [monthBirthValue, setMonthBirthValue] = useState("");
  const [dayBirthValue, setDayBirthValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
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
    setNicknameValue(event.currentTarget.value);
  };
  const onChangeYearBirth = (event: any) => {
    setYearBirthValue(event.currentTarget.value);
  };
  const onChangeDayBirth = (event: any) => {
    setDayBirthValue(event.currentTarget.value);
  };
  const onChangeMonthBirth = (event: any) => {
    setMonthBirthValue(event.currentTarget.value);
  };
  const onChangeType = (event: any) => {
    setTypeValue(event.currentTarget.value);
  };
  const onChangeGender = (event: any) => {
    setGenderValue(event.currentTarget.value);
  };
  const submitProfile = () => {
    if (
      !nicknameValue ||
      yearBirthValue.length !== 4 ||
      !monthBirthValue ||
      !dayBirthValue ||
      !typeValue ||
      !genderValue
    ) {
      return alert("필수 기재 항목을 확인해주세요.");
    }
    editUser({
      uid: user?.uid,
      userImg: fileImageValue,
      userName: nicknameValue,
      userYearBirth: yearBirthValue,
      userMonthBirth: monthBirthValue,
      userDayBirth: dayBirthValue,
      userType: typeValue,
      userGender: genderValue,
    });
    updateProfile(user!, {
      ...user,
      displayName: nicknameValue,
      photoURL: fileImageValue,
    }).then(() => setEditProfileToggle(false));
  };

  useEffect(() => {
    if (currentUserData) {
      setYearBirthValue(currentUserData?.userYearBirth);
      setMonthBirthValue(currentUserData?.userMonthBirth);
      setDayBirthValue(currentUserData?.userDayBirth);
      setTypeValue(currentUserData?.userType);
      setGenderValue(currentUserData?.userGender);
    }
  }, [currentUserData]);
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
          닉네임 :
          <input
            onChange={onChangeNickname}
            value={nicknameValue}
            maxLength={6}
          />
        </div>
        <div>
          생일 :
          <input
            onChange={onChangeYearBirth}
            value={yearBirthValue}
            maxLength={4}
            placeholder="ex) 2000"
          />
          년
          <input
            onChange={onChangeMonthBirth}
            value={monthBirthValue}
            maxLength={2}
            placeholder="ex) 1"
          />
          월
          <input
            onChange={onChangeDayBirth}
            value={dayBirthValue}
            maxLength={2}
            placeholder="ex) 28"
          />
          일
        </div>
        <div>
          종 :
          <input
            onChange={onChangeType}
            value={typeValue}
            placeholder="ex) 말티즈"
          />
        </div>
        <div>
          성별 :
          <input
            onChange={onChangeGender}
            value={genderValue}
            maxLength={1}
            placeholder="ex) 여"
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
  width: 420px;
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
