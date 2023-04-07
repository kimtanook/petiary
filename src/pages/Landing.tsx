/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginAndSignUp from "../components/auth/LoginAndSignUp";
import { authService } from "../util/firebase";

function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    if (authService.currentUser) {
      navigate("/main");
    }
  }, []);
  return (
    <Wrap>
      <LoginAndSignUp />
    </Wrap>
  );
}

export default Landing;
const Wrap = styled.div``;
