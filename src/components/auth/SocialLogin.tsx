import { useMutation } from "@tanstack/react-query";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { addUserData } from "../../util/api";
import { authService } from "../../util/firebase";

const SocialLogin = () => {
  const { mutate: addUserInfo } = useMutation(addUserData);
  const onGoogleLogIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authService, provider).then(() => {
      const userInfo: any = {
        uid: authService.currentUser?.uid,
        userName: authService.currentUser?.displayName,
        userImg: "",
      };
      addUserInfo(userInfo);
      alert("로그인 성공!");
    });
  };

  return (
    <Wrap onClick={onGoogleLogIn}>
      <ImgBox>
        <svg
          className="social-icon"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Google"
          role="img"
          viewBox="0 0 512 512"
        >
          <rect width="512" height="512" rx="15%" fill="#fff" />
          <path
            fill="#4285f4"
            d="M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z"
          />
          <path
            fill="#34a853"
            d="M90 341a192 192 0 0 0 296 59l-62-48c-53 35-141 22-171-60z"
          />
          <path
            fill="#fbbc02"
            d="M153 292c-8-25-8-48 0-73l-63-49c-23 46-30 111 0 171z"
          />
          <path
            fill="#ea4335"
            d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55z"
          />
        </svg>
      </ImgBox>
      <LoginText>10초만에 구글아이디로 로그인</LoginText>
    </Wrap>
  );
};
export default SocialLogin;
const Wrap = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #b71d51;
  border-radius: 8px;
  padding: 0 8px 0 4px;
  margin-top: 40px;
  background-color: white;
`;
const ImgBox = styled.div`
  width: 40px;
  height: 40px;
`;
const LoginText = styled.div``;
