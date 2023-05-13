import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import closeImg from "../../img/icon/cross-small.png";
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
    const value = event.currentTarget.value;
    if (typeof value !== "string") {
      alert("닉네임은 문자를 사용해주세요!");
      return;
    }
    setNicknameValue(value);
  };

  const onChangeYearBirth = (event: any) => {
    const value = event.currentTarget.value;
    if (isNaN(value)) {
      alert("숫자를 입력해주세요");
      return;
    }
    setYearBirthValue(value);
  };

  const onChangeMonthBirth = (event: any) => {
    const value = event.currentTarget.value;
    if (value > 12) {
      alert("12보다 작은 수를 입력해주세요.");
      setMonthBirthValue("");
      return;
    }
    setMonthBirthValue(value);
  };

  const onChangeDayBirth = (event: any) => {
    const value = event.currentTarget.value;
    if (isNaN(value)) {
      alert("숫자를 입력해주세요");
      return;
    }
    setDayBirthValue(value);
  };

  const currentDate = format(new Date(), "yyyyMMdd");
  const selectDate = `${yearBirthValue}${monthBirthValue}${dayBirthValue}`;

  if (selectDate.length === 8) {
    if (currentDate < selectDate) {
      alert("미래에 태어나는 동물은 없어요..");
      setYearBirthValue("");
      setMonthBirthValue("");
      setDayBirthValue("");
    }
  }

  const onChangeType = (event: any) => {
    const value = event.currentTarget.value;
    setTypeValue(value);
  };
  const onChangeGender = (event: any) => {
    const value = event.currentTarget.value;
    setGenderValue(value);
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
        <CloseBtn onClick={() => setEditProfileToggle(false)}>
          <CloseImg src={closeImg} />
        </CloseBtn>
        <label>
          <ProfileImg src={fileImageValue} />
          <input
            onChange={handleImageChange}
            type="file"
            style={{ display: "none" }}
          />
        </label>
        <div>
          이름 :
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
          <select onChange={onChangeMonthBirth} value={monthBirthValue}>
            <option value="">월</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
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
            type="radio"
            value="남"
            name="gender"
            onChange={onChangeGender}
          />
          남
          <input
            type="radio"
            value="여"
            name="gender"
            onChange={onChangeGender}
          />
          여
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
const CloseImg = styled.img`
  width: 32px;
`;
const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  cursor: pointer;
`;
