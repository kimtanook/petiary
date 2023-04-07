import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import logo from "../../img/logo/logo-column.png";
import { addUserData } from "../../util/api";
import { Alert } from "../../util/atom";
import { authService } from "../../util/firebase";
import SocialLogin from "./SocialLogin";

const LoginAndSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState<any>("");
  const [alertModal, setAlertModal] = useRecoilState(Alert);
  const { mutate: addUserInfo } = useMutation(addUserData);
  const navigate = useNavigate();

  const onChange = (event: any) => {
    const {
      target: { name, value }, // event.target.name 과 event.target.value와 같다.
    } = event;
    if (name === "email") {
      // name은 event.target.name과 같다.
      setEmail(value);
      // value은 event.target.value와 같다.
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (!newAccount === true) {
        await createUserWithEmailAndPassword(authService, email, password).then(
          () => {
            const userInfo = {
              uid: authService.currentUser?.uid,
              userName: authService.currentUser?.displayName,
              userImg: "",
            };
            addUserInfo(userInfo);
            alert("회원가입 성공!");
            navigate("/main");
          }
        );
      } else {
        await signInWithEmailAndPassword(authService, email, password).then(
          () => {
            alert("로그인 성공!");
            navigate("/main");
          }
        );
      }
    } catch (error: any) {
      if (
        error.message === "Firebase: Error (auth/wrong-password)." ||
        error.message === "Firebase: Error (auth/user-not-found)."
      ) {
        setAlertModal({
          toggle: true,
          message: "아이디 또는 비밀번호를 확인해주세요.",
        });
      } else if (
        error.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
        setAlertModal({
          toggle: true,
          message: "이미  사용중인 아이디 입니다.",
        });
      } else if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setAlertModal({
          toggle: true,
          message: "비밀번호가 여섯글자 이상인지 확인해주세요.",
        });
      } else if (error.message === "Firebase: Error (auth/invalid-email).") {
        setAlertModal({
          toggle: true,
          message: "이메일 형식이 맞는지 확인해주세요.",
        });
      }
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <Wrap>
      <LandingTitle>펫티어리로 반려동물의 추억을 남겨보세요!</LandingTitle>
      <LogoImg src={logo} alt="logo" />
      <form onSubmit={onSubmit}>
        <InputWrap>
          <Input
            name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
          />
          <SubmitButton type="submit">
            {!newAccount ? "계정 만들기" : "들어가기"}
          </SubmitButton>
        </InputWrap>
        {error}
      </form>
      <SignToggle onClick={toggleAccount}>
        {!newAccount ? "로그인하러 가기" : "회원가입하러 가기"}
      </SignToggle>
      <SocialLogin />
    </Wrap>
  );
};

export default LoginAndSignUp;

const Wrap = styled.div`
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LandingTitle = styled.div`
  font-size: 16px;
  margin-bottom: 40px;
`;
const LogoImg = styled.img`
  width: 200px;
  height: 200px;
`;
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  width: 192px;
  height: 32px;
  margin: 4px;
  border-radius: 16px;
  border: 1px solid #ff9524;
  padding-left: 8px;
`;
const SubmitButton = styled.button`
  cursor: pointer;
  width: 200px;
  height: 28px;
  border: none;
  border-radius: 8px;
  margin: 4px;
  color: white;
  background-color: #ffcb88;
  transition: 0.5s;
  :hover {
    transition: 0.5s;
    background-color: #c8873c;
  }
`;
const SignToggle = styled.div`
  cursor: pointer;
  margin: 8px 4px 0 4px;
  border-radius: 8px;
  width: 140px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background-color: #b56d3d;
  color: white;
  font-size: 12px;
`;
